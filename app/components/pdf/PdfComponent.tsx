"use client";

import useFloatingPdfContext from "@/app/context/useFloatingPdfViewer";
import { ArrowDownTrayIcon, ChevronLeftIcon, ChevronRightIcon, MinusIcon, PlusIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { usePdfVersionContext } from "../../context/usePdfVersionContext";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import {useMultipleOnScreen} from "@/app/hooks/useMultipleOnScreen";

pdfjs.GlobalWorkerOptions.workerSrc= `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;


export default function PdfComponent({ path }: { path: string }) {
    const [numPages, setNumPages]= useState<number>(0);
    const [currentPage, setCurrentPage]= useState<number>(1);
    const [scale, setScale]= useState<number>(1.0);
    const [containerWidth, setContainerWidth]= useState<number>(0);

    const containerRef= useRef<HTMLDivElement>(null);
    const {setRef, visibleIds, elementsRef} = useMultipleOnScreen({ threshold: 0.2 });

    // Measure the viewport width. contentRect already excludes the container's
    // padding, so no manual subtraction is needed. This value must NOT depend on
    // the size of the rendered pages, which is guaranteed by min-w-0 on the root
    // and grid-cols-1 on the parent grid.
    useEffect(()=> {
        const el= containerRef.current;
        if (!el) return;

        const observer= new ResizeObserver((entries)=> {
            const width= entries[0]?.contentRect.width;
            if (width) {
                setContainerWidth(Math.max(Math.floor(width), 200));
            }
        });

        observer.observe(el);
        return ()=> observer.disconnect();
    }, []);

    const scrollToPage= (pageNumber: number)=> {
        const target= Math.min(Math.max(pageNumber, 1), numPages);
        setCurrentPage(target);
        elementsRef.current.get(`page_${target}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    //Update the currentPage when the user is scrolling
    useEffect(()=> {
        //Make this into an array
        const visibleElements= Object.entries(visibleIds);

        // Where to store all the visible ids
        const visibles= [];
        for (const [id, bool] of visibleElements){
            if (bool)
            {
                visibles.push(id);
                // console.log("TRUE FOR: ", id);
            }
        }
        
        // This function removes the prefix "page_" from a string
        // Because the key of the pages are `page_${index}`
        // And we just need the index
        const getIndexFromId= (id: string)=> {
            const prefix= "page_";
            const index= id.indexOf(prefix);
            const stringResult= index!== -1 ? id.slice(index + prefix.length): '';
            // console.log('PAGE STRING :', stringResult);
            return parseInt(stringResult);
        };

        // Only update the current page if the last current page is not visible anymore
        // If it is updated everytime a new page appears on view, the number would flicker
        if (visibles.length> 0){
            const visiblePageNumbers= visibles.map(v=> getIndexFromId(v));
            if (!visiblePageNumbers.includes(currentPage))
                setCurrentPage(visiblePageNumbers[0]);
        }
    }, [visibleIds]);


    const context= usePdfVersionContext();
    const onContext= useFloatingPdfContext();
    const close= ()=> {
        onContext.setOn(false);
    };

    const [pdfUrl, setPdfUrl]= useState<string|null>(null);
    const [loading, setLoading]= useState<boolean>(true);
    const [errorMessage, setErrorMessage]= useState<string|null>(null);

    useEffect(()=> {
        let objectUrl: string|null= null;
        const abortController= new AbortController();

        async function fetchPdf() {
            setLoading(true);
            setErrorMessage(null);
            setPdfUrl(null);

            try {
                const response= await fetch(`${path}?v=${context.version}`, {signal: abortController.signal});

                if (!response.ok) {
                    if (response.status === 404) {
                        setErrorMessage("No resume has been generated yet.");
                    } else if (response.status === 401) {
                        setErrorMessage("Your session has expired. Please refresh the page.");
                    } else {
                        setErrorMessage("Unable to retrieve your resume.");
                    }
                    return;
                }

                const blob= await response.blob();

                if (blob.type!== "application/pdf") throw new Error("Invalid PDF response!");

                objectUrl= URL.createObjectURL(blob);
                setPdfUrl(objectUrl);

            } catch (error) {
                if (abortController.signal.aborted) return;

                console.log("ERROR WHILE FETCHING: ", error);
                setErrorMessage("An Error occurred, check console.logs");
            } finally {
                if (!abortController.signal.aborted) setLoading(false);
            }
        };

        fetchPdf();

        return ()=> {
            abortController.abort();

            if (objectUrl) URL.revokeObjectURL(objectUrl);
        };
    }, [path, context.version]);

    function handleLoadError(error: any) {
        // pdf.js typically sets name to 'MissingPDFException' or includes status 404
        if (error?.name === 'MissingPDFException' || error?.status === 404) {
            setErrorMessage('The requested PDF could not be found (404).');
        } else {
            setErrorMessage('Failed to load the PDF document.');
        }
    }

    return (
        <div className={`w-full min-w-0 bg-[#1f2937] h-[100dvh] min-h-0 transform max-lg:row-start-1 max-lg:col-start-1 ${onContext.on ? 'translate-x-[0%]' : 'translate-x-[100%] lg:translate-x-0'} top-0 left-0 right-0 bottom-0 z-[999] transition-all duration-400`}>
            <div className="absolute top-16 right-4 z-[999] lg:hidden">
                <button className="bg-white p-2 rounded-full shadow-md"><XCircleIcon className="w-8 h-8" onClick={close} /></button>
            </div>
            <div className="flex flex-col w-full min-w-0 h-full max-h-screen border bg-neutral-100 overflow-hidden">
                {/* Sticky Control Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-white border-b text-sm text-neutral-700 shrink-0">
                    {/* Page Navigation */}
                    <div className="flex items-center gap-1.5">
                        <button
                            type="button"
                            onClick={()=> scrollToPage(currentPage - 1)}
                            disabled={currentPage <= 1}
                            className="px-2 py-1 border rounded hover:bg-neutral-100 disabled:opacity-40"
                        >
                            <ChevronLeftIcon className="w-5 h-5" />
                        </button>
                        <span className="px-2 font-medium">
                            {numPages > 0 ? `${currentPage} / ${numPages}` : 'Loading...'}
                        </span>
                        <button
                            type="button"
                            onClick={()=> scrollToPage(currentPage + 1)}
                            disabled={currentPage >= numPages}
                            className="px-2 py-1 border rounded hover:bg-neutral-100 disabled:opacity-40"
                        >
                            <ChevronRightIcon className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Zoom Controls */}
                    <div className="flex items-center gap-1.5">
                        <button
                            type="button"
                            onClick={()=> setScale((s)=> Math.max(0.5, +(s - 0.2).toFixed(1)))}
                            className="px-2 py-1 border rounded hover:bg-neutral-100"
                            aria-label="Zoom out"
                        >
                            <MinusIcon className="w-5 h-5" />
                        </button>
                        <button
                            type="button"
                            onClick={()=> setScale(1.0)}
                            className="px-2 py-1 border rounded hover:bg-neutral-100 min-w-[3.5rem]"
                        >
                            {Math.round(scale * 100)}%
                        </button>
                        <button
                            type="button"
                            onClick={()=> setScale((s)=> Math.min(2.5, +(s + 0.2).toFixed(1)))}
                            className="px-2 py-1 border rounded hover:bg-neutral-100"
                            aria-label="Zoom in"
                        >
                            <PlusIcon className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Download Link */}
                    {
                        pdfUrl?
                        <a
                            href={pdfUrl}
                            download="resume.pdf"
                            className="px-2 py-1 border rounded hover:bg-neutral-100"
                        >
                            <ArrowDownTrayIcon className="w-5 h-5" />
                        </a>:
                        <div className=""></div>
                    }
                </div>

                {/* Scrollable PDF Viewport */}
                <div
                    ref={containerRef}
                    className="flex-1 w-full min-w-0 overflow-auto p-4"
                >
                    <div className="w-fit mx-auto flex flex-col gap-4">
                        {loading ? (
                            <div className="py-10 text-neutral-500">
                                Loading PDF...
                            </div>
                        ) : errorMessage ? (
                            <div role="alert" className="pdf-error">
                                {errorMessage}
                            </div>
                        ) : pdfUrl ? (
                            <Document
                                file={`${path}?v=${context.version}`}
                                onLoadSuccess={({ numPages }) => {
                                    setNumPages(numPages);
                                    setCurrentPage(1);
                                }}
                                loading={<div className="py-10 text-neutral-500">Rendering PDF...</div>}
                                onLoadError={handleLoadError}
                                error={
                                    <div role="alert" className="pdf-error">
                                        {errorMessage || 'Failed to load PDF.'}
                                    </div>
                                }
                            >
                                {Array.from(new Array(numPages), (_, index) => (
                                    <div
                                        key={`page_${index + 1}`}
                                        ref={setRef(`page_${index + 1}`)}
                                        className="shadow-md bg-white mb-4 last:mb-0"
                                    >
                                        <Page
                                            pageNumber={index + 1}
                                            width={containerWidth ? Math.floor(containerWidth * scale) : undefined}
                                            renderTextLayer={true}
                                            renderAnnotationLayer={true}
                                        />
                                    </div>
                                ))}
                            </Document>
                        ) : null
                        }
                    </div>
                </div>
            </div>
    </div>
    );
}
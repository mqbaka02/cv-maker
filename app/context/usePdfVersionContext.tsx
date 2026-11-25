"use client";

import { Viewer } from "@embedpdf/viewer-react";
import { createContext, SetStateAction, useCallback, useContext, useEffect, useState } from "react";

type pdfVersionContextType= {
    version: string,
    refreshPDF: ()=> void,
    handleViewerReady: (instance: Viewer)=> void,
};

const PDFVersionContext= createContext<pdfVersionContextType|null>(null);

function PDFVersionProvider ({children}: {children: React.ReactNode}) {
    const [version, setVersion]= useState<string>("0");
    const [viewer, setViewer]= useState<Viewer|null>(null);
    const [savedViewState, setSavedViewState]= useState<unknown>(null);

    const handleViewerReady= useCallback((instance: Viewer)=> {
        setViewer(instance);
    }, []);

    const refreshPDF= useCallback(()=> {
        const stage= viewer?.tryGet("stage");
        if (stage && stage.getPageCount()> 0) setSavedViewState(stage.getViewState());

        setVersion(()=> String(Date.now()));
    }, [viewer]);

    return <PDFVersionContext.Provider value={{handleViewerReady, version, refreshPDF}}>
        <PDFStateRestorer viewer={viewer} savedViewState={savedViewState} onRestored={()=> setSavedViewState(null)} />
        {children}
    </PDFVersionContext.Provider>;
};

//The purpose of this component is to just run the unsubscribe function when the component is unmounted
const PDFStateRestorer= ({viewer, savedViewState, onRestored}: {viewer: Viewer|null, savedViewState: unknown, onRestored: ()=> void})=> {
    useEffect(()=> {
        if (!viewer || !savedViewState) return;

        let stopWatching: (()=> void) | undefined;

        const unsubscribe= viewer.documents.onOpened(({documentId})=> {
            stopWatching= viewer.watch(
                ()=> {
                    return viewer.forDocument(documentId).tryGet("stage")?.getPageCount() ?? 0
                },
                (pageCount)=> {
                    if (pageCount> 0) {
                        stopWatching?.();
                        const stage= viewer.forDocument(documentId).tryGet("stage");
                        stage?.applyViewState(savedViewState as never);
                        onRestored();
                    }
                },
                {immediate: true},
            );
        });

        return ()=> {
            unsubscribe();
            stopWatching?.();
        };
    }, [viewer, savedViewState, onRestored]);

    return null;
};

function usePdfVersionContext() {
    const context= useContext(PDFVersionContext);

    if(!context) throw new Error("Context missing!");

    return context;
};

export {
    usePdfVersionContext,
    PDFVersionProvider
}
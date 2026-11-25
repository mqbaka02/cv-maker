"use client";

import type { Viewer } from "@embedpdf/viewer-react";
import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

type PdfVersionContextType = {
    version: string;
    refreshPDF: () => void;
    handleViewerReady: (viewer: Viewer) => void;
    handleDocumentChange: (documentId: string | null) => void;
};

type SavedView = {
    zoomLevel: number;
    zoomMode: string;
    pageIndex: number;
    viewpoint: unknown;
};

const PDFVersionContext = createContext<PdfVersionContextType | null>(null);

const POLL_INTERVAL_MS = 50;  // how often we check whether the new document has pages
const TIMEOUT_MS = 5000;      // stop waiting after this long

function PDFVersionProvider({ children }: { children: React.ReactNode }) {
    const [version, setVersion] = useState("0");
    const viewerRef = useRef<Viewer | null>(null);
    const savedViewRef = useRef<SavedView | null>(null);
    const runIdRef = useRef(0); // lets a newer document cancel the wait of an older one

    const handleViewerReady = useCallback((viewer: Viewer) => {
        viewerRef.current = viewer;
    }, []);

    const refreshPDF = useCallback(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const stage: any = viewerRef.current?.tryGet("stage");
        if (stage && stage.getPageCount() > 0) {
            savedViewRef.current = {
                zoomLevel: stage.getZoomLevel(),
                zoomMode: stage.getZoomMode(), // 'custom' after a manual zoom
                pageIndex: stage.getCurrentPageIndex(),
                viewpoint: stage.getViewpoint(),
            };
        }
        setVersion(String(Date.now()));
    }, []);

    const handleDocumentChange = useCallback((documentId: string | null) => {
        const viewer = viewerRef.current;
        const saved = savedViewRef.current;
        if (!viewer || !saved || !documentId) return;

        const runId = ++runIdRef.current;
        const startedAt = Date.now();

        const tryRestore = () => {
            if (runId !== runIdRef.current) return; // a newer document took over

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const stage: any = viewer.forDocument(documentId).tryGet("stage");

            if (stage && stage.getPageCount() > 0) {
                // Zoom first, then navigate, so the page lands at the final zoom.
                stage.zoomTo(
                    saved.zoomMode === "custom" ? saved.zoomLevel : { mode: saved.zoomMode },
                );
                stage.goToPage(saved.pageIndex, {
                    viewpoint: saved.viewpoint,
                    behavior: "instant",
                });
                savedViewRef.current = null;
                return;
            }

            if (Date.now() - startedAt < TIMEOUT_MS) {
                setTimeout(tryRestore, POLL_INTERVAL_MS);
            }
        };

        tryRestore();
    }, []);

    const value = useMemo(
        () => ({ version, refreshPDF, handleViewerReady, handleDocumentChange }),
        [version, refreshPDF, handleViewerReady, handleDocumentChange],
    );

    return <PDFVersionContext.Provider value={value}>{children}</PDFVersionContext.Provider>;
}

function usePdfVersionContext() {
    const context = useContext(PDFVersionContext);
    if (!context) throw new Error("Context missing!");
    return context;
}

export { PDFVersionProvider, usePdfVersionContext };
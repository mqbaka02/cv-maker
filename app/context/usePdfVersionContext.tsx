"use client";

import type { Viewer } from "@embedpdf/viewer-react";
import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

type PdfVersionContextType = {
    version: string;
    refreshPDF: () => void;
    handleViewerReady: (viewer: Viewer) => void;
    handleDocumentChange: (documentId: string|null) => void;
};

type SavedView = {
    zoomLevel: number;
    zoomMode: string;
    pageIndex: number;
    viewpoint: unknown;
};

const PDFVersionContext = createContext<PdfVersionContextType | null>(null);

// Delays (ms) at which we check that the view is still what we restored.
const RESTORE_ATTEMPTS = [0, 100, 300, 700, 1500];

function PDFVersionProvider({ children }: { children: React.ReactNode }) {
    const [version, setVersion] = useState("0");
    const viewerRef = useRef<Viewer | null>(null);
    const savedViewRef = useRef<SavedView | null>(null);

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
            console.log("[pdf] saved view", savedViewRef.current);
        }
        setVersion(String(Date.now()));
    }, []);

    const handleDocumentChange = useCallback((documentId: string|null) => {
        const viewer = viewerRef.current;
        const saved = savedViewRef.current;
        console.log("[pdf] document changed", documentId, "saved:", saved);
        if (!viewer || !saved || !documentId) return;

        const getStage = () =>
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            viewer.forDocument(documentId).tryGet("stage") as any;

        const restore = () => {
            const stage = getStage();
            if (!stage || stage.getPageCount() === 0) return false;

            const zoomOk =
                saved.zoomMode === "custom"
                    ? Math.abs(stage.getZoomLevel() - saved.zoomLevel) < 0.001
                    : stage.getZoomMode() === saved.zoomMode;
            const pageOk = stage.getCurrentPageIndex() === saved.pageIndex;

            console.log("[pdf] restore check", {
                zoomOk,
                pageOk,
                now: { zoom: stage.getZoomLevel(), mode: stage.getZoomMode(), page: stage.getCurrentPageIndex() },
            });
            if (zoomOk && pageOk) return true;

            if (!zoomOk) {
                stage.zoomTo(
                    saved.zoomMode === "custom" ? saved.zoomLevel : { mode: saved.zoomMode },
                );
            }
            stage.goToPage(saved.pageIndex, {
                viewpoint: saved.viewpoint,
                behavior: "instant",
            });
            return false;
        };

        // The new document may not have pages yet, so poll until it does,
        // then keep re-checking for a while in case the Stage resets itself.
        let attempt = 0;
        const run = () => {
            const done = restore();
            if (done && attempt >= 2) {
                savedViewRef.current = null;
                console.log("[pdf] view restored");
                return;
            }
            attempt++;
            if (attempt < RESTORE_ATTEMPTS.length) {
                setTimeout(run, RESTORE_ATTEMPTS[attempt]);
            } else {
                savedViewRef.current = null;
                console.log("[pdf] gave up restoring");
            }
        };
        setTimeout(run, RESTORE_ATTEMPTS[0]);
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
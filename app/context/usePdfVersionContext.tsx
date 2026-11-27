"use client";
import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

type PdfVersionContextType = {
    version: string;
    refreshPDF: () => void;
};


const PDFVersionContext = createContext<PdfVersionContextType | null>(null);

const POLL_INTERVAL_MS = 50;  // how often we check whether the new document has pages
const TIMEOUT_MS = 5000;      // stop waiting after this long

function PDFVersionProvider({ children }: { children: React.ReactNode }) {
    const [version, setVersion] = useState("0");

    const refreshPDF = useCallback(() => {
        setVersion(String(Date.now()));
    }, []);


    const value = useMemo(
        () => ({ version, refreshPDF }),
        [version, refreshPDF],
    );

    return <PDFVersionContext.Provider value={value}>{children}</PDFVersionContext.Provider>;
}

function usePdfVersionContext() {
    const context = useContext(PDFVersionContext);
    if (!context) throw new Error("Context missing!");
    return context;
}

export { PDFVersionProvider, usePdfVersionContext };
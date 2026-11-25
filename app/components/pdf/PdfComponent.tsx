"use client";

import dynamic from "next/dynamic";
import { usePdfVersionContext } from "../../context/usePdfVersionContext";
import { config } from "./config";

const PDFViewer = dynamic(
    () => import("@embedpdf/viewer-react").then((mod) => mod.PDFViewer),
    { ssr: false },
);

export default function PdfComponent({ path }: { path: string }) {
    const context = usePdfVersionContext();
    return <div className="w-full bg-[#1f2937] h-[100vh]">
        <PDFViewer
            src={`${path}?v=${context.version}`}
            onReady={context.handleViewerReady}
            onDocumentChange={context.handleDocumentChange}
            style={{ height: "100vh", width: "100%" }}
            {...config}
        />
    </div>;
}
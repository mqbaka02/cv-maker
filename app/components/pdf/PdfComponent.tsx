"use client";

import useFloatingPdfContext from "@/app/context/useFloatingPdfViewer";
import dynamic from "next/dynamic";
import { usePdfVersionContext } from "../../context/usePdfVersionContext";
import { config } from "./config";
import { XCircleIcon } from "@heroicons/react/24/outline";

const PDFViewer = dynamic(
    () => import("@embedpdf/viewer-react").then((mod) => mod.PDFViewer),
    { ssr: false },
);

export default function PdfComponent({ path }: { path: string }) {
    const context = usePdfVersionContext();
    const onContext= useFloatingPdfContext();
    const close= ()=> {
        onContext.setOn(false);
    };

    return <div className={`w-full bg-[#1f2937] h-[100dvh] min-h-0 lg:static absolute transform ${onContext.on? 'translate-x-[0%]': 'translate-x-[100%]'} top-0 left-0 right-0 bottom-0 z-[999] transition-all duration-400`}>
        <div className="absolute top-16 right-4 z-[999]">
            <button className="bg-white p-2 rounded-full"><XCircleIcon className="w-8 h-8" onClick={close} /></button>
        </div>
        <PDFViewer
            src={`${path}?v=${context.version}`}
            onReady={context.handleViewerReady}
            onDocumentChange={context.handleDocumentChange}
            style={{ height: "100vh", width: "100%" }}
            {...config}
        />
    </div>;
}
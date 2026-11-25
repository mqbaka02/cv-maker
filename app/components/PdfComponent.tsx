"use client";

import dynamic from "next/dynamic";


const PDFViewer = dynamic(
  () => import("@embedpdf/viewer-react").then((mod) => mod.PDFViewer),
  { ssr: false }
);

export default function PdfComponent ({path}: {path: string}) {
    return <PDFViewer src={path} style={{height: "100vh", width: "100%"}} />;
};
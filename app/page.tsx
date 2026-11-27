"use client";

import MainForm from "./components/MainForm";
import { PDFVersionProvider } from "./context/usePdfVersionContext";
import dynamic from "next/dynamic";

const PdfComponent = dynamic(() => import('./components/pdf/PdfComponent'), { ssr: false });

export default function Home() {
  return (
    <div className="h-full w-full min-h-[100dvh] flex items-center justify-center">
      <main className="w-full flex flex-col gap-0">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2 h-[100dvh] relative overflow-hidden">
          <PDFVersionProvider>
            <MainForm />
            <PdfComponent path={`/api/resume`} />
          </PDFVersionProvider>
        </div>
      </main>
    </div>
  );
}
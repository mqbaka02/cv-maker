import MainForm from "./components/MainForm";
import PdfComponent from "./components/pdf/PdfComponent";
import { PDFVersionProvider } from "./context/usePdfVersionContext";

export default function Home() {
  return (
    <div className="h-full w-full min-h-[100dvh] flex items-center justify-center">
      <main className="w-full flex flex-col gap-0">
        <div className="w-full flex flex-col lg:flex-row gap-2 h-[100dvh] relative overflow-hidden">
          <PDFVersionProvider>
            <MainForm />
            <PdfComponent path={`/api/resume`} />
          </PDFVersionProvider>
        </div>
      </main>
    </div>
  );
}

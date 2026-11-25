import MainForm from "./components/MainForm";
import PdfComponent from "./components/PdfComponent";
import { PDFVersionProvider } from "./context/usePdfVersionContext";

export default function Home() {
  return (
    <div className="h-full min-h-screen flex items-center justify-center">
      <main className="flex flex-col gap-0">
        <div className="flex flex-col lg:flex-row gap-2">
          <PDFVersionProvider>
            <MainForm />
            <PdfComponent path={`/api/resume`} />
          </PDFVersionProvider>
        </div>
      </main>
    </div>
  );
}

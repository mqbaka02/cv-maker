import dynamic from "next/dynamic";
import MainForm from "./components/MainForm";
import PdfComponent from "./components/PdfComponent";

export default function Home() {
  return (
    <div className="h-full min-h-screen flex items-center justify-center">
      <main className="flex flex-col gap-0">
        <div className="flex flex-col lg:flex-row gap-2">
          <MainForm />
          <PdfComponent path="../../latex_output/resume.pdf" />
        </div>
      </main>
    </div>
  );
}

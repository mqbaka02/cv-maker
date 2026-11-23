import MainForm from "./components/MainForm";

export default function Home() {
  return (
    <div className="h-full min-h-screen flex items-center justify-center">
      <main className="flex flex-col gap-2">
        <MainForm />
      </main>
    </div>
  );
}

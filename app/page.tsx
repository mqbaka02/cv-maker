"use client";

import clean from "@/latex_commands/clean";
import compileLatex from "@/latex_commands/compile";

export default function Home() {
  const compile= async ()=> {
    const result = await compileLatex("./latex/resume.tex");
    if (result.success) {
      alert(result.message);
    } else {
      console.error("Compilation failed:", result.message);
    }
  };
  const cleanOutput= async ()=> {
    const result = await clean();
    if (result.success) {
      alert(result.message);
    } else {
      console.error("Compilation failed:", result.message);
    }
  };
  return (
    <div className="h-full min-h-screen flex items-center justify-center">
      <main className="flex gap-2">
        <button className="bg-white text-black active:bg-red-500 p-1 px-2 rounded-sm" onClick={compile}>Compile</button>
        <button className="active:bg-white text-black bg-red-500 p-1 px-2 rounded-sm" onClick={cleanOutput}>Clean</button>
      </main>
    </div>
  );
}

"use server";

import { cookies } from "next/headers";
import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync= promisify(execFile);

export default async function compileLatex() {

    const cookieStore= await cookies();

    const sessionId= cookieStore.get("public_session_id")?.value;

    if (!sessionId) return {success: false, message: "No session created yet!"};
    
    const outputDir = path.resolve(process.cwd(), `workspaces/${sessionId}/latex_output`);
    try{
        await fs.mkdir(outputDir, {recursive: true});

        const {stdout, stderr}= await execFileAsync(
            "pdflatex",
            [
                "-interaction=nonstopmode",
                `-output-directory=${outputDir}`,
                `workspaces/${sessionId}/resume.tex`,
            ],
        );
        console.log("Compilation succesful!");
        return {success: true, message: "Everything Cool!"};
    } catch (error: any) {
        // pdflatex writes compilation errors to stdout, not just stderr
        console.error('Compilation failed:\n', error.stdout || error.message || error);
        return {success: false, message: "Everything NOT Cool: " + (error.stdout || error.message || error)};
  }
};
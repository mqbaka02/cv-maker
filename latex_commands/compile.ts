"use server";

import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync= promisify(execFile);

export default async function compileLatex(filePath: string) {
    
    const outputDir = path.resolve(process.cwd(), "latex_output");
    try{
        await fs.mkdir(outputDir, {recursive: true});

        const {stdout, stderr}= await execFileAsync(
            "pdflatex",
            [
                "-interaction=nonstopmode",
                `-output-directory=${outputDir}`,
                filePath
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
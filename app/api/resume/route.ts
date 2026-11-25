import path from "path";
import fs, { readFileSync } from 'fs';
import { NextResponse } from "next/server";

export async function GET() {
    const filePath= path.join(process.cwd(), "latex_output", "resume.pdf");

    if (!fs.existsSync(filePath))
        return new NextResponse("PDF not found!", {status: 404});

    const fileBuffer= readFileSync(filePath);

    return new NextResponse(fileBuffer, {
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": 'inline; filename="resume.pdf"',
            "Cache-Control": "no-store", //Supports updates
        },
    });
};
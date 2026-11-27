import path from "path";
import fs, { readFileSync } from 'fs';
import { NextResponse } from "next/server";
import { cookies } from "next/headers";


export async function GET() {
    const cookieStore= await cookies();

    const sessionId= cookieStore.get("public_session_id")?.value;

    if (!sessionId) return NextResponse.json("No active session!", {status: 401});

    const filePath= path.join(process.cwd(), "workspaces", sessionId, "resume.pdf");

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
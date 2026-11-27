import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const cookieStore= await cookies();

    let sessionId= cookieStore.get("public_session_id")?.value;

    if (!sessionId) sessionId= crypto.randomUUID();

    const response= NextResponse.json({success: true});

    if (!cookieStore.has("public_session_id")) {
        response.cookies.set("public_session_id", sessionId, {
            httpOnly: true,
            secure: process.env.NODE_ENV=== "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });
    }

    return response;
};
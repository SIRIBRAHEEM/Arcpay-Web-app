import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const kitKey =
    process.env.CIRCLE_KIT_KEY?.trim() ||
    process.env.NEXT_PUBLIC_KIT_KEY?.trim() ||
    "";

  return NextResponse.json({
    hasKey: Boolean(kitKey),
    kitKey
  });
}

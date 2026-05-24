import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function getKitKeySource() {
  if (process.env.CIRCLE_KIT_KEY?.trim()) return "CIRCLE_KIT_KEY";
  if (process.env.KIT_KEY?.trim()) return "KIT_KEY";
  if (process.env.NEXT_PUBLIC_KIT_KEY?.trim()) return "NEXT_PUBLIC_KIT_KEY";

  return "none";
}

export async function GET() {
  const source = getKitKeySource();

  return NextResponse.json(
    {
      hasKitKey: source !== "none",
      source
    },
    {
      headers: {
        "Cache-Control": "no-store"
      }
    }
  );
}

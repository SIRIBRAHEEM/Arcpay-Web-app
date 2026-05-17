import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function normalizeKitKey(value: string) {
  const cleaned = value.trim();

  if (!cleaned) return "";

  if (cleaned.startsWith("KIT_KEY:")) {
    return cleaned;
  }

  return `KIT_KEY:${cleaned}`;
}

export async function GET() {
  const kitKey = normalizeKitKey(
    process.env.CIRCLE_KIT_KEY?.trim() ||
      process.env.NEXT_PUBLIC_KIT_KEY?.trim() ||
      ""
  );

  return NextResponse.json(
    {
      hasKey: Boolean(kitKey),
      kitKey
    },
    {
      headers: {
        "Cache-Control": "no-store"
      }
    }
  );
}

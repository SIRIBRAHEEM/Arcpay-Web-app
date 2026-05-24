import { NextRequest, NextResponse } from "next/server";

type CloudTransaction = {
  id: string;
  type: "send" | "deposit" | "bridge" | "receive" | "request";
  token: "USDC" | "EURC" | "cirBTC";
  amount: string;
  recipient?: string;
  chain?: string;
  state: "pending" | "success" | "error";
  hash?: string;
  explorerUrl?: string;
  memo?: string;
  createdAt: number;
};

type RedisResponse<T> = {
  result?: T;
  error?: string;
};

const MAX_TRANSACTIONS = 100;
const addressRegex = /^0x[a-fA-F0-9]{40}$/;

function getStorageConfig() {
  const url =
    process.env.KV_REST_API_URL?.trim() ||
    process.env.UPSTASH_REDIS_REST_URL?.trim() ||
    "";
  const token =
    process.env.KV_REST_API_TOKEN?.trim() ||
    process.env.UPSTASH_REDIS_REST_TOKEN?.trim() ||
    "";

  if (!url || !token) return null;

  return {
    token,
    url
  };
}

function json(data: unknown, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store"
    }
  });
}

function activityKey(address: string) {
  return `arcpay:activity:${address.toLowerCase()}`;
}

async function redisCommand<T>(args: unknown[]) {
  const storage = getStorageConfig();

  if (!storage) {
    throw new Error(
      "Cloud activity needs Vercel KV or Upstash Redis env vars: KV_REST_API_URL and KV_REST_API_TOKEN."
    );
  }

  const response = await fetch(storage.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${storage.token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(args),
    cache: "no-store"
  });

  const data = (await response.json()) as RedisResponse<T>;

  if (!response.ok || data.error) {
    throw new Error(data.error ?? "Cloud activity storage rejected the request.");
  }

  return data.result;
}

function parseTransactions(value: unknown) {
  if (!value || typeof value !== "string") return [];

  try {
    const parsed = JSON.parse(value) as CloudTransaction[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function isValidTransaction(value: unknown): value is CloudTransaction {
  if (typeof value !== "object" || value === null) return false;

  const transaction = value as Partial<CloudTransaction>;
  return Boolean(
    transaction.id &&
      transaction.type &&
      transaction.token &&
      transaction.amount &&
      transaction.state &&
      typeof transaction.createdAt === "number"
  );
}

export async function GET(request: NextRequest) {
  const address = request.nextUrl.searchParams.get("address") ?? "";

  if (!addressRegex.test(address)) {
    return json({ transactions: [], cloud: false, error: "Invalid wallet address." }, 400);
  }

  try {
    const raw = await redisCommand<string | null>(["GET", activityKey(address)]);
    const transactions = parseTransactions(raw).sort((a, b) => b.createdAt - a.createdAt);

    return json({
      transactions,
      cloud: true
    });
  } catch (error) {
    return json(
      {
        transactions: [],
        cloud: false,
        error: error instanceof Error ? error.message : "Could not load cloud activity."
      },
      503
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      address?: string;
      transaction?: unknown;
    };

    if (!body.address || !addressRegex.test(body.address)) {
      return json({ error: "Invalid wallet address." }, 400);
    }

    if (!isValidTransaction(body.transaction)) {
      return json({ error: "Invalid transaction payload." }, 400);
    }

    const transaction = body.transaction;
    const key = activityKey(body.address);
    const raw = await redisCommand<string | null>(["GET", key]);
    const current = parseTransactions(raw);
    const filtered = current.filter((item) => item.id !== transaction.id);
    const next = [transaction, ...filtered]
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, MAX_TRANSACTIONS);

    await redisCommand(["SET", key, JSON.stringify(next)]);

    return json({
      cloud: true,
      transactions: next
    });
  } catch (error) {
    return json(
      {
        error: error instanceof Error ? error.message : "Could not save cloud activity."
      },
      503
    );
  }
}

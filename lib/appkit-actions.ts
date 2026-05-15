export async function swapStablecoins({
  adapter,
  amount,
  tokenIn,
  tokenOut,
  chain = "Arc_Testnet",
  slippageBps = 50
}: {
  adapter: WalletAdapter;
  amount: string;
  tokenIn: ArcStableToken;
  tokenOut: ArcStableToken;
  chain?: AppKitChain;
  slippageBps?: number;
}) {
  const kitKey = await getResolvedKitKey();

  if (!kitKey) {
    throw new Error(
      "Swap is not configured yet. The app owner needs to add CIRCLE_KIT_KEY or NEXT_PUBLIC_KIT_KEY in Vercel environment variables and redeploy."
    );
  }

  if (tokenIn === tokenOut) {
    throw new Error("Choose two different tokens to swap.");
  }

  if (typeof navigator !== "undefined" && !navigator.onLine) {
    throw new Error("You are offline. Check your internet connection and try again.");
  }

  const kit = getAppKit() as unknown as {
    swap: (params: unknown) => Promise<SwapResult>;
  };

  try {
    return await kit.swap({
      from: {
        adapter,
        chain
      },
      tokenIn,
      tokenOut,
      amountIn: amount,
      config: {
        kitKey,
        slippageBps
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    if (
      message.toLowerCase().includes("failed to fetch") ||
      message.toLowerCase().includes("maximum retry")
    ) {
      throw new Error(
        "Circle swap quote service could not be reached. Turn off Brave Shields/ad blocker, disable VPN, refresh the page, or try Chrome. If it still fails, the selected swap route may be temporarily unavailable."
      );
    }

    if (
      message.toLowerCase().includes("route") ||
      message.toLowerCase().includes("not supported")
    ) {
      throw new Error(
        "This swap route is not supported right now. Try USDC to EURC on Arc Testnet again later."
      );
    }

    throw error;
  }
}

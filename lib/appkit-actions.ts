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
  const kitKey = getKitKey();

  if (!kitKey) {
    throw new Error(
      "Circle App Kit key is missing. Paste it in the Enable Swap card on your dashboard."
    );
  }

  if (tokenIn === tokenOut) {
    throw new Error("Choose two different tokens to swap.");
  }

  const kit = getAppKit() as unknown as {
    swap: (params: unknown) => Promise<SwapResult>;
  };

  return kit.swap({
    from: { adapter, chain },
    tokenIn,
    tokenOut,
    amountIn: amount,
    config: {
      kitKey,
      slippageBps
    }
  });
}

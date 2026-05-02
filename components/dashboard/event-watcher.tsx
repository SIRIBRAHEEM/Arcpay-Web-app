"use client";

import { useEffect } from "react";
import { createPublicClient, formatUnits, http, type Address } from "viem";
import { ARC_TESTNET, ARC_USDC_ADDRESS, ARC_BLOCK_EXPLORER } from "@/lib/arc";
import { ERC20_TRANSFER_ABI } from "@/lib/erc20";
import { saveTransaction } from "@/lib/transactions";
import { useWalletStore } from "@/store/wallet-store";

const publicClient = createPublicClient({
  chain: ARC_TESTNET,
  transport: http(ARC_TESTNET.rpcUrls.default.http[0])
});

export function EventWatcher() {
  const address = useWalletStore((state) => state.address);

  useEffect(() => {
    if (!address) return;

    const unwatchSent = publicClient.watchContractEvent({
      address: ARC_USDC_ADDRESS,
      abi: ERC20_TRANSFER_ABI,
      eventName: "Transfer",
      args: {
        from: address as Address
      },
      onLogs: (logs) => {
        for (const log of logs) {
          const value = log.args.value;
          const to = log.args.to;

          if (!value || !to || !log.transactionHash) continue;

          saveTransaction(address, {
            id: `sent-${log.transactionHash}`,
            type: "send",
            token: "USDC",
            amount: formatUnits(value, 18),
            recipient: to,
            chain: "Arc_Testnet",
            state: "success",
            hash: log.transactionHash,
            explorerUrl: `${ARC_BLOCK_EXPLORER}/tx/${log.transactionHash}`,
            memo: "Detected ERC-20 Transfer",
            createdAt: Date.now()
          });
        }
      },
      onError: () => {
        // Event watching is optional; ignore RPC subscription failures.
      }
    });

    const unwatchReceived = publicClient.watchContractEvent({
      address: ARC_USDC_ADDRESS,
      abi: ERC20_TRANSFER_ABI,
      eventName: "Transfer",
      args: {
        to: address as Address
      },
      onLogs: (logs) => {
        for (const log of logs) {
          const value = log.args.value;

          if (!value || !log.transactionHash) continue;

          saveTransaction(address, {
            id: `received-${log.transactionHash}`,
            type: "receive",
            token: "USDC",
            amount: formatUnits(value, 18),
            chain: "Arc_Testnet",
            state: "success",
            hash: log.transactionHash,
            explorerUrl: `${ARC_BLOCK_EXPLORER}/tx/${log.transactionHash}`,
            memo: "Detected ERC-20 Transfer",
            createdAt: Date.now()
          });
        }
      },
      onError: () => {
        // Optional watcher.
      }
    });

    return () => {
      unwatchSent();
      unwatchReceived();
    };
  }, [address]);

  return null;
}

"use client";

import { useEffect } from "react";
import { createPublicClient, formatUnits, http, type Address } from "viem";
import { ARC_BLOCK_EXPLORER, ARC_TESTNET, ARC_USDC_ADDRESS } from "@/lib/arc";
import { ERC20_TRANSFER_ABI } from "@/lib/erc20";
import { saveTransaction } from "@/lib/transactions";
import { useWalletStore } from "@/store/wallet-store";

type IdleWindow = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout?: number }) => number;
  cancelIdleCallback?: (id: number) => void;
};

export function EventWatcher() {
  const address = useWalletStore((state) => state.address);

  useEffect(() => {
    if (!address || typeof window === "undefined") return;

    const currentAddress = address;
    const idleWindow = window as IdleWindow;
    const unwatchers: Array<() => void> = [];
    let isCleanedUp = false;
    let idleId: number;
    let usedIdleCallback = false;

    function startWatching() {
      if (isCleanedUp) return;

      const publicClient = createPublicClient({
        chain: ARC_TESTNET,
        transport: http(ARC_TESTNET.rpcUrls.default.http[0])
      });

      const unwatchSent = publicClient.watchContractEvent({
        address: ARC_USDC_ADDRESS,
        abi: ERC20_TRANSFER_ABI,
        eventName: "Transfer",
        args: {
          from: currentAddress as Address
        },
        onLogs: (logs) => {
          for (const log of logs) {
            const value = log.args.value;
            const to = log.args.to;

            if (!value || !to || !log.transactionHash) continue;

            void saveTransaction(currentAddress, {
              id: `sent-${log.transactionHash}`,
              type: "send",
              token: "USDC",
              amount: formatUnits(value, 6),
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
          // Event watching is optional. Ignore RPC subscription failures.
        }
      });

      const unwatchReceived = publicClient.watchContractEvent({
        address: ARC_USDC_ADDRESS,
        abi: ERC20_TRANSFER_ABI,
        eventName: "Transfer",
        args: {
          to: currentAddress as Address
        },
        onLogs: (logs) => {
          for (const log of logs) {
            const value = log.args.value;

            if (!value || !log.transactionHash) continue;

            void saveTransaction(currentAddress, {
              id: `received-${log.transactionHash}`,
              type: "receive",
              token: "USDC",
              amount: formatUnits(value, 6),
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
          // Event watching is optional. Ignore RPC subscription failures.
        }
      });

      unwatchers.push(unwatchSent, unwatchReceived);
    }

    if (idleWindow.requestIdleCallback) {
      usedIdleCallback = true;
      idleId = idleWindow.requestIdleCallback(startWatching, { timeout: 5000 });
    } else {
      idleId = window.setTimeout(startWatching, 3000);
    }

    return () => {
      isCleanedUp = true;

      if (usedIdleCallback) {
        idleWindow.cancelIdleCallback?.(idleId);
      } else {
        window.clearTimeout(idleId);
      }

      for (const unwatch of unwatchers) {
        unwatch();
      }
    };
  }, [address]);

  return null;
}

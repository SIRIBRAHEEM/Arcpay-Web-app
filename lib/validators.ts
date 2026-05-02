import { isAddress } from "viem";

const amountRegex = /^(?:0|[1-9]\d*)(?:\.\d{1,18})?$/;

export function validateAmount(value: string) {
  const trimmed = value.trim();

  if (!trimmed) return "Enter an amount.";
  if (!amountRegex.test(trimmed)) return "Enter a valid decimal amount with up to 18 decimals.";

  const numeric = Number(trimmed);

  if (!Number.isFinite(numeric) || numeric <= 0) return "Amount must be greater than zero.";

  return null;
}

export function validateAddress(value: string) {
  const trimmed = value.trim();

  if (!trimmed) return "Enter a recipient address.";
  if (!isAddress(trimmed)) return "Enter a valid EVM address.";

  return null;
}

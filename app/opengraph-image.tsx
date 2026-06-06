import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ArcPay - Private Stablecoin Payments on ARC";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

function ArcPaySymbol() {
  return (
    <svg width="150" height="150" viewBox="0 0 96 96" fill="none">
      <rect width="96" height="96" rx="22" fill="#FFFFFF" />
      <path d="M15 73C18 51 28 25 46 17c10-4 22-1 33 11" stroke="#FF
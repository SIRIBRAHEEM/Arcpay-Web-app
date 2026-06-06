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
    <svg width="118" height="118" viewBox="0 0 96 96" fill="none">
      <rect width="96" height="96" rx="22" fill="#FFFFFF"
import type { Metadata } from "next";
import { Suspense } from "react";
import { RequestPaymentClient } from "@/components/request/request-payment-client";

export const metadata: Metadata = {
  title: "Payment Request",
  description: "Pay a shareable ArcPay request on Arc Testnet."
};

export default function RequestPage() {
  return (
    <Suspense>
      <RequestPaymentClient />
    </Suspense>
  );
}

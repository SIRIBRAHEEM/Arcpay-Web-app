import type { Metadata } from "next";
import { Suspense } from "react";
import { RequestPaymentClient } from "@/components/request/request-payment-client";

export const metadata: Metadata = {
  title: "Pay ArcPay Invoice",
  description: "Review and pay a shareable ArcPay invoice on Arc Testnet."
};

export default function RequestPage() {
  return (
    <Suspense>
      <RequestPaymentClient />
    </Suspense>
  );
}

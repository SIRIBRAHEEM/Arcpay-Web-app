"use client";

import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      theme="dark"
      richColors
      closeButton
      toastOptions={{
        style: {
          background: "#07111f",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "#f8fafc"
        }
      }}
    />
  );
}

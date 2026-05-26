import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { ArcPayLogoFull } from "@/components/arcpay-logo";

export function Footer() {
  return (
    <footer className="bg-white px-4 py-9 dark:bg-[#071a3a] sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 border-t border-slate-950/10 pt-7 text-sm text-slate-600 dark:border-white/10 dark:text-white/68 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <ArcPayLogoFull className="mb-3" markClassName="size-11" textClassName="text-3xl" />
          <p className="mt-2 max-w-xl leading-6">
            Testnet software for stablecoin payments on ARC. Built with Circle
            App Kit and a non-custodial wallet flow.
          </p>
          <p className="mt-3">
            Copyright {new Date().getFullYear()} ArcPay. Not financial advice.
          </p>
          <p className="mt-2">
            Built by{" "}
            <a
              href="https://x.com/siribraheem33"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-[#ffb45f] hover:underline"
            >
              @siribraheem33
            </a>
          </p>
        </div>

        <div className="flex flex-wrap gap-4 md:justify-end">
          <Link
            href="/dashboard"
            className="font-semibold hover:text-[#0b63e5] dark:hover:text-[#ffb45f]"
          >
            Dashboard
          </Link>

          <a
            href="https://docs.arc.io/app-kit"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-semibold hover:text-[#0b63e5] dark:hover:text-[#ffb45f]"
          >
            App Kit docs <ExternalLink className="size-3" />
          </a>

          <a
            href="https://testnet.arcscan.app"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-semibold hover:text-[#0b63e5] dark:hover:text-[#ffb45f]"
          >
            ArcScan <ExternalLink className="size-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}

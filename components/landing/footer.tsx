import Link from "next/link";
import { ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white px-4 py-9 dark:bg-[#03130f] sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 border-t border-emerald-950/10 pt-7 text-sm text-emerald-950/65 dark:border-white/10 dark:text-lime-50/65 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-2xl font-black tracking-tight text-emerald-950 dark:text-lime-50">ArcPay</p>
          <p className="mt-2 max-w-xl">
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
              className="font-bold text-emerald-950 hover:underline dark:text-lime-100"
            >
              @siribraheem33
            </a>
          </p>
        </div>

        <div className="flex flex-wrap gap-4 md:justify-end">
          <Link href="/dashboard" className="font-semibold hover:text-emerald-950 dark:hover:text-lime-50">
            Dashboard
          </Link>

          <a
            href="https://docs.arc.io/app-kit"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-semibold hover:text-emerald-950 dark:hover:text-lime-50"
          >
            App Kit docs <ExternalLink className="size-3" />
          </a>

          <a
            href="https://testnet.arcscan.app"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-semibold hover:text-emerald-950 dark:hover:text-lime-50"
          >
            ArcScan <ExternalLink className="size-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}

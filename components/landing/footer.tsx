import Link from "next/link";
import { ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#fffaf0] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 border-t border-emerald-950/10 pt-8 text-sm text-emerald-950/65 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-2xl font-black tracking-tight text-emerald-950">ArcPay</p>
          <p className="mt-2 max-w-xl">
            Testnet software for stablecoin payments on ARC. Built with Circle
            App Kit and a non-custodial wallet flow.
          </p>
          <p className="mt-3">
            Copyright {new Date().getFullYear()} ArcPay. Not financial advice.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 md:justify-end">
          <Link href="/dashboard" className="font-semibold hover:text-emerald-950">
            Dashboard
          </Link>

          <a
            href="https://docs.arc.network/app-kit"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-semibold hover:text-emerald-950"
          >
            App Kit docs <ExternalLink className="size-3" />
          </a>

          <a
            href="https://testnet.arcscan.app"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-semibold hover:text-emerald-950"
          >
            ArcScan <ExternalLink className="size-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 border-t border-white/10 pt-8 text-sm text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} ArcPay. Testnet software, not financial advice.</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/dashboard" className="hover:text-foreground">
            Dashboard
          </Link>
          <a
            href="https://docs.arc.network/app-kit"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 hover:text-foreground"
          >
            App Kit docs <ExternalLink className="size-3" />
          </a>
          <a
            href="https://testnet.arcscan.app"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 hover:text-foreground"
          >
            ArcScan <ExternalLink className="size-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}

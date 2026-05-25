"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  ExternalLink,
  Globe2,
  KeyRound,
  Loader2,
  Monitor,
  QrCode,
  ShieldCheck,
  Sparkles,
  WalletCards,
  type LucideIcon
} from "lucide-react";
import { toast } from "sonner";
import { ArcPayLogoMark } from "@/components/arcpay-logo";
import { PrivyLoginActions } from "@/components/auth/privy-login-actions";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WalletLogo } from "@/components/ui/wallet-logo";
import { connectWalletProvider } from "@/lib/connect-wallet";
import {
  createLocalPasskey,
  authenticateLocalPasskey,
  isPasskeySupported
} from "@/lib/passkeys";
import { cn } from "@/lib/utils";
import {
  type Eip6963ProviderDetail,
  type WalletCatalogItem,
  type WalletId,
  getFallbackInjectedProviders,
  matchProviderToWallet,
  walletCatalog
} from "@/lib/wallet-discovery";
import { useAuthStore } from "@/store/auth-store";
import { useWalletStore } from "@/store/wallet-store";

type AuthScreenProps = {
  mode: "signup" | "login";
};

type AuthPanel = "social" | "wallet" | "passkey";

const authPanels: Array<{
  value: AuthPanel;
  icon: LucideIcon;
  title: string;
  description: string;
}> = [
  {
    value: "social",
    icon: Globe2,
    title: "Social wallet",
    description: "Email, Google, Apple, X, Discord, or GitHub"
  },
  {
    value: "wallet",
    icon: WalletCards,
    title: "EVM wallet",
    description: "Use a wallet as your Web3 identity"
  },
  {
    value: "passkey",
    icon: KeyRound,
    title: "Passkey",
    description: "Secure this account with your device"
  }
];

const passkeyChoices: Array<{
  icon: LucideIcon;
  label: string;
}> = [
  { icon: ShieldCheck, label: "iCloud Keychain or password manager" },
  { icon: QrCode, label: "Use a phone, tablet or security key" },
  { icon: Monitor, label: "This browser profile" }
];

function useInjectedWalletProviders() {
  const [providers, setProviders] = useState<Eip6963ProviderDetail[]>([]);

  useEffect(() => {
    function addProvider(detail: Eip6963ProviderDetail) {
      setProviders((current) => {
        if (
          current.some(
            (item) =>
              item.info.uuid === detail.info.uuid || item.provider === detail.provider
          )
        ) {
          return current;
        }

        return [...current, detail];
      });
    }

    function onAnnounceProvider(event: Event) {
      const detail = (event as CustomEvent<Eip6963ProviderDetail>).detail;
      if (detail?.provider) {
        addProvider(detail);
      }
    }

    window.addEventListener(
      "eip6963:announceProvider",
      onAnnounceProvider as EventListener
    );
    window.dispatchEvent(new Event("eip6963:requestProvider"));

    const fallbackProviders = getFallbackInjectedProviders();
    if (fallbackProviders) {
      fallbackProviders.forEach(addProvider);
    }

    return () => {
      window.removeEventListener(
        "eip6963:announceProvider",
        onAnnounceProvider as EventListener
      );
    };
  }, []);

  return providers;
}

function getProviderForWallet(
  wallet: WalletCatalogItem,
  providers: Eip6963ProviderDetail[]
) {
  const exact = providers.find((detail) => matchProviderToWallet(wallet, detail));

  if (exact) return exact;

  if (wallet.id === "browser") {
    return providers[0];
  }

  return undefined;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function AuthScreen({ mode }: AuthScreenProps) {
  const router = useRouter();
  const providers = useInjectedWalletProviders();
  const signIn = useAuthStore((state) => state.signIn);
  const setConnected = useWalletStore((state) => state.setConnected);
  const [panel, setPanel] = useState<AuthPanel | null>(null);
  const [email, setEmail] = useState("");
  const [busyWallet, setBusyWallet] = useState<WalletId>();
  const [passkeyBusy, setPasskeyBusy] = useState(false);
  const [passkeysReady, setPasskeysReady] = useState(false);
  const privyEnabled = Boolean(process.env.NEXT_PUBLIC_PRIVY_APP_ID);

  useEffect(() => {
    setPasskeysReady(isPasskeySupported());
  }, []);

  const walletOptions = useMemo(
    () =>
      walletCatalog.map((wallet) => ({
        wallet,
        provider: getProviderForWallet(wallet, providers)
      })),
    [providers]
  );

  const isSignup = mode === "signup";
  const title = isSignup ? "Sign Up" : "Log In";
  const alternateHref = isSignup ? "/login" : "/signup";
  const alternateLabel = isSignup ? "Already have an account?" : "Need an account?";
  const alternateAction = isSignup ? "Log In" : "Sign Up";
  const headline = isSignup
    ? "Create your account with social or EVM wallet"
    : "Log in with social or EVM wallet";
  const supportingCopy = isSignup
    ? "Use Privy for fast social onboarding, or connect an EVM wallet directly when you are ready to approve on-chain payments."
    : "Welcome back. Pick your Privy social session, EVM wallet, or passkey, then connect a wallet when you want to pay or bridge.";

  async function handleWalletSelect(
    wallet: WalletCatalogItem,
    detail?: Eip6963ProviderDetail
  ) {
    if (!detail) {
      window.open(wallet.installUrl, "_blank", "noopener,noreferrer");
      toast.message(`${wallet.name} is not installed`, {
        description: "Install it, refresh ArcPay, then select it again."
      });
      return;
    }

    setBusyWallet(wallet.id);

    try {
      const connection = await connectWalletProvider(detail.provider);

      setConnected(connection);
      signIn({
        method: "wallet",
        label: wallet.name,
        address: connection.address,
        createdAt: Date.now()
      });

      toast.success(isSignup ? "Wallet signup complete" : "Wallet login complete", {
        description: "ArcPay is connected to Arc Testnet."
      });
      router.push("/dashboard");
    } catch (error) {
      toast.error("Wallet connection failed", {
        description:
          error instanceof Error ? error.message : "Confirm the request in your wallet."
      });
    } finally {
      setBusyWallet(undefined);
    }
  }

  async function handlePasskey() {
    const normalizedEmail = email.trim().toLowerCase();

    if (isSignup && !isValidEmail(normalizedEmail)) {
      toast.error("Enter a valid email before creating a passkey.");
      return;
    }

    setPasskeyBusy(true);

    try {
      const record = isSignup
        ? await createLocalPasskey(normalizedEmail)
        : await authenticateLocalPasskey();

      signIn({
        method: "passkey",
        label: record.email,
        email: record.email,
        credentialId: record.id,
        createdAt: Date.now()
      });

      toast.success(isSignup ? "Passkey created" : "Passkey login complete");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Passkey failed", {
        description:
          error instanceof Error ? error.message : "Your browser could not finish passkey auth."
      });
    } finally {
      setPasskeyBusy(false);
    }
  }

  return (
    <main className="auth-shell min-h-screen overflow-x-hidden text-slate-950 dark:text-white">
      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-5xl flex-col px-3 py-4 sm:px-6 sm:py-5 lg:px-8">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/80 text-slate-900 shadow-sm hover:bg-white dark:bg-white/[0.08] dark:text-white dark:hover:bg-white/[0.12]"
            asChild
          >
            <Link href="/" aria-label="Back to home">
              <ArrowLeft className="size-4" />
            </Link>
          </Button>

          <ThemeToggle className="bg-white/80 shadow-sm dark:bg-white/[0.08]" />
        </div>

        <section className="flex flex-1 flex-col items-center justify-center py-6 sm:py-10">
          <Link href="/" className="mb-5 flex items-center gap-3 sm:mb-7 sm:gap-4" aria-label="ArcPay home">
            <ArcPayLogoMark className="size-12 rounded-[1.2rem] sm:size-16 sm:rounded-2xl" active />
            <span className="text-3xl font-black tracking-tight sm:text-5xl">ArcPay</span>
          </Link>

          <div className="w-full max-w-[42rem] rounded-[1.75rem] border border-slate-950/5 bg-white/95 p-4 shadow-[0_28px_100px_rgba(15,23,42,0.13)] backdrop-blur-2xl dark:border-white/[0.07] dark:bg-[#222326] dark:shadow-[0_30px_110px_rgba(0,0,0,0.38)] sm:rounded-[2.35rem] sm:p-8 lg:p-10">
            <div className="mx-auto max-w-[30rem] text-center">
              <p className="text-sm font-black text-slate-600 dark:text-white/72 sm:text-base">{title}</p>
              <h1 className="mt-3 text-balance text-3xl font-black leading-[1.08] tracking-tight text-slate-950 dark:text-white sm:mt-4 sm:text-4xl">
                {headline}
              </h1>
              <p className="mt-3 text-sm font-medium leading-6 text-slate-600 dark:text-white/62 sm:mt-4">
                {supportingCopy}
              </p>
            </div>

            <div className="mx-auto mt-6 grid max-w-[33.5rem] gap-3 sm:mt-8">
              {authPanels.map(({ value, icon: Icon, title: cardTitle, description }) => (
                <AuthMethodCard
                  key={value}
                  active={panel === value}
                  icon={Icon}
                  title={cardTitle}
                  description={description}
                  onClick={() =>
                    setPanel((current) => (current === value ? null : value))
                  }
                  rightSlot={
                    value === "social" ? (
                      <div className="flex -space-x-2">
                        {["G", "A", "X", "D"].map((label) => (
                          <SocialIcon key={label} label={label} compact />
                        ))}
                      </div>
                    ) : value === "wallet" ? (
                      <div className="flex -space-x-2">
                        {(["rabby", "metamask", "binance", "coinbase"] as WalletId[]).map(
                          (wallet) => (
                            <WalletLogo key={wallet} wallet={wallet} compact />
                          )
                        )}
                      </div>
                    ) : (
                      <Sparkles className="size-5 text-slate-500 dark:text-white/72" />
                    )
                  }
                />
              ))}
            </div>

            <div className="mx-auto mt-6 max-w-[33.5rem]">
              {panel === "social" ? (
                <SocialPanel mode={mode} privyEnabled={privyEnabled} />
              ) : null}

              {panel === "wallet" ? (
                <EvmWalletPanel
                  mode={mode}
                  privyEnabled={privyEnabled}
                  options={walletOptions}
                  busyWallet={busyWallet}
                  onSelect={handleWalletSelect}
                />
              ) : null}

              {panel === "passkey" ? (
                <PasskeyPanel
                  email={email}
                  passkeysReady={passkeysReady}
                  mode={mode}
                  busy={passkeyBusy}
                  onEmailChange={setEmail}
                  onSubmit={handlePasskey}
                />
              ) : null}
            </div>

            <div className="mt-7 text-center text-sm font-semibold text-slate-600 dark:text-white/70 sm:mt-8">
              {alternateLabel}{" "}
              <Link
                href={alternateHref}
                className="text-teal-700 underline underline-offset-4 hover:text-teal-900 dark:text-white dark:hover:text-lime-100"
              >
                {alternateAction}
              </Link>
            </div>
          </div>

          <p className="mx-auto mt-5 max-w-xl px-2 text-center text-xs font-bold leading-6 text-slate-500 dark:text-white/48 sm:mt-6">
            By continuing, you keep custody of funds and approve payments with your selected
            wallet or browser credential.
          </p>
        </section>
      </div>
    </main>
  );
}

function AuthMethodCard({
  active,
  icon: Icon,
  title,
  description,
  rightSlot,
  onClick
}: {
  active: boolean;
  icon: LucideIcon;
  title: string;
  description: string;
  rightSlot: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "group flex min-h-[4.5rem] w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition sm:min-h-20 sm:gap-4 sm:rounded-[1.45rem] sm:px-5 sm:py-4",
        active
          ? "border-teal-900/20 bg-slate-950 text-white shadow-[0_18px_55px_rgba(15,23,42,0.18)] dark:border-white/[0.08] dark:bg-[#101113]"
          : "border-slate-950/5 bg-slate-100 text-slate-950 hover:bg-slate-200/80 dark:border-white/[0.06] dark:bg-[#151618] dark:text-white dark:hover:bg-[#1a1b1f]"
      )}
    >
      <span
        className={cn(
          "grid size-10 shrink-0 place-items-center rounded-2xl transition",
          active
            ? "bg-lime-200 text-teal-950"
            : "bg-white text-slate-700 shadow-sm dark:bg-white/[0.08] dark:text-white"
        )}
      >
        <Icon className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-base font-black">{title}</span>
        <span
          className={cn(
            "mt-1 block truncate text-sm font-medium",
            active ? "text-white/72" : "text-slate-600 dark:text-white/58"
          )}
        >
          {description}
        </span>
      </span>
      <span className="shrink-0">{rightSlot}</span>
    </button>
  );
}

function SocialIcon({ label, compact = false }: { label: string; compact?: boolean }) {
  const styles: Record<string, string> = {
    G: "bg-white text-[#4285f4] ring-slate-950/10",
    A: "bg-slate-950 text-white ring-white/20",
    X: "bg-black text-white ring-white/20",
    D: "bg-[#5865f2] text-white ring-white/20",
    GH: "bg-[#24292f] text-white ring-white/20",
    M: "bg-teal-700 text-white ring-white/20"
  };

  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-full text-xs font-black ring-2",
        compact ? "size-8" : "size-10",
        styles[label] ?? "bg-slate-200 text-slate-900 ring-slate-950/10"
      )}
      aria-hidden="true"
    >
      {label}
    </span>
  );
}

function PrivySetupNotice() {
  return (
    <div className="rounded-[1.25rem] border border-amber-400/30 bg-amber-100 px-4 py-3 text-sm font-semibold leading-6 text-amber-950 dark:bg-amber-300/10 dark:text-amber-100">
      Add <span className="font-black">NEXT_PUBLIC_PRIVY_APP_ID</span> in Vercel to turn on
      live Privy social login. The direct wallet connector below still works without it.
    </div>
  );
}

function SocialPanel({
  mode,
  privyEnabled
}: {
  mode: "signup" | "login";
  privyEnabled: boolean;
}) {
  return (
    <div className="space-y-4 rounded-[1.4rem] border border-slate-950/5 bg-slate-100 p-4 dark:border-white/[0.06] dark:bg-[#17171b] sm:p-5">
      <div className="flex flex-wrap items-center gap-2">
        <SocialIcon label="G" />
        <SocialIcon label="A" />
        <SocialIcon label="X" />
        <SocialIcon label="D" />
        <SocialIcon label="GH" />
        <SocialIcon label="M" />
      </div>

      <div>
        <p className="text-base font-black text-slate-950 dark:text-white">
          Privy social wallet login
        </p>
        <p className="mt-1 text-sm font-medium leading-6 text-slate-600 dark:text-white/62">
          Continue with email or social accounts, then ArcPay can create an embedded
          EVM wallet for users who do not already have one.
        </p>
      </div>

      {privyEnabled ? (
        <PrivyLoginActions mode={mode} kind="social" />
      ) : (
        <PrivySetupNotice />
      )}
    </div>
  );
}

function EvmWalletPanel({
  mode,
  privyEnabled,
  options,
  busyWallet,
  onSelect
}: {
  mode: "signup" | "login";
  privyEnabled: boolean;
  options: Array<{ wallet: WalletCatalogItem; provider?: Eip6963ProviderDetail }>;
  busyWallet?: WalletId;
  onSelect: (wallet: WalletCatalogItem, provider?: Eip6963ProviderDetail) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="rounded-[1.4rem] border border-teal-900/10 bg-white p-4 shadow-sm dark:border-white/[0.06] dark:bg-[#17171b] sm:p-5">
        <div className="flex items-start gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-lime-200 text-teal-950">
            <WalletCards className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="font-black text-slate-950 dark:text-white">
              Wallet as your Web3 identity
            </p>
            <p className="mt-1 text-sm font-medium leading-6 text-slate-600 dark:text-white/62">
              Your EVM wallet signs in, approves payments, and keeps your on-chain
              identity portable across ArcPay.
            </p>
            <a
              href="https://learn.rainbow.me/understanding-web3"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-black text-teal-700 hover:text-teal-950 dark:text-lime-200 dark:hover:text-lime-100"
            >
              Learn Web3 with Rainbow
              <ExternalLink className="size-3.5" />
            </a>
          </div>
        </div>

        {privyEnabled ? (
          <PrivyLoginActions
            mode={mode}
            kind="evm"
            className="mt-5 bg-slate-950 text-white hover:bg-slate-800 dark:bg-lime-200 dark:text-teal-950 dark:hover:bg-lime-100"
          />
        ) : null}
      </div>

      <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.18em] text-slate-500 dark:text-white/45">
        <span className="h-px flex-1 bg-slate-950/10 dark:bg-white/10" />
        <span>Installed wallets</span>
        <span className="h-px flex-1 bg-slate-950/10 dark:bg-white/10" />
      </div>

      <WalletPanel options={options} busyWallet={busyWallet} onSelect={onSelect} />
    </div>
  );
}

function WalletPanel({
  options,
  busyWallet,
  onSelect
}: {
  options: Array<{ wallet: WalletCatalogItem; provider?: Eip6963ProviderDetail }>;
  busyWallet?: WalletId;
  onSelect: (wallet: WalletCatalogItem, provider?: Eip6963ProviderDetail) => void;
}) {
  return (
    <div className="max-h-[45svh] space-y-3 overflow-y-auto pr-1.5 sm:max-h-80 sm:pr-2">
      {options.map(({ wallet, provider }) => {
        const installed = Boolean(provider);
        const busy = busyWallet === wallet.id;

        return (
          <button
            key={wallet.id}
            type="button"
            onClick={() => onSelect(wallet, provider)}
            disabled={Boolean(busyWallet)}
            aria-label={`${provider ? "Connect" : "Install"} ${wallet.name}`}
            className={cn(
              "flex min-h-14 w-full items-center gap-4 rounded-[1.35rem] border px-4 py-3 text-left transition",
              installed
                ? "border-teal-950/10 bg-slate-950 text-white hover:border-lime-200/[0.35] hover:bg-teal-950 dark:border-white/[0.08] dark:bg-[#101113] dark:hover:bg-[#17191d]"
                : "border-slate-950/5 bg-slate-100 text-slate-950 hover:bg-slate-200/80 dark:border-white/[0.08] dark:bg-white/[0.06] dark:text-white dark:hover:bg-white/10",
              busyWallet && !busy ? "opacity-45" : "opacity-100"
            )}
          >
            <WalletLogo wallet={wallet.id} providerIcon={provider?.info.icon} />
            <span className="min-w-0 flex-1">
              <span className="block truncate font-black">{wallet.name}</span>
              <span
                className={cn(
                  "mt-0.5 block truncate text-xs font-semibold",
                  installed ? "text-white/68" : "text-slate-600 dark:text-white/58"
                )}
              >
                {installed ? "Ready to connect" : wallet.description}
              </span>
            </span>
            {busy ? (
              <Loader2 className="size-4 animate-spin text-lime-200" />
            ) : installed ? (
              <Badge className="hidden rounded-full bg-lime-200 text-teal-950 dark:bg-lime-200/[0.16] dark:text-lime-100 sm:inline-flex">
                <Check className="mr-1 size-3" />
                Installed
              </Badge>
            ) : (
              <ExternalLink className="size-4 text-slate-500 dark:text-white/45" />
            )}
          </button>
        );
      })}
    </div>
  );
}

function PasskeyPanel({
  mode,
  email,
  passkeysReady,
  busy,
  onEmailChange,
  onSubmit
}: {
  mode: "signup" | "login";
  email: string;
  passkeysReady: boolean;
  busy: boolean;
  onEmailChange: (value: string) => void;
  onSubmit: () => void;
}) {
  const isSignup = mode === "signup";

  return (
    <div className="mx-auto max-w-xl">
      {isSignup ? (
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-slate-700 dark:text-white/78"
            htmlFor="passkey-email"
          >
            Email
          </label>
          <Input
            id="passkey-email"
            type="email"
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
            placeholder="you@example.com"
            className="h-12 rounded-2xl border-slate-950/10 bg-white text-slate-950 placeholder:text-slate-400 dark:border-white/10 dark:bg-black/[0.24] dark:text-white dark:placeholder:text-white/35"
          />
        </div>
      ) : null}

      <div className="overflow-hidden rounded-[1.35rem] border border-slate-950/5 bg-slate-100 dark:border-white/[0.06] dark:bg-[#17171b]">
        {passkeyChoices.map(({ icon: Icon, label }, index) => (
          <div
            key={label}
            className={cn(
              "flex items-center gap-4 px-5 py-4",
              index ? "border-t border-slate-950/10 dark:border-white/[0.12]" : ""
            )}
          >
            <Icon className="size-5 text-slate-700 dark:text-white/72" />
            <span className="flex-1 text-sm font-bold text-slate-700 dark:text-white/78">
              {label}
            </span>
            <ChevronRight className="size-4 text-slate-400 dark:text-white/50" />
          </div>
        ))}
      </div>

      {!passkeysReady ? (
        <div className="mt-4 rounded-2xl border border-amber-400/30 bg-amber-100 px-4 py-3 text-sm font-semibold text-amber-900 dark:bg-amber-300/10 dark:text-amber-100">
          This browser does not expose passkey APIs on the current connection.
        </div>
      ) : null}

      <Button
        type="button"
        onClick={onSubmit}
        disabled={busy || !passkeysReady}
        className="mx-auto mt-7 flex h-12 min-w-52 rounded-full bg-[#ef3f4a] px-7 text-white shadow-[0_18px_45px_rgba(239,63,74,0.22)] hover:bg-[#ff4d58]"
      >
        {busy ? <Loader2 className="mr-2 size-4 animate-spin" /> : <KeyRound className="mr-2 size-4" />}
        {isSignup ? "Create your Passkey" : "Login with Passkey"}
      </Button>
    </div>
  );
}

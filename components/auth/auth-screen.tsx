"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  ExternalLink,
  KeyRound,
  Loader2,
  Mail,
  Monitor,
  QrCode,
  ShieldCheck,
  Smartphone,
  WalletCards,
  type LucideIcon
} from "lucide-react";
import { toast } from "sonner";
import { ArcPayLogoMark } from "@/components/arcpay-logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

type AuthPanel = "wallet" | "passkey" | "email";

const authPanels: Array<{
  value: AuthPanel;
  icon: LucideIcon;
  label: string;
}> = [
  { value: "wallet", icon: WalletCards, label: "Wallet" },
  { value: "passkey", icon: KeyRound, label: "Passkey" },
  { value: "email", icon: Mail, label: "Email" }
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
  const [panel, setPanel] = useState<AuthPanel>("wallet");
  const [email, setEmail] = useState("");
  const [busyWallet, setBusyWallet] = useState<WalletId>();
  const [passkeyBusy, setPasskeyBusy] = useState(false);
  const [emailBusy, setEmailBusy] = useState(false);
  const [passkeysReady, setPasskeysReady] = useState(false);

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

  function handleEmailSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!isValidEmail(normalizedEmail)) {
      toast.error("Enter a valid email address.");
      return;
    }

    setEmailBusy(true);
    signIn({
      method: "email",
      label: normalizedEmail,
      email: normalizedEmail,
      createdAt: Date.now()
    });
    toast.success(isSignup ? "Email signup saved" : "Email login complete");
    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#101112] px-4 py-5 text-white dark:bg-[#070908]">
      <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] w-full max-w-4xl flex-col">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/[0.08] text-white hover:bg-white/[0.12]"
            asChild
          >
            <Link href="/" aria-label="Back to home">
              <ArrowLeft className="size-4" />
            </Link>
          </Button>

          <Link href="/" className="flex items-center gap-3">
            <ArcPayLogoMark className="size-9 rounded-xl" />
            <span className="font-black">ArcPay</span>
          </Link>
        </div>

        <section className="mt-6 flex flex-1 items-center justify-center">
          <div className="w-full rounded-[2rem] border border-white/[0.08] bg-[#252525] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.28)] sm:p-8 lg:p-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-lg font-bold text-white/[0.78]">{title}</p>
              <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
                {panel === "wallet"
                  ? "Select your wallet"
                  : panel === "passkey"
                    ? isSignup
                      ? "Setup your Passkey"
                      : "Use your Passkey"
                    : isSignup
                      ? "Sign up with email"
                      : "Login with email"}
              </h1>
            </div>

            <div className="mx-auto mt-7 grid max-w-lg grid-cols-3 gap-2 rounded-full bg-black/[0.22] p-1.5">
              {authPanels.map(({ value, icon: Icon, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setPanel(value)}
                  aria-pressed={panel === value}
                  className={cn(
                    "inline-flex h-10 items-center justify-center gap-2 rounded-full text-sm font-bold transition",
                    panel === value
                      ? "bg-lime-200 text-emerald-950"
                      : "text-white/[0.68] hover:bg-white/[0.08] hover:text-white"
                  )}
                >
                  <Icon className="size-4" />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>

            <div className="mx-auto mt-8 max-w-2xl">
              {panel === "wallet" ? (
                <WalletPanel
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

              {panel === "email" ? (
                <EmailPanel
                  mode={mode}
                  email={email}
                  busy={emailBusy}
                  onEmailChange={setEmail}
                  onSubmit={handleEmailSubmit}
                />
              ) : null}
            </div>

            <div className="mt-8 text-center text-sm font-semibold text-white/70">
              {alternateLabel}{" "}
              <Link href={alternateHref} className="text-lime-200 underline underline-offset-4">
                {alternateAction}
              </Link>
            </div>
          </div>
        </section>

        <p className="mx-auto mt-6 max-w-xl text-center text-xs font-semibold leading-6 text-white/[0.42]">
          By continuing, you keep custody of funds and approve payments with your selected
          wallet or browser credential.
        </p>
      </div>
    </main>
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
    <div className="max-h-[25rem] space-y-3 overflow-y-auto pr-2">
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
                ? "border-white/[0.08] bg-[#111] hover:border-lime-200/[0.35] hover:bg-[#161a15]"
                : "border-white/[0.08] bg-white/[0.07] hover:bg-white/10",
              busyWallet && !busy ? "opacity-45" : "opacity-100"
            )}
          >
            <WalletBrandIcon wallet={wallet.id} />
            <span className="min-w-0 flex-1">
              <span className="block truncate font-black text-white">{wallet.name}</span>
              <span className="mt-0.5 block truncate text-xs font-semibold text-white/[0.45]">
                {installed ? "Ready to connect" : wallet.description}
              </span>
            </span>
            {busy ? (
              <Loader2 className="size-4 animate-spin text-lime-200" />
            ) : installed ? (
              <Badge className="rounded-full bg-lime-200/[0.16] text-lime-100">
                <Check className="mr-1 size-3" />
                Installed
              </Badge>
            ) : (
              <ExternalLink className="size-4 text-white/[0.45]" />
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
          <label className="mb-2 block text-sm font-bold text-white/[0.78]" htmlFor="passkey-email">
            Email
          </label>
          <Input
            id="passkey-email"
            type="email"
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
            placeholder="you@example.com"
            className="h-12 rounded-2xl border-white/10 bg-black/[0.24] text-white placeholder:text-white/[0.35]"
          />
        </div>
      ) : null}

      <div className="overflow-hidden rounded-[1.35rem] bg-[#17171b]">
        {passkeyChoices.map(({ icon: Icon, label }, index) => (
          <div
            key={label}
            className={cn(
              "flex items-center gap-4 px-5 py-4",
              index ? "border-t border-white/[0.12]" : ""
            )}
          >
            <Icon className="size-5 text-white/[0.72]" />
            <span className="flex-1 text-sm font-bold text-white/[0.78]">{label}</span>
            <ChevronRight className="size-4 text-white/50" />
          </div>
        ))}
      </div>

      {!passkeysReady ? (
        <div className="mt-4 rounded-2xl border border-amber-300/25 bg-amber-300/10 px-4 py-3 text-sm font-semibold text-amber-100">
          This browser does not expose passkey APIs on the current connection.
        </div>
      ) : null}

      <Button
        type="button"
        onClick={onSubmit}
        disabled={busy || !passkeysReady}
        className="mx-auto mt-7 flex h-12 min-w-52 rounded-full bg-red-500/[0.82] px-7 text-white hover:bg-red-500"
      >
        {busy ? <Loader2 className="mr-2 size-4 animate-spin" /> : <KeyRound className="mr-2 size-4" />}
        {isSignup ? "Create your Passkey" : "Login with Passkey"}
      </Button>
    </div>
  );
}

function EmailPanel({
  mode,
  email,
  busy,
  onEmailChange,
  onSubmit
}: {
  mode: "signup" | "login";
  email: string;
  busy: boolean;
  onEmailChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form className="mx-auto max-w-xl" onSubmit={onSubmit}>
      <label className="mb-2 block text-sm font-bold text-white/[0.78]" htmlFor="auth-email">
        Email address
      </label>
      <Input
        id="auth-email"
        type="email"
        value={email}
        onChange={(event) => onEmailChange(event.target.value)}
        placeholder="you@example.com"
        className="h-12 rounded-2xl border-white/10 bg-black/[0.24] text-white placeholder:text-white/[0.35]"
      />

      <Button
        type="submit"
        disabled={busy}
        className="mt-5 h-12 w-full rounded-full bg-lime-200 text-emerald-950 hover:bg-lime-100"
      >
        {busy ? <Loader2 className="mr-2 size-4 animate-spin" /> : <Mail className="mr-2 size-4" />}
        {mode === "signup" ? "Continue with email" : "Login with email"}
      </Button>
    </form>
  );
}

function WalletBrandIcon({ wallet }: { wallet: WalletId }) {
  const baseClass =
    "grid size-9 shrink-0 place-items-center overflow-hidden rounded-full shadow-sm ring-1 ring-white/15";

  if (wallet === "binance") {
    return (
      <span className={cn(baseClass, "bg-[#111]")}>
        <svg viewBox="0 0 32 32" className="size-6" aria-hidden="true">
          <path d="M16 3.8 20.1 8 16 12.1 11.9 8 16 3.8Z" fill="#f0b90b" />
          <path d="M8 11.9 12.1 16 8 20.1 3.9 16 8 11.9Z" fill="#f0b90b" />
          <path d="M24 11.9 28.1 16 24 20.1 19.9 16 24 11.9Z" fill="#f0b90b" />
          <path d="M16 19.9 20.1 24 16 28.1 11.9 24 16 19.9Z" fill="#f0b90b" />
          <path d="M16 11.2 20.8 16 16 20.8 11.2 16 16 11.2Z" fill="#f0b90b" />
        </svg>
      </span>
    );
  }

  if (wallet === "okx") {
    return (
      <span className={cn(baseClass, "bg-white")}>
        <svg viewBox="0 0 32 32" className="size-6" aria-hidden="true">
          <path d="M4 4h8v8H4V4Zm16 0h8v8h-8V4ZM12 12h8v8h-8v-8ZM4 20h8v8H4v-8Zm16 0h8v8h-8v-8Z" fill="#050505" />
        </svg>
      </span>
    );
  }

  if (wallet === "coinbase") {
    return (
      <span className={cn(baseClass, "bg-[#0052ff]")}>
        <span className="grid size-5 place-items-center rounded-full bg-white">
          <span className="size-2.5 rounded-full bg-[#0052ff]" />
        </span>
      </span>
    );
  }

  if (wallet === "metamask") {
    return (
      <span className={cn(baseClass, "bg-[#f5841f]")}>
        <svg viewBox="0 0 32 32" className="size-6" aria-hidden="true">
          <path d="M5 7.5 13.3 4l5.4 4.1L27 7.5 24.5 23 17 28h-2L7.5 23 5 7.5Z" fill="#fff" opacity=".92" />
          <path d="M8.5 11.4 15 15.6l-1.8 5.8-5-2.2.3-7.8Zm15 0-.3 7.8-5 2.2-1.8-5.8 6.5-4.2Z" fill="#f5841f" />
        </svg>
      </span>
    );
  }

  if (wallet === "rabby") {
    return (
      <span className={cn(baseClass, "bg-[#6172ff] text-white")}>
        <span className="text-base font-black">R</span>
      </span>
    );
  }

  if (wallet === "keplr") {
    return (
      <span className={cn(baseClass, "bg-[#0ab4ff]")}>
        <Smartphone className="size-5 text-white" />
      </span>
    );
  }

  return (
    <span className={cn(baseClass, "bg-lime-200 text-emerald-950")}>
      <WalletCards className="size-5" />
    </span>
  );
}

"use client";

const PASSKEY_RECORD_KEY = "arcpay:local-passkey";

export type LocalPasskeyRecord = {
  id: string;
  rawId: string;
  email: string;
  userId: string;
  createdAt: number;
};

function bytesToBase64Url(bytes: Uint8Array) {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function base64UrlToBytes(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

function toArrayBuffer(bytes: Uint8Array) {
  return bytes.buffer.slice(
    bytes.byteOffset,
    bytes.byteOffset + bytes.byteLength
  ) as ArrayBuffer;
}

function randomBytes(length = 32) {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return bytes;
}

export function isPasskeySupported() {
  return Boolean(
    typeof window !== "undefined" &&
      window.PublicKeyCredential &&
      navigator.credentials?.create &&
      navigator.credentials?.get
  );
}

export function getLocalPasskeyRecord() {
  if (typeof window === "undefined") return undefined;

  try {
    const value = window.localStorage.getItem(PASSKEY_RECORD_KEY);
    return value ? (JSON.parse(value) as LocalPasskeyRecord) : undefined;
  } catch {
    return undefined;
  }
}

function saveLocalPasskeyRecord(record: LocalPasskeyRecord) {
  window.localStorage.setItem(PASSKEY_RECORD_KEY, JSON.stringify(record));
}

export async function createLocalPasskey(email: string) {
  if (!isPasskeySupported()) {
    throw new Error("Passkeys are not supported in this browser.");
  }

  const existingRecord = getLocalPasskeyRecord();
  const userId = randomBytes(16);
  const publicKey: PublicKeyCredentialCreationOptions = {
    challenge: toArrayBuffer(randomBytes()),
    rp: {
      name: "ArcPay"
    },
    user: {
      id: toArrayBuffer(userId),
      name: email,
      displayName: email
    },
    pubKeyCredParams: [
      { type: "public-key", alg: -7 },
      { type: "public-key", alg: -257 }
    ],
    authenticatorSelection: {
      residentKey: "preferred",
      userVerification: "preferred"
    },
    timeout: 60000,
    attestation: "none",
    excludeCredentials: existingRecord
      ? [
          {
            id: toArrayBuffer(base64UrlToBytes(existingRecord.rawId)),
            type: "public-key"
          }
        ]
      : undefined
  };

  const credential = (await navigator.credentials.create({
    publicKey
  })) as PublicKeyCredential | null;

  if (!credential) {
    throw new Error("Passkey creation was cancelled.");
  }

  const record: LocalPasskeyRecord = {
    id: credential.id,
    rawId: bytesToBase64Url(new Uint8Array(credential.rawId)),
    email,
    userId: bytesToBase64Url(userId),
    createdAt: Date.now()
  };

  saveLocalPasskeyRecord(record);
  return record;
}

export async function authenticateLocalPasskey() {
  if (!isPasskeySupported()) {
    throw new Error("Passkeys are not supported in this browser.");
  }

  const record = getLocalPasskeyRecord();

  if (!record) {
    throw new Error("No ArcPay passkey was found in this browser.");
  }

  const publicKey: PublicKeyCredentialRequestOptions = {
    challenge: toArrayBuffer(randomBytes()),
    allowCredentials: [
      {
        id: toArrayBuffer(base64UrlToBytes(record.rawId)),
        type: "public-key",
        transports: ["internal", "hybrid", "usb", "nfc", "ble"]
      }
    ],
    timeout: 60000,
    userVerification: "preferred"
  };

  const assertion = (await navigator.credentials.get({
    publicKey
  })) as PublicKeyCredential | null;

  if (!assertion) {
    throw new Error("Passkey login was cancelled.");
  }

  return record;
}

import { AuthScreen } from "@/components/auth/auth-screen";

export const metadata = {
  title: "Log In | ArcPay"
};

export default function LoginPage() {
  return <AuthScreen mode="login" />;
}

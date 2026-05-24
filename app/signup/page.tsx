import { AuthScreen } from "@/components/auth/auth-screen";

export const metadata = {
  title: "Sign Up"
};

export default function SignUpPage() {
  return <AuthScreen mode="signup" />;
}

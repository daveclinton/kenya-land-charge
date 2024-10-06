import { LoginForm } from "@/components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <LoginForm />
      <p className="mt-4">
        Don't have an account?
        <Link href="/signup" className="text-blue-500 hover:text-blue-600">
          Create Account
        </Link>
      </p>
    </div>
  );
}

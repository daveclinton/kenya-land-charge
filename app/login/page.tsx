import UserForm from "@/components/UserForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-6">Create Account</h1>
      <UserForm />
      <p className="mt-4">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-500 hover:text-blue-600">
          Log in
        </Link>
      </p>
    </div>
  );
}

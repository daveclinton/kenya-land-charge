"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EyeIcon, EyeOffIcon, AlertCircle, Loader2 } from "lucide-react";
import { AdminLogin } from "@/lib/actions/user";
import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";

const initialState = {
  message: null,
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="w-full bg-sky-500 hover:bg-sky-600 text-white"
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Logging In
        </>
      ) : (
        "Login"
      )}
    </Button>
  );
};

export default function AdminForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction] = useFormState(AdminLogin as any, initialState);

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-50 to-sky-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <form action={formAction}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Admin Login
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email to sign in to the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {state.message && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <span>{state.message}</span>
                </div>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                name="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  name="password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4 text-sky-500" />
                  ) : (
                    <EyeIcon className="h-4 w-4 text-sky-500" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <SubmitButton />
            <div className="text-sm text-center text-gray-500">
              Don't have an account?{" "}
              <Link href="/signup" className="text-sky-500 hover:underline">
                Create an account
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

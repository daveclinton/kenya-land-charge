"use client";
import { createUser } from "@/lib/actions/user";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, AlertCircle, EyeOffIcon, EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

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
          Creating...
        </>
      ) : (
        "Create Account"
      )}
    </Button>
  );
};

const SignUpForm = () => {
  const [state, formAction] = useFormState(createUser, {});
  const router = useRouter();
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (formData: FormData) => {
    formAction(formData);
  };

  useEffect(() => {
    if (state.success) {
      setAlert({ type: "success", message: state.message as string });
      router.push("/email-confirmation");
    } else if (state.errors) {
      const errorMessages = Object.entries(state.errors)
        .map(([field, errors]) => `${field}: ${errors.join(", ")}`)
        .join("; ");
      setAlert({ type: "error", message: errorMessages });
    } else if (state.message) {
      setAlert({ type: "error", message: state.message });
    }
  }, [state, router]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-50 to-sky-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Create an Account
          </CardTitle>
          <CardDescription>
            Sign up to get started with our service.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input type="text" id="fullName" name="fullName" required />
              {state.errors?.fullName && (
                <p className="text-sm text-destructive">
                  {state.errors.fullName}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" name="email" required />
              {state.errors?.email && (
                <p className="text-sm text-destructive">{state.errors.email}</p>
              )}
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
              {state.errors?.password && (
                <p className="text-sm text-destructive">
                  {state.errors.password}
                </p>
              )}
            </div>
            <SubmitButton />
            <div className="text-sm text-center text-gray-500">
              Already have an account?{" "}
              <Link href="/login" className="text-sky-500 hover:underline">
                Login
              </Link>
            </div>
            {alert.message && (
              <Alert
                variant={alert.type === "error" ? "destructive" : "default"}
              >
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{alert.message}</AlertDescription>
              </Alert>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpForm;

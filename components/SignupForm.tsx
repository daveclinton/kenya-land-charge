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
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
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
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = (formData: FormData) => {
    formAction(formData);
  };

  useEffect(() => {
    if (state.success) {
      toast({
        title: "Success",
        description: state.message,
      });
      router.push("/login");
    } else if (state.errors) {
      Object.entries(state.errors).forEach(([field, errors]) => {
        toast({
          title: "Error",
          description: `${field}: ${errors.join(", ")}`,
          variant: "destructive",
        });
      });
    } else if (state.message) {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast, router]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-50 to-slate-300 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Create an Account</CardTitle>
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
              <Input type="password" id="password" name="password" required />
              {state.errors?.password && (
                <p className="text-sm text-destructive">
                  {state.errors.password}
                </p>
              )}
            </div>
            <SubmitButton />
            {state.message && (
              <p className="text-sm text-destructive mt-2">{state.message}</p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpForm;

"use client";

import { confirmEmail } from "@/lib/actions/user";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

function ConfirmEmailContent() {
  const searchParams = useSearchParams();
  const [message, setMessage] = React.useState<string>("");
  const [status, setStatus] = React.useState<"loading" | "success" | "error">(
    "loading"
  );
  const token = searchParams.get("token");

  React.useEffect(() => {
    if (token) {
      confirmEmail(token).then((result: any) => {
        setMessage(result.message || "An error occurred");
        setStatus(result.success ? "success" : "error");
      });
    }
  }, [token]);

  const iconVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { type: "spring", duration: 0.5 } },
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Email Confirmation
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={iconVariants}
          >
            {status === "loading" && (
              <Loader2 className="w-16 h-16 text-primary animate-spin" />
            )}
            {status === "success" && (
              <CheckCircle className="w-16 h-16 text-green-500" />
            )}
            {status === "error" && (
              <XCircle className="w-16 h-16 text-red-500" />
            )}
          </motion.div>
          <p className="text-xl text-center">
            {message || "Confirming your email..."}
          </p>
          {status !== "loading" && (
            <Link
              href="/login"
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
            >
              Proceed to login
            </Link>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function ConfirmEmail() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Email Confirmation
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <Loader2 className="w-16 h-16 text-primary animate-spin" />
              <p className="text-xl text-center">Loading...</p>
            </CardContent>
          </Card>
        </div>
      }
    >
      <ConfirmEmailContent />
    </Suspense>
  );
}

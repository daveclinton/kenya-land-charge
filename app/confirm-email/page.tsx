"use client";
import { confirmEmail } from "@/lib/actions/user";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

export default function ConfirmEmail() {
  const searchParams = useSearchParams();
  const [message, setMessage] = React.useState(false);
  const token = searchParams.get("token");

  React.useEffect(() => {
    if (token) {
      confirmEmail(token).then((result: any) => {
        setMessage(result.message || "Error occured");
      });
    }
  }, [token]);

  return (
    <Suspense>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold mb-4">Email Confirmation</h1>
        <p className="text-xl">{message || "Confirming your email..."}</p>
      </div>
    </Suspense>
  );
}

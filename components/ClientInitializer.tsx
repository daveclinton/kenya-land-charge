"use client";

import type { User } from "@/lib/db/schema";
import { userStore } from "@/lib/store/useStore";
import { useEffect } from "react";

export function ClientInitializer({ userData }: { userData: User | null }) {
  const setUser = userStore((state) => state.setUser);
  useEffect(() => {
    setUser(userData);
  }, [userData, setUser]);
  return null;
}

"use client";

import { SessionProvider } from "next-auth/react";

export default function SessionContextProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}

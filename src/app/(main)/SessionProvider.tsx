"use client";

import React, { PropsWithChildren, useContext } from "react";

import { UserType } from "../types";
import { createContext } from "react";

interface SessionContextProp {
  userId: string;
  user: UserType;
}

const SessionContext = createContext<SessionContextProp | null>(null);

export default function SessionProvider({
  children,
  value,
}: PropsWithChildren<{ value: SessionContextProp }>) {
  return (
    <SessionContext.Provider value={value}>
      {" "}
      {children}{" "}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}

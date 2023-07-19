"use client";

import React from "react";
import { SessionProvider as Provider } from "next-auth/react";
import { Session } from "next-auth";

interface Props {
  children: React.ReactNode;
  session: Session | null;
}

const SessionProvider = ({ children, session }: Props) => {
  return <Provider session={session}>{children}</Provider>;
};

export default SessionProvider;

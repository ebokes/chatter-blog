import Sidebar from "@/app/components/Sidebar";
import React from "react";

export const metadata = {
  title: "Dashboard",
  description: "Your Backend Dashboard",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar>{children}</Sidebar>
    </>
  );
}

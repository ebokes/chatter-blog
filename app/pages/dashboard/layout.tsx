import Feed from "@/app/components/Feed";
import Sidebar from "@/app/components/Sidebar";
import React from "react";

export const metadata = {
  title: "Dashboard",
  description: "Your Backend Dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Sidebar>{children}</Sidebar>
      </body>
    </html>
  );
}

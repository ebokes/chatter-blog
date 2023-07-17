import Sidebar from "@/app/components/nav/Sidebar";

export const metadata = {
  title: "Blog Feed",
  description: "Latest blog posts from our community",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Sidebar>{children}</Sidebar>;
}

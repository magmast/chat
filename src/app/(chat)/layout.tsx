import { cookies } from "next/headers";
import Script from "next/script";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { api, HydrateClient } from "@/lib/trpc/server";

import { auth } from "../(auth)/auth";

export const experimental_ppr = true;

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, cookieStore] = await Promise.all([auth(), cookies()]);
  const isCollapsed = cookieStore.get("sidebar:state")?.value !== "true";

  void api.settings.byCurrentUser.prefetch();

  return (
    <HydrateClient>
      <Script
        src="https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js"
        strategy="beforeInteractive"
      />
      <SidebarProvider defaultOpen={!isCollapsed}>
        <AppSidebar user={session?.user} />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </HydrateClient>
  );
}

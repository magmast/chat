import { notFound } from "next/navigation";
import { ReactNode } from "react";

import { env } from "@/lib/env";

export default function RegisterLayout({ children }: { children: ReactNode }) {
  if (!env.NEXT_PUBLIC_SIGNUP_ALLOWED) {
    notFound();
  }

  return children;
}

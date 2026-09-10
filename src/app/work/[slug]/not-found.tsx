import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Case study not found",
  robots: { index: false, follow: true },
};

export default function WorkNotFound() {
  return (
    <div className="px-6 pb-24 pt-28">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Case study not found
        </h1>
        <p className="mt-3 text-muted">
          That page does not exist. All published case studies are listed on the
          home page.
        </p>
        <Button className="mt-8" asChild>
          <Link href="/#work">Back to work</Link>
        </Button>
      </div>
    </div>
  );
}

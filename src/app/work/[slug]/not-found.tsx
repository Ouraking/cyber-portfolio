import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not found",
};

export default function WorkNotFound() {
  return (
    <div className="px-6 pt-28 pb-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl tracking-tight text-foreground">
          Write-up not found
        </h1>
        <p className="mt-3 text-muted">
          That project page does not exist. The public notes cover Zero Trust IAM
          and Secure Network Design.
        </p>
        <Link
          href="/#work"
          className="mt-8 inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium btn-primary btn-press"
        >
          Back to work
        </Link>
      </div>
    </div>
  );
}

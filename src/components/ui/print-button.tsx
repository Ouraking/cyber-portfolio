"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * The one piece of interactivity on /resume. `print:hidden` keeps the button
 * itself out of the printed output — printing a button that says "print" is
 * the kind of detail that makes a résumé look generated.
 */
export function PrintButton() {
  return (
    <Button
      variant="outline"
      size="sm"
      className="print:hidden"
      onClick={() => window.print()}
    >
      <Printer aria-hidden="true" />
      Print or save as PDF
    </Button>
  );
}

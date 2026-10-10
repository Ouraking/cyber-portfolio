/**
 * Section separator: a 1px accent-gradient line that fades out at both ends.
 * Replaces the solid `border-t` the sections used to carry. Purely
 * decorative, so it is hidden from assistive technology and from print.
 */
export function GradientDivider() {
  return (
    <div aria-hidden="true" className="mx-auto max-w-6xl px-6 print:hidden">
      <div className="gradient-divider" />
    </div>
  );
}

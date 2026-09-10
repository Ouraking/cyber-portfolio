/**
 * Shared by the navbar and the footer so the two can never drift apart.
 *
 * Hrefs are absolute (`/#work`, not `#work`) so a link clicked from a
 * sub-route such as /work/zero-trust-iam navigates home and then scrolls,
 * rather than looking for an anchor that does not exist on that page.
 *
 * `id` must match the section's DOM id — the navbar's scroll-spy observer
 * looks each one up by it.
 */
export interface NavLink {
  href: string;
  id: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { href: "/#work", id: "work", label: "Work" },
  { href: "/#skills", id: "skills", label: "Skills" },
  { href: "/#certs", id: "certs", label: "Certifications" },
  { href: "/#education", id: "education", label: "Education" },
  { href: "/#contact", id: "contact", label: "Contact" },
];

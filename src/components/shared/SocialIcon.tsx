import type { ReactNode } from "react";

type SocialIconProps = {
  label: string;
  children: ReactNode;
};

export function SocialIcon({ label, children }: SocialIconProps) {
  return (
    <span className="social-icon" aria-label={label}>
      {children}
    </span>
  );
}

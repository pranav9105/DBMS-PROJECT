import type { SVGProps } from 'react';

export function WalletizeLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Walletize logo"
      {...props}
    >
      <rect width="40" height="40" rx="8" fill="hsl(var(--primary))" />
      <path
        d="M12 12L15.5 28L20 18L24.5 28L28 12"
        stroke="hsl(var(--primary-foreground))"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

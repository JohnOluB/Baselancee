import type { SVGProps } from 'react';

const Logo = ({ className, ...props }: SVGProps<SVGSVGElement> & { className?: string }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="32" height="32" rx="8" fill="hsl(var(--primary))" />
      <path
        d="M10.398 23V9.5H18.798C20.698 9.5 22.148 10.02 23.148 11.06C24.148 12.1 24.648 13.46 24.648 15.14C24.648 16.84 24.138 18.22 23.118 19.28C22.098 20.34 20.658 20.87 18.798 20.87H13.248V23H10.398ZM13.248 18.42H18.598C19.698 18.42 20.578 18.09 21.238 17.43C21.898 16.77 22.228 15.93 22.228 14.91C22.228 13.87 21.898 13.03 21.238 12.39C20.578 11.75 19.678 11.43 18.538 11.43H13.248V18.42Z"
        fill="white"
      />
    </svg>
    <span className="text-xl font-bold text-foreground">BaseLance</span>
  </div>
);

export default Logo;

import type { SVGProps } from 'react';

const DiscordIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10c2.42 0 4.65-.86 6.36-2.32l-1.9-1.52c-1.15.82-2.52 1.3-3.96 1.3-4.42 0-8-3.58-8-8s3.58-8 8-8c2.42 0 4.65.86 6.36 2.32l1.9-1.52C16.65 2.86 14.42 2 12 2z"/>
    <path d="M8.5 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm7 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/>
  </svg>
);

export default DiscordIcon;


import type { SVGProps } from "react";

const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5zM12 12l-10-5 10-5 10 5-10 5z" opacity="0.6"/>
    <path d="M2 17l10 5 10-5-10-5-10 5z"/>
  </svg>
);

export default Logo;

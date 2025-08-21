import { IconProps } from "./types";

export const XIcon = ({ size, className, color }: IconProps) => (
  <svg
    width={size ?? 24}
    height={size ?? 24}
    className={className}
    fill="none"
    stroke={color ?? "currentColor"}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

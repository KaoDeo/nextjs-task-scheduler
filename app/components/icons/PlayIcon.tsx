import { IconProps } from "./types";

export const PlayIcon = ({ size, className, color }: IconProps) => (
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
      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a1.5 1.5 0 011.5 1.5M9 10h1.5a1.5 1.5 0 011.5 1.5v1a1.5 1.5 0 01-1.5 1.5H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

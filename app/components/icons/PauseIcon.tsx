import { IconProps } from "./types";

export const PauseIcon = ({ size, className, color }: IconProps) => (
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
      d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

import { IconProps } from "./types";

export const ClockIcon = ({ size, className, color }: IconProps) => (
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
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

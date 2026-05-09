interface DotIconProps {
  color: string;
  size?: number;
}

export const DotIcon = ({ color, size = 8 }: DotIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 8 8"
    fill="none"
    style={{ flexShrink: 0 }}
  >
    <circle cx="4" cy="4" r="4" fill={color} />
  </svg>
);

import { COLOR_TEAL } from '../../colors';

export const MaintainIcon = () => (
  <svg viewBox="0 0 24 24" width={28} height={28} fill="none">
    <path
      d="M12 3l1.5 4h4l-3.2 2.4 1.2 4L12 11l-3.5 2.4 1.2-4L6.5 7h4L12 3z"
      fill={COLOR_TEAL}
    />
    <line
      x1="6"
      y1="16"
      x2="18"
      y2="16"
      stroke={COLOR_TEAL}
      strokeWidth={2}
      strokeLinecap="round"
    />
    <line
      x1="8"
      y1="20"
      x2="16"
      y2="20"
      stroke={COLOR_TEAL}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </svg>
);

import { COLOR_RED } from '../../colors';

export const LoseIcon = () => (
  <svg viewBox="0 0 24 24" width={28} height={28} fill="none">
    <path
      d="M12 5v14M12 19l-5-5M12 19l5-5"
      stroke={COLOR_RED}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

import { COLOR_RED } from '../../colors';

export const FemaleIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width={24}
    height={24}
    aria-hidden="true"
    focusable="false"
    style={{ display: 'block' }}
  >
    <circle
      cx="12"
      cy="8"
      r="5"
      fill="none"
      stroke={COLOR_RED}
      strokeWidth={2.2}
    />
    <path
      d="M12 13v7M8.5 17h7"
      fill="none"
      stroke={COLOR_RED}
      strokeWidth={2.2}
      strokeLinecap="round"
    />
  </svg>
);

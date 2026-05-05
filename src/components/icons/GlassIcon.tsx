import { COLOR_TEAL } from '../../colors';

export const GlassIcon = ({
  index,
  value,
}: {
  index: number;
  value: number;
}) => {
  const amount = Math.min(Math.max(value - index, 0), 1);
  const clipY = 28 - amount * 25; // glass spans y=3 to y=28
  return (
    <svg width="22" height="30" viewBox="0 0 22 30">
      {amount > 0 && amount < 1 && (
        <defs>
          <clipPath id={`fill-${index}`}>
            <rect x="0" y={clipY} width="22" height="30" />
          </clipPath>
        </defs>
      )}
      <path
        d="M3 3 L5 25 Q5 28 11 28 Q17 28 17 25 L19 3 Z"
        fill="none"
        stroke="#B0D4EA"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {amount > 0 && (
        <path
          d="M3 3 L5 25 Q5 28 11 28 Q17 28 17 25 L19 3 Z"
          fill={COLOR_TEAL}
          stroke={COLOR_TEAL}
          strokeWidth="1.5"
          strokeLinejoin="round"
          clipPath={amount < 1 ? `url(#fill-${index})` : undefined}
        />
      )}
      {amount > 0.5 && (
        <ellipse
          cx="11"
          cy="15"
          rx="4"
          ry="1.4"
          fill="rgba(255,255,255,0.35)"
        />
      )}
    </svg>
  );
};

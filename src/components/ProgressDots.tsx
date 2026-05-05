import { COLOR_PRIMARY } from '../colors';
import { ONBOARDING_TOTAL_STEPS } from '../constants';

export const ProgressDots = ({
  current,
  total = ONBOARDING_TOTAL_STEPS,
  activeColor = COLOR_PRIMARY,
  inactiveColor = 'var(--color-border)',
}: {
  current: number;
  total?: number;
  activeColor?: string;
  inactiveColor?: string;
}) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: 6,
        justifyContent: 'center',
        padding: '20px 0 8px',
      }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i + 1 === current ? 22 : 8,
            height: 8,
            borderRadius: 4,
            background: i + 1 === current ? activeColor : inactiveColor,
            transition: 'all 0.3s',
          }}
        />
      ))}
    </div>
  );
};

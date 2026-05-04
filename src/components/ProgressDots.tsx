import { COLOR_PRIMARY } from '../colors';

export const ProgressDots = ({
  current,
  activeColor = COLOR_PRIMARY,
  inactiveColor = 'var(--color-border)',
}: {
  current: number;
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
      {Array.from({ length: 5 }).map((_, i) => (
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

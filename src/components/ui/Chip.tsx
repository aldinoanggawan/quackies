import { Typography } from './Typography';

interface ChipProps {
  label: string;
  value: string;
  accentColor: string;
  valueColor?: string;
  borderColor?: string;
  background?: string;
  progress: number;
}

export const Chip = ({
  label,
  value,
  accentColor,
  valueColor,
  borderColor = 'var(--color-border)',
  background = 'white',
  progress,
}: ChipProps) => (
  <div
    style={{
      background,
      borderRadius: 14,
      borderWidth: 1,
      borderColor,
      padding: '6px 10px',
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      flex: 1,
    }}
  >
    <Typography
      variant="caption"
      color="var(--color-muted)"
      style={{ textAlign: 'center' }}
    >
      {label}
    </Typography>
    <Typography
      variant="label"
      color={valueColor ?? 'var(--color-dark)'}
      style={{ lineHeight: 1, textAlign: 'center' }}
    >
      {value}
    </Typography>
    <div
      style={{
        height: 3,
        borderRadius: 99,
        background: 'rgba(0,0,0,0.07)',
        marginTop: 6,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          right: `${(1 - progress) * 100}%`,
          background: accentColor,
          borderRadius: 99,
        }}
      />
    </div>
  </div>
);

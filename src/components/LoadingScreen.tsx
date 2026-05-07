import { PulsingDuck } from './PulsingDuck';
import { Typography } from './ui/Typography';
import { COLOR_BG, COLOR_MUTED } from '../colors';

export const LoadingScreen = () => (
  <div
    style={{
      minHeight: '100dvh',
      background: COLOR_BG,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
    }}
  >
    <PulsingDuck emotion="sleepy" size={100} />
    <Typography variant="label" color={COLOR_MUTED}>
      Loading…
    </Typography>
  </div>
);

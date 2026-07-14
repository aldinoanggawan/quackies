import { PulsingDuck } from './PulsingDuck';
import { Typography } from './ui/Typography';

export const LoadingScreen = () => (
  <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-5 bg-canvas">
    <PulsingDuck emotion="sleepy" size={100} />
    <Typography variant="label" color={'var(--color-muted)'}>
      Loading...
    </Typography>
  </div>
);

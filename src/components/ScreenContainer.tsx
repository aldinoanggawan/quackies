import { SCREEN_MAX_WIDTH } from '../constants';

interface ScreenContainerProps {
  children: React.ReactNode;
  background?: string;
  style?: React.CSSProperties;
}

export const ScreenContainer = ({
  children,
  background = 'var(--color-bg)',
  style,
}: ScreenContainerProps) => (
  <div style={{ minHeight: '100dvh', background }}>
    <div
      style={{
        maxWidth: SCREEN_MAX_WIDTH,
        margin: '0 auto',
        padding: '0 24px 40px',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100dvh',
        ...style,
      }}
    >
      {children}
    </div>
  </div>
);

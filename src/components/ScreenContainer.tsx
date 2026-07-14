import { classNames } from '../lib/classNames';

interface ScreenContainerProps {
  children: React.ReactNode;
  background?: string;
  className?: string;
}

export const ScreenContainer = ({
  children,
  background = 'var(--color-canvas)',
  className,
}: ScreenContainerProps) => (
  <div className="min-h-[100dvh]" style={{ background }}>
    <div
      className={classNames(
        'mx-auto flex min-h-[100dvh] max-w-screen flex-col px-6 pb-[calc(40px+72px)]',
        className,
      )}
    >
      {children}
    </div>
  </div>
);

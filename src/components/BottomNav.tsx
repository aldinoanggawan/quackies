import { useLocation, useNavigate } from 'react-router-dom';
import { Typography } from './ui/Typography';

const HomeIcon = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 10.5L12 3l9 7.5V21a1 1 0 0 1-1 1H15v-6h-4v6H4a1 1 0 0 1-1-1V10.5Z"
      fill={active ? 'var(--color-brand)' : 'none'}
      stroke={active ? 'var(--color-brand)' : 'var(--color-muted)'}
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

const LogIcon = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect
      x="3.5"
      y="3.5"
      width="17"
      height="17"
      rx="4"
      stroke={active ? 'var(--color-brand)' : 'var(--color-muted)'}
      strokeWidth="1.8"
    />
    <path
      d="M8 12l3 3 5-5"
      stroke={active ? 'var(--color-brand)' : 'var(--color-muted)'}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ProgressIcon = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 17l5-6 4 4 4-6 5 4"
      stroke={active ? 'var(--color-brand)' : 'var(--color-muted)'}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ProfileIcon = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle
      cx="12"
      cy="8"
      r="3.5"
      stroke={active ? 'var(--color-brand)' : 'var(--color-muted)'}
      strokeWidth="1.8"
    />
    <path
      d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
      stroke={active ? 'var(--color-brand)' : 'var(--color-muted)'}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const NAV_ITEMS = [
  { path: '/home', label: 'Home', Icon: HomeIcon },
  { path: '/log', label: 'Log', Icon: LogIcon },
  { path: '/progress', label: 'Progress', Icon: ProgressIcon },
  { path: '/profile', label: 'Profile', Icon: ProfileIcon },
];

export const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="fixed inset-x-0 bottom-0 z-100 border-t border-line bg-canvas">
      <div className="mx-auto flex max-w-screen pb-[env(safe-area-inset-bottom)]">
        {NAV_ITEMS.map(({ path, label, Icon }) => {
          const active = location.pathname === path;
          return (
            <button
              key={path}
              type="button"
              onClick={() => navigate(path)}
              className="flex flex-1 cursor-pointer flex-col items-center gap-1 border-0 bg-transparent py-3 pb-2.5 font-[inherit]"
            >
              <Icon active={active} />
              <Typography
                variant="caption"
                color={active ? 'var(--color-brand)' : 'var(--color-muted)'}
                className={active ? 'font-semibold' : 'font-normal'}
              >
                {label}
              </Typography>
            </button>
          );
        })}
      </div>
    </div>
  );
};

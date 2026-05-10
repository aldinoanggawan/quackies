import { useLocation, useNavigate } from 'react-router-dom';
import { Typography } from './ui/Typography';
import { SCREEN_MAX_WIDTH } from '../constants';
import { COLOR_BG, COLOR_BORDER, COLOR_PRIMARY, COLOR_MUTED } from '../colors';

const HomeIcon = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 10.5L12 3l9 7.5V21a1 1 0 0 1-1 1H15v-6h-4v6H4a1 1 0 0 1-1-1V10.5Z"
      fill={active ? COLOR_PRIMARY : 'none'}
      stroke={active ? COLOR_PRIMARY : COLOR_MUTED}
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
      stroke={active ? COLOR_PRIMARY : COLOR_MUTED}
      strokeWidth="1.8"
    />
    <path
      d="M8 12l3 3 5-5"
      stroke={active ? COLOR_PRIMARY : COLOR_MUTED}
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
      stroke={active ? COLOR_PRIMARY : COLOR_MUTED}
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
      stroke={active ? COLOR_PRIMARY : COLOR_MUTED}
      strokeWidth="1.8"
    />
    <path
      d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
      stroke={active ? COLOR_PRIMARY : COLOR_MUTED}
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
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: COLOR_BG,
        borderTop: `1px solid ${COLOR_BORDER}`,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: SCREEN_MAX_WIDTH,
          margin: '0 auto',
          display: 'flex',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        {NAV_ITEMS.map(({ path, label, Icon }) => {
          const active = location.pathname === path;
          return (
            <button
              key={path}
              type="button"
              onClick={() => navigate(path)}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                padding: '12px 0 10px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              <Icon active={active} />
              <Typography
                variant="caption"
                color={active ? COLOR_PRIMARY : COLOR_MUTED}
                style={{ fontWeight: active ? 600 : 400 }}
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

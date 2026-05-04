import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Duck } from '../../components/duck/Duck';
import { OnboardingCTA } from '../../components/OnboardingCTA';
import { ScreenContainer } from '../../components/ScreenContainer';
import { Typography } from '../../components/ui/Typography';
import {
  COLOR_TEAL,
  COLOR_WATER_CARD_BG,
  COLOR_TEAL_BORDER,
  alpha,
} from '../../colors';
import { ProgressDots } from '../../components/ProgressDots';

const GlassIcon = ({ index, value }: { index: number; value: number }) => {
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

const GlassRow = ({ value, total }: { value: number; total: number }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      gap: 14,
      alignItems: 'flex-end',
    }}
  >
    {Array.from({ length: total }, (_, i) => (
      <GlassIcon key={i} index={i} value={value} />
    ))}
  </div>
);

export const StayHydrated = () => {
  const navigate = useNavigate();

  return (
    <ScreenContainer background="var(--color-water-bg)">
      <ProgressDots
        current={2}
        activeColor={COLOR_TEAL}
        inactiveColor={alpha(COLOR_TEAL, 0.2)}
      />

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 24,
        }}
      >
        {/* Card */}
        <div
          style={{
            background: COLOR_WATER_CARD_BG,
            borderRadius: 24,
            position: 'relative',
            overflow: 'hidden',
            border: `1px solid ${COLOR_TEAL_BORDER}`,
            paddingTop: 75,
            paddingBottom: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: 240,
          }}
        >
          {/* Swimming duck */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Duck emotion="swimming" size={110} />
          </motion.div>

          {/* 250 ml floating card */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: 18,
              right: 18,
              background: 'white',
              borderRadius: 14,
              padding: '7px 14px',
              boxShadow: `0 2px 12px ${alpha(COLOR_TEAL, 0.22)}`,
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }}
          >
            <Typography variant="label-strong" color={COLOR_TEAL}>
              💧 250 ml
            </Typography>
          </motion.div>

          {/* Wave at bottom */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 100,
              overflow: 'hidden',
            }}
          >
            <motion.svg
              width="600"
              height="100"
              viewBox="0 0 600 100"
              preserveAspectRatio="none"
              animate={{ x: [0, -200] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
            >
              <rect
                x="0"
                y="40"
                width="600"
                height="60"
                fill={alpha(COLOR_TEAL, 0.22)}
              />
              <path
                d="M0 25 C25 10 75 40 100 25 C125 10 175 40 200 25 C225 10 275 40 300 25 C325 10 375 40 400 25 C425 10 475 40 500 25 C525 10 575 40 600 25 L600 100 L0 100 Z"
                fill={alpha(COLOR_TEAL, 0.22)}
              />
            </motion.svg>
          </div>
        </div>

        {/* Glass icons */}
        <GlassRow value={2.5} total={5} />

        {/* Text */}
        <div>
          <Typography
            variant="heading"
            as="h1"
            style={{ margin: '0 0 10px', letterSpacing: -0.4 }}
          >
            Stay hydrated
          </Typography>
          <Typography
            variant="body"
            color="var(--color-muted)"
            style={{ margin: 0, lineHeight: 1.65 }}
          >
            Log water intake with a tap. Hit your daily goal effortlessly.
          </Typography>
        </div>
      </div>

      <OnboardingCTA color={COLOR_TEAL} onClick={() => navigate('/onboarding/4')} />
    </ScreenContainer>
  );
};

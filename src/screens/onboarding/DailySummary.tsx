import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Duck } from '../../components/duck/Duck';
import { OnboardingCTA } from '../../components/OnboardingCTA';
import { ScreenContainer } from '../../components/ScreenContainer';
import { Typography } from '../../components/ui/Typography';
import {
  COLOR_PRIMARY,
  COLOR_PRIMARY_MUTED,
  COLOR_TEAL,
  COLOR_RED,
  COLOR_TEAL_CARD_BG,
} from '../../colors';
import { ProgressDots } from '../../components/ProgressDots';

const Chip = ({
  label,
  value,
  accentColor,
  valueColor,
  borderColor = 'var(--color-border)',
  background = 'white',
  progress,
}: {
  label: string;
  value: string;
  accentColor: string;
  valueColor?: string;
  borderColor?: string;
  background?: string;
  progress: number;
}) => {
  return (
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
};

export const DailySummary = () => {
  const navigate = useNavigate();

  return (
    <ScreenContainer>
      <ProgressDots current={3} />

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 28,
        }}
      >
        {/* Card */}
        <div
          style={{
            background: 'white',
            borderRadius: 24,
            padding: '24px 24px 20px',
            border: '1px solid var(--color-border)',
            position: 'relative',
            overflow: 'visible',
            boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
          }}
        >
          {/* Calories remaining */}
          <div style={{ paddingRight: 90 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <Typography
                variant="display"
                color={COLOR_PRIMARY}
                style={{ lineHeight: 1 }}
              >
                842
              </Typography>
              <Typography variant="body" as="span" color="var(--color-muted)">
                kcal
              </Typography>
            </div>
            <Typography
              variant="caption"
              as="p"
              color="var(--color-muted)"
              style={{
                margin: '0 0 4px',
                textTransform: 'uppercase',
                letterSpacing: 0.4,
              }}
            >
              Remaining today
            </Typography>
          </div>

          {/* Proud duck */}
          <motion.div
            style={{ position: 'absolute', top: 10, right: 20 }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.5, ease: 'easeInOut', repeat: Infinity }}
          >
            <Duck emotion="proud" size={90} />
          </motion.div>

          {/* Breakdown chips */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              marginTop: 40,
            }}
          >
            <Chip
              label="TDEE"
              value="2,200"
              accentColor={COLOR_PRIMARY_MUTED}
              progress={1}
            />
            <Typography variant="label-strong" color="var(--color-muted)">
              −
            </Typography>
            <Chip
              label="Eaten"
              value="1,180"
              accentColor={COLOR_RED}
              progress={0.54}
            />
            <Typography variant="label-strong" color="var(--color-muted)">
              +
            </Typography>
            <Chip
              label="Burned"
              value="180"
              accentColor={COLOR_TEAL}
              valueColor={COLOR_TEAL}
              borderColor={COLOR_TEAL}
              progress={0.08}
              background={COLOR_TEAL_CARD_BG}
            />
          </div>

          {/* Activity row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
              background: COLOR_TEAL_CARD_BG,
              borderRadius: 14,
              borderWidth: 1,
              borderColor: COLOR_TEAL,
              padding: '10px 14px',
              marginTop: 18,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: COLOR_TEAL,
                  flexShrink: 0,
                }}
              />
              <Typography variant="label">Indoor cycling · 45 min</Typography>
            </div>
            <Typography
              variant="label"
              color={COLOR_TEAL}
              style={{ flexShrink: 0 }}
            >
              +180 kcal earned
            </Typography>
          </div>
        </div>

        {/* Text */}
        <div>
          <Typography
            variant="heading"
            as="h1"
            style={{ margin: '0 0 10px', letterSpacing: -0.4 }}
          >
            Your day, at a glance
          </Typography>
          <Typography
            variant="body"
            color="var(--color-muted)"
            style={{ margin: 0, lineHeight: 1.65 }}
          >
            See exactly where you stand — calories eaten, burned, and left for
            the day.
          </Typography>
        </div>
      </div>

      <OnboardingCTA onClick={() => navigate('/onboarding/5')} />
    </ScreenContainer>
  );
};

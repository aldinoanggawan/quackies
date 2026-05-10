import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Typography } from '../components/ui/Typography';
import { Chip } from '../components/ui/Chip';
import { MealsSection } from '../components/MealsSection';
import { WorkoutSection } from '../components/WorkoutSection';
import { HydrationSection } from '../components/HydrationSection';
import { ScreenContainer } from '../components/ScreenContainer';
import { Duck } from '../components/duck/Duck';
import type { DuckEmotion } from '../components/duck/Duck';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../hooks/useProfile';
import { useDailySummary } from '../hooks/useDailySummary';
import { formatDate, greeting } from '../lib/dateHelpers';
import {
  COLOR_BG,
  COLOR_PRIMARY_CARD_BG,
  COLOR_BORDER,
  COLOR_MUTED,
  COLOR_DARK,
  COLOR_PRIMARY,
  COLOR_PRIMARY_MUTED,
  COLOR_RED,
  COLOR_TEAL,
  COLOR_TEAL_CARD_BG,
} from '../colors';

const duckEmotion = (remaining: number): DuckEmotion => {
  if (Math.abs(remaining) <= 50) return 'proud';
  if (remaining > 500) return 'happy';
  if (remaining >= 100) return 'worried';
  return 'sad';
};

export const HomeScreen = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  const today = new Date();

  useEffect(() => {
    if (!profileLoading && !profile) navigate('/onboarding');
  }, [profileLoading, profile, navigate]);

  const { meals, workouts, eaten, burned, remaining, refresh } =
    useDailySummary(profile?.tdee ?? 0, today);

  return (
    <ScreenContainer background={COLOR_BG} style={{ gap: 20, paddingTop: 38 }}>
      {/* Top bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <div>
          <Typography variant="label" color={COLOR_MUTED}>
            {formatDate(today)}
          </Typography>
          <Typography variant="subheading" color={COLOR_DARK}>
            {greeting()}, {profile?.pal_name ?? '…'}
          </Typography>
        </div>

        {/* Streak pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            background: COLOR_PRIMARY_CARD_BG,
            border: `1.5px solid ${COLOR_BORDER}`,
            borderRadius: 9999,
            padding: '4px 10px',
          }}
        >
          <span style={{ fontSize: 14 }}>🔥</span>
          <Typography variant="label-strong" color={COLOR_DARK}>
            7 days
          </Typography>
        </div>
      </div>

      {/* Hero card */}
      <div
        style={{
          background: 'white',
          border: `1px solid ${COLOR_BORDER}`,
          borderRadius: 24,
          padding: '24px 24px 20px',
          position: 'relative',
          overflow: 'visible',
          boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
        }}
      >
        {/* Big number */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 6,
            paddingRight: 90,
          }}
        >
          <Typography
            variant="display"
            color={COLOR_PRIMARY}
            style={{ lineHeight: 1 }}
          >
            {remaining.toLocaleString()}
          </Typography>
          <Typography variant="body" as="span" color={COLOR_MUTED}>
            kcal
          </Typography>
        </div>

        {/* Eyebrow */}
        <Typography
          variant="caption"
          as="p"
          color={COLOR_MUTED}
          style={{
            margin: '4px 0 4px',
            textTransform: 'uppercase',
            letterSpacing: 0.4,
          }}
        >
          Calories remaining
        </Typography>

        {/* Duck */}
        <motion.div
          style={{ position: 'absolute', top: 12, right: 16 }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.5, ease: 'easeInOut', repeat: Infinity }}
        >
          <Duck emotion={duckEmotion(remaining)} size={80} />
        </motion.div>

        {/* Formula chips */}
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
            value={(profile?.tdee ?? 0).toLocaleString()}
            accentColor={COLOR_PRIMARY_MUTED}
            progress={1}
          />
          <Typography variant="label-strong" color={COLOR_MUTED}>
            −
          </Typography>
          <Chip
            label="Eaten"
            value={eaten.toLocaleString()}
            accentColor={COLOR_RED}
            progress={profile?.tdee ? eaten / profile.tdee : 0}
          />
          <Typography variant="label-strong" color={COLOR_MUTED}>
            +
          </Typography>
          <Chip
            label="Burned"
            value={burned.toLocaleString()}
            accentColor={COLOR_TEAL}
            valueColor={burned > 0 ? COLOR_TEAL : undefined}
            borderColor={burned > 0 ? COLOR_TEAL : undefined}
            background={burned > 0 ? COLOR_TEAL_CARD_BG : undefined}
            progress={profile?.tdee ? burned / profile.tdee : 0}
          />
        </div>
      </div>
      <MealsSection meals={meals} />
      {user && (
        <WorkoutSection
          workouts={workouts}
          userId={user.id}
          date={today}
          onSaved={refresh}
        />
      )}
      <HydrationSection date={today} />
    </ScreenContainer>
  );
};

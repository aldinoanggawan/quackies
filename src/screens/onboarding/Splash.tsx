import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PulsingDuck } from '../../components/PulsingDuck';
import { OnboardingCTA } from '../../components/OnboardingCTA';
import { SCREEN_MAX_WIDTH } from '../../constants';
import { Typography } from '../../components/ui/Typography';
import {
  COLOR_PRIMARY,
  COLOR_TEAL,
  COLOR_PRIMARY_SURFACE,
  COLOR_PRIMARY_BORDER,
} from '../../colors';

const BLOB_BASE: React.CSSProperties = {
  position: 'absolute',
  borderRadius: '50%',
  filter: 'blur(52px)',
  pointerEvents: 'none',
};

export const Splash = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100dvh',
        background: 'var(--color-bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px 44px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Warm yellow blob — top right */}
      <motion.div
        animate={{ scale: [1, 1.12, 1], x: [0, 14, 0], y: [0, -14, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          ...BLOB_BASE,
          top: -90,
          right: -90,
          width: 280,
          height: 280,
          background: 'rgba(232,212,74,0.55)',
        }}
      />
      {/* Teal blob — bottom left */}
      <motion.div
        animate={{ scale: [1, 1.18, 1], x: [0, -16, 0], y: [0, 14, 0] }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        style={{
          ...BLOB_BASE,
          bottom: -110,
          left: -90,
          width: 300,
          height: 300,
          background: 'rgba(59,184,138,0.45)',
        }}
      />
      {/* Pink blob — bottom right */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], x: [0, 10, 0], y: [0, 20, 0] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
        style={{
          ...BLOB_BASE,
          bottom: -70,
          right: -70,
          width: 220,
          height: 220,
          background: 'rgba(232,64,96,0.35)',
        }}
      />

      <div
        style={{
          width: '100%',
          maxWidth: SCREEN_MAX_WIDTH,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 1,
        }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          style={{
            background: COLOR_PRIMARY_SURFACE,
            border: `1.5px solid ${COLOR_PRIMARY_BORDER}`,
            borderRadius: 20,
            padding: '5px 14px',
            marginBottom: 28,
            letterSpacing: 0.2,
          }}
        >
          <Typography variant="label-strong" color={COLOR_PRIMARY}>
            ✦ Your pocket nutrition pal
          </Typography>
        </motion.div>

        {/* Duck with pulsing ring */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          style={{ marginBottom: 28 }}
        >
          <PulsingDuck emotion="happy" size={120} />
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <Typography
            variant="heading-lg"
            as="h1"
            style={{
              textAlign: 'center',
              lineHeight: 1.15,
              margin: '0 0 12px',
              letterSpacing: -0.5,
            }}
          >
            Eat well, <span style={{ color: COLOR_PRIMARY }}>track</span> with{' '}
            <span style={{ color: COLOR_TEAL }}>joy</span>
          </Typography>
        </motion.div>

        {/* Sub-copy */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42 }}
        >
          <Typography
            variant="body"
            color="var(--color-muted)"
            style={{
              textAlign: 'center',
              lineHeight: 1.65,
              margin: '0 0 28px',
              maxWidth: 300,
            }}
          >
            Your playful daily companion for calories, hydration, and healthy
            habits.
          </Typography>
        </motion.div>

        {/* Pill tags */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: 36,
          }}
        >
          {['Calorie tracking', 'Hydration', 'Streaks'].map((tag) => (
            <Typography
              key={tag}
              variant="label"
              color="var(--color-muted)"
              style={{
                background: 'rgba(240,228,192,0.85)',
                border: '1px solid var(--color-border)',
                borderRadius: 20,
                padding: '5px 14px',
              }}
            >
              {tag}
            </Typography>
          ))}
        </motion.div>

        {/* CTA */}
        <OnboardingCTA
          onClick={() => navigate('/onboarding/2')}
          label="Get started →"
        />
        <Typography
          variant="body"
          as="p"
          color="var(--color-muted)"
          style={{ textAlign: 'center', margin: '16px 0 0' }}
        >
          Already have an account?{' '}
          <span
            style={{
              color: COLOR_PRIMARY,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Log in
          </span>
        </Typography>
      </div>
    </div>
  );
};

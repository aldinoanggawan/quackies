import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PulsingDuck } from '../../components/PulsingDuck';
import { useOnboarding } from '../../store/useOnboarding';
import { OnboardingCTA } from '../../components/OnboardingCTA';
import { ScreenContainer } from '../../components/ScreenContainer';
import { Typography } from '../../components/ui/Typography';
import {
  COLOR_PRIMARY,
  COLOR_WARM_CARD_BG,
  COLOR_PRIMARY_TAG_BG,
} from '../../colors';
import { ProgressDots } from '../../components/ProgressDots';
import { TRANSITION_DURATION_MS } from '../../constants';

const QUICK_NAMES = ['Waddles', 'Pudding', 'Biscuit', 'Mochi'];

export const MeetYourPal = () => {
  const navigate = useNavigate();
  const { palName, setPalName } = useOnboarding();
  const [name, setName] = useState(palName);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(
      () => inputRef.current?.focus(),
      TRANSITION_DURATION_MS,
    );
    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    setPalName(name.trim() || 'Quackers');
    navigate('/onboarding/6');
  };

  return (
    <ScreenContainer>
      <ProgressDots current={4} />

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 20,
        }}
      >
        {/* Card */}
        <div
          style={{
            background: COLOR_WARM_CARD_BG,
            borderRadius: 24,
            padding: '28px 24px 28px',
            position: 'relative',
            boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Speech bubble */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: 40,
              right: 18,
              background: 'white',
              border: '1.5px solid var(--color-border)',
              borderRadius: '14px 14px 14px 4px',
              padding: '8px 12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
              maxWidth: 100,
              lineHeight: 1.4,
            }}
          >
            <Typography variant="label">Quack! Nice to meet you! 🐥</Typography>
          </motion.div>

          {/* Pulsing ring + excited duck */}
          <div style={{ marginTop: 80 }}>
            <PulsingDuck emotion="excited" size={110} />
          </div>

          {/* Name tag */}
          <div
            style={{
              background: COLOR_PRIMARY_TAG_BG,
              border: '1px solid var(--color-border)',
              borderRadius: 20,
              padding: '4px 16px',
              marginBottom: 40,
              textAlign: 'center',
            }}
          >
            <Typography variant="label" color="var(--color-muted)">
              your pal /{' '}
              <strong style={{ color: COLOR_PRIMARY }}>
                {name.trim() || 'Quackers'}
              </strong>
            </Typography>
          </div>
        </div>

        {/* Name input */}
        <div>
          <Typography
            variant="input-label"
            color="var(--color-muted)"
            style={{ display: 'block', marginBottom: 6 }}
          >
            Give your pal a name
          </Typography>
          <input
            ref={inputRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={20}
            placeholder="Enter name"
            style={{
              width: '100%',
              boxSizing: 'border-box',
              background: 'white',
              border: '2px solid var(--color-border)',
              borderRadius: 14,
              padding: '14px 16px',
              fontSize: 17,
              fontWeight: 500,
              color: 'var(--color-dark)',
              outline: 'none',
              fontFamily: 'inherit',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => (e.target.style.borderColor = COLOR_PRIMARY)}
            onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')}
          />
        </div>

        {/* Quick-pick chips */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {QUICK_NAMES.map((n) => (
            <button
              key={n}
              onClick={() => setName(n)}
              style={{
                background: name === n ? COLOR_PRIMARY : COLOR_PRIMARY_TAG_BG,
                border: `1.5px solid ${name === n ? COLOR_PRIMARY : 'var(--color-border)'}`,
                borderRadius: 100,
                padding: '6px 14px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: 'inherit',
              }}
            >
              <Typography
                variant="label-strong"
                color={name === n ? 'white' : 'var(--color-muted)'}
              >
                {n}
              </Typography>
            </button>
          ))}
        </div>

        {/* Text */}
        <div>
          <Typography
            variant="heading"
            as="h1"
            style={{ margin: '0 0 10px', letterSpacing: -0.4 }}
          >
            Meet your pal
          </Typography>
          <Typography
            variant="body"
            color="var(--color-muted)"
            style={{ margin: 0, lineHeight: 1.65 }}
          >
            Name your duck companion — they'll cheer you on every single day.
          </Typography>
        </div>
      </div>

      <OnboardingCTA onClick={handleNext} />
    </ScreenContainer>
  );
};

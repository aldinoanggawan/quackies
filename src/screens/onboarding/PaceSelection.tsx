import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Duck, type DuckEmotion } from '../../components/duck/Duck';
import { OnboardingCTA } from '../../components/OnboardingCTA';
import { ScreenContainer } from '../../components/ScreenContainer';
import { SelectionCard } from '../../components/SelectionCard';
import { Typography } from '../../components/ui/Typography';
import { ProgressDots } from '../../components/ProgressDots';
import { useOnboarding } from '../../store/useOnboarding';
import type { PaceId } from '../../store/useOnboarding';
import { COLOR_PRIMARY } from '../../colors';

interface Pace {
  id: PaceId;
  emoji: string;
  label: string;
  subtitle: string;
  emotion: DuckEmotion;
}

const PACES: Pace[] = [
  {
    id: 'slow',
    emoji: '🐢',
    label: 'Slow & sustainable',
    subtitle: 'Gentle pace · lower risk of burnout',
    emotion: 'happy',
  },
  {
    id: 'balanced',
    emoji: '⚖️',
    label: 'Balanced',
    subtitle: 'Recommended · steady and realistic',
    emotion: 'proud',
  },
  {
    id: 'fast',
    emoji: '⚡',
    label: 'Faster results',
    subtitle: 'Faster results · higher effort',
    emotion: 'determined',
  },
];

export const PaceSelection = () => {
  const navigate = useNavigate();
  const { setPace } = useOnboarding();
  const [selected, setSelected] = useState<PaceId>('balanced');

  const selectedPace = PACES.find((p) => p.id === selected)!;

  const handleNext = () => {
    setPace(selected);
    navigate('/onboarding/8');
  };

  return (
    <ScreenContainer>
      <ProgressDots current={6} />

      <div style={{ paddingTop: 16 }}>
        <Typography
          variant="label-strong"
          color={COLOR_PRIMARY}
          style={{ display: 'block', marginBottom: 8 }}
        >
          Step 6 of 6
        </Typography>
        <Typography
          variant="heading"
          as="h1"
          style={{ margin: '0 0 28px', letterSpacing: -0.4 }}
        >
          How fast do you want to reach your goal?
        </Typography>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {PACES.map((pace, i) => (
          <SelectionCard
            key={pace.id}
            isSelected={selected === pace.id}
            onClick={() => setSelected(pace.id)}
            icon={pace.emoji}
            label={pace.label}
            subtitle={pace.subtitle}
            animationDelay={0.1 + i * 0.08}
          />
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 52,
          flex: 1,
          alignItems: 'flex-start',
          paddingBottom: 8,
        }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.5, ease: 'easeInOut', repeat: Infinity }}
        >
          <Duck emotion={selectedPace.emotion} size={110} />
        </motion.div>
      </div>

      <OnboardingCTA onClick={handleNext} label="Let's go →" />
    </ScreenContainer>
  );
};

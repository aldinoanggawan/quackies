import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Duck, type DuckEmotion } from '../../components/duck/Duck';
import { OnboardingCTA } from '../../components/OnboardingCTA';
import { ScreenContainer } from '../../components/ScreenContainer';
import { SelectionCard } from '../../components/SelectionCard';
import { Typography } from '../../components/ui/Typography';
import { ProgressDots } from '../../components/ProgressDots';
import { useOnboarding } from '../../store/useOnboarding';
import { COLOR_PRIMARY, COLOR_RED, COLOR_TEAL } from '../../colors';

type GoalId = 'lose' | 'maintain' | 'gain';

interface Goal {
  id: GoalId;
  label: string;
  subtitle: string;
  emotion: DuckEmotion;
  icon: React.ReactNode;
  iconBg: string;
}

const LoseIcon = () => (
  <svg viewBox="0 0 24 24" width={28} height={28} fill="none">
    <path
      d="M12 5v14M12 19l-5-5M12 19l5-5"
      stroke={COLOR_RED}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MaintainIcon = () => (
  <svg viewBox="0 0 24 24" width={28} height={28} fill="none">
    <path
      d="M12 3l1.5 4h4l-3.2 2.4 1.2 4L12 11l-3.5 2.4 1.2-4L6.5 7h4L12 3z"
      fill={COLOR_TEAL}
    />
    <line
      x1="6"
      y1="16"
      x2="18"
      y2="16"
      stroke={COLOR_TEAL}
      strokeWidth={2}
      strokeLinecap="round"
    />
    <line
      x1="8"
      y1="20"
      x2="16"
      y2="20"
      stroke={COLOR_TEAL}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </svg>
);

const GainIcon = () => (
  <svg viewBox="0 0 24 24" width={28} height={28} fill="none">
    <path
      d="M12 19V5M12 5l-5 5M12 5l5 5"
      stroke="#4A90D9"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const GOALS: Goal[] = [
  {
    id: 'lose',
    label: 'Lose weight',
    subtitle: 'Calorie deficit · duck gets determined',
    emotion: 'determined',
    icon: <LoseIcon />,
    iconBg: '#FFE8E8',
  },
  {
    id: 'maintain',
    label: 'Maintain weight',
    subtitle: 'At TDEE · duck stays happy',
    emotion: 'proud',
    icon: <MaintainIcon />,
    iconBg: '#E8F8F2',
  },
  {
    id: 'gain',
    label: 'Gain weight',
    subtitle: 'Calorie surplus · duck gets excited',
    emotion: 'excited',
    icon: <GainIcon />,
    iconBg: '#E8F0FF',
  },
];

export const GoalSelection = () => {
  const navigate = useNavigate();
  const { setGoal } = useOnboarding();
  const [selected, setSelected] = useState<GoalId>('lose');

  const selectedGoal = GOALS.find((g) => g.id === selected)!;

  const handleNext = () => {
    setGoal(selected);
    navigate('/home');
  };

  return (
    <ScreenContainer>
      <ProgressDots current={5} />

      <div style={{ paddingTop: 16 }}>
        <Typography
          variant="label-strong"
          color={COLOR_PRIMARY}
          style={{ display: 'block', marginBottom: 8 }}
        >
          Step 5 of 5
        </Typography>
        <Typography
          variant="heading"
          as="h1"
          style={{ margin: '0 0 28px', letterSpacing: -0.4 }}
        >
          What's your main goal?
        </Typography>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {GOALS.map((goal, i) => (
          <SelectionCard
              key={goal.id}
            isSelected={selected === goal.id}
              onClick={() => setSelected(goal.id)}
            icon={goal.icon}
            iconBg={goal.iconBg}
            label={goal.label}
            subtitle={goal.subtitle}
            animationDelay={0.1 + i * 0.08}
          />
        ))}
      </div>

      {/* Duck */}
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
          <Duck emotion={selectedGoal.emotion} size={110} />
        </motion.div>
      </div>

      <OnboardingCTA onClick={handleNext} label="Let's go →" />
    </ScreenContainer>
  );
};

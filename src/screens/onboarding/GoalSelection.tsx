import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Duck, type DuckEmotion } from '../../components/duck/Duck';
import { OnboardingCTA } from '../../components/OnboardingCTA';
import { ScreenContainer } from '../../components/ScreenContainer';
import { Typography } from '../../components/ui/Typography';
import { ProgressDots } from '../../components/ProgressDots';
import { useOnboarding } from '../../store/useOnboarding';
import {
  COLOR_PRIMARY,
  COLOR_BG,
  COLOR_BORDER,
  COLOR_RED,
  COLOR_TEAL,
} from '../../colors';

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
        {GOALS.map((goal, i) => {
          const isSelected = selected === goal.id;
          return (
            <motion.button
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelected(goal.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                background: isSelected ? COLOR_BG : 'white',
                border: `2px solid ${isSelected ? COLOR_PRIMARY : COLOR_BORDER}`,
                borderRadius: 20,
                padding: '16px 20px',
                cursor: 'pointer',
                textAlign: 'left',
                fontFamily: 'inherit',
                transition: 'border-color 0.2s, background 0.2s',
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: goal.iconBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {goal.icon}
              </div>

              {/* Text */}
              <div style={{ flex: 1 }}>
                <Typography
                  variant="label-strong"
                  as="div"
                  style={{ fontSize: 16, marginBottom: 4 }}
                >
                  {goal.label}
                </Typography>
                <Typography variant="label" color="var(--color-muted)">
                  {goal.subtitle}
                </Typography>
              </div>

              {/* Radio indicator */}
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  border: `2px solid ${isSelected ? COLOR_PRIMARY : COLOR_BORDER}`,
                  background: isSelected ? COLOR_PRIMARY : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.2s',
                }}
              >
                {isSelected && (
                  <svg viewBox="0 0 12 12" width={12} height={12} fill="none">
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            </motion.button>
          );
        })}
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

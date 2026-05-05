import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Duck } from '../../components/duck/Duck';
import { FemaleIcon } from '../../components/icons/FemaleIcon';
import { MaleIcon } from '../../components/icons/MaleIcon';
import { OnboardingCTA } from '../../components/OnboardingCTA';
import { ScreenContainer } from '../../components/ScreenContainer';
import { Stepper } from '../../components/Stepper';
import { Typography } from '../../components/ui/Typography';
import { useOnboarding } from '../../store/useOnboarding';
import type { ActivityLevel, Sex } from '../../types/models';
import {
  COLOR_BORDER,
  COLOR_DARK,
  COLOR_MUTED,
  COLOR_PRIMARY,
  COLOR_PRIMARY_BORDER,
  COLOR_PRIMARY_CARD_BG,
} from '../../colors';
import { calculateDailyBudget, calculateTdee } from '../../lib/tdee';

const ACTIVITY_OPTIONS: {
  id: ActivityLevel;
  label: string;
  subtitle: string;
}[] = [
  {
    id: 'sedentary',
    label: 'Sedentary',
    subtitle: 'Desk job, little to no exercise',
  },
  {
    id: 'light',
    label: 'Lightly active',
    subtitle: '2–3 workouts/week e.g. spin, pilates, yoga',
  },
  {
    id: 'moderate',
    label: 'Moderately active',
    subtitle: '4–5 sessions/week + active daily life',
  },
  {
    id: 'very',
    label: 'Very active',
    subtitle: 'Daily intense training or physical job',
  },
];

const formatWeight = (value: number) => value.toFixed(1);

const SexIcon = ({ sex }: { sex: Sex }) =>
  sex === 'male' ? <MaleIcon /> : <FemaleIcon />;

export const ProfileSetup = () => {
  const navigate = useNavigate();
  const { goal, pace, profile, setProfile } = useOnboarding();
  const [age, setAge] = useState(profile?.age ?? 26);
  const [heightCm, setHeightCm] = useState(profile?.heightCm ?? 175);
  const [weightKg, setWeightKg] = useState(profile?.weightKg ?? 70);
  const [targetWeightKg, setTargetWeightKg] = useState(
    profile?.targetWeightKg ?? 65,
  );
  const [sex, setSex] = useState<Sex>(profile?.sex ?? 'male');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>(
    profile?.activityLevel ?? 'light',
  );

  const tdee = useMemo(
    () => calculateTdee({ age, heightCm, weightKg, sex, activityLevel }),
    [activityLevel, age, heightCm, sex, weightKg],
  );

  const { dailyBudgetKcal, rawAdjustment } = useMemo(
    () => calculateDailyBudget({ tdee, weightKg, heightCm, sex, goal, pace }),
    [tdee, weightKg, heightCm, sex, goal, pace],
  );
  const goalLabel =
    goal === 'gain'
      ? 'Gain weight'
      : goal === 'maintain'
        ? 'Maintain weight'
        : 'Lose weight';
  const budgetSub =
    rawAdjustment === 0
      ? 'Maintenance budget applied'
      : `${rawAdjustment > 0 ? '+' : '−'}${Math.abs(rawAdjustment)} kcal ${rawAdjustment > 0 ? 'surplus' : 'deficit'} applied`;

  const handleNext = () => {
    setProfile({
      age,
      heightCm,
      weightKg,
      targetWeightKg,
      sex,
      activityLevel,
      dailyBudgetKcal,
    });
    navigate('/home');
  };

  return (
    <ScreenContainer style={{ gap: 20, paddingTop: 38 }}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 16,
          alignItems: 'flex-start',
        }}
      >
        <div style={{ flex: 1 }}>
          <Typography variant="subheading" color={COLOR_MUTED}>
            Almost there!
          </Typography>
          <Typography
            variant="heading-lg"
            as="h1"
            style={{ margin: '8px 0 0', lineHeight: 1.16 }}
          >
            Tell us about yourself
          </Typography>
        </div>
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2.4, ease: 'easeInOut', repeat: Infinity }}
          style={{ flexShrink: 0, marginTop: 4 }}
        >
          <Duck emotion="happy" />
        </motion.div>
      </header>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: 12,
        }}
      >
        <Stepper
          label="Age"
          value={age}
          unit="years"
          min={13}
          max={100}
          onChange={setAge}
        />
        <Stepper
          label="Height"
          value={heightCm}
          unit="cm"
          min={120}
          max={230}
          onChange={setHeightCm}
        />
        <Stepper
          label="Current weight"
          value={weightKg}
          unit="kg"
          min={35}
          max={250}
          step={0.5}
          formatter={formatWeight}
          onChange={setWeightKg}
        />
        <Stepper
          label="Target weight"
          value={targetWeightKg}
          unit="kg"
          min={35}
          max={250}
          step={0.5}
          formatter={formatWeight}
          onChange={setTargetWeightKg}
        />
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        {(['male', 'female'] as Sex[]).map((option) => {
          const isSelected = sex === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => setSex(option)}
              style={{
                flex: 1,
                borderRadius: 14,
                border: `1.5px solid ${isSelected ? COLOR_PRIMARY : COLOR_BORDER}`,
                background: isSelected ? COLOR_PRIMARY_CARD_BG : 'white',
                color: COLOR_DARK,
                cursor: 'pointer',
                fontFamily: 'inherit',
                padding: '11px 8px',
                textAlign: 'center',
                transition: 'all 0.15s',
              }}
            >
              <span
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: 3,
                }}
              >
                <SexIcon sex={option} />
              </span>
              <Typography variant="label" color={COLOR_MUTED}>
                {option === 'male' ? 'Male' : 'Female'}
              </Typography>
            </button>
          );
        })}
      </div>

      <section>
        <Typography
          variant="label-strong"
          as="p"
          color={COLOR_MUTED}
          style={{ margin: '0 0 6px' }}
        >
          Activity level
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {ACTIVITY_OPTIONS.map((option) => {
            const isSelected = activityLevel === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setActivityLevel(option.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  borderRadius: 14,
                  border: `2px solid ${isSelected ? COLOR_PRIMARY : COLOR_BORDER}`,
                  background: isSelected ? COLOR_PRIMARY_CARD_BG : 'white',
                  padding: '10px 14px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    border: `2px solid ${isSelected ? COLOR_PRIMARY : COLOR_BORDER}`,
                    background: isSelected ? COLOR_PRIMARY : 'white',
                    boxSizing: 'border-box',
                    flexShrink: 0,
                    boxShadow: isSelected
                      ? `inset 0 0 0 4px ${COLOR_PRIMARY}`
                      : undefined,
                  }}
                />
                <span style={{ flex: 1 }}>
                  <Typography variant="label" style={{ display: 'block' }}>
                    {option.label}
                  </Typography>
                  <Typography variant="caption" color={COLOR_MUTED}>
                    {option.subtitle}
                  </Typography>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <div
        style={{
          background: COLOR_PRIMARY_CARD_BG,
          border: `2px solid ${COLOR_PRIMARY_BORDER}`,
          borderRadius: 16,
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <Typography variant="body" color={COLOR_MUTED}>
            Your estimated daily budget
          </Typography>
          <Typography
            variant="heading"
            as="p"
            style={{
              margin: '4px 0 0',
              fontVariantNumeric: 'tabular-nums',
              lineHeight: 1.05,
            }}
          >
            {dailyBudgetKcal.toLocaleString()} kcal
          </Typography>
          <Typography
            variant="label"
            color={COLOR_MUTED}
            style={{ display: 'block', marginTop: 4 }}
          >
            {goalLabel} · {budgetSub}
          </Typography>
        </div>
        <Duck emotion="proud" size={62} />
      </div>

      <div style={{ paddingTop: 2 }}>
        <OnboardingCTA
          onClick={handleNext}
          label="Calculate my plan →"
          animationDelay={0.1}
        />
      </div>
    </ScreenContainer>
  );
};

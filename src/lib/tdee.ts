import type { ActivityLevel, Goal, PaceId, Sex } from '../store/useOnboarding';

export const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  very: 1.725,
};

export const PACE_RATIO: Record<PaceId, number> = {
  slow: 0.15,
  balanced: 0.2,
  fast: 0.25,
};

export const calculateBmr = ({
  age,
  heightCm,
  weightKg,
  sex,
}: {
  age: number;
  heightCm: number;
  weightKg: number;
  sex: Sex;
}) => {
  const sexAdjustment = sex === 'male' ? 5 : -161;
  return 10 * weightKg + 6.25 * heightCm - 5 * age + sexAdjustment;
};

export const calculateTdee = ({
  age,
  heightCm,
  weightKg,
  sex,
  activityLevel,
}: {
  age: number;
  heightCm: number;
  weightKg: number;
  sex: Sex;
  activityLevel: ActivityLevel;
}) => {
  const bmr = calculateBmr({ age, heightCm, weightKg, sex });
  return Math.round(bmr * ACTIVITY_MULTIPLIERS[activityLevel]);
};

export const calculateDailyBudget = ({
  tdee,
  weightKg,
  heightCm,
  sex,
  goal,
  pace,
}: {
  tdee: number;
  weightKg: number;
  heightCm: number;
  sex: Sex;
  goal: Goal;
  pace: PaceId;
}) => {
  const bmi = weightKg / (heightCm / 100) ** 2;
  const isLean = bmi < 19;
  const ratio = PACE_RATIO[pace] ?? 0.2;
  let delta = Math.round(tdee * ratio);
  if (goal === 'lose' && isLean) delta = Math.min(delta, 250);
  const rawAdjustment =
    goal === 'maintain' ? 0 : goal === 'gain' ? delta : -delta;
  const minKcal = sex === 'female' ? 1300 : 1500;
  const dailyBudgetKcal =
    goal === 'lose'
      ? Math.max(minKcal, tdee + rawAdjustment)
      : tdee + rawAdjustment;
  return { dailyBudgetKcal, rawAdjustment };
};

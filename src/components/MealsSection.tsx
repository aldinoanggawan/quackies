import { useNavigate } from 'react-router-dom';
import { Typography } from './ui/Typography';
import { LogButton } from './LogButton';
import { DotIcon } from './icons/DotIcon';
import type { Meal, MealType } from '../types/models';
import {
  COLOR_BORDER,
  COLOR_MUTED,
  COLOR_DARK,
  COLOR_PRIMARY,
  COLOR_TEAL,
  COLOR_RED,
  COLOR_DUCK_YELLOW,
} from '../colors';

const MEAL_LABELS: Record<MealType, string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snack: 'Snack',
};

const MEAL_COLORS: Record<MealType, string> = {
  breakfast: COLOR_DUCK_YELLOW,
  lunch: COLOR_TEAL,
  dinner: COLOR_PRIMARY,
  snack: COLOR_RED,
};

const MEAL_ORDER: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack'];

interface MealsSectionProps {
  meals: Meal[];
}

export const MealsSection = ({ meals }: MealsSectionProps) => {
  const navigate = useNavigate();

  return (
    <div>
      <Typography
        variant="label-strong"
        as="p"
        color={COLOR_MUTED}
        style={{ margin: '0 0 12px' }}
      >
        Meals today
      </Typography>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {MEAL_ORDER.map((type, i) => {
          const logged = meals.filter((m) => m.meal_type === type);
          const totalKcal = logged.reduce((sum, m) => sum + m.total_kcal, 0);
          const isLogged = logged.length > 0;

          return (
            <div
              key={type}
              style={{
                marginTop: i === 0 ? 0 : 6,
                paddingTop: i === 0 ? 0 : 6,
                borderTop: i === 0 ? 'none' : `1px solid ${COLOR_BORDER}`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <DotIcon color={isLogged ? MEAL_COLORS[type] : COLOR_BORDER} />
                <Typography
                  variant="label"
                  color={isLogged ? COLOR_DARK : COLOR_MUTED}
                  style={{ flex: 1 }}
                >
                  {MEAL_LABELS[type]}
                </Typography>
                {isLogged ? (
                  <Typography variant="label-strong" color={COLOR_DARK}>
                    {totalKcal.toLocaleString()} kcal
                  </Typography>
                ) : (
                  <LogButton onClick={() => navigate(`/meal/${type}`)} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

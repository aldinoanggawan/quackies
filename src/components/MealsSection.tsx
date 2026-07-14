import { useNavigate } from 'react-router-dom';
import { Typography } from './ui/Typography';
import { LogButton } from './LogButton';
import { DotIcon } from './icons/DotIcon';
import type { Meal, MealType } from '../types/models';
import { classNames } from '../lib/classNames';

const MEAL_LABELS: Record<MealType, string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snack: 'Snack',
};

const MEAL_COLORS: Record<MealType, string> = {
  breakfast: 'var(--color-duck-yellow)',
  lunch: 'var(--color-success)',
  dinner: 'var(--color-brand)',
  snack: 'var(--color-danger)',
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
        color={'var(--color-muted)'}
        className="m-[0_0_12px]"
      >
        Meals today
      </Typography>

      <div className="flex flex-col">
        {MEAL_ORDER.map((type, i) => {
          const logged = meals.filter((m) => m.meal_type === type);
          const totalKcal = logged.reduce((sum, m) => sum + m.total_kcal, 0);
          const isLogged = logged.length > 0;

          return (
            <div
              key={type}
              className={classNames(
                i === 0 ? 'mt-0 pt-0' : 'mt-1.5 border-t border-line pt-1.5',
              )}
            >
              <div className="flex items-center gap-3">
                <DotIcon
                  color={isLogged ? MEAL_COLORS[type] : 'var(--color-line)'}
                />
                <Typography
                  variant="label"
                  color={isLogged ? 'var(--color-ink)' : 'var(--color-muted)'}
                  className="flex-1"
                >
                  {MEAL_LABELS[type]}
                </Typography>
                {isLogged ? (
                  <Typography variant="label-strong" color={'var(--color-ink)'}>
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

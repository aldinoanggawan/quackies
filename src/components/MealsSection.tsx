import { useState } from 'react';
import { Typography } from './ui/Typography';
import { LogButton } from './LogButton';
import { DotIcon } from './icons/DotIcon';
import { logMeal } from '../lib/db';
import { toDateString } from '../lib/dateHelpers';
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
  userId: string;
  date: Date;
  onSaved: () => void;
}

export const MealsSection = ({
  meals,
  userId,
  date,
  onSaved,
}: MealsSectionProps) => {
  const [addingMealType, setAddingMealType] = useState<MealType | null>(null);
  const [mealDescription, setMealDescription] = useState('');
  const [mealKcal, setMealKcal] = useState('');
  const [saving, setSaving] = useState(false);

  const handleLogMeal = async () => {
    if (!addingMealType || !mealDescription.trim() || !mealKcal) return;
    setSaving(true);
    await logMeal(userId, {
      date: toDateString(date),
      meal_type: addingMealType,
      description: mealDescription.trim(),
      total_kcal: parseInt(mealKcal, 10),
    });
    setMealDescription('');
    setMealKcal('');
    setAddingMealType(null);
    setSaving(false);
    onSaved();
  };

  const inputStyle = {
    fontSize: 15,
    fontWeight: 500,
    color: COLOR_DARK,
    border: `1px solid ${COLOR_BORDER}`,
    borderRadius: 10,
    padding: '10px 12px',
    outline: 'none',
    fontFamily: 'inherit',
    background: 'transparent',
    width: '100%',
    boxSizing: 'border-box' as const,
  };

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
          const isAdding = addingMealType === type;

          return (
            <div
              key={type}
              style={{
                marginTop: i === 0 ? 0 : 6,
                paddingTop: i === 0 ? 0 : 6,
                borderTop: i === 0 ? 'none' : `1px solid ${COLOR_BORDER}`,
              }}
            >
              {/* Main row */}
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
                  <LogButton
                    onClick={() => setAddingMealType(isAdding ? null : type)}
                  />
                )}
              </div>

              {/* Inline log form */}
              {isAdding && (
                <div
                  style={{
                    marginTop: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                  }}
                >
                  <input
                    type="text"
                    placeholder={`What did you have for ${MEAL_LABELS[type].toLowerCase()}?`}
                    value={mealDescription}
                    onChange={(e) => setMealDescription(e.target.value)}
                    autoFocus
                    style={inputStyle}
                  />
                  <input
                    type="number"
                    placeholder="Kcal"
                    value={mealKcal}
                    onChange={(e) => setMealKcal(e.target.value)}
                    style={inputStyle}
                  />
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      type="button"
                      onClick={() => setAddingMealType(null)}
                      style={{
                        flex: 1,
                        background: 'transparent',
                        border: `1px solid ${COLOR_BORDER}`,
                        borderRadius: 10,
                        padding: '8px 0',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                      }}
                    >
                      <Typography variant="label-strong" color={COLOR_MUTED}>
                        Cancel
                      </Typography>
                    </button>
                    <button
                      type="button"
                      onClick={handleLogMeal}
                      disabled={!mealDescription.trim() || !mealKcal || saving}
                      style={{
                        flex: 1,
                        background: MEAL_COLORS[type],
                        border: 'none',
                        borderRadius: 10,
                        padding: '8px 0',
                        cursor:
                          mealDescription.trim() && mealKcal
                            ? 'pointer'
                            : 'not-allowed',
                        fontFamily: 'inherit',
                        opacity: mealDescription.trim() && mealKcal ? 1 : 0.4,
                      }}
                    >
                      <Typography variant="label-strong" color="white">
                        {saving ? 'Saving…' : 'Log meal'}
                      </Typography>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

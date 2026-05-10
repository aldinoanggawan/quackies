import { useState } from 'react';
import { Typography } from './ui/Typography';
import { ActivityIcon } from './icons/ActivityIcon';
import { updateWorkout } from '../lib/db';
import type { Workout } from '../types/models';
import {
  COLOR_BORDER,
  COLOR_MUTED,
  COLOR_DARK,
  COLOR_PRIMARY,
  COLOR_TEAL,
  COLOR_TEAL_CARD_BG,
  COLOR_TEAL_BORDER,
} from '../colors';

interface WorkoutCardProps {
  workout: Workout;
  onSaved?: () => void;
}

export const WorkoutCard = ({ workout, onSaved }: WorkoutCardProps) => {
  const isEstimated = workout.source === 'estimated';
  const estimate = isEstimated ? (workout.kcal_burned ?? 0) : 0;
  const storedValue = String(workout.kcal_burned ?? estimate);

  const [expanded, setExpanded] = useState(false);
  const [kcalInput, setKcalInput] = useState(storedValue);
  const [saving, setSaving] = useState(false);

  const isDirty = kcalInput !== storedValue;

  const handleCancel = () => {
    setKcalInput(storedValue);
    setExpanded(false);
  };

  const handleSave = async () => {
    const val = parseInt(kcalInput, 10);
    if (isNaN(val)) return;
    setSaving(true);
    await updateWorkout(workout.id, { kcal_burned: val });
    setSaving(false);
    setExpanded(false);
    onSaved?.();
  };

  const handleUseEstimate = () => {
    setKcalInput(String(estimate));
  };

  return (
    <div
      style={{
        background: COLOR_TEAL_CARD_BG,
        border: `1.5px solid ${COLOR_TEAL_BORDER}`,
        borderRadius: 16,
        overflow: 'hidden',
      }}
    >
      {/* Main row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 14px',
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: COLOR_TEAL,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <ActivityIcon size={20} />
        </div>

        <div style={{ flex: 1 }}>
          <Typography variant="label-strong" color={COLOR_DARK}>
            {workout.name}
          </Typography>
          <Typography
            variant="caption"
            color={COLOR_MUTED}
            style={{ display: 'block', marginTop: 2 }}
          >
            {workout.duration_min} min
            {workout.source && workout.source !== 'estimated'
              ? ` · ${workout.source}`
              : ''}
          </Typography>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 4,
          }}
        >
          {workout.kcal_burned != null && (
            <Typography variant="label-strong" color={COLOR_TEAL}>
              −{workout.kcal_burned.toLocaleString()} kcal
            </Typography>
          )}
          <button
            type="button"
            onClick={() => (expanded ? handleCancel() : setExpanded(true))}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              fontFamily: 'inherit',
            }}
          >
            <Typography variant="label-strong" color={COLOR_PRIMARY}>
              {expanded ? 'cancel' : 'edit'}
            </Typography>
          </button>
        </div>
      </div>

      {/* Inline edit panel */}
      {expanded && (
        <div
          style={{
            borderTop: `1px solid ${COLOR_TEAL_BORDER}`,
            padding: '14px 14px 16px',
          }}
        >
          {/* Calories burned row: label left, input right */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <Typography
                variant="caption"
                color={COLOR_MUTED}
                style={{ textTransform: 'uppercase', letterSpacing: 0.4 }}
              >
                Calories burned
              </Typography>
              {estimate > 0 && (
                <Typography
                  variant="caption"
                  color={COLOR_MUTED}
                  style={{ display: 'block', marginTop: 2 }}
                >
                  App estimate ~{estimate} kcal
                </Typography>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <input
                type="number"
                value={kcalInput}
                onChange={(e) => setKcalInput(e.target.value)}
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: COLOR_DARK,
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  width: 72,
                  textAlign: 'right',
                  fontFamily: 'inherit',
                }}
              />
              <Typography variant="body" as="span" color={COLOR_MUTED}>
                kcal
              </Typography>
            </div>
          </div>

          {/* Source tag — only for wearable/external sources */}
          {workout.source && workout.source !== 'estimated' && (
            <div style={{ marginTop: 10 }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: 'white',
                  border: `1px solid ${COLOR_TEAL_BORDER}`,
                  borderRadius: 999,
                  padding: '3px 10px',
                }}
              >
                <Typography variant="label-strong" color={COLOR_TEAL}>
                  + {workout.source}
                </Typography>
              </div>
            </div>
          )}

          {/* Or divider — only when app estimated the value */}
          {estimate > 0 && (
            <>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  margin: '12px 0',
                }}
              >
                <div style={{ flex: 1, height: 1, background: COLOR_BORDER }} />
                <Typography variant="caption" color={COLOR_MUTED}>
                  or
                </Typography>
                <div style={{ flex: 1, height: 1, background: COLOR_BORDER }} />
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant="caption" color={COLOR_MUTED}>
                  Use app estimate instead ~{estimate} kcal
                </Typography>
                <button
                  type="button"
                  onClick={handleUseEstimate}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    fontFamily: 'inherit',
                  }}
                >
                  <Typography variant="label-strong" color={COLOR_PRIMARY}>
                    use this
                  </Typography>
                </button>
              </div>
            </>
          )}

          {/* Save / Cancel — only when value has changed */}
          {isDirty && (
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <button
                type="button"
                onClick={handleCancel}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: `1px solid ${COLOR_BORDER}`,
                  borderRadius: 10,
                  padding: '9px 0',
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
                onClick={handleSave}
                disabled={saving}
                style={{
                  flex: 1,
                  background: COLOR_TEAL,
                  border: 'none',
                  borderRadius: 10,
                  padding: '9px 0',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  opacity: saving ? 0.6 : 1,
                }}
              >
                <Typography variant="label-strong" color="white">
                  {saving ? 'Saving…' : 'Save'}
                </Typography>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

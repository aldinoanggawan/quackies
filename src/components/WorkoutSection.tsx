import { useState } from 'react';
import { Typography } from './ui/Typography';
import { WorkoutCard } from './WorkoutCard';
import { logWorkout } from '../lib/db';
import { toDateString } from '../lib/dateHelpers';
import type { Workout } from '../types/models';
import {
  COLOR_BG,
  COLOR_BORDER,
  COLOR_MUTED,
  COLOR_DARK,
  COLOR_PRIMARY,
} from '../colors';

interface WorkoutSectionProps {
  workouts: Workout[];
  userId: string;
  date: Date;
  onSaved: () => void;
}

export const WorkoutSection = ({
  workouts,
  userId,
  date,
  onSaved,
}: WorkoutSectionProps) => {
  const [editMode, setEditMode] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [kcal, setKcal] = useState('');
  const [kcalMode, setKcalMode] = useState<'estimate' | 'manual'>('estimate');
  const [saving, setSaving] = useState(false);

  const durationMin = parseInt(duration, 10) || 0;
  const appEstimate = Math.round(durationMin * 7);

  const handleSave = async () => {
    if (!name.trim()) return;
    setSaving(true);
    const isEstimate = kcalMode === 'estimate';
    await logWorkout(userId, {
      date: toDateString(date),
      name: name.trim(),
      duration_min: durationMin,
      kcal_burned: isEstimate
        ? appEstimate
        : kcal
          ? parseInt(kcal, 10)
          : undefined,
      source: isEstimate ? 'estimated' : undefined,
    });
    setName('');
    setDuration('');
    setKcal('');
    setKcalMode('estimate');
    setShowAddForm(false);
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
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        <Typography
          variant="label-strong"
          as="p"
          color={COLOR_MUTED}
          style={{ margin: 0 }}
        >
          Workout
        </Typography>
        {workouts.length > 0 && (
          <button
            type="button"
            onClick={() => setEditMode((m) => !m)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              fontFamily: 'inherit',
            }}
          >
            <Typography variant="label-strong" color={COLOR_PRIMARY}>
              {editMode ? 'done' : 'edit'}
            </Typography>
          </button>
        )}
      </div>

      {/* Workout cards */}
      {workouts.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} onSaved={onSaved} />
          ))}
        </div>
      )}

      {/* Add form */}
      {showAddForm ? (
        <div
          style={{
            marginTop: workouts.length > 0 ? 10 : 0,
            background: 'white',
            border: `1px solid ${COLOR_BORDER}`,
            borderRadius: 16,
            padding: '16px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <Typography
            variant="label-strong"
            as="p"
            color={COLOR_MUTED}
            style={{
              margin: 0,
              textTransform: 'uppercase',
              letterSpacing: 0.4,
              fontSize: 11,
            }}
          >
            Add workout
          </Typography>

          <input
            type="text"
            placeholder="Workout name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Duration (min)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            style={inputStyle}
          />

          {/* Kcal mode toggle */}
          <div
            style={{
              display: 'flex',
              background: COLOR_BG,
              border: `1px solid ${COLOR_BORDER}`,
              borderRadius: 10,
              overflow: 'hidden',
            }}
          >
            {(['estimate', 'manual'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setKcalMode(mode)}
                style={{
                  flex: 1,
                  padding: '8px 0',
                  border: 'none',
                  background: kcalMode === mode ? COLOR_DARK : 'transparent',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'background 0.15s',
                }}
              >
                <Typography
                  variant="label-strong"
                  color={kcalMode === mode ? 'white' : COLOR_MUTED}
                >
                  {mode === 'estimate'
                    ? 'Estimate for me'
                    : 'I know the calories'}
                </Typography>
              </button>
            ))}
          </div>

          {kcalMode === 'estimate' && durationMin > 0 && (
            <Typography
              variant="caption"
              color={COLOR_MUTED}
              style={{ marginTop: -4 }}
            >
              App estimate: ~{appEstimate} kcal based on {durationMin} min
            </Typography>
          )}

          {kcalMode === 'manual' && (
            <input
              type="number"
              placeholder="Kcal burned"
              value={kcal}
              onChange={(e) => setKcal(e.target.value)}
              style={inputStyle}
            />
          )}

          <div style={{ display: 'flex', gap: 8 }}>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              style={{
                flex: 1,
                background: 'transparent',
                border: `1px solid ${COLOR_BORDER}`,
                borderRadius: 12,
                padding: '10px 0',
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
              disabled={!name.trim() || saving}
              style={{
                flex: 1,
                background: COLOR_DARK,
                border: 'none',
                borderRadius: 12,
                padding: '10px 0',
                cursor: name.trim() ? 'pointer' : 'not-allowed',
                fontFamily: 'inherit',
                opacity: name.trim() ? 1 : 0.4,
              }}
            >
              <Typography variant="label-strong" color="white">
                {saving ? 'Saving…' : 'Save'}
              </Typography>
            </button>
          </div>
        </div>
      ) : (
        (workouts.length === 0 || editMode) && (
          <button
            type="button"
            onClick={() => setShowAddForm(true)}
            style={{
              marginTop: workouts.length > 0 ? 10 : 0,
              width: '100%',
              background: COLOR_DARK,
              border: 'none',
              borderRadius: 14,
              padding: '13px 0',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            <Typography variant="label-strong" color="white">
              {workouts.length === 0
                ? '+ add workout'
                : '+ add another workout'}
            </Typography>
          </button>
        )
      )}
    </div>
  );
};

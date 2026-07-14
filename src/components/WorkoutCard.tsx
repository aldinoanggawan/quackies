import { useState } from 'react';
import { Typography } from './ui/Typography';
import { ActivityIcon } from './icons/ActivityIcon';
import { updateWorkout } from '../lib/db';
import type { Workout } from '../types/models';

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
    <div className="overflow-hidden rounded-2xl border-[1.5px] border-line-success bg-surface-success">
      <div className="flex items-center gap-3 p-[12px_14px]">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-success">
          <ActivityIcon size={20} />
        </div>

        <div className="flex-1">
          <Typography variant="label-strong" color={'var(--color-ink)'}>
            {workout.name}
          </Typography>
          <Typography
            variant="caption"
            color={'var(--color-muted)'}
            className="mt-0.5 block"
          >
            {workout.duration_min} min
            {workout.source && workout.source !== 'estimated'
              ? ` · ${workout.source}`
              : ''}
          </Typography>
        </div>

        <div className="flex flex-col items-end gap-1">
          {workout.kcal_burned != null && (
            <Typography variant="label-strong" color={'var(--color-success)'}>
              −{workout.kcal_burned.toLocaleString()} kcal
            </Typography>
          )}
          <button
            type="button"
            onClick={() => (expanded ? handleCancel() : setExpanded(true))}
            className="cursor-pointer border-0 bg-transparent p-0 font-[inherit]"
          >
            <Typography variant="label-strong" color={'var(--color-brand)'}>
              {expanded ? 'cancel' : 'edit'}
            </Typography>
          </button>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-line-success p-[14px_14px_16px]">
          <div className="flex items-center justify-between">
            <div>
              <Typography
                variant="caption"
                color={'var(--color-muted)'}
                className="uppercase tracking-[0.4px]"
              >
                Calories burned
              </Typography>
              {estimate > 0 && (
                <Typography
                  variant="caption"
                  color={'var(--color-muted)'}
                  className="mt-0.5 block"
                >
                  App estimate ~{estimate} kcal
                </Typography>
              )}
            </div>
            <div className="flex items-baseline gap-1">
              <input
                type="number"
                value={kcalInput}
                onChange={(e) => setKcalInput(e.target.value)}
                className="w-[72px] border-0 bg-transparent text-right text-[28px] font-extrabold text-ink outline-none [font-family:inherit]"
              />
              <Typography variant="body" as="span" color={'var(--color-muted)'}>
                kcal
              </Typography>
            </div>
          </div>

          {workout.source && workout.source !== 'estimated' && (
            <div className="mt-2.5">
              <div className="inline-flex items-center rounded-full border border-line-success bg-white p-[3px_10px]">
                <Typography
                  variant="label-strong"
                  color={'var(--color-success)'}
                >
                  + {workout.source}
                </Typography>
              </div>
            </div>
          )}

          {estimate > 0 && (
            <>
              <div className="m-[12px_0] flex items-center gap-2">
                <div className="h-px flex-1 bg-line" />
                <Typography variant="caption" color={'var(--color-muted)'}>
                  or
                </Typography>
                <div className="h-px flex-1 bg-line" />
              </div>
              <div className="flex items-center justify-between">
                <Typography variant="caption" color={'var(--color-muted)'}>
                  Use app estimate instead ~{estimate} kcal
                </Typography>
                <button
                  type="button"
                  onClick={handleUseEstimate}
                  className="cursor-pointer border-0 bg-transparent p-0 font-[inherit]"
                >
                  <Typography
                    variant="label-strong"
                    color={'var(--color-brand)'}
                  >
                    use this
                  </Typography>
                </button>
              </div>
            </>
          )}

          {isDirty && (
            <div className="mt-[14px] flex gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 cursor-pointer rounded-[10px] border border-line bg-transparent p-[9px_0] font-[inherit]"
              >
                <Typography variant="label-strong" color={'var(--color-muted)'}>
                  Cancel
                </Typography>
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="flex-1 cursor-pointer rounded-[10px] border-0 bg-success p-[9px_0] font-[inherit] disabled:opacity-60"
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

import { useRef, useState } from 'react';
import { StepperIcon } from './icons/StepperIcon';
import { Typography } from './ui/Typography';
import {
  COLOR_BORDER,
  COLOR_MUTED,
  COLOR_PRIMARY_BORDER,
  COLOR_PRIMARY_CARD_BG,
} from '../colors';

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const buttonStyle: React.CSSProperties = {
  width: 28,
  height: 28,
  borderRadius: 8,
  border: `2px solid ${COLOR_PRIMARY_BORDER}`,
  background: COLOR_PRIMARY_CARD_BG,
  color: COLOR_MUTED,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'inherit',
  lineHeight: 1,
  padding: 0,
  appearance: 'none',
};

export const Stepper = ({
  label,
  value,
  unit,
  min,
  max,
  step = 1,
  formatter = String,
  onChange,
}: {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  step?: number;
  formatter?: (value: number) => string;
  onChange: (value: number) => void;
}) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const update = (direction: -1 | 1) => {
    let next: number;
    if (direction === 1) {
      next = Math.ceil(value / step) * step;
      if (next === value) next += step;
    } else {
      next = Math.floor(value / step) * step;
      if (next === value) next -= step;
    }
    onChange(Number(clamp(next, min, max).toFixed(1)));
  };

  const startEditing = () => {
    setDraft(formatter(value));
    setEditing(true);
    setTimeout(() => inputRef.current?.select(), 0);
  };

  const commitEdit = () => {
    const parsed = parseFloat(draft);
    if (!isNaN(parsed)) {
      onChange(Number(clamp(parsed, min, max).toFixed(1)));
    }
    setEditing(false);
  };

  return (
    <div
      style={{
        border: `2px solid ${COLOR_BORDER}`,
        borderRadius: 14,
        background: 'white',
        padding: '10px 14px',
        boxSizing: 'border-box',
      }}
    >
      <Typography
        variant="caption"
        color={COLOR_MUTED}
        style={{
          display: 'block',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          marginBottom: 6,
        }}
      >
        {label}
      </Typography>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 6,
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <button
          type="button"
          aria-label={`Decrease ${label.toLowerCase()}`}
          onClick={() => update(-1)}
          disabled={value <= min}
          style={{
            ...buttonStyle,
            ...(value <= min ? { opacity: 0.3, cursor: 'default' } : {}),
          }}
        >
          <StepperIcon type="minus" />
        </button>
        <div
          style={{ textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}
        >
          {editing ? (
            <input
              ref={inputRef}
              type="number"
              value={draft}
              min={min}
              max={max}
              step={step}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={commitEdit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') commitEdit();
                if (e.key === 'Escape') setEditing(false);
              }}
              style={{
                width: 56,
                height: 17,
                textAlign: 'center',
                fontVariantNumeric: 'tabular-nums',
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontFamily: 'inherit',
                fontSize: 17,
                fontWeight: 500,
                lineHeight: 1,
                padding: 0,
                margin: 0,
                display: 'block',
                boxSizing: 'content-box',
                MozAppearance: 'textfield',
                WebkitAppearance: 'none',
              }}
            />
          ) : (
            <Typography
              variant="input"
              as="p"
              onClick={startEditing}
              style={{
                lineHeight: 1,
                fontVariantNumeric: 'tabular-nums',
                margin: 0,
                cursor: 'text',
              }}
            >
              {formatter(value)}
            </Typography>
          )}
          <Typography
            variant="caption"
            color={COLOR_MUTED}
            style={{ display: 'block', marginTop: 1 }}
          >
            {unit}
          </Typography>
        </div>
        <button
          type="button"
          aria-label={`Increase ${label.toLowerCase()}`}
          onClick={() => update(1)}
          disabled={value >= max}
          style={{
            ...buttonStyle,
            ...(value >= max ? { opacity: 0.3, cursor: 'default' } : {}),
          }}
        >
          <StepperIcon type="plus" />
        </button>
      </div>
    </div>
  );
};

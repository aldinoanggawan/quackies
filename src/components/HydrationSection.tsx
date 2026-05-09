import { useState } from 'react';
import { Typography } from './ui/Typography';
import { GlassIcon } from './icons/GlassIcon';
import { useHydration } from '../hooks/useHydration';
import {
  COLOR_BORDER,
  COLOR_MUTED,
  COLOR_DARK,
  COLOR_PRIMARY,
  COLOR_TEAL,
  COLOR_TEAL_CARD_BG,
  COLOR_TEAL_BORDER,
  COLOR_WATER_CARD_BG,
} from '../colors';

const OZ_TO_ML = 29.5735;

const FRACTIONS: { label: string; value: number }[] = [
  { label: '¼', value: 0.25 },
  { label: '½', value: 0.5 },
  { label: '¾', value: 0.75 },
  { label: 'Full', value: 1 },
];

interface HydrationSectionProps {
  date: Date;
}

export const HydrationSection = ({ date }: HydrationSectionProps) => {
  const {
    bottleConfig,
    bottleMl,
    consumedMl,
    goalMl,
    totalBlocks,
    filledValue,
    loading,
    logAmount,
    setupBottle,
  } = useHydration(date);

  const [showPanel, setShowPanel] = useState(false);
  const [bottleName, setBottleName] = useState('');
  const [bottleSize, setBottleSize] = useState('');
  const [unit, setUnit] = useState<'ml' | 'oz'>('ml');
  const [setupSaving, setSetupSaving] = useState(false);

  const handleSetup = async () => {
    const raw = parseFloat(bottleSize);
    if (!bottleName.trim() || !raw) return;
    const ml = Math.round(unit === 'oz' ? raw * OZ_TO_ML : raw);
    setSetupSaving(true);
    await setupBottle(bottleName.trim(), ml);
    setSetupSaving(false);
    setShowPanel(false);
  };

  const handleLog = async (fraction: number) => {
    await logAmount(fraction);
    setShowPanel(false);
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

  if (loading) return null;

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
          Hydration
        </Typography>
        <button
          type="button"
          onClick={() => setShowPanel((v) => !v)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            fontFamily: 'inherit',
          }}
        >
          <Typography variant="label-strong" color={COLOR_PRIMARY}>
            {showPanel ? 'cancel' : '+ add'}
          </Typography>
        </button>
      </div>

      {/* Progress card — only when bottle is configured */}
      {bottleConfig && (
        <div
          style={{
            background: COLOR_WATER_CARD_BG,
            border: `1.5px solid ${COLOR_TEAL_BORDER}`,
            borderRadius: 16,
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 4,
              flex: 1,
              flexWrap: 'wrap',
              alignItems: 'flex-end',
            }}
          >
            {Array.from({ length: totalBlocks }).map((_, i) => (
              <GlassIcon key={i} index={i} value={filledValue} />
            ))}
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <Typography
              variant="subheading"
              color={COLOR_DARK}
              style={{ display: 'block', lineHeight: 1 }}
            >
              {consumedMl.toLocaleString()} ml
            </Typography>
            <Typography
              variant="caption"
              color={COLOR_MUTED}
              style={{ display: 'block', marginTop: 4 }}
            >
              of {goalMl.toLocaleString()} ml
            </Typography>
          </div>
        </div>
      )}

      {/* Inline panel */}
      {showPanel && (
        <div
          style={{
            marginTop: bottleConfig ? 10 : 0,
            background: 'white',
            border: `1px solid ${COLOR_BORDER}`,
            borderRadius: 16,
            padding: '16px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          {!bottleConfig ? (
            /* ── Setup flow ── */
            <>
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
                Set up your bottle
              </Typography>
              <input
                type="text"
                placeholder="Bottle name (e.g. My Hydro Flask)"
                value={bottleName}
                onChange={(e) => setBottleName(e.target.value)}
                autoFocus
                style={inputStyle}
              />
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  type="number"
                  placeholder={
                    unit === 'ml' ? 'Size (e.g. 500)' : 'Size (e.g. 17)'
                  }
                  value={bottleSize}
                  onChange={(e) => setBottleSize(e.target.value)}
                  style={{ ...inputStyle, flex: 1, width: 'auto' }}
                />
                <div
                  style={{
                    display: 'flex',
                    background: 'var(--color-bg)',
                    border: `1px solid ${COLOR_BORDER}`,
                    borderRadius: 10,
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}
                >
                  {(['ml', 'oz'] as const).map((u) => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => setUnit(u)}
                      style={{
                        padding: '0 14px',
                        border: 'none',
                        background: unit === u ? COLOR_DARK : 'transparent',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        transition: 'background 0.15s',
                      }}
                    >
                      <Typography
                        variant="label-strong"
                        color={unit === u ? 'white' : COLOR_MUTED}
                      >
                        {u}
                      </Typography>
                    </button>
                  ))}
                </div>
              </div>
              {bottleSize && (
                <Typography
                  variant="caption"
                  color={COLOR_MUTED}
                  style={{ marginTop: -4 }}
                >
                  ≈{' '}
                  {unit === 'oz'
                    ? `${Math.round(parseFloat(bottleSize) * OZ_TO_ML)} ml`
                    : `${(parseFloat(bottleSize) / OZ_TO_ML).toFixed(1)} oz`}
                </Typography>
              )}
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  type="button"
                  onClick={() => setShowPanel(false)}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: `1px solid ${COLOR_BORDER}`,
                    borderRadius: 10,
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
                  onClick={handleSetup}
                  disabled={!bottleName.trim() || !bottleSize || setupSaving}
                  style={{
                    flex: 1,
                    background: COLOR_TEAL,
                    border: 'none',
                    borderRadius: 10,
                    padding: '10px 0',
                    cursor:
                      bottleName.trim() && bottleSize
                        ? 'pointer'
                        : 'not-allowed',
                    fontFamily: 'inherit',
                    opacity: bottleName.trim() && bottleSize ? 1 : 0.4,
                  }}
                >
                  <Typography variant="label-strong" color="white">
                    {setupSaving ? 'Saving…' : 'Save bottle'}
                  </Typography>
                </button>
              </div>
            </>
          ) : (
            /* ── Log flow ── */
            <>
              <div>
                <Typography
                  variant="label-strong"
                  color={COLOR_DARK}
                  style={{ display: 'block' }}
                >
                  {bottleConfig.bottle_name}
                </Typography>
                <Typography variant="caption" color={COLOR_MUTED}>
                  {bottleMl} ml per bottle — tap how much you drank
                </Typography>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                {FRACTIONS.map(({ label, value }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => handleLog(value)}
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 6,
                      padding: '10px 4px',
                      background: COLOR_TEAL_CARD_BG,
                      border: `1.5px solid ${COLOR_TEAL_BORDER}`,
                      borderRadius: 12,
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >
                    <Typography
                      variant="subheading"
                      color={COLOR_TEAL}
                      style={{ lineHeight: 1 }}
                    >
                      {label}
                    </Typography>
                    <Typography variant="caption" color={COLOR_MUTED}>
                      {Math.round(bottleMl * value)} ml
                    </Typography>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

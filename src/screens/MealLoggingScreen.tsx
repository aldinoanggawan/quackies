import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ScreenContainer } from '../components/ScreenContainer';
import { Button } from '../components/Button';
import { Duck } from '../components/duck/Duck';
import type { DuckEmotion } from '../components/duck/Duck';
import { Typography } from '../components/ui/Typography';
import { UploadZone } from '../components/UploadZone';
import { Spinner } from '../components/Spinner';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../hooks/useProfile';
import { analyzeMeal, saveMeal } from '../lib/db';
import {
  COLOR_BG,
  COLOR_BORDER,
  COLOR_DARK,
  COLOR_MUTED,
  COLOR_PRIMARY,
  COLOR_RED,
  COLOR_WARM_CARD_BG,
} from '../colors';
import type { MealType, AnalysisResult, AnalysisItem } from '../types/models';

const inputBase: React.CSSProperties = {
  fontFamily: 'inherit',
  fontSize: 15,
  fontWeight: 500,
  color: COLOR_DARK,
  background: COLOR_WARM_CARD_BG,
  border: `1px solid ${COLOR_BORDER}`,
  borderRadius: 16,
  outline: 'none',
  colorScheme: 'light' as React.CSSProperties['colorScheme'],
};

export const MealLoggingScreen = () => {
  const { mealType } = useParams<{ mealType: MealType }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile } = useProfile();
  const mealBudget = profile ? Math.round(profile.daily_budget / 3) : 600;

  const [beforePhoto, setBeforePhoto] = useState<string | null>(null);
  const [beforeFile, setBeforeFile] = useState<File | null>(null);
  const [afterPhoto, setAfterPhoto] = useState<string | null>(null);
  const [afterFile, setAfterFile] = useState<File | null>(null);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingEmotion, setLoadingEmotion] = useState<DuckEmotion>('grumpy');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [localItems, setLocalItems] = useState<AnalysisItem[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [addingItem, setAddingItem] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemKcal, setNewItemKcal] = useState('');
  const [saving, setSaving] = useState(false);

  const canAnalyse = !!beforeFile && !loading;

  useEffect(() => {
    if (!loading) return;
    const id = setInterval(() => {
      setLoadingEmotion((e) => (e === 'grumpy' ? 'worried' : 'grumpy'));
    }, 900);
    return () => clearInterval(id);
  }, [loading]);

  const handleAnalyse = async () => {
    if (!beforeFile) return;
    setLoading(true);
    setError(null);
    try {
      const data = await analyzeMeal({
        beforeFile,
        afterFile: afterFile ?? null,
        note,
      });
      setResult(data);
      setLocalItems(data.items);
    } catch (err) {
      console.error('Analysis failed:', err);
      setError('Something went wrong analysing your meal. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReanalyse = () => {
    setResult(null);
    setLocalItems([]);
    setEditingIndex(null);
    setAddingItem(false);
    setNewItemName('');
    setNewItemKcal('');
    setError(null);
  };

  const handleRemoveItem = (index: number) => {
    setLocalItems((prev) => prev.filter((_, i) => i !== index));
    if (editingIndex === index) setEditingIndex(null);
  };

  const handleAddItem = () => {
    const kcal = parseInt(newItemKcal, 10);
    if (!newItemName.trim() || !kcal) return;
    setLocalItems((prev) => [
      ...prev,
      { name: newItemName.trim(), portion: null, kcal, eaten: true },
    ]);
    setNewItemName('');
    setNewItemKcal('');
    setAddingItem(false);
  };

  const handleLog = async () => {
    if (!result || !user) return;
    setSaving(true);
    try {
      await saveMeal({
        userId: user.id,
        mealType: mealType!,
        items: localItems,
        note,
      });
      navigate(-1);
    } catch (err) {
      console.error('Failed to save meal:', err);
    } finally {
      setSaving(false);
    }
  };

  const totalLogged = localItems.reduce(
    (sum, item) => (item.eaten ? sum + item.kcal : sum),
    0,
  );
  const duckEmotion: DuckEmotion = result
    ? totalLogged <= mealBudget
      ? 'happy'
      : 'worried'
    : 'grumpy';

  return (
    <ScreenContainer background={COLOR_BG} style={{ paddingTop: 38, gap: 20 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          type="button"
          onClick={() => navigate(-1)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '4px 8px 4px 0',
            fontSize: 22,
            color: COLOR_DARK,
            lineHeight: 1,
          }}
        >
          ←
        </button>
        <Typography variant="subheading" color={COLOR_DARK}>
          Log {mealType}
        </Typography>
      </div>

      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key="upload"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
          >
            {/* Before zone */}
            <div>
              <Typography
                variant="label-strong"
                color={COLOR_MUTED}
                style={{ display: 'block', marginBottom: 10 }}
              >
                Your meal
              </Typography>
              <UploadZone
                label="Before"
                photo={beforePhoto}
                onPick={(preview, file) => {
                  setBeforePhoto(preview);
                  setBeforeFile(file);
                }}
                full
                emptyHint="Tap to add your meal photo"
              />
            </div>

            {/* After zone — animates in once beforePhoto is set */}
            <AnimatePresence>
              {beforePhoto && (
                <motion.div
                  key="after-zone"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  <Typography
                    variant="label-strong"
                    color={COLOR_MUTED}
                    style={{
                      display: 'block',
                      marginBottom: 10,
                      fontStyle: 'italic',
                    }}
                  >
                    Didn't finish? Add an after photo for a more accurate count
                  </Typography>
                  <UploadZone
                    label="After"
                    photo={afterPhoto}
                    onPick={(preview, file) => {
                      setAfterPhoto(preview);
                      setAfterFile(file);
                    }}
                    full
                    aspectRatio="5 / 3"
                    emptyHint="Add after photo (optional)"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Note */}
            <textarea
              placeholder="Add a note (optional)… e.g. I only ate 2 of the 6 nuggets"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              style={{
                ...inputBase,
                padding: '12px 14px',
                resize: 'none',
                width: '100%',
                boxSizing: 'border-box',
              }}
            />

            {/* Loading duck */}
            <AnimatePresence>
              {loading && (
                <motion.div
                  key="loading-duck"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <Duck emotion={loadingEmotion} size={72} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Analyse button */}
            <Button
              disabled={!canAnalyse}
              onClick={handleAnalyse}
              style={{
                background: canAnalyse ? COLOR_PRIMARY : COLOR_MUTED,
                opacity: canAnalyse ? 1 : 0.5,
                cursor: canAnalyse ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
              }}
            >
              {loading ? (
                <>
                  <Spinner />
                  <span>Analysing…</span>
                </>
              ) : (
                'Analyse →'
              )}
            </Button>

            {error && (
              <Typography
                variant="caption"
                color={COLOR_RED}
                style={{ textAlign: 'center' }}
              >
                {error}
              </Typography>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
          >
            {/* Result duck */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Duck emotion={duckEmotion} size={88} />
            </div>

            {/* AI analysis card */}
            <div
              style={{
                background: COLOR_WARM_CARD_BG,
                border: `1px solid ${COLOR_BORDER}`,
                borderRadius: 16,
                padding: '16px 18px',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              {/* Card header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 16 }}>⭐</span>
                  <Typography variant="label-strong" color={COLOR_DARK}>
                    AI analysis
                  </Typography>
                </div>
                <Typography variant="label" color={COLOR_MUTED}>
                  ~{Math.round(result.confidence * 100)}% confidence
                </Typography>
              </div>

              {/* Item list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {localItems.map((item, i) => (
                  <div
                    key={i}
                    style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    {/* Dot */}
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        flexShrink: 0,
                        background: item.eaten ? COLOR_PRIMARY : COLOR_MUTED,
                      }}
                    />

                    {/* Name + portion */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="label"
                        color={item.eaten ? COLOR_DARK : COLOR_MUTED}
                        style={{
                          textDecoration: item.eaten ? 'none' : 'line-through',
                        }}
                      >
                        {item.name}
                      </Typography>
                      {item.portion && (
                        <Typography
                          variant="caption"
                          color={COLOR_MUTED}
                          style={{ display: 'block' }}
                        >
                          {item.portion}
                        </Typography>
                      )}
                    </div>

                    {/* Editable kcal — dashed underline signals tap-to-edit */}
                    {editingIndex === i ? (
                      <input
                        type="number"
                        value={item.kcal}
                        onChange={(e) => {
                          const next = [...localItems];
                          next[i] = {
                            ...next[i],
                            kcal: parseInt(e.target.value, 10) || 0,
                          };
                          setLocalItems(next);
                        }}
                        onBlur={() => setEditingIndex(null)}
                        onKeyDown={(e) =>
                          e.key === 'Enter' && setEditingIndex(null)
                        }
                        autoFocus
                        style={{
                          ...inputBase,
                          width: 60,
                          padding: '3px 6px',
                          borderRadius: 8,
                          textAlign: 'right',
                          fontSize: 13,
                          colorScheme: 'light',
                        }}
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => setEditingIndex(i)}
                        title="Tap to edit"
                        style={{
                          background: 'transparent',
                          border: 'none',
                          cursor: 'text',
                          padding: '2px 0',
                          fontFamily: 'inherit',
                          borderBottom: `1.5px dashed ${COLOR_MUTED}`,
                        }}
                      >
                        <Typography
                          variant="label-strong"
                          color={item.eaten ? COLOR_DARK : COLOR_MUTED}
                          style={{
                            textDecoration: item.eaten
                              ? 'none'
                              : 'line-through',
                          }}
                        >
                          {item.kcal} kcal
                        </Typography>
                      </button>
                    )}

                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(i)}
                      title="Remove item"
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '2px 4px',
                        color: COLOR_MUTED,
                        fontSize: 16,
                        lineHeight: 1,
                        flexShrink: 0,
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}

                {/* Add item form */}
                {addingItem ? (
                  <div
                    style={{
                      display: 'flex',
                      gap: 6,
                      alignItems: 'center',
                      marginTop: 2,
                    }}
                  >
                    <input
                      placeholder="Item name"
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
                      autoFocus
                      style={{
                        ...inputBase,
                        flex: 1,
                        padding: '5px 10px',
                        borderRadius: 10,
                        fontSize: 13,
                      }}
                    />
                    <input
                      type="number"
                      placeholder="kcal"
                      value={newItemKcal}
                      onChange={(e) => setNewItemKcal(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
                      style={{
                        ...inputBase,
                        width: 60,
                        padding: '5px 8px',
                        borderRadius: 10,
                        textAlign: 'right',
                        fontSize: 13,
                        colorScheme: 'light',
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleAddItem}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '2px 4px',
                        fontSize: 16,
                        color: COLOR_PRIMARY,
                        flexShrink: 0,
                      }}
                    >
                      ✓
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAddingItem(false);
                        setNewItemName('');
                        setNewItemKcal('');
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '2px 4px',
                        fontSize: 16,
                        color: COLOR_MUTED,
                        flexShrink: 0,
                      }}
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setAddingItem(true)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '2px 0',
                      fontFamily: 'inherit',
                      textAlign: 'left',
                    }}
                  >
                    <Typography variant="label" color={COLOR_PRIMARY}>
                      + Add item
                    </Typography>
                  </button>
                )}
              </div>

              {/* Total row */}
              <div
                style={{
                  borderTop: `1px solid ${COLOR_BORDER}`,
                  paddingTop: 10,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="label-strong" color={COLOR_DARK}>
                  Total logged
                </Typography>
                <Typography variant="label-strong" color={COLOR_PRIMARY}>
                  {totalLogged} kcal
                </Typography>
              </div>

              {result.notes && (
                <Typography
                  variant="caption"
                  color={COLOR_MUTED}
                  style={{ fontStyle: 'italic' }}
                >
                  {result.notes}
                </Typography>
              )}
            </div>

            {/* Log CTA */}
            <Button
              disabled={saving}
              onClick={handleLog}
              style={{
                background: COLOR_PRIMARY,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                opacity: saving ? 0.7 : 1,
                cursor: saving ? 'not-allowed' : 'pointer',
              }}
            >
              {saving ? (
                <>
                  <Spinner />
                  <span>Saving…</span>
                </>
              ) : (
                `Log ${totalLogged} kcal to ${mealType} →`
              )}
            </Button>

            {/* Re-analyse */}
            <button
              type="button"
              onClick={handleReanalyse}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 0',
                fontFamily: 'inherit',
                textAlign: 'center',
              }}
            >
              <Typography variant="label" color={COLOR_MUTED}>
                Re-analyse
              </Typography>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </ScreenContainer>
  );
};

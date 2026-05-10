import { useRef } from 'react';
import { Typography } from './ui/Typography';
import { CameraIcon } from './icons/CameraIcon';
import { COLOR_BORDER, COLOR_MUTED, COLOR_WARM_CARD_BG } from '../colors';

interface UploadZoneProps {
  label: string;
  photo: string | null;
  onPick: (preview: string, file: File) => void;
  disabled?: boolean;
  full?: boolean;
  aspectRatio?: string;
  emptyHint?: string;
}

export const UploadZone = ({
  label,
  photo,
  onPick,
  disabled = false,
  full = false,
  aspectRatio = '1 / 1',
  emptyHint,
}: UploadZoneProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onPick(reader.result as string, file);
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <div
      style={{
        flex: full ? undefined : 1,
        width: full ? '100%' : undefined,
        opacity: disabled ? 0.4 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
      }}
    >
      <Typography
        variant="label-strong"
        color={COLOR_MUTED}
        style={{ display: 'block', marginBottom: 6 }}
      >
        {label}
      </Typography>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        style={{
          width: '100%',
          aspectRatio,
          background: photo ? 'transparent' : COLOR_WARM_CARD_BG,
          border: `2px dashed ${COLOR_BORDER}`,
          borderRadius: 16,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          cursor: 'pointer',
          overflow: 'hidden',
          padding: 0,
          position: 'relative',
        }}
      >
        {photo ? (
          <img
            src={photo}
            alt={label}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <>
            <CameraIcon />
            <Typography variant="caption" color={COLOR_MUTED}>
              {emptyHint ??
                (full
                  ? 'Tap to add your meal photo'
                  : `Add ${label.toLowerCase()} photo`)}
            </Typography>
          </>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFile}
      />
    </div>
  );
};

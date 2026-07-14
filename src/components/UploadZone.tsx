import { useRef } from 'react';
import { Typography } from './ui/Typography';
import { CameraIcon } from './icons/CameraIcon';
import { classNames } from '../lib/classNames';

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
      className={classNames(
        full ? 'w-full' : 'flex-1',
        disabled && 'pointer-events-none opacity-40',
      )}
    >
      <Typography
        variant="label-strong"
        color={'var(--color-muted)'}
        className="mb-1.5 block"
      >
        {label}
      </Typography>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={classNames(
          'relative flex w-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border-2 border-dashed border-line p-0',
          photo ? 'bg-transparent' : 'bg-surface-warm',
        )}
        style={{ aspectRatio }}
      >
        {photo ? (
          <img src={photo} alt={label} className="h-full w-full object-cover" />
        ) : (
          <>
            <CameraIcon />
            <Typography variant="caption" color={'var(--color-muted)'}>
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
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
};

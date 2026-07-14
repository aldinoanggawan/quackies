import { motion } from 'framer-motion';
import { CheckIcon } from './icons/CheckIcon';
import { Typography } from './ui/Typography';
import { classNames } from '../lib/classNames';

export const SelectionCard = ({
  isSelected,
  onClick,
  icon,
  iconBg,
  label,
  subtitle,
  animationDelay = 0,
}: {
  isSelected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  iconBg?: string;
  label: string;
  subtitle: string;
  animationDelay?: number;
}) => (
  <motion.button
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: animationDelay }}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={classNames(
      'flex cursor-pointer items-center gap-4 rounded-[20px] border-2 p-[16px_20px] text-left font-[inherit] transition-colors duration-200',
      isSelected ? 'border-brand bg-canvas' : 'border-line bg-white',
    )}
  >
    <div
      className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[14px] text-[26px] transition-colors duration-200"
      style={{
        background:
          iconBg ??
          (isSelected
            ? 'var(--color-surface-brand)'
            : 'var(--color-neutral-subtle)'),
      }}
    >
      {icon}
    </div>

    <div className="flex-1">
      <Typography variant="label-strong" as="div" className="mb-1 text-base">
        {label}
      </Typography>
      <Typography variant="label" color="var(--color-muted)">
        {subtitle}
      </Typography>
    </div>

    <div
      className={classNames(
        'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200',
        isSelected ? 'border-brand bg-brand' : 'border-line bg-transparent',
      )}
    >
      {isSelected && <CheckIcon />}
    </div>
  </motion.button>
);

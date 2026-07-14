import { withOpacity } from '../lib/color';
import { motion } from 'framer-motion';
import { Duck, type DuckEmotion } from './duck/Duck';

interface PulsingDuckProps {
  emotion?: DuckEmotion;
  size?: number;
  ringGap?: number;
}

export const PulsingDuck = ({
  emotion = 'happy',
  size = 120,
  ringGap = 19,
}: PulsingDuckProps) => (
  <div
    className="relative flex h-[var(--duck-size)] w-[var(--duck-size)] items-center justify-center"
    style={{ '--duck-size': `${size}px` } as React.CSSProperties}
  >
    <motion.div
      animate={{ scale: [1, 1.4, 1], opacity: [0.45, 0, 0.45] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute rounded-full border-[2.5px]"
      style={{
        inset: -ringGap,
        borderColor: withOpacity('var(--color-brand)', 0.4),
        background: withOpacity('var(--color-brand)', 0.07),
      }}
    />
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <Duck emotion={emotion} size={size} />
    </motion.div>
  </div>
);

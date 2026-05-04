import { motion } from 'framer-motion';
import { Duck, type DuckEmotion } from './duck/Duck';
import { COLOR_PRIMARY, alpha } from '../colors';

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
    style={{
      position: 'relative',
      width: size,
      height: size,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <motion.div
      animate={{ scale: [1, 1.4, 1], opacity: [0.45, 0, 0.45] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        position: 'absolute',
        inset: -ringGap,
        borderRadius: '50%',
        border: `2.5px solid ${alpha(COLOR_PRIMARY, 0.4)}`,
        background: alpha(COLOR_PRIMARY, 0.07),
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

import { motion } from 'framer-motion';
import { CheckIcon } from './icons/CheckIcon';
import { Typography } from './ui/Typography';
import { COLOR_BG, COLOR_BORDER, COLOR_PRIMARY } from '../colors';

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
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      background: isSelected ? COLOR_BG : 'white',
      border: `2px solid ${isSelected ? COLOR_PRIMARY : COLOR_BORDER}`,
      borderRadius: 20,
      padding: '16px 20px',
      cursor: 'pointer',
      textAlign: 'left',
      fontFamily: 'inherit',
      transition: 'border-color 0.2s, background 0.2s',
    }}
  >
    <div
      style={{
        width: 52,
        height: 52,
        borderRadius: 14,
        background: iconBg ?? (isSelected ? '#FFF3D4' : '#F5F5F5'),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        fontSize: 26,
        transition: 'background 0.2s',
      }}
    >
      {icon}
    </div>

    <div style={{ flex: 1 }}>
      <Typography
        variant="label-strong"
        as="div"
        style={{ fontSize: 16, marginBottom: 4 }}
      >
        {label}
      </Typography>
      <Typography variant="label" color="var(--color-muted)">
        {subtitle}
      </Typography>
    </div>

    <div
      style={{
        width: 24,
        height: 24,
        borderRadius: '50%',
        border: `2px solid ${isSelected ? COLOR_PRIMARY : COLOR_BORDER}`,
        background: isSelected ? COLOR_PRIMARY : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        transition: 'all 0.2s',
      }}
    >
      {isSelected && <CheckIcon />}
    </div>
  </motion.button>
);

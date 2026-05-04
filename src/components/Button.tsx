import { motion } from 'framer-motion';
import { COLOR_PRIMARY } from '../colors';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
}

export const Button = ({
  color = COLOR_PRIMARY,
  style,
  children,
  ...props
}: ButtonProps) => {
  const shadow = `0 4px 18px ${color}66`;

  return (
    <motion.button
      whileHover={{ scale: 1.03, boxShadow: `0 6px 24px ${color}80` }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      style={{
        width: '100%',
        background: color,
        color: 'white',
        border: 'none',
        borderRadius: 50,
        padding: '16px 0',
        fontSize: 17,
        fontWeight: 700,
        cursor: 'pointer',
        boxShadow: shadow,
        ...style,
      }}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
};

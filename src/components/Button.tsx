import { withOpacity } from '../lib/color';
import { motion } from 'framer-motion';
import { classNames } from '../lib/classNames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
}

export const Button = ({
  color = 'var(--color-brand)',
  className,
  style,
  children,
  ...props
}: ButtonProps) => {
  const shadow = '0 4px 18px ' + withOpacity(color, 0.4);

  return (
    <motion.button
      whileHover={{
        scale: 1.03,
        boxShadow: '0 6px 24px ' + withOpacity(color, 0.5),
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={classNames(
        'w-full cursor-pointer rounded-[50px] border-0 bg-[var(--button-color)] py-4 text-[17px] font-bold text-white shadow-[var(--button-shadow)]',
        className,
      )}
      style={
        {
          '--button-color': color,
          '--button-shadow': shadow,
          ...style,
        } as React.CSSProperties
      }
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
};

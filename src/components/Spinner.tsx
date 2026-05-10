import { motion } from 'framer-motion';

export const Spinner = () => (
  <motion.span
    animate={{ rotate: 360 }}
    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
    style={{
      display: 'inline-block',
      width: 18,
      height: 18,
      border: '2.5px solid rgba(255,255,255,0.4)',
      borderTopColor: 'white',
      borderRadius: '50%',
    }}
  />
);

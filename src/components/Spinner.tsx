import { motion } from 'framer-motion';

export const Spinner = () => (
  <motion.span
    animate={{ rotate: 360 }}
    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
    className="inline-block h-5 w-5 rounded-full border-2.5 border-white/40 border-t-white"
  />
);

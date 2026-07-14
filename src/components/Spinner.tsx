import { motion } from 'framer-motion';

export const Spinner = () => (
  <motion.span
    animate={{ rotate: 360 }}
    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
    className="inline-block h-[18px] w-[18px] rounded-full border-[2.5px] border-white/40 border-t-white"
  />
);

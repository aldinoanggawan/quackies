import { useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { TRANSITION_DURATION_MS } from '../../constants';

const FrozenOutlet = ({ children }: { children: React.ReactNode }) => {
  const [frozen] = useState(children);
  return <>{frozen}</>;
};

export const OnboardingLayout = () => {
  const location = useLocation();
  const element = useOutlet();

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden' }}>
      <AnimatePresence mode="sync">
        <motion.div
          key={location.pathname}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{
            type: 'tween',
            ease: 'easeInOut',
            duration: TRANSITION_DURATION_MS / 1000,
          }}
          style={{ position: 'absolute', inset: 0, overflowY: 'auto' }}
        >
          <FrozenOutlet>{element}</FrozenOutlet>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

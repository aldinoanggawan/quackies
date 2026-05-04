import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Duck } from '../../components/duck/Duck';
import { Button } from '../../components/Button';
import { ScreenContainer } from '../../components/ScreenContainer';
import { Typography } from '../../components/ui/Typography';
import {
  COLOR_PRIMARY,
  COLOR_TEAL,
  COLOR_PRIMARY_CARD_BG,
  COLOR_PRIMARY_BORDER,
} from '../../colors';
import { ProgressDots } from '../../components/ProgressDots';

const TAGS = [
  {
    label: 'Avocado',
    kcal: '100 kcal',
    dot: '#5A8A50',
    left: '8%',
    top: '10%',
    rotate: -8,
    delay: 0,
  },
  {
    label: 'Chicken',
    kcal: '210 kcal',
    dot: COLOR_PRIMARY,
    left: '46%',
    top: '32%',
    rotate: 5,
    delay: 0.6,
  },
  {
    label: 'Broccoli',
    kcal: '55 kcal',
    dot: COLOR_TEAL,
    left: '14%',
    top: '54%',
    rotate: -4,
    delay: 1.1,
  },
];

export const TrackCalories = () => {
  const navigate = useNavigate();

  return (
    <ScreenContainer>
      <ProgressDots current={1} />

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 28,
        }}
      >
        {/* Card */}
        <div
          style={{
            background: COLOR_PRIMARY_CARD_BG,
            borderRadius: 24,
            height: 300,
            position: 'relative',
            overflow: 'hidden',
            border: `1px solid ${COLOR_PRIMARY_BORDER}`,
          }}
        >
          {/* Floating calorie tags */}
          {TAGS.map((tag) => (
            <motion.div
              key={tag.label}
              animate={{ y: [0, -7, 0] }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: tag.delay,
              }}
              style={{
                position: 'absolute',
                left: tag.left,
                top: tag.top,
                background: 'white',
                borderRadius: 20,
                padding: '6px 12px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.09)',
                transform: `rotate(${tag.rotate}deg)`,
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                whiteSpace: 'nowrap',
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: tag.dot,
                  display: 'inline-block',
                  flexShrink: 0,
                }}
              />
              <Typography variant="label-strong">{tag.label}</Typography>
              <Typography variant="caption" color={tag.dot}>
                {tag.kcal}
              </Typography>
            </motion.div>
          ))}

          {/* Plate with food */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: '18%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: 4,
                marginBottom: -20,
                zIndex: 1,
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 28,
                  background: '#6DB85C',
                  borderRadius: '50%',
                }}
              />
              <div
                style={{
                  width: 18,
                  height: 24,
                  background: '#A8CC8C',
                  borderRadius: '50%',
                  marginTop: 12,
                }}
              />
              <div
                style={{
                  width: 28,
                  height: 22,
                  background: '#C8855A',
                  borderRadius: '50%',
                  marginTop: 4,
                }}
              />
            </div>
            <div
              style={{
                width: 110,
                height: 28,
                background: 'white',
                borderRadius: '50%',
                boxShadow: '0 3px 8px rgba(0,0,0,0.12)',
              }}
            />
            <div
              style={{
                width: 90,
                height: 10,
                background: 'rgba(0,0,0,0.07)',
                borderRadius: '50%',
                marginTop: 2,
              }}
            />
          </div>

          {/* Duck peeking from bottom-right */}
          <motion.div
            style={{ position: 'absolute', bottom: -22, right: 14 }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.5, ease: 'easeInOut', repeat: Infinity }}
          >
            <Duck emotion="happy" size={110} />
          </motion.div>
        </div>

        {/* Text */}
        <div>
          <Typography
            variant="heading"
            as="h1"
            style={{ margin: '0 0 10px', letterSpacing: -0.4 }}
          >
            Track calories
          </Typography>
          <Typography
            variant="body"
            color="var(--color-muted)"
            style={{ margin: 0, lineHeight: 1.65 }}
          >
            Snap a photo and let AI do the rest.
          </Typography>
        </div>
      </div>

      <Button onClick={() => navigate('/onboarding/3')}>Next →</Button>
    </ScreenContainer>
  );
};

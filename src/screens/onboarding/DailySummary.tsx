import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Duck } from '../../components/duck/Duck';
import { OnboardingCTA } from '../../components/OnboardingCTA';
import { ScreenContainer } from '../../components/ScreenContainer';
import { Typography } from '../../components/ui/Typography';
import { ProgressDots } from '../../components/ProgressDots';
import { Chip } from '../../components/ui/Chip';

export const DailySummary = () => {
  const navigate = useNavigate();

  return (
    <ScreenContainer>
      <ProgressDots current={3} />

      <div className="flex flex-1 flex-col justify-center gap-7">
        {/* Card */}
        <div className="relative overflow-visible rounded-3xl border border-line bg-white p-[24px_24px_20px] shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
          {/* Calories remaining */}
          <div className="pr-[90px]">
            <div className="flex items-baseline gap-1.5">
              <Typography
                variant="display"
                color={'var(--color-brand)'}
                className="leading-none"
              >
                842
              </Typography>
              <Typography variant="body" as="span" color="var(--color-muted)">
                kcal
              </Typography>
            </div>
            <Typography
              variant="caption"
              as="p"
              color="var(--color-muted)"
              className="m-[0_0_4px] uppercase tracking-[0.4px]"
            >
              Remaining today
            </Typography>
          </div>

          {/* Proud duck */}
          <motion.div
            className="absolute right-5 top-2.5"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.5, ease: 'easeInOut', repeat: Infinity }}
          >
            <Duck emotion="proud" size={90} />
          </motion.div>

          {/* Breakdown chips */}
          <div className="mt-10 flex items-center gap-1.5">
            <Chip
              label="TDEE"
              value="2,200"
              accentColor={'var(--color-brand-muted)'}
              progress={1}
            />
            <Typography variant="label-strong" color="var(--color-muted)">
              −
            </Typography>
            <Chip
              label="Eaten"
              value="1,180"
              accentColor={'var(--color-danger)'}
              progress={0.54}
            />
            <Typography variant="label-strong" color="var(--color-muted)">
              +
            </Typography>
            <Chip
              label="Burned"
              value="180"
              accentColor={'var(--color-success)'}
              valueColor={'var(--color-success)'}
              borderColor={'var(--color-success)'}
              progress={0.08}
              background={'var(--color-surface-success)'}
            />
          </div>

          {/* Activity row */}
          <div className="mt-[18px] flex items-center justify-between gap-2 rounded-[14px] border border-success bg-surface-success p-[10px_14px]">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 shrink-0 rounded-full bg-success" />
              <Typography variant="label">Indoor cycling· 45 min</Typography>
            </div>
            <Typography
              variant="label"
              color={'var(--color-success)'}
              className="shrink-0"
            >
              +180 kcal earned
            </Typography>
          </div>
        </div>

        {/* Text */}
        <div>
          <Typography
            variant="heading"
            as="h1"
            className="m-[0_0_10px] tracking-[-0.4px]"
          >
            Your day, at a glance
          </Typography>
          <Typography
            variant="body"
            color="var(--color-muted)"
            className="m-0 leading-[1.65]"
          >
            See exactly where you stand — calories eaten, burned, and left for
            the day.
          </Typography>
        </div>
      </div>

      <OnboardingCTA onClick={() => navigate('/onboarding/5')} />
    </ScreenContainer>
  );
};

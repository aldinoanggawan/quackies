import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type DuckEmotion =
  | 'happy'
  | 'grumpy'
  | 'proud'
  | 'sad'
  | 'excited'
  | 'sleepy'
  | 'worried'
  | 'celebrating'
  | 'swimming'
  | 'determined';

interface DuckProps {
  emotion?: DuckEmotion;
  size?: number;
  className?: string;
}

// Eye positions used consistently across all non-swimming emotions
const EYE_L = { cx: 35, cy: 50 };
const EYE_R = { cx: 65, cy: 50 };

const Eye = ({
  cx,
  cy,
  emotion,
}: {
  cx: number;
  cy: number;
  emotion: DuckEmotion;
}) => {
  const isSleepy = emotion === 'sleepy';
  const isWorried = emotion === 'worried';
  const isExcited = emotion === 'excited';
  const isSad = emotion === 'sad';
  const irisDx = isWorried ? 2 : 0;

  return (
    <g>
      {/* Sclera */}
      <ellipse cx={cx} cy={cy} rx={6.4} ry={6.4} fill="white" />
      {/* Iris */}
      <ellipse
        cx={cx + irisDx}
        cy={cy + (isSad ? 0.5 : 0)}
        rx={4.1}
        ry={4.1}
        fill="#7A4518"
      />
      {/* Pupil */}
      <ellipse
        cx={cx + irisDx}
        cy={cy + (isSad ? 0.5 : 0)}
        rx={2}
        ry={2}
        fill="#2A1408"
      />
      {/* Shine */}
      <ellipse
        cx={cx + irisDx + 1.8}
        cy={cy - 2}
        rx={1.4}
        ry={1.4}
        fill="white"
      />
      {/* Sleepy eyelid — covers top half */}
      {isSleepy && (
        <ellipse cx={cx} cy={cy - 2} rx={6.8} ry={5} fill="#E8D44A" />
      )}
      {/* Sad watery shimmer */}
      {isSad && (
        <ellipse
          cx={cx}
          cy={cy + 5}
          rx={3.5}
          ry={1.2}
          fill="#A8D8F0"
          opacity={0.6}
        />
      )}
      {/* Excited sparkle */}
      {isExcited && (
        <text
          x={cx + 7}
          y={cy - 5}
          fontSize="6"
          fill="#C8960A"
          textAnchor="middle"
        >
          ✦
        </text>
      )}
    </g>
  );
};

const BaseDuck = ({ emotion }: { emotion: DuckEmotion }) => {
  const isSad = emotion === 'sad';
  const fill = isSad ? '#D4C040' : '#E8D44A';

  return (
    <>
      {/* Body */}
      <ellipse cx="50" cy="85" rx="38" ry="30" fill={fill} />
      {/* Wings — neutral position, drawn behind head */}
      <ellipse
        cx="12.7"
        cy="75.5"
        rx="10"
        ry="15.7"
        fill="#D4BE38"
        transform="rotate(-20 12.7 75.5)"
      />
      <ellipse
        cx="87.3"
        cy="75.5"
        rx="10"
        ry="15.7"
        fill="#D4BE38"
        transform="rotate(20 87.3 75.5)"
      />
      {/* Head */}
      <ellipse cx="50" cy="50" rx="31" ry="29" fill={fill} />
      {/* Hair clip */}
      <rect x="39" y="22" width="22" height="7" rx="4" fill="#8B5E2A" />
      {/* Blush */}
      <ellipse cx="28" cy="57" rx="7" ry="4" fill="#FF9090" opacity="0.4" />
      <ellipse cx="72" cy="57" rx="7" ry="4" fill="#FF9090" opacity="0.4" />
      {/* Nostrils */}
      <ellipse cx="46.4" cy="63" rx="2.3" ry="2" fill="#A07030" />
      <ellipse cx="53.6" cy="63" rx="2.3" ry="2" fill="#A07030" />
      {/* Bill */}
      <ellipse cx="50" cy="70" rx="13.6" ry="9.8" fill="#C8960A" />
      <ellipse cx="50" cy="65" rx="11.8" ry="6.9" fill="#D4A820" />
      {/* Feet */}
      <ellipse cx="40" cy="112" rx="10" ry="4" fill="#C8960A" />
      <ellipse cx="60" cy="112" rx="10" ry="4" fill="#C8960A" />
    </>
  );
};

// --- Brow helpers (adjusted for wider eye positions) ---

const HappyBrows = () => (
  <g stroke="#5A3010" strokeWidth="2" fill="none" strokeLinecap="round">
    <path d="M 30 42 Q 35 37 40 42" />
    <path d="M 60 42 Q 65 37 70 42" />
  </g>
);

const GrumpyBrows = () => (
  <g stroke="#5A3010" strokeWidth="2.5" fill="none" strokeLinecap="round">
    <path d="M 29 40 L 35 46 L 41 40" />
    <path d="M 59 40 L 65 46 L 71 40" />
  </g>
);

const ProudBrows = () => (
  <g stroke="#5A3010" strokeWidth="2" fill="none" strokeLinecap="round">
    <path d="M 29 38 Q 35 33 41 38" />
    <path d="M 59 38 Q 65 33 71 38" />
  </g>
);

const SadBrows = () => (
  <g stroke="#5A3010" strokeWidth="2" fill="none" strokeLinecap="round">
    <path d="M 30 43 Q 35 38 40 44" />
    <path d="M 60 44 Q 65 38 70 43" />
  </g>
);

const WorriedBrows = () => (
  <g stroke="#5A3010" strokeWidth="2" fill="none" strokeLinecap="round">
    <path d="M 30 43 Q 35 40 40 43" />
    <path d="M 60 43 Q 65 40 70 43" />
  </g>
);

const DeterminedBrows = () => (
  <g stroke="#5A3010" strokeWidth="2.5" fill="none" strokeLinecap="round">
    <path d="M 29 37 L 41 44" />
    <path d="M 71 37 L 59 44" />
  </g>
);

// --- Wing helpers (overlay wings for raised/fist variants) ---

const WingsRaised = () => (
  <g fill="#D4BE38">
    <ellipse cx="12" cy="63" rx="10" ry="15.7" transform="rotate(-45 12 63)" />
    <ellipse cx="88" cy="63" rx="10" ry="15.7" transform="rotate(45 88 63)" />
  </g>
);

const WingsFist = () => (
  <g>
    <ellipse
      cx="13"
      cy="68"
      rx="10"
      ry="12"
      fill="#D4BE38"
      transform="rotate(-15 13 68)"
    />
    <rect x="7" y="62" width="13" height="9" rx="3" fill="#C8A020" />
    <ellipse
      cx="87"
      cy="68"
      rx="10"
      ry="12"
      fill="#D4BE38"
      transform="rotate(15 87 68)"
    />
    <rect x="80" y="62" width="13" height="9" rx="3" fill="#C8A020" />
  </g>
);

// --- Emotion overlays ---

const HappyOverlay = () => (
  <>
    <HappyBrows />
    <Eye cx={EYE_L.cx} cy={EYE_L.cy} emotion="happy" />
    <Eye cx={EYE_R.cx} cy={EYE_R.cy} emotion="happy" />
    <path
      d="M 40 74 Q 50 81 60 74"
      stroke="#A07828"
      strokeWidth="1.8"
      fill="none"
      strokeLinecap="round"
    />
  </>
);

const GrumpyOverlay = () => (
  <>
    <GrumpyBrows />
    <Eye cx={EYE_L.cx} cy={EYE_L.cy} emotion="grumpy" />
    <Eye cx={EYE_R.cx} cy={EYE_R.cy} emotion="grumpy" />
    <line
      x1="43"
      y1="74"
      x2="57"
      y2="74"
      stroke="#A07828"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </>
);

const ProudOverlay = () => (
  <>
    <ProudBrows />
    <Eye cx={EYE_L.cx} cy={EYE_L.cy} emotion="proud" />
    <Eye cx={EYE_R.cx} cy={EYE_R.cy} emotion="proud" />
    <path
      d="M 40 74 Q 50 81 60 74"
      stroke="#A07828"
      strokeWidth="1.8"
      fill="none"
      strokeLinecap="round"
    />
    <WingsRaised />
    <text x="50" y="17" fontSize="13" fill="#C8960A" textAnchor="middle">
      ★
    </text>
    <circle cx="20" cy="28" r="2" fill="#C8960A" opacity="0.8" />
    <circle cx="80" cy="28" r="2" fill="#C8960A" opacity="0.8" />
    <circle cx="13" cy="48" r="1.5" fill="#E8D44A" opacity="0.8" />
    <circle cx="87" cy="48" r="1.5" fill="#E8D44A" opacity="0.8" />
  </>
);

const SadOverlay = () => (
  <>
    <SadBrows />
    <Eye cx={EYE_L.cx} cy={EYE_L.cy} emotion="sad" />
    <Eye cx={EYE_R.cx} cy={EYE_R.cy} emotion="sad" />
    <path
      d="M 43 74 Q 50 69 57 74"
      stroke="#A07828"
      strokeWidth="1.8"
      fill="none"
      strokeLinecap="round"
    />
    {/* Teardrop */}
    <ellipse cx="65" cy="60" rx="1.8" ry="2.8" fill="#A8D8F0" />
  </>
);

const ExcitedOverlay = () => (
  <>
    <HappyBrows />
    <Eye cx={EYE_L.cx} cy={EYE_L.cy} emotion="excited" />
    <Eye cx={EYE_R.cx} cy={EYE_R.cy} emotion="excited" />
    <path
      d="M 40 73 Q 50 81 60 73"
      stroke="#A07828"
      strokeWidth="1.8"
      fill="none"
      strokeLinecap="round"
    />
    <WingsRaised />
    <line
      x1="6"
      y1="58"
      x2="14"
      y2="64"
      stroke="#C8960A"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="4"
      y1="70"
      x2="13"
      y2="72"
      stroke="#C8960A"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="94"
      y1="58"
      x2="86"
      y2="64"
      stroke="#C8960A"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="96"
      y1="70"
      x2="87"
      y2="72"
      stroke="#C8960A"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </>
);

const SleepyOverlay = () => (
  <>
    <g stroke="#5A3010" strokeWidth="1.5" fill="none" strokeLinecap="round">
      <line x1="30" y1="42" x2="40" y2="42" />
      <line x1="60" y1="42" x2="70" y2="42" />
    </g>
    <Eye cx={EYE_L.cx} cy={EYE_L.cy} emotion="sleepy" />
    <Eye cx={EYE_R.cx} cy={EYE_R.cy} emotion="sleepy" />
    <path
      d="M 43 74 Q 50 78 57 74"
      stroke="#A07828"
      strokeWidth="1.8"
      fill="none"
      strokeLinecap="round"
    />
    <text
      x="74"
      y="30"
      fontSize="8"
      fill="#A07010"
      opacity="0.9"
      fontWeight="bold"
    >
      z
    </text>
    <text
      x="82"
      y="20"
      fontSize="10"
      fill="#A07010"
      opacity="0.7"
      fontWeight="bold"
    >
      z
    </text>
    <text
      x="91"
      y="10"
      fontSize="12"
      fill="#A07010"
      opacity="0.5"
      fontWeight="bold"
    >
      z
    </text>
  </>
);

const WorriedOverlay = () => (
  <>
    <WorriedBrows />
    <Eye cx={EYE_L.cx} cy={EYE_L.cy} emotion="worried" />
    <Eye cx={EYE_R.cx} cy={EYE_R.cy} emotion="worried" />
    <path
      d="M 42 74 Q 46 77 50 74 Q 54 71 58 74"
      stroke="#A07828"
      strokeWidth="1.8"
      fill="none"
      strokeLinecap="round"
    />
    {/* Sweat drop */}
    <ellipse cx="74" cy="40" rx="2" ry="3" fill="#A8D8F0" />
    <path d="M 72 38 Q 74 34 76 38" fill="#A8D8F0" />
  </>
);

const CelebratingOverlay = () => {
  const colors = ['#E84060', '#3BB88A', '#C8960A', '#A855F7', '#3B82F6'];
  const dots = [
    { x: 10, y: 20, c: 0 },
    { x: 88, y: 18, c: 1 },
    { x: 5, y: 45, c: 2 },
    { x: 93, y: 40, c: 3 },
    { x: 15, y: 72, c: 4 },
    { x: 85, y: 70, c: 0 },
    { x: 25, y: 10, c: 1 },
    { x: 75, y: 8, c: 2 },
    { x: 50, y: 5, c: 3 },
  ];
  return (
    <>
      <HappyBrows />
      <Eye cx={EYE_L.cx} cy={EYE_L.cy} emotion="happy" />
      <Eye cx={EYE_R.cx} cy={EYE_R.cy} emotion="happy" />
      <path
        d="M 38 73 Q 50 82 62 73"
        stroke="#A07828"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      <WingsRaised />
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="3" fill={colors[d.c]} />
      ))}
    </>
  );
};

const SwimmingOverlay = () => (
  <>
    {/* Goggle straps */}
    <path
      d="M16.4 50 Q27.3 46.1 34.5 50"
      fill="none"
      stroke="#E84040"
      strokeWidth="2.7"
      strokeLinecap="round"
    />
    <path
      d="M65.5 50 Q72.7 46.1 83.6 50"
      fill="none"
      stroke="#E84040"
      strokeWidth="2.7"
      strokeLinecap="round"
    />
    {/* Goggle frames */}
    <ellipse
      cx={34.5}
      cy={52}
      rx={12.7}
      ry={11.8}
      fill="white"
      stroke="#E84040"
      strokeWidth="2.3"
    />
    <ellipse
      cx={65.5}
      cy={52}
      rx={12.7}
      ry={11.8}
      fill="white"
      stroke="#E84040"
      strokeWidth="2.3"
    />
    {/* Bridge */}
    <line
      x1="47.3"
      y1="51"
      x2="52.7"
      y2="51"
      stroke="#E84040"
      strokeWidth="2.3"
      strokeLinecap="round"
    />
    {/* Left eye */}
    <ellipse cx={34.5} cy={52} rx={6.4} ry={6.4} fill="#C8E8FF" />
    <ellipse cx={34.5} cy={53} rx={4.1} ry={4.1} fill="#7A4518" />
    <ellipse cx={34.5} cy={53} rx={2} ry={2} fill="#2A1408" />
    <ellipse cx={36.3} cy={51} rx={1.4} ry={1.4} fill="white" />
    {/* Right eye */}
    <ellipse cx={65.5} cy={52} rx={6.4} ry={6.4} fill="#C8E8FF" />
    <ellipse cx={65.5} cy={53} rx={4.1} ry={4.1} fill="#7A4518" />
    <ellipse cx={65.5} cy={53} rx={2} ry={2} fill="#2A1408" />
    <ellipse cx={67.3} cy={51} rx={1.4} ry={1.4} fill="white" />
    {/* Snorkel */}
    <path
      d="M78.2 44.1 Q87.3 34.3 87.3 18.6"
      fill="none"
      stroke="#E84040"
      strokeWidth="3.2"
      strokeLinecap="round"
    />
    <ellipse cx={87.3} cy={16.6} rx={6.4} ry={4.9} fill="#E84040" />
    {/* Smile */}
    <path
      d="M40 73.6 Q50 80.4 60 73.6"
      fill="none"
      stroke="#A07828"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </>
);

const DeterminedOverlay = () => (
  <>
    <DeterminedBrows />
    <Eye cx={EYE_L.cx} cy={EYE_L.cy} emotion="grumpy" />
    <Eye cx={EYE_R.cx} cy={EYE_R.cy} emotion="grumpy" />
    <line
      x1="43"
      y1="74"
      x2="57"
      y2="74"
      stroke="#A07828"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <WingsFist />
    <path
      d="M 50 5 C 46 12 40 14 42 20 C 38 16 36 22 40 26 C 38 22 44 24 44 28 C 44 22 48 20 48 26 C 50 20 54 22 52 28 C 52 24 58 22 56 26 C 60 22 62 16 58 20 C 60 14 54 12 50 5 Z"
      fill="#E84060"
      opacity="0.9"
    />
    <path
      d="M 50 10 C 47 15 43 17 45 21 C 43 18 45 24 47 22 C 47 26 50 22 50 26 C 50 22 53 26 53 22 C 55 24 57 18 55 21 C 57 17 53 15 50 10 Z"
      fill="#C8960A"
      opacity="0.9"
    />
  </>
);

const OVERLAYS: Record<DuckEmotion, () => React.ReactElement> = {
  happy: HappyOverlay,
  grumpy: GrumpyOverlay,
  proud: ProudOverlay,
  sad: SadOverlay,
  excited: ExcitedOverlay,
  sleepy: SleepyOverlay,
  worried: WorriedOverlay,
  celebrating: CelebratingOverlay,
  swimming: SwimmingOverlay,
  determined: DeterminedOverlay,
};

const CONFETTI_ANGLES = [0, 40, 80, 130, 180, 220, 260, 310];

export const Duck = ({
  emotion = 'grumpy',
  size = 100,
  className,
}: DuckProps) => {
  const Overlay = OVERLAYS[emotion];

  return (
    <motion.div
      className={className}
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        overflow: 'visible',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={emotion}
          initial={{ scale: 0.92 }}
          animate={{ scale: [0.92, 1.05, 1] }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{ position: 'relative', translateY: -0.125 * size }}
        >
          <svg
            viewBox="0 0 100 108"
            width={size}
            height={size * 1.08}
            xmlns="http://www.w3.org/2000/svg"
          >
            <BaseDuck emotion={emotion} />
            <Overlay />

            {emotion === 'celebrating' &&
              CONFETTI_ANGLES.map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const colors = [
                  '#E84060',
                  '#3BB88A',
                  '#C8960A',
                  '#A855F7',
                  '#3B82F6',
                  '#F59E0B',
                  '#10B981',
                  '#8B5CF6',
                ];
                return (
                  <motion.g
                    key={i}
                    animate={{
                      x: Math.cos(rad) * 35,
                      y: Math.sin(rad) * 35,
                      opacity: [1, 0],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: 'easeOut',
                    }}
                  >
                    <circle cx={50} cy={54} r={2.5} fill={colors[i % colors.length]} />
                  </motion.g>
                );
              })}
          </svg>

          {emotion === 'swimming' && (
            <svg
              viewBox="0 0 100 108"
              width={size}
              height={size * 1.08}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                pointerEvents: 'none',
              }}
            >
              {[0, 1, 2].map((i) => (
                <motion.g
                  key={i}
                  animate={{ y: [0, -21.6], opacity: [1, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: 'easeOut',
                  }}
                >
                  <circle
                    cx={87.3}
                    cy={16.6}
                    r={3.5 - i * 0.5}
                    fill="rgba(168, 216, 240, 0.3)"
                    stroke="#A8D8F0"
                    strokeWidth="1.5"
                  />
                </motion.g>
              ))}
            </svg>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

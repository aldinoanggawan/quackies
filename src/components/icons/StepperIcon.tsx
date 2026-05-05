export const StepperIcon = ({ type }: { type: 'minus' | 'plus' }) => (
  <svg
    viewBox="0 0 18 18"
    width={18}
    height={18}
    aria-hidden="true"
    focusable="false"
    style={{ display: 'block' }}
  >
    <path
      d="M4.5 9h9"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
    />
    {type === 'plus' && (
      <path
        d="M9 4.5v9"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    )}
  </svg>
);

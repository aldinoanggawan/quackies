import { Typography } from './ui/Typography';
import { COLOR_PRIMARY_CARD_BG, COLOR_BORDER, COLOR_PRIMARY } from '../colors';

interface LogButtonProps {
  onClick?: () => void;
}

export const LogButton = ({ onClick }: LogButtonProps) => (
  <button
    type="button"
    className="log-btn"
    onClick={onClick}
    style={{
      background: COLOR_PRIMARY_CARD_BG,
      border: `1px solid ${COLOR_BORDER}`,
      borderRadius: 999,
      padding: '1px 10px',
      cursor: 'pointer',
      fontFamily: 'inherit',
    }}
  >
    <Typography variant="label-strong" color={COLOR_PRIMARY}>
      + log
    </Typography>
  </button>
);

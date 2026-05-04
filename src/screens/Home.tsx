import { Duck } from '../components/duck/Duck';
import type { DuckEmotion } from '../components/duck/Duck';

const emotions: DuckEmotion[] = [
  'happy',
  'grumpy',
  'proud',
  'sad',
  'excited',
  'sleepy',
  'worried',
  'celebrating',
  'swimming',
  'determined',
];

export const HomeScreen = () => {
  return (
    <div
      style={{
        background: 'var(--color-bg)',
        minHeight: '100vh',
        padding: '2rem',
      }}
    >
      <h1
        style={{
          color: 'var(--color-dark)',
          fontSize: '1.5rem',
          marginBottom: '2rem',
        }}
      >
        Quackies
      </h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        {emotions.map((e) => (
          <div
            key={e}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <Duck emotion={e} size={100} />
            <span style={{ color: 'var(--color-muted)', fontSize: '0.75rem' }}>
              {e}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

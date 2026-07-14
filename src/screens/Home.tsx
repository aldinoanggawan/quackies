import { useNavigate } from 'react-router-dom';
import { Duck } from '../components/duck/Duck';
import type { DuckEmotion } from '../components/duck/Duck';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';

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
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-canvas p-8">
      <h1 className="mb-8 text-2xl text-ink">Quackies</h1>
      <div className="flex flex-wrap gap-8">
        {emotions.map((e) => (
          <div key={e} className="flex flex-col items-center gap-2">
            <Duck emotion={e} size={100} />
            <span className="text-xs text-muted">{e}</span>
          </div>
        ))}
      </div>
      <Button onClick={handleSignOut}>Sign out</Button>
    </div>
  );
};

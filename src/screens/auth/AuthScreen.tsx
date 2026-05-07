import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Duck, type DuckEmotion } from '../../components/duck/Duck';
import { Button } from '../../components/Button';
import { Typography } from '../../components/ui/Typography';
import { supabase } from '../../lib/supabase';
import { isUsernameTaken, getProfile, saveUsername } from '../../lib/db';
import { buildAuthEmail } from './authUtils';
import {
  COLOR_BG,
  COLOR_BORDER,
  COLOR_DARK,
  COLOR_MUTED,
  COLOR_PRIMARY,
  COLOR_PRIMARY_CARD_BG,
  COLOR_RED,
} from '../../colors';

type Step = 'username' | 'returning' | 'new';

const USERNAME_RE = /^[a-z0-9_]{3,20}$/;

const STEP_CONFIG: Record<
  Exclude<Step, 'username'>,
  { emotion: DuckEmotion; heading: string; passwordHint: string; cta: string }
> = {
  returning: {
    emotion: 'happy',
    heading: 'Welcome back!',
    passwordHint: 'Enter your password to log in',
    cta: 'Log in',
  },
  new: {
    emotion: 'excited',
    heading: 'Create your account',
    passwordHint: 'Pick a password to secure your account',
    cta: 'Sign up',
  },
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '12px 14px',
  fontSize: 17,
  fontWeight: 500,
  fontFamily: 'inherit',
  borderRadius: 14,
  background: 'white',
  color: COLOR_DARK,
  outline: 'none',
};

export const AuthScreen = () => {
  const navigate = useNavigate();
  const passwordRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<Step>('username');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  const config = step !== 'username' ? STEP_CONFIG[step] : null;

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    setUsernameError('');
    setFormError('');

    if (!USERNAME_RE.test(username)) {
      setUsernameError(
        'Username must be 3–20 characters, letters, numbers, and underscores only',
      );
      return;
    }

    setLoading(true);
    try {
      const taken = await isUsernameTaken(username);
      setStep(taken ? 'returning' : 'new');
      setTimeout(() => passwordRef.current?.focus(), 50);
    } catch {
      setFormError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setFormError('');

    if (step === 'new' && password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return;
    }
    if (!password) {
      setPasswordError('Password is required');
      return;
    }

    setLoading(true);
    try {
      const email = buildAuthEmail(username);

      if (step === 'returning') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error || !data.user) {
          setFormError('Invalid username or password');
          return;
        }
        const profile = await getProfile(data.user.id);
        navigate(profile?.daily_budget ? '/home' : '/onboarding');
      } else {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) {
          setFormError(error.message);
          return;
        }
        if (data.user) {
          await saveUsername(data.user.id, username.toLowerCase().trim());
        }
        navigate('/onboarding');
      }
    } catch {
      setFormError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100dvh',
        background: COLOR_BG,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 400,
          background: 'white',
          borderRadius: 24,
          border: `1.5px solid ${COLOR_BORDER}`,
          padding: '32px 28px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
        }}
      >
        <Duck emotion={config?.emotion ?? 'grumpy'} size={80} />

        <motion.div layout style={{ textAlign: 'center' }}>
          <Typography variant="heading-lg" as="h1" style={{ margin: 0 }}>
            {config?.heading ?? 'Quackies'}
          </Typography>
        </motion.div>

        {/* Username chip — shown once step advances */}
        <AnimatePresence>
          {step !== 'username' && (
            <motion.button
              key="chip"
              type="button"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              onClick={() => {
                setStep('username');
                setPassword('');
                setPasswordError('');
                setFormError('');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: COLOR_PRIMARY_CARD_BG,
                border: `1.5px solid ${COLOR_BORDER}`,
                borderRadius: 999,
                padding: '6px 14px 6px 10px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                alignSelf: 'stretch',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="label-strong" color={COLOR_PRIMARY}>
                @{username}
              </Typography>
              <Typography variant="caption" color={COLOR_MUTED}>
                Change
              </Typography>
            </motion.button>
          )}
        </AnimatePresence>

        <form
          onSubmit={step === 'username' ? handleContinue : handleSubmit}
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
          noValidate
        >
          {/* Username field — only visible in step 1 */}
          <AnimatePresence initial={false}>
            {step === 'username' && (
              <motion.div
                key="username-field"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                }}
              >
                <Typography variant="input-label" as="label" htmlFor="username">
                  Username
                </Typography>
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{
                    ...inputStyle,
                    border: `1.5px solid ${usernameError ? COLOR_RED : COLOR_BORDER}`,
                  }}
                />
                {usernameError && (
                  <Typography variant="caption" color={COLOR_RED}>
                    {usernameError}
                  </Typography>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Password field — slides in after username step */}
          <AnimatePresence initial={false}>
            {step !== 'username' && (
              <motion.div
                key="password-field"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                }}
              >
                <Typography variant="input-label" as="label" htmlFor="password">
                  Password
                </Typography>
                <input
                  ref={passwordRef}
                  id="password"
                  type="password"
                  autoComplete={
                    step === 'returning' ? 'current-password' : 'new-password'
                  }
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    ...inputStyle,
                    border: `1.5px solid ${passwordError ? COLOR_RED : COLOR_BORDER}`,
                  }}
                />
                {passwordError ? (
                  <Typography variant="caption" color={COLOR_RED}>
                    {passwordError}
                  </Typography>
                ) : (
                  <Typography variant="caption" color={COLOR_MUTED}>
                    {config?.passwordHint}
                  </Typography>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {formError && (
            <Typography
              variant="caption"
              color={COLOR_RED}
              style={{ textAlign: 'center' }}
            >
              {formError}
            </Typography>
          )}

          <Button
            type="submit"
            disabled={loading}
            style={{ marginTop: 4, opacity: loading ? 0.7 : 1 }}
          >
            {loading ? '…' : step === 'username' ? 'Continue →' : config?.cta}
          </Button>
        </form>
      </div>
    </div>
  );
};

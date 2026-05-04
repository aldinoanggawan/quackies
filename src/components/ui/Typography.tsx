import React from 'react';

type Variant =
  | 'display'
  | 'heading-lg'
  | 'heading'
  | 'body'
  | 'input-label'
  | 'input'
  | 'label-strong'
  | 'label'
  | 'caption';

const STYLES: Record<Variant, React.CSSProperties> = {
  display: { fontSize: 48, fontWeight: 700 },
  'heading-lg': { fontSize: 34, fontWeight: 800 },
  heading: { fontSize: 30, fontWeight: 800 },
  body: { fontSize: 15, fontWeight: 400 },
  'input-label': { fontSize: 15, fontWeight: 500 },
  input: { fontSize: 17, fontWeight: 500 },
  'label-strong': { fontSize: 13, fontWeight: 600 },
  label: { fontSize: 13, fontWeight: 500 },
  caption: { fontSize: 11, fontWeight: 400 },
};

const DEFAULTS: Record<Variant, string> = {
  display: 'span',
  'heading-lg': 'h2',
  heading: 'h2',
  body: 'p',
  'input-label': 'label',
  input: 'span',
  'label-strong': 'span',
  label: 'span',
  caption: 'span',
};

type Props = {
  variant: Variant;
  as?: string;
  color?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  [key: string]: unknown;
};

export const Typography = ({
  variant,
  as,
  color = 'var(--color-dark)',
  style,
  children,
  ...rest
}: Props) => {
  const tag = as ?? DEFAULTS[variant];
  return React.createElement(
    tag,
    { style: { ...STYLES[variant], color, ...style }, ...rest },
    children,
  );
};

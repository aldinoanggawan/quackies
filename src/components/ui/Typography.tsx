import React from 'react';
import { classNames } from '../../lib/classNames';

type Variant =
  | 'display'
  | 'heading-lg'
  | 'heading'
  | 'subheading'
  | 'body'
  | 'input-label'
  | 'input'
  | 'label-strong'
  | 'label'
  | 'caption';

const CLASSES: Record<Variant, string> = {
  display: 'text-[48px] font-bold',
  'heading-lg': 'text-[34px] font-extrabold',
  heading: 'text-[30px] font-extrabold',
  subheading: 'text-lg font-bold',
  body: 'text-[15px] font-normal',
  'input-label': 'text-[15px] font-medium',
  input: 'text-[17px] font-medium',
  'label-strong': 'text-[13px] font-semibold',
  label: 'text-[13px] font-medium',
  caption: 'text-[11px] font-normal',
};

const DEFAULTS: Record<Variant, string> = {
  display: 'span',
  'heading-lg': 'h2',
  heading: 'h2',
  subheading: 'p',
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
  className?: string;
  children: React.ReactNode;
  [key: string]: unknown;
};

export const Typography = ({
  variant,
  as,
  color = 'var(--color-ink)',
  style,
  className,
  children,
  ...rest
}: Props) => {
  const tag = as ?? DEFAULTS[variant];
  return React.createElement(
    tag,
    {
      className: classNames(CLASSES[variant], className),
      style: { color, ...style },
      ...rest,
    },
    children,
  );
};

import clsx from 'clsx';
import css from './Button.module.css';
import { ElementType, ComponentPropsWithoutRef } from 'react';

type ButtonProps<T extends ElementType> = {
  as?: T;  
  size?: 'sm' | 'md';
  children: React.ReactNode;
} & ComponentPropsWithoutRef<T>;

export default function Button<T extends ElementType = 'button'>({
  as,  
  size = 'md',
  children,
  className,
  ...props
}: ButtonProps<T>) {
  const Component = as || 'button';

  return (
    <Component
      className={clsx(css.button,css[size], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
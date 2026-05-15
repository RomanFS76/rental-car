'use client';

import Button from '@/components/shared/Button/Button';
import css from './error.module.css';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  console.error(error);

  return (
    <main className={css.wrapper}>
      <h1 className={css.title}>Something went wrong</h1>

      <p className={css.text}>Please try again later.</p>

      <Button type="button" size="sm" onClick={() => reset()}>
        Try again
      </Button>
    </main>
  );
}

import Button from '../components/shared/Button/Button';
import css from './page.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <main className={css.main}>
      <section className={css.hero}>
        <div className={css.content}>
          <h1 className={css.title}>Find your perfect rental car</h1>

          <p className={css.text}>
            Reliable and budget-friendly rentals for any journey
          </p>
          <Button as={Link} href="/catalog" size="md">
            View Catalog
          </Button>
        </div>
      </section>
    </main>
  );
}

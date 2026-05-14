'use client';
import Image from 'next/image';
import css from './Header.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const Header = () => {
  const pathname = usePathname();

  const homeLinkClass = clsx(css.link, pathname === '/' && css.active);
  const catalogLinkClass = clsx(
    css.link,
    pathname === '/catalog' && css.active
  );

  return (
    <header className={css.header}>
      <div className={`container ${css.headerContainer}`}>
        <svg width={104} height={16}>
          <use href={`/icons/sprite.svg#logo`} />
        </svg>

        <nav className={css.nav}>
          <Link href="/" className={homeLinkClass}>
            Home
          </Link>
          <Link href="/catalog" className={catalogLinkClass}>
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

import Filter from '@/components/Filter/Filter';
import css from './PageCatalog.module.css';
import CarList from '@/components/CarList/CarList';

const PageCatalog = () => {
  return (
    <div className={css.overlayCatalog}>
      <div className={`container`}>
        <Filter />
        <CarList />
      </div>
    </div>
  );
};

export default PageCatalog;

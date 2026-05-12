import Filter from '@/components/Filter/Filter';
import css from './PageCatalog.module.css';
import CarList from '@/components/CarList/CarList';

const PageCatalog = () => {
  return (
    <div className={`container ${css.page} `}>
      <Filter />
      <CarList />
    </div>
  );
};

export default PageCatalog;

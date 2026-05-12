import css from './PageCatalog.module.css';
import Catalog from '@/components/Catalog/Catalog';
import FormFilter from '@/components/Form/FormFilter/FormFilter';

type PropsPageCatalog = {
  searchParams: Promise<{
    brand?: string;
    rentalPrice?: string;
    minMileage?: string;
    maxMileage?: string;
  }>;
};

const PageCatalog = ({ searchParams }: PropsPageCatalog) => {
  return (
    <div className={`container ${css.page}`}>
      <FormFilter />
      <Catalog searchParams={searchParams} />
    </div>
  );
};

export default PageCatalog;


import css from './PageCatalog.module.css';
import Catalog from '@/components/Catalog/Catalog';
import FormFilter from '@/components/Form/FormFilter/FormFilter';

const PageCatalog = () => {
  return (
    <div className={`container ${css.page} `}>
      <FormFilter />
      <Catalog />
    </div>
  );
};

export default PageCatalog;

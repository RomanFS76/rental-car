import { getCars } from '@/lib/api/api';
// import css from './CarList.module.css';

const CarList = async () => {
  const response = await getCars();
  console.log(response);

  return <div>CarList</div>;
};

export default CarList;

export const formatMileage = (value: string) => {
  const numbers = value.replace(/\D/g, '');

  return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
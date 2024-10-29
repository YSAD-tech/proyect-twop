export const calculateTotal = (articles) => {
  let total = 0;
  articles.forEach(({ quantity, price }) => {
    total += quantity * price;
  });
  return total;
};
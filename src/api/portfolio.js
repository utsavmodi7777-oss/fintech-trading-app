import API from './index';

export const getPortfolio = async () => {
  const res = await API.get('/portfolio');
  return res.data;
};

export const buyStock = async (symbol, quantity, price) => {
  const res = await API.post('/trade/buy', { symbol, quantity, price });
  return res.data;
};

export const sellStock = async (symbol, quantity, price) => {
  const res = await API.post('/trade/sell', { symbol, quantity, price });
  return res.data;
};

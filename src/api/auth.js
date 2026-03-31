import API from './index';

export const register = async (name, email, password) => {
  const res = await API.post('/auth/register', { name, email, password });
  return res.data;
};

export const login = async (email, password) => {
  const res = await API.post('/auth/login', { email, password });
  return res.data;
};

import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/login';

const login = async (user) => {
  const response = axios.post(baseUrl, user);
  return (await response).data;
};

export default {
  login,
};

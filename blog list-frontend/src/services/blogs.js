import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const addOne = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const updateOne = async (id, blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${id}`, blog, config);
  return response.data;
};

const deleteOne = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default { setToken, getAll, addOne, updateOne, deleteOne };

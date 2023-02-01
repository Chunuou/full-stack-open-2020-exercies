import axios from 'axios';

const baseURL = 'http://localhost:3001/api/persons';

const getAlL = () => axios.get(baseURL).then((response) => response.data);

const addPerson = (person) => axios.post(baseURL, person).then((response) => response.data);

const deletePerson = (id) => axios.delete(`${baseURL}/${id}`).then((response) => response.data);

const updatePerson = (person) => axios.put(`${baseURL}/${person.id}`, person).then((response) => response.data);

const personService = {
  getAlL,
  addPerson,
  deletePerson,
  updatePerson,
};

export default personService;

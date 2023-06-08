import axios from "axios";

const baseUrl = "http://localhost:3002/persons";

const getAll = () => {
  return axios.get(baseUrl).then((res) => res.data);
};

const create = (personObj) => {
  return axios.post(baseUrl, personObj).then((res) => res.data);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((res) => res.data);
};

const update = (id, personObj) => {
  return axios.put(`${baseUrl}/${id}`, personObj).then((res) => res.data);
};

const personsService = { getAll, create, remove, update };

export default personsService;

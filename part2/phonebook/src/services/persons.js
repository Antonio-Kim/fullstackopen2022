import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => axios.get(baseUrl).then((response) => response.data);
const create = (newObject) =>
  axios.post(baseUrl, newObject).then((response) => response.data);
const update = (id, newObject) =>
  axios.put(`${baseUrl}/persons/${id}`, newObject).then((response) => response.data);
const remove = (id) =>
  axios.delete(`${baseUrl}/${id}`, id).then((response) => response.data);

// eslint-disable-next-line
export default { getAll, create, update, remove };

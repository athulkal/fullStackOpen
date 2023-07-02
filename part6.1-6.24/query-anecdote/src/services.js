import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

export const getAll = () => axios.get(baseUrl).then((res) => res.data);

export const createAnecdote = (newAnecdote) =>
  axios.post(baseUrl, newAnecdote).then((res) => res.data);

export const updateAnecdote = (anecdote) =>
  axios.put(`${baseUrl}/${anecdote.id}`, anecdote).then((res) => {
    console.log(res.data);
    return res.data;
  });

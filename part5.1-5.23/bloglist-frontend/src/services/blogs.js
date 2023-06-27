import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
  return token
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((res) => res.data.data)
}

const create = (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(config)
  return axios.post(baseUrl, blog, config)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const remove = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  return axios.delete(`${baseUrl}/${id}`, config)
}

const blogService = {
  getAll,
  create,
  setToken,
  update,
  remove,
}

export default blogService

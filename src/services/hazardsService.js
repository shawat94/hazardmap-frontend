import axios from "axios";
const baseUrl = process.env.REACT_APP_BACKEND_URL + '/api/v1/hazards/'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    console.log(response.data)
    return response.data
}

const create = async (newObject) => {
    const config = {
        headers: { Authorization: token },
    }
    
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
    }

const remove = async (id) => {
    const config = {
        headers: { Authorization: token }
      }
    console.log(baseUrl.slice(0, -1))
    const response = await axios.delete(`${baseUrl.slice(0, -1)}/${id}`)
    return response.data
}

export default { getAll, create, remove, setToken }
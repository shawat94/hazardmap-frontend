import axios from "axios";
const baseUrl = process.env.REACT_APP_BACKEND_URL + '/api/v1/users/'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const create = async (newObject) => {
    const config = {
        headers: { Authorization: token },
    }
    
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
    }

export default { create, setToken }
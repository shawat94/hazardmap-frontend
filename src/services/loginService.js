import axios from "axios";
const baseUrl = process.env.REACT_APP_BACKEND_URL + '/api/v1/users/login/'

const login = async (userCredentials) => {
    const response = await axios.post(baseUrl, userCredentials)
    return response.data
}

export default { login }
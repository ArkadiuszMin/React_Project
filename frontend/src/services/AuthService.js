import axios from 'axios'

const URL = "http://localhost:4000/auth"

const AuthService = {
    login: (user) => {
        return axios.post(`${URL}/login`, user)
    },

    register: (user) =>{
        return axios.post(`${URL}/register`, user)
    }
}

export default AuthService;
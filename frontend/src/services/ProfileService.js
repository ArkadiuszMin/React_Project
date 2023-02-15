import axios from "axios";
const URL = "http://localhost:4000/profile"

const ProfileService = {
    checkUser: () => {
        return axios.get(`${URL}/check`, {headers: { "authorization": localStorage.getItem("token")}})
    },

    changePlace: (place) => {
        return axios.post(`${URL}/changeplace`, place, {headers: {"authorization": localStorage.getItem("token")}})
    },

    changePassword: (passwords) => {
        return axios.post(`${URL}/changepassword`, passwords, {headers: {"authorization": localStorage.getItem("token")}})
    }
}

export default ProfileService;
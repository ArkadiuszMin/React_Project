import axios from "axios";
const URL = "http://localhost:4000/profile"

const ProfileService = {
    checkUser: (token) => {
        return axios.get(`${URL}/check`, {headers: { "authorization": localStorage.getItem("token")}})
    }
}

export default ProfileService;
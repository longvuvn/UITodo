import axios from "axios";
import { authHeader } from "./auth-header";
import UserProfileUpdate from "../types/User";

const API_URL = `${import.meta.env.VITE_API_URL}/api/user/`;

class UserService {
  getUserProfile() {
    return axios.get(API_URL + "profile", { headers: authHeader() });
  }

  updateUserProfile(data: UserProfileUpdate) {
    return axios.put(API_URL + "profile", data, { headers: authHeader() });
  }
}

export default new UserService();

import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/auth/`;

class AuthService {
  login(username: string, password: string) {
    return axios
      .post(API_URL + "login", { username, password })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username: string, email: string, password: string) {
    return axios.post(API_URL + "register", {
      username,
      email,
      password,
    });
  }
}

export default new AuthService();

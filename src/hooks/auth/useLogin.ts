import React from "react";
import AuthService from "../../service/auth.service";
import { AxiosError } from "axios";

interface LoginResponse {
  token: string;
  username: string;
}
const useLogin = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleLogin = async (
    e: React.FormEvent,
    onSuccess?: () => void
  ): Promise<LoginResponse | null> => {
    e.preventDefault();
    setError("");
    try {
      const data = await AuthService.login(username, password);
      if (data?.token && data?.user?.username) {
        // Lưu thong tin vào localStorage
        localStorage.setItem("user", JSON.stringify(data));

        // Phat sự kien loginSuccess
        window.dispatchEvent(new Event("loginSuccess"));

        if (onSuccess) onSuccess();
      }
      setUsername("");
      setPassword("");
      return data;
    } catch (err: unknown) {
      const errorMsg =
        (err as AxiosError<{ message?: string }>)?.response?.data?.message ||
        "Login failed. Please try again.";
      setError(errorMsg);
      return null;
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    error,
    handleLogin,
  };
};

export default useLogin;

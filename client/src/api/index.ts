import CONSTANTS from "@/constants";
import axios from "axios";

export interface LoginDto {
  email: string;
  password: string;
}

const httpClient = axios.create({
  baseURL: CONSTANTS.SERVER_URL,
});

// Request interceptor
httpClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response interceptor
httpClient.interceptors.response.use(
  function (response) {
    if (response?.data?.accessToken) {
      const token = response.data.accessToken;
      localStorage.setItem("accessToken", token);
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const login = (userData: LoginDto) =>
  httpClient.post("/auth/login", userData);

export const getProfile = () => httpClient.get("/auth/profile");

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  // baseURL: `${process.env.NODE_PUBLIC_API}`,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

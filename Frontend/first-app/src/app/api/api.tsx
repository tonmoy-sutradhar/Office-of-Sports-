import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
    });

    api.interceptors.request.use(
        (config) => {
          // You can add any other custom headers or configurations here if needed
          return config;
        },
        (error) => Promise.reject(error)
      );

export default api;
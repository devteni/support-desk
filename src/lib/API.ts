import axios, { AxiosInstance, HeadersDefaults } from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;
const APP_URL = import.meta.env.VITE_APP_URL; 
let access_token = "";


const API: AxiosInstance = axios.create({
  headers: {
    "Access-Control-Allow-Origin": APP_URL,
    "Authorization": "Bearer",
  },
  baseURL: API_URL,
  withCredentials: true,
});

export const updateAPI = (token: string) => {
  access_token = token;
};

API.interceptors.request.use(
  (config) => {
    let headers = config.headers!;

    headers["Authorization"] = `Bearer ${access_token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
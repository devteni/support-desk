import axios, { AxiosInstance } from "axios";

const API_URL = import.meta.env.REACT_APP_API_URL!;
const APP_URL = import.meta.env.REACT_APP_URL!; 
let access_token = "";

const API: AxiosInstance = axios.create({
  headers: {
    "Access-Control-Allow-Origin": APP_URL,
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
    let common = headers.common!;

    common["Authorization"] = `Token ${access_token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
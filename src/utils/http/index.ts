import axios, { AxiosInstance } from "axios";
import { STORAGE_KEY } from "../constants";
import { authAPI } from "src/api";
// import { notificationError } from "./notification";

export class Http {
  public instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: STORAGE_KEY.BASE_URL,
      responseType: "json",
      headers: {
        "Content-Type": "application/json",
        // _retry: true,
      },
    });

    this.instance.interceptors.request.use(
      (config) => {
        const accessToken = localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error.response?.data)
    );

    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (error?.response?.status === 401) {
          localStorage.clear();
          window.location.href = "/login";
        }
    
        return Promise.reject(error.response?.data);
      }
    );
    
  }
}

const http = new Http().instance;

export default http;

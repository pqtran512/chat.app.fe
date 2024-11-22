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
        _retry: true,
      },
    });

    let isRefreshToken = false;
    let requestsToRefresh = [];

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
        console.log(error);
        const { config } = error;
        if (error?.response?.status === 401) {
          // return Promise.reject(error);
          const refreshToken = localStorage.getItem(STORAGE_KEY.REFRESH_TOKEN);
          const id = localStorage.getItem(STORAGE_KEY.ID);
          console.log(id);
          if (!refreshToken || !id) {
            localStorage.clear();
            return (window.location.href = "/login");
          }

          if (!isRefreshToken) {
            // @todo update status isRefresh to be true
            isRefreshToken = true;

            authAPI
              .refresh({
                id,
                refresh_token: refreshToken,
                is_new_refresh_token: false,
              })
              .then((response) => {
                if (!response.data) {
                  localStorage.clear();
                  return (window.location.href = "/login");
                }
                requestsToRefresh.forEach((callback) => {
                  callback(response.data.access_token);
                });
                // localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, response.data.access_token);
                // return this.instance.request(config);
              })
              .catch((error) => {
                console.log(error);
                requestsToRefresh.forEach((cb) => cb(null));
                localStorage.clear();
                return (window.location.href = "/login");
              })
              .finally(() => {
                // 5. After that, to clear all setup
                isRefreshToken = false;
                requestsToRefresh = [];
              });
          }

          // 3. Setup callback to change token in headers authorization
          return new Promise((resolve, reject) => {
            requestsToRefresh.push((token) => {
              if (token) {
                localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, token);
                // Reset access_token for another request behind
                config.headers.Authorization = `Bearer ${token}`;
                resolve(this.instance.request(config));
              }

              reject(error);
            });
          });
        }

        // notificationError("", error.response?.data);
        return Promise.reject(error.response?.data);
      }
    );
  }
}

const http = new Http().instance;

export default http;

import axios from "axios";
import { baseURL } from "../consts";
import i18n from "../../i18n";
import { message } from "antd";

const api = axios.create({
  baseURL: baseURL,
  timeout: 300000,
  headers: {
    "Accept-Language": i18n.language

  }
});

api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      config.headers ??= {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const data = error.response?.data;

    let errorMessage = "An unknown error occurred. Please try again.";

    if (data) {
      if (typeof data === 'string') {
        errorMessage = data;
      } else if (data.message) {
        errorMessage = data.message;
        if (data.errors && Array.isArray(data.errors)) {
          errorMessage = `${data.message}: ${data.errors.join(' | ')}`;
        }
      }
    } else if (error.message) {
      errorMessage = error.message;
    }

    if (status === 401) {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      if (token) {
        // If token exists but we get 401, treat it as a role/permission issue
        message.error(i18n.t("unauthorizedRoleError") || errorMessage);
      } else {
        // Handle truly unauthorized (no token) - clear storage and redirect
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");

        const publicPages = ["/login", "/register"];
        if (!publicPages.includes(window.location.pathname)) {
          window.location.href = "/login";
          message.error(i18n.t("sessionExpiredError") || errorMessage);
        }
      }
    } else if (status === 403) {
      message.error(errorMessage || "You do not have permission to perform this action.");
    } else if (status === 404) {
      message.error(errorMessage || "The requested resource was not found.");
    } else if (status >= 500) {
      message.error(errorMessage || "A server error occurred. Please try again later.");
    } else if (status) {
      message.error(errorMessage);
    } else {
      // Network error or other issues
      console.error("API Error:", error);
      message.error(errorMessage);
    }

    return Promise.reject(error);
  },
);

export default api;


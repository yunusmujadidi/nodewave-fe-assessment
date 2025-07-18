import { useAuth } from "@/hooks/use-auth";
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// req intercept add bearer token
api.interceptors.request.use((config) => {
  const token = useAuth.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// res intercept
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // reset the zustand store
      useAuth.getState().logout();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

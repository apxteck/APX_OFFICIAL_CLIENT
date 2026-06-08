import axios from "axios";

// Determine the base URL based on environment variables or fallback
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.apxteck.com/api/v1";

// Create an Axios instance
const adminApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for sending/receiving HttpOnly cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach token if stored in memory/localStorage (fallback if not using strict HttpOnly cookies)
// Typically, HttpOnly cookies are handled automatically by the browser with `withCredentials: true`.
adminApi.interceptors.request.use(
  (config) => {
    // You can attach additional custom headers here if needed by the backend
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors like 401 Unauthorized
adminApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access, e.g., redirect to login or show modal
      if (typeof window !== "undefined") {
        // Option 1: Trigger a custom event to show login modal
        // Option 2: Redirect
        // window.location.href = '/login?redirect=' + window.location.pathname;
        console.error("Unauthorized! Session expired or invalid token.");
      }
    } else if (error.response && error.response.status === 403) {
      console.error("Forbidden! You don't have permission to perform this action.");
    }
    
    return Promise.reject(error);
  }
);

export default adminApi;

import axios from "axios";

// Base API URL
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Interceptor to automatically attach JWT token if it exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token"); // get token from localStorage
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;

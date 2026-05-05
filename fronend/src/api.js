import axios from "axios";

const API = axios.create({
  baseURL: "https://vigilant-space-carnival-6949vw59xqpphxpq-5000.app.github.dev",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
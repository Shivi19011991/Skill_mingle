import axios from "axios";

const API_URL = "http://localhost:8000"; // Change if necessary

// Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Create the access token for headers
const setAuthHeader = (token) => {
  if (token) {
    api.defaults.headers["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers["Authorization"];
  }
};

export { api, setAuthHeader };

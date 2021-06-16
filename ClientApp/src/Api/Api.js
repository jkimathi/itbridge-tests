
import axios from "axios";
const baseUrl = "/api/";
let config = {
  "Content-Type": "multipart/form-data",
  Accept: "application/json",
};

if (sessionStorage.getItem("token")) {
  config.authorization = `${sessionStorage.getItem("token")}`;
}

const axiosInstance = axios.create({
  baseURL: baseUrl,
  config,
});

export default axiosInstance;

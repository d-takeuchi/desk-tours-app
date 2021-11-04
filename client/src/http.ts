import axios from "axios";

axios.interceptors.request.use((config: any) => {
  config.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
    "app-auth"
  )}`;
  return config;
});

export default axios;

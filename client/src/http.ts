import axios from "axios";

const token = localStorage.getItem("app-auth");
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
export default axios;

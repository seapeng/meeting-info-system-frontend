import axios from "axios";

const token = localStorage.getItem("token") || "";

const Axios = axios.create({
  baseURL: "https://meetingapi.daovitou.net",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  },
});

export default Axios;

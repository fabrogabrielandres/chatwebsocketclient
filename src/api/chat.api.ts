import axios from "axios";

const chatApi = axios.create({
  baseURL: "http://localhost:3001/api",
});

export { chatApi };

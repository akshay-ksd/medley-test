import axios from "axios";
import { BaseUrl } from "../../../staging";

const Instance = axios.create({
  baseURL: BaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  // timeout: 5000,
});

export default Instance;
import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, err => {
  const status = err.response?.status;
  const expectedError = status && status >= 400 && status < 500;

  if (!expectedError) {
    toast.error("An unexpected error occurred");
    logger.log(err);
  }

  return Promise.reject(err);
});

const setJwt = jwt => (axios.defaults.headers.common["x-auth-token"] = jwt);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};

import jwtDecode from "jwt-decode";
import http from "../services/httpService";

const endpoint = "/auth";

const login = async (email, password) => {
  const { data: jwt } = await http.post(endpoint, { email, password });
  loginWithJwt(jwt);
};

const loginWithJwt = jwt => localStorage.setItem("jwt", jwt);

const logout = () => localStorage.removeItem("jwt");

const getCurrentUser = () => {
  try {
    const jwt = getJwt();
    return jwtDecode(jwt);
  } catch (e) {
    return null;
  }
};

const getJwt = () => localStorage.getItem("jwt");

http.setJwt(getJwt()); // Set custom header with jwt for all http requests

export default {
  login,
  logout,
  loginWithJwt,
  getJwt,
  currentUser: getCurrentUser()
};

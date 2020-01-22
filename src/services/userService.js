import http from "../services/httpService";

const endpoint = "/users";

const register = (...user) => http.post(endpoint, ...user);

export { register };

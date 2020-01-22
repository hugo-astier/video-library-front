import http from "../services/httpService";
import wrapPromise from "../utils/wrapPromise";

const endpoint = "/genres";

function fetchGenres() {
  const promise = http.get(endpoint).then(response => {
    const genreAll = { _id: "genreAll", name: "All Genres" };
    return [genreAll, ...response.data];
  });
  return wrapPromise(promise);
}

export { fetchGenres };

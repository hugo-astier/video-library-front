const url = resource => `http://localhost:3900/api/${resource}`;

const config = {
  apiEndpoints: {
    genres: url("genres"),
    movies: url("movies"),
    users: url("users"),
    auth: url("auth")
  }
};

export default config;

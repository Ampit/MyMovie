const config = {
  API_URL: "https://api.themoviedb.org/3/",
  API_KEY: process.env.REACT_APP_TMDB_API_KEY,
};

console.log("API Key:", config.API_KEY);

export default config;
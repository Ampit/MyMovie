const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    proxy(["/api", "/auth/google"], {
      target: "https://mymovie-d.herokuapp.com/:5000",
    })
  );
};

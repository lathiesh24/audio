const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://bodhi.navana.ai",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "", // remove /api prefix when forwarding the request
      },
    })
  );
};

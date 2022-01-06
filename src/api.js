const http = require("http");
const TeamController = require("./controllers/team-controller");
const DocsController = require("./controllers/docs-controller");

const teamControllerInstace = new TeamController()
const docsControllerInstace = new DocsController()

const handlerWrapper = (execute) => async (request, response) => {
  const { body, statusCode = 200 } = await execute();
  response.write(JSON.stringify(body));
  response.statusCode = statusCode;
  return response.end();
};

const routes = {
  default: handlerWrapper(docsControllerInstace.index.bind(docsControllerInstace)),
  "/teams:get": handlerWrapper(teamControllerInstace.index.bind(teamControllerInstace)),
};

const handler = (request, response) => {
  const { url, method } = request;
  const routeKey = `${url}:${method.toLowerCase()}`;
  const chosen = routes[routeKey] || routes.default;
  response.writeHead(200, { "Content-Type": "application/json" });
  return chosen(request, response);
};

const app = http
  .createServer(handler)
  .listen(3000, () => console.log("🚀 Your API Running right here!", 3000));

module.exports = app;

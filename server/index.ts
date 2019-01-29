import * as express from "express";
import { Express } from "express";
import * as next from "next";
import routes from "./routes";

const server: Express = express();
const port: any = process.env.PORT || 3000;
const dev: boolean = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handler = routes.getRequestHandler(
  app,
  ({ req, res, route, query }: any) => {
    app.render(req, res, route.page, query);
  }
);

app.prepare().then(() => {
  server.use(handler);
  server.listen(port, () => {
    console.log(`🚀 Client ready at http://localhost:${port}`);
  });
});

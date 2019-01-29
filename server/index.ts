import * as express from "express";
import * as next from "next";
import { Express } from "express";

const server: Express = express();
const port: any = process.env.PORT || 3000;
const dev: boolean = process.env.NODE_ENV !== "production";
const app = next({ dev });
const routes = require("./routes");
// const handle: any = app.getRequestHandler();
const handler = routes.getRequestHandler(
  app,
  ({ req, res, route, query }: any) => {
    app.render(req, res, route.page, query);
  }
);

app.prepare().then(() => {
  server.use(handler);

  // server.get("*", (req: Request, res: Response) => {
  //   return handle(req, res);
  // });

  server.listen(port, () => {
    console.log(`🚀 Client ready at http://localhost:${port}`);
  });
});

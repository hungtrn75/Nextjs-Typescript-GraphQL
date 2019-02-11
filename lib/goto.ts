import { Router } from "../server/routes";

export default (url: any) => () => Router.pushRoute(url);

import Routes, * as createRoutes from "next-routes";

// @ts-ignore
const routes: Routes = createRoutes();

// routes.add(name, 'url', 'folder-name/file-name')

routes.add("list-fc", "/list-fc/:slug", "/list-fc");
routes.add("list-class", "/list-class/:slug", "/list-class");
routes.add("about", "/about", "/about");

routes.add("login", "/auth/login", "auth/login");
routes.add("register", "/auth/register", "auth/register");
routes.add("forgot", "/auth/forgot", "auth/forgot");
routes.add("confirm-email", "/auth/confirm-email", "auth/confirm-email");

// routes.add('products', '/products', 'products')
// routes.add('edit_product', '/products/:id/edit', 'products/edit')
// routes.add('create_product', '/products/create', 'products/create')

export default routes;
export const Link = routes.Link;
export const Router = routes.Router;

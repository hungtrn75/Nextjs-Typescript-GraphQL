import React, { ComponentType } from "react";
import { MyContext } from "../interfaces/MyContext";
import checkLoggedIn from "./checkLoggedIn";
import redirect from "./redirect";

export const withAuth = (
  WrappedComponent: ComponentType<any>,
  auth: boolean = false
) =>
  class extends React.Component<any, any> {
    static displayName = `WithAuth(${WrappedComponent.displayName})`;
    static async getInitialProps({ apolloClient, ...ctx }: MyContext) {
      const { loginUser } = await checkLoggedIn(apolloClient);
      console.log(loginUser);
      if (auth) {
        if (!loginUser) redirect(ctx, "/auth/login");
      } else if (loginUser) redirect(ctx, "/");
      return { loginUser };
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

import React, { ComponentType } from "react";
import { Router } from "../server/routes";
import checkLoggedIn from "./checkLoggedIn";
import { isBrowser } from "./isBrowser";

export const withAuth = (
  WrappedComponent: ComponentType<any>,
  auth: boolean = false
) =>
  class extends React.Component<any, any> {
    static displayName = `WithAuth(${WrappedComponent.displayName})`;
    static async getInitialProps(context: any) {
      const { profile } = await checkLoggedIn(context.apolloClient);
      if (auth) {
        if (!profile)
          if (isBrowser) Router.push("/auth/login");
          else context.res.redirect("/auth/login");
      } else if (profile)
        if (isBrowser) Router.push("/");
        else context.res.redirect("/");
      return { profile };
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

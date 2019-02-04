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
      const { profile } = await checkLoggedIn(apolloClient);
	  console.log(profile);
      if (auth) {
        if (!profile) redirect(ctx, "/auth/login");
      } else if (profile) redirect(ctx, "/");
      return { profile };
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

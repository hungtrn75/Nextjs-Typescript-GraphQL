import React from "react";
import WrappedLoginForm from "../../components/auth/Login";
import Layout from "../../components/Layout";
import { LoginComponent } from "../../generated/apolloComponents";
import { withAuth } from "../../lib/withAuth";

class LoginPage extends React.Component {
  render() {
    return (
      <Layout title="Login Page">
        <LoginComponent>
          {login => <WrappedLoginForm mutate={login} />}
        </LoginComponent>
      </Layout>
    );
  }
}

export default withAuth(LoginPage);

import React from "react";
import WrappedLoginForm from "../../components/auth/Login";
import Layout from "../../components/Layout";
import { LoginComponent } from "../../generated/apolloComponents";

type tvalues = { email: string; password: string; remember: boolean };

class LoginPage extends React.Component {
  render() {
    return (
      <Layout title="Login Page">
        <LoginComponent>
          {login => (
            <WrappedLoginForm
              submit={async (values: tvalues) => {
                const res = await login({
                  variables: {
                    email: values.email,
                    password: values.password
                  }
                });
                console.log(res);
              }}
            />
          )}
        </LoginComponent>
      </Layout>
    );
  }
}

export default LoginPage;

import React from "react";
import WrappedRegistrationForm from "../../components/auth/Register";
import Layout from "../../components/Layout";
import { RegisterComponent } from "../../generated/apolloComponents";
import { Router } from "../../server/routes";

// type tvalues = { email: string; password: string; remember: boolean };

class RegistrationPage extends React.Component {
  render() {
    return (
      <Layout title="Registration Page">
        <RegisterComponent>
          {register => (
            <WrappedRegistrationForm
              onSubmit={async (values: any) => {
                const res = await register({
                  variables: {
                    data: {
                      firstName: values.firstName,
                      lastName: values.lastName,
                      email: values.email,
                      password: values.password
                    }
                  }
                });
                console.log(res);
                Router.pushRoute("login");
              }}
            />
          )}
        </RegisterComponent>
      </Layout>
    );
  }
}

export default RegistrationPage;

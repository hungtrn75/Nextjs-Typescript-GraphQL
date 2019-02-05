import React from "react";
import WrappedForgotForm from "../../components/auth/Forgot";
import { ForgotPasswordComponent } from "../../generated/apolloComponents";

export default () => (
  <ForgotPasswordComponent>
    {mutate => <WrappedForgotForm mutate={mutate} />}
  </ForgotPasswordComponent>
);

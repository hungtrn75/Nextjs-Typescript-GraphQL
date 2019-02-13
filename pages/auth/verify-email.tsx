import { Alert } from "antd";
import React from "react";
import {
  ConfirmUserMutation,
  ConfirmUserVariables
} from "../../generated/apolloComponents";
import { confirmUserMutation } from "../../graphql/user/mutations/confirmUser";
import { MyContext } from "../../interfaces/MyContext";
import { Router } from "../../server/routes";

export default class Confirm extends React.PureComponent<any> {
  static async getInitialProps({ query: { token }, apolloClient }: MyContext) {
    console.log("object");
    if (!token)
      return {
        message: `Invalid email verification code: ${token}.`,
        type: "error"
      };
    const res: any = await apolloClient.mutate<
      ConfirmUserMutation,
      ConfirmUserVariables
    >({
      mutation: confirmUserMutation,
      variables: {
        token: token as string
      }
    });

    if (!res.data.confirmUser)
      return {
        message: `Invalid email verification code: ${token}.`,
        type: "error"
      };
    else return { message: "Verify email sucessfully!", type: "success" };
  }
  render() {
    const { message, type } = this.props;
    return (
      <div style={{ display: "inline-block" }}>
        <Alert
          message={message}
          type={type}
          showIcon
          closable
          onClose={() => Router.pushRoute("login")}
        />
      </div>
    );
  }
}

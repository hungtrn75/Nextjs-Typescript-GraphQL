import { Button, Form, Input } from "antd";
import { NextFunctionComponent } from "next";
import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import { changePasswordMutation } from "../../graphql/user/mutations/changePassword";
import { validateTokenMutation } from "../../graphql/user/mutations/validateToken";
import { MyContext } from "../../interfaces/MyContext";
import redirect from "../../lib/redirect";
import { Router } from "../../server/routes";

const ResetForm = ({ form, token }: any) => {
  const [confirmDirty, setConfirmDirty] = useState(false);
  const { getFieldDecorator, getFieldValue, validateFields } = form;
  const reset = useMutation(changePasswordMutation, {
    variables: {
      data: {
        password: getFieldValue("password"),
        token
      }
    }
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateFields(async (err: any, values: any) => {
      if (!err) {
        console.log("Received values of form: ", values);
        await reset();
        Router.pushRoute("login");
      }
    });
  };
  const handleConfirmBlur = (e: any) => {
    const value = e.target.value;
    setConfirmDirty(confirmDirty || !!value);
  };

  const compareToFirstPassword = (_rule: any, value: any, callback: any) => {
    if (value && value !== getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  const validateToNextPassword = (_rule: any, value: any, callback: any) => {
    if (value && confirmDirty) {
      validateFields(["confirm"], { force: true });
    }
    callback();
  };
  return (
    <div className="auth-form">
      <div>
        <div className="auth-form-header">
          <h1>Change your password</h1>
        </div>
        <Form onSubmit={handleSubmit} className="auth-form-container">
          <Form.Item label="Password">
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Please input your password!"
                },
                {
                  validator: validateToNextPassword
                }
              ]
            })(<Input type="password" />)}
          </Form.Item>
          <Form.Item label="Confirm Password">
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: "Please confirm your password!"
                },
                {
                  validator: compareToFirstPassword
                }
              ]
            })(<Input type="password" onBlur={handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Change password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

const WrappedResetForm = Form.create()(ResetForm);

type Props = {
  token: string;
};

const ResetPage: NextFunctionComponent<Props, Promise<object>, MyContext> = ({
  token
}) => <WrappedResetForm token={token} />;

ResetPage.getInitialProps = async ({
  query,
  apolloClient,
  ...ctx
}: MyContext) => {
  const { token } = query;
  if (token) {
    const res: any = await apolloClient.mutate({
      mutation: validateTokenMutation,
      variables: {
        token
      }
    });
    if (res.data.validateToken) return { token };
    else {
      redirect(ctx, "/auth/forgot");
    }
  } else redirect(ctx, "/auth/forgot");
  return {};
};

export default ResetPage;

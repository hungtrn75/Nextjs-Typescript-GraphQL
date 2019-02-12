import { Button, Checkbox, Form, Icon, Input } from "antd";
import React from "react";
import { useMutation } from "react-apollo-hooks";
import { MeMe, MeQuery } from "../../generated/apolloComponents";
import { loginMutation } from "../../graphql/user/mutations/login";
import { meQuery } from "../../graphql/user/mutations/me";
import { withAuth } from "../../lib/withAuth";
import { Link, Router } from "../../server/routes";

const LoginForm = ({ form }: any) => {
  const { getFieldDecorator, getFieldValue, setFields, validateFields } = form;
  const login = useMutation(loginMutation, {
    variables: {
      data: {
        email: getFieldValue("email"),
        password: getFieldValue("password")
      }
    },
    update: (cache, { data }: any) => {
      if (!data || !data.login) {
        return;
      }

      cache.writeQuery<MeQuery, MeMe>({
        query: meQuery,
        data: {
          __typename: "Query",
          me: data.login
        }
      });
    }
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateFields(async (err: any, values: any) => {
      if (!err) {
        console.log("Received values of form: ", values);
        const res: any = await login();
        if (!res.data.login)
          setFields({
            email: {
              value: values.email,
              errors: [new Error("Incorrect email or password")]
            },
            password: {
              value: values.email,
              errors: [new Error("Incorrect email or password")]
            }
          });
        else {
          Router.push("/");
        }
      }
    });
  };
  return (
    <div className="login-form-container">
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator("email", {
            rules: [{ required: true, message: "Please input your email!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: true
          })(<Checkbox>Remember me</Checkbox>)}
          <Link route="forgot">
            <a className="login-form-forgot">Forgot password</a>
          </Link>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or{" "}
          <Link route="register">
            <a>register now!</a>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

const LoginPage = Form.create()(LoginForm);

export default withAuth(LoginPage);

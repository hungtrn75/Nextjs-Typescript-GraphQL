import { Button, Checkbox, Form, Icon, Input } from "antd";
import useForm from "rc-form-hooks";
import React from "react";
import { Link } from "../../server/routes";

export default () => {
  const handleValuesChange = (value: any) =>
    console.log("Value changes", value);
  const { getFieldDecorator, validateFields } = useForm<{
    username: string;
    email: string;
    password: string;
    remember: string;
  }>({
    onValuesChange: handleValuesChange
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateFields().then(console.log);
  };
  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator("username")(<input className="ant-input" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("email")(
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
      </form>
    </div>
  );
};

import { Button, Checkbox, Form, Icon, Input } from "antd";
import * as React from "react";
import { Link } from "../../server/routes";
import "./login.less";

type Props = {
  form?: any;
  submit: (values: any) => Promise<void>;
};

class LoginForm extends React.PureComponent<Props> {
  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields(async (err: any, values: any) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
      this.props.submit(values);
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-form-container">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator("email", {
              rules: [{ required: true, message: "Please input your email!" }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Email"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
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
  }
}

const WrappedLoginForm: any = Form.create()(LoginForm as any);

export default WrappedLoginForm;

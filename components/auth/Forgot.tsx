import { Button, Form, Icon, Input } from "antd";
import * as React from "react";
import { Link } from "../../server/routes";

type Props = {
  form?: any;
  submit: (values: any) => Promise<void>;
  mutate: any;
};

class ForgotForm extends React.PureComponent<Props, any> {
  state = {
    isSubmit: false
  };
  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields(async (err: any, values: any) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }

      const res: any = await this.props.mutate({
        variables: {
          email: values.email
        }
      });
      if (!res.data.forgotPassword)
        this.props.form.setFields({
          email: {
            value: values.email,
            errors: [new Error("Can't find that email, sorry.")]
          }
        });
      else {
        this.setState({ isSubmit: true });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { isSubmit } = this.state;
    return (
      <div className="auth-form">
        <div>
          <div className="auth-form-header">
            <h1>Reset your password</h1>
          </div>
          <Form onSubmit={this.handleSubmit} className="auth-form-container">
            <Form.Item>
              {!isSubmit ? (
                <label>
                  Enter your email address and we will send you a link to reset
                  your password.
                </label>
              ) : (
                <label>
                  Check your email for a link to reset your password. If it
                  doesn't appear within a few minutes, check your spam folder.
                </label>
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("email", {
                rules: [{ required: true, message: "Please input your email!" }]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Email"
                  disabled={isSubmit}
                />
              )}
            </Form.Item>
            <Form.Item>
              {isSubmit ? (
                <Button
                  type="primary"
                  htmlType="submit"
                  className="auth-form-button"
                >
                  <Link route="login">
                    <a>Return to signin</a>
                  </Link>
                </Button>
              ) : (
                <Button
                  type="primary"
                  htmlType="submit"
                  className="auth-form-button"
                >
                  Send password reset email
                </Button>
              )}
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const WrappedForgotForm: any = Form.create()(ForgotForm as any);

export default WrappedForgotForm;

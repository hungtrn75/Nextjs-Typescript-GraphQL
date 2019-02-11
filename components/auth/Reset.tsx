import { Button, Form, Input } from "antd";
import * as React from "react";
import { Router } from "../../server/routes";

type Props = {
  form?: any;
  submit: (values: any) => Promise<void>;
  mutate: any;
  token: string;
};

class ResetForm extends React.PureComponent<Props, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      confirmDirty: false
    };
  }
  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields(async (err: any, values: any) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }

      await this.props.mutate({
        variables: {
          data: { password: values.password, token: this.props.token }
        }
      });

      Router.pushRoute("login");
    });
  };

  handleConfirmBlur = (e: any) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (_rule: any, value: any, callback: any) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (_rule: any, value: any, callback: any) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="auth-form">
        <div>
          <div className="auth-form-header">
            <h1>Change your password</h1>
          </div>
          <Form onSubmit={this.handleSubmit} className="auth-form-container">
            <Form.Item label="Password">
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "Please input your password!"
                  },
                  {
                    validator: this.validateToNextPassword
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
                    validator: this.compareToFirstPassword
                  }
                ]
              })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
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
  }
}

const WrappedResetForm: any = Form.create()(ResetForm as any);

export default WrappedResetForm;

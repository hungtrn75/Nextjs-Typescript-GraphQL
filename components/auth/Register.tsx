import { Button, Form, Input } from "antd";
import * as React from "react";
import { Router } from "../../server/routes";

type IProps = {
  form?: any;
  onSubmit: (values: any) => Promise<void>;
  mutate: any;
};

type IState = {
  errors: any;
  confirmDirty: boolean;
  autoCompleteResult: any;
};

class RegistrationForm extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      errors: {}
    };
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err: any, values: any) => {
      if (!err) {
        console.log("Received values of form: ", values);
        try {
          await this.props.mutate({
            variables: {
              data: {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password
              }
            }
          });
          Router.pushRoute("login");
        } catch (err) {
          err.graphQLErrors[0].validationErrors.forEach(
            (validationErr: any) => {
              //@ts-ignore
              Object.values(validationErr.constraints).forEach(
                (message: any) => {
                  this.props.form.setFields({
                    [validationErr.property]: {
                      value: values[validationErr.property],
                      errors: [new Error(message)]
                    }
                  });
                }
              );
            }
          );
        }
      }
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
    // const { errors } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    return (
      <div className="registration-form-container">
        <Form onSubmit={this.handleSubmit} className="registration-form">
          <Form.Item {...formItemLayout} label="E-mail">
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: "The input is not valid E-mail!"
                },
                {
                  required: true,
                  message: "Please input your E-mail!"
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="First Name">
            {getFieldDecorator("firstName", {
              rules: [
                {
                  required: true,
                  message: "Please input your first name"
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Last Name">
            {getFieldDecorator("lastName", {
              rules: [
                {
                  required: true,
                  message: "Please input your last name"
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Password">
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
          <Form.Item {...formItemLayout} label="Confirm Password">
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
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedRegistrationForm: any = Form.create()(RegistrationForm as any);

export default WrappedRegistrationForm;

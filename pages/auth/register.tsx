import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import { registerMutation } from "../../graphql/user/mutations/regiser";
import { withAuth } from "../../lib/withAuth";
import { Router } from "../../server/routes";

const RegisterForm = ({ form }: any) => {
  const [confirmDirty, setConfirmDirty] = useState(false);
  const { getFieldDecorator, getFieldValue, setFields, validateFields } = form;
  const register = useMutation(registerMutation, {
    variables: {
      data: {
        email: getFieldValue("email"),
        password: getFieldValue("password"),
        firstName: getFieldValue("firstName"),
        lastName: getFieldValue("lastName")
      }
    }
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateFields(async (err: any, values: any) => {
      if (!err) {
        console.log("Received values of form: ", values);

        try {
          await register();
          Router.pushRoute("login");
        } catch (err) {
          err.graphQLErrors[0].validationErrors.forEach(
            (validationErr: any) => {
              //@ts-ignore
              Object.values(validationErr.constraints).forEach(
                (message: any) => {
                  setFields({
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
      <Form onSubmit={handleSubmit} className="registration-form">
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
                validator: validateToNextPassword
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
                validator: compareToFirstPassword
              }
            ]
          })(<Input type="password" onBlur={handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const RegisterPage = Form.create()(RegisterForm);

export default withAuth(RegisterPage);

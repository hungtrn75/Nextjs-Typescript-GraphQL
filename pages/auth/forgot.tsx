import { Button, Form, Icon, Input } from "antd";
import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import { forgotPasswordMutation } from "../../graphql/user/mutations/forgotPassword";
import { withAuth } from "../../lib/withAuth";
import { Link } from "../../server/routes";

const ForgotForm = ({ form }: any) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const { getFieldDecorator, getFieldValue, setFields, validateFields } = form;
  const forgot = useMutation(forgotPasswordMutation, {
    variables: {
      email: getFieldValue("email")
    }
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateFields(async (err: any, values: any) => {
      if (!err) {
        console.log("Received values of form: ", values);
        const res: any = await forgot();
        if (!res.data.forgotPassword)
          setFields({
            email: {
              value: values.email,
              errors: [new Error("Can't find that email, sorry.")]
            }
          });
        else {
          setIsSubmit(true);
        }
      }
    });
  };
  return (
    <div className="auth-form">
      <div>
        <div className="auth-form-header">
          <h1>Reset your password</h1>
        </div>
        <Form onSubmit={handleSubmit} className="auth-form-container">
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
};

const ForgotPage = Form.create()(ForgotForm);

export default withAuth(ForgotPage);

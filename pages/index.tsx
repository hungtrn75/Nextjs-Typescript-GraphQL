import { Button, Tag } from "antd";
import { gql } from "apollo-boost";
import Link from "next/link";
import * as React from "react";
import { Mutation } from "react-apollo";

const IndexPage: React.FunctionComponent = () => {
  return (
    <>
      <h1>Hello Next.js 👋</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
      <p>
        <Link href="/list-class">
          <a>List Class</a>
        </Link>
      </p>
      <Link href="/list-fc">
        <a>List Fc</a>
      </Link>
      <div>
        <Mutation
          mutation={gql`
            mutation {
              login(email: "hungtrn75@gmail.com", password: "123456789") {
                id
                name
                email
                firstName
                lastName
              }
            }
          `}
        >
          {mutate => (
            <Button
              onClick={async () => {
                const res = await mutate();
                console.log(res);
              }}
            >
              Call login mutation
            </Button>
          )}
        </Mutation>
      </div>
      <div>
        <Tag color="magenta">magenta</Tag>
        <Tag color="red">red</Tag>
        <Tag color="volcano">volcano</Tag>
        <Tag color="orange">orange</Tag>
        <Tag color="gold">gold</Tag>
        <Tag color="lime">lime</Tag>
        <Tag color="green">green</Tag>
        <Tag color="cyan">cyan</Tag>
        <Tag color="blue">blue</Tag>
        <Tag color="geekblue">geekblue</Tag>
        <Tag color="purple">purple</Tag>
      </div>
    </>
  );
};

export default IndexPage;

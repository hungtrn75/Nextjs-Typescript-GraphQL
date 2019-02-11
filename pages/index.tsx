import { Tag } from "antd";
import * as React from "react";
import { withAuth } from "../lib/withAuth";

const IndexPage: React.FunctionComponent = ({ loginUser }: any) => {
  return (
    <>
      <h1>Hello Next.js 👋</h1>
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

export default withAuth(IndexPage, true);

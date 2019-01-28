import * as React from "react";
import Link from "next/link";
import { Tag } from "antd";

const IndexPage: React.FunctionComponent = () => {
  return (
    <>
      <h1>Hello Next.js 👋</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
        <Link href="/list-class">
          <a>List Class</a>
        </Link>
        <Link href="/list-fc">
          <a>List Fc</a>
        </Link>
      </p>
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

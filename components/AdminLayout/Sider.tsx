import { Layout } from "antd";
import React from "react";
import NavBlock from "../Nav";

export default ({ collapsed }: any) => (
  <Layout.Sider
    trigger={null}
    collapsible
    collapsed={collapsed}
    breakpoint="lg"
    width={256}
    style={{ minHeight: "100vh" }}
  >
    <div className="logo" />
    <NavBlock />
  </Layout.Sider>
);

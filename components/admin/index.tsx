import {
  Avatar,
  Badge,
  Button,
  Col,
  Drawer,
  Dropdown,
  Icon,
  Layout,
  Menu,
  Popover,
  Row
} from "antd";
//@ts-ignore
import { enquireScreen, unenquireScreen } from "enquire-js";
import React, { useEffect, useState } from "react";
import goto from "../../lib/goto";
import NavBlock from "../Nav";
import "./Layout.less";

export default React.memo(({ loginUser, children }: any) => {
  let enquireHandler: any;
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    enquireHandler = enquireScreen((mobile: any) => {
      if (mobile !== undefined && isMobile !== mobile) {
        setIsMobile(mobile);
      }
    });
    return () => {
      unenquireScreen(enquireHandler);
    };
  }, [isMobile, collapsed, loginUser]);

  const onCollapseChange = () => setCollapsed(!collapsed);

  return (
    <Layout>
      {isMobile ? (
        <Drawer
          maskClosable
          closable={false}
          onClose={() => setCollapsed(false)}
          visible={collapsed}
          placement="left"
          width={200}
        >
          <Sider
            collapsed={false}
            style={{ minHeight: "100vh" }}
            className="slider"
          >
            <NavBlock />
          </Sider>
        </Drawer>
      ) : (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          breakpoint="lg"
          width={256}
          style={{ minHeight: "100vh" }}
          className="slider"
        >
          <div className="logo" />
          <NavBlock />
        </Sider>
      )}
      <Layout>
        <Header style={{ background: "#fff", padding: 0, height: 72 }}>
          <Row type="flex" justify="space-between">
            <Col span={1}>
              {" "}
              <Icon
                className="trigger"
                type={collapsed ? "menu-unfold" : "menu-fold"}
                onClick={onCollapseChange}
                style={{ marginLeft: "15px" }}
              />
            </Col>
            <Col span={20} className="rightHeader">
              <Popover
                placement="bottomRight"
                trigger="click"
                key="notifications"
              >
                <Badge count={5} dot className="iconButton">
                  <Icon type="bell" className="iconFont" />
                </Badge>
              </Popover>
              <div
                style={{
                  right: "20px"
                }}
              >
                {loginUser ? (
                  <Dropdown overlay={menu} trigger={["click"]}>
                    <Avatar
                      style={{
                        backgroundColor: "#87d068",
                        cursor: "pointer"
                      }}
                      //   src={loginUser.picture}
                      size="large"
                    />
                  </Dropdown>
                ) : (
                  <div>
                    <Button
                      style={{ marginRight: "10px" }}
                      onClick={goto("register")}
                    >
                      Sign Up
                    </Button>
                    <Button type="primary" onClick={goto("login")}>
                      Log in
                    </Button>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
            padding: 24,
            background: "#fff",
            minHeight: 360
          }}
        >
          {children}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
});

const { Header, Content, Footer, Sider } = Layout;
const menu = (
  <Menu>
    <Menu.Item key="0">
      <div onClick={goto("/profile")}>Profile</div>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3" onClick={goto("/auth/logout")}>
      Log out
    </Menu.Item>
  </Menu>
);

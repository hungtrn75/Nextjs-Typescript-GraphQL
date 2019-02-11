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
import React, { PureComponent } from "react";
import goto from "../../lib/goto";
import NavBlock from "../Nav";
import "./Layout.less";

class MyLayout extends PureComponent<any> {
  enquireHandler: any;
  state = {
    collapsed: false,
    isMobile: false
  };

  componentDidMount() {
    this.enquireHandler = enquireScreen((mobile: any) => {
      const { isMobile } = this.state;
      if (isMobile !== mobile) {
        this.setState({
          isMobile: mobile
        });
      }
    });
  }

  componentWillUnmount() {
    unenquireScreen(this.enquireHandler);
  }

  onCollapseChange = () =>
    this.setState((pre: any) => ({ collapsed: !pre.collapsed }));
  render() {
    const { isMobile, collapsed } = this.state;
    return (
      <Layout>
        {isMobile ? (
          <Drawer
            maskClosable
            closable={false}
            onClose={this.onCollapseChange}
            visible={!collapsed}
            placement="left"
            width={200}
            style={{
              padding: 0,
              height: "100vh"
            }}
          >
            <Sider
              trigger={null}
              collapsible
              collapsed={collapsed}
              breakpoint="lg"
              collapsedWidth="0"
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
            // collapsedWidth="0"
            width={256}
            style={{ minHeight: "100vh" }}
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
                  type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                  onClick={() =>
                    this.setState((pre: any) => ({
                      collapsed: !pre.collapsed
                    }))
                  }
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
                  {this.props.loginUser ? (
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
            {this.props.children}
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

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

// const MyLayout = ({ children, loginUser }: any) => {
//   const [collapsed, setCollapsed] = useState(false);
//   return (

//   );
// };

export default MyLayout;

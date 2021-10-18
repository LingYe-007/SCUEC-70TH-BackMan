import React from "react";
import {
  Layout,
  Menu,
  Input,
  Modal,
  Form,
  Checkbox,
  Button,
  Table,
  Progress
} from "antd";
import { useState, useEffect } from "react";
import { UserOutlined, LockOutlined, LaptopOutlined } from "@ant-design/icons";
import * as api from "../service/api";
import styles from "./index.module.css";
import "antd/dist/antd.css";

const Index = () => {
  const { Header, Content, Sider, Footer } = Layout;
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState(null);
  const [stars,setStars] = useState(null)
  const [user,setUser] =useState(null)
  const [login, setLogin] = useState(false);
  const [current, setCurrent] = useState(false);
  useEffect(() => {
    const getData = async () => {
      let result = await api.posts();
      console.log("result", result);
      let stars = await api.total()
      console.log('stars',stars)
      setStars(stars.Data.Star)
      setUser(stars.Data.User)
      setPosts(result.data);
    };
    getData();
  },[stars,posts]);
  const onFinish = async (values) => {
    console.log("values", values);
    let result = await api.login(values);
    console.log("result", result);
    if (result === 400) {
    } else {
    }
  };

  return (
    <Layout>
      <Header>
        <Menu
          className={styles.menu}
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[213]}
        >
          <Menu.Item key="1" className={styles.menuItem}>
            70TH校庆控制台
          </Menu.Item>
          <div className={styles.item}>
            <img
              alt="一个头像"
              className={styles.image}
              src="https://ks3-cn-beijing.ksyuncs.com/lingye-space/asset/myAvatar.png"
            />
            <span
              onClick={() => {
                setShow(true);
              }}
              className={styles.span}
            >
              {login ? "灵野" : "登录"}
            </span>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider width={194} className="site-layout-background">
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item
              key="sub1"
              onClick={() => {
                setCurrent(true);
              }}
              icon={<UserOutlined />}
              title="留言审核"
            >
              留言审核
            </Menu.Item>
            <Menu.Item
              key="sub2"
              onClick={() => {
                setCurrent(false);
              }}
              icon={<LaptopOutlined />}
              title="点星总量"
            >
              点星总量
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content>
            <Modal
              title="管理员登陆"
              visible={show}
              footer={null}
              // onOK={doLogin}
              onCancel={() => {
                setShow(false);
              }}
            >
              <Form
                name="basic"
                layout="horizontal"
                labelCol={{
                  span: 0,
                }}
                wrapperCol={{
                  span: 20,
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                  />
                </Form.Item>
                <Form.Item
                  label="PassWord"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password" },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>
                <Checkbox>Remember me</Checkbox>
                <Form.Item wrapperCol={{ offset: 20, span: 20 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className={styles.button}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
            {current ? (
              <div>
                <Progress
                  type="circle"
                  percent={stars}
                  format={(stars) => `${stars} stars`}
                />
                <Progress type="circle" percent={user} format={(user) => `${user}Done`} />
                <Table dataSource={posts}></Table>
              </div>
            ) : (
              "算了,放一个页面好了"
            )}
          </Content>
          <Footer className={styles.footer}>
            70TH SCUEC@2021 Created by LingYe
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Index;

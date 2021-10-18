import React from "react";
import { Layout, Menu, Input, Modal, Form, Checkbox, Button } from "antd";
import { useState } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import * as api from "../service/api";
import styles from "./index.module.css";
import "antd/dist/antd.css";

const Index = () => {
  const { Header, Content, Footer } = Layout;
  const [login, setLogin] = useState(false);
  const onFinish = async (values) => {
    console.log("values", values);
    let result = await api.login(values);
    console.log("result", result);
    if (result == 400) {
    } else {
    }
  };
  // const [sel] = useState(false)
  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1" className={styles.menuItem}>
            <img
              alt="一个头像"
              className={styles.image}
              src="https://ks3-cn-beijing.ksyuncs.com/lingye-space/asset/myAvatar.png"
            />
            <span
              onClick={() => {
                setLogin(true);
              }}
            >
              登陆
            </span>
          </Menu.Item>
          <Menu.Item key="2">留言审核</Menu.Item>
        </Menu>
      </Header>
      <Content>
        <Modal
          title="管理员登陆"
          cancelText=""
          okText=""
          visible={login}
          footer={null}
          // onOK={doLogin}
          onCancle={() => {
            setLogin(false);
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
      </Content>
      <Footer className={styles.footer}>
        70TH SCUEC@2021 Created by LingYe
      </Footer>
    </Layout>
  );
};

export default Index;

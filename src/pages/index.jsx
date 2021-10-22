import React from "react";
import {
  Layout,
  Tag,
  Menu,
  Input,
  Modal,
  Form,
  Checkbox,
  Button,
  Table,
  Row,
  Select,
  Progress,
  message,
  Col,
  Statistic,
} from "antd";
import { useState, useEffect } from "react";
import { UserOutlined, LockOutlined, LaptopOutlined } from "@ant-design/icons";
import * as api from "../service/api";
import styles from "./index.module.css";
import "antd/dist/antd.css";

const { Option } = Select;

const Index = () => {
  const { Header, Content, Sider, Footer } = Layout;
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState(null);
  const [stars, setStars] = useState(null);
  const [user, setUser] = useState(null);
  const [college, setCollege] = useState(null);
  const [login] = useState(false);
  const [current, setCurrent] = useState(true);

  useEffect(() => {
    const getData = async () => {
      let stars = await api.total();
      console.log("stars", stars);
      let college = await api.college();
      console.log("college", college);
      setCollege(college.Data);
      setStars(stars.Data.Star);
      setUser(stars.Data.User);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      let list = await api.posts();
      if (list.Data) {
        for (let i = 0; i < list.Data.length; i++) {
          list.Data[i]["status"] = 0;
        }
      }
      console.log(list.Data);
      setPosts(list.Data);
    };
    getData();
  }, []);

  const success = () => {
    message.success("审核通过");
  };

  const info = () => {
    message.info("留言已经删除,无法找回");
  };

  const loginSuccess = () => {
    message.success("登陆成功");
  };

  const loginFail = () => {
    message.warn("登陆失败");
  };

  const sort = (e) => {
    // console.log(e);
    let newCol = null;
    if (e === "desc") {
      newCol = college.sort((a, b) => {
        return a.star - b.star;
      });
    } else {
      newCol = college.sort((a, b) => {
        return b.star - a.star;
      });
    }
    console.log(newCol);
    setCollege([...newCol]);
  };

  const onFinish = async (values) => {
    console.log("values", values);
    let result = await api.login(values);
    // console.log("result", result);
    if (result.code !== 200) {
      loginFail();
    } else {
      loginSuccess();
    }
  };

  const columns = [
    {
      title: "姓名",
      dataIndex: "replyname",
      key: "replyname",
    },
    {
      title: "学院",
      dataIndex: "college",
      key: "college",
    },
    {
      title: "留言信息",
      dataIndex: "replymsg",
      key: "replymsg",
    },
    {
      title: "留言时间",
      dataIndex: "replytime",
      key: "replytime",
      sorter: {
        compare: (a, b) => {
          return a.replymsg - b.replymsg;
        },
        // multiple: 3,
      },
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (e) => {
        const render = function () {
          if (e === 1) {
            return <Tag color="green">已通过</Tag>;
          } else if (e === -1) {
            return <Tag color="red">已删除</Tag>;
          } else {
            return <Tag color="orange">待审核</Tag>;
          }
        };
        return render();
      },
    },
    {
      title: "审核通过",
      dataIndex: "msg_id",
      key: "msg_id",
      render: (e) => {
        return (
          <Button
            type="primary"
            ghost
            onClick={() => {
              let change = posts.filter((item) => {
                return item.msg_id === e;
              });
              posts[posts.indexOf(change[0])]["status"] = 1;
              setPosts([...posts]);
              api.pass(e);
              success();
            }}
          >
            通过
          </Button>
        );
      },
    },
    {
      title: "删除留言",
      dataIndex: "msg_id",
      key: "msg_id",
      render: (e) => {
        return (
          <Button
            danger
            ghost
            onClick={() => {
              let change = posts.filter((item) => {
                return item.msg_id === e;
              });
              posts[posts.indexOf(change[0])]["status"] = -1;
              setPosts([...posts]);
              api.noPass(e);
              info();
            }}
          >
            失败
          </Button>
        );
      },
    },
  ];

  const pagination = {
    // current: 1,
    pageSize: 7,
    total: posts?.length,
  };
  const columnsTwo = [
    {
      title: "学院",
      dataIndex: "collegename",
      key: "collegename",
    },
    {
      title: "点星数",
      dataIndex: "star",
      key: "star",
    },
    {
      title: (
         <Select defaultValue="asce" onChange={sort}>
          <Option value="desc">降序</Option>
          <Option value="asce">升序</Option>
        </Select>
      ),
      dataIndex: "star",
      key: "star",
      render: (e) => {
        console.log(e);
        return <Progress percent={100 * (e / stars)} size="small" />;
      },
    },
  ];

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
        <Sider
          width={194}
          defaultSelectedKeys={["sub1"]}
          className="site-layout-background"
        >
          <Menu
            theme="dark"
            defaultSelectedKeys={["sub1"]}
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
              title="学院点星"
            >
              学院点星
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content>
            <Modal
              title="管理员登陆"
              visible={show}
              centered
              footer={null}
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
                    classNam
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
            {current ? (
              <div>
                <Row gutter={16} className={styles.row}>
                  <Col span={12}>
                    <Statistic title="活跃用户" value={user} />
                  </Col>
                  <Col span={12}>
                    <Statistic title="点亮星数" value={stars} />
                  </Col>
                </Row>
                ​{" "}
                <Table
                  dataSource={posts}
                  columns={columns}
                  pagination={pagination}
                ></Table>
              </div>
            ) : (
              <Table dataSource={college} columns={columnsTwo}></Table>
            )}
          </Content>
          <Footer className={styles.footer}>
            *为了性能,删除或是pass的数据会暂时不会删除,状态发生改变,刷新页面后数据一起删除。
            <br></br>
            <text> 70TH SCUEC@2021 Created by LingYe</text>
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Index;

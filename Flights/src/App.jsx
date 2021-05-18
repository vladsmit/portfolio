import React from 'react';
import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { PageHeader } from 'antd';

const { Content, Footer, Sider } = Layout;

const App = (props) => {
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            nav 1
        </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
        </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
        </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            nav 4
        </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <PageHeader
          className="site-page-header"
          title="Flight Searcher"
          subTitle="Быстрый поиск авиабилетов"
        />,
        <Content style={{ margin: '24px 16px 0' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            здесь будут варианты авиабилетов...
        </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Flight Searcher &copy; 2021</Footer>
      </Layout>
    </Layout>
  )
}

export default App;

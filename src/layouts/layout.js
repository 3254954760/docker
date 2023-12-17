import { Layout, Menu, Icon, Popover } from 'antd';
import React from 'react';
const { Header, Sider, Content } = Layout;
import style from './index.css';
// import router from "umi/router";

class SiderDemo extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  reLogin = () => {
    const { history } = this.props;
    history.push('/user/login');
  };
  toStudent = () => {
    const { history } = this.props;
    history.push('/dormitory/student');
  };
  toFloor = () => {
    const { history } = this.props;
    history.push('/dormitory/floor');
  };
  toFaculty = () => {
    const { history } = this.props;
    history.push('/dormitory/faculty');
  };
  toEcharts = () => {
    const { history } = this.props;
    history.push('/dormitory/echarts');
  };
  render() {
    const { collapsed } = this.state;
    const content = (
      <Menu theme="light" mode="inline">
        {/*<Menu.Item icon={<SettingOutlined />} key="/">*/}
        {/*  <Link to={'/'}>首页</Link>*/}
        {/*</Menu.Item>*/}
        <Menu.Item key="/" onClick={this.reLogin}>
          退出登录
        </Menu.Item>
      </Menu>
    );
    return (
      <Layout className={style.Layout}>
        <Sider trigger={null} collapsed={this.state.collapsed}>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="0" style={{ color: 'white' }}>
              <Icon type="bank" />
              {!collapsed ? '宿舍管理系统' : ''}
            </Menu.Item>
            <Menu.Item key="1" onClick={this.toStudent}>
              <Icon type="user" />
              <span>学生信息</span>
            </Menu.Item>
            <Menu.Item key="2" onClick={this.toFloor}>
              <Icon type="video-camera" />
              <span>楼栋信息</span>
            </Menu.Item>
            <Menu.Item key="3" onClick={this.toFaculty}>
              <Icon type="upload" />
              <span>院系信息</span>
            </Menu.Item>
            <Menu.Item key="4" onClick={this.toEcharts}>
              <Icon type="radar-chart" />
              <span>数据分析</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{
              background: '#fff',
              padding: 0,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Icon
              style={{ marginLeft: '20px', fontSize: '150%' }}
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <Popover content={content}>
              <Icon
                type="user"
                style={{ paddingRight: '40px', fontSize: '150%' }}
              />
            </Popover>
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: '123.7vh',
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default SiderDemo;

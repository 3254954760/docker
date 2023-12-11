import React from 'react';
import {Card, Form, Input, Checkbox, Button} from 'antd'
import { connect } from 'umi'
import './index.css'
import {formItemLayout} from "../../utils/globalUIConfig";
import axios from 'axios';
@connect(({ loginModal,}) => ({
  loginModal,
}))
@Form.create()
class Login extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      passwordVisible: false,
    }
  }
  componentDidMount() {

  }
  onSubmit =(event) => {
    event.preventDefault()
    const { form:{getFieldsValue}} =this.props
    const data =getFieldsValue()
    const {dispatch} =this.props
    dispatch({
      type:'loginModal/login',
      payload:data
    })
  }

  render() {
    const { form:{getFieldDecorator},loginModal:{isLogin},history} = this.props
    if(isLogin===true){
      history.push('/dormitory/student')
    }
    return (
      <div className='login'>
        <Card className='login-container'>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>登录</h1>
            <Form
              onSubmit={this.onSubmit}
            >
              <Form.Item {...formItemLayout} label="Username">
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input placeholder="Username"  autoComplete="off" />
                )}
              </Form.Item>
              <Form.Item {...formItemLayout} label="Password">
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your password!' }],
                })(
                  <Input type="password" placeholder="Password" autoComplete="off" />
                )}
              </Form.Item>
              <Form.Item>
                <Checkbox className='login-checkbox-label'>
                  我已阅读并同意《用户协议》和《隐私条款》
                </Checkbox>
              </Form.Item>
              <Form.Item>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Button style={{width: '90%'}} type="primary" htmlType="submit" size="large">
                    登录
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </Card>
      </div>
    )
  }
}

export default Login;

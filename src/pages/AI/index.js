import React, { Component } from 'react';
import { getAccessToken } from './func';
import { Col, Row } from 'antd';
import Search from 'antd/es/input/Search';
import axios from 'axios';

const request = require('request');

class Index extends Component {
  constructor() {
    super();
    this.state = {
      content: [],
      value: '',
    };
  }

  search = async (value) => {
    this.setState({ value: '' });
    console.log(value);
    const { content } = this.state;
    const data = {
      role: 'user',
      content: value,
    };
    content.push(data);
    this.setState({ content });
    const token = await getAccessToken();
    const response = await axios({
      method: 'post',
      url:
        '/api/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions_pro?access_token=' +
        token,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        messages: content,
      },
    });
    const { result } = response.data;
    content.push({
      role: 'assistant',
      content: result,
    });
    this.setState({ content });
  };

  render() {
    const { content, value } = this.state;
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100vw',
          height: '100vh',
        }}
      >
        <Col
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
          span={12}
        >
          <div style={{ overflow: 'auto' }}>
            {content.map((item, index) => {
              const { content } = item;
              return (
                <div key={index}>
                  {content}
                  <br />
                  <br />
                </div>
              );
            })}
          </div>
          <div>
            <Search
              placeholder="请输入"
              enterButton="发送"
              size="large"
              onSearch={this.search}
            />
          </div>
        </Col>
      </div>
    );
  }
}

export default Index;

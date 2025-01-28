import React, { Component } from 'react';
import { Col } from 'antd';
import Search from 'antd/es/input/Search';

class Index extends Component {
  constructor() {
    super();
    this.state = {
      content: '', // Full content received from the server
      write: '', // Content being "typed" on the screen
      isTyping: false, // Flag to indicate typing is in progress
    };
    this.typingTimer = null; // Typing effect timer
  }

  search = async () => {
    console.log('search');
    const eventSource = new EventSource('http://localhost:7070/serverSseApi');

    eventSource.onmessage = (event) => {
      if (event.data === 'over') {
        eventSource.close();
      } else {
        const filteredData = event.data.replace(/\n/g, ''); // Remove line breaks
        this.setState(
          (prevState) => ({
            content: prevState.content + filteredData, // Append new content
          }),
          () => {
            if (!this.state.isTyping) {
              this.sseWrite(); // Start typing effect
            }
          },
        );
      }
    };

    eventSource.onerror = (error) => {
      console.error('Error with SSE connection:', error);
      setTimeout(() => {
        eventSource.close();
      }, 1000 * 30);
    };
  };

  sseWrite = () => {
    const { content, write } = this.state;

    if (write.length < content.length) {
      const batchSize = Math.min(1, content.length - write.length); // Type up to 2 characters at a time
      this.setState({
        isTyping: true,
        write: content.substring(0, write.length + batchSize),
      });

      // Add randomness to the typing speed for a natural effect
      const typingSpeed = 200; // Speed between 20ms and 50ms
      this.typingTimer = setTimeout(this.sseWrite, typingSpeed);
    } else {
      // Typing complete
      this.setState({ isTyping: false });
      clearTimeout(this.typingTimer);
    }
  };

  componentWillUnmount() {
    // Clear the timer on unmount to prevent memory leaks
    clearTimeout(this.typingTimer);
  }

  render() {
    const { write } = this.state;

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
          <div style={{ overflow: 'auto', whiteSpace: 'pre-wrap' }}>
            {write}
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

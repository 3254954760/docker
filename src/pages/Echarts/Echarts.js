import React, { Component } from 'react';
import { connect } from 'umi';
import PieChart from './piechart';
import BarChart from './BarChart';
import { Col, Row } from 'antd';
@connect(({ echartsModal, loading }) => ({
  echartsModal,
}))
class Echarts extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'echartsModal/fetch',
    });
  }

  render() {
    const {
      echartsModal: { data },
    } = this.props;
    return (
      <Row>
        <Col span={12}>
          <PieChart data={data}></PieChart>
        </Col>
        <Col span={12}>
          <BarChart data={data}></BarChart>
        </Col>
      </Row>
    );
  }
}

export default Echarts;

import React, { Component } from 'react';
import { connect } from 'umi';
import AdvancedSearchForm from '../../conponent/AdvancedSearchForm';
import { Card, Icon } from 'antd';
import StandardTable from '../../conponent/StandardTable';
@connect(({ FacultyModal, loading }) => ({
  FacultyModal,
  dataLoading: loading.effects['FacultyModal/fetch'],
}))
class Faculty extends Component {
  constructor() {
    super();
    this.state = {
      searchMoreParams: {},
    };
  }
  componentDidMount() {
    this.listPage({
      currentPage: 1,
      pageSize: 10,
    });
  }
  listPage = (params) => {
    const {
      dispatch,
      FacultyModal: { pagination },
    } = this.props;
    const { searchMoreParams } = this.state;
    const isParamsUndefined = Object.keys(params || {});
    dispatch({
      type: 'FacultyModal/fetch',
      payload:
        isParamsUndefined.length !== 0
          ? params
          : { ...pagination, ...searchMoreParams },
    });
  };

  advancedSearch = (searchMoreParams) => {
    console.log(searchMoreParams);
    this.setState({ searchMoreParams });
    const { dispatch } = this.props;
    dispatch({
      type: 'FacultyModal/fetch',
      payload: {
        // 搜索之后总是第一页
        ...searchMoreParams,
        currentPage: 1,
        pageSize: 10,
      },
    });
  };

  handleStandardTableChange = (pagination, filters, sorter) => {
    // 到时候 获取 pagination  和 searchMore params
    const { searchMoreParams } = this.state;
    const parmas = {
      ...searchMoreParams,
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    };
    this.listPage(parmas);
  };
  render() {
    const inputOption = [
      { key: '计算机科学与技术学院', value: '计算机科学与技术学院' },
      { key: '法学院', value: '法学院' },
      { key: '理学院', value: '理学院' },
      { key: '生命学院', value: '生命学院' },
      { key: '体育学院', value: '体育学院' },
      { key: '信息学院', value: '信息学院' },
    ];
    const searchList = [
      {
        title: '院系',
        field: 'faculty',
        type: 'select',
        src: inputOption,
      },
    ];
    const columns = [
      {
        title: '学号',
        dataIndex: 'studentId',
        key: 'STUDENTID',
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'NAME',
      },
      {
        title: '性别',
        dataIndex: 'gender',
        key: 'GENDER',
      },
      {
        title: '院系',
        dataIndex: 'departmentName',
        key: 'departmentName',
      },
      {
        title: '宿舍楼号',
        dataIndex: 'buildingName',
        key: 'buildingName',
      },
      {
        title: '电话号码',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
      },
      {
        title: '宿舍',
        dataIndex: 'dormitoryNumber',
        key: 'dormitoryNumber',
        render: (text) => (text === null ? '尚未分配' : text),
      },
    ];
    const {
      FacultyModal: { studentData, pagination },
      dataLoading,
    } = this.props;
    return (
      <div>
        <AdvancedSearchForm
          searchList={searchList}
          doSearch={this.advancedSearch}
          pagination={pagination}
        />
        <Card>
          <StandardTable
            columns={columns}
            data={studentData}
            rowSelection={null}
            rowKey={(record) => record.studentId}
            loading={dataLoading}
            onChange={this.handleStandardTableChange}
          />
        </Card>
      </div>
    );
  }
}

export default Faculty;

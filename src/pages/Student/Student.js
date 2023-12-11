import React, {Component} from 'react';
import AdvancedSearchForm from "../../conponent/AdvancedSearchForm";
import StandardTable from "../../conponent/StandardTable";
import {Button, Card, Form, Icon, Input, Modal, Select} from "antd";
import {connect} from "umi";
import {formItemLayout} from '../../utils/globalUIConfig'
import {departmentOption,buildingOption,confirmBuilding} from  '../../utils/enum'
@connect(({studentModal, loading}) => ({
  studentModal,
  dataLoading: loading.effects['studentModel/fetch'],
}))
@Form.create()
class Student extends Component {
  constructor() {
    super();
    this.state = {
      searchMoreParams: {},
      modalVisible:false,
      departmentName:"理学院",
      gender:"男",
    }
  }

  componentDidMount() {
    this.listPage({
      currentPage: 1,
      pageSize: 10,
    });
  }

  listPage = params => {
    const {
      dispatch,
      studentModal: {pagination},
    } = this.props;
    const {searchMoreParams} = this.state;
    const isParamsUndefined = Object.keys(params || {});
    dispatch({
      type: 'studentModal/fetch',
      payload: isParamsUndefined.length !== 0 ? params : {...pagination, ...searchMoreParams},
    });
  };
  advancedSearch = (searchMoreParams) => {
    console.log(searchMoreParams)
    this.setState({searchMoreParams})
    const {dispatch} = this.props;
    dispatch({
      type: 'studentModal/fetch',
      payload: {// 搜索之后总是第一页
        ...searchMoreParams,
        currentPage: 1,
        pageSize: 10,
      },
    });
  }

  handleStandardTableChange = (pagination, filters, sorter) => {
    // 到时候 获取 pagination  和 searchMore params
    const {searchMoreParams} = this.state
    const parmas = {
      ...searchMoreParams,
      currentPage: pagination.current,
      pageSize: pagination.pageSize
    }
    this.listPage(parmas)
  }
  multiAction = (text, record) => {
    return <div><tooltip title='分配宿舍'><Icon type="setting" onClick={() => this.distributeDormitory(record)}></Icon></tooltip></div>
  }
  distributeDormitory = (record) => {
    const {studentId} = record
    const {dispatch} = this.props
    dispatch({
      type:'studentModal/distributeDormitory',
      payload:{studentId}
    })
  }

  changeModal = ()=>{
    const {modalVisible} = this.state
    this.setState({modalVisible:!modalVisible})
  }

  handleCancel = ()=>{
    const {modalVisible} = this.state
    this.setState({modalVisible:!modalVisible})
  }
  handleSubmit = (e)=>{
    e.preventDefault()
    const {
      form:{getFieldsValue},
      dispatch
    } = this.props
    const data = getFieldsValue()
    dispatch({
      type:'studentModal/add',
      payload:{
        data
      }
    })
  }
  handleSelectGender = (value,Option)=>{
    const { children} =Option.props
    this.setState({gender:children})
  }
  handleSelectDepartment = (value,Option)=>{
    const { children} =Option.props
    this.setState({departmentName:children})
  }
  render() {
    const searchList = [
      {
        title: '学号',
        field: 'studentId',
        type: 'input',
      }
    ]
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
        render: (text, record) => text === null ? this.multiAction(text, record) : text
      },
    ]
    const {
      studentModal: {studentData, pagination},
      dataLoading,
      form:{getFieldDecorator}
    } = this.props
    const {modalVisible,departmentName,gender} = this.state
    console.log(gender,departmentName)
    return (
      <div>
        <AdvancedSearchForm
          searchList={searchList}
          doSearch={this.advancedSearch}
          pagination={pagination}
        />
        <Button type='primary' onClick={this.changeModal}>
          新增
        </Button>
        <Card>
          <StandardTable
            columns={columns}
            data={studentData}
            rowSelection={null}
            rowKey={record => record.studentId}
            loading={dataLoading}
            onChange={this.handleStandardTableChange}
          />
        </Card>
        <Modal
          title="新建"
          visible={modalVisible}
          footer={null}
          onCancel={this.handleCancel}
          destroyOnClose={true}
        >
        <Form
          onSubmit={this.handleSubmit}
        >
          <Form.Item label="学号" {...formItemLayout}>
            {
              getFieldDecorator('studentId' ,{
                rules: [
                  {
                    pattern: /^[0-9]{10}$/,
                    message: '学号必须是10位数字',
                    required:true
                  },
                ],
              })(
                <Input/>
              )
            }
          </Form.Item>
          <Form.Item label="姓名" {...formItemLayout}>
            {
              getFieldDecorator('name',{
                rules:[
                  {
                    required:true
                  }
              ]
              })(
                <Input/>
              )
            }
          </Form.Item>

          <Form.Item label="性别" {...formItemLayout}>
            {
              getFieldDecorator('gender')(
                <Select onSelect={this.handleSelectGender} >
                 <Select.Option value="男">男</Select.Option>
                  <Select.Option value="女">女</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="院系" {...formItemLayout}>
            {getFieldDecorator('departmentId')(
              <Select onSelect={this.handleSelectDepartment}>
                {departmentOption.map(item => {
                  const { departmentId, departmentName } = item;
                  return <Select.Option value={departmentId}>{departmentName}</Select.Option>;
                })}
              </Select>
            )}
          </Form.Item>

          <Form.Item label="楼栋" {...formItemLayout}>
            {
              getFieldDecorator('buildingNumber',{initialValue:confirmBuilding[gender][departmentName]||1})(
              <Select  disabled={true}>
                {
                  buildingOption.map(item => {
                  const { buildingNumber, buildingName } = item;
                  return <Select.Option value={buildingNumber}>{buildingName}</Select.Option>;
                })}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="电话号码" {...formItemLayout}>
            {
              getFieldDecorator('phoneNumber' ,{
                rules: [
                  {
                    pattern: /^[0-9]{11}$/,
                    message: '电话号码必须是11位数字',
                    required:true
                  },
                ],
              })(
                <Input/>
              )
            }
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
        </Modal>
      </div>
    );
  }
}

export default Student;

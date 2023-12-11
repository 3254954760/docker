import React, {Component} from 'react';
import AdvancedSearchForm  from "../../conponent/AdvancedSearchForm";
import StandardTable  from "../../conponent/StandardTable";
import {Card} from "antd";
import {connect} from "umi";
@connect(({floorModal,loading})=>({
  floorModal,
  dataLoading:loading.effects['floorModal/fetch'],
}))
class Floor extends Component {
  constructor() {
    super();
    this.state={
      searchMoreParams:{},
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
      floorModal: { pagination },
    } = this.props;
    const { searchMoreParams } = this.state;
    const isParamsUndefined = Object.keys(params || {});
    dispatch({
      type: 'floorModal/fetch',
      payload: isParamsUndefined.length !== 0 ? params : { ...pagination, ...searchMoreParams },
    });
  };

  advancedSearch = (searchMoreParams) =>{
    console.log(searchMoreParams)
    this.setState({searchMoreParams})
    const { dispatch } = this.props;
    dispatch({
      type: 'floorModal/fetch',
      payload: {// 搜索之后总是第一页
        ...searchMoreParams,
        currentPage: 1,
        pageSize: 10,
      },
    });
  }

  handleStandardTableChange =(pagination, filters, sorter)=>{
    // 到时候 获取 pagination  和 searchMore params
    const {searchMoreParams} = this.state
    const parmas = {
      ...searchMoreParams,
      currentPage:pagination.current,
      pageSize:pagination.pageSize
    }
    this.listPage(parmas)
  }

  render() {
    const inputOption =[
      {key:"东一",value:"东一"},
      {key:"东二",value:"东二"},
      {key:"东三",value:"东三"},
      {key:"东四",value:"东四"},
      {key:"东五",value:"东五"},
      {key:"东六",value:"东六"},
      {key:"东七",value:"东七"},
      {key:"东八",value:"东八"},
      {key:"东九",value:"东九"},
      {key:"东十",value:"东十"},
      {key:"东十一",value:"东十一"},
      {key:"东十二",value:"东十二"},
    ]
    const searchList=[
      {
        title: '楼栋',
        field:'floor',
        type: 'select',
        src:inputOption,
      }
    ]
    const columns=[
      {
        title:'学号',
        dataIndex:'studentId',
        key:'STUDENTID',
      },
      {
        title:'姓名',
        dataIndex:'name',
        key:'NAME',
      },
      {
        title:'性别',
        dataIndex:'gender',
        key:'GENDER',
      },
      {
        title:'院系',
        dataIndex:'departmentName',
        key:'departmentName',
      },
      {
        title:'宿舍楼号',
        dataIndex:'buildingName',
        key:'buildingName',
      },
      {
        title:'电话号码',
        dataIndex:'phoneNumber',
        key:'phoneNumber',
      },
      {
        title:'宿舍',
        dataIndex:'dormitoryNumber',
        key:'dormitoryNumber',
        render:(text)=> text===null? "尚未分配":text
      },
    ]
    const {
      floorModal:{studentData,pagination} ,
      dataLoading
    } =this.props
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
            rowKey={record => record.studentId}
            loading={dataLoading}
            onChange={this.handleStandardTableChange}
          />
        </Card>
      </div>
    );
  }
}

export default Floor;

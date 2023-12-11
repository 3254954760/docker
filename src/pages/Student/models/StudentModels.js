import axios from "axios";
import {Response_OBJ} from "../../../utils/enum";
import {message} from "antd";

export default {
  namespace: "studentModal",
  state: {
    studentData: {},
    pagination: {
      total: 0,
      currentPage: 1,
      pageSize: 10,
    }
  },
  effects: {
    * fetch({payload}, {call, put}) {
      console.log('xxxx',payload)
      const response =yield  axios.get('/api/dormitory/student',{params:payload})
      const {data:{total,pageSize,currentPage,data}} = response.data
      const list = data
      const pagination = {
        currentPage: currentPage || 1,
        pageSize,
        total,
      }
      const result={
        list,
        pagination
      }
      yield put({
        type:"save",
        payload:{studentData: result, pagination}
      })
    },

    * distributeDormitory({payload},{call,put,select}){
      const response = yield axios.get('/api/dormitory/distribute',{params:payload})
      console.log(response.data)
      const {code,msg} =response.data
      if(code===Response_OBJ.SUCCESS){
        message.success(msg);
      }
      else message.error(msg)
      const pagination=yield select(state => state.studentModal.pagination)
      const { currentPage,pageSize} =pagination
      yield put({
        type:'fetch',
        payload:{
          currentPage,
          pageSize
        }
      })
    },
    * add({ payload }, { call, put, select }) {
      const { data } = payload;
      console.log(data)
      const response = yield axios.post('/api/dormitory/add', {...data});
      console.log(response.data);
    }
  },
  reducers: {
    save(state,{payload}) {
      return {
        ...state,
        ...payload
      }
    }
  }
}


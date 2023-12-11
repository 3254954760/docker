import axios from "axios";

export default {
  namespace: "floorModal",
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
      const response =yield  axios.get('/api/dormitory/floor',{params:payload})
      console.log(response.data)
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

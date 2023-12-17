import axios from 'axios';
export default {
  namespace: 'echartsModal',
  state: {
    data: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield axios.get('/api/dormitory/echarts');
      const data = response.data;
      yield put({
        type: 'save',
        payload: {
          data,
        },
      });
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

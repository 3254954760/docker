import axios from "axios";
import {Response_OBJ} from '../../../utils/enum'
export default {
  namespace: "loginModal",
  state: {
    username:"",
    password:"",
    isLogin:false,
  },
  effects:{
      *login({payload},{call,put}){
        const response= yield axios.get('/api/user/login', {params:payload})
        const {data}=response
        if(data.code === Response_OBJ.SUCCESS){
          yield put({
            type:'save',
            payload:{
              isLogin:true,
            }
          })
        }
      }
  },
  reducers:{
    save(state,{payload}){
      return{
        ...state,
        ...payload
      }
    }
  },
}

import axiosRequest from '../utils/request/request.axios'
import Config from'../../config/api'
export async function queryList(param){
   return axiosRequest(Config.API.DORMITORY_STUDENT,{
      method:'GET',
      body:param
   })
}

import axios from 'axios';

export default function axiosRequest(url, options) {
  return axios(url).then(response => {
        return response
  })
  .catch(error => error)
  // 这里返回错误信息
}

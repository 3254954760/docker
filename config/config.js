import { defineConfig } from 'umi';
// @ts-ignore
import pageRoutes from './routes'

export default defineConfig({
  title: '宿舍管理系统',
  nodeModulesTransform: {
    type: 'none',
  },
  routes:pageRoutes,
  fastRefresh: {},
  dva:{},
  antd:{},
  //配置跨域proxy代理
  proxy:{
    '/api':{
      target:'http://127.0.0.1:8081/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    }
  }
});

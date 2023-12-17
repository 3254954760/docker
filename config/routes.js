import * as path from 'path';

export default [
  { path: '/', component: '@/pages/index', redirect: '/user/login' },
  {
    path: '/user',
    component: '@/pages/User/Login',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { name: '登录', path: '/user/login', component: './User/Login' },
    ],
  },
  {
    path: '/dormitory',
    component: '@/layouts/layout',
    routes: [
      { path: '/dormitory', redirect: '/dormitory/student' },
      {
        name: '学生信息',
        path: '/dormitory/student',
        component: './Student/Student',
      },
      {
        name: '楼栋信息',
        path: '/dormitory/floor',
        component: './Floor/Floor',
      },
      {
        name: '院系信息',
        path: '/dormitory/faculty',
        component: './Faculty/Faculty',
      },
      {
        name: '统计分析',
        path: '/dormitory/echarts',
        component: './Echarts/Echarts',
      },
    ],
  },
  {
    path: '/AI',
    component: '@/pages/AI',
  },
];

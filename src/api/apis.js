//把所有请求封装接口文件(方便项目后期维护，所有请求统一管理)

import axios from 'axios'
// var axios = require('axios')

//服务器ip地址
// export const base_ip = 'http://172.16.4.194:5000';
export const base_ip = 'http://192.168.43.151:5000';
// export const base_ip = 'http://192.168.1.2:5000';
//设置服务器ip
axios.defaults.baseURL = base_ip
//完全等效
//创建一个请求对象
// let req = axios.create({
//     // baseURL: 'http://192.168.6.103:3000', //基本路径
//     baseURL: 'http://localhost:3000', //基本路径
//     timeout: 10000 //ms 请求10秒，如果10秒还没有请求到，则提示超时！！ （8-12秒） 超时限制

// })


//  API：获取商品数据

export const api_goodsList = () => axios.get('/goods/goods_list');


//  API:获取商家

export const api_shopSeller = () => axios.get('/shop/seller');

//  API:获取评价数据

export const api_shopRatings = () => axios.get('/shop/ratings');
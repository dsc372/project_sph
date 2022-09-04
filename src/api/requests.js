import axios from "axios"

//引入进度条,引入的是一个对象，其中的start方法表示进度条开始，done方法表示进度条结束
import nProgress from "nprogress"
//引入进度条样式
import "nprogress/nprogress.css"
//引入vuex中的uuid
import store from "@/store"
//引入getToken
import { getToken } from "@/utils/token"

const requests = axios.create({
  baseURL: "/api",
  timeout: 5000,
})

//配置请求拦截器，config中有一个重要属性：headers请求头
requests.interceptors.request.use((config) => {
  if (store.state.detail.uuid_token) {
    config.headers.userTempId = store.state.detail.uuid_token
  }
  if (getToken()) {
    config.headers.token = getToken()
  }
  nProgress.start()
  return config
})

//配置相应拦截器
requests.interceptors.response.use(
  (res) => {
    nProgress.done()
    return res.data
  },
  (error) => {
    return Promise.reject(new Error("fail"))
  }
)

export default requests

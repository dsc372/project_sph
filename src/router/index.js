import Vue from "vue"
import VueRouter from "vue-router"
import store from "@/store"
import{getToken}from '@/utils/token'

Vue.use(VueRouter)

import routes from "./routes"

//重写push和replace
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.push
VueRouter.prototype.push = function (location, onResolved, onRejected) {
  if (onResolved && onRejected) {
    originPush.call(this, location, onResolved, onRejected)
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
VueRouter.prototype.replace = function (location, onResolved, onRejected) {
  if (onResolved && onRejected) {
    originReplace.call(this, location, onResolved, onRejected)
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

const router=new VueRouter({
  routes,
  //路由跳转之后网页的定位
  scrollBehavior(to, from, savePosition) {
    return { y: 0 }
  },
})
router.beforeEach(async(to,from,next)=>{
  let token=getToken()
  let name=store.state.user.userInfo.name
  if(token){
    if(to.path==='/login'||to.path==='/register'){
      next('/home')
    }else{//解决登陆后要重新挂载header才会有用户信息的bug
      if(name){
        next()
      }else{
        try {
          await store.dispatch('user/getUserInfo')
          next()
        } catch (error) {//token过期，清楚localStorage中的token和vuex中的userInfo
          await store.dispatch('user/userLogout')
          alert('登陆过期请重新登陆')
          router.push('/login')
        }
      }
    }
  }else{
    if(to.path.includes('/trade')||to.path.includes('/pay')||to.path.includes('/center')){
      alert('请先登录')
      next('/login?redirect='+to.path)
    }
    next()
  }
})

export default router

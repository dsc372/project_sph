export default [
  {
    path: "/home",
    component: ()=>import("../pages/Home"),
    meta: { showFooter: true },
  },
  {
    path: "/login",
    component: ()=>import("../pages/Login"),
    meta: { showFooter: false },
  },
  {
    path: "/register",
    component:()=>import("../pages/Register"),
    meta: { showFooter: false },
  },
  {
    name: "search",
    path: "/search/:keyword?",
    component: ()=>import("../pages/Search"),
    meta: { showFooter: true },
  },
  {
    name: "detail",
    path: "/detail/:commodityId?",
    component: ()=>import("../pages/Detail"),
    meta: { showFooter: true },
  },
  {
    name: "addCartSuccess",
    path: "/addCartSuccess",
    component: ()=>import("../pages/AddCartSuccess"),
    meta: { showFooter: true },
  },
  {
    name: "shopcart",
    path: "/shopcart",
    component: ()=>import("../pages/ShopCart"),
    meta: { showFooter: true },
  },
  {
    name: "trade",
    path: "/trade",
    component: ()=>import("../pages/Trade"),
    meta: { showFooter: true },
    beforeEnter: (to, from, next) => {
      //判断条件要包括来的path，自身的path（刷新的bug），后退的path（后退的bug）
      if(from.path==='/shopcart'||from.path==='/trade'||from.path==='/pay'){
        next()
      }else{
        next(false)
      }
    }
  },
  {
    name: "pay",
    path: "/pay",
    component: ()=>import("../pages/Pay"),
    meta: { showFooter: true },
    beforeEnter: (to, from, next) => {
      //判断条件要包括来的path，自身的path（刷新的bug），后退的path（后退的bug）
      if(from.path==='/trade'||from.path==='/pay'||from.path==='/paySuccess'){
        next()
      }else{
        next(false)
      }
    }
  },
  {
    name: "paySuccess",
    path: "/paySuccess",
    component: ()=>import("../pages/PaySuccess"),
    meta: { showFooter: true },
    beforeEnter: (to, from, next) => {
      //判断条件要包括来的path，自身的path（刷新的bug），后退的path（后退的bug）
      if(from.path==='/pay'||from.path==='/paySuccess'){
        next()
      }else{
        next(false)
      }
    }
  },
  {
    name: "center",
    path: "/center",
    component: ()=>import("../pages/Center"),
    children: [
      {
        path: "myOrder",
        component: ()=>import("../pages/Center/myOrder"),
      },
      {
        path: "groupOrder",
        component: ()=>import("../pages/Center/groupOrder"),
      },
      {
        path: "/center",
        redirect: "/center/myOrder",
      },
    ],
    meta: { showFooter: true },
  },
  {
    path: "*",
    redirect: "/home",
    //重定向，项目首次访问是的路径
  },
]

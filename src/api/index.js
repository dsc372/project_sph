//此处对api进行统一管理
import requests from "./requests"
import mockRequests from "./mock"

export const reqCategoryList = () =>
  requests({ url: "/product/getBaseCategoryList", method: "get" })

export const reqGetBannerList = () =>
  mockRequests({ url: "/banner", method: "get" })

export const reqFloorList = () => mockRequests({ url: "/floor", method: "get" })

export const reqGetSearchInfo = (params) =>
  requests({ url: "/list", method: "post", data: params })

export const reqDetailInfo = (params) =>
  requests({ url: `/item/${params}`, method: "get" })

export const reqAddToCart = (skuId, skuNum) =>
  requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" })

export const reqCartList = () =>
  requests({ url: "/cart/cartList", method: "get" })

export const reqDeleteById = (skuId) =>
  requests({ url: `/cart/deleteCart/${skuId}`, method: "delete" })

export const reqUpdateCheckedById = (skuId, isChecked) =>
  requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: "get" })

export const reqCode = (phone) =>
  requests({ url: `/user/passport/sendCode/${phone}`, method: "get" })

export const reqUserRegister = (data) =>
  requests({ url: "/user/passport/register", data: data, method: "post" })

export const reqUserLogin = (data) =>
  requests({ url: "/user/passport/login", data: data, method: "post" })

export const reqUserInfo = () =>
  requests({ url: "/user/passport/auth/getUserInfo", method: "get" })

export const reqUserLogout = () =>
  requests({ url: "/user/passport/logout", method: "get" })

export const reqAddressInfo = () =>
  requests({ url: "/user/userAddress/auth/findUserAddressList", method: "get" })

export const reqOrderInfo = () =>
  requests({ url: "order/auth/trade", method: "get" })

export const reqSubmitOrder = (tradeNo, data) =>
  requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data: data,
    method: "post",
  })

export const reqPayInfo = (orderId) =>
  requests({ url: `/payment/weixin/createNative/${orderId}`, method: "get" })

export const reqPayStatus = (orderId) =>
  requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: "get" })

export const reqMyOrderList=(page,limit)=>
  requests({url:`/order/auth/${page}/${limit}`,method:'get'})
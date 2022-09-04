import { reqDetailInfo,reqAddToCart } from "@/api"
import{getUUID} from '@/utils/uuid_token'//用于获取游客身份的id

const state = {
  detailInfo: {},
  uuid_token:getUUID(),
}
const mutations = {
  GETDETAILINFO(state, value) {
    state.detailInfo = value
  },
}
const actions = {
  async getDetailInfo(context, params) {
    let res = await reqDetailInfo(params)
    if (res.code === 200) {
      context.commit("GETDETAILINFO", res.data)
    }
  },
  async getAddToCart(context,{skuId,skuNum}) {
    let res=await reqAddToCart(skuId,skuNum)
    //需根据其成功或失败的状态进行不同的处理，此处根据不同的return返回不同状态的promise
    if(res.code===200){
        return res.message
    }else{
      return Promise.reject(new Error(res.message))
    }
  },
}
const getters = {
  categoryView(state) {
    return state.detailInfo.categoryView || {} //detail组件中要用categoryView的属性，所以至少要返回一个undefined
  },
  skuInfo(state) {
    return state.detailInfo.skuInfo || {}
  },
  spuSaleAttrList(state) {
    return state.detailInfo.spuSaleAttrList || {}
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}

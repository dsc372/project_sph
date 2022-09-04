import { reqAddressInfo, reqOrderInfo } from "@/api"

const state = {
  addressInfo: [],
  orderInfo: {},
}
const mutations = {
  GETUSERADDRESS(state, val) {
    state.addressInfo = val
  },
  GETORDERINFO(state, val) {
    state.orderInfo = val
  },
}
const actions = {
  async getUserAddress(context) {
    let res = await reqAddressInfo()
    if (res.code === 200) {
      context.commit("GETUSERADDRESS", res.data)
      return res.message
    } else {
      return Promise.reject(res.message)
    }
  },
  async getOrderInfo(context) {
    let res = await reqOrderInfo()
    if (res.code === 200) {
      context.commit("GETORDERINFO", res.data)
      return res.message
    } else {
      return Promise.reject(res.message)
    }
  },
}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}

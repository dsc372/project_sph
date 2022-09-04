import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api"
const state = {
  categoryList: [],
  bannerList: [],
  floorList: [],
}
const mutations = {
  GETCATEGORYLIST(state, value) {
    state.categoryList = value
    state.categoryList.length = 15
  },
  GETBANNERLIST(state, value) {
    state.bannerList = value
  },
  GETFLOORLIST(state, value) {
    state.floorList = value
  },
}
const actions = {
  async categoryList(context) {
    let res = await reqCategoryList()
    if (res.code === 200) {
      context.commit("GETCATEGORYLIST", res.data)
    }
  },
  async getBannerList(context) {
    let res = await reqGetBannerList()
    if (res.code === 200) {
      context.commit("GETBANNERLIST", res.data)
    }
  },
  async getFloorList(context) {
    let res = await reqFloorList()
    if (res.code === 200) {
      context.commit("GETFLOORLIST", res.data)
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

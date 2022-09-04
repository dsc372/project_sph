import { reqGetSearchInfo } from "@/api"

const state = {
    searchlist:{}
}
const mutations = {
    GETSEARCHLIST(state,value){
        state.searchlist=value
    }
}
const actions = {
  //此次发请求是带参数的，参数至少要是一个空对象，否则会报错，此处做默认设置
  async getSearchList(context, value = {}) {
    let res = await reqGetSearchInfo(value)
    if(res.code===200){
        context.commit('GETSEARCHLIST',res.data)
    }
  },
}
const getters = {
    //没有返回空数组而不是undefine
    goodsList(state){
        return state.searchlist.goodsList||[]
    },
    trademarkList(state){
        return state.searchlist.trademarkList||[]
    },
    attrsList(state){
        return state.searchlist.attrsList||[]
    },
    total(state){
        return state.searchlist.total
    },
    totalPages(state){
        return state.searchlist.totalPages
    }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}

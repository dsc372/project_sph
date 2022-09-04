import { reqMyOrderList } from "@/api";

const state={
    myOrder:{}
}
const mutations={
    GETMYORDER(state,val){
        state.myOrder=val
    }
}
const actions={
    async getMyOrder(context,{page,limit}){
        let res=await reqMyOrderList(page,limit)
        if(res.code===200){
            context.commit("GETMYORDER",res.data)
            return(res.message)
        }else{
            return Promise.reject(res.message)
        }
    }
}
const getters={}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
  }
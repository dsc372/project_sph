import {reqSubmitOrder,reqPayInfo,reqPayStatus} from "@/api"
const state={
    orderId:'',
    payInfo:{},
}
const mutations={
    SUBMITORDER(state,val){
        state.orderId=val
    },
    GETPAYINFO(state,val){
        state.payInfo=val
    }
}
const actions={
    async submitOrder(context,{tradeNo,data}){
        let res= await reqSubmitOrder(tradeNo,data)
        if(res.code===200){
            context.commit("SUBMITORDER",res.data)
            return(res.message)
        }else{
            return Promise.reject(res.message)
        }
    },
    async getPayInfo(context,orderId){
        let res=await reqPayInfo(orderId)
        if(res.code===200){
            context.commit("GETPAYINFO",res.data)
            return(res.message)
        }else{
            return Promise.reject(res.message)
        }
    },
    async getPayStatus(context,orderId){
        let res=await reqPayStatus(orderId)
        return res
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
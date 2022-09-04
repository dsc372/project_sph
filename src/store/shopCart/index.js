import { reqCartList,reqDeleteById,reqUpdateCheckedById } from "@/api/index"

const state = {
  cartList:[]
}
const mutations = {
  GETCARTLIST(state,value){
    state.cartList=value
  }
}
const actions = {
  async getCartList(context) {
    let res=await reqCartList()
    if(res.code===200){
      context.commit("GETCARTLIST",res.data)
    }
  },
  async deleteCartListBySkuId(context,skuId){
    let res=await reqDeleteById(skuId)
    if(res.code===200){
      return res.message
    }else{
      return Promise.reject(new Error('res.message'))
    }
  },
  async updateChecked(context,{skuId,isChecked}){
    let res=await reqUpdateCheckedById(skuId,isChecked)
    if(res.code===200){
      return res.message
    }else{
      return Promise.reject(new Error('res.message'))
    }
  },
  deleteAllCheckedCart(context){
    let promiseAll=new Array()
    context.getters.cartListObj.cartInfoList.forEach(element=>{
      if(element.isChecked===1){
        let promise=context.dispatch('deleteCartListBySkuId',element.skuId)
        promiseAll.push(promise)
      }
    })
    return Promise.all(promiseAll)
  },
  updateAllCartChecked(context,val){
    let promiseAll=new Array()
    context.getters.cartListObj.cartInfoList.forEach(element=>{
      let promise=context.dispatch('updateChecked',{skuId:element.skuId,isChecked:val})
      promiseAll.push(promise)
    })
    return Promise.all(promiseAll)
  }
}
const getters = {
  cartListObj(state){
    return state.cartList[0]||{}
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}

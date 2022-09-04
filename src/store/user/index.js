import { reqCode,reqUserRegister,reqUserLogin ,reqUserInfo,reqUserLogout} from "@/api"
import { setToken,removeToken } from "@/utils/token"

const state={
    code:'',
    userInfo:{},
}
const mutations={
    GETCODE(state,val){
        state.code=val
    },
    USERLOGIN(state,val){
        state.token=val
    },
    GETUSERINFO(state,val){
        state.userInfo=val
    },
    CLEAR(state){
        state.userInfo={}
        removeToken()
    }
}
const actions={
    async getCode(context,val){
        let res=await reqCode(val)
        if(res.code===200){
            context.commit('GETCODE',res.data)
            return res.message
        }else{
            return Promise.reject(res.message)
        }
    },
    async userRegister(context,val){
        let res=await reqUserRegister(val)
        if(res.code===200){
            return res.message
        }else{
            return Promise.reject(res.message)
        }
    },
    async userLogin(context,val){
        let res=await reqUserLogin(val)
        if(res.code===200){
            setToken(res.data.token)
            return res.message
        }else{
            return Promise.reject(res.message)
        }
    },
    async getUserInfo(context){
        let res=await reqUserInfo();
        if(res.code===200){
            context.commit("GETUSERINFO",res.data)
            return res.message
        }else{
            return Promise.reject(res.message)
        }
    },
    async userLogout(context){
        let res= await reqUserLogout()
        if(res.code===200){
            context.commit('CLEAR')
            return res.message
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
import Vue from "vue"
import VeeValidate from "vee-validate"
import zh_CN from "vee-validate/dist/locale/zh_CN"//引入表单验证插件其中zh_CN代表提示信息为中文

Vue.use(VeeValidate)

VeeValidate.Validator.localize('zh_CN',{
    messages:{
        ...zh_CN.messages,
        is:(filed)=>`${filed}必须与密码相同`
    },
    attributes:{
        //错误信息中字段替换
        phone:'手机号',
        code:'验证码',
        password:'密码',
        passwordAgain:'确认密码',
        agree:'协议'
    }
})

//自定义校验规则
VeeValidate.Validator.extend("agree",{
    validate:val=>val,
    getMessage:filed=>filed+'必须同意'
})
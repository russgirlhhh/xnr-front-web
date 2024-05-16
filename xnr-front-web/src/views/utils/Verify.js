// 定义正则
const regs = {
    email:/^([a-zA-Z0-9_\-\.])+\@([a-zA-Z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
    number:/^0?$|^([1-9][0-9]*)?$/,
    password:/^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z~!@#$%^&*_]{8,18}$/
}
const verify = (rule,value,reg,callback)=>{
    if(value){
        if(reg.test(value)){
            callback()
        }else{
            callback(new Error(rule.message))
        }
    } else{
        callback()
    }
}
export default {
    email: (rule,value,callback)=>{
        return verify(rule,value,regs.email,callback)
    },
    number: (rule,value,callback)=>{
        return verify(rule,value,regs.number,callback)
    },
    password: (rule,value,callback)=>{
        return verify(rule,value,regs.password,callback)
    }
}

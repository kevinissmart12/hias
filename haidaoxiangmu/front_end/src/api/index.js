import axios from 'axios'
import { Loading } from 'element-ui';
import { Message } from 'element-ui';
import router from '../router'


let loading= null;
function startLoading(){
    loading=Loading.service({
        lock:true,
        text:'拼命加载中...',
        fullscreen:true
    })
}

function endLoading(){
    loading.close()
}

//请求拦截
axios.interceptors.request.use(config=>{
    //加载动画
    startLoading()
    if(localStorage.getItem('jwtToken')){
        //设置统一请求头
        config.headers.Authorization=localStorage.getItem('jwtToken')
    }


    return config
},error=>{
    Message.error(error.response.data)

    return Promise.reject(error)
})


//响应拦截
axios.interceptors.response.use(response=>{
    endLoading()
    if(response.data.status==401){
        Message.error('token失效，请重新登录')
        
        localStorage.removeItem('jwtToken')
        //跳转登录
        router.push('/login')
    }else if(response.data.status!==200){
        return Message.error(response.data.data.msg);
    }
    return response
},error=>{
    endLoading()
    Message.error(error.response.data)


    return Promise.reject(error)
})



export default axios
const Random={

    //生成n位随机数
    randomNumber: (n)=>{
        return parseInt((Math.random()+1)*Math.pow(10,n-1))
    },
    randomImageName:(n)=>{
        return new Date().getTime()+localStorage.getItem('jwtToken').slice(7,17)+parseInt((Math.random()+1)*Math.pow(10,n-1))
    }

}

export default Random
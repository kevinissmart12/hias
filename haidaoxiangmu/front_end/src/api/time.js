const Time={

    //输入时间字符串
    //输出具体时间
    time: (str)=>{
        if (str == null || str == "") return "";
        let date=new Date(str)
        var year = date.getFullYear();
        var month =date.getMonth() + 1 < 10? "0" + (date.getMonth() + 1): date.getMonth() + 1;
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minutes =date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var seconds =date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        return (year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds);

    },


}

export default Time
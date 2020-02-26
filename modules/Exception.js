module.exports = {
    expfun: function(flag){
        if (flag == 0){
            throw "This is exception.";
            // 程序返回，不再执行下面的return语句。
        }
        return "success";
    }
}
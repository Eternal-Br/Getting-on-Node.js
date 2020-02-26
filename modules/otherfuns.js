//只支持一个函数调用的写法如下：
// function fun2(res){
//     res.write("hello, I'm fun2.");
//     console.log("fun2.");
// }
// module.exports = fun2; //只支持一个函数


// 支持多个函数调用的写法如下：
module.exports = {
    fun2: function(res){
        res.write("hello, I'm fun2.");
        console.log("fun2."); 
    },
    fun3: function(res){
        res.write("hello, I'm fun3.");
        console.log("fun3.");        
    }
    // , ...
}
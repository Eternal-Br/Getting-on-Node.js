var http = require('http');
var otherfun = require('./modules/otherfuns.js');
http.createServer(function (request, response){
    response.writeHead(200, {'Content-Type': 'text/html; charset = utf-8'}); //http协议头
    if(request.url !== "/favicon.ico"){ //清除node的第二次访问，有些高级框架已清除
        // fun1(response);
        // otherfun(response); //单个函数调用的版本
        //多个函数调用的版本
        // otherfun.fun2(response);
        // otherfun.fun3(response);
        
        //或者写作, 这种写法重要，其中的字符串可作为变量
        // 用函数名的字符串调用对应的函数
        otherfun['fun2'](response);
        otherfun['fun3'](response);
        funname = 'fun2';
        otherfun[funname](response);

        response.end() //协议尾，结束本次http协议
    }
}).listen(8000);
console.log('Sever running at  http://127.0.0.1:8000');


function fun1(res){
    console.log("fun1");
    res.write("Hello, I'm Fun1.");
}
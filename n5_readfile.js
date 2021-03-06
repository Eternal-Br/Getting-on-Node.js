var http = require('http');
var url = require('url');
var router = require('./modules/router');

/*
http.createServer(function (request, response){
    response.writeHead(200, {'Content-Type': 'text/html; charset = utf-8'}); //http协议头
    if(request.url !== "/favicon.ico"){ //清除node的第二次访问，有些高级框架已清除
        // optfile.readfileSync('./views/login.html');
        // 闭包，解决先后冲突的问题
        function recall(data){
            response.write(data);
            response.end('OK');
        }
        // optfile.readfile('./views/login.html', response);
        // 闭包方式
        optfile.readfile('./views/login.html', recall);
        // response.end('OK') //协议尾，结束本次http协议
        console.log('主程序执行完毕');
    }
}).listen(8000);
*/

//修改程序后将上述内容修改如下：
http.createServer(function (request, response){
    response.writeHead(200, {'Content-Type': 'text/html; charset = utf-8'}); //http协议头
    if(request.url !== "/favicon.ico"){ //清除node的第二次访问，有些高级框架已清除
        var pathname = url.parse(request.url).pathname;
        // console.log(pathname);
        pathname = pathname.replace(/\//, ''); //替换掉前面的'/'
        // 在router.js里面只写了login和register方法，没写异常处理，
        // 所以浏览器直接访问 http://127.0.0.1:8000/login 或者 http://127.0.0.1:8000/register 没有问题，
        // 访问其他路由后台崩溃。
        router[pathname](request, response);

        /*
        // optfile.readfileSync('./views/login.html');
        // 闭包，解决先后冲突的问题
        function recall(data){
            response.write(data);
            response.end('OK');
        }
        // optfile.readfile('./views/login.html', response);
        // 闭包方式
        optfile.readfile('./views/login.html', recall);
        // response.end('OK') //协议尾，结束本次http协议
        console.log('主程序执行完毕');
        */
    }
}).listen(8000);

console.log('在浏览器中访问 http://127.0.0.1:8000/login 或者 http://127.0.0.1:8000/register');

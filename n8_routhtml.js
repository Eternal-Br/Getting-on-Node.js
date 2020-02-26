var http = require('http');
var url = require('url');
var router = require('./modules/router');
http.createServer(function (request, response){
    if(request.url !== "/favicon.ico"){ //清除node的第二次访问，有些高级框架已清除
        var pathname = url.parse(request.url).pathname;
        pathname = pathname.replace(/\//, ''); //替换掉前面的'/'

        // 这里的在浏览器输入 http://127.0.0.1:8000/writefile 则 pathname = writefile
        router[pathname](request, response);
    }
}).listen(8000);
console.log('Sever running at http://127.0.0.1:8000/login');

var http = require('http');
var url = require('url');
var router = require('./modules/router');
var exception = require('./modules/Exception');

http.createServer(function (request, response){
    if(request.url !== "/favicon.ico"){ //清除node的第二次访问，有些高级框架已清除
        var pathname = url.parse(request.url).pathname;
        // console.log(pathname);
        pathname = pathname.replace(/\//, ''); //替换掉前面的'/'
        try{
            router[pathname](request, response);
            // data = exception.expfun(0);
            // response.write(data);
            // response.end(0);
        }catch(err){
            console.log('Error infomation: ' + err);
            response.writeHead(200, {'Content-Type': 'text/html; charset = utf-8'}); //http协议头
            response.write(err.toString());
            response.end('');
        }
        console.log('server 执行完毕');
    }
}).listen(8000);
console.log('Sever running at  http://127.0.0.1:8000/login');

var http = require('http');
http.createServer(function (request, response){
    response.writeHead(200, {'Content-Type': 'text/html; charset = utf-8'}); //http协议头
    if(request.url !== "/favicon.ico"){ //清除node的第二次访问，有些高级框架已清除
        console.log('访问');
        response.write('hello, world!');
        response.end() //协议尾，结束本次http协议
    }
}).listen(8000);
console.log('Sever running at  http://127.0.0.1:8000');

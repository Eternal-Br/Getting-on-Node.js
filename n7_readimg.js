var http = require('http');
var url = require('url');
var optfile = require('./modules/optfile');

http.createServer(function (request, response){
    // response.writeHead(200, {'Content-Type': 'text/html; charset = utf-8'}); //http协议头
    response.writeHead(200, {'Content-Type': 'image/jpeg'}); //http协议头, Content-Type类型后，将以二进制流的形式输出
    if(request.url !== "/favicon.ico"){ //清除node的第二次访问，有些高级框架已清除
        // console.log('访问');
        response.write('Hello, world.'); // 不能向客户端输出任何字节，否则图片无法正常显示
        optfile.readImg('./imgs/pig.png', response); // 由response向客户端输出
        //--------------------
        // response.end(''); //协议尾，结束本次http协议
    }
}).listen(8000);
console.log('Sever running at  http://127.0.0.1:8000');

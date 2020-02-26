var http = require('http');
var User = require('./modules/User')
// var Teacher = require('./modules/Teacher')
http.createServer(function (request, response){
    response.writeHead(200, {'Content-Type': 'text/html; charset = utf-8'}); //http协议头
    if(request.url !== "/favicon.ico"){ //清除node的第二次访问，有些高级框架已清除
        response.write("张三说 Hello!");
        // teacher = new Teacher(1, '张三', 20);
        user = new User(1, '张三', 20);
        // user.id = 1;
        // user.name = "张三";
        // user.age = 20;
        user.enter();
        user.comeon(response);
        // teacher.teach(response);
        
        response.end() //协议尾，结束本次http协议
    }
}).listen(8000);
console.log('Sever running at  http://127.0.0.1:8000');

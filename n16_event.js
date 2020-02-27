// 资源内容：
// Events
// events.EventEmitter
// emitter.addListener(event, listener)==on //添加监听
// emitter.on(event, listener)
// emitter.once(event, listener)//—次性的监听器
// emitter.removeListener(event, listener) //删除指走监听
// emitter.removeAHLi$teners([event]) //删除所有监听
// emitter.setMaxListeners(n) //默认情况下当一个事件的监听超过10个时，EventEmitter将打印警告信息，0表无限制
// emitter.listeners(event) //返回特走事件的事件监听器隼合
// emitter.emit(event, [argl], [arg2], [...]) //用提供的参数按顺序执行每个事件监听器。

// 用法示例：
// emitter.on('someEvent', function(argl, arg2){
//     console.log('listener2', argl, arg2);
// });

// emitter.emit('someEvent', 'argl 参数', 'arg2 参数'); //抛出事件


// 做一个一次性监听器

var http = require('http');
// var events = require('events');
var UserBean = require('./modules/UserBean');

http.createServer(function (request, response){
    if(request.url !== "/favicon.ico"){ //清除node的第二次访问，有些高级框架已清除
        user = new UserBean();
        user.eventEmit.once('registerSuc', function(email, pwd){
            response.write('注册成功');
            console.log('传来email: ' + email);
            console.log('传来pwd: ' + pwd);
            user.login(request, response);
            response.end();
        }); // 注册监听
        user.register(request, response);
    }
}).listen(8000);
console.log('Sever running at http://127.0.0.1:8000');

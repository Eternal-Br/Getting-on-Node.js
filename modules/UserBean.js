var events=require("events");
var http = require('http');
function UserBean(){
    this.eventEmit = new events.EventEmitter(); 
    this.register = function(req,res){
        console.log('注册');
        // 如果前端有表单，则req里面自动就带有req['email'] 和req['pwd']
        // 以下两句可以忽略
        req['email'] = 'bruce@whut.edu.cn';
        req['pwd'] = "helloworld"; 
        // 抛出事件消息: 'registerSuc'，并传入相应的参数，这里分别是email: 'bruce@whut.edu.cn', pwd: 'helloworld'
        this.eventEmit.emit('registerSuc','bruce@whut.edu.cn', 'helloworld'); //抛岀事件消息
    },
    this.login = function(req,res){ 
        console.log('登录');
        res.write("用户邮箱: " + req['email']); 
        res.write("密码: " + req['pwd']); 
        res.write("登录");
    }
}

module.exports = UserBean;
var optfile = require('./optfile');
var url = require('url');
var querystring = require('querystring'); //POST方式需要

function getRecall(req, res){
    res.writeHead(200, {'Content-Type': 'text/html; charset = utf-8'}); //http协议头
    function recall(data){
        res.write(data);
        res.end('');
    }
    return recall;
}
module.exports = {
    // 如果没有做任何的参数接收，则直接执行回调函数，去读取login.html界面。
    login: function(req, res){
        /*
        //-------get方式接收参数--------
        // get方式是同步方式
        var rdata = url.parse(req.url, true).query;
        console.log(rdata);
        if (rdata != undefined){
            console.log(rdata['email']);
            console.log(rdata['pwd']);
        }
        */

        // -----------POST方式接收参数---------
        var POST = ''; //定义一个POST变量，暂存请求体的信息
        // 通过req的data事件监听
        req.on('data', function (chunk){
            POST += chunk;
        });
        // 注意异步，这一部分后执行完毕
        // 在end事件触发后，执行下面的方法
        req.on('end', function(){
            POST = querystring.parse(POST);
            // console.log('recieved param email: ' + POST['email']);
            // console.log('recieved param pwd: ' + POST['pwd']);
            // res.end();
            //如果需要拿到全部参数之后在做处理，需要将recall()函数装入，这时需要改写如下：
            // recall = getRecall(req, res);
            // 这里的动态网页实质上是将收到的data（整个页面字符串）中的个别子字符串进行替换
            arr = ['email', 'pwd'];
            function recall(data){ // 重写recall() 方法
                dataStr = data.toString();
                // console.log(dataStr);
                for(var i=0; i<arr.length; i++){
                    // 其中的arr[i]仍是变量
                    re = new RegExp('{'+arr[i]+'}', 'g'); // 相当于 /\{name\}/g，但可以拼接字符串，更灵活
                    dataStr = dataStr.replace(re, POST[arr[i]]);
                }
                res.write(dataStr);
                res.end();
            }
            optfile.readfile('./views/login.html', recall);
        });
        


        // recall = getRecall(req, res);
        // optfile.readfile('./views/login.html', recall);
    },

    register: function(req, res){
        recall = getRecall(req, res);
        optfile.readfile('./views/register.html', recall);
    },

    writefile: function(req, res){
        recall = getRecall(req, res);
        optfile.writefile('./views/one.txt', '我的写入文件', recall);
    },

    showimg: function(req, res){
        res.writeHead(200, {'Content-Type': 'image/jpeg'}); //http协议头, Content-Type类型后，将以二进制流的形式输出
        optfile.readImg('./imgs/pig.png', res)
    }
}
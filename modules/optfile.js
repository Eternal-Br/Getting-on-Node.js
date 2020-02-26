var fs = require('fs');

module.exports = {
    // readfile : function(path, res){ // 执行此可能会发生 Error: write after end
    //     fs.readFile(path, function(err, data){
    //         if (err){
    //             console.log(err);
    //         }
    //         else{
    //             console.log(data.toString());
    //             res.write(data);
    //             // 执行此可能会发生 Error: write after end
    //         }
    //     });
    //     console.log("异步方法执行完毕.");
    // },

    readfile : function(path, recall){ //用函数闭包的方式解决可能出现的先后冲突问题
        fs.readFile(path, function(err, data){
            if (err){
                console.log('optfile Error infomation: ' + err);
                recall('文件不存在. No such file or dictionary.');
            }
            else{
                // console.log(data.toString());
                // 传入的recall()函数向前台打印信息
                recall(data);
                
            }
        });
        console.log("异步读文件执行完毕.");
    },

    readfileSync(path){
        var data = fs.readFileSync(path, 'utf-8');
        console.log(data);
        console.log("同步读文件执行完毕.");
    },


    writefile : function(path, data, recall){ 
        fs.writeFile(path, data, function(err){
            if (err){
                throw err;
            }
            else{
                console.log("It's saved.");
                recall('写文件成功');
                // 执行此可能会发生 Error: write after end
            }
        });
    },

    writefileSync : function(path, data){
        fs.writeFileSync(path, data);
        console.log("同步写文件完成.")
    },

    
    readImg : function(path, res){ 
        fs.readFile(path, 'binary', function(err, filedata){
            if (err){
                console.log(err);
                return;
            }
            else{
                console.log('输出文件');
                res.write(filedata, 'binary');
                res.end('');
            }
        });
    },
}
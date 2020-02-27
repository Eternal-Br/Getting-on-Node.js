// 需要先在当前项目环境下安装mysql支持：npm install mysql
var mysql = require('mysql');

// 直接连接到mySQL
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : '*****',
  password : '*****',
  database : 'test'
});
 
// 创建一个连接
connection.connect(function(err){
    if(err){
        console.log('[query] - :' + err);
        return;
    }
    console.log('[connection connect] succeed!');
});

// 测试连接
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });


// 单条插入数据
// param = ['bruce3@tsinghua.edu.cn', 'zh*$2019', 'zilong'];
// var userAddSql  ='insert into users (email, pwd, nickname) values(?, ?, ?)';
// connection.query(userAddSql, param, function(err, rs){
//     if(err){
//         console.log('Insert error: ' + err);
//         return;
//     }
//     console.log('Insert succeed!');
// });

// 批量插入数据
// var userAddSql  ='insert into users (email, pwd, nickname) values(?, ?, ?)';
// var param = [['bruce2@tsinghua.edu.cn', 'zh*$2019', 'nickname'], ['bruce1@tsinghua.edu.cn', 'zh*$2019', 'nickname']];
// for (var i=0; i<param.length; i++){
//     connection.query(userAddSql, param[i], function(err, rs){
//         if(err){
//             console.log('Insert error: ' + err);
//             return;
//         }
//         console.log('Insert succeed!');
//     });
// }


// 查询数据
// var sqlQuery = 'select * from users';
// connection.query(sqlQuery, function(err, rs, fields){
//     if (err){
//         console.log('[query] - :' + err);
//         return;
//     }
//     console.log('The solution is: ', rs);
//     // console.log(fields);
// });

// 查询数据 - 带条件
var sqlQuery = 'select * from users where nickname = ?';
connection.query(sqlQuery, ['zilong'], function(err, rs, fields){
    if (err){
        console.log('[query] - :' + err);
        return;
    }
    console.log('The solution is: ', rs);
    // console.log(fields);
});

// 断开连接
connection.end(function(err){
    if(err){
        return;
    }
    console.log('[connection end] succeed!');
});
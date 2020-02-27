// 需要先在当前项目环境下安装mysql支持：npm install mysql
// 需要先在当前项目环境下安装mysqlPool支持：npm install -g  node-mysql // g表示全局安装

var OptPool = require('./modules/optPool');
var optPool = new OptPool();
var pool = optPool.getPool();

// 执行SQL语句
// 从连接池中获取一个连接， 异步操作， coon即为连接
pool.getConnection(function(err, conn){
    //----插入
    var userAddSql = 'insert into users (email, pwd) values(?,?)';
    var param = ['bruce5@tsinghua.edu.cn','zhjdoqd&*', 'zilong'];
    // conn.query(userAddSql, param, function(err, rs){
    //     if(err){
    //         console.log('Insect err:',err.message); 
    //         return;
    //     }
    //     console.log('insert success!');
    //     conn.release(); //所有操作完成后 再将此连接放回连接池
    // });
    // 查询
    conn.query('SELECT * from users', function(err, rs) {
        if (err) {
            console.log('[query] - :' + err);
            return;
        }
        for(var i=0; i<rs.length; i++){
            console.log(rs[i].email);
        }
        // 注意：如果前面pool.getConnection()函数内写过conn.release(); 下面会报错
        // 因为已经放回连接池的连接不能再被使用和释放，
        // 所以应当在本次连接内 所有的操作执行完之后再释放连接
        conn.release(); //放回连接池
    });
});



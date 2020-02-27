var mysql = require('mysql');

function optPool(){
    // this.xxx 表示成员变量
    this.flag = true; //是否连结过
    this.pool = mysql.createPool({
        host: '127.0.0.1',
        user: '*****',
        password: '****',
        database: 'test',
        port: '3306'
    });

    this.getPool = function(){
        if(this.flag){
            // 监听connection事件
            // 如果this.flag == true (第一次拿连接池) , 则下面将会执行初始化
            this.pool.on('connection', function(connection){
                connection.query('SET SESSION auto_increment_increment = 1');
                this.flag = false;
            });
        }
        return this.pool;
    }
};

module.exports = optPool;
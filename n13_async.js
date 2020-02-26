var async = require('async');

// 两种定时方式类似
// SetInterval会自动重复,setTimeout不会重复


// function oneFun(){
//     // setTimeout(function(){

//     // }, 1000)
//     i = 0;
//     setInterval(function(){
//         console.log('aaa: '+ new Date());
//         i++;
//         if (i == 3){
//             clearInterval(this);
//         }
//     }, 1000);
//     console.log('oneFun');
// }

// function twoFun(){
//     j = 0;
//     setInterval(function(){
//         console.log('bbb: '+ new Date());
//         j++;
//         if (j == 3){
//             clearInterval(this);
//         }
//     }, 1000);
//     console.log('oneFun执行');
// }

// oneFun();
// twoFun();

/*
注意： 如果出现
    function apply(fn, ...args) {
        ^^^

    SyntaxError: Unexpected token ...
的错误，是因为使用的node nvm版本过低，切换为 4.6.0以上的版本，
You should use a newer version of node (at least v6.4.0 as default support, or at least v4.9.1 with --harmony flag (node --harmony))
*/


//--------串行无关联-----------
// async.series();

// function exec(){
//     // 同步串行无关联方式
//     // async.series(
//     //     {
//     //         one: function(done){
//     //             // done(null, 'one完毕'); //回调内容，这里只有参数1为null，才会继续执行下面的函数。
//     //             done('error', 'one完毕'); //回调内容, 如果参数1为非null 值，则会将参数在下面的回调函数中 console.log(err) 打印
//     //         },
//     //         two: function(done){
//     //             done(null, 'two完毕'); //回调内容
//     //         },
//     //     }, function(err, rs){ //这个函数就是done()函数的回调
//     //         console.log(err); // 错误信息，如果出现异常，后面的流程控制将被中断，直接跳到最后的结果集函数
//     //         console.log(rs); // 结果集，包含了所有的流程控制
//     //     }
//     // )

//         // 异步方式串行无关联方式
//         async.series(
//             {
//                 one: function(done){
//                     i = 0;
//                     setInterval(function(){
//                         console.log('aaa: '+ new Date());
//                         i++;
//                         if (i == 3){
//                             clearInterval(this);
//                             // done(null, 'one完毕'); //回调函数
//                             done('error', 'one完毕'); //回调函数
//                         }
//                     }, 1000);
//                 },

//                 two: function(done){
//                     j = 0;
//                     setInterval(function(){
//                         console.log('bbb: '+ new Date());
//                         j++;
//                         if (j == 3){
//                             clearInterval(this);
//                             done(null, 'two完毕'); //回调函数
//                         }
//                     }, 1000);
//                 },
//             }, function(err, rs){ //这个函数就是done()函数的回调
//                 console.log(err); // 错误信息
//                 console.log(rs); // 结果集
//             }
//         ); //这里的分号;要不要加
// }



// --------并行无关联----------
// async.parallel();

// function exec(){
//     async.parallel(
//         {
//             one: function(done){
//                 i = 0;
//                 setInterval(function(){
//                     console.log('aaa: '+ new Date());
//                     i++;
//                     if (i == 3){
//                         clearInterval(this);
//                         // 如果one()函数出错，下面的two()函数将不能执行完毕
//                         done(null, 'one完毕'); //回调函数
//                         // OUTPUT: error { one: 'one完毕' }
//                         // 如果one()函数这里没有出错，写作： 
//                         // done(null, 'one完毕');  // 且 two()函数也没有出错，OUTPUT结果为：null { one: 'one完毕', two: 'two完毕' }. 
//                     }
//                 }, 1000);
//             },

//             two: function(done){
//                 j = 0;
//                 setInterval(function(){
//                     console.log('bbb: '+ new Date());
//                     j++;
//                     if (j == 3){
//                         clearInterval(this);
//                         done(null, 'two完毕'); //回调函数
//                     }
//                 }, 1000);
//             },
//         }, function(err, rs){ //这个函数就是done()函数的回调
//             console.log(err); // 错误信息
//             console.log(rs); // 结果集
//         }
//     ); //这里的分号;要不要加
// }


// --------串行有关联----------
// async.waterfall(); //瀑布流

function exec(){
    async.waterfall(
        // {
        [
            // one: function(done){
            function(done){
                i = 0;
                setInterval(function(){
                    console.log('aaa: '+ new Date());
                    i++;
                    if (i == 3){
                        clearInterval(this);
                        // 如果one()函数出错，下面的two()函数将不能执行完毕
                        done(null, 'one完毕 '); //回调函数
                        // OUTPUT: error { one: 'one完毕' }
                        // 如果one()函数这里没有出错，写作： 
                        // done(null, 'one完毕');  // 且 two()函数也没有出错，OUTPUT结果为：null { one: 'one完毕', two: 'two完毕' }. 
                    }
                }, 1000);
            },

            // two: function(done){
            function(preValue, done){
                j = 0;
                setInterval(function(){
                    console.log(preValue + new Date());
                    j++;
                    if (j == 3){
                        clearInterval(this);
                        done(null, preValue + ', two完毕'); //回调函数
                    }
                }, 1000);
            },
        // }, 
        ],
        function(err, rs){ //这个函数就是done()函数的回调
            console.log(err); // 错误信息
            console.log(rs); // 结果集
        }
    ); //这里的分号;要不要加
}

exec();
console.log('主进程执行完毕');



let mysql = require('mysql');

let config = {
    host: 'localhost',
    user: 'root',
    password: '13579',
    database: 'logininfo'
};

//数据库连接
let connection = mysql.createConnection(config);
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as id ' + connection.threadId);
});

//创建注册数据表
let createReg = `create table if not exists user(
    id int not null primary key auto_increment,
    username char(25),
    password char(100),
    email char(30),
    telephone char(15)
)`;
//创建发表内容数据表
let createPub = `create table if not exists content(
    id int not null primary key auto_increment,
    contents varchar(500)
      
)`;
//注册信息保存确认
connection.query(createReg, function (err, results) {
    if (err) {
        console.log(err.message);
    }
    console.log('Add the register table.');
});
//文档信息保存确认
connection.query(createPub, function (err, results) {
    if (err) {
        console.log(err.message);
    }
    console.log('Add the content table.');
}); 

//插入用户登陆信息
function SQL(value) {
    let stmt = `INSERT INTO user(id,username,password,email,telephone) VALUES ?`;

    connection.query(stmt, [value], (err, results) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Row inserted: ' + results.affectedRows);
    });
}

//插入发表的内容
function Cont(value) {
    let stmt = `INSERT INTO content(id,contents) VALUES ?`;
    connection.query(stmt, [value], (err, results) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Row inserted again: ' + results.affectedRows);
    });
}

//查找用戶
function sqlSelect(username) {
    let user = `select * from user where username="${username}";`;
    return new Promise((resolve, reject) => {
        connection.query(user, username, function (err, results) {

            try {
                return resolve(results);
            }
            catch (err) {
                reject(new Error('error'));
            }
            // console.log(results);
        });
    });
}

//删除数据库中表中数据（某一行）
function delTable(para) {
    let data = `delete from content where username="${para}";`;
    connection.query(data, (err, results) => {
        if (err) {
            throw console.error(err);
        } else {
            console.log('删除成功！');
        }
    });
}

// //關閉數據庫連接
// connection.end(function (err) {
//     if (err) {
//         return console.log('err' + err.message);
//     }
//     console.log('Close the database connection.');
// });

module.exports = {
    SQL,
    sqlSelect,
    Cont,
    delTable
};
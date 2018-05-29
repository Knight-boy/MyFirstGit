var express = require('express');
var router = express.Router();
var sql = require("../configs/database");
var crypto = require('crypto');
var key;
/* GET log page. */
router.get('/log', function (req, res, next) {
    key = req.query.key;
    console.log(key);
    // if(!key || key.length !== 32) {
    //     res.send('');
    // }
    // if(req.session.user) {
    //     res.redirect('/pub');
    // }
    res.render('login',
        {
            title: 'Login'
        });
        
});
router.post('/log', function (req, res, next) {
    user = req.body.username;
    let pasw = req.body.password;

    var md5 = crypto.createHash("md5");
    var pw = md5.update(pasw).digest('base64');
    
    sql.sqlSelect(user).then(result => {
        console.log(result);
        
        if (pw !== result[0]['password']) {

            console.log("密码错误");

            req.flash('error','用戶密碼錯誤');
            res.redirect('/log?key=' + key);
        }
        else {
            console.log('登入成功');
            
            res.redirect('/pub?key=' + key);
        }
    }).catch((err) => {
        console.log('用户名不存在,请重新登陆...');
       
        res.redirect('/log?key=' + key);
    });
    //res.redirect('/');
    // var user = res.session.user;
    // console.log(user);
});
module.exports = router;

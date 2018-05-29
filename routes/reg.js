var express = require('express');
var router = express.Router();
var sql = require("../configs/database");
var crypto = require('crypto');
/* GET reg page. */
router.get('/reg', function(req, res, next) {
    res.render('register',
        {
            title: 'Register'
        });
});
router.post('/reg',function(req,res,next){
    var md5 = crypto.createHash("md5");
    var pw = md5.update(req.body.password).digest('base64');
    var user = req.body.username;
    var email = req.body.email;
    var telephone = req.body.telephone;
    sql.sqlSelect(user).then((Usings) => {
       let flag = false;
       for(let obj of Usings) {
            if(user == obj['username']) {
                console.log('用户名已存在');
                flag = !flag;
                break;
            } 
        }
        if(flag) {
            res.redirect('/reg?key=');
        } else {
            console.log('注冊成功');
            let value = [[null,user,pw,email,telephone]];
            sql.SQL(value);
            res.redirect('/log?key=');
        }
    }).catch((err) => {
        console.log('Something wrong when you registed!');
    });
    
});
module.exports = router;

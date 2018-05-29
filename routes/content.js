var express = require('express');
var router = express.Router();
var sql = require("../configs/database");

router.get('/pub', function (req, res, next) {
    res.render('contents', {
        title: 'Content'
    });
});
// var username;
// router.post('/log',function(req,res) {
//     sql.sqlSelect(req.body.username).then(result => {
//         username = result[0]['username'];

    router.post('/pub', function (req, res, next) {

        let value = [[null,req.body.contents]];

        sql.Cont(value);

        var r = res.body;
        r = req.body.contents;
        console.log(r);

        req.flash('success','发布成功');
        res.render('publish',{
            title: 'Publisher',
            val: `${r}`
        });
    });


//     });
// });
module.exports = router;
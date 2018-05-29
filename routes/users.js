var express = require('express');
var router = express.Router();
//var User = require('../models/user');
var crypto = require('crypto');

/* GET users listing. */
// router.get('/:user', function(req, res) {
//   User.get(req.params.user, function(err,user){
//     if(!user) {
//         console.log(req.session);
//         req.flash('error','用户不存在');
//         return res.redirect('/');
//     }
//     console.log(user);
//
//   });
// });

module.exports = router;

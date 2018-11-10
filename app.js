var express = require('express');
var bodyparser = require('body-parser');
var app = express();
var Db = require('./modules/db');
var uniqid = require('uniqid');
var bcrypt = require('bcryptjs');
var Login = Db.extend({tableName: "user"});
var login = new Login();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, authorization");
    res.header("Access-Control-Allow-Methods","GET,POST,PATCH,PUT,DELETE,OPTIONS");
    if (req.url != '/login' && req.url != '/status') {
        if (req.headers.authorization) {
            let token = req.headers.authorization;
            //console.log(token);   
            login.find('first',{where: "token = '" + token + "'"}, function (err, row) {
                if(err) {
                    res.send({error: 'Token is invalid!', status: 'fail'})
                } else {
                    if (row.length == 0) {
                        res.send({error: 'Token is invalid!', status: 'fail'})
                    } else {
                        var currentdate = new Date();
                        if (row.expired_token < currentdate) {
                            res.send({error: 'Account is expired! Please login again!',status: 'fail'})
                        } else {
                            next();
                        }
                    }
                }
            });
        } else {
            res.send({error: 'Invalid!',status: 'fail'});
        }
    } else{
        next();
    }
});

// var products = require('./controllers/products');
// app.use('/products',products);
app.use(require('./controllers'));

var server = app.listen(8181,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("Server is listening at http://%s:%s",host,port);
});
var express = require('express');
var router = express.Router();
var Db = require('../modules/db');
var result = require('../modules/response-result')
var uniqid = require('uniqid');

var Login = Db.extend({ tableName : "user"});
var login = new Login();

router.use(function(req,res,next){
    next();
});

//Dang nhap
router.post('/',function(req,res){
    if(req.body.username&&req.body.password){
        login.find('first',{where: "username= '" + req.body.username+"'" + "AND password='" + req.body.password+"'"}, function(err,row){
        if(err){
            res.send({errorCode:1,message:"Database Error!",status:"error"});
        }
        if(row.length==0){
            res.send({errorCode:1,message:"Wrong account or password!",status:"fail"});
        }
        else {
            var n = new Date();
            var data = {
                "uid" : row.uid,
                "username" : row.username,
                "token" : row.token,
                "role" : row.role,
                "active": row.active,
                "expired_token":row.expired_token
            }
            if(result.data(row).data.expired_token > n){
                //console.log(result.data(row).data.Token);
                res.send({errorCode:0,message:"logged!",status:"connected",data:data});
            }
            else{         
            //console.log(token);
            var token = uniqid();
            login.set('token',token);
            var newdata = {
                "uid" : row.uid,
                "username" : row.username,
                "token" : token,
                "role" : row.role,
                "active": row.active,
            }
            login.save("username='"+req.body.username+"'",function(){
                // res.send(result.error(0,"logged in","connected"),{data:newdata});
                res.send({errorCode:0,message:"logged!",status:"connected",data:newdata});

            });
        }
        }
    });
    }
});
    //lay token
    router.get('/status',function(req,res){
        if(req.headers.authorization)
        {
            login.find('first',{where: "token= '" + req.headers.authorization+"'"}, function(err,rows){
            if(err){
                res.send({errorCode:1,message:"Database Error!",status:"error"});
            }
            if(rows.length==0){
                res.send(result.error(1,"Account is expired! Please login again!","fail"));
            }
            else
            {
            var n = new Date();
            var data = {
                "uid": rows.uid,
                "username" : rows.username,
                "token" : rows.token,
                "expired_token": rows.expired_token,
                "role" : rows.role,
                "active": rows.active
            }
            if(result.data(rows).data.expired_token > n){
                //console.log(result.data(row).data.Token);
                res.send({errorCode:0,message:"logged!",status:"connected",data:data});
            }
            else{
                 //console.log(token);  
                 res.send(result.error(4,"Account is expired! Please login again!","fail"));
            }
        }
        })
        }
        else{
            res.send(result.error(2,"Missing Token"));
        }
    }
)

module.exports = router

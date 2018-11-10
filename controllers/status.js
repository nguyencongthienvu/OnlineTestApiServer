var express = require('express');
var router = express.Router();
var Db = require('../modules/db');
var result = require('../modules/response-result')
var uniqid = require('uniqid');

var Status = Db.extend({ tableName : "user"});
var status = new Status();

router.use(function(req,res,next){
    next();
});

router.get('/',function(req,res){
    if(req.headers.authorization)
    {
        status.find('first',{where: "token= '" + req.headers.authorization+"'"}, function(err,rows){
        if(err){
            res.send({errorCode:1,message:"Database Error!",status:"error"});
        }
        if(rows.length==0){
            res.send({errorCode:1,message:"Account is expired! Please login again!",status:"fail"});
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
            // res.send(result.error(4,"Account is expired! Please login again!","fail"));
            if(data.role == 2)
            {
                var d =new Date();
            d.setMinutes(d.getMinutes() + 70);
            status.set('expired_token',d);
            var newdata = {
                "uid" : rows.uid,
                "username" : rows.username,
                "token" : rows.token,
                "role" : rows.role,
                "active": rows.active,
                "expired_token": d
            }
            status.save("token='"+req.headers.authorization+"'",function(){
                // res.send(result.error(0,"logged in","connected"),{data:newdata});
                res.send({errorCode:0,message:"logged!",status:"connected",data:newdata});
                });
            }
            else
            {
                var d =new Date();
                d.setMinutes(d.getMinutes() + 30);
                status.set('expired_token',d);
                var newdata = {
                    "uid" : rows.uid,
                    "username" : rows.username,
                    "token" : rows.token,
                    "role" : rows.role,
                    "active": rows.active,
                    "expired_token": d
                }
                status.save("token='"+req.headers.authorization+"'",function(){
                // res.send(result.error(0,"logged in","connected"),{data:newdata});
                res.send({errorCode:0,message:"logged!",status:"connected",data:newdata});
                });
            }
            
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
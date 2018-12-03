var express = require('express');
var router = express.Router();
var Db = require('../modules/db');
var result = require('../modules/response-result')
var uniqid = require('uniqid');

var Admin = Db.extend({ tableName : "user"});
var admin = new Admin();
router.use(function(req,res,next){
    next();
});

//Get Admin
router.get('/',function(req,res){
    admin.query('SELECT user.uid, user.username, user.role, user.active from user WHERE user.role = 0 OR user.role = 4', function(err,rows,fields){
        if(err){
            res.send({errorCode:1,message:"Database Error!",status:"error"});
        }
        if(rows.length==0){
            res.send({errorCode:1,message:"No data show!",status:"nodata"});
        }
        else{
            res.send(result.data(rows));
        }
    });
});

router.post('/',function(req,res){
    if (req.body.username && req.body.password && req.body.role && req.body.active){
        admin.query("INSERT INTO user(username, password, role,active) VALUES('"+req.body.username+"',"+req.body.password+","+req.body.role+","+req.body.active+") ", function(err,rows,fields){
            if(err) 
            {
                console.log(err)
                res.send({errorCode:1,message:"Database Error!",status:"error"});
            }
            else
            {
                res.send({errorCode:0,message:"Inserted successfully",status:"successfully",data:result});
                                    
            }
        });
    } else {
        res.send({errorCode:404,message:"Missing Field!",status:"Missing"});
    }
});

router.put('/',function(req,res){
    if (req.body.rowId && req.body.role == "0") {
        admin.query("UPDATE user SET user.active = 1 where user.uid = "+req.body.rowId+"", function(err,rows,fields){
            if(err) 
            {
                res.send({errorCode:1,message:"Database Error!",status:"error"});
            }
            else
            {
                res.send({errorCode:0,message:"Updated successfully",status:"successfully",data:result});
                                    
            }
        });
    } else if (req.body.role == "4") {
        res.send({errorCode:3,message:"Role can not accecpt !",status:"Role Error"});
    } else {
        res.send({errorCode:404,message:"Missing Field!",status:"Missing"});
    }
});


module.exports = router
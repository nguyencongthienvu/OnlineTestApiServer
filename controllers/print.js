var express = require('express');
var router = express.Router();
var Db = require('../modules/db');
var result = require('../modules/response-result')
var uniqid = require('uniqid');

var Test = Db.extend({ tableName : "test"});
var test = new Test();
router.use(function(req,res,next){
    next();
});

router.post('/',function(req,res){
    if(req.body.cid && req.body.testid)
    {
        test.query("SELECT * FROM course, department, test WHERE course.deptid = department.deptid and course.cid = test.cid AND test.testid =('"+req.body.testid+"') AND course.cid = ('"+req.body.cid+"')",function(err,rows,fields){
            if(err){
                 res.send({errorCode:1,message:"Database Error!",status:"error"});
            }
            if(rows.length==0){
                res.send({errorCode:1,message:"No data show!",status:"nodata"});
            }
            else{
                 res.send( {errorCode:0,message:"successfully",status:"successfully",data:rows});
                
            }
        });
    }
    else
    {
        res.send({errorCode:2,message:"Missing fields",status:"fail"});
    }
});

router.post('/Question',function(req,res){
    if(req.body.testid)
    {
        test.query("SELECT * FROM question, test WHERE question.testid = test.testid AND test.testid = ('"+req.body.testid+"')",function(err,rows,fields){
            if(err){
                 res.send({errorCode:1,message:"Database Error!",status:"error"});
            }
            if(rows.length==0){
                res.send({errorCode:1,message:"No data show!",status:"nodata"});
            }
            else{
                 res.send( {errorCode:0,message:"successfully",status:"successfully",data:rows});
                
            }
        });
    }
    else
    {
        res.send({errorCode:2,message:"Missing fields",status:"fail"});
    }
});

module.exports = router
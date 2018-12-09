var express = require('express');
var router = express.Router();
var Db = require('../modules/db');
var result = require('../modules/response-result')
var uniqid = require('uniqid');

var DeptCourse = Db.extend({ tableName : "departmentcourse"});
var deptCourse = new DeptCourse();

router.use(function(req,res,next){
    next();
});

router.post('/',function(req,res){
    if (req.body.deptid) {
        deptCourse.query(
            `SELECT * FROM department dpt, departmentcourse dc, user u, student std WHERE u.role = 2 AND std.deptid = `+req.body.deptid+` AND dc.dcid = std.dcid AND u.uid = std.uid AND dpt.deptid = std.deptid`
            ,function(err,rows,fields){
             if(err){
                 res.send({errorCode:1,message:"Database Error!",status:"error"});
             }
             else{
                res.send({errorCode:0,message:"successfully",status:"successfully",data:rows});
             }
         });
    } else {
        deptCourse.query(
            `SELECT * FROM department dpt, departmentcourse dc, user u, student std WHERE u.role = 2 AND dc.dcid = std.dcid AND u.uid = std.uid AND dpt.deptid = std.deptid`
            ,function(err,rows,fields){
             if(err){
                 res.send({errorCode:1,message:"Database Error!",status:"error"});
             }
             else{
                res.send({errorCode:0,message:"successfully",status:"successfully",data:rows});
             }
         });
    }
 });

 router.post('/searchByMark',function(req,res){
    if (req.body.min && req.body.max) {
        deptCourse.query(
            `SELECT * FROM department dpt, departmentcourse dc, user u, student std, report rpt WHERE u.role = 2 AND dc.dcid = std.dcid AND u.uid = std.uid AND dpt.deptid = std.deptid AND rpt.stdid = std.stdid AND rpt.marks BETWEEN `+req.body.min+` AND `+req.body.max+``
            ,function(err,rows,fields){
             if(err){
                 res.send({errorCode:1,message:"Database Error!",status:"error"});
             }
             else{
                res.send({errorCode:0,message:"successfully",status:"successfully",data:rows});
             }
         });
    } else {
        deptCourse.query(
            `SELECT * FROM department dpt, departmentcourse dc, user u, student std, report rpt WHERE u.role = 2 AND dc.dcid = std.dcid AND u.uid = std.uid AND dpt.deptid = std.deptid AND rpt.stdid = std.stdid AND rpt.marks BETWEEN 0 AND 10`
            ,function(err,rows,fields){
             if(err){
                 res.send({errorCode:1,message:"Database Error!",status:"error"});
             }
             else{
                res.send({errorCode:0,message:"successfully",status:"successfully",data:rows});
             }
         });
    }
 });

module.exports = router
var express = require('express');
var router = express.Router();
var Db = require('../modules/db');
var result = require('../modules/response-result')
var uniqid = require('uniqid');

var Report = Db.extend({ tableName : "report"});
var report = new Report();

router.use(function(req,res,next){
    next();
});
router.post('/',function(req,res){
    if(req.body.cid)
    {
        report.query("Select report.*,student.fullname,test.testname,user.username,course.cname from report,student,test,user,course WHERE report.cid =('"+req.body.cid+"') AND student.stdid = report.stdid AND report.testid = test.testid AND report.uid = user.uid AND report.cid = course.cid",function(err,rows,fields){
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
    }  
 });
 module.exports = router
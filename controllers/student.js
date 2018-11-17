var express = require('express');
var router = express.Router();
var Db = require('../modules/db');
var result = require('../modules/response-result')
var uniqid = require('uniqid');

var Student = Db.extend({ tableName : "student"});
var student = new Student();
var DeptCourse = Db.extend({ tableName : "departmentcourse"});
var deptCourse = new DeptCourse();
router.use(function(req,res,next){
    next();
});
//Get student on Admin Page
router.get('/',function(req,res){
    student.query('SELECT * from user,student,department WHERE user.uid = student.uid AND student.deptid = department.deptid',function(err,rows,fields){
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
router.get('/student',function(req,res){
    if(req.headers.authorization)
    {
        student.query("SELECT * from user,student,department WHERE user.uid = student.uid AND student.deptid = department.deptid AND user.token=('"+req.headers.authorization+"')",function(err,rows,fields){
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
  router.post('/',function(req,res){
      if(req.body.password&&req.body.role&&req.body.active&&req.body.deptid&&req.body.dcid&&req.body.total&&req.body.username)
      {
        deptCourse.find('first',{where: "dcid="+req.body.dcid},function(err,rows,fields){
            if(err){
                res.send({errorCode:1,message:"Database Error",status:"error"});
            }
            if(rows.length==0)
            {
                res.send({errorCode:1,message:"No data show",status:"error"});
            }
            else{
        student.query('BEGIN', function(err, result) {
            if(err) 
            {
                res.send({errorCode:1,message:"Database Error!",status:"error"});
            }
            else
            {
            var i = 0;
            do {
                i++;          
                req.body.username++;
                student.query("INSERT INTO user(username, password, role,active)VALUES(CONCAT('"+rows.dcname+"',"+req.body.username+"), "+req.body.password+","+req.body.role+","+req.body.active+")", function(err, result) {
                    if(err) 
                    {
                        res.send({errorCode:1,message:"Database Error!",status:"error"});
                    }
                });
            } while (i!=req.body.total){
                    student.query(`
                    INSERT INTO student (uid, deptid, dcid) 
                        SELECT u.uid,dept.deptid,dc.dcid 
                        FROM user u,department dept, departmentcourse dc
                        WHERE u.role =`+req.body.role+` AND dept.deptid = `+req.body.deptid+`
                            AND dc.dcid = `+req.body.dcid+` AND NOT EXISTS(SELECT stu.uid FROM student stu WHERE u.uid = stu.uid)`,function(err, result2) {
                        if(err) 
                        {
                            res.send({errorCode:1,message:"Database Error!",status:"error"});
                        }
                        else
                        {
                            res.send({errorCode:0,message:"Inserted successfully",status:"successfully",data:result});
                            student.query('COMMIT');
                        }
                    }); 
                }
            }
        });
    } 
    });
}
else
{
    console.log(res)
    res.send({errorCode:2,message:"Missing fields",status:"error"});
}
});           
     
       
 
module.exports = router
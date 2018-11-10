var express = require('express');
var router = express.Router();
var Db = require('../modules/db');
var result = require('../modules/response-result')
var uniqid = require('uniqid');

var Course = Db.extend({ tableName : "course"});
var course = new Course();

router.use(function(req,res,next){
    next();
});
router.post('/coursebycourseid',function(req,res){
    if(req.body.cid)
    {
        course.find('first',{where: "cid="+req.body.cid},function(err,rows,fields){
            if(err){
                res.send({errorCode:1,message:"Database Error",status:"error"});
            }
            if(rows.length==0)
            {
                res.send({errorCode:1,message:"No data show",status:"error"});
            }
            else{
                res.send({errorCode:0,message:"successfully",status:"successfully",data:rows});
            }
        });
    }
    else
    {
        res.send({errorCode:2,message:"Missing fields",status:"error"});
    }
}) 
router.get('/',function(req,res){
   if(req.headers.authorization)
   {
    course.query("SELECT course.*,department.dept_name FROM course,user,department,instructor WHERE course.deptid = department.deptid AND user.uid = instructor.uid AND instructor.deptid = department.deptid AND user.token =('"+req.headers.authorization+"')",function(err,rows,fields){
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
router.get('/courseforstudent',function(req,res){
   if(req.headers.authorization)
   {
    course.query("SELECT course.*,department.dept_name FROM course,user,department,student WHERE course.deptid = department.deptid AND user.uid = student.uid AND student.deptid = department.deptid AND user.token =('"+req.headers.authorization+"')",function(err,rows,fields){
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
router.get('/departmentbyid',function(req,res){
    if(req.headers.authorization)
   {
    course.query("SELECT department.* FROM user,department,instructor WHERE user.uid = instructor.uid AND instructor.deptid = department.deptid AND user.token =('"+req.headers.authorization+"')",function(err,rows,fields){
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
router.post('/',function(req,res){
    if(req.body.mcode&&req.body.mname&&req.body.ccode&&req.body.cname&&req.body.deptid)
      {
        course.set('mcode',req.body.mcode);
        course.set('mname',req.body.mname);
        course.set('ccode',req.body.ccode);
        course.set('cname',req.body.cname);
        course.set('ects',req.body.ects);
        course.set('year',req.body.year);
        course.set('sem',req.body.sem);
        course.set('deptid',req.body.deptid);
        course.save(function(err,row){
            if(err)
            {
                res.send({errorCode:1,message:"Cant Insert! Database Error",status:"error"});
            }
            else
            {
                res.send({errorCode:0,message:"Inserted successfully",status:"successfully"});
            }
        })
      }
      else
      {
        res.send({errorCode:2,message:"Missing fields",status:"error"});
      }

})
router.post('/coursebyid',function(req,res){
    if(req.body.rowId)
    {
        course.find('first',{where: "cid="+req.body.rowId},function(err,rows,fields){
            if(err){
                res.send({errorCode:1,message:"Database Error",status:"error"});
            }
            if(rows.length==0)
            {
                res.send({errorCode:1,message:"No data show",status:"error"});
            }
            else{
                res.send({errorCode:0,message:"successfully",status:"successfully",data:rows});
            }
        });
    }
    else
    {
        res.send({errorCode:2,message:"Missing fields",status:"error"});
    }
}) 
router.put('/',function(req,res){
    if(req.body.rowId)
    {
        course.set('mcode',req.body.Course.mcode);
        course.set('mname',req.body.Course.mname);
        course.set('ccode',req.body.Course.ccode);
        course.set('cname',req.body.Course.cname);
        course.set('ects',req.body.Course.ects);
        course.set('year',req.body.Course.year);
        course.set('sem',req.body.Course.sem);
        course.set('deptid',req.body.Course.deptid);
        course.save("cid="+req.body.rowId,function(err,row){
            if(err)
            {
                res.send({errorCode:1,message:"Cant Update! Database Error",status:"error"});
            }
            else
            {
                res.send({errorCode:0,message:"Updated successfully",status:"successfully"});
            }
        })
    }
    else
    {
        res.send({errorCode:2,message:"Missing fields",status:"error"});
    }
})
router.delete('/:rowId(\\d+)',function(req,res){
    if(req.params.rowId){
        course.find('count',{where:"cid="+req.params.rowId}, function(err, result){
            if(err)
                res.send(err);
            else if(result > 0){
                course.remove("cid="+req.params.rowId, function(err,row){
                    if(err)
                        res.send({errorCode:1,message:"Database Error!",status:"error"});
                    else
                        res.send({errorCode:0,message:"Deleted Successfully!",status:"successfully"});
                });
            }else{
                res.send({errorCode:3,message:"Data Not Found!",status:"error"});
            }
        })
    }
    
})
module.exports = router
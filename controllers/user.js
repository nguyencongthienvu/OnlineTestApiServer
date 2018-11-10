var express = require('express');
var router = express.Router();
var Db = require('../modules/db');
var result = require('../modules/response-result')

var User = Db.extend({ tableName : "user"});
// var Student = Db.extend({tableName : "student"});
// var Instructor = Db.extend({tableName: "instructor"});
var user = new User();

router.use(function(req,res,next){
    next();
});


//Get instructor on Admin page
router.get('/instructors',function(req,res){
    user.query('SELECT * from user,instructor,department WHERE user.uid = instructor.uid AND instructor.deptid = department.deptid',function(err,rows,fields){
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
//get department on Admin page
router.get('/department',function(req,res){
    user.query('SELECT * from department',function(err,rows,fields){
        if(err){
            res.send({errorCode:1,message:"Database Error!",status:"error"});
        }
        if(rows.length==0)
        {
            res.send({errorCode:1,message:"No data show!",status:"nodata"});
        }
        else{
            res.send(result.data(rows));
        }
    });
});
router.delete('/:rowId(\\d+)',function(req,res){
    if(req.params.rowId){
        user.find('count',{where:"uid="+req.params.rowId}, function(err, result){
            if(err)
                res.send(err);
            else if(result > 0){
                user.remove("uid="+req.params.rowId, function(err,row){
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
router.post('/userbyid',function(req,res){
    if(req.body.rowId)
    {
        user.find('first',{where: "uid="+req.body.rowId},function(err,rows,fields){
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
router.put('/instructor',function(req,res){
    if(req.body.Instructor.active && req.body.rowId )
    { 
        user.set('active',req.body.Instructor.active);
        user.save("uid="+req.body.rowId,function(err,row){
            if(err)
            {
                res.send({errorCode:1,message:"Cant Update! Database Error",status:"fail"});
            }
            else
            {
                res.send({errorCode:0,message:"Updated successfully",status:"successfully"});
            }
        })  
    
    }
    else
    {
        res.send({errorCode:2,message:"Missing fields",status:"fail"});
    }
})
router.put('/student',function(req,res){
         if(req.body.Student.active && req.body.rowId)
        {
            user.set('active',req.body.Student.active);
            user.save("uid="+req.body.rowId,function(err,row){
                if(err)
                {
                    res.send({errorCode:1,message:"Cant Update! Database Error",status:"fail"});
                }
                else
                {
                    res.send({errorCode:0,message:"Updated successfully",status:"successfully"});
                }
            })
        }
    else
    {
        res.send({errorCode:2,message:"Missing fields",status:"fail"});
    }
})
module.exports = router
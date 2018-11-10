var express = require('express');
var router = express.Router();
var Db = require('../modules/db');
var result = require('../modules/response-result')
var uniqid = require('uniqid');

var Department = Db.extend({ tableName : "department"});
var department = new Department();

router.use(function(req,res,next){
    next();
});

router.post('/',function(req,res){
    if(req.body.dept && req.body.dept_name)
    {
        department.set('dept',req.body.dept);
        department.set('dept_name',req.body.dept_name);
        department.save(function(err,row){
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
router.put('/',function(req,res){
    if(req.body.Department.dept && req.body.Department.dept_name && req.body.rowId)
    {
        department.set('dept',req.body.Department.dept);
        department.set('dept_name',req.body.Department.dept_name);
        department.save("deptid="+req.body.rowId,function(err,row){
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
        department.find('count',{where:"deptid="+req.params.rowId}, function(err, result){
            if(err)
                res.send(err);
            else if(result > 0){
                department.remove("deptid="+req.params.rowId, function(err,row){
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
router.post('/departmentbyid',function(req,res){
    if(req.body.rowId)
    {
        department.find('first',{where: "deptid="+req.body.rowId},function(err,rows,fields){
            if(err){
                res.send({errorCode:1,message:"Database Error",status:"error"});
            }
            if(rows.length==0)
            {
                res.send({errorCode:1,message:"No data show",status:"nodata"});
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
module.exports = router
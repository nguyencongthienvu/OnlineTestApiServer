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

router.get('/',function(req,res){
    if(req.headers.authorization)
    {
        deptCourse.find('all', function(err, result){
            if(err){
                res.send({errorCode:1,message:"Database Error",status:"error"});
            }
            if(result.length==0){
                res.send({errorCode:1,message:"No data show!",status:"nodata"});
            }
            else{
                res.send({errorCode:0,message:"successfully",status:"successfully",data:result});
            }
        });
    } else {
        res.send({errorCode:2,message:"Missing fields",status:"fail"});
    }
});

router.post('/',function(req,res){
    if(req.body.dcname && req.headers.authorization)
    {
        deptCourse.set('dcname',req.body.dcname);
        deptCourse.set('dcdetail',req.body.dcdetail);
        deptCourse.save(function(err,row){
            if(err)
            {
                console.log(err)
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
    if(req.headers.authorization)
    {
        deptCourse.find('first', {where: "dcid = '" + req.body.id + "'"}, function(err, result){
            if(err){
                res.send({errorCode:1,message:"Database Error",status:"error"});
            }
            if(result.length==0){
                res.send({errorCode:1,message:"No data show!",status:"nodata"});
            }
            else{
                res.send({errorCode:0,message:"successfully",status:"successfully",data:result});
            }
        });
    } else {
        res.send({errorCode:2,message:"Missing fields",status:"fail"});
    }
});

router.put('/',function(req,res){
    if(req.body.id && req.headers.authorization)
    {
        deptCourse.set('dcname',req.body.dcname);
        deptCourse.set('dcdetail',req.body.dcdetail);
        deptCourse.save("dcid="+req.body.id,function(err,row){
            if(err)
            {
                console.log(err)
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
});

router.delete('/:id(\\d+)',function(req,res){
    if(req.params.id && req.headers.authorization){
        deptCourse.find('count',{where:"dcid="+req.params.id}, function(err, result){
            if(err)
                res.send(err);
            else if(result > 0){
                deptCourse.remove("dcid="+req.params.id, function(err,row){
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
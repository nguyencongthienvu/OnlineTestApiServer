var express = require('express');
var router = express.Router();
var Db = require('../modules/db');
var result = require('../modules/response-result')
var uniqid = require('uniqid');

var Topic = Db.extend({ tableName : "topic"});
var topic = new Topic();

router.use(function(req,res,next){
    next();
});
router.post('/',function(req,res){
   
    if(req.body.cid)
    {
        topic.query("SELECT topic.* FROM course,topic WHERE course.cid = topic.cid AND course.cid =('"+req.body.cid+"')",function(err,rows,fields){
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
router.post('/addtopic',function(req,res){
    if(req.body.cid && req.body.topicname)
    {
        topic.set('cid',req.body.cid);
        topic.set('topicname',req.body.topicname);
        topic.set('description',req.body.description);
        topic.save(function(err,row){
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
router.post('/topicbyid',function(req,res){
    if(req.body.rowId)
    {
        topic.find('first',{where: "tpid="+req.body.rowId},function(err,rows,fields){
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
router.delete('/:rowId(\\d+)',function(req,res){
    if(req.params.rowId){
        topic.find('count',{where:"tpid="+req.params.rowId}, function(err, result){
            if(err)
                res.send(err);
            else if(result > 0){
                topic.remove("tpid="+req.params.rowId, function(err,row){
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
router.put('/',function(req,res){
    if(req.body.rowId)
    {
        topic.set('topicname',req.body.Topic.topicname);
        topic.set('description',req.body.Topic.description);
        topic.save("tpid="+req.body.rowId,function(err,row){
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
 module.exports = router
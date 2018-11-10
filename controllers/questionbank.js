var express = require('express');
var router = express.Router();
var Db = require('../modules/db');
var result = require('../modules/response-result')
var uniqid = require('uniqid');

var Questionbank = Db.extend({ tableName : "questionbank"});
var questionbank = new Questionbank();

router.use(function(req,res,next){
    next();
});
router.post('/',function(req,res){
   
    if(req.body.tpid)
    {
        questionbank.query("SELECT questionbank.* FROM questionbank,topic WHERE questionbank.tpid = topic.tpid AND topic.tpid =('"+req.body.tpid+"')",function(err,rows,fields){
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
 router.post('/questionbankbyid',function(req,res){
    if(req.body.rowId)
    {
        questionbank.find('first',{where: "qnbid="+req.body.rowId},function(err,rows,fields){
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
router.post('/addquestion',function(req,res){
    if(req.body.tpid && req.body.question)
    {
        questionbank.set('tpid',req.body.tpid);
        questionbank.set('question',req.body.question);
        questionbank.set('optiona',req.body.optiona);
        questionbank.set('optionb',req.body.optionb);
        questionbank.set('optionc',req.body.optionc);
        questionbank.set('optiond',req.body.optiond);
        questionbank.set('correctanswer',req.body.correctanswer);
        questionbank.set('level',req.body.level);
        questionbank.save(function(err,row){
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
});
router.delete('/:rowId(\\d+)',function(req,res){
    if(req.params.rowId){
        questionbank.find('count',{where:"qnbid="+req.params.rowId}, function(err, result){
            if(err)
                res.send(err);
            else if(result > 0){
                questionbank.remove("qnbid="+req.params.rowId, function(err,row){
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
        questionbank.set('question',req.body.BankQuestion.question);
        questionbank.set('optiona',req.body.BankQuestion.optiona);
        questionbank.set('optionb',req.body.BankQuestion.optionb);
        questionbank.set('optionc',req.body.BankQuestion.optionc);
        questionbank.set('optiond',req.body.BankQuestion.optiond);
        questionbank.set('correctanswer',req.body.BankQuestion.correctanswer);
        questionbank.set('level',req.body.BankQuestion.level);
        questionbank.save("qnbid="+req.body.rowId,function(err,row){
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
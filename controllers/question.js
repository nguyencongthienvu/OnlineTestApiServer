var express = require('express');
var router = express.Router();
var Db = require('../modules/db');
var result = require('../modules/response-result')
var uniqid = require('uniqid');

var Question = Db.extend({ tableName : "question"});
var question = new Question();

router.use(function(req,res,next){
    next();
});

router.post('/',function(req,res){
    if(req.body.testid){
        question.find('count',{where:"testid="+req.body.testid}, function(err, result){
            if(err){
                res.send({errorCode:1,message:"Database Error",status:"error"});
            }
            else{
                res.send({errorCode:0,message:"successfully",status:"successfully",data:{'total':result}});
            }
        });
    }
    else
    {
        res.send({errorCode:2,message:"Missing fields",status:"error"});
    }
    
})
router.post('/generate',function(req,res){
    if(req.body.testid&&req.body.tpid&&req.body.limit&&req.body.mark)
    {
        
        question.query('BEGIN', function(err, result) {
          if(err) 
          {
              console.log(err)
              res.send({errorCode:1,message:"Database Error!",status:"error"});
          }
          else
          {
            question.query("INSERT INTO question(testid,question,optiona,optionb,optionc,optiond,correctanswer,level,mark) SELECT test.testid,questionbank.question,questionbank.optiona,questionbank.optionb,questionbank.optionc,questionbank.optiond,questionbank.correctanswer,questionbank.level,'"+req.body.mark+"' FROM test,questionbank WHERE test.testid ="+req.body.testid+" AND questionbank.tpid= "+req.body.tpid+" ORDER BY RAND() LIMIT "+req.body.limit+"",function(err, result) {
                      if(err) 
                      {
                        console.log(err)
                          res.send({errorCode:1,message:"Database Error!",status:"error"});
                      }
                      else
                      {
                          res.send({errorCode:0,message:"Inserted successfully",status:"successfully",data:result});
                          question.query('COMMIT');
                      }
                  
                  }); 
      }
  });
}
else
{
  res.send({errorCode:2,message:"Missing fields",status:"error"});
}
});  
router.post('/totalmark',function(req,res){
    if(req.body.testid){
        question.query("SELECT SUM(mark) as Total FROM question WHERE question.testid =('"+req.body.testid+"')",function(err,result,fields){
            if(err){
                res.send({errorCode:1,message:"Database Error",status:"error"});
            }
            else{
                res.send({errorCode:0,message:"successfully",status:"successfully",data:result});
            }
        });
    }
    else
    {
        res.send({errorCode:2,message:"Missing fields",status:"error"});
    }
    
})
router.post('/findall',function(req,res){
    if(req.body.testid){
        question.find('all',{where:"testid="+req.body.testid}, function(err, result){
            if(err){
                res.send({errorCode:1,message:"Database Error",status:"error"});
            }
            else{
                res.send({errorCode:0,message:"successfully",status:"successfully",data:result});
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
        question.find('count',{where:"qnid="+req.params.rowId}, function(err, result){
            if(err)
                res.send(err);
            else if(result > 0){
                question.remove("qnid="+req.params.rowId, function(err,row){
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
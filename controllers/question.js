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
    if(req.body.testid && req.body.token){
        question.find('all',{where:"testid="+req.body.testid}, function(err, result){
            if(err){
                res.send({errorCode:1,message:"Database Error",status:"error"});
            }
            else{           
                question.query("SELECT studentquestionreport.* FROM studentquestionreport, user WHERE user.token =('"+req.body.token+"') and testid =('"+req.body.testid+"')  ORDER BY qnid ",function(err,dataAnswer){
                    if(err){
                        res.send({errorCode:1,message:"Database Error",status:"error"});
                    }
                    else if(dataAnswer.length==0){
                        question.query("SELECT qnid FROM question where testid =('"+req.body.testid+"')",function(err,array){
                            for (var i = 0; i < array.length; i++) {
                                question.query("Insert into studentquestionreport(testid, qnid, uid, answered) value('1', "+array[i].qnid+", '1', 'unanswered')",function(err,array){
                                    if (err){
                                        res.send({errorCode:1,message:"Database Error",status:"error"});
                                    }
                                });
                            }
                            res.send({errorCode:0,message:"successfully",status:"successfully",data:result});
                        });
                    } else {
                         res.send({errorCode:0,message:"successfully",status:"successfully",data:result});
                    }
                });
            }
        });
    }
    else
    {
        res.send({errorCode:2,message:"Missing fields",status:"error"});
    }
    
})

router.post('/findalladmin',function(req,res){
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

router.post('/takeInfo',function(req,res){
    if(req.body.token&&req.body.testid)
    {
        question.query("Select user.username, test.testto from user, test where token =('"+req.body.token+"') and testid =('"+req.body.testid+"')",function(err,rows,fields){
         if(err){
             res.send({errorCode:1,message:"Database Error!",status:"error"});
         }
         if(rows.length==0){
             res.send({errorCode:1,message:"No data show!",status:"nodata",data:rows});
         }
         else{
             res.send(result.data(rows));
         }
     });
    }  
}); 

router.post('/stdanswer',function(req,res){
    if(req.body.token&&req.body.testid)
    {
        question.query("SELECT studentquestionreport.* FROM studentquestionreport, user WHERE token =('"+req.body.token+"') and testid =('"+req.body.testid+"')  ORDER BY qnid ",function(err,result){
            if(err){
                res.send({errorCode:1,message:"Database Error",status:"error"});
            }
            else{
                res.send({errorCode:0,message:"successfully",status:"successfully",data:result});
            }
     });
    }  
}); 

router.post('/updateAnswer',function(req,res){
    if(req.body.Data.uid && req.body.Data.testid && req.body.Value && req.body.Data.qnid)
    {       
        question.query("UPDATE studentquestionreport SET stdanswer =('"+req.body.Value+"'), answered = 'answered' where qnid =('"+req.body.Data.qnid+"') AND testid =('"+req.body.Data.testid+"') and uid =('"+req.body.Data.uid+"')  ",function(err,result){
            if(err){
                res.send({errorCode:1,message:"Database Error",status:"error"});
            }
            else{
                res.send({errorCode:0,message:"successfully",status:"successfully"});
            }
     });
    }  
}); 
module.exports = router
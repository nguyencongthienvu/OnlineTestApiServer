var express = require('express');
var router = express.Router();
var Db = require('../modules/db');
var result = require('../modules/response-result')
var uniqid = require('uniqid');

var Test = Db.extend({ tableName : "test"});
var test = new Test();

router.use(function(req,res,next){
    next();
});

router.post('/testbytestid',function(req,res){
    if(req.body.testid)
    {
        test.find('first',{where: "testid="+req.body.testid},function(err,rows,fields){
            if(err){
                res.send({errorCode:1,message:"Database Error",status:"error"});
            }
            if(rows.length==0)
            {
                res.send({errorCode:1,message:"No data show",status:"error",data:rows});
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
}); 
 router.post('/',function(req,res){
    if(req.body.cid)
    {
        test.query("SELECT test.* FROM test,course WHERE test.cid = course.cid AND course.cid =('"+req.body.cid+"')",function(err,rows,fields){
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
 router.post('/addtest',function(req,res){
    if(req.body.testname&&req.body.cid)
      {
        test.set('testname',req.body.testname);
        test.set('testdescription',req.body.testdescription);
        test.set('testfrom',req.body.testfrom);
        test.set('testto',req.body.testto);
        test.set('cid',req.body.cid);
        test.set('totalquestions',req.body.totalquestions);
        test.set('duration',req.body.duration);
        test.set('code',req.body.code);
        test.save(function(err,row){
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
router.delete('/:rowId(\\d+)',function(req,res){
    if(req.params.rowId){
        test.find('count',{where:"testid="+req.params.rowId}, function(err, result){
            if(err)
                res.send(err);
            else if(result > 0){
                test.remove("testid="+req.params.rowId, function(err,row){
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
router.post('/testbyid',function(req,res){
    if(req.body.rowId)
    {
        test.find('first',{where: "testid="+req.body.rowId},function(err,rows,fields){
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
}); 
router.put('/',function(req,res){
    if(req.body.rowId)
    {
        test.set('testname',req.body.Test.testname);
        test.set('testdescription',req.body.Test.testdescription);
        test.set('testfrom',req.body.Test.testfrom);
        test.set('testto',req.body.Test.testto);
        test.set('totalquestions',req.body.Test.totalquestions);
        test.set('duration',req.body.Test.duration);
        test.set('code',req.body.Test.code);
        test.save("testid="+req.body.rowId,function(err,row){
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
router.post('/takeexam',function(req,res){
        if(req.body.uid&&req.body.cid)
        {
            test.query("select t.*,c.cname from test as t, course as c where c.cid=t.cid AND t.cid =('"+req.body.cid+"') and DATE_FORMAT(CURRENT_TIMESTAMP,('%d/%m/%y %h'))=DATE_FORMAT(t.testfrom,('%d/%m/%y %h')) and t.testfrom < t.testto and t.totalquestions=(select count(*) from question where testid=t.testid)  and NOT EXISTS(select uid,testid from studenttestreport where testid=t.testid and uid=('"+req.body.uid+"')) AND EXISTS(SELECT * FROM student,course,user WHERE course.deptid = student.deptid and student.uid = user.uid AND user.uid =('"+req.body.uid+"')) ORDER BY RAND() LIMIT 1",function(err,rows,fields){
             if(err){
                 console.log(err)
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
router.post('/result',function(req,res){
    if(req.body.Course.stdid&&req.body.Course.cid&&req.body.Course.uid&&req.body.Course.testid&&req.body.Course.testdate)
    {   var marksum = 0;
        var number = 0;
        for(var i = 0, j =0;i<req.body.data.length&& j<req.body.answer.length;i++,j++)
      { 
        if(req.body.data[i].correctanswer == req.body.answer[j].stdanswer)
        {
          number++;
          marksum += parseInt(req.body.data[i].mark); 
        }
        else
        {
          marksum +=0;
        }
      }
        var date = new Date();
        var fullDate = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
        test.query("Insert into report(stdid,cid,uid,testid,marks,maxmarks,testdate) VALUES("+req.body.Course.stdid+","+req.body.Course.cid+","+req.body.Course.uid+","+req.body.Course.testid+","+marksum+",10,'"+fullDate+"')", function(err, result) {
            if(err) 
            {
                res.send({errorCode:1,message:"Database Error!",status:"error"});
            }
            else
                {
                    res.send({errorCode:0,message:"Inserted successfully",status:"successfully", data:marksum});
                    test.query("Insert into studenttestreport(testid,uid,correctlyanswerd,status) VALUES("+req.body.Course.testid+","+req.body.Course.uid+","+number+",'over')", function(err, result) {
                        if(err) 
                        {
                            res.send({errorCode:1,message:"Database Error!",status:"error"});
                        } 
                    })
                }     
        })
    }
    else
    {
        res.send({errorCode:2,message:"Missing fields",status:"error"});
    }
})

router.post('/getAnswer',function(req,res){
    if(req.body.testid&&req.body.token)
    {
        test.query("SELECT studenttestreport.*, COUNT(question.qnid) as total ,report.marks, report.maxmarks FROM studenttestreport, question,user,report WHERE user.uid = studenttestreport.uid AND question.testid = studenttestreport.testid AND studenttestreport.testid =('"+req.body.testid+"')  AND user.token=('"+req.body.token+"') AND user.uid = report.uid",function(err,rows,fields){
         if(err){
             console.log(err)
             res.send({errorCode:1,message:"Database Error!",status:"error"});
         }
         if(rows.length==0){
             res.send({errorCode:1,message:"No data show!",status:"nodata",data:rows});
         }
         else{
             res.send(result.data(rows));
         }
     });
    } else {
        res.send({errorCode:2,message:"No data show!",status:"nodata"});
    }  
}); 

router.post('/getDetailAnswer',function(req,res){
    if(req.body.testid&&req.body.token)
    {
        test.query("SELECT question.qnid, question.question, question.mark, question.correctanswer, studentquestionreport.stdanswer FROM studentquestionreport, question, user WHERE studentquestionreport.qnid = question.qnid AND studentquestionreport.uid = user.uid AND studentquestionreport.testid =('"+req.body.testid+"')  AND user.token=('"+req.body.token+"')",function(err,rows,fields){
         if(err){
             console.log(err)
             res.send({errorCode:1,message:"Database Error!",status:"error"});
         }
         if(rows.length==0){
             res.send({errorCode:1,message:"No data show!",status:"nodata",data:rows});
         }
         else{
             res.send(result.data(rows));
         }
     });
    } else {
        res.send({errorCode:2,message:"No data show!",status:"nodata"});
    }  
}); 

router.post('/chooseExam',function(req,res){
    if(req.body.cid&&req.body.token)
    {
        test.query(" SELECT test.* FROM test, course WHERE course.cid = test.cid AND course.cid =('"+req.body.cid+"') AND EXISTS(SELECT report.testid FROM report, user WHERE report.testid = test.testid AND report.uid = user.uid AND user.token=('"+req.body.token+"'))",function(err,rows,fields){
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
    } else {
        res.send({errorCode:2,message:"No data show!",status:"nodata"});
    }  
}); 



module.exports = router
  
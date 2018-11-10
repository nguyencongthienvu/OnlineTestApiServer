var express = require('express');
var router = express.Router();
var Db = require('../modules/db');
var result = require('../modules/response-result')
var uniqid = require('uniqid');

var Instructor = Db.extend({ tableName : "instructor"});
var instructor = new Instructor();
router.use(function(req,res,next){
    next();
});
router.get('/',function(req,res){
    if(req.headers.authorization)
    {
        instructor.query("SELECT * from user,instructor,department WHERE user.uid = instructor.uid AND instructor.deptid = department.deptid AND user.token=('"+req.headers.authorization+"')",function(err,rows,fields){
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
//get de
  router.post('/',function(req,res){
      if(req.body.username&&req.body.password&&req.body.role&&req.body.active&&req.body.deptid)
      {
          
        instructor.query('BEGIN', function(err, result) {
            if(err) 
            {
                res.send({errorCode:1,message:"Database Error!",status:"error"});
            }
            else
            {
                
                instructor.query("INSERT INTO user(username, password, role,active)VALUES('"+req.body.username+"',"+req.body.password+","+req.body.role+","+req.body.active+")", function(err, result) {
                if(err) 
                {

                    res.send({errorCode:1,message:"Database Error!",status:"error"});
                }
                else
                {
                    instructor.query("INSERT INTO instructor (uid, deptid) SELECT u.uid,dept.deptid FROM user u,department dept WHERE u.role ="+req.body.role+" AND dept.deptid = "+req.body.deptid+" AND NOT EXISTS(SELECT ins.uid FROM instructor ins WHERE u.uid = ins.uid)",function(err, result) {
                        if(err) 
                        {
                            res.send({errorCode:1,message:"Database Error!",status:"error"});
                        }
                        else
                        {
                            res.send({errorCode:0,message:"Inserted successfully",status:"successfully",data:result});
                            instructor.query('COMMIT');
                        }
                    
                    }); 
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
//Edit profile
router.put('/',function(req,res){
    if(req.body.token&&req.body.Profile.password)
    {
        instructor.query("UPDATE instructor,user SET instructor.fullname='"+req.body.Profile.fullname+"',instructor.sex='"+req.body.Profile.sex+"',instructor.email='"+req.body.Profile.email+"',user.password='"+req.body.Profile.password+"'WHERE instructor.uid = user.uid AND user.token=('"+req.body.token+"')",function(err,result){
            if(err) 
                {
                    console.log(err)
                    res.send({errorCode:1,message:"Database Error!",status:"nodata"});
                }
            else
                {
                    res.send({errorCode:0,message:"Updated successfully",status:"successfully",data:result});
                }
        });
    }
    else
    {
        res.send({errorCode:2,message:"Missing fields",status:"error"});
    }
});       
     
       
 
module.exports = router
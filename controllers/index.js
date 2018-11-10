var express = require('express');
var router = express.Router();
//user
var user = require('./user');
router.use('/user',user);
var logins = require('./logins');
router.use('/login',logins);
var status = require('./status');
router.use('/status',status);
var department =require('./department');
router.use('/department',department);
var student = require('./student');
router.use('/student',student);
var instructor = require('./instructor');
router.use('/instructor',instructor);
var course = require('./course');
router.use('/course',course);
var topic = require('./topic');
router.use('/topic',topic);
var questionbank = require('./questionbank');
router.use('/questionbank',questionbank);
var test = require('./test');
router.use('/test',test);
var report = require('./report');
router.use('/report',report);
var question = require('./question');
router.use('/question',question);
var deptcourse = require('./departmentcourse');
router.use('/deptcourse',deptcourse);
var search = require('./search');
router.use('/search',search);
var print = require('./print');
router.use('/print', print);

module.exports = router
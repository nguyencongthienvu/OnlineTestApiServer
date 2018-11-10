var mysqlModel = require('mysql-model');
var MyAppModel = mysqlModel.createConnection({
    host     : 'localhost',
    port:3306,
    user     : 'root',
    password : '',
    database : 'onlinetest',
  });

module.exports=MyAppModel;

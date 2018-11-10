var result={
    errorCode:0,
    message:'',
    status:'',
}
function message(mess)
{
    result.message=mess;
    result.data=null;
    return result;
}
function error(code,mess,stat)
{
    result.errorCode=code;
    result.message=mess;
    result.status = stat;
    return result;
}
function data(json)
{
    result.message='';
    result.data=json;
    return result;
}
module.exports={
    message:message,
    error:error,
    data:data

};
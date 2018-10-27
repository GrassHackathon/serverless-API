module.exports = async function (context, req) {
    context.res = {
        headers : {
            'Access-Control-Allow-Methods' : 'GET', 
            'Access-Control-Allow-Headers' : 'X-PINGOTHER, Content-Type, X-Requested-With',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Max-Age' : '86400',
        },
        body : ''
    }
};
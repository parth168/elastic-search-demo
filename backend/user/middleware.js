const { http_codes,message } = require('./constant');
const validate = require('./validate');
const response = require('./responseHandler');

function validateReqBody(req,res,next){
    if(req.body.name && req.body.email && req.body.mobile && req.body.country && req.body.state && req.body.district && req.body.pincode && req.body.addressline){
        let error = '';

        error += validate.validateEmail(req.body.email);
        if(error){
            error = response.errorResponse(http_codes.bad_request,error);
            res.status(http_codes.bad_request).send(error);
            return 0;
        }

        error += validate.validateMobileNumber(req.body.mobile);
        if(error){
            error = response.errorResponse(http_codes.bad_request,error);
            res.status(http_codes.bad_request).send(error);
            return 0;
        }

        next();

    }
    else{
        error = response.errorResponse(http_codes.bad_request,message.invalid_request_body);
        res.status(http_codes.bad_request).send(error);
    }
}

function validateUpdateBody(req,res,next){
    let error='';
    if(req.body.email){
        error += validate.validateEmail(req.body.email);
        if(error){
            error = response.errorResponse(http_codes.bad_request,error);
            res.status(http_codes.bad_request).send(error);
            return 0;
        }
    }
    if(req.body.mobile){
        error += validate.validateMobileNumber(req.body.mobile);
        if(error){
            error = response.errorResponse(http_codes.bad_request,error);
            res.status(http_codes.bad_request).send(error);
            return 0;
        }
    }
    next();
}

module.exports = { validateReqBody,validateUpdateBody };
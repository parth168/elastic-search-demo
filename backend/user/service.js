const dao =  require('./dao');
const response = require('./responseHandler');
const { http_codes,message,index } = require('./constant');

function addUser(req){
    return dao.search({
        index: index.user,
        body: {
            query:{
                match: {
                    email : req.body.email
                }
            }
        }
    })
    .then((result)=>{
        if(result.hits.total.value){
            return response.errorResponse(http_codes.forbidden,message.already_exsist_user);
        }
        else{
            return dao.insertDoc({
                index: index.user,
                body:{
                    full_name: req.body.name,
                    email: req.body.email,
                    mobile_number: req.body.mobile,
                    address: {
                        country: req.body.country,
                        state: req.body.state,
                        district: req.body.district,
                        pin_code: req.body.pincode,
                        address_line: req.body.addressline
                    }
                }
            })
            .then((result)=>{
                return response.success(message.addedData,result);
            })
            .catch((error)=>{
                console.log({ error });
                return response.errorResponse(http_codes.internalServerError,message.internalServerError);
            });
        }
    })
    .catch((error)=>{
        console.log({ error });
        return response.errorResponse(http_codes.internalServerError,message.internalServerError);
    });
}

function getById(req){
    return dao.getById({
        index: index.user,
        id: req.params.id
    })
    .then((result)=>{
        if(!result){
            return response.errorResponse(http_codes.forbidden,message.data_Not_Exist);
        }
        else{
            return response.success(message.userDetails,result);
        }
    })
    .catch((error)=>{
        console.log({ error });
        return response.errorResponse(http_codes.internalServerError,message.internalServerError); 
    });
}

function getUsers(req){
    let search = req.query.search.toLowerCase() || '';
    let size = req.query.size || 10;
    let from = (req.query.currentPage*size)-size || 0;
    let sort = "";
    
    if(req.query.sort){
        if(req.query.sort == 'name'){
            sort = (req.query.order == 1) ? 'full_name.raw:asc' : 'full_name.raw:desc' ;
        }
        else if(req.query.sort == 'email'){
            sort = (req.query.order == 1) ? 'email:asc' : 'email:desc' ;
        }
        else if(req.query.sort == 'mobile'){
            sort = (req.query.order == 1) ? 'mobile_number:asc' : 'mobile_number:desc' ;
        }
    }

    return dao.search({
        index: index.user,
        size: size,
        from: from,
        sort: sort,
        // q:'*'+search+'*'
        // body:{
        //     query:{
        //         match:{
        //             full_name:{
        //                 query: search,
        //                 fuzziness:2,
        //                 prefix_length:0
        //             }
        //         }
        //     }
        // }
        body:{
            query: {
                bool:{
                    should:[
                        {
                            wildcard: {
                                full_name: {
                                    value: '*'+search+'*'
                                }
                            }
                        },
                        {
                            wildcard: {
                                email: {
                                    value: '*'+search+'*'
                                }
                            }
                        },
                        {
                            wildcard: {
                                mobile_number: {
                                    value: '*'+search+'*'
                                }
                            }
                        }
                    ]
                }
            }
        }
    })
    .then((result)=>{
        return response.success(message.userDetails,result);
    })
    .catch((error)=>{
        console.log({ error });
        return response.errorResponse(http_codes.internalServerError,message.internalServerError); 
    })
}

function updateUser(req){
    let data = {},
        address={};

     if(req.body.name){
        data.full_name = req.body.name
     }
     if(req.body.email){
        data.email = req.body.email
     }
     if(req.body.mobile){
        data.mobile = req.body.mobile
     }
     if(req.body.country){
        address.country = req.body.country
     }
     if(req.body.state){
        address.state =  req.body.state
     }
     if(req.body.district){
        address.district = req.body.district
     }
     if(req.body.pincode){
        address.pin_code = req.body.pincode
     }
     if(req.body.addressline){
        address.address_line = req.body.addressline
     }
     if(address){
         data.address=address
     }

    return dao.updateById({
        index: index.user,
        id: req.params.id,
        body: {
            doc: data
        }
    })
    .then((result)=>{
        return response.success(message.userDetails,result); 
    })
    .catch((error)=>{
        console.log({ error });
        return response.errorResponse(http_codes.internalServerError,message.internalServerError); 
    })
}

function deleteUser(req){
    return dao.deleteById({
        index: index.user,
        id: req.params.id
    })
    .then((result)=>{
        return response.success(message.deleted,result);
    })
    .catch((error)=>{
        console.log({ error });
        return response.errorResponse(http_codes.internalServerError,message.internalServerError); 
    });
}

module.exports = { addUser,getById,getUsers,updateUser,deleteUser };
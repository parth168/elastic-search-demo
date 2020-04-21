const service = require('./service');

function addUser(req){
    return service.addUser(req);
}

function getById(req){
    return service.getById(req);
}

function getUsers(req){
    return service.getUsers(req);
}

function updateUser(req){
    return service.updateUser(req);
}

function deleteUser(req){
    return service.deleteUser(req);
}

module.exports = { addUser,getById,getUsers,updateUser,deleteUser };
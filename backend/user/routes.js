const router = require('express').Router();
const middleware = require('./middleware');
const action = require('./action');

router.post('/add',[middleware.validateReqBody],(req,res)=>{
    action.addUser(req)
            .then((response)=>{
                res.status(response.code).send(response);
            });
});

router.get('/:id',(req,res)=>{
    action.getById(req)
            .then((response)=>{
                res.status(response.code).send(response);
            });
});

router.get('',(req,res)=>{
    action.getUsers(req)
            .then((response)=>{
                res.status(response.code).send(response);
            });
});

router.put('/update/:id',[middleware.validateUpdateBody],(req,res)=>{
    action.updateUser(req)
            .then((response)=>{
                res.status(response.code).send(response);
            });
});

router.delete('/delete/:id',[middleware.validateUpdateBody],(req,res)=>{
    action.deleteUser(req)
            .then((response)=>{
                res.status(response.code).send(response);
            });
});

module.exports = router;
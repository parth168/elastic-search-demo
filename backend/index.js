require('dotenv').config();
const express = require('express');
const  app =  express();
const cors = require('cors');
const router = require('./user/routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.use('/user',router);



const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Listening on port ${port}... `);
});
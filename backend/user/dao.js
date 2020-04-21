require('dotenv').config();
const es = require('elasticsearch');

const esClient  = new es.Client({
    host: process.env.elasticsearchHost,
    // log: 'trace'
});

function search(query){
    return esClient.search(query)
            .then((result)=>{
                return result;
            })
            .catch((error)=>{
                return error;
            });
}

function getById(query){
    return esClient.get(query)
            .then((result)=>{
                return result;
            })
            .catch((error)=>{
                return error;
            });
}

function insertDoc(query){
    return esClient.index(query)
            .then((result)=>{
                return result;
            })
            .catch((error)=>{
                return error;
            });
}

function updateById(query){
    return esClient.update(query)
            .then((result)=>{
                return result;
            })
            .catch((error)=>{
                return error;
            })
}

function deleteById(query){
    return esClient.delete(query)
            .then((result)=>{
                return result;
            })
            .catch((error)=>{
                return error;
            });
}

module.exports = { search,insertDoc,getById,updateById,deleteById };
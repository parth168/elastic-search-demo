const es = require('elasticsearch');

const esClient = new es.Client({
    host: 'localhost:9200',
    log: 'trace'
});

//Create index 
function createIndices(){
    esClient.indices.create({
        index: 'userdetails2'
    })
    .then((r)=>{
        console.log(r);
    })
    .catch((e)=>{
        console.log({ e });
    });
}

//create Mapping
function updateMpping(){
    esClient.indices.putMapping({
        index: 'userdetails2',
        body: {
            properties:{
                full_name: {
                    type: 'text',
                    fields:{
                        raw:{
                            type:'keyword'
                        }
                    },
                    analyzer: 'standard'
                },
                email:{
                    type: 'keyword'
                },
                mobile_number:{
                    type: 'keyword'
                },
                address:{
                   properties:{
                       country: {
                           type: 'keyword'
                       },
                       state:{
                           type: 'keyword',
                       },
                       district: {
                           type: 'keyword'
                       },
                       pin_code: {
                           type: 'keyword'
                       },
                       address_line: {
                           type: 'keyword'
                       }
                   }
                }
            }
        }
    })
    .then((r)=>{
        console.log(r);
    });
}

// createIndices();
// updateMpping();
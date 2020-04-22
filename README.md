# elastic-search-demo
elastic-search-demo with Angular,Node js,Express js

### Prerequisites
1. Download [elastisearch](https://www.elastic.co/downloads/elasticsearch)
1. Install [Angular cli](https://www.npmjs.com/package/@angular/cli)
1. Install [Node Js](https://nodejs.org/en/download/)
1. Run ElasticSearch ```./bin/elasticsearch```

### Demo
#### Node-js Dependency:
```
1. [express](https://www.npmjs.com/package/express)
1. [elasticsearch](https://www.npmjs.com/package/elasticsearch)
1. [dotenv](https://www.npmjs.com/package/dotenv)
1. [cors](https://www.npmjs.com/package/cors)
```
#### How Start Demo?
This repo contains examples on how to use elasticsearch in Node.js to CRUD operation.
To clone this repo in your machine:
```
git clone https://github.com/parth168/elastic-search-demo
```
To set index and mapping in elastisearch:
```elastic-search-demo/backend>node config.js```

To Start Node-js server:
```elastic-search-demo/backend>npm start```
Then, Node-js server listen on ```http://localhost:8001/```

To Start  Angular-cli:
```
elastic-search-demo/fronend/elasticSearch>npm install
elastic-search-demo/fronend/elasticSearch>ng serve
```
Then, open [http://localhost:4200/](http://localhost:4200/)

### Backend Process
#### Create Client:
```
const esClient = new es.Client({
    host: 'localhost:9200',
    log: 'trace'
});
```
#### Create Index:
```
    esClient.indices.create({
        index: 'userdetails2'
    });
```
#### Create Mapping to Index:
```
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
    });
```

#### CRUD API:
##### ADD User:
API: ```POST http://localhost:8001/user/add```
Request Body: 
 ```
 {
	"name": "Full_Name",
 	"email": "User_Email",
	"mobile": User_Mobile_no.,
	"country": "Counrty",
	"state": "State",
	"district": "District",
	"pincode": pin_code,
	"addressline": "Address_line"
}
```
Response:
```
{
    "code": 200,
    "message": "Data added.",
    "data": {
        "_index": "userdetails2",
        "_type": "_doc",
        "_id": "rxpLoHEB7YafsEijDsF2",
        "_version": 1,
        "result": "created",
        "_shards": {
            "total": 2,
            "successful": 1,
            "failed": 0
        },
        "_seq_no": 17,
        "_primary_term": 3
    }
}
```
Node-js code:
```
esClient.index({
                index: userdetails2,
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
            });
```
#### SerachUserById:
API: ```GET localhost:8001/user/:id```
Response:
```
{
    "code": 200,
    "message": "User Details.",
    "data": {
        "_index": "userdetails2",
        "_type": "_doc",
        "_id": "rxpLoHEB7YafsEijDsF2",
        "_version": 1,
        "_seq_no": 17,
        "_primary_term": 3,
        "found": true,
        "_source": {
            "full_name": "Full_Name",
            "email": "User_Email",
            "mobile_number": User_Mobile_no,
            "address": {
                "country": "Country",
                "state": "State",
                "district": "District",
                "pin_code": pin_code,
                "address_line": "Address_Line"
            }
        }
    }
}
```
Node-js code:
```
esClient.get({
        index: userdetails2,
        id: req.params.id
    });
```
#### Search:
API: ```GET http://localhost:8001/user?search= &size=&currentPage=&sort=&order=```
ResPonse:
```
{
    "code": 200,
    "message": "User Details.",
    "data": {
        "took": 20,
        "timed_out": false,
        "_shards": {
            "total": 1,
            "successful": 1,
            "skipped": 0,
            "failed": 0
        },
        "hits": {
            "total": {
                "value": 3,
                "relation": "eq"
            },
            "max_score": 2,
            "hits": []
	}
    }
}
```
Node-js code:
```
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
    
esClient.search({
        index: index.user,
        size: size,
        from: from,
        sort: sort,
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
    });
```
#### UpdateById:
API: ```PUT localhost:8001/user/update/:id```
Request Body:
```
 {
	"name": "Full_Name",
 	"email": "User_Email",
	"mobile": User_Mobile_no.,
	"country": "Counrty",
	"state": "State",
	"district": "District",
	"pincode": pin_code,
	"addressline": "Address_line"
}
```
Response:
```
{
    "code": 200,
    "message": "User Updated.",
    "data": {
        "_index": "userdetails2",
        "_type": "_doc",
        "_id": "rxpLoHEB7YafsEijDsF2",
        "_version": 2,
        "result": "updated",
        "_shards": {
            "total": 2,
            "successful": 1,
            "failed": 0
        },
        "_seq_no": 18,
        "_primary_term": 3
    }
}
```
Node-js code:
```
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
esClient.update({
        index: userdetails2,
        id: req.params.id,
        body: {
            doc: data
        }
    });
```
#### Delete:
API: ```DELETE http://localhost:8001/user/delete/:id```
Response:
```
{
    "code": 200,
    "message": "Deleted Successfully.",
    "data": {
        "_index": "userdetails2",
        "_type": "_doc",
        "_id": "rxpLoHEB7YafsEijDsF2",
        "_version": 3,
        "result": "deleted",
        "_shards": {
            "total": 2,
            "successful": 1,
            "failed": 0
        },
        "_seq_no": 19,
        "_primary_term": 3
    }
}
```
Node-js code:
```
esClient.delete({
        index: userdetails2,
        id: req.params.id
    });
```

### Further help:
To get more help on the [elasticsearch with node-js](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/16.x/api-reference.html#api-indices-create)

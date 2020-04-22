# elastic-search-demo
elastic-search-demo with Angular,Node js,Express js

###Prerequisites
1. Download [elastisearch](https://www.elastic.co/downloads/elasticsearch) and Start
1. Install [Angular cli](https://www.npmjs.com/package/@angular/cli)
1. Install [Node Js](https://nodejs.org/en/download/)
1. Run ElasticSearch ```./bin/elasticsearch```

###Demo
####Node-js Dependency:
```
1. [express](https://www.npmjs.com/package/express)
1. [elasticsearch](https://www.npmjs.com/package/elasticsearch)
1. [dotenv](https://www.npmjs.com/package/dotenv)
1. [cors](https://www.npmjs.com/package/cors)
```
####How Start Demo?
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

###Backend Process
####Create Index:
*In config.js
```
    esClient.indices.create({
        index: 'userdetails2'
    });
```
####Create Mapping to Index:
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

####CRUD API:
#####ADD User
API: ```http://localhost:8001/user/add```
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

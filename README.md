# ineuron-crud-app-ts

prod - http://ineuroncrudappts-env.eba-ii8mhrp8.ap-south-1.elasticbeanstalk.com/

The following app is a CRUD application created using typescript and mongodb as database.

User model -
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }

Following API's are created

- '/users' - Gets all data from mongodb.
- '/users/add' - Adds data to mongodb collection.
- '/users/update/:id' - Updates record present in collection.
= '/users/:id' - finds record present in the collection and deletes the record.

Explanation -
- /GET
route -  '/' - responds with status 200 and String as 'Status - OK'.
  
- /GET
route -  '/users' - responds with status 200 and json Users ({"_id":"63eb8f5ecf60b254bdcbf312","name":"test","age":23,"createdAt":"2023-02-14T13:40:46.513Z"}) object.
  
- /POST
route -  '/users/add' - sends new user object (name: "test2", age: 34, createdAt: moment().toDate()) and responds with status 200 and String as 'user Added'.
  
- /DELETE
route -  '/users/:id - finds data by id and deletes record & responds with status 200 and String as 'User Deleted'.
  
- /POST
route -  '/users/update/:id' - finds data by id and sends new user object (name: "test2", age: 34, updatedAt: moment().toDate()) and responds with status 200 and String as 'User Updated'.
  
****** Unit Testing Using chai & mocha ******

CMD npm run test

The above command will run the test cases.
  
****** Documentation using Swagger ******

route - '/api-docs' - Opens Swagger smart bear dashboard with shows all API's calls.

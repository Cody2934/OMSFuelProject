//import the mongo client from mongodb module
const mongodb = require('mongodb').MongoClient;

//set the url, can also set the username and password in the url
//let url ="mongodb://username:password@localhost:7227/";
let url = 'mongodb://localhost:7227/';

//use connect() function of mongoClient to connect MongoDB. The callback function gives us a mongoDB client object
mongodb.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if(err) throw err;
    //below returns a collection object corresponding to category collection in OMS_db database
    client
      .db('OMS_db')
      .collection('category')
      // insertMany method to save CSV data to MongoDB database
      .insertMany(csvData, (err, res) => {
        if(err) throw err;
        console.log(`Inserted: ${res.insertedCount} rows`);
        client.close();
      });
  }
);

// const csvtojson = require('csvtojson');

// csvtojson()
//   .fromFile("OMSFuelData.csv")
//   .then(csvData => {
//     console.log(csvData);
// });


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const mongodb = require('mongodb').MongoClient;
const csvtojson = require('csvtojson');

let url = 'mongodb://localhost:7227/';

csvtojson()
  .fromFile('OMSFuelData.csv')
  .then(csvData => {
    console.log(csvData);

    mongodb.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, client) => {
        if(err) throw err;

        client
          .db('OMS_db')
          .collection('category')
          .insertMany(csvData, (err, res) => {
            if(err) throw err;

            console.log(`Inserted: ${res.insertedCount} rows`);
            client.close();
          });
      }
    );
  });

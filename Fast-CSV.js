// const fs = require("fs");
// const fastcsv = require("fast-csv");

// let stream = fast.createReadStream("OMSFuelData.csv");
// let csvData = [];
// let csvStream = fastcsv
//   .parse()
//   .on("data", function(data) {
//     csvData.push({
//       id: data[0],
//       Card_Number_Masked: data[1],
//       Card_Description: data[2],
//       VehCard_Number_Masked: data[3],
//       Site_Description: data[4],
//       State_Code: data[5],
//       CPTrn_DateTime: data[6],
//       Prod_Description: data[7],
//       Units: data[8],
//       Unit_Price: data[9],
//       Amt: data[10]
//     });
//   })
//   .on("end", function() {
//     //removes the first line/header
//     csvData.shift();

//     //save to the MongoDB database collection
//   });
// stream.pipe(vscStream);

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const fs = require('fs');
const mongodb = require('mongodb').MongoClient;
const fastcsv = require('fast-csv');

let url = 'mongodb://localhost:7227/';
let stream = fs.createReadStream('OMSFuelData.csv');
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on('data', function(data) {
    csvData.push({
      id: data[0],
      Card_Number_Masked: data[1],
      Card_Description: data[2],
      VehCard_Number_Masked: data[3],
      Site_Description: data[4],
      State_Code: data[5],
      CPTrn_DateTime: data[6],
      Prod_Description: data[7],
      Units: data[8],
      Unit_Price: data[9],
      Amt: data[10]
    });
  })
  .on('end', function() {
    csvData.shift();

    console.log(scvData);

    mongodb.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, client) => {
        if(err) throw err;

        client
          .db('OMS_db')
          .collection('category')
          .insertMany(scvData, (err, res) => {
            if(err) throw err;

            console.log(`Inserted: ${res.insertedCount} rows`);
            client.close();
          });
      }
    );
  });

stream.pipe(scvStream);

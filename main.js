const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';
const fs = require('fs');


// Database Name
const dbName = 'inevitable-grid';
 
const client = new mongodb.MongoClient(url);
client.connect(function(error) {
    console.log('connection error', error)
    const db = client.db(dbName);
    var bucket = new mongodb.GridFSBucket(db);

    fs.createReadStream('./pups.mp4').
      pipe(bucket.openUploadStream('pups.mp4')).
      on('error', function(err) {
        console.log('gridfs error', err);
      }).
      on('finish', function() {
        console.log('gridfs done');
        process.exit(0);
      });
  });
const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  //console.log("in getDb");
  if (!_db) {
    //console.log("no Db");
    throw Error('Db not initialized');
  }
  //console.log("yes db");
  return _db;
};

const closeClient = () => {
  if (!MongoClient) {
    console.log('No Mongo client');
  } 
  MongoClient.close();
}

module.exports = {
  initDb,
  getDb,
  closeClient
};
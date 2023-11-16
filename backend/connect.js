const { MongoClient } = require('mongodb');
const env = require('../env');

const url = env.MONGODB_URI;

async function run() {
  const client = new MongoClient(url);
  
  try {
    await client.connect();
    console.log("Successfully connected to Atlas");
  } catch (err) {
    console.log(err.stack);
  }

  return client; 
}

module.exports = { run };

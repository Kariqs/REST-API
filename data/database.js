const { MongoClient } = require("mongodb");

let database;

async function connectToDatabase() {
  const client = await new MongoClient("mongodb://127.0.0.1:27017").connect();
  database = client.db("second-api");
}

function getDatabase() {
  if (!database) {
    throw new Error("Database not connected!");
  }

  return database;
}

module.exports = {
  connectToDatabase: connectToDatabase,
  getDatabase: getDatabase,
};

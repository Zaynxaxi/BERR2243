const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://b122320036_db_user:Zaynxaxi3011@berr2243.veh2kz8.mongodb.net/?retryWrites=true&w=majority&appName=BERR2243";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB!");
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
  }
}

run();


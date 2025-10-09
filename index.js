console.log("HELLO WORLD - index.js is running");

const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://b122320036_db_user:Zaynxaxi3011@berr2243.veh2kz8.mongodb.net/?retryWrites=true&w=majority&appName=BERR2243";

const client = new MongoClient(uri);

async function run() {
  try {
    console.log("🚀 Script started");

    await client.connect();
    console.log("✅ Connected to MongoDB!");

    const db = client.db("testDB");
    const users = db.collection("users");

    const result = await users.insertOne({ name: "Ali", age: 2002 });
    console.log("Inserted document with _id:", result.insertedId);

    const found = await users.findOne({ name: "Ali" });
    console.log("Found document:", found);

  } catch (err) {
    console.error("❌ Error occurred:", err.message);
  } finally {
    await client.close();
  }
}

run();


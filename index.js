const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://b122320036_db_user:Zaynxaxi3011@berr2243.veh2kz8.mongodb.net/?retryWrites=true&w=majority&appName=BERR2243";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB!");

    const db = client.db("Week2DB"); // your database name
    const driversCollection = db.collection("drivers");

    // === Insert Drivers ===
    const drivers = [
      { name: "Zayn", rating: 4.4, available: true },
      { name: "Alii", rating: 4.8, available: true },
      { name: "Mumaii", rating: 5.0, available: true },
      { name: "Hammad", rating: 4.6, available: false }
    ];

    for (const driver of drivers) {
      const result = await driversCollection.insertOne(driver);
      console.log(`New driver created with ID: ${result.insertedId}`);
    }

    // === Find Available Drivers with Rating ≥ 4.5 ===
    const availableDrivers = await driversCollection
      .find({ available: true, rating: { $gte: 4.5 } })
      .toArray();

    console.log("\n🌟 Available High-Rated Drivers (≥4.5):");
    console.log(availableDrivers);
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
    console.log("✅ Connection closed");
  }
}

run();

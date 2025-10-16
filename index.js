const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://b122320036_db_user:Zaynxaxi3011@berr2243.veh2kz8.mongodb.net/?retryWrites=true&w=majority&appName=BERR2243";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB!");

    // === JSON ARRAY OF DRIVERS ===
    const driverList = [
      { name: "Zayn", rating: 4.4, available: true },
      { name: "Alii", rating: 4.8, available: true },
      { name: "Mumaii", rating: 5.0, available: true },
      { name: "Hammad", rating: 4.6, available: false }
    ];

    // === Display driver names ===
    console.log("\n📋 Driver Names:");
    driverList.forEach(driver => console.log(driver.name));

    // === Insert all drivers into MongoDB ===
const db = client.db("Week2DB");
const drivers = db.collection("drivers");

const insertResult = await drivers.insertMany(driverList);
console.log("\n🚗 Inserted Drivers:", insertResult.insertedCount);


  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
  }
}

run();

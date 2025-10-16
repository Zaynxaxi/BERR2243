const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://b122320036_db_user:Zaynxaxi3011@berr2243.veh2kz8.mongodb.net/Week2DB?retryWrites=true&w=majority&tls=true&appName=BERR2243";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB!");

    const db = client.db("Week2DB");
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

    // === Step 5: Update Zayn’s rating by +0.1 ===
    const updateResult = await driversCollection.updateOne(
      { name: "Zayn" },        // find Zayn
      { $inc: { rating: 0.1 } } // add 0.1 to rating
    );

    console.log("\n🛠️ Update Result:");
    console.log(updateResult);

    const updatedDriver = await driversCollection.findOne({ name: "Zayn" });
    console.log("\n✅ Updated Driver Info:");
    console.log(updatedDriver);

    // === Step 6: Delete one unavailable driver ===
    const deleteResult = await db.collection('drivers').deleteOne({ available: false });
    console.log("\n🗑️ Driver deleted with result:");
    console.log(deleteResult);

  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
    console.log("✅ Connection closed");
  }
}

run();

const { MongoClient } = require("mongodb");

// MongoDB Atlas connection string
const uri = "mongodb+srv://b122320036_db_user:Zaynxaxi3011@berr2243.veh2kz8.mongodb.net/?retryWrites=true&w=majority&appName=BERR2243";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB!");

    const db = client.db("Week2DB");
    const drivers = db.collection("drivers");

    // === JSON ARRAY OF DRIVER OBJECTS ===
    const driverList = [
      { name: "John Doe", rating: 4.4, available: true },
      { name: "Alice Tan", rating: 4.8, available: true },
      { name: "Michael Lee", rating: 4.9, available: false }
    ];

    // Display each driver’s name
    console.log("\n📋 Driver Names:");
    driverList.forEach(d => console.log(d.name));

    // Add a new driver
    driverList.push({ name: "Sarah Lim", rating: 4.7, available: true });
    console.log("\n✅ Added New Driver:", driverList[driverList.length - 1]);

    // === CRUD OPERATIONS START ===

    // Insert all drivers
    const insertResult = await drivers.insertMany(driverList);
    console.log("\n🚗 Inserted Drivers:", insertResult.insertedCount);

    // Find all drivers with rating ≥ 4.5
    const highRated = await drivers.find({ rating: { $gte: 4.5 } }).toArray();
    console.log("\n🌟 High Rated Drivers (≥ 4.5):", highRated);

    // Increase John Doe’s rating by 0.1
    const updateResult = await drivers.updateOne(
      { name: "John Doe" },
      { $inc: { rating: 0.1 } }
    );
    console.log("\n🆙 Updated John Doe’s Rating:", updateResult.modifiedCount);

    // Delete all unavailable drivers
    const deleteResult = await drivers.deleteMany({ available: false });
    console.log("\n🗑️ Deleted Unavailable Drivers:", deleteResult.deletedCount);

  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
  }
}

run();


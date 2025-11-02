const express = require('express');
const { MongoClient, ObjectId } = require('mongodb'); // ✅ include ObjectId here
const port = 3000;

const app = express();
app.use(express.json());

let db;

async function connectToMongoDB() {
  const uri = "mongodb+srv://b122320036_db_user:Zaynxaxi3011@berr2243.veh2kz8.mongodb.net/Week2DB?retryWrites=true&w=majority&tls=true&appName=BERR2243";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB!");
    db = client.db("Week2DB");
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err);
  }
}

connectToMongoDB();

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

// === GET /rides ===
app.get('/rides', async (req, res) => {
  try {
    const rides = await db.collection('rides').find().toArray();
    res.status(200).json(rides);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch rides" });
  }
});

// === POST /rides ===
app.post('/rides', async (req, res) => {
  try {
    const newRide = req.body;

    if (!newRide.pickup || !newRide.destination || !newRide.status) {
      return res.status(400).json({ error: "Invalid ride data: missing required fields" });
    }

    const result = await db.collection('rides').insertOne(newRide);
    console.log("✅ New ride added:", result.insertedId);

    res.status(201).json({
      message: "Ride created successfully!",
      id: result.insertedId
    });
  } catch (err) {
    console.error("❌ Error while inserting ride:", err);
    res.status(500).json({ error: "Database error while creating ride" });
  }
});

// === PUT /rides/:id ===
app.put('/rides/:id', async (req, res) => {
  try {
    const rideId = req.params.id;
    const newStatus = req.body.status;

    if (!newStatus) {
      return res.status(400).json({ error: "Missing 'status' field in request body" });
    }

    const result = await db.collection('rides').updateOne(
      { _id: new ObjectId(rideId) },
      { $set: { status: newStatus } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Ride not found" });
    }

    res.status(200).json({
      message: "Ride status updated successfully!",
      updated: result.modifiedCount
    });

  } catch (err) {
    console.error("❌ Error updating ride:", err);
    res.status(400).json({ error: "Invalid ride ID or request" });
  }
});

// === DELETE /rides/:id ===
app.delete('/rides/:id', async (req, res) => {
  try {
    const result = await db.collection('rides').deleteOne(
      { _id: new ObjectId(req.params.id) }
    );

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Ride not found" });
    }

    res.status(200).json({
      message: "Ride deleted successfully",
      deleted: result.deletedCount
    });

  } catch (err) {
    console.error("❌ Error deleting ride:", err);
    res.status(400).json({ error: "Invalid ride ID" });
  }
});

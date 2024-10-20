const mongoose = require("mongoose");
const fs = require("fs");
const seed = require("./seed.json")

require("dotenv").config();

async function main() {
  /**--------------- Not allowed to be edited - start - --------------------- */
  const mongoUri = process.env.MONGODB_URI;
  const collection = process.env.MONGODB_COLLECTION;

  const args = process.argv.slice(2);

  const command = args[0];
  /**--------------- Not allowed to be edited - end - --------------------- */

  // Connect to MongoDB
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Define a schema for the collection
  const schema = new mongoose.Schema(
    {
      title: String,
      year: Number,
      genre: [String],
      description: String,
      director: String,
      cast: [String],
    }, 
    { strict: false });
  const Model = mongoose.model(collection, schema);

  switch (command) {
    case "check-db-connection":
      await checkConnection();
      break;
    // TODO: Buat logic fungsionalitas yg belum tersedia di bawah
    case "reset-db":
      await Model.deleteMany();
      console.log("data reset");
      break;
    case "bulk-insert":
      const data = fs.readFileSync("./seed.json");
      const parsed = JSON.parse(data);
      await Model.insertMany(parsed);
      console.log("data seeded");
      break;
    case "get-all":
      await Model.find();
      const result = await Model.find();
      console.log(result);
      break;
    default:
      throw Error("command not found");
  }

  await mongoose.disconnect();
  return;
}

async function checkConnection() {
  console.log("check db connection started...");
  try {
    await mongoose.connection.db.admin().ping();
    console.log("MongoDB connection is successful!");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
  console.log("check db connection ended...");
}

main();

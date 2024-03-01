const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGO_URL ||
    "mongodb+srv://harsh:harsh12@cluster0.2sfpp3n.mongodb.net/SkillCraftify"
);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("MongoDB connection successful");
});

connection.on("error", (err) => {
  console.log("MongoDB connection unsuccessful");
});

module.exports = connection;

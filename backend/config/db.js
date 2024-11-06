const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config();

async function dbConnect() {
  try {
    const conn = await mongoose.connect(process.env.DB_CONN);
    if (conn) {
      console.log("========== Mongodb Atlas is connected ==========")
    }
  } catch (error) {
    console.log("========== Mongodb Atlas connection failed ==========")
    console.log("error message : ", error)
  }
}
module.exports = dbConnect;
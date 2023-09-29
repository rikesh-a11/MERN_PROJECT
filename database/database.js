const mongoose = require("mongoose")


exports.connectDatabase = async() => {
  //connecting to database
  await mongoose.connect("mongodb+srv://rikesh:rikesh@cluster0.pehl0yt.mongodb.net/?retryWrites=true&w=majority")
      console.log("Database connected successfully");
}

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const paymentRoutes = require("./routes/payment");

// initialize app
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/royal-airlines", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB");
});

const dataSchema = new mongoose.Schema({
    bookingId: String,
    firstName: String,
    middleName: String,
    lastName: String,
    dateofBirth: String,
    genderValue: String,
    phoneNumber: String,
    emailAddress: String,
    ticketNumber: String,
    flightNumber: String,
    departureDate: String,
    departurePlace: String,
    flightTime: String,
    arrivalPlace: String,
    departureTime: String,
    arrivalTime: String,
    arrivalDate: String,
    totalPrice: String,
});

const DataModel = mongoose.model("Data", dataSchema);

// environment variables
dotenv.config();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.post("/api/save-data", (req, res) => {
    const {
      bookingId,
      firstName,
      middleName,
      lastName,
      dateofBirth,
      genderValue,
      phoneNumber,
      emailAddress,
      ticketNumber,
      flightNumber,
      departureDate,
      departurePlace,
      flightTime,
      arrivalPlace,
      departureTime,
      arrivalTime,
      arrivalDate,
      totalPrice,
    } = req.body;
  
    const newData = new DataModel({
      bookingId,
      firstName,
      middleName,
      lastName,
      dateofBirth,
      genderValue,
      phoneNumber,
      emailAddress,
      ticketNumber,
      flightNumber,
      departureDate,
      departurePlace,
      flightTime,
      arrivalPlace,
      departureTime,
      arrivalTime,
      arrivalDate,
      totalPrice,
    });
  
    newData.save((err, doc) => {
      if (err) {
        console.error(err);
        res.status(500).send("Failed to save data to MongoDB");
      } else {
        console.log("Data saved to MongoDB");
        res.status(200).json(doc);
      }
    });
  });
app.use("/api/payment/",paymentRoutes);

// app listening
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));

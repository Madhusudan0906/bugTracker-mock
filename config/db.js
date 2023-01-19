require("dotenv").config();
const MONGO_URL = process.env.MONGO_URL;

const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

const connection = mongoose.connect(`${MONGO_URL}`);

module.exports = connection;
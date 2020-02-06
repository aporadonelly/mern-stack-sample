const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log(`DB connection established.`);
});

const todoRoutes = require("./routes/todos");
app.use("/todos", todoRoutes);

app.listen(PORT, () => {
  console.log(`Port listening on port: ${PORT}`);
});

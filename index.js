const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema.js");

const app = express();

app.use(cors());

mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
mongoose.connection.once("open", () => {
    console.log("connected to database")
});

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4180, () => {
    console.log("🚀🚀🚀 Server is listening on port 4180 🚀🚀🚀")
});
// const MongoClient = require("mongodb").MongoClient;
// const uri =
//   "mongodb+srv://igtiBootcamp:vakPGci9mJ9sToN3@cluster0.usxoz.mongodb.net/<dbname>?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// client.connect((err) => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();

//   console.log(collection);
// });

import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://igtiBootcamp:vakPGci9mJ9sToN3@cluster0.usxoz.mongodb.net/sample_airbnb?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(console.log("conectado"))
  .catch((err) => console.log("erro ao conecat no banco de dados:" + err));

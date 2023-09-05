const express = require("express");
const app = express();
const router=require("./router")
const cors= require("cors");
const bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.json())

app.use('/', router)


app.listen(5000, () => {
  console.log("Server is running..");
});

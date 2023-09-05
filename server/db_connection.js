const sql = require("mssql");
require("dotenv").config();
const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: "localhost",
  // pool: {
  //   max: 10,
  //   min: 0,
  //   idleTimeoutMillis: 30000
  // },
  options: {
    encrypt: false, 
    trustedConnection: true
    //trustServerCertificate: false // change to true for local dev / self-signed certs
  }
}


 const Connection= async () => {
  console.log("hello",sqlConfig);
 try {
  // make sure that any items are correctly URL encoded in the connection string
   const connection =await (await sql.connect(sqlConfig)).connect();
   console.log("conected to db")
   return connection;
  } catch (err) {
    console.log("failed to connect db")
    console.log(err)
  
 }
}
module.exports={Connection}
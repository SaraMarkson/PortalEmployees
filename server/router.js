const express = require("express");
const router = express.Router();
const sql = require("mssql");
const { Connection } = require("./db_connection");
let connection;
// middleware that is specific to this router
router.use(async (req, res, next) => {
  if (!connection) {
    connection = await Connection();
  }
  next();
});
// define the home page route
router.post("/login", async (req, res) => {
  let request = new sql.Request();
  console.log(req.body);
  let username = req.body.User_Name;
  let password = req.body.Password;
  const data = await request.query(
    `select * from [dbo].[User] where User_Name='${username}' and Password='${password}'`
  );
  if (data.recordset.length) {
    let user = data.recordset[0];
    const resUserEmployee = await request.query(
      `select * from [dbo].[Employee] where User_Id=${user.Id} `
    );
    if (resUserEmployee.recordset.length) {
      let Employee = resUserEmployee.recordset[0];
      Employee.User_Name = user.User_Name;
      Employee.Password = user.Password;
      res.status(200).json(Employee);
    } else {
      res.status(400).json(data);
    }
  }
});

router.post("/update", async (req, res) => {
  let request = new sql.Request();
  console.log(req.body);
  let newEmployee = req.body;
  let sqlUpdate = `UPDATE [dbo].[Employee]
  SET 
  First_Name = '${newEmployee.First_Name}',
  Last_Name = '${newEmployee.Last_Name}',
  Display_Name = '${newEmployee.Display_Name}',
  Birth_Date = ${newEmployee.Birth_Date},
  Landline_Phone = '${newEmployee.Landline_Phone}',
  Mobile_Phone = '${newEmployee.Mobile_Phone}',
  Wing = '${newEmployee.Wing}',
  Department = '${newEmployee.Department}',
  Brigade = '${newEmployee.Brigade}',
  Role = '${newEmployee.Role}',
  Is_Birthday = ${newEmployee.Is_Birthday ? 1 : 0} ,
  Is_Show_Pic = ${newEmployee.Is_Show_Pic ? 1 : 0} ,
  Email = '${newEmployee.Email}'
  WHERE Id = ${newEmployee.Id};`;
  console.log(sqlUpdate);
  const data = await request.query(sqlUpdate);
  console.log(data);
  if (data.rowsAffected > 0) {
    res.status(200).json({ msg: "succeed" });
  } else {
    res.status(500).json(data);
  }
});

module.exports = router;

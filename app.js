const express = require("express");
require("dotenv").config()
const mongoose = require("mongoose");
const path = require("path");
const Subject = require("./models/subjects");
const Student = require("./models/students");
const { update } = require("./models/students");
const dbUrl = process.env.dbUrl || "mongodb://localhost:27017/attendance"
mongoose.connect(dbUrl).then(() => {
  console.log("connection Established");
}).catch(() => {
  console.log("Error connecting to database")
})
const app = express();
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("This is an API please make appropriate api calls tot get data ");
});
app.get("/attendance/:roll", async (req, res) => {
  const roll = req.params.roll; 
  const user = await Student.findOne({ rollNumber: roll })
    .populate("subjects.sid", "title -_id")
  console.log(user["subjects"])
  res.send(JSON.stringify(user));
});
app.post("/markAttendance", async (req, res) => {
  const { roll, subject } = req.body;
  const user = await Student.findOne({ rollNumber: roll });
  const sub = await Subject.findOne({ title: subject });
  let updateDate = new Date(user.updateTime)
  let presentDate = new Date();
  console.log(updateDate)
  if (updateDate.getHours() - presentDate.getHours() != 0 && presentDate.getDay() == updateDate.getDay())
    return res.status(405).send("Failure. Don't proxy attendance.")
  try {
    for (let i = 0; i < user.subjects.length; i++) {
      if (String(sub._id) == user.subjects[i]["sid"]) {
        user.subjects[i].attendance++;
        break;
      }
    }
    await user.save();
  } catch (e) {
    res.status(404).send("Sorry user or subject not found");
  }
  res.send("Marked Attendance");
});
app.listen(3000, () => {
  console.log("Listening on port 3000");
});

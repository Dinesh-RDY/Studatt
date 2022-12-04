const { default: mongoose } = require("mongoose");
const Student = require("../models/students");
const Subject = require("../models/subjects");
require("dotenv").config()
const dbUrl = "mongodb://localhost:27017/attendance"
mongoose.connect(dbUrl).then(() => {
  console.log(dbUrl)
  console.log("connection Established");
}).catch(() => {
  console.log("Error connecting to database")
})
const students = ["Dinesh", "Aryan", "hrishi", "abhi", "Satish"];

let roll = 100519733015;
const insertStudents = async function () {
  const subs = await Subject.find({}, { _id: 1 });
  await Student.deleteMany({});
  console.log("Finished  Deleting");
  for (let name of students) {
    const newStudent = new Student({ name: name, rollNumber: roll });
    for (let sub of subs) {
      console.log(sub["_id"]);
      newStudent.subjects.push({ sid : sub["_id"], attendance: 0 });
    }
    roll++;
    await newStudent.save();
  }
  console.log("Finsihed Saving");
};

insertStudents();

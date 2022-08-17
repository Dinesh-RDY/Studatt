const mongoose = require("mongoose")
const Subject = require("../models/subjects");
require("dotenv").config()
const dbUrl = process.env.dbUrl || "mongodb://localhost:27017/attendance"
mongoose.connect(dbUrl).then(() => {
    console.log("connection Established");
}).catch(() => {
    console.log("Error connecting to database")
})
const subjects = [{ "subject": "CN", credits: 4 },
{ subject: "CD", credits: 4 },
{ subject: "AI", credits: 3 },
{ subject: "OE", credits: 3 },
{ subject: "CC", credits: 3 },
{ subject: "CNLAB", credits: 2 },
{ subject: "CDLAB", credits: 2 }
]
const seeddb = async () => {
    await Subject.deleteMany({});
    console.log("Deletion successful")
    for (let i = 0; i < subjects.length; i++) {
        let newSubject = new Subject({ title: subjects[i]["subject"], credits: subjects[i]["credits"] })
        await newSubject.save();
    }
    console.log("Saving Succcessfull")
}

seeddb()
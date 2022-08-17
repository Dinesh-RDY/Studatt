const mongoose = require("mongoose")
const schema = require("../models/subjects")
require("dotenv").config()
const dbUrl = process.env.dbUrl || "mongodb://localhost:27017/attendance"
mongoose.connect(dbUrl).then(() => {
    console.log("connection Established");
}).catch(() => {
    console.log("Error connecting to database")
})

const subjects = ["CN", "CD", "AI", "CC", "OE", "CDLAB", "CNLAB"]
const credits = [4, 4, 3, 3, 3, 2, 2]

async function seed() {
    await schema.deleteMany({});
    for (let i = 0; i < subjects.length; i++) {
        const newSubject = new schema({ title: subjects[i], credits: credits[i] })
        console.log(newSubject)
        await newSubject.save()
    }
}

seed()
    .then(() => { console.log("Finshed Saving"); return; })

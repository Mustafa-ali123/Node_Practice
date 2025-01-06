const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const authRouter = require("./routes/auth")
const userRouter = require("./routes/user")

require("dotenv").config()

const app = express()
app.use(express.json())
app.use(cors())

const PORT = 3000
mongoose.connect("mongodb+srv://coloniappadmin:Galleta1@coloniapp.mongocluster.cosmos.azure.com/common")
const db = mongoose.connection
db.on("error", console.error.bind(console, "Connection Error"));
db.once("open", () => {
    console.log("Database Connected")
})
app.get("/", (req, res) => {
    res.send(`Welcome to port ${PORT}`);
});
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.listen(PORT, () => {
    console.log("Lising on port 3000")
})
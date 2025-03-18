const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

// const port = process.env.PORT;
const port = process.env.PORT || 8080;

const contestRoutes = require("./routes/contest");

app.use(cors());
app.use(express.json());


app.use("/api", contestRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to TLE CP Tracker!"
    });
});


app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
})
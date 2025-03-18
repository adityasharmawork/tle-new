const express = require('express');
const cors = require('cors');
const app = express();

// const port = process.env.PORT;
const port = 8080;

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
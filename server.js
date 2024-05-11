const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoutes");
const cors = require("cors");
dotenv.config();

app.use(express.json());

app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.URI_DB)
    .then(() => {
        console.log("Connected to the Database");
        // Start the server
        app.listen(process.env.PORT || 2520, (err) => {
            if (err) {
                console.error("Error starting server:", err);
            } else {
                console.log("Server is running on port:", process.env.PORT || 2520);
            }
        });
    })
    .catch((err) => {
        console.error("Error connecting to the database:", err);
        process.exit(1); // Exit with failure
    });

// Route middleware
app.use(userRoute);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
    next()
});


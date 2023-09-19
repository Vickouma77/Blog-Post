const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const multer = require('multer');
const path = require('path');

const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const postRoute = require('./routes/posts');
const categoryRoute = require('./routes/categories');

//loads the environment variables from the .env file into process.env.
dotenv.config();

// recognize the incoming Request Object as a JSON Object.
app.use(express.json());

// serve static files
app.use("/images", express.static(path.join(__dirname, "/images")));

// connect to MongoDB
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "images");
        },
        filename: (req, file, cb) => {
            cb(null, req.body.name);
        }
    });

    const upload = multer({ storage: storage });
    app.post("/api/upload", upload.single("file"), (req, res) => {
        res.status(200).json("File has been uploaded");
    })

// routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

// listen to port 5000
app.listen("5000", () => {
    console.log("Backend is running.");
})

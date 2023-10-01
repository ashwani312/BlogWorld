const express = require('express');
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const categoriesRoute = require("./routes/categories");
const multer = require('multer');
const path = require("path")
const app = express()
const port = 5000;
app.use(express.json());
dotenv.config()
app.use("/images", express.static(path.join(__dirname, "./images")));
app.use(cors());



mongoose.connect(`${process.env.MONGO_URL}`, {
  useNewUrlParser: true,
})
  .then(() => console.log('Connected to mongodb'))
  .catch((err) => { console.log(err) })

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
     cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  }
})

const upload = multer({ storage: storage }).single("file");

app.post("/api/upload", upload, (req, res) => {
  return res.status(200).json("File has been uploaded")
});

app.use('/api/auth', authRoute);
app.use("/api/posts", postRoute);
app.use("/api/users", usersRoute);
app.use("/api/categories", categoriesRoute);


app.listen(port, () => {
  console.log('connected succesfully on  ' + port)
})

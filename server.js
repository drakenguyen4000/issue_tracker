const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const issues = require("./routes/api/issues");
const user = require("./routes/api/user");
const comment = require("./routes/api/comment");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//environment variables
require("dotenv").config();

//Connect to MongoDB
mongoose
  .connect(process.env.DATABASEURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongodb Connected..."))
  .catch((err) => console.log(err));

mongoose.set("useFindAndModify", false);

//Use Routes middleware
app.use("/issues", issues);
app.use("/", user);
app.use("/issues", comment);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

//Error Handling (next)
app.use(function (err, req, res, next) {
  res.status(400).json({
    message: { msgBody: err, msgError: true },
  });
});

app.listen(port, () => console.log(`Server started on port ${port}`));

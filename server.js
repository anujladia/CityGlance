const express = require("express");
const monogoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const news = require("./routes/api/news");
const map = require("./routes/api/map");
const temp = require("./routes/api/temp");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB configuration
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
monogoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

//app.get("/", (req, res) => res.send("Hello!"));

app.use("/api/news", news);
app.use("/api/map", map);
app.use("/api/temp", temp);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

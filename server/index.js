require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const usersRoutes = require("./routes/users");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const passwordResetRoutes = require("./routes/passwordReset");
const exercisesRoutes = require("./routes/exercises");
//const authRoutes = require("./routes/auth_v");
//const userRoutes = require("./routes/Volunteers");


// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// CORS middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// routes
app.use("/api/exercises", exercisesRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/password-reset", passwordResetRoutes);

// routes
//app.use("/api/Volunteers", userRoutes);
//app.use("/api/auth_v", authRoutes);

const port = process.env.PORT || 4000;
app.listen(port, console.log(`Listening on port ${port}...`));

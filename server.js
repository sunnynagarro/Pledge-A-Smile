// Env variables
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

const express = require("express");
const app = express();
const cors = require("cors");

// DB
const connectDB = require("./config/db");
connectDB(MONGO_URI);

// middlewars
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// errorHandler
const errorHandler = require("./middlewares/errorHandler");

// routes
app.use("/auth", require("./routes/auth/auth"));
app.use("/api/tabsInfo", require("./routes/api/tabsInfo"));
app.use("/api/userInfo", require("./routes/api/userInfo"));
app.use("/api/groups", require("./routes/api/groups"));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Listening on *:${PORT}`));

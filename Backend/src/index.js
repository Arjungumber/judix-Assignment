const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const userRoutes = require("./routes/user.routes");
const taskRoutes = require("./routes/task.routes");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running");
});


app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

connectDB()?.then(() => {
  app.listen(PORT, () => {
    console.log("Connected to DB");
    console.log("Server is running");
  });
});
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const userRoutes = require("./routes/user.routes");

dotenv.config();


const app = express();

// app.use(
//     cors({
//         origin: "https://purplemerit-assignment-one.vercel.app",
//         methods: ["GET", "POST", "PUT", "DELETE"],
//         credentials: true, 
//     })
// );
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running");
});


app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);


app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

connectDB()?.then(() => {
  app.listen(PORT, () => {
    console.log("Connected to DB");
    console.log("Server is running");
  });
});
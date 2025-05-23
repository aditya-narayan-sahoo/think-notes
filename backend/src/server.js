import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import connectDB from "./config/db.js";

import notesRoute from "./routes/notes.route.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();
const PORT = process.env.PORT || 5432;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);

// Error handling middleware
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

app.use("/api/notes", notesRoute);

app.get("/", (req, res) => {
  res.send("Hello from the backend");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});

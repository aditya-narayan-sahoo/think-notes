import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();
const PORT = process.env.PORT || 5432;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello from the backend");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});

db.connect((err) => {
  if (err) throw err;
  console.log("✅ Connected to MySQL database");
});

app.get("/", (req, res) => {
  res.send("🛒 Mini Flipkart API is running!");
});

app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

app.get("/search", (req, res) => {
  const q = req.query.q || "";
  db.query("SELECT * FROM products WHERE title LIKE ?", [`%${q}%`], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

const PORT = process.env.PORT || 80;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
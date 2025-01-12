const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new pool({
  user: "DerekSave",
  host: "localhost",
  database: "",
  password: "",
  port: 5432,
});

//Routes
app.get("/posts", async (req, res) => {
  const result = await pool.query("SELECT * FROM blog_posts");
  res.json(result.rows);
});

app.post("/posts", async (req, res) => {
  const { title, description, content, image_url } = req.body;
  await pool.query(
    "INSERT INTO blog_posts (title, description, content, image_url) VALUES ($1, $2, $3, $4",
    [title, description, content, image_url]
  );
  res.send("Post created");
});

app.post("/posts/:id/like", async (req, res) => {
  const { id } = req.params;
  await pool.query(
    "UPDATE blog_posts SET like_count = like_count + 1 WHERE id = $1",
    [id]
  );
  res.send("Post liked");
});

const PORT = 5000;
app.listen(PORT, () => console.log("Server running on por ${PORT}"));

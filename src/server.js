const express = require("express");
const redis = require("./redis");
const postgres = require("./postgres");

const app = express();

app.use(express.json());

app.get("/messages", async (req, res) => {
  const messages = await redis
    .lRange("messages", 0, -1)
    .catch((err) => console.log(err));
  res.json({ messages });
});

app.post("/messages", async (req, res) => {
  const newMessage = req.body.message;
  await redis.lPush("messages", newMessage).catch((err) => console.log(err));
  res.json({ message: "Message has been posted succesfully." });
});

app.get("/users", async (req, res) => {
  try {
    const result = await postgres.query("SELECT * FROM users");
    res.send(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching users");
  }
});

app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  try {
    await postgres.query("INSERT INTO users (name, email) VALUES ($1, $2)", [
      name,
      email,
    ]);
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

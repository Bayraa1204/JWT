const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());

const data = require("./mockData.json");

app.get("/users", (req, res) => {
  const jwtToken = req.headers.authorization;
  jwt.verify(jwtToken, "secretPass", (err) => {
    if (err) {
      res.send("not accepted token");
    }
  });
  if (jwtToken) {
    res.send(data);
  } else {
    res.send("not authorized");
  }
});
app.post("/login", (req, res) => {
  const body = req.body;
  const jwtToken = jwt.sign(body, "secretPass");
  res.send(jwtToken);
});

app.listen("3000", console.log("running on port 3000"));

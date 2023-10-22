const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employeeSystem",
});

const apiKeyAuth = (req, res, next) => {
  if (req.get("X-Api-Key") !== "4BLtUc3mPUwYV4h9") {
    res.status(401).send({
      traceId: "health-check-err-001",
      msg: "not found api key",
    });
    return;
  }
  next();
};

const accessTokenAuth = (req, res, next) => {
  const token = req.get("Authorization").replace("Bearer ", "");
  if (token !== "tokenUser001") {
    res.status(401).send({
      traceId: "employeeErr-001",
      msg: "not found access token",
    });
    return;
  }
  next();
};

app.get("/health-check", apiKeyAuth, (req, res) => {
  res.send({ version: "Version-1" });
});

app.get("/employees", accessTokenAuth, (req, res) => {
  const id = req.query.id;

  if (id) {
    db.query("SELECT * FROM employees WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  } else {
    db.query("SELECT * FROM employees", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  }
});

app.post("/create", accessTokenAuth, (req, res) => {
  const { name, age, country, position, wage } = req.body;

  db.query(
    "INSERT INTO employees (name, age, country, position, wage) VALUES (?, ?, ?, ?, ?)",
    [name, age, country, position, wage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values inserted");
      }
    }
  );
});

app.put("/update", accessTokenAuth, (req, res) => {
  const id = req.body.id;
  const wage = req.body.wage;

  db.query(
    "UPDATE employees SET wage = ? WHERE id = ?",
    [wage, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", accessTokenAuth, (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen("3001", () => {
  console.log("Server is running on port 3001");
});

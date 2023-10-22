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

app.get("/employees", (req, res) => {
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

app.post("/create", (req, res) => {
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

// ใช้ patch ก็ได้
app.put("/update", (req, res) => {
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

app.delete("/delete/:id", (req, res) => {
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

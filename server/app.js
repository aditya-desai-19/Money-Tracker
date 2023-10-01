const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();


app.use(cors());
app.use(bodyParser.json());

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'money',
    port: 5000,
    multipleStatements: true
});

conn.connect((err) => {
    if (err) throw err;
    console.log("Connected to database");
});

app.get("/", function (req, res) {
    res.send("Welcome to backend!");
});

app.get('/transactions', function (req, res) {
    const query = `SELECT * FROM transaction`;
    conn.query(query, function (err, data) {
        if (err) return res.json(err);
        res.json(data);
        console.log({ data });
    });
});

app.get('/income', function (req, res) {
    const query = "SELECT SUM(amount) AS income FROM transaction WHERE type = 'Income'";
    conn.query(query, function (err, data) {
        if (err) return res.json(err);
        res.json(data);
        console.log({ data });
    });
});

app.get('/expense', function (req, res) {
    const query = "SELECT SUM(amount) AS expense FROM transaction WHERE type = 'Expense'";
    conn.query(query, function (err, data) {
        if (err) return res.json(err);
        res.json(data);
        console.log({ data });
    });
});

app.get('/total', function (req, res) {
    const query = "SELECT SUM(amount) AS total FROM transaction";
    conn.query(query, function (err, data) {
        if (err) return res.json(err);
        res.json(data);
        console.log({ data });
    });
});

app.post('/addtransaction', function (req, res) {
    const { date, type, category, amount } = req.body;
    console.log(date, category, amount, type)
    const query = "INSERT INTO transaction(`date`, `type`, `category`, `amount`) VALUES(?)";
    const values = [date, type, category, amount];
    conn.query(query, [values], function (err, result) {
        if (err) throw err;
        res.send("Transaction added successfully!");
    });
});

app.delete('/transaction/:id', function (req, res) {
    const id = req.params.id;
    const query = `DELETE FROM transaction WHERE id = ${id}`;
    conn.query(query, function (err, result) {
        if (err) throw err;
        res.json("Transaction deleted successfully!");
    });
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
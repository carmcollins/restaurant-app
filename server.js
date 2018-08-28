// Dependencies
// ============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// ============================================================
var app = express();
var PORT = process.env.PORT || 3000;

/// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up (DATA)
// ==========================================================
var tables = [];



var waitList = [];



// Set up (ROUTES)
// ==========================================================
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/view-tables", function (req, res) {
    res.sendFile(path.join(__dirname, "view-tables.html"));
});

app.get("/make-res", function (req, res) {
    res.sendFile(path.join(__dirname, "make-res.html"));
});

//displays tables and waiting list
app.get("/api/tables", function (req, res) {
    return res.json(tables);
});

app.get("/api/waitList", function (req, res) {
    return res.json(waitList);
});

//Create New Reservation
app.post("/api/tables", function (req, res) {
    console.log("message received");

    var newRes = req.body;

    console.log(newRes);

    if (tables.length >= 5) {
        waitList.push(newRes);
        res.send(false);
    } else {
        tables.push(newRes);
        res.send(true);
    }
});

// Starts the server to begin listening
//==========================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  
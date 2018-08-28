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
var tables = {
    routeName: "guestone",
    name: "Guest One",
    phoneNumber: 555 - 555 - 5555,
    email: "guestone@example.com",
    uniqueId: 1350
};

var waitList = {};



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

    var newres = req.body;

    newres.routeName = newres.name.replace(/\s+/g, "").toLowerCase();

    console.log(newres);

    if (tables.length > 5) {
        waitList.push(newres);
    } else {
        tables.push(newres);
    }

    res.json(newres);
});

// Starts the server to begin listening
//==========================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  
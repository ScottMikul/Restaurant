// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const tables = [];
const waitingList = [];
const numOfTables = 5;

class Table {
    constructor(name,phoneNumber,email,id){
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.id = id;
    }
}

// Return json for tables and waiting list
app.get("/tables", function(req, res) {
  return res.json(tables);
});
app.get("/waitingList", function(req, res) {
    return res.json(waitingList);
});

//html routes for the different html pages
app.get("/", function(req, res) {
    return res.sendFile(`${__dirname}/index.html`);
});
app.get("/tables", function(req, res) {
    return res.sendFile("./tables.html");
});
app.get("/reserve", function(req, res) {
    return res.sendFile("./reserve.html");
});

// add a table
app.post("/table", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var table = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  table.routeName = table.name.replace(/\s+/g, "").toLowerCase();

  if(tables.length>=numOfTables){
    waitingList.push(table);
  }
  else{
    tables.push(table);
  }

  res.json(tables);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

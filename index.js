// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

/*

You should provide your own project, not the example URL.
Waiting:A request to /api/:date? with a valid date should return a JSON object with a unix key that is a Unix timestamp of the input date in milliseconds (as type Number)
Waiting:A request to /api/:date? with a valid date should return a JSON object with a utc key that is a string of the input date in the format: Thu, 01 Jan 1970 00:00:00 GMT
Waiting:A request to /api/1451001600000 should return { unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }
Waiting:Your project can handle dates that can be successfully parsed by new Date(date_string)
Waiting:If the input date string is invalid, the api returns an object having the structure { error : "Invalid Date" }
Waiting:An empty date parameter should return the current time in a JSON object with a unix key
Waiting:An empty date parameter should return the current time in a JSON object with a utc key

*/

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

let dateHandler = (req, res) => {
  console.log(req.params.date);

  const givenDate = req.params.date;
  let date;
  let obj = {
    unix: 0,
    utc: ""
  };
  
  
  if(!givenDate) {
    date = new Date();  
  } else {
    const checkUnix = givenDate * 1;
    date = isNaN(checkUnix) ? new Date(givenDate) : new Date(checkUnix);
  }

  if(date == "Invalid Date") {
    res.json({error: "Invalid Date"});
  } else {
    obj.unix = date.getTime();
    obj.utc = date.toUTCString();
    res.json(obj);
  }

  // let date = new Date(req.params.date);
  // let unixTime = date.valueOf();
};

app.route("/api/:date?")
  .get(dateHandler)
  .post(dateHandler);

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

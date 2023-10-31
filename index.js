// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:id", (req, res) => {
  console.log(req.params.id)
  const id = req.params.id;
  const utc = new Date(id).toUTCString();
  const unix = new Date(id).getTime();

  if (id.match(/^-\d+$|^\d+$/)) {
    return res.json({ "unix": id, "utc": new Date(Number(req.params.id)).toUTCString() })
  } else if (utc === "Invalid Date") {
    return res.json({ "error": utc })
  }
  res.json({ "unix": new Date(id).getTime(), "utc": new Date(id).toUTCString() })
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

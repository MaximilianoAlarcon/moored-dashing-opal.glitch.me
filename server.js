// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

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


app.get("/api/timestamp/:date_string", (req, res, next) => {
  if(req.params.date_string == null) req.params.date_string = new Date();
  let dateString = req.params.date_string;
  var esutc = false, esunix = false, sontodosnumeros=true;
  var cadena = String(dateString);
  var entero = parseInt(dateString);
  var datecadena = new Date(cadena); var splitcadena = cadena.split("");
  for(var i=0;i<splitcadena.length;i++)
    {
      if( splitcadena[i].toUpperCase() != splitcadena[i].toLowerCase() ) 
        {
          sontodosnumeros=false;
        }
    }
  var dateentero = new Date(entero);
  if(dateentero != "Invalid Date" && entero >= 10000 && sontodosnumeros){ esunix = true; }
  if(datecadena != "Invalid Date"){ esutc = true; }
  var mensaje = [];

  console.log("UTC: "+esutc+"    "+dateString);
  console.log("UNIX: "+esunix+"    "+dateString);
  
  if(dateentero != null && typeof dateentero !== 'undefined' && dateentero != "Invalid Date" && esunix) mensaje = dateentero; 
  if(datecadena != null && typeof datecadena !== 'undefined' && datecadena != "Invalid Date" && esutc) mensaje = datecadena; 
  //console.log(splitcadena);
  if(mensaje != "")
     {
  res.json({"unix": mensaje.valueOf(), "utc" : mensaje.toUTCString () });
} else {
  res.json({
"error": "Invalid Date"
});
}
  //var x = new Date('Tue Mar 31 2020 19:29:48 GMT+0000 (Coordinated Universal Time)');
  //console.log(x);
  next();
});

app.get("/api/timestamp/", (req, res) => {
  res.json({ unix: Date.now(), utc: new Date().toUTCString ()});
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
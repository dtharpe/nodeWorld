var express = require('express');
var mysql = require('mysql');
var ejs = require('ejs');

//decleration
var app = express();

app.set('views',__dirname + '/views');
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/css'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
//db connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'UfrZNwca',
    database: 'world'
});

connection.connect();

//routes
app.get('/', function(req, res){
  res.render('main/index.ejs');
});


app.get('/country', function(req, res){
  var searchQuery = connection.query('Select * From Country Order By Code ASC', function(err, rows, fields) {
    var data=[];
    for(i=0;i<rows.length;i++)
    {
      data.push(rows[i]);
    }
    var title = 'View The Countries';
    res.render('country/index.ejs',{
      title: title,
      data: data
    });
  });
});


app.get('/country/:capital', function(req, res){
  var searchQuery = connection.query("Select * From Country Where Capital=" + req.params.capital, function(err, rows, fields) {
    var data=[];
    data.push(rows);
    if(req.params.capital){
      var title = 'View This Country ' + rows.Name;
    }
    res.render('country/indepth.ejs',{
      title: title,
      country: JSON.stringify(data)
    });
  });
});


app.get('/city', function(req, res){
  var searchQuery = connection.query('Select * From City Order By CountryCode ASC', function(err, rows, fields) {
    var data=[];
    for(i=0;i<rows.length;i++)
    {
      data.push(rows[i]);
    }
    var title = 'View The Cities';
    res.render('city/index.ejs',{
      title: title,
      data: data
    });
  });
});


app.get('/language', function(req, res){
  var searchQuery = connection.query('Select * From CountryLanguage Order By CountryCode ASC', function(err, rows, fields) {
    var data=[];
    for(i=0;i<rows.length;i++)
    {
      data.push(rows[i]);
    }
    var title = 'View The Languages';
    res.render('language/index.ejs',{
      title: title,
      data: data
    });
  });
});


//API routes
app.get('/api/getCountryData/:capital', function(req, res){
  var searchQuery = connection.query("Select * From Country Where Capital= " + req.params.capital, function(err, rows, fields) {
      var data=[];
      data.push(rows);
    res.end(JSON.stringify(data));
  });

});




//server
var server = app.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('app listening @', host, port);
});

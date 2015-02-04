var express = require('express');
var mysql = require('mysql');
var ejs = require('ejs');

//decleration
var app = express();

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
app.get('/api/getCountry', function(req, res){

  var searchQuery = connection.query('Select * From Country Order By Code DESC', function(err, rows, fields) {
      var data=[];
      for(i=0;i<rows.length;i++)
      {
        data.push(rows[i]);
      }
    res.end(JSON.stringify(data));
  });

});




//server
var server = app.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('app listening @', host, port);
});

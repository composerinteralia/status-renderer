const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
var favicon = require('serve-favicon');
var http = require('http');

const app = express();

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(function (req, res, next) {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use(favicon(__dirname + '/public/favicon.ico'));

app.get('/', (request, response) => {
  http.get({ host: 'localhost', port: 8080, path: '/status' }, function(res) {
    res.setEncoding('utf8').on('data', function(chunk) {
      response.render('index', { data: chunk });
      console.log('Rendering index.hbs - status 200');
    });
  }).on('error', function(e) {
    response.status(422);
    response.render('error');
    console.log("Error: " + e.message);
  });
});

app.listen(8000, (err) => {
  console.log(`Ready to serve!`);
});

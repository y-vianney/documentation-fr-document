require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const getFileData = require('./middleware').getFileData;

const port = process.env.PORT || 3000;
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

app.get('/view-document', getFileData, (req, res) => {
  const data = req.data;

  if (Object.keys(data).length === 0) {
    console.log('No query parameters provided.');
    res.render('book-view', { data: null });
    return;
  }

  let parsedData = data;

  res.render('book-view', { data: parsedData });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})

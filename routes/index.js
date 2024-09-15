var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/view-document', (req, res) => {
  // console.log(Object.entries(req.body));
  const data = req.query;
  // console.log(data)

  let parsedData;
  if (typeof data === 'string') {
    try {
      parsedData = JSON.parse(data);
    } catch (e) {
      console.error('Error parsing data:', e);
      parsedData = data;
    }
  } else {
    parsedData = data;
  }

  console.log('Data received.');

  res.render('book-view', { data: data });
})

module.exports = router;


var express = require('express');
var router = express.Router();
var SentimentAnalysis = require('../src/nlp');

/* GET home page. */
router.get('/', function (req, res, next) {
  //let NLP = new SentimentAnalysis('hello world').Sentiment();
  res.render('index', { title: 'Revive' });
});

module.exports = router;

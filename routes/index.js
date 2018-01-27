var express = require('express');
var router = express.Router();
//var SpeechAnalysis = require('../src/speech');
var SentimentAnalysis = require('../src/nlp');

/* GET home page. */
router.get('/', function(req, res, next) {
  //let Speech = new SpeechAnalysis().SpeechRecognitionInit();
  let NLP = new SentimentAnalysis('hey there! How are you').Sentiment();
  res.render('index', { title: 'Revive' });
});

module.exports = router;

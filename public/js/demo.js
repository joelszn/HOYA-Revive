'use strict';
/*
 * JQuery on ready callback function
 */
function ready() {
  // CSRF protection
  $.ajaxSetup({
    headers: {
      'csrf-token': $('meta[name="ct"]').attr('content')
    }
  });

  // load all json data first
  $.when(
    $.ajax('/data/threshold_v0.1.1.json'),
    $.ajax('/data/emotional.txt'),
    $.ajax('/data/physical.txt'),
    $.ajax('/data/social.txt'))
    .done(function (thresholds, emotional, physical, social) {
      var sentimentActivity = {
        'emotional': emotional[0],
        'physical': physical[0],
        'social': social[0],
        'own-text': ''
      };
      allReady(thresholds[0], sentimentActivity);
    });
}

/**
 * Load application after initial json data is loaded
 * @param {Object} thresholds thresholds json
 * @param {Object} sentimentActivity collection of sample text json
 * @return {undefined}
 */
function allReady(thresholds, sentimentActivity) {
  var $input = $('.input'),
    $jsonCode = $('.json--code'),
    $output = $('.output'),
    $error = $('.error'),
    $errorMessage = $('.error--message'),
    $textarea = $('.input--textarea'),
    $submitButton = $('.input--submit-button'),
    selectedLang = 'en',
    lastSentenceID;
  /**
   * 
   * @param {Object} data Data file to store
   */
  function storeSentimentData(data) {

  }
  /**
   * Callback function for AJAX post to get tone analyzer data
   * @param {Object} data response data from api
   * @return {undefined}
   */
  function toneCallback(data) {
    console.log($jsonCode.value);
    $jsonCode.value;
    // JULIA'S FUNCTION GOES HERE


    ////
    $input.show();
    $error.hide();
    $output.hide();

    var emotionTone = data.document_tone.tones.slice(0),
      selectedSampleText = $textarea.val(),
      sentences, sentenceTone = [],
      app;
    console.log(emotionTone);
    // if only one sentence, sentences will not exist, so mutate sentences_tone manually
    if (typeof (data.sentences_tone) === 'undefined' || data.sentences_tone === null) {
      sentences = [{
        sentence_id: 0, // eslint-disable-line camelcase
        text: selectedSampleText,
        tones: data.document_tone.tones.slice(0)
      }];
    } else {
      //Deep copy data.sentences_tone
      sentences = JSON.parse(JSON.stringify(data.sentences_tone));
    }

    //Populate sentencesTone with all unique tones in sentences, to be displayed in sentence view
    sentences.forEach(function (elements) {
      elements.tones.forEach(function (item) {
        if (sentenceTone[item.tone_id] == null || sentenceTone[item.tone_id].score < item.score) {
          sentenceTone[item.tone_id] = item;
        }
      });
    });
    sentenceTone = Object.keys(sentenceTone).sort().map(function (obj) {
      return sentenceTone[obj];
    });

    app = new App(data.document_tone, sentences, thresholds, null, sentenceTone);
    /**
     * Map Callback function for emotion document tones
     * @param {Object} item current iterating element
     * @return {Object} label, score, threshold
     */
    function emotionMap(item) {
      var v1 = app.percentagify(item.score, 'Emotion Tone');
      var v2 = app.percentagify(app.thresholds().doc[item.tone_name][0]);
      var v3 = app.percentagify(app.thresholds().doc[item.tone_name][1]);
      return {
        label: item.tone_name,
        score: app.percentagify(item.score, 'Emotion Tone'),
        tooltip: app.toneHash()[item.tone_name].tooltip,
        likeliness: v1 > v3 ? 'VERY LIKELY' : v1 >= v2 ? 'LIKELY' : 'UNLIKELY',
        visible: v1 > v3 ? 'show' : v1 >= v2 ? 'show' : 'dim',
        thresholdLow: app.percentagify(app.thresholds().doc[item.tone_name][0]),
        thresholdHigh: app.percentagify(app.thresholds().doc[item.tone_name][1])
      };
    }
    app.selectFilterBySample();

    //emotionTone has document level tones. Need to display all available tones at this level
    emotionTone = app.getDocumentToneDefault();
    //Update scores for the tones present in response at document level
    if (typeof (data.document_tone.tones) !== 'undefined' && data.document_tone.tones !== null) {
      data.document_tone.tones.forEach(function (element) {
        emotionTone.forEach(function (item) {
          if (item.tone_id == element.tone_id) {
            item.score = element.score;
          }
        });
      });
    }

    emotionTone = emotionTone.map(emotionMap);
    sentenceTone = sentenceTone.map(emotionMap);
  }

  /**
   * AJAX Post request on error callback
   * @param {Object} error The error
   * @return {undefined}
   */
  function _error(error) {
    var message = typeof error.responseJSON.error === 'string' ?
      error.responseJSON.error :
      'Error code ' + error.responseJSON.error.code + ': ' + error.responseJSON.error.message;

    if (error.responseJSON.code === 429) {
      message = 'You\'ve sent a lot of requests in a short amount of time. ' +
        'As the CPU cores cool off a bit, wait a few seonds before sending more requests.';
    }

    $errorMessage.html(_.template(errorMessage_template, {
      items: [{
        errorCode: error.responseJSON.code,
        errorMessage: message
      }]
    }));

    $input.show();
    $output.hide();
    $error.show();
  }

  /**
   * AJAX Post request for tone analyzer api
   * @param {String} text request body text
   * @return {undefined}
   */
  function getToneAnalysis(text) {
    $.post('/api/tone', { 'text': text, 'language': selectedLang }, toneCallback)
      .fail(_error);
  }

  /**
   * Emit view update for input text area view
   * @param {String} value sample text id
   * @return {undefined}
   */
  function updateTextarea(value) {
    $textarea.val(sentimentActivity[value]);
  }

  /**
   * Reset views to beginning state
   * @return {undefined}
   */
  function reset() {
    $input.show();
    $output.hide();
    $error.hide();
    $('#input-tweets').trigger('click');
  }

  /**
   * Submit button click event
   */
  $submitButton.click(function () {
    $input.show();
    $output.hide();
    $error.hide();
    lastSentenceID = null;
    getToneAnalysis($textarea.val());
  });
  updateTextarea($('.input--radio:checked').val());
}

$(document).ready(ready);

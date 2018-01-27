/**
 * Speech Analysis
 * Turns speech input into text for NLP
 */

(() => {
    'use strict';

    class SpeechAnalysis {
        constructor() {
            this.transcript = '';
            this.speech = {
                start: document.getElementById('voice-input'),
                stop: document.getElementById('voice-input-stop')
            },
                this.SpeechRecognizer = new window.webkitSpeechRecognition();
        }

        SpeechRecognitionInit() {
            this.SpeechRecognizer.lang = 'en-GB';
            this.SpeechRecognizer.continuous = true;
            this.SpeechRecognizer.interimResults = true;
            this.SpeechRecognizer.onresult = (event) => {
                let current = event.resultIndex;
                this.transcript = event.results[current][0].transcript;
            }
            this.SpeechRecognizer.onspeechend = () => {
                return this.transcript;
            }
            this.SpeechRecognizer.start();
        }
        SpeechRecognition() {
            this.speech.start.addEventListener('click', this.SpeechRecognitionInit(), true);
        }
    }
})();
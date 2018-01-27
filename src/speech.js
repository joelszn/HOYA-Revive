/**
 * Speech Analysis
 * Turns speech input into text for NLP
 */

class SpeechAnalysis {
    constructor() {
        this.speech = {
            voiceInput: {
                start: document.getElementById('voice-input'),
                stop: document.getElementById('voice-input-stop')
            }
        },
        this.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.SpeechRecognizer = new SpeechRecognition();
    }


    SpeechRecognitionInit() {
        this.SpeechRecognizer.lang = 'en-GB';
        this.SpeechRecognizer.continuous = true;
        this.SpeechRecognizer.interimResults = true;
        this.SpeechRecognizer.onresult = (event) => {
            let current = event.resultIndex;
            let transcript = event.results[current][0].transcript;
            console.log(transcript);
        }
        this.SpeechRecognizer.start();
    }
    StartSpeechRecognition() {
        this.app.voiceInput.start.addEventListener('click', this.SpeechRecognitionInit, false);
    }
    StartSpeechRecognition() {
        this.app.voiceInput.start.addEventListener('click', this.SpeechRecognizer.stop(), false);
    }

}

module.exports = SpeechAnalysis;

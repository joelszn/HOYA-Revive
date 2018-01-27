// Imports the Google Cloud client library
const language = require('@google-cloud/language');

class NLP {

	constructor(transcript) {
		this.client = new language.LanguageServiceClient();
		this.text = transcript;
		this.document = {
			content: this.text,
			type: 'PLAIN_TEXT',
		};
	}

	Sentiment() {
		this.client
			.analyzeSentiment({ document: this.document })
			.then(results => {
				const sentiment = results[0].documentSentiment;

				console.log(`Text: ${this.text}`);
				console.log(`Sentiment score: ${sentiment.score}`);
				console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
			})
			.catch(err => {
				console.error('ERROR:', err);
			});
	}
}

//new NLP(`OK. I love you`).Init();

module.exports = NLP;

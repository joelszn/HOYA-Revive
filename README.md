##Inspiration
Over 3 million teenagers in the United States are estimated to have depression, and over 6 million suffer from anxiety. In our fast-paced, success-driven society, it can sometimes be hard for adolescents to realize and admit that they need help. So we built Revive, an progressive web application that responds to a user's voice input with suggestions based on their perceived emotions. Many people do not have access to therapists. Revive gives everyone an outlet to express their feelings and experience validation.

##What it does
Revive greets an upset user with an encouraging message. It suggests actions the user can take to improve their mood based on user preferences and the strength of their current emotions. If the user is not upset, Revive responds positively to the user to allow them to communicate with their current state of mind. Revive uses this data to build a better user experience for future conversations. When a new user is upset, they receive three suggestions on how to improve their mood: one physical activity, one mental activity, and one social activity. Over time, Revive will learn from their choices to provide more relevant options to each user.

##How we built it
We utilized JavaScript's Speech Recognition API to transcribe the user's voice input to text on the client side. We used the IBM Watson Tone Analyzer API service, which processed the transcribed text. IBM’s AI powered API provided the raw list of emotions and the strength of those emotions. We utilized Express.js to create a minimal and flexible Node.js backend framework that provides a robust set of features such as HTTP Utility Methods for creating a robust API then used Google Cloud Platform's App Engine to host our backend server. We used Jade (Pug) to create an feature-rich, elegant template engine for our server-side templating in Node.js, because of its inherent advantages over plain HTML.

##Challenges we ran into
After spending over 10 hours working on separate modules for our application, we finally decided to merge all four modules for beta testing. That is when the real heat of software development kicked in! We got all modules to work, but we could not figure out how to connect the data input from the UI to the backend server. This was the biggest challenge we had, as we had to completely switch to a new API for our application to work properly. Also, configuring Express.js to work properly with the new API and the UI presented new challenges. However, we eventually worked our way around by using a JavaScript library. Lastly, the last minute switch from Bootstrap to Material Design introduced a number of bugs to the UI. We stayed up all night to fix these issues!

##Accomplishments that we're proud of
We are proud to have created a beautiful and functional web application that has the potential to help adolescents express and cope with their negative emotions.

##What we learned
We all stepped out of our comfort zones while developing Revive. We were able to try out and implement new products and APIs. Google and IBM software architects advised us during the design phase. Some of us were not very comfortable with Javascript, so we had to learn a lot in order to complete the project in less than 36 hours

##What's next for Revive
We plan to make the application more responsive to users. We will increase its learning capabilities so that it can serve as a fun, interactive personal assistant that can provide emotional support to a wide variety of people around the globe.

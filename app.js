var Alexa = require('alexa-app')
var getTopNews = require('./get-top-news.js')

var app = new Alexa.app('hacker-news') // eslint-disable-line

app.launch(function (request, response) {
  var launchOutput = 'Welcome to Hacker Update.  The purpose of this skill is see what the newest titles and descriptions are from Hacker News.  To start using the skill, say Alexa, ask hacker update to tell me the top stories.'
  response.say(launchOutput)
  response.shouldEndSession(false)
})

app.intent('AMAZON.HelpIntent', {
  'slots': {},
  'utterances': []
}, function (request, response) {
  var helpOutput = 'Welcome to Hacker Update.  The purpose of this skill is see what the newest titles and descriptions are from Hacker News.  To start using the skill, say Alexa, ask hacker update to tell me the top stories. What would you like to do?'
  response.say(helpOutput)
  response.shouldEndSession(false)
})

app.intent('AMAZON.StopIntent', {
  'slots': {},
  'utterances': []
}, function (request, response) {
  var stopOutput = 'Stopping your Request and Exiting Skill'
  response.say(stopOutput).send()
})

app.intent('AMAZON.CancelIntent', {
  'slots': {},
  'utterances': []
}, function (request, response) {
  var cancelOutput = 'Canceling your Request and Exiting Skill'
  response.say(cancelOutput).send()
})

app.intent('TopNewsIntent', {
  'slots': {},
  'utterances': ['to tell me the top stories', 'to say the top articles', 'to give me top stories']
}, function (request, response) {
  return getTopNews()
    .then(function (output) {
      response.say(output)
    })
    .catch(function (error) {
      console.log(error)
      var errorGet = 'We failed to get the news, try again.'
      response.say(errorGet)
    })
})

module.exports = app

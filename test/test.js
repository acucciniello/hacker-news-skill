var chai = require('chai')
var bst = require('bespoken-tools')
var assert = chai.assert
var server = null
var alexa = null

beforeEach(function (done) {
  // first param - the location of lambda file to be return
  // second - port
  // third - verbose mode res/req sent to console
  server = new bst.LambdaServer('../index.js', 10000, true)
  // 1st - url of server
  // 2 - IntentSchema
  // utterances
  alexa = new bst.BSTAlexa('http://localhost:10000',
                './speechAssets/IntentSchema.json',
                './speechAssets/SampleUtterances.txt')
  server.start(function () {
    alexa.start(function (error) {
      if (error !== undefined) {
        console.log('Error: ' + error)
      } else {
        done()
      }
    })
  })
})

afterEach(function (done) {
  alexa.stop(function () {
    server.stop(function () {
      done()
    })
  })
})

it('Launches the skill', function (done) {
  // Launch the skill via launch request
  alexa.launched(function (error, payload) {
    if (error) {
      console.log(error)
      done()
    }
    assert.equal(payload.response.outputSpeech.ssml, '<speak>Welcome to Hacker Update. The purpose of this skill is see what the newest titles and descriptions are from Hacker News.  To start using the skill, say Alexa, ask hacker update to tell me the top stories.</speak>')
    assert.equal(payload.response.shouldEndSession, false)
    done()
  })
})

it('Launches the Help intent and doesnt end session', function (done) {
  alexa.intended('AMAZON.HelpIntent', null, function (error, payload) {
    if (error) {
      console.log(error)
      done()
    }
    assert.equal(payload.response.outputSpeech.ssml, '<speak>Welcome to Hacker Update. The purpose of this skill is see what the newest titles and descriptions are from Hacker News.  To start using the skill, say Alexa, ask hacker update to tell me the top stories. What would you like to do?</speak>')
    assert.equal(payload.response.shouldEndSession, false)
    done()
  })
})

it('Stops and Exits Skill upon calling StopIntent', function (done) {
  alexa.intended('AMAZON.StopIntent', null, function (error, payload) {
    if (error) {
      console.log(error)
      done()
    }
    assert.equal(payload.response.outputSpeech.ssml, '<speak>Stopping your Request and Exiting Skill</speak>')
    done()
  })
})

it('Cancels and Exits Skill upon calling CancelIntent', function (done) {
  alexa.intended('AMAZON.CancelIntent', null, function (error, payload) {
    if (error) {
      console.log(error)
      done()
    }
    assert.equal(payload.response.outputSpeech.ssml, '<speak>Canceling your Request and Exiting Skill</speak>')
    done()
  })
})

it('Launches TopNewsIntent with Utterance', function (done) {
  alexa.spoken('to tell me the top stories', function (error, response, request) {
    if (error) {
      console.log(error)
    }
    assert.equal(request.request.intent.name, 'TopNewsIntent')
  })
  alexa.spoken('to say the top articles', function (error, response, request) {
    if (error) {
      console.log(error)
    }
    assert.equal(request.request.intent.name, 'TopNewsIntent')
  })
  alexa.spoken('to give me top stories', function (error, response, request) {
    if (error) {
      console.log(error)
    }
    assert.equal(request.request.intent.name, 'TopNewsIntent')
  })
  done()
})

it('Says Hi there with TopNewsIntent', function (done) {
  alexa.intended('TopNewsIntent', null, function (error, payload) {
    if (error) {
      console.log(error)
    }
    assert.include(payload.response.outputSpeech.ssml, '<speak>Here are your Articles: 1.')
  })
  done()
})

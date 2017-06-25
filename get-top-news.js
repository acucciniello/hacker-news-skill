module.exports = getTopNews

var path = require('path')
var pathToEnv = path.join(__dirname, '.env')
require('dotenv').config({path: pathToEnv})
const got = require('got')
var Promise = require('promise')
var formatOutput = require('./format-output.js')
var apiKey = process.env.APIKEY
var url = 'https://newsapi.org/v1/articles?source=hacker-news&sortBy=top&apiKey=' + apiKey

function getTopNews () {
  return new Promise(function (resolve, reject) {
    got(url)
      .then((response) => {
        var parsedRes = JSON.parse(response.body)
        var output = formatOutput(parsedRes)
        resolve(output)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

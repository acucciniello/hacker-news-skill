module.exports = formatOutput

function formatOutput (response) {
  var output = 'Here are your Articles: '
  for (var i = 0; i < (3 || response.articles.length); i++) {
    var articleCount = i + 1
    if (response.articles[i].title !== null && response.articles[i].description !== null) {
      output = output + articleCount + '. ' + response.articles[i].title + ' <break time="500ms" /> ' + response.articles[i].description + ' <break time="500ms" />'
    } else if (response.articles[i].title !== null && response.articles[i].description === null) {
      output = output + articleCount + '. ' + response.articles[i].title + ' <break time="500ms" /> ' + ' no description ' + ' <break time="500ms" />'
    } else if (response.articles[i].title === null && response.articles[i].description !== null) {
      output = output + articleCount + '. ' + ' no title ' + ' <break time="500ms" /> ' + response.articles[i].description + ' <break time="500ms" />'
    } else {
      output = output + articleCount + '. ' + ' no title ' + ' <break time="500ms" /> ' + ' no description ' + ' <break time="500ms" />'
    }
  }
  return output
}

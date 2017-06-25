module.exports = formatOutput

function formatOutput (response) {
  var output = 'Here are your Articles: '
  for (var i = 0; i < (3 || response.articles.length); i++) {
    var articleCount = i + 1
    output = output + articleCount + '. ' + response.articles[i].title + ' <break time="500ms" /> ' + response.articles[i].description + ' <break time="500ms" />'
  }
  return output
}

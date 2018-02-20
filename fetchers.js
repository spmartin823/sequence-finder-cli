// this is where the memoize function will be created to hit the graph database. 
var axios = require('axios')

const getSequences = (sequence) => {
  let oeis = `http://oeis.org/search?fmt=json&q=${sequence}`
  return axios.get(oeis)
    .then(sequence => {
      return sequence.data.results.reduce((acc, seq) => {
        acc[seq.name] = seq;
        return acc; 
      }, {})
    })
    .catch(err => `There was an error processing your sequence. 
                   The error reads ${err}`)
}

module.exports = {
  getSequences
}
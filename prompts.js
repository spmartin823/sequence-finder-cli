const inquirer = require('inquirer')
const validators = require('./promptValidators')

const enterSequence = {
  message: "Please input a sequence (seperate with commas ex: 1,1,2,3,5,8):",
  type: "input",
  name: "sequence", 
  validate: validators.sequenceValidator
}

const createSelectSequenceFromTop = (seqObj) => {
  let promptObj = {
    message: "These are the top matches. Select a sequence to learn more about it:",
    type: "list",
    name: "key"
  }
  let names = Object.keys(seqObj);
  if (names.length > 5) {
    names = names.slice(0, 4)
    names.push('See more matches')
  }
  promptObj['choices'] = names;
  return promptObj;
}

const createSelectSequenceFromAll = (seqObj) => {
  let promptObj = {
    message: "These are all of the matches. Select a sequence to learn more about it:",
    type: "list",
    name: "key"
  }
  promptObj['choices'] = Object.keys(seqObj)
  promptObj['choices'].push(new inquirer.Separator())
  return promptObj;
}

const sequenceMatchMenu = {
  message: "What would you like to do next?",
  type: "list",
  name: "menuItem", 
  choices: ['Return to potential matches', 'Search a new sequence', 'Exit']
}

const noSequenceMatchMenu = {
  message: "What would you like to do next?",
  type: "list",
  name: "menuItem", 
  choices: ['Search a new sequence', 'Exit']
}


module.exports = {
  enterSequence,

  createSelectSequenceFromTop,
  createSelectSequenceFromAll,

  sequenceMatchMenu,
  noSequenceMatchMenu
}
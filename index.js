#! /usr/bin/env node

const inquirer = require('inquirer'); 
const axios = require('axios');

const getSequences = require('./fetchers').getSequences;
const prompts = require('./prompts');

const sequenceListIsEmpty = (seqObj) => {
  return typeof seqObj === 'string'
} 

const getInputSequence = async () => {
  let response = await inquirer.prompt([prompts.enterSequence])
  return await getSequences(response.sequence)
}

const selectSequenceAndTerms = async (seqObj) => {
  if (sequenceListIsEmpty(seqObj)) {
    console.log('There are no sequences that match these numbers!')
  } else {
    let { key } = await inquirer.prompt(prompts.createSelectSequenceFromTop(seqObj))
    if (key === 'See more matches') {
      response = await inquirer.prompt(prompts.createSelectSequenceFromAll(seqObj))
      key = response.key
    }
    let { name, data } = seqObj[key];
    console.log(`\nDescription: ${name}\n\nTerms: ${data}\n\n`)
  }
  return; 
}

const resetMenu = async (seqObj) => {
  // only includes relevant prompts (account for if there are no sequences that match)
  if (sequenceListIsEmpty(seqObj)) {
    var choice = await inquirer.prompt(prompts.noSequenceMatchMenu)
  } else {
    var choice = await inquirer.prompt(prompts.sequenceMatchMenu)
  }

  if (choice.menuItem === 'Exit') {
    console.log('See you later!')
  } else if (choice.menuItem === 'Search a new sequence') {
    startFromBeginning() 
  } else {
    startFromSequenceSelect(seqObj)
  }
  return; 
}

const startFromBeginning = async () => {
  let seqObj = await getInputSequence() 
  startFromSequenceSelect(seqObj)
}

const startFromSequenceSelect = async (seqObj) => {
  await selectSequenceAndTerms(seqObj)
  await resetMenu(seqObj);
}
// TODO: stack history, generators. 
startFromBeginning()

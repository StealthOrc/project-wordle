import React from 'react';
import Guess from '../Guess'
import {range} from '../../utils.js'
import { NUM_OF_GUESSES_ALLOWED } from '../../constants'

function GuessResult({ guesses, createGuess, answer}) {
  const filler = [];
  for (let i = guesses.length-1; i < NUM_OF_GUESSES_ALLOWED-1; i++) {
    filler.push(createGuess(""));
  }
  const filledGuesses = [...guesses, ...filler];
  return (
    <div className="guess-results">
      {filledGuesses.map(({id, guess, status}) => {
        return <Guess key={id} guess={guess} status={status}/>
      })}
    </div>
  )
}

export default GuessResult;

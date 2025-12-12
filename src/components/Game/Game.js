import React from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';
import GuessResult from '../GuessResult'
import Keyboard from '../Keyboard/'


import {checkGuess} from '../../game-helpers'
import * as constants from '../../constants.js'

const STATE_NEUTRAL = 0;
const STATE_WON = 1;
const STATE_LOSS = -1;
// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [input,setInput] = React.useState('');
  const [suggestions,setSuggestions] = React.useState([]);
  const [state,setState] = React.useState(STATE_NEUTRAL);

  function isWonOrLoss() {
    return [STATE_LOSS, STATE_WON].includes(state);
  }

  function isWon() {
    return state === STATE_WON;
  }

  function isLoss() {
    return state === STATE_LOSS;
  }

  const createGuess = (guess, status = '') => (
    {
      id: crypto.randomUUID(),
      guess,
      status
    }
  )

  const handleSubmit = (event) => {
    event.preventDefault();
    if (input.length < constants.NUM_GUESS_CHARS)
    {
      alert(`Enter a with ${constants.NUM_GUESS_CHARS} characters.`)
      return;
    }
    const newSuggestion = createGuess(input, checkGuess(input,answer));
    const nextSuggestions = [...suggestions,newSuggestion];
    setSuggestions(nextSuggestions);
    setInput('');
    if (state !== STATE_NEUTRAL)
      return;
    let isGameWon = true;
    newSuggestion.status.forEach(({letter,status}) => {
      isGameWon = isGameWon && status === 'correct';
    });
    if (isGameWon)
      setState(STATE_WON);
    if (nextSuggestions.length >= constants.NUM_OF_GUESSES_ALLOWED) 
      setState(STATE_LOSS);
  };

  const handleOnChange = (event) => {
    const inputText = event.target.value;
    if (inputText.length > constants.NUM_GUESS_CHARS)
      return;
    setInput(inputText.toUpperCase());
  }

  const handleAddChar = (char) => {
    const nextInput = input+char;
    if (nextInput.length > constants.NUM_GUESS_CHARS)
      return;
    setInput(nextInput.toUpperCase());
  }

  const handleDelete = (event) => {
    const nextInput = input.slice(0,input.length-1);
    setInput(nextInput);
  }

  return <>
    <GuessResult answer={answer} guesses={suggestions} createGuess={createGuess}/>
    <form className="guess-input-wrapper"
      onSubmit={handleSubmit}>
      <label htmlFor="guess-input">Enter guess:</label>
      <input id="guess-input" type="text" 
        required
        minLength={constants.NUM_GUESS_CHARS}
        maxLength={constants.NUM_GUESS_CHARS}
        pattern="[a-zA-Z]{5}"
        title="5 letter word"
        {...{disabled:isWonOrLoss()}}
        value={input}
        onChange={handleOnChange}
      />
      { isWonOrLoss() && (
          isWon() &&
          <div class="happy banner">
            <p>
              <strong>Congratulations!</strong> Got it in
              <strong> {suggestions.length} guesses</strong>.
            </p>
          </div>
        )
        || (
          isLoss() &&
          <div class="sad banner">
            <p>Sorry, the correct answer is <strong>{answer}</strong>.</p>
          </div>
        )
      }
      <Keyboard 
        handleChar={handleAddChar} 
        handleEnter={handleSubmit} 
        handleDelete={handleDelete}/>
    </form>
  </>;
}

export default Game;

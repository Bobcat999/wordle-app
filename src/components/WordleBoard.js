import React, { useState } from 'react'
import './WordleBoard.css';
import { WordRow } from './WordRow';

export const WordleBoard = ({keyWord}) => {
  const [guesses, setGuesses] = useState(Array(5).fill(''));
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0);

  const handleKeyPress = (event) => {
    if(currentGuessIndex >= 5) return
    let currentGuess = guesses[currentGuessIndex];
    if (event.code === `Key${event.key.toUpperCase()}` && currentGuess.length < 5) {
      currentGuess += event.key.toUpperCase();
      let newGuesses = [...guesses];
      newGuesses[currentGuessIndex] = currentGuess;
      setGuesses(newGuesses);
    } else if (event.key === 'Backspace' && currentGuess.length !== 0) {
      currentGuess = currentGuess.substring(0, currentGuess.length - 1);
      let newGuesses = [...guesses];
      newGuesses[currentGuessIndex] = currentGuess;
      setGuesses(newGuesses);
    } else if (event.key === 'Enter' && currentGuess.length === 5) {
      //check if its a word --TODO
      setCurrentGuessIndex(currentGuessIndex + 1);
    }
  }


  return (
    <div className='wordle-board' onKeyDown={handleKeyPress} tabIndex={0}>
      <h1>Wordle</h1>
      {
        guesses.map((guess, index) => {
          return <WordRow guess={guess} keyWord={index < currentGuessIndex ? keyWord : ''} key={index}/>;
        })
      }
    </div>

  )
}

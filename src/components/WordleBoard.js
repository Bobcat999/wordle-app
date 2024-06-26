import React, { useState } from 'react'
import './WordleBoard.css';
import { WordRow } from './WordRow';

export const WordleBoard = ({ keyWord, guesses, currentGuessIndex}) => {
  


  return (
    <div className='wordle-board'>
      <h1>Wordle</h1>
      {
        guesses.map((guess, index) => {
          return <WordRow guess={guess} keyWord={index < currentGuessIndex ? keyWord : ''} key={index} />;
        })
      }
    </div>

  )
}

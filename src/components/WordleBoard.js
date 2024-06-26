import React, { forwardRef, useRef, useState } from 'react'
import './WordleBoard.css';
import { WordRow } from './WordRow';

export const WordleBoard = ({ keyWord, guesses, currentGuessIndex, isShaking}) => {


  return (
    <div className='wordle-board'>
      <h1>Wordle</h1>
      {
        guesses.map((guess, index) => {
          return <WordRow 
            guess={guess} 
            keyWord={index < currentGuessIndex ? keyWord : ''} 
            isShaking={isShaking && currentGuessIndex === index}
            key={index} 
            />;
        })
      }
    </div>

  )
}

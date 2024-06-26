import React, { useEffect } from 'react'
import './Results.css';

export const Results = ({results}) => {

  return (
    <div className='results'>
        {
          results.hasWon
          ?
          <>
            <h1>Congradulations!</h1>
            <p>You guessed the right word in <strong>{results.finalGuessIndex + 1}</strong> guess{results.finalGuessIndex !== 0 && 'es'}</p>
          </>
          
          :
          <>
            <h1>You Lost</h1>
            <p>Better luck next time</p>
          </>
        }
        <h2>Keyword: {results.keyWord.charAt(0).toUpperCase() + results.keyWord.slice(1).toLowerCase()}</h2>
    </div>
  )
}

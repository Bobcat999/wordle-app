import React, { useEffect, useState } from 'react'
import './WordlePage.css'
import { WordleBoard } from '../components/WordleBoard'
import { Results } from '../components/Results'

const api_key = 'gr81u7evx04wjr661ppbbh9q2soazc8bimu1xcjpjb2kmkw5q';

function GameResults(hasWon, finalGuessIndex, guesses, keyWord){
  this.hasWon = hasWon;
  this.finalGuessIndex = finalGuessIndex;
  this.guesses = guesses;
  this.keyWord = keyWord;
}

export const WordlePage = () => {
  const [keyWord, setKeyWord] = useState('CRANE');
  const [guesses, setGuesses] = useState(Array(6).fill(''));
  const [gameOver, setGameOver] = useState(false);
  const [results, setResults] = useState(new GameResults(false, 6, guesses, keyWord));

  //fetch the keyword
  useEffect(() => {
    fetch('https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=noun%2Cadjective%2Cverb%2Cadverb&excludePartOfSpeech=proper-noun%2Cgiven-name&minCorpusCount=500&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=5&api_key='+api_key)
    .then(response => {
      if (!response.ok) {
        //throw new Error('Network response was not ok');
        console.error("API ERROR: Could not find word");
        return {
          word: 'CRANE'
        }
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      setKeyWord(data.word.toString().toUpperCase());
    })
  }, [])

  const handleGameEnd = (hasWon, finalGuessIndex) => {
    console.log(hasWon ? 'Player Won!!' : 'Player Lost :(');//debug message
    setGameOver(true);
    setResults(new GameResults(hasWon, finalGuessIndex, guesses, keyWord));
    console.log(new GameResults(hasWon, finalGuessIndex, guesses, keyWord));
  }

  return (
    <div className='wordle-page'>
        <WordleBoard keyWord={keyWord} guesses={guesses} setGuesses={setGuesses} onGameEnd={handleGameEnd} isGameOver={gameOver}/>
        {
          //gameOver &&
        }
          <Results results={results}/>
    </div>
  )
}

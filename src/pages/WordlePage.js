import React, { useEffect, useState } from 'react'
import './WordlePage.css'
import { WordleBoard } from '../components/WordleBoard'
import { Results } from '../components/Results'
import { Keyboard } from '../components/Keyboard';

const api_key = 'gr81u7evx04wjr661ppbbh9q2soazc8bimu1xcjpjb2kmkw5q';
//'https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=noun%2Cadjective%2Cverb%2Cadverb&excludePartOfSpeech=proper-noun%2Cgiven-name&minCorpusCount=100&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=5&api_key='+api_key

function GameResults(hasWon, finalGuessIndex, guesses, keyWord) {
  this.hasWon = hasWon;
  this.finalGuessIndex = finalGuessIndex;
  this.guesses = guesses;
  this.keyWord = keyWord;
}

export const WordlePage = () => {
  const [keyWord, setKeyWord] = useState('CRANE');
  const [guesses, setGuesses] = useState(Array(6).fill(''));
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [results, setResults] = useState(new GameResults(false, 6, guesses, keyWord));

  //fetch the keyword
  useEffect(() => {
    fetch('https://random-word.ryanrk.com/api/en/word/random/?length=5')
      .then(response => {
        if (!response.ok) {
          //throw new Error('Network response was not ok');
          console.error("API ERROR: Could not find word");
          return 'CRANE'
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setKeyWord(data.toString().toUpperCase());
      })
  }, [])

  const handleKeyPress = (event) => {
    if (gameOver) return;
    if (currentGuessIndex >= 6) {
      handleGameEnd(false);
      return;
    }
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
      //check if the word matches the keyword
      if (currentGuess === keyWord) {
        setTimeout(() => {
          handleGameEnd(true, currentGuessIndex)
        }, 3000
        );
      }
      //check if its a word --TODO
      setCurrentGuessIndex(currentGuessIndex + 1);
      if (currentGuessIndex === 5) {
        setTimeout(() => {
          handleGameEnd(false, 6)
        }, 3000
        );
      }
    }
  }

  const handleGameEnd = (hasWon, finalGuessIndex) => {
    console.log(hasWon ? 'Player Won!!' : 'Player Lost :(');//debug message
    setGameOver(true);
    setResults(new GameResults(hasWon, finalGuessIndex, guesses, keyWord));
    console.log(new GameResults(hasWon, finalGuessIndex, guesses, keyWord));
  }

  return (
    <div className='wordle-page' onKeyDown={handleKeyPress} tabIndex={0}>
      <WordleBoard keyWord={keyWord} guesses={guesses} currentGuessIndex={currentGuessIndex} />
      <Keyboard handleKeyPress={handleKeyPress} guesses={guesses} currentGuessIndex={currentGuessIndex} keyWord={keyWord} />
      {
        gameOver &&
        <Results results={results} />
      }
    </div>
  )
}

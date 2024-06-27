import React, { useEffect, useRef, useState } from 'react'
import './WordlePage.css'
import { WordleBoard } from '../components/WordleBoard'
import { Results } from '../components/Results'
import { Keyboard } from '../components/Keyboard';
import { checkInGuessList, generate } from '../functions/wordList';

// DEPRICATED API KEYS
// const api_key = 'gr81u7evx04wjr661ppbbh9q2soazc8bimu1xcjpjb2kmkw5q';
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
  const [isShaking, setIsShaking] = useState(null);

  const isDaily = false;

  //set the word
  useEffect(() => {
    if(gameOver) return;
    const currentDate = new Date().toLocaleDateString();
    const wordGenerationOptions = {
      exactly: 1,
      minLength: 5, 
      maxLength: 5
    }
    if (isDaily) wordGenerationOptions.seed = currentDate;//use the daily word if it is in daily mode

    const newKeyWord = generate(wordGenerationOptions)[0]; //Comes out as an array but only select first element
    setKeyWord(newKeyWord.toUpperCase());
    //Debug only
    //console.log('KeyWord: ' + newKeyWord);
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
      //check if the word matches the keyword - WIN
      if (currentGuess === keyWord) {
        setTimeout(() => {
          handleGameEnd(true, currentGuessIndex)
        }, 3000
        );
        setCurrentGuessIndex(currentGuessIndex + 1);
        return;
      }
      //check if the word is in the words list
      const inWordList = checkInGuessList(currentGuess);
      if(!inWordList){
        nonWordGuessed();
        return;
      }

      //Handle the incorrect guess
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

  const nonWordGuessed = () => {
    //do shake animation
    setIsShaking(true);
    //reset after animation end
    setTimeout(() => {
      setIsShaking(null);
    }, 300);
  }

  return (
    <div className='wordle-page' onKeyDown={handleKeyPress} tabIndex={0}>
      <WordleBoard keyWord={keyWord} guesses={guesses} currentGuessIndex={currentGuessIndex} isShaking={isShaking}/>
      <Keyboard handleKeyPress={handleKeyPress} guesses={guesses} currentGuessIndex={currentGuessIndex} keyWord={keyWord} />
      {
        gameOver &&
        <Results results={results} />
      }
    </div>
  )
}

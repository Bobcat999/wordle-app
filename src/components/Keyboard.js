import React from 'react';
import './Keyboard.css';
import { KeyboardKey } from './KeyboardKey';

const keyboardRows = [
  'QWERTYUIOP',
  'ASDFGHJKL',
  'ZXCVBNM'
]

export const Keyboard = ({handleKeyPress, guesses, currentGuessIndex, keyWord}) => {

  const guessesContains = (key) => {
    for(let i = 0; i < currentGuessIndex; i++){
      if(guesses[i].contains(key)){
        return true;
      }
    }
    return false;
  }

  const evaluateLetter = (letter) => {
    let bestEvaluation = '';
    for(let i = 0; i < currentGuessIndex; i++){
      if (!guesses[i].includes(letter)){
        continue;
      }else if(!keyWord.includes(letter)){
        bestEvaluation = 'incorrect';
        break;
      }
      const currentWord = guesses[i];
      for(let j = 0; j < 5; j++){
        if(letter !== currentWord.charAt(j)) continue;

        if(keyWord.charAt(j) === letter){
          bestEvaluation = 'correct';
          return bestEvaluation;
        }else if(bestEvaluation !== 'correct'){
          bestEvaluation = 'wrong-place';
        }
      }
    }
    return bestEvaluation;
  }

  return (
    <div className='keyboard'>
      {
        keyboardRows.map((row, index) => {
          return <div className='keyboard-row'>
            {index === 2 && <KeyboardKey keyboardKey={'Backspace'} handleKeyPress={handleKeyPress}/>}
            {
              row.split('').map((key, index) => {
                return <KeyboardKey 
                  keyboardKey={key} 
                  handleKeyPress={handleKeyPress} 
                  key={index} 
                  coloring={evaluateLetter(key)}/>
              })
            }
            {index === 2 && <KeyboardKey keyboardKey={'Enter'} handleKeyPress={handleKeyPress}/>}
          </div>
        })
        // alphabet.split('').map((key, index) => {
        //   return <KeyboardKey 
        //     keyboardKey={key} 
        //     handleKeyPress={handleKeyPress} 
        //     key={index} 
        //     coloring={evaluateLetter(key)}/>
        // })
      }
    </div>
  )
}

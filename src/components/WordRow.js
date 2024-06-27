import React, { useEffect, useState } from 'react'
import './WordRow.css';
import { LetterBox } from './LetterBox';

export const WordRow = ({guess = '', keyWord = '', isShaking}) => {
    const [letterColors, setLetterColors] = useState(Array(5).fill(''));

    useEffect(() => {
        if(keyWord === '') return;
        //Configure all of the colors for the letter boxes
        let newLetterColors = Array(5).fill('incorrect');
        let guessArr = guess.split('');
        let keyWordArr = keyWord.split('');
        let misplaced = [];
        //get the green letters
        for(let i = 0; i < keyWordArr.length; i++){
            if(guessArr[i] === keyWordArr[i]){
                newLetterColors[i] = 'correct';
            }else{
                misplaced.push(keyWordArr[i]);
            }
        }
        //get the yellow letters
        for(let i = 0; i < keyWordArr.length; i++){
            if(newLetterColors[i] != 'correct'){
                if(misplaced.includes(guessArr[i])){
                    //remove it from the misplaced array
                    misplaced.splice(misplaced.indexOf(guessArr[i]), 1);
                    newLetterColors[i] = 'wrong-place';
                }else{
                    newLetterColors[i] = 'incorrect'
                }
            }
        }
        setLetterColors(newLetterColors);
    }, [guess, keyWord]);

    return (
        <div className={`word-row ${isShaking ? 'shake-active' : ''}`}>
            {
                Array.from({length: 5}).map((_, index) => {
                    return <LetterBox coloring={letterColors[index]} guess={guess} index={index} key={index}/>;
                })
            }
        </div>
    )
}

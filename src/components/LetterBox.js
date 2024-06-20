import React from 'react'
import './LetterBox.css';

export const LetterBox = ({index, guess, keyWord}) => {
    const letter = guess.charAt(index);
    const keyWordLetter = keyWord.charAt(index);
    let coloring = '';
    if(letter === '' || keyWord === ''){
        coloring = '';
    }else if(keyWordLetter == letter){
        coloring = ' correct';
    }else if(keyWord.includes(letter)){
        coloring = ' wrong-place'
    }else{
        coloring = ' incorrect'
    }

    return (
        <div className={'letter-box'+coloring} style={coloring !== '' ? {animationDelay: index * .5 + 's'} : {}}>
            {letter}
        </div>
    )
}

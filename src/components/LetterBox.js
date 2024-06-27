import React from 'react'
import './LetterBox.css';

export const LetterBox = ({index, coloring, guess}) => {
    const letter = guess.charAt(index);

    return (
        <div className={'letter-box '+coloring} style={coloring !== '' ? {animationDelay: index * .5 + 's'} : {}}>
            {letter}
        </div>
    )
}

import React from 'react'
import './WordRow.css';
import { LetterBox } from './LetterBox';

export const WordRow = ({guess = '', keyWord = '', isShaking}) => {


    return (
        <div className={`word-row ${isShaking ? 'shake-active' : ''}`}>
            {
                Array.from({length: 5}).map((_, index) => {
                    return <LetterBox index={index} guess={guess} keyWord={keyWord} key={index}/>;
                })
            }
        </div>
    )
}

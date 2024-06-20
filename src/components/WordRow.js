import React from 'react'
import './WordRow.css';
import { LetterBox } from './LetterBox';

export const WordRow = ({guess = '', keyWord = ''}) => {


    return (
        <div className='word-row'>
            {
                Array.from({length: 5}).map((_, index) => {
                    return <LetterBox index={index} guess={guess} keyWord={keyWord} key={index}/>;
                })
            }
        </div>
    )
}

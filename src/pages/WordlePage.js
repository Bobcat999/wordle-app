import React, { useEffect, useState } from 'react'
import './WordlePage.css'
import { WordleBoard } from '../components/WordleBoard'
import { Results } from '../components/Results';

export const WordlePage = () => {
  const [keyWord, setKeyWord] = useState('');

  //fetch the keyword
  useEffect(() => {
    fetch('https://random-word-api.herokuapp.com/word?length=5&lang=es')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      setKeyWord(data.toString().toUpperCase());
    })
  }, [])

  return (
    <div className='wordle-page'>
        <WordleBoard keyWord={keyWord}/>
        <Results />
    </div>
  )
}

import React from 'react'
import './KeyboardKey.css';

export const KeyboardKey = ({keyboardKey, handleKeyPress, coloring}) => {

    const handleClick = () => {
        const keyCode = keyboardKey === 'Enter' ? 'Enter' : 'Key' + keyboardKey;
        const event = new KeyboardEvent('keydown', {'key': keyboardKey, 'code': keyCode});
        handleKeyPress(event);
    }

  return (
    <div className={'keyboard-key ' + coloring} style={keyboardKey === 'Enter' || keyboardKey == 'Backspace' ? {width: 'fit-content', paddingLeft: '.2em', paddingRight: '.2em'} : {}} onClick={handleClick}>
        {keyboardKey !== 'Backspace' ? keyboardKey: 'Del'}
    </div>
  )
}

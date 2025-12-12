import React from 'react';
import KeyboardRow from '../KeyboardRow'

function Keyboard({handleChar, handleDelete, handleEnter}) {
  const LINE_ONE = 'QWERTYUIOP'
  const LINE_TWO = 'ASDFGHJKL'
  const LINE_THREE = 'ZXCVBNM'
  return <div style={{gap: '.5rem', display: 'flex', flex: '1', flexDirection: 'column'}}>
    <KeyboardRow keys={LINE_ONE} handleChar={handleChar}/>
    <KeyboardRow keys={LINE_TWO} handleChar={handleChar}/>
    <KeyboardRow keys={LINE_THREE} handleChar={handleChar}>
      <button type="button" className="keyboard-key" onClick={handleDelete}>
        Delete
      </button>
      <button type="submit" className="keyboard-key" onClick={handleEnter}>
        Enter
      </button>
    </KeyboardRow>
  </div>;
}

export default Keyboard;

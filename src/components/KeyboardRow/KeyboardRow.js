import React from 'react';

function KeyboardRow({keys, handleChar, children}) {
  return <div 
  className="keyboard-row">
    {keys.split('').map((char) => (
      <button type="button" 
        className="keyboard-key" 
        onClick={() => handleChar(char)}>{char}</button>
    ))}
    {children}
  </div>;
}

export default KeyboardRow;

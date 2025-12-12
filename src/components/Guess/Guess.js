import {range} from '../../utils.js'
import { NUM_GUESS_CHARS } from '../../constants'

function Guess({guess,status}) {
  const charArr = range(0,NUM_GUESS_CHARS,1);
  return (
    <p className="guess">
      {charArr.map((idx) => (
        <span className={`cell ${status && status[idx].status}`} key={idx}>{guess.at(idx) ? guess.at(idx) : ''}</span>
      ))}
    </p>
  );
}

export default Guess;

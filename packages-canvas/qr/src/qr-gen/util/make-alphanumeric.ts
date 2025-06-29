import {
  TBit,
  TInt
} from '../types';
import {
  ALPHANUMERIC_CHARSET
} from '../const';
import QrSegment from '../class/qr-segment';
import Mode from '../class/mode';

import isAlphanumeric from './is-alphanumeric';
import appendBits from './apend-bits';

// Returns a segment representing the given text string encoded in alphanumeric mode.
// The characters allowed are: 0 to 9, A to Z (uppercase only), space,
// dollar, percent, asterisk, plus, hyphen, period, slash, colon.
export default function makeAlphanumeric(text: string): QrSegment {
  if (!isAlphanumeric(text)) {
    throw new RangeError('String contains unencodable characters in alphanumeric mode');
  }
  
  const bb: TBit[] = [];
  let i: TInt;
  
  for (i = 0; i + 2 <= text.length; i += 2) { // Process groups of 2
    let temp: TInt = ALPHANUMERIC_CHARSET.indexOf(text.charAt(i)) * 45;
    
    temp += ALPHANUMERIC_CHARSET.indexOf(text.charAt(i + 1));
    appendBits(temp, 11, bb);
  }
  
  if (i < text.length) { // 1 character remaining
    appendBits(ALPHANUMERIC_CHARSET.indexOf(text.charAt(i)), 6, bb);
  }
  
  return new QrSegment(Mode.ALPHANUMERIC, text.length, bb);
}
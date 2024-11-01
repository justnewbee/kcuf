import {
  ReactElement
} from 'react';

import GridContainer from '../grid-container';
import Keystroke from '../keystroke';

interface IProps {
  theKey: string;
  modifierNames: string[];
  modifierSymbols?: string[];
  returnFalse?: boolean;
  caseSensitive?: boolean;
}

export default function KeystrokeModifiers({
  theKey,
  modifierNames,
  modifierSymbols,
  returnFalse,
  caseSensitive
}: IProps): ReactElement {
  return <GridContainer $repeat={5}>
    <Keystroke {...{
      keystroke: theKey,
      returnFalse,
      caseSensitive
    }} />
    {modifierNames.length ? <Keystroke {...{
      keystroke: [...modifierNames, theKey].join('+'),
      returnFalse,
      caseSensitive
    }} /> : null}
    {modifierNames.length ? <Keystroke {...{
      keystroke: [...modifierNames, theKey].join('+').toLowerCase(),
      returnFalse,
      caseSensitive
    }} /> : null}
    {modifierSymbols?.length ? <Keystroke {...{
      keystroke: [...modifierSymbols, theKey].join('+'),
      returnFalse,
      caseSensitive
    }} /> : null}
  </GridContainer>;
}
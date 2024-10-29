import {
  ReactElement
} from 'react';

import GridContainer from '../grid-container';
import Keystroke from '../keystroke';

interface IProps {
  theKey: string;
  modifierNames: string[];
  modifierSymbols: string[];
}

export default function KeystrokeModifiers({
  theKey,
  modifierNames,
  modifierSymbols
}: IProps): ReactElement {
  return <GridContainer $repeat={5}>
    <Keystroke {...{
      keystroke: theKey
    }} />
    {modifierNames.length ? <Keystroke {...{
      keystroke: [...modifierNames, theKey].join('+')
    }} /> : null}
    {modifierNames.length ? <Keystroke {...{
      keystroke: [...modifierNames, theKey].join('+').toLowerCase()
    }} /> : null}
    {modifierSymbols.length ? <Keystroke {...{
      keystroke: [...modifierSymbols, theKey].join('+')
    }} /> : null}
  </GridContainer>;
}
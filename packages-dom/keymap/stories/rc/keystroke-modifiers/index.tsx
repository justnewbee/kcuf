import {
  ReactElement
} from 'react';

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
  return <>
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
  </>;
}
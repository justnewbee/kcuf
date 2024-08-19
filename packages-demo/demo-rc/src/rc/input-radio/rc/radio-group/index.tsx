// import {
//   ReactElement
// } from 'react';
//
// export function RadioGroup<T = string>({
//   label,
//   items,
//   value,
//   defaultValue,
//   onChange
// }: TPropsRadioGroup<T>): ReactElement | null {
//   if (!items?.length) {
//     return null;
//   }
//
//   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//   // @ts-ignore
//   return <ChoiceGroup<T> {...{
//     label,
//     items,
//     value,
//     onChange,
//     defaultStateValue: value ?? defaultValue,
//     getValueOnChange(_checked: boolean, itemValue: T): T {
//       return itemValue;
//     },
//     isChecked(itemValue: T, currentValue: T): boolean {
//       return itemValue === currentValue;
//     },
//     renderInput: renderInputRadio
//   }} />;
// }
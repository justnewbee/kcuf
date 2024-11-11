// import {
//   HTMLAttributes
// } from 'react';
//
// import {
//   CodeMirrorProps
// } from '@kcuf/rc-codemirror';
//

// export * from './alert';
// export * from './package-info';
// export * from './component-testing';
//
// export interface IPropsCodeViewer extends CodeMirrorProps {
//   type?: 'json' | 'js' | 'ts' | 'html' | 'css' | 'less' | 'markdown' | 'text';
//   children?: string;
// }
//
// export interface IPropsCodeViewerSimple extends Omit<IPropsCodeViewer, 'type'> {}
//
// export interface IPropsJsonViewer extends Omit<IPropsCodeViewerSimple, 'children'> {
//   o?: unknown;
// }
//
// export interface IPropsPromiseViewer extends Omit<IPropsCodeViewerSimple, 'children'> {
//   promise?: Promise<unknown> | null;
// }
//

//
// export interface IChoiceItem<T> {
//   value: T;
//   label: string | ReactElement;
// }
//
// export interface IPropsChoiceGroup<T, V = T> {
//   label?: string | ReactElement;
//   items: IChoiceItem<T>[];
//   value?: V;
//   defaultValue?: V;
//   onChange?(value: V): void;
// }
//
// export interface IPropsFlex100Hbf {
//   header?: string | ReactElement;
//   body?: string | ReactElement;
//   footer?: string | ReactElement;
// }
//
// export type TPropsCheckboxGroup<T> = IPropsChoiceGroup<T, T[]>;
//
// export type TPropsRadioGroup<T> = IPropsChoiceGroup<T, T>;
//
// export interface IPropsInputJsonObject<T> extends Omit<CodeMirrorProps, 'conf' | 'value' | 'onChange'> {
//   value?: T;
//   arrayMode?: boolean; // 默认从传入的 value 算
//   onChange?(value: T): void;
// }

export interface ICodemirrorProps {
  defaultValue?: string;
  value?: string;
  placeholder?: string;
  readOnly?: boolean;
  language?: string; // TODO | Extension
  theme?: 'none' | 'one-dark' | 'material-dark' | 'material-light'; // default material-dark
  lines?: number | [number, number];
  onChange?(value: string): void;
}

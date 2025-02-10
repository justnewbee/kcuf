interface IResult<K extends string, V> {
  key: K;
  result: V | null;
  code: string;
}

export type TComparisonResult<V = string> = [
  IResult<'mere-color', V>,
  IResult<'polished', V>,
  IResult<'colord', V>,
  IResult<'color', V>,
  IResult<'tinycolor2', V>,
  IResult<'chroma-js', V>,
  IResult<'culori', V>
];

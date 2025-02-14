interface IResult<K extends string, V> {
  key: K;
  result: V | null;
  code: string;
}

export type TComparisonResult<V = string> = [
  IResult<'mere-color', V>,
  IResult<'polished', V>,
  IResult<'tinycolor2', V>,
  IResult<'colord', V>,
  IResult<'color', V>,
  IResult<'color2k', V>,
  IResult<'chroma-js', V>,
  IResult<'culori', V>,
  IResult<'colormaster', V>,
  IResult<'fast-color', V>
];

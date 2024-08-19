import nameConst from './name-const';

export default function nameConstStyledMixin(...parts: string[]): string {
  return nameConst('MIXIN', ...parts);
}

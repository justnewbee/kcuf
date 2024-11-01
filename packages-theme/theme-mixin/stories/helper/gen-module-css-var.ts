import {
  createModuleGen,
  codeCssVarLines
} from '@kcuf/theme-helper-code-gen';
import {
  COLOR_LIGHT,
  COLOR_DARK,
  SPACE,
  FONT_FAMILY_SANS,
  FONT_FAMILY_MONO,
  FONT_SIZE,
  LINE_HEIGHT,
  LINE_HEIGHT_HEADING
} from '@kcuf/theme-token-base';

function fromArray(colorLevels: unknown[], name: string): Record<string, unknown> {
  return colorLevels.reduce((result: Record<string, unknown>, v, i) => {
    result[`${name}-${i + 1}`] = v;
    
    return result;
  }, {});
}

export default function genModuleCssVar(dark?: boolean): string {
  const moduleGen = createModuleGen('gen-module-css-var');
  const color = dark ? COLOR_DARK : COLOR_LIGHT;
  
  moduleGen.push(':root {');
  moduleGen.push(1, ...codeCssVarLines({
    gray0: color.GRAY_0,
    ...fromArray(color.GRAY, 'gray'),
    gray12: color.GRAY_12,
    ...fromArray(color.RED, 'RED'),
    ...fromArray(color.GREEN, 'GREEN'),
    ...fromArray(color.BLUE, 'BLUE'),
    ...fromArray(color.YELLOW, 'YELLOW'),
    ...fromArray(color.ORANGE, 'ORANGE'),
    ...fromArray(color.PURPLE, 'PURPLE'),
    ...fromArray(color.WHITE_A, 'WHITE_A'),
    ...fromArray(color.BLACK_A, 'BLACK_A'),
    FONT_FAMILY_SANS,
    FONT_FAMILY_MONO,
    ...fromArray(SPACE, 'SPACE'),
    ...fromArray(FONT_SIZE, 'FONT_SIZE'),
    ...fromArray(LINE_HEIGHT, 'LINE_HEIGHT'),
    ...fromArray(LINE_HEIGHT_HEADING, 'LINE_HEIGHT_HEADING')
  }));
  moduleGen.push('}');
  
  return moduleGen.generate();
}
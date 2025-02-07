import {
  ColorRgb,
  ColorHsl
} from '../../src';

interface IColor {
  name: string;
  hexStr: `#${string}`;
  rgbStr: `rgb(${string})`;
  rgbStrPercentage: `rgb(${string})`;
  rgbStrLegacy: `rgb(${string})`;
  rgbStrLegacyPercentage: `rgb(${string})`;
  hslStr: `hsl(${string})`;
  hslStrLegacy: `hsl(${string})`;
  rgb: ColorRgb;
  hsl: ColorHsl;
}

export const BLACK: IColor = {
  name: 'black',
  hexStr: '#000',
  rgbStr: 'rgb(0 0 0)',
  rgbStrPercentage: 'rgb(0% 0% 0%)',
  rgbStrLegacy: 'rgb(0, 0, 0)',
  rgbStrLegacyPercentage: 'rgb(0%, 0%, 0%)',
  hslStr: 'hsl(0 0% 0%)',
  hslStrLegacy: 'hsl(0, 0%, 0%)',
  rgb: {
    r: 0,
    g: 0,
    b: 0
  },
  hsl: {
    h: 0,
    s: 0,
    l: 0
  }
};

export const WHITE: IColor = {
  name: 'white',
  hexStr: '#fff',
  rgbStr: 'rgb(255 255 255)',
  rgbStrPercentage: 'rgb(100% 100% 100%)',
  rgbStrLegacy: 'rgb(255, 255, 255)',
  rgbStrLegacyPercentage: 'rgb(100%, 100%, 100%)',
  hslStr: 'hsl(0 0% 100%)',
  hslStrLegacy: 'hsl(0, 0%, 100%)',
  rgb: {
    r: 255,
    g: 255,
    b: 255
  },
  hsl: {
    h: 0,
    s: 0,
    l: 100
  }
};
export const RED: IColor = {
  name: 'red',
  hexStr: '#f00',
  rgbStr: 'rgb(255 0 0)',
  rgbStrPercentage: 'rgb(100% 0% 0%)',
  rgbStrLegacy: 'rgb(255, 0, 0)',
  rgbStrLegacyPercentage: 'rgb(100%, 0%, 0%)',
  hslStr: 'hsl(0 100% 50%)',
  hslStrLegacy: 'hsl(0, 100%, 50%)',
  rgb: {
    r: 255,
    g: 0,
    b: 0
  },
  hsl: {
    h: 0,
    s: 100,
    l: 50
  }
};
export const ORANGE: IColor = {
  name: 'orange',
  hexStr: '#ffa500',
  rgbStr: 'rgb(255 165 0)',
  rgbStrPercentage: 'rgb(100% 64.7% 0%)',
  rgbStrLegacy: 'rgb(255, 165, 0)',
  rgbStrLegacyPercentage: 'rgb(100%, 64.7%, 0%)',
  hslStr: 'hsl(38.8 100% 50%)',
  hslStrLegacy: 'hsl(38.8, 100%, 50%)',
  rgb: {
    r: 255,
    g: 165,
    b: 0
  },
  hsl: {
    h: 38.8,
    s: 100,
    l: 50
  }
};
export const YELLOW: IColor = {
  name: 'yellow',
  hexStr: '#ff0',
  rgbStr: 'rgb(255 255 0)',
  rgbStrPercentage: 'rgb(100% 100% 0%)',
  rgbStrLegacy: 'rgb(255, 255, 0)',
  rgbStrLegacyPercentage: 'rgb(100%, 100%, 0%)',
  hslStr: 'hsl(60 100% 50%)',
  hslStrLegacy: 'hsl(60, 100%, 50%)',
  rgb: {
    r: 255,
    g: 255,
    b: 0
  },
  hsl: {
    h: 60,
    s: 100,
    l: 50
  }
};
export const GREEN: IColor = {
  name: 'green',
  hexStr: '#008000',
  rgbStr: 'rgb(0 128 0)',
  rgbStrPercentage: 'rgb(0% 50.2% 0%)',
  rgbStrLegacy: 'rgb(0, 128, 0)',
  rgbStrLegacyPercentage: 'rgb(0%, 50.2%, 0%)',
  hslStr: 'hsl(120 100% 25.1%)',
  hslStrLegacy: 'hsl(120, 100%, 25.1%)',
  rgb: {
    r: 0,
    g: 128,
    b: 0
  },
  hsl: {
    h: 120,
    s: 100,
    l: 25.1
  }
};
export const CYAN: IColor = {
  name: 'cyan',
  hexStr: '#0ff',
  rgbStr: 'rgb(0 255 255)',
  rgbStrPercentage: 'rgb(0% 100% 100%)',
  rgbStrLegacy: 'rgb(0, 255, 255)',
  rgbStrLegacyPercentage: 'rgb(0%, 100%, 100%)',
  hslStr: 'hsl(180 100% 50%)',
  hslStrLegacy: 'hsl(180, 100%, 50%)',
  rgb: {
    r: 0,
    g: 255,
    b: 255
  },
  hsl: {
    h: 180,
    s: 100,
    l: 50
  }
};
export const BLUE: IColor = {
  name: 'blue',
  hexStr: '#00f',
  rgbStr: 'rgb(0 0 255)',
  rgbStrPercentage: 'rgb(0% 0% 100%)',
  rgbStrLegacy: 'rgb(0, 0, 255)',
  rgbStrLegacyPercentage: 'rgb(0%, 0%, 100%)',
  hslStr: 'hsl(240 100% 50%)',
  hslStrLegacy: 'hsl(240, 100%, 50%)',
  rgb: {
    r: 0,
    g: 0,
    b: 255
  },
  hsl: {
    h: 240,
    s: 100,
    l: 50
  }
};
export const PURPLE: IColor = {
  name: 'purple',
  hexStr: '#800080',
  rgbStr: 'rgb(128 0 128)',
  rgbStrPercentage: 'rgb(50.2% 0% 50.2%)',
  rgbStrLegacy: 'rgb(128, 0, 128)',
  rgbStrLegacyPercentage: 'rgb(50.2%, 0%, 50.2%)',
  hslStr: 'hsl(300 100% 25.1%)',
  hslStrLegacy: 'hsl(300, 100%, 25.1%)',
  rgb: {
    r: 128,
    g: 0,
    b: 128
  },
  hsl: {
    h: 300,
    s: 100,
    l: 25.1
  }
};

export const INVALID_INPUTS = [
  // non-color
  '',
  'hong',
  '123456',
  '#',
  // invalid hex
  '#1',
  '#12',
  '#12345',
  '#xyz',
  '#axbycz',
  '#1x2y3z',
  '#1234567',
  '#1234567o',
  '#123456789',
  // invalid rgb
  'rgb (255 0 0)',
  'rgb (255, 0, 0)',
  'rgb(255, 0)',
  'rgb(255 0)',
  'rgb(abc, 0, 0)',
  'rgb(255, def, 0)',
  'rgb(255, 0, ghi)',
  'rgba(255, 0, 0, jkl)',
  'rgba(100%, 20%, 30)', // mixing numeric and percentage in legacy format
  // invalid hsl
  'hsl(255, 70, 0)', // no % in legacy format
  'hsl(255xx 70 0)', // illegal hue unit
  'hsl(255yy, 70%, 0%)', // illegal hue unit 2
  'hsl (255 70 50)',
  'hsl(255, 10)',
  'hsl(255 10)',
  'hsl(abc, 0, 0)',
  'hsl(255, def, 0)',
  'hsl(255, 0, ghi)',
  'hsla(255, 0, 0, jkl)',
  'hsl(100%, 20%, 30)'
];

export const COLORS: IColor[] = [
  BLACK,
  WHITE,
  RED,
  ORANGE,
  YELLOW,
  GREEN,
  CYAN,
  BLUE,
  PURPLE
];

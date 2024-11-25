import {
  IColorInput,
  IColorText,
  IColorBg,
  IColorBorder
} from '../types';

export default function createConstColorInput(fg: IColorText, bg: IColorBg, bd: IColorBorder): IColorInput {
  return {
    INPUT_TEXT: fg.TEXT_SECONDARY,
    INPUT_BG: bg.BG_PRIMARY,
    INPUT_BORDER: bd.BORDER_TERTIARY,
    INPUT_TEXT_HOVER: fg.TEXT_SECONDARY,
    INPUT_BG_HOVER: bg.BG_PRIMARY,
    INPUT_BORDER_HOVER: bd.BORDER_SECONDARY,
    INPUT_TEXT_FOCUS: fg.TEXT_SECONDARY,
    INPUT_BG_FOCUS: bg.BG_PRIMARY,
    INPUT_BORDER_FOCUS: bd.BORDER_ACCENT,
    INPUT_BORDER_FOCUS_BRAND: bd.BORDER_BRAND,
    INPUT_TEXT_DISABLED: fg.TEXT_DISABLED,
    INPUT_BG_DISABLED: bg.BG_SECONDARY,
    INPUT_BORDER_DISABLED: bd.BORDER_DISABLED,
    INPUT_PLACEHOLDER: fg.TEXT_TERTIARY
  };
}

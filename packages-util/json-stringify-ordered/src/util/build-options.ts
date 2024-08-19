import {
  IOptions,
  IOptionsParsed,
  IFnCompare
} from '../types';

export default function buildOptions(options: IOptions | IFnCompare = {}): IOptionsParsed {
  const optionsParsed: IOptionsParsed = {
    space: '',
    cycles: false,
    compare: undefined,
    replacer: undefined
  };
  
  if (!options) {
    return optionsParsed;
  }
  
  if (typeof options === 'function') {
    optionsParsed.compare = options;
    
    return optionsParsed;
  }
  
  if (typeof options.space === 'string') {
    optionsParsed.space = options.space;
  } else if (typeof options.space === 'number' && options.space > 0) {
    optionsParsed.space = Array(options.space + 1).join(' ');
  }
  
  if (typeof options.cycles === 'boolean') {
    optionsParsed.cycles = options.cycles;
  }
  
  if (typeof options.replacer === 'function') {
    optionsParsed.replacer = options.replacer;
  }
  
  return optionsParsed;
}

export { default as useProps } from './_use-model-props';

// getters
export { default as useKeyDetails } from './use-key-details';

// handlers - 对 useDispatch、props.onXx 的封装，不要直接 export useDispatchXx
export { default as useIsKeyActive } from './use-is-key-active';
export { default as useIsKeyOn } from './use-is-key-on';
export { default as useHandleKeyClick } from './use-handle-key-click';

// effects - the one with all effects
export { default as useEffects } from './use-effects';

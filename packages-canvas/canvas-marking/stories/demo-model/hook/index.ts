export { default as useProps } from './_use-model-props';

// refs - if any
export { default as useRefDomContainer } from './use-dispatch-set-dom-container';
export { default as useRefDomMarkingStage } from './use-dispatch-set-dom-marking';

// getters - get specific data from state
export { default as useMarkingStage } from './use-marking-stage';
export { default as useMarkingStageStats } from './use-marking-stage-stats';
export { default as useLogEvents } from './use-log-events';
export { default as useFullscreen } from './use-fullscreen';

// handlers - 对 useDispatch、props.onXx 的封装，不要直接 export useDispatchXx
export { default as useInit } from './use-init';
export { default as useHandleDestroy } from './use-handle-destroy';
export { default as useHandleToggleLogEvents } from './use-handle-toggle-log-events';
export { default as useHandleToggleFullscreen } from './use-handle-toggle-fullscreen';
export { default as useHandleToggleDisabled } from './use-handle-toggle-disabled';
export { default as useHandleDebugStats } from './use-handle-debug-stats';
export { default as useHandleSetDataAerial } from './use-handle-set-data-aerial';
export { default as useHandleSetDataSexy } from './use-handle-set-data-sexy';
export { default as useHandleSetDataNoImage } from './use-handle-set-data-no-image';
export { default as useHandleSetDataEmpty } from './use-handle-set-data-empty';
export { default as useHandleCreatingStart } from './use-handle-creating-start';
export { default as useHandleCreatingStartMaxPoint5 } from './use-handle-creating-start-max-point5';
export { default as useHandleCreatingStartRect } from './use-handle-creating-start-rect';
export { default as useHandleCreatingStartRect2 } from './use-handle-creating-start-rect2';
export { default as useHandleCreatingStartLine } from './use-handle-creating-start-line';
export { default as useHandleCreatingCancel } from './use-handle-creating-cancel';
export { default as useHandleCreatingFinish } from './use-handle-creating-finish';
export { default as useHandleDeleteActiveItem } from './use-handle-delete-active-item';
export { default as useHandleDeleteAllItems } from './use-handle-delete-all-items';
export { default as useHandleSelect } from './use-handle-select';
export { default as useHandleHighlight } from './use-handle-highlight';
export { default as useHandleZoomIn } from './use-handle-zoom-in';
export { default as useHandleZoomOut } from './use-handle-zoom-out';
export { default as useHandleZoomReset } from './use-handle-zoom-reset';

// effects - the one with all effects
export { default as useEffects } from './use-effects';
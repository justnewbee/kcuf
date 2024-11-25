export enum EImageStatus {
  NONE = 'none',
  LOADING = 'loading',
  LOADED = 'loaded',
  ERROR = 'error'
}

export enum EZoomHow {
  IN = 'in',
  OUT = 'out',
  MIN = 'min',
  MAX = 'max',
  RESET = 'reset'
}

export enum EMouseJustifyStatus {
  NONE = '',
  MAGNET_VERTEX = 'magnet:v',
  MAGNET_INTERSECTION = 'magnet:i',
  MAGNET_MID = 'magnet:m',
  MAGNET_BORDER = 'magnet:b',
  PERPENDICULAR_INTERNAL = 'perpendicular:i',
  PERPENDICULAR_EXTERNAL = 'perpendicular:e',
  SNAP = 'snap'
}

export enum EMarkingMouseStatus {
  OUT,
  IN,
  IN_BORDER,
  IN_POINT,
  IN_POINT_INSERTION
}

export enum EMarkingStatsChangeCause {
  INIT = 'init',
  RESIZE = 'resize',
  MOUSE_ENTER_STAGE = 'mouse:enter@stage',
  MOUSE_LEAVE_STAGE = 'mouse:leave@stage',
  MOUSE_MOVE_STAGE = 'mouse:move@stage',
  MOUSE_ENTER_CANVAS = 'mouse:enter@canvas',
  MOUSE_LEAVE_CANVAS = 'mouse:leave@canvas',
  MOUSE_MOVE_CANVAS = 'mouse:move@canvas',
  MOUSE_DOWN_CANVAS = 'mouse:down@canvas',
  MOUSE_UP_WINDOW = 'mouse:up@window',
  MOUSE_CLICK_CANVAS = 'mouse:click@canvas', // TODO 消化掉
  MOUSE_DOUBLE_CLICK_CANVAS = 'mouse:double_click@canvas', // TODO 消化掉
  KEYBOARD_PUSH_POINT = 'keyboard:push_point',
  KEYBOARD_REMOVE_POINT = 'keyboard:remove_point',
  KEYBOARD_FINISH_EDITING = 'keyboard:finish_editing',
  KEYBOARD_CANCEL_EDITING = 'keyboard:cancel_editing',
  // 调用 API 触发
  SET_DATA = 'set_data',
  TOGGLE_DISABLED_TRUE = 'toggle_disabled:true',
  TOGGLE_DISABLED_FALSE = 'toggle_disabled:false',
  TOGGLE_JUSTIFY_TRUE = 'toggle_justify:true',
  TOGGLE_JUSTIFY_FALSE = 'toggle_justify:false',
  TOGGLE_SNAP_TRUE = 'toggle_snap:true',
  TOGGLE_SNAP_FALSE = 'toggle_snap:false',
  LOADING_IMAGE = 'loading_image', // 由 SET_DATA 间接触发
  START_CREATING = 'start_creating',
  FINISH_CREATING = 'finish_creating',
  FINISH_CREATING_WAIT = 'finish_creating_wait',
  CANCEL_CREATING = 'cancel_creating',
  DELETE = 'delete',
  CLEAR = 'clear',
  SELECT = 'select',
  HIGHLIGHT = 'highlight',
  MOVE_READY = 'move:ready',
  MOVE_START = 'move:start',
  MOVE_END = 'move:end',
  ZOOM_IN = 'zoom:in',
  ZOOM_OUT = 'zoom:out',
  ZOOM_MIN = 'zoom:min',
  ZOOM_MAX = 'zoom:max',
  ZOOM_RESET = 'zoom:reset'
}

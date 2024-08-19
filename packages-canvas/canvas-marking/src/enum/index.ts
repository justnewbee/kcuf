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
  MOUSE_CLICK_CANVAS = 'mouse:click@canvas',
  MOUSE_DOUBLE_CLICK_CANVAS = 'mouse:double_click@canvas',
  KEY_DOWN_WINDOW = 'key:down@window',
  // 调用 API 触发
  SET_DATA = 'set_data',
  TOGGLE_DISABLED = 'toggle_disabled',
  LOADING_IMAGE = 'loading_image', // 由 SET_DATA 间接触发
  START_CREATING = 'start_creating',
  FINISH_CREATING = 'finish_creating',
  CANCEL_CREATING = 'cancel_creating',
  DELETE = 'delete',
  CLEAR = 'clear',
  MOVE_READY = 'move:ready',
  MOVE_START = 'move:start',
  MOVE_END = 'move:end',
  ZOOM_IN = 'zoom:in',
  ZOOM_OUT = 'zoom:out',
  ZOOM_MIN = 'zoom:min',
  ZOOM_MAX = 'zoom:max',
  ZOOM_RESET = 'zoom:reset',
  HIGHLIGHT = 'highlight'
}

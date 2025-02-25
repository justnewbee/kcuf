import {
  MarkingConfigItem,
  MarkingStyleBorderDiff
} from '../../../../src';

const DIFF_HOVER: MarkingStyleBorderDiff = {
  outerColor: 'hsl(177 100% 50%)',
  outerWidth: 2
};
const DIFF_FULL: MarkingStyleBorderDiff = {
  color: 'hsl(0 50% 48%)',
  outerColor: 'hsl(48 100% 50%)',
  outerWidth: 2
};
const DIFF_ONE: MarkingStyleBorderDiff = {
  ...DIFF_FULL,
  noInsertion: true
};

export default [{
  path: [
    [222, 633],
    [200, 1656],
    [2611, 1656],
    [2611, 1428],
    [2828, 1424],
    [2832, 1225],
    [2954, 1229],
    [2954, 1192],
    [3300, 1192],
    [3741, 920],
    [3745, 647]
  ],
  styleConfig: {
    fill: {
      color: 0.03
    },
    borderDiff: {
      hover: DIFF_HOVER,
      [1 as number]: DIFF_ONE,
      [4 as number]: DIFF_ONE
    }
  }
}, {
  path: [
    [211, 1888],
    [1003, 1892],
    [1010, 2444],
    [211, 2436]
  ],
  styleConfig: {
    fill: {
      color: 0.03
    },
    borderDiff: {
      hover: DIFF_HOVER,
      all: DIFF_FULL
    }
  }
}, {
  path: [
    [1238, 1888],
    [1246, 2337],
    [1474, 2337],
    [1477, 2124],
    [2136, 2116],
    [2133, 1888]
  ],
  styleConfig: {
    fill: {
      color: 0.03
    }
  }
}, { // 以上场地，以下障碍物
  path: [
    [1489, 750],
    [1489, 798],
    [2424, 795],
    [2424, 754]
  ],
  styleConfig: {
    border: {
      color: 'hsl(20 100% 70%)'
    }
  }
}, {
  path: [
    [1400, 865],
    [1404, 1402],
    [1489, 1413],
    [1481, 872]
  ],
  styleConfig: {
    border: {
      color: 'hsl(120 100% 50%)'
    }
  }
}, {
  path: [
    [3053, 728],
    [3057, 868],
    [3200, 868],
    [3197, 725]
  ],
  styleConfig: {
    border: {
      color: 'hsl(240 100% 50%)'
    }
  }
}, {
  path: [
    [3406, 736],
    [3406, 865],
    [3546, 865],
    [3543, 736]
  ],
  styleConfig: {
    border: {
      color: 'hsl(60 100% 50%)'
    }
  }
}, {
  path: [
    [531, 1535],
    [664, 1535],
    [664, 1656],
    [528, 1652]
  ],
  styleConfig: {
    border: {
      color: 'hsl(279 100% 50%)'
    }
  }
}, {
  path: [
    [1448, 2124],
    [1227, 2124],
    [1231, 1884],
    [1448, 1888]
  ],
  styleConfig: {
    border: {
      color: 'hsl(200 100% 50%)'
    }
  }
}, {
  path: [
    [406, 1965],
    [410, 2348],
    [793, 2348],
    [793, 1969]
  ],
  styleConfig: {
    border: {
      color: 'hsl(330 100% 60%)'
    }
  }
}, {
  path: [
    [1463, 1892],
    [1466, 1998],
    [1805, 2006],
    [1809, 1888]
  ],
  styleConfig: {
    border: {
      color: 'hsl(210 100% 60%)'
    }
  }
}, {
  path: [
    [1925, 2734],
    [2726, 2182]
  ],
  pointCountMax: 2,
  styleConfig: {
    point: {
      shape: 'cross',
      radius: 8
    },
    border: {
      color: 'hsl(0 100% 50%)'
    }
  }
}, {
  id: 'firefox',
  path: [
    [200, 200]
  ],
  pointCountMax: 1,
  styleConfig: {
    point: {
      shape: (src => {
        const image = new Image();
        
        image.src = src;
        
        return image;
      })('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIGhlaWdodD0iNDgiIHdpZHRoPSI0OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSIjZmZmIj48cGF0aCBkPSJNOC44MjQgNy4yODdjLjAwOCAwIC4wMDQgMCAwIDB6bS0yLjgtMS40Yy4wMDYgMCAuMDAzIDAgMCAwem0xNi43NTQgMi4xNjFjLS41MDUtMS4yMTUtMS41My0yLjUyOC0yLjMzMy0yLjk0My42NTQgMS4yODMgMS4wMzMgMi41NyAxLjE3NyAzLjUzbC4wMDIuMDJjLTEuMzE0LTMuMjc4LTMuNTQ0LTQuNi01LjM2Ni03LjQ3Ny0uMDkxLS4xNDctLjE4NC0uMjkyLS4yNzMtLjQ0NmEzLjU0NSAzLjU0NSAwIDAgMS0uMTMtLjI0IDIuMTE4IDIuMTE4IDAgMCAxLS4xNzItLjQ2LjAzLjAzIDAgMCAwLS4wMjctLjAzLjAzOC4wMzggMCAwIDAtLjAyMSAwbC0uMDA2LjAwMWEuMDM3LjAzNyAwIDAgMC0uMDEuMDA1TDE1LjYyNCAwYy0yLjU4NSAxLjUxNS0zLjY1NyA0LjE2OC0zLjkzMiA1Ljg1NmE2LjE5NyA2LjE5NyAwIDAgMC0yLjMwNS41ODcuMjk3LjI5NyAwIDAgMC0uMTQ3LjM3Yy4wNTcuMTYyLjI0LjI0LjM5Ni4xN2E1LjYyMiA1LjYyMiAwIDAgMSAyLjAwOC0uNTIzbC4wNjctLjAwNWE1Ljg0NyA1Ljg0NyAwIDAgMSAxLjk1Ny4yMjJsLjA5NS4wM2E1LjgxNiA1LjgxNiAwIDAgMSAuNjE2LjIyOGMuMDguMDM2LjE2LjA3My4yMzguMTEybC4xMDcuMDU1YTUuODM1IDUuODM1IDAgMCAxIC4zNjguMjExIDUuOTUzIDUuOTUzIDAgMCAxIDIuMDM0IDIuMTA0Yy0uNjItLjQzNy0xLjczMy0uODY4LTIuODAzLS42ODEgNC4xODMgMi4wOSAzLjA2IDkuMjkyLTIuNzM3IDkuMDJhNS4xNjQgNS4xNjQgMCAwIDEtMS41MTMtLjI5MiA0LjQyIDQuNDIgMCAwIDEtLjUzOC0uMjMyYy0xLjQyLS43MzUtMi41OTMtMi4xMjEtMi43NC0zLjgwNiAwIDAgLjUzNy0yIDMuODQ1LTIgLjM1NyAwIDEuMzgtLjk5OCAxLjM5OC0xLjI4Ny0uMDA1LS4wOTUtMi4wMjktLjktMi44MTctMS42NzctLjQyMi0uNDE2LS42MjItLjYxNi0uOC0uNzY3YTMuNDcgMy40NyAwIDAgMC0uMzAxLS4yMjcgNS4zODggNS4zODggMCAwIDEtLjAzMi0yLjg0MmMtMS4xOTUuNTQ0LTIuMTI0IDEuNDAzLTIuOCAyLjE2M2gtLjAwNmMtLjQ2LS41ODQtLjQyOC0yLjUxLS40MDItMi45MTMtLjAwNi0uMDI1LS4zNDMuMTc2LS4zODkuMjA2YTguNDMgOC40MyAwIDAgMC0xLjEzNi45NzRjLS4zOTcuNDAzLS43Ni44MzktMS4wODUgMS4zMDNhOS44MTYgOS44MTYgMCAwIDAtMS41NjIgMy41MmMtLjAwMy4wMTMtLjExLjQ4Ny0uMTkgMS4wNzMtLjAxMy4wOS0uMDI2LjE4MS0uMDM3LjI3MmE3LjggNy44IDAgMCAwLS4wNjkuNjY3bC0uMDAyLjAzNC0uMDIzLjM4Ny0uMDAxLjA2Qy4zODYgMTguNzk1IDUuNTkzIDI0IDEyLjAxNiAyNGM1Ljc1MiAwIDEwLjUyNy00LjE3NiAxMS40NjMtOS42NjEuMDItLjE0OS4wMzUtLjI5OC4wNTItLjQ0OC4yMzItMS45OTQtLjAyNS00LjA5LS43NTMtNS44NDR6Ij48L3BhdGg+PC9zdmc+'),
      radius: 12
    }
  }
}, {
  id: 'safari',
  path: [
    [400, 200]
  ],
  pointCountMax: 1,
  styleConfig: {
    point: {
      shape: (src => {
        const image = new Image();
        
        image.src = src;
        
        return image;
      })('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgaGVpZ2h0PSI0OCIgd2lkdGg9IjQ4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9IiNmZmYiPjxwYXRoIGQ9Im0yNzQuNyAyNzQuNy0zNy40LTM3LjRMMTY2IDM0NnpNMjU2IDhhMjQ4IDI0OCAwIDEgMCAwIDQ5NiAyNDggMjQ4IDAgMCAwIDAtNDk2em0xNTUuOSAxNzQuOCAxNC44LTYuMUE4IDggMCAwIDEgNDM3IDE4MWE4IDggMCAwIDEtNC4zIDEwLjVsLTE0LjggNi4xYTggOCAwIDAgMS0xMC40LTQuMyA4IDggMCAwIDEgNC4zLTEwLjV6TTMxNC40IDk0bDYuMS0xNC44QTggOCAwIDAgMSAzMzEgNzVhOCA4IDAgMCAxIDQuMyAxMC41bC02LjEgMTQuN2E4IDggMCAwIDEtMTAuNCA0LjQgOCA4IDAgMCAxLTQuNC0xMC41ek0yNTYgNjBhOCA4IDAgMCAxIDggOHYxNmE4IDggMCAwIDEtOCA4IDggOCAwIDAgMS04LThWNjhhOCA4IDAgMCAxIDgtOHptLTc1IDE1YTggOCAwIDAgMSAxMC41IDQuM2w2LjEgMTQuN2E4IDggMCAxIDEtMTQuOCA2LjFsLTYuMS0xNC44QTggOCAwIDAgMSAxODEgNzV6bS02My42IDQyLjRhOCA4IDAgMCAxIDExLjMgMGwxMS4zIDExLjNhOCA4IDAgMCAxIDAgMTEuMyA4IDggMCAwIDEtMTEuMyAwbC0xMS4zLTExLjNhOCA4IDAgMCAxIDAtMTEuM3pNNjAgMjU2YTggOCAwIDAgMSA4LThoMTZhOCA4IDAgMCAxIDggOCA4IDggMCAwIDEtOCA4SDY4YTggOCAwIDAgMS04LTh6bTQwLjEgNzMuMi0xNC43IDYuMWE4IDggMCAwIDEtMTAuNS00LjMgOCA4IDAgMCAxIDQuMy0xMC41bDE0LjgtNi4xYTggOCAwIDAgMSAxMC40IDQuMyA4IDggMCAwIDEtNC4yIDEwLjV6bTQuNC0xMzZhOCA4IDAgMCAxLTEwLjUgNC40bC0xNC44LTYuMUE4IDggMCAwIDEgNzUgMTgxYTggOCAwIDAgMSAxMC41LTQuM2wxNC43IDYuMWE4IDggMCAwIDEgNC40IDEwLjR6TTE5Ny42IDQxOGwtNi4xIDE0LjhhOCA4IDAgMCAxLTE0LjgtNi4xbDYuMS0xNC44YTggOCAwIDEgMSAxNC44IDYuMXptNjYuNCAyNmE4IDggMCAwIDEtOCA4IDggOCAwIDAgMS04LTh2LTE2YTggOCAwIDAgMSA4LTggOCA4IDAgMCAxIDggOHptNjctN2E4IDggMCAwIDEtMTAuNS00LjNsLTYuMS0xNC43YTggOCAwIDAgMSA0LjMtMTAuNCA4IDggMCAwIDEgMTAuNSA0LjNsNi4xIDE0LjhBOCA4IDAgMCAxIDMzMSA0Mzd6bTYzLjYtNDIuNGE4IDggMCAwIDEtMTEuMyAwTDM3MiAzODMuM2E4IDggMCAwIDEgMC0xMS4zIDggOCAwIDAgMSAxMS4zIDBsMTEuMyAxMS4zYTggOCAwIDAgMSAwIDExLjN6TTI4Ni4zIDI4Ni4zbC0xNzYgMTE1LjQgMTE1LjUtMTc1LjkgMTc1LjktMTE1LjV6TTQzNy4xIDMzMWE4IDggMCAwIDEtMTAuNCA0LjNsLTE0LjgtNi4xYTggOCAwIDAgMS00LjQtMTAuNCA4IDggMCAwIDEgMTAuNS00LjRsMTQuOCA2LjFBOCA4IDAgMCAxIDQzNyAzMzF6bTYuOS02N2gtMTZhOCA4IDAgMCAxLTgtOCA4IDggMCAwIDEgOC04aDE2YTggOCAwIDAgMSA4IDggOCA4IDAgMCAxLTggOHoiLz48L3N2Zz4='),
      radius: 12
    }
  }
}, {
  id: 'chrome',
  path: [
    [600, 200]
  ],
  pointCountMax: 1,
  styleConfig: {
    point: {
      shape: (src => {
        const image = new Image();
        
        image.src = src;
        
        return image;
      })('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNDk2IDUxMiIgaGVpZ2h0PSI0OCIgd2lkdGg9IjQ4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9IiNmZmYiID48cGF0aCBkPSJNMTMxLjUgMjE3LjUgNTUuMSAxMDAuMWM0Ny42LTU5LjIgMTE5LTkxLjggMTkyLTkyLjEgNDIuMy0uMyA4NS41IDEwLjUgMTI0LjggMzMuMiA0My40IDI1LjIgNzYuNCA2MS40IDk3LjQgMTAzTDI2NCAxMzMuNGMtNTguMS0zLjQtMTEzLjQgMjkuMy0xMzIuNSA4NC4xem0zMi45IDM4LjVjMCA0Ni4yIDM3LjQgODMuNiA4My42IDgzLjZzODMuNi0zNy40IDgzLjYtODMuNi0zNy40LTgzLjYtODMuNi04My42LTgzLjYgMzcuMy04My42IDgzLjZ6bTMxNC45LTg5LjJMMzM5LjYgMTc0YzM3LjkgNDQuMyAzOC41IDEwOC4yIDYuNiAxNTcuMkwyMzQuMSA1MDMuNmM0Ni41IDIuNSA5NC40LTcuNyAxMzcuOC0zMi45IDEwNy40LTYyIDE1MC45LTE5MiAxMDcuNC0zMDMuOXpNMTMzLjcgMzAzLjYgNDAuNCAxMjAuMUMxNC45IDE1OS4xIDAgMjA1LjkgMCAyNTZjMCAxMjQgOTAuOCAyMjYuNyAyMDkuNSAyNDQuOWw2My43LTEyNC44Yy01Ny42IDEwLjgtMTEzLjItMjAuOC0xMzkuNS03Mi41eiI+PC9wYXRoPjwvc3ZnPg=='),
      radius: 12
    }
  }
}, {
  id: 'opera',
  path: [
    [800, 200]
  ],
  pointCountMax: 1,
  styleConfig: {
    point: {
      shape: (src => {
        const image = new Image();
        
        image.src = src;
        
        return image;
      })('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTYgMTYiIGhlaWdodD0iNDgiIHdpZHRoPSI0OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSIjZmZmIj48cGF0aCBkPSJNMTYgOGMwIDIuMzY5LTEuMDMxIDQuNS0yLjY2OSA1Ljk2My0yLjA1MyAxLTMuOTY2LjMtNC41OTctLjEzNyAyLjAxNi0uNDQxIDMuNTM3LTIuODc4IDMuNTM3LTUuODI1cy0xLjUyMi01LjM4NC0zLjUzNy01LjgyOGMuNjM0LS40MzggMi41NDctMS4xMzcgNC41OTctLjEzOEE3Ljk5IDcuOTkgMCAwIDEgMTYgOC4wMDF6Ij48L3BhdGg+PHBhdGggZD0iTTUuMzY2IDMuNDkxQzQuNDgyIDQuNTM1IDMuOTEgNi4wNzggMy44NzIgNy44MTN2LjM3OGMuMDM4IDEuNzMxLjYxMyAzLjI3NSAxLjQ5NyA0LjMxOSAxLjE0NyAxLjQ5MSAyLjg1MyAyLjQzNCA0Ljc1OSAyLjQzNGE1Ljc2OCA1Ljc2OCAwIDAgMCAzLjIwNi0uOTc4IDcuOTg0IDcuOTg0IDAgMCAxLTUuNzE1IDIuMDI1QTggOCAwIDAgMSA4IDBoLjAzMWE3Ljk1MiA3Ljk1MiAwIDAgMSA1LjMwMyAyLjAzOCA1Ljc3MyA1Ljc3MyAwIDAgMC0zLjIwNi0uOTgxYy0xLjkwNiAwLTMuNjEyLjk0NC00Ljc2MyAyLjQzNHoiPjwvcGF0aD48L3N2Zz4='),
      radius: 12
    }
  }
}, {
  id: 'edge',
  path: [
    [1000, 200]
  ],
  pointCountMax: 1,
  styleConfig: {
    point: {
      shape: (src => {
        const image = new Image();
        
        image.src = src;
        
        return image;
      })('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgaGVpZ2h0PSI0OCIgd2lkdGg9IjQ4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9IiNmZmYiPjxwYXRoICBkPSJNNDgxLjkgMTM0LjVDNDQwLjkgNTQuMTggMzUyLjMgOCAyNTUuOSA4IDEzNy4xIDggMzcuNTEgOTEuNjggMTMuNDcgMjAzLjdjMjYtNDYuNDkgODYuMjItNzkuMTQgMTQ5LjUtNzkuMTQgNzkuMjcgMCAxMjEuMSA0OC45MyAxMjIuMyA1MC4xOCAyMiAyMy44IDMzIDUwLjM5IDMzIDgzLjEgMCAxMC40LTUuMzEgMjUuODItMTUuMTEgMzguNTctMS41NyAyLTYuMzkgNC44NC02LjM5IDExIDAgNS4wNiAzLjI5IDkuOTIgOS4xNCAxNCAyNy44NiAxOS4zNyA4MC4zNyAxNi44MSA4MC41MSAxNi44MUExMTUuNCAxMTUuNCAwIDAgMCA0NDQuOSAzMjJhMTE4LjkgMTE4LjkgMCAwIDAgNTguOTUtMTAyLjRjLjU1LTQzLjUtMTUuNDUtNzIuMy0yMS45NS04NS4xek0yMTIuOCA0NzUuN2ExNTQuOSAxNTQuOSAwIDAgMS00Ni42NC00NWMtMzIuOTQtNDcuNDItMzQuMjQtOTUuNi0yMC4xLTEzNkExNTUuNSAxNTUuNSAwIDAgMSAyMDMgMjE1LjhjNTktNDUuMiA5NC44NC01LjY1IDk5LjA2LTFhODAgODAgMCAwIDAtNC44OS0xMC4xNGMtOS4yNC0xNS45My0yNC0zNi40MS01Ni41Ni01My41MS0zMy43Mi0xNy42OS03MC41OS0xOC41OS03Ny42NC0xOC41OS0zOC43MSAwLTc3LjkgMTMtMTA3LjUgMzUuNjlDMzUuNjggMTgzLjMgMTIuNzcgMjA4LjcgOC42IDI0M2MtMS4wOCAxMi4zMS0yLjc1IDYyLjggMjMgMTE4LjNhMjQ4IDI0OCAwIDAgMCAyNDguMyAxNDEuNmMtMzguMS02LjYtNjUuOC0yNi43LTY3LjEtMjcuMnptMjUwLjctOTguMzNhNy43NiA3Ljc2IDAgMCAwLTcuOTItLjIzIDE4MS43IDE4MS43IDAgMCAxLTIwLjQxIDkuMTIgMTk3LjUgMTk3LjUgMCAwIDEtNjkuNTUgMTIuNTJjLTkxLjY3IDAtMTcxLjUtNjMuMDYtMTcxLjUtMTQ0QTYxLjEyIDYxLjEyIDAgMCAxIDIwMC42IDIyOGExNjguNyAxNjguNyAwIDAgMC0zOC43IDUwYy0xNC45MiAyOS4zNy0zMyA4OC4xMyAxMy4zMyAxNTEuNyA2LjUxIDguOTEgMjMgMzAgNTYgNDcuNjcgMjMuNTcgMTIuNjUgNDkgMTkuNjEgNzEuNyAxOS42MSAzNS4xNCAwIDExNS40LTMzLjQ0IDE2My0xMDguOWE3Ljc1IDcuNzUgMCAwIDAtMi40My0xMC43OHoiPjwvcGF0aD48L3N2Zz4='),
      radius: 12
    }
  }
}] satisfies MarkingConfigItem<void>[];

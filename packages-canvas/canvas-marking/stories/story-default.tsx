import {
  ReactElement,
  useState,
  useCallback,
  useEffect
} from 'react';
import styled, {
  css
} from 'styled-components';

import {
  Button
} from '@kcuf/demo-rc';

import Marking, {
  MarkingStageStats
} from '../src';

import {
  DEMO_MARKINGS_AERIAL,
  DEMO_MARKINGS_GIRL,
  DEMO_MARKINGS_NO_IMAGE,
  IMAGE_AERIAL
} from './const';
import {
  generateCallback,
  getGirlImageUrl,
  getHoveringInfo
} from './util';

interface IScStoryDefaultProps {
  $fullscreen?: boolean;
}

const ScStoryDefault = styled.div<IScStoryDefaultProps>`
  display: flex;
  flex-direction: column;
  height: 960px;
  min-height: 320px;
  padding: 16px;
  border: 1px double hsl(203 98% 55%);
  resize: vertical;
  overflow: auto;
  
  ${props => (props.$fullscreen ? css`
    background-color: hsl(0 0% 100%);
    resize: none;
  ` : null)}
`;
const ScMarking = styled.div`
  flex: 1;
`;
const ScActions = styled.div`
  margin-top: 8px;
`;

export default function StoryDefault(): ReactElement {
  const [stateDomContainer, setStateDomContainer] = useState<HTMLDivElement | null>(null);
  const [stateDomMarking, setStateDomMarking] = useState<HTMLDivElement | null>(null);
  const [stateMarkingStageStats, setStateMarkingStageStats] = useState<MarkingStageStats | null>(null);
  const [stateMarkingInstance, setStateMarkingInstance] = useState<Marking | null>(null);
  const [stateFullscreen, setStateFullscreen] = useState(false);
  
  const handleInit = useCallback(() => {
    if (stateDomMarking) {
      setStateMarkingInstance(value => {
        if (value) {
          return value;
        }
        
        return new Marking(stateDomMarking, {
          image: IMAGE_AERIAL,
          items: DEMO_MARKINGS_AERIAL,
          pluginFps: true,
          pluginStats: true,
          pluginTooltip: {
            getHoveringInfo
          },
          onCreateStart: generateCallback('onCreateStart'),
          onCreateCancel: generateCallback('onCreateCancel'),
          onCreateComplete: generateCallback('onCreateComplete'),
          onClick: generateCallback('onClick'),
          onSelectionChange: generateCallback('onSelectionChange'),
          onPointInsert: generateCallback('onPointInsert'),
          onDragEnd: generateCallback('onDragEnd'),
          onEditCancel: generateCallback('onEditCancel'),
          onEditComplete: generateCallback('onEditComplete'),
          onDelete: generateCallback('onDelete'),
          onStatsChange: setStateMarkingStageStats
        });
      });
    }
  }, [stateDomMarking]);
  
  const handleDestroy = useCallback(() => {
    setStateMarkingInstance(value => {
      if (value) {
        value.destroy();
      }
      
      return null;
    });
  }, [setStateMarkingInstance]);
  
  const handleToggleFullscreen = useCallback(() => {
    if (stateFullscreen) {
      document.exitFullscreen().catch(() => console.error('Failed: exitFullscreen')); // eslint-disable-line no-console
    } else {
      stateDomContainer?.requestFullscreen().catch(() => console.error('Failed: requestFullscreen')); // eslint-disable-line no-console
    }
  }, [stateFullscreen, stateDomContainer]);
  
  const handleChangeImageAerial = useCallback((): void => {
    stateMarkingInstance?.setData(IMAGE_AERIAL, DEMO_MARKINGS_AERIAL);
  }, [stateMarkingInstance]);
  
  const handleChangeImageGirl = useCallback((): void => {
    stateMarkingInstance?.setData(getGirlImageUrl(), DEMO_MARKINGS_GIRL);
  }, [stateMarkingInstance]);
  
  const handleChangeImageEmpty = useCallback((): void => {
    stateMarkingInstance?.setData('', DEMO_MARKINGS_NO_IMAGE);
  }, [stateMarkingInstance]);
  const handleChangeNothing = useCallback((): void => {
    stateMarkingInstance?.setData('');
  }, [stateMarkingInstance]);
  
  const handleStartCreating = useCallback((): void => {
    stateMarkingInstance?.startCreating();
  }, [stateMarkingInstance]);
  
  const handleStartCreatingMaxPoint5 = useCallback((): void => {
    stateMarkingInstance?.startCreating({
      pointCountMax: 5
    });
  }, [stateMarkingInstance]);
  
  const handleStartCreatingRect = useCallback((): void => {
    stateMarkingInstance?.startCreating({
      type: 'rect'
    });
  }, [stateMarkingInstance]);
  
  const handleStartCreatingRect2 = useCallback((): void => {
    stateMarkingInstance?.startCreating({
      type: 'rect2'
    });
  }, [stateMarkingInstance]);
  
  const handleStartCreatingLine = useCallback((): void => {
    stateMarkingInstance?.startCreating({
      pointStyle: {
        type: 'square'
      },
      pointCountMin: 2,
      pointCountMax: 2
    });
  }, [stateMarkingInstance]);
  
  const handleCancelCreating = useCallback((): void => {
    stateMarkingInstance?.cancelCreating();
  }, [stateMarkingInstance]);
  
  const handleFinishCreating = useCallback((): void => {
    stateMarkingInstance?.finishCreating();
  }, [stateMarkingInstance]);
  
  const handleDeleteActiveItem = useCallback((): void => {
    stateMarkingInstance?.deleteActiveItem();
  }, [stateMarkingInstance]);
  
  const handleDeleteAllItems = useCallback((): void => {
    stateMarkingInstance?.deleteAllItems();
  }, [stateMarkingInstance]);
  
  const handleZoomOut = useCallback((): void => {
    stateMarkingInstance?.zoomOut();
  }, [stateMarkingInstance]);
  
  const handleZoomIn = useCallback((): void => {
    stateMarkingInstance?.zoomIn();
  }, [stateMarkingInstance]);
  
  const handleZoomReset = useCallback((): void => {
    stateMarkingInstance?.zoomReset();
  }, [stateMarkingInstance]);
  
  const handleHighlightPrev = useCallback((): void => {
    stateMarkingInstance?.highlightItem(-1);
  }, [stateMarkingInstance]);
  
  const handleHighlightNext = useCallback((): void => {
    stateMarkingInstance?.highlightItem(1);
  }, [stateMarkingInstance]);
  
  const handleHighlightPrevBorder = useCallback((): void => {
    stateMarkingInstance?.highlightItem(-1, 0);
  }, [stateMarkingInstance]);
  
  const handleHighlightNextBorder = useCallback((): void => {
    stateMarkingInstance?.highlightItem(1, -1);
  }, [stateMarkingInstance]);
  
  const handleHighlightNone = useCallback((): void => {
    stateMarkingInstance?.highlightItem(null);
  }, [stateMarkingInstance]);
  
  const handleConsoleStats = useCallback((): void => {
    console.info(stateMarkingInstance?.getStats()); // eslint-disable-line no-console
  }, [stateMarkingInstance]);
  
  const handleToggleDisabled = useCallback((): void => {
    stateMarkingInstance?.toggleDisabled();
  }, [stateMarkingInstance]);
  
  const handleDocumentFullscreenChange = useCallback(() => {
    setStateFullscreen(!!document.fullscreenElement);
  }, [setStateFullscreen]);
  
  useEffect(() => {
    document.addEventListener('fullscreenchange', handleDocumentFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleDocumentFullscreenChange);
    };
  }, [handleDocumentFullscreenChange]);
  
  useEffect(() => {
    handleInit();
  }, [handleInit]);
  
  useEffect(() => {
    return handleDestroy;
  }, [handleDestroy]);
  
  return <ScStoryDefault ref={setStateDomContainer} $fullscreen={stateFullscreen}>
    <ScMarking ref={setStateDomMarking} />
    <ScActions>
      <Button {...{
        onClick: handleToggleFullscreen
      }}>{stateFullscreen ? '退出全屏' : '进入全屏'}</Button>
      <Button {...{
        onClick: stateMarkingInstance ? handleDestroy : handleInit
      }}>{stateMarkingInstance ? 'destroy' : 'init'}</Button>
      {stateMarkingInstance ? <>
        <Button {...{
          onClick: handleConsoleStats
        }}>stats</Button>
        <Button {...{
          onClick: handleToggleDisabled
        }}>{stateMarkingStageStats?.disabled ? 'enable' : 'disable'}</Button>
        <br />
        <Button {...{
          onClick: handleChangeImageAerial
        }}>航拍图</Button>
        <Button {...{
          onClick: handleChangeImageGirl
        }}>性感图</Button>
        <Button {...{
          onClick: handleChangeImageEmpty
        }}>无图</Button>
        <Button {...{
          onClick: handleChangeNothing
        }}>空</Button>
        <br />
        <Button {...{
          disabled: !stateMarkingStageStats?.creating,
          onClick: handleCancelCreating
        }}>取消标注</Button>
        <Button {...{
          disabled: !stateMarkingStageStats?.creating,
          onClick: handleFinishCreating
        }}>完成标注</Button>
        <Button {...{
          disabled: stateMarkingStageStats?.disabled || stateMarkingStageStats?.creating,
          onClick: handleStartCreating
        }}>标注</Button>
        <Button {...{
          disabled: stateMarkingStageStats?.disabled || stateMarkingStageStats?.creating,
          onClick: handleStartCreatingMaxPoint5
        }}>标注（最多 5 点）</Button>
        <Button {...{
          disabled: stateMarkingStageStats?.disabled || stateMarkingStageStats?.creating,
          onClick: handleStartCreatingRect
        }}>标注（矩形）</Button>
        <Button {...{
          disabled: stateMarkingStageStats?.disabled || stateMarkingStageStats?.creating,
          onClick: handleStartCreatingRect2
        }}>标注（矩形 II）</Button>
        <Button {...{
          disabled: stateMarkingStageStats?.disabled || stateMarkingStageStats?.creating,
          onClick: handleStartCreatingLine
        }}>标注（线）</Button>
        <Button {...{
          disabled: !stateMarkingStageStats?.editing,
          onClick: handleDeleteActiveItem
        }}>删除</Button>
        <Button {...{
          disabled: !stateMarkingStageStats?.itemStatsList.length,
          onClick: handleDeleteAllItems
        }}>删除全部</Button>
        <br />
        <Button {...{
          onClick: handleHighlightPrev
        }}>highlight-prev</Button>
        <Button {...{
          onClick: handleHighlightNext
        }}>highlight-next</Button>
        <Button {...{
          onClick: handleHighlightPrevBorder
        }}>highlight-prev-border:first</Button>
        <Button {...{
          onClick: handleHighlightNextBorder
        }}>highlight-next-border:all</Button>
        <Button {...{
          onClick: handleHighlightNone
        }}>highlight-none</Button>
        <br />
        <Button {...{
          onClick: handleZoomOut
        }}>zoom-</Button>
        <Button {...{
          onClick: handleZoomIn
        }}>zoom+</Button>
        <Button {...{
          onClick: handleZoomReset
        }}>zoom reset</Button>
      </> : null}
    </ScActions>
  </ScStoryDefault>;
}
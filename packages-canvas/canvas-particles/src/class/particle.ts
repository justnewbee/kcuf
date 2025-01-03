import {
  pathCircle,
  pathTriangle,
  pathSquare,
  pathPentagon,
  pathHexagon,
  pathStar
} from '@kcuf/canvas-helper';

import {
  EParticleShape
} from '../enum';
import {
  TCoords,
  IParticlesParsedConfig,
  ICreateInfo,
  IUpdateInfo,
  IParticleClassType
} from '../types';
import {
  PIXEL_RATIO
} from '../const';
import {
  Color,
  createColor,
  calculateDistance,
  calculateDistances,
  randomBetween,
  clamp,
  clampCoords,
  clampOpacity,
  getNewParticleShape,
  getNewParticleColor,
  getNewParticleStroke,
  getNewParticleSpeedRadius,
  getNewParticleSpeedOpacity,
  getNewParticleSpeedMove,
  getClickRepulseSpeed,
  canvasDrawShapeImage
} from '../util';

const DEFAULT_COLOR: Color = createColor('#000');

/**
 * A single particle
 */
export default class Particle implements IParticleClassType {
  private readonly canvasContext: CanvasRenderingContext2D;
  private readonly config: IParticlesParsedConfig;
  private readonly shape: EParticleShape;
  private readonly image: HTMLImageElement | null;
  private readonly imageAspectRatio: number;
  
  private color: Color = DEFAULT_COLOR;
  private stroke: [Color, number] | null = null;
  private opacity = 0;
  private radius = 0;
  private radiusSpeed = 0;
  private opacitySpeed = 0;
  private moveSpeedX = 0;
  private moveSpeedY = 0;
  
  private radiusSpeedFactor: 1 | -1 = 1;
  private opacitySpeedFactor: 1 | -1 = 1;
  
  private radiusBubble: number | undefined;
  private opacityBubble: number | undefined;
  
  coords: TCoords;
  
  constructor(canvasContext: CanvasRenderingContext2D, config: IParticlesParsedConfig, info: ICreateInfo) {
    const {
      image,
      imageAspectRatio,
      canvasWidth,
      canvasHeight,
      coords
    } = info;
    
    this.canvasContext = canvasContext;
    this.config = config;
    this.shape = getNewParticleShape(config.shape);
    this.image = image;
    this.imageAspectRatio = imageAspectRatio;
    
    const radius = this.init(config);
    
    this.coords = clampCoords(coords || [Math.random() * canvasWidth, Math.random() * canvasHeight], radius, canvasWidth, canvasHeight);
  }
  
  /**
   * 初始化颜色、速度、大小等，由于后续操作经常需要用到这里生成的 radius，顾返回 radius
   */
  private init(config: IParticlesParsedConfig): number {
    const [moveSpeedX, moveSpeedY] = getNewParticleSpeedMove(config.animateMove);
    
    this.color = getNewParticleColor(config.color);
    this.stroke = getNewParticleStroke(config.stroke);
    this.opacity = randomBetween(config.opacity);
    this.radius = randomBetween(config.radius);
    this.radiusSpeed = getNewParticleSpeedRadius(config.animateRadius);
    this.opacitySpeed = getNewParticleSpeedOpacity(config.animateOpacity);
    this.moveSpeedX = moveSpeedX;
    this.moveSpeedY = moveSpeedY;
    
    return this.radius;
  }
  
  /**
   * 帧动画，更新不透明度
   */
  private updateOpacity(): void {
    const {
      config: {
        opacity: [opacityMin, opacityMax]
      },
      opacity,
      opacitySpeedFactor,
      opacitySpeed
    } = this;
    
    if (opacitySpeed <= 0 || opacityMin === opacityMax) {
      return;
    }
    
    const nextOpacity = opacity + opacitySpeedFactor * opacitySpeed;
    
    this.opacity = clamp(nextOpacity, opacityMin, opacityMax);
    
    if (nextOpacity >= opacityMax) {
      this.opacitySpeedFactor = -1;
    } else if (nextOpacity <= opacityMin) {
      this.opacitySpeedFactor = 1;
    }
  }
  
  /**
   * 帧动画，更新图形半径
   */
  private updateRadius(): void {
    const {
      config: {
        radius: [radiusMin, radiusMax]
      },
      radius,
      radiusSpeedFactor,
      radiusSpeed
    } = this;
    
    if (radiusSpeed <= 0 || radiusMin === radiusMax) {
      return;
    }
    
    const nextRadius = radius + radiusSpeedFactor * radiusSpeed;
    
    this.radius = clamp(nextRadius, radiusMin, radiusMax);
    
    if (nextRadius >= radiusMax) {
      this.radiusSpeedFactor = -1;
    } else if (nextRadius <= radiusMin) {
      this.radiusSpeedFactor = 1;
    }
  }
  
  /**
   * 帧动画，更新图形中心坐标
   */
  private updateCoords(info: IUpdateInfo): void {
    const {
      config,
      config: {
        animateMove,
        hoverRepulse,
        clickRepulse
      },
      radius,
      coords,
      moveSpeedX,
      moveSpeedY
    } = this;
    const {
      canvasWidth,
      canvasHeight,
      coordsHover,
      coordsClick,
      timeFromLastClick
    } = info;
    
    const moveSpeedRepulse = coordsClick && clickRepulse && timeFromLastClick < clickRepulse.duration ? getClickRepulseSpeed(coordsClick, coords, clickRepulse.radius) : null;
    let [x, y] = coords;
    
    // 根据运动速度更新位置
    if (moveSpeedRepulse) {
      x += moveSpeedRepulse[0];
      y += moveSpeedRepulse[1];
    } else {
      x += moveSpeedX;
      y += moveSpeedY;
    }
    
    // 根据 hoverRepulse 再度更新
    if (coordsHover && hoverRepulse > 0) {
      const [distance, dx, dy] = calculateDistances(coordsHover, [x, y]);
      
      if (distance < hoverRepulse) {
        const cosValue = dx / distance;
        const sinValue = dy / distance;
        const velocity = 100;
        const repulseFactor = clamp((1 / hoverRepulse) * (-1 * Math.pow(distance / hoverRepulse, 2) + 1) * hoverRepulse * velocity, 0, 50);
        
        x += cosValue * repulseFactor;
        y += sinValue * repulseFactor;
      }
    }
    
    // 边界碰撞，保持在内部，并在碰撞时回弹
    if (animateMove?.bounceOnEdge) {
      this.coords = clampCoords([x, y], radius, canvasWidth, canvasHeight);
      this.moveSpeedX *= x <= radius || x + radius >= canvasWidth ? -1 : 1;
      this.moveSpeedY *= y <= radius || y + radius >= canvasHeight ? -1 : 1;
      
      return;
    }
    
    // 若出界，则重置颜色、速度等，并反向入
    if (x >= canvasWidth + radius) { // 出右界，左入
      x = 0 - this.init(config);
      y = Math.random() * canvasHeight;
    } else if (x < -radius) { // 出左界，右入
      x = canvasWidth + this.init(config);
      y = Math.random() * canvasHeight;
    } else if (y > canvasHeight + radius) { // 出下界，上入
      x = Math.random() * canvasWidth;
      y = 0 - this.init(config);
    } else if (y < -radius) { // 出上界，下入
      x = Math.random() * canvasWidth;
      y = canvasHeight + this.init(config);
    }
    
    this.coords = [x, y];
  }
  
  private updateByBubbleHover(info: IUpdateInfo): void {
    const {
      config: {
        hoverBubble
      },
      radius,
      coords,
      opacity
    } = this;
    const {
      coordsHover
    } = info;
    
    this.opacityBubble = undefined;
    this.radiusBubble = undefined;
    
    const ratio = hoverBubble && coordsHover ? 1 - calculateDistance(coordsHover, coords) / hoverBubble.distance : 0;
    
    if (ratio <= 0) {
      return;
    }
    
    if (hoverBubble?.diffRadius) {
      this.radiusBubble = clamp(radius + hoverBubble.diffRadius * ratio, PIXEL_RATIO);
    }
    
    if (hoverBubble?.diffOpacity) {
      this.opacityBubble = clampOpacity(opacity + hoverBubble.diffOpacity * ratio);
    }
  }
  
  private updateByBubbleClick(info: IUpdateInfo): void {
    const {
      config: {
        clickBubble
      },
      coords
    } = this;
    const {
      coordsClick,
      timeFromLastClick
    } = info;
    
    if (!coordsClick || !clickBubble || timeFromLastClick >= clickBubble.duration) {
      this.opacityBubble = undefined;
      this.radiusBubble = undefined;
      
      return;
    }
    
    const distance = calculateDistance(coordsClick, coords);
    const distanceRatio = 1 - distance / clickBubble.distance;
    
    if (distanceRatio <= 0) {
      this.opacityBubble = undefined;
      this.radiusBubble = undefined;
      
      return;
    }
    
    let timeRatio = timeFromLastClick / (clickBubble.duration * 0.5);
    
    if (timeFromLastClick > clickBubble.duration * 0.5) { // 前半段时间上升、后半段时间下降
      timeRatio = 2 - timeRatio;
    }
    
    this.opacityBubble = clampOpacity((this.opacityBubble ?? this.opacity) + clickBubble.diffOpacity * timeRatio * distanceRatio);
    this.radiusBubble = (this.radiusBubble ?? this.radius) + clickBubble.diffRadius * timeRatio * distanceRatio;
  }
  
  private adjustSpeedByDiff(dx: number, dy: number): void {
    const {
      config: {
        animateMove
      }
    } = this;
    
    if (!animateMove) {
      return;
    }
    
    let speedX = this.moveSpeedX + dx;
    let speedY = this.moveSpeedY + dy;
    const speedRatio = Math.sqrt(speedX * speedX + speedY * speedY) / animateMove.speed;
    
    if (speedRatio > 1) {
      speedX /= speedRatio;
      speedY /= speedRatio;
    }
    
    this.moveSpeedX = speedX;
    this.moveSpeedY = speedY;
  }
  
  update(info: IUpdateInfo): void {
    this.updateOpacity();
    this.updateRadius();
    this.updateCoords(info);
    this.updateByBubbleHover(info);
    this.updateByBubbleClick(info);
  }
  
  bounceAnother(p: Particle): void {
    if (p === this) {
      return;
    }
    
    const {
      config: {
        animateMove
      },
      coords,
      radius,
      moveSpeedX,
      moveSpeedY
    } = this;
    
    if (!animateMove?.bounce) {
      return;
    }
    
    if (calculateDistance(coords, p.coords) <= radius + p.radius) {
      this.moveSpeedX = p.moveSpeedX;
      this.moveSpeedY = p.moveSpeedY;
      p.moveSpeedX = moveSpeedX;
      p.moveSpeedY = moveSpeedY;
    }
  }
  
  attractAnother(p: Particle): void {
    if (p === this) {
      return;
    }
    
    const {
      config: {
        attract
      },
      coords
    } = this;
    
    if (!attract) {
      return;
    }
    
    const [distance, dx, dy] = calculateDistances(coords, p.coords);
    
    if (distance <= attract.distance) {
      const ax = dx / (attract.rotateX * 1000);
      const ay = dy / (attract.rotateY * 1000);
      
      this.adjustSpeedByDiff(ax, ay);
      p.adjustSpeedByDiff(-ax, -ay);
    }
  }
  
  draw(): void {
    const {
      canvasContext,
      shape,
      image,
      imageAspectRatio,
      color,
      stroke,
      coords
    } = this;
    const opacity = this.opacityBubble ?? this.opacity;
    const radius = this.radiusBubble ?? this.radius;
    
    switch (shape) {
    case EParticleShape.IMAGE:
      canvasDrawShapeImage(canvasContext, image, coords, radius, imageAspectRatio);
      
      return; // 不需要往下走
    case EParticleShape.TRIANGLE:
      pathTriangle(canvasContext, {
        center: coords,
        radius
      });
      
      break;
    case EParticleShape.SQUARE:
      pathSquare(canvasContext, {
        center: coords,
        radius
      });
      
      break;
    case EParticleShape.PENTAGON:
      pathPentagon(canvasContext, {
        center: coords,
        radius
      });
      
      break;
    case EParticleShape.HEXAGON:
      pathHexagon(canvasContext, {
        center: coords,
        radius
      });
      
      break;
    case EParticleShape.STAR:
      pathStar(canvasContext, {
        center: coords,
        radius,
        vertices: 5
      });
      
      break;
    case EParticleShape.STAR_7:
      pathStar(canvasContext, {
        center: coords,
        radius,
        vertices: 7
      });
      
      break;
    default:
      pathCircle(canvasContext, {
        center: coords,
        radius
      });
      
      break;
    }
    
    canvasContext.fillStyle = color.toColorString(opacity);
    canvasContext.fill();
    
    if (stroke) {
      const [strokeColor, strokeWidth] = stroke;
      
      canvasContext.strokeStyle = strokeColor.toColorString();
      canvasContext.lineWidth = strokeWidth;
      canvasContext.stroke();
    }
  }
}

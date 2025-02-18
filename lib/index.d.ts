import React from "react";
import Animated from "react-native-reanimated";
export declare enum OpenDirection {
  LEFT = "left",
  RIGHT = "right",
  NONE = 0
}
declare type VoidPromiseFn = () => Promise<void>;
export declare type UnderlayParams<T> = {
  item: T;
  open: VoidPromiseFn;
  close: VoidPromiseFn;
  percentOpen: Animated.Node<number>;
  isGestureActive: Animated.Node<number>;
};
export declare type OverlayParams<T> = {
  item: T;
  openLeft: VoidPromiseFn;
  openRight: VoidPromiseFn;
  close: VoidPromiseFn;
  openDirection: OpenDirection;
};
export declare type RenderUnderlay<T> = (
  params: UnderlayParams<T>
) => React.ReactNode;
export declare type RenderOverlay<T> = (
  params: OverlayParams<T>
) => React.ReactNode;
declare type Props<T> = {
  item: T;
  children?: React.ReactNode;
  renderOverlay?: RenderOverlay<T>;
  renderUnderlayLeft?: RenderUnderlay<T>;
  renderUnderlayRight?: RenderUnderlay<T>;
  onChange: (params: { open: OpenDirection; snapPoint: number }) => void;
  overSwipe: number;
  animationConfig?: Partial<Animated.SpringConfig>;
  activationThreshold?: number;
  swipeEnabled?: boolean;
  snapPointsLeft?: number[];
  snapPointsRight?: number[];
  swipeDamping?: number;
};
declare class SwipeableItem<T> extends React.PureComponent<Props<T>> {
  static defaultProps: {
    onChange: () => void;
    overSwipe: number;
    animationConfig: {};
    activationThreshold: number;
    swipeEnabled: boolean;
    snapPointsLeft: any[];
    snapPointsRight: any[];
    swipeDamping: number;
  };
  state: {
    openDirection: OpenDirection;
    swipeDirection: OpenDirection;
  };
  clock: Animated.Clock;
  prevTranslate: Animated.Value<0>;
  gestureState: Animated.Value<0>;
  velocity: Animated.Value<0>;
  animState: {
    finished: Animated.Value<number>;
    position: Animated.Value<number>;
    velocity: Animated.Value<number>;
    time: Animated.Value<number>;
  };
  animConfig: Animated.SpringConfig;
  panX: Animated.Value<0>;
  hasLeft: Animated.Node<0 | 1>;
  hasRight: Animated.Node<0 | 1>;
  swipingLeft: Animated.Node<0 | 1>;
  swipingRight: Animated.Node<0 | 1>;
  leftWidth: Animated.Value<number>;
  rightWidth: Animated.Value<number>;
  percentOpenLeft: Animated.Node<number>;
  percentOpenRight: Animated.Node<number>;
  isSwiping: Animated.Node<0 | 1>;
  leftActive: Animated.Node<number>;
  isActive: Animated.Node<number>;
  onSwipeLeftChange: ([isSwiping]: readonly number[]) => void;
  onSwipeRightChange: ([isSwiping]: readonly number[]) => void;
  onIsSwipingChange: ([isSwiping]: readonly number[]) => void;
  absPosition: Animated.Node<number>;
  snapPoints: Animated.Value<number>[];
  midponts: Animated.Value<number>[];
  velocityModifiedPosition: Animated.Node<number>;
  currentSnapPoint: Animated.Node<number>;
  openResolve: () => void;
  openLeftFlag: Animated.Value<number>;
  openRightFlag: Animated.Value<number>;
  open: (direction: OpenDirection, snapPoint?: number) => Promise<void>;
  closeResolve: () => void;
  closeFlag: Animated.Value<number>;
  close: () => Promise<void>;
  onOpen: (snapPoint: number) => void;
  onClose: () => void;
  maxTranslate: Animated.Node<number>;
  minTranslate: Animated.Node<number>;
  onHandlerStateChange: (...args: any[]) => void;
  tempTranslate: Animated.Value<number>;
  onPanEvent: (...args: any[]) => void;
  onAnimationEnd: ([position, snapPointRaw]: readonly number[]) => void;
  runCode: () => Animated.Node<number>;
  openLeft: (snapPoint?: number) => Promise<void>;
  openRight: (snapPoint?: number) => Promise<void>;
  render(): JSX.Element;
}
export default SwipeableItem;

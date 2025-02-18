import Animated from "react-native-reanimated";
export declare const getOpenPct: (
  isSwiping: Animated.Node<number>,
  pos: Animated.Node<number>,
  width: Animated.Node<number>
) => Animated.Node<number>;
export declare const getLeftActive: (
  swipingLeft: Animated.Node<number>,
  isSwiping: Animated.Node<number>,
  panX: Animated.Node<number>
) => Animated.Node<number>;
export declare const getMaxTranslate: (
  hasRight: Animated.Node<number>,
  rightWidth: Animated.Node<number>,
  overSwipe: number
) => Animated.Node<number>;
export declare const getMinTranslate: (
  hasLeft: Animated.Node<number>,
  leftWidth: Animated.Node<number>,
  overSwipe: number
) => Animated.Node<number>;
export declare const getIsActive: (
  gestureState: Animated.Node<0 | 2 | 1 | 5 | 4 | 3>
) => Animated.Node<number>;
export declare const getOnPanEvent: (
  gestureState: Animated.Node<0 | 2 | 1 | 5 | 4 | 3>,
  tempTranslate: Animated.Node<number>,
  maxTranslate: Animated.Node<number>,
  minTranslate: Animated.Node<number>,
  pos: Animated.Value<number>
) => Animated.Node<number>;
export declare function springFill(
  clock: Animated.Clock,
  state: Animated.SpringState,
  config: Animated.SpringConfig
): any;

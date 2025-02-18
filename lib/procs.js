"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_reanimated_1 = __importDefault(
  require("react-native-reanimated")
);
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var cond = react_native_reanimated_1.default.cond,
  divide = react_native_reanimated_1.default.divide,
  abs = react_native_reanimated_1.default.abs,
  or = react_native_reanimated_1.default.or,
  and = react_native_reanimated_1.default.and,
  not = react_native_reanimated_1.default.not,
  add = react_native_reanimated_1.default.add,
  eq = react_native_reanimated_1.default.eq,
  set = react_native_reanimated_1.default.set,
  lessThan = react_native_reanimated_1.default.lessThan,
  lessOrEq = react_native_reanimated_1.default.lessOrEq,
  greaterOrEq = react_native_reanimated_1.default.greaterOrEq,
  multiply = react_native_reanimated_1.default.multiply,
  proc = react_native_reanimated_1.default.proc,
  spring = react_native_reanimated_1.default.spring,
  Value = react_native_reanimated_1.default.Value;
if (!proc) {
  console.warn("Use reanimated > 1.3 for optimal perf");
  var procStub = function(cb) {
    return cb;
  };
  proc = procStub;
}
var betterSpring = proc(function(
  finished,
  velocity,
  position,
  time,
  prevPosition,
  toValue,
  damping,
  mass,
  stiffness,
  overshootClamping,
  restSpeedThreshold,
  restDisplacementThreshold,
  clock
) {
  return spring(
    clock,
    {
      finished: finished,
      velocity: velocity,
      position: position,
      time: time,
      // @ts-ignore -- https://github.com/software-mansion/react-native-reanimated/blob/master/src/animations/spring.js#L177
      prevPosition: prevPosition
    },
    {
      toValue: toValue,
      damping: damping,
      mass: mass,
      stiffness: stiffness,
      overshootClamping: overshootClamping,
      restDisplacementThreshold: restDisplacementThreshold,
      restSpeedThreshold: restSpeedThreshold
    }
  );
});
exports.getOpenPct = proc(function(isSwiping, pos, width) {
  return cond(isSwiping, divide(abs(pos), width), 0);
});
exports.getLeftActive = proc(function(swipingLeft, isSwiping, panX) {
  return or(swipingLeft, and(not(isSwiping), lessThan(panX, 0)));
});
exports.getMaxTranslate = proc(function(hasRight, rightWidth, overSwipe) {
  return cond(hasRight, add(rightWidth, overSwipe), 0);
});
exports.getMinTranslate = proc(function(hasLeft, leftWidth, overSwipe) {
  return cond(hasLeft, multiply(-1, add(leftWidth, overSwipe)), 0);
});
exports.getIsActive = proc(function(gestureState) {
  return or(
    eq(gestureState, react_native_gesture_handler_1.State.ACTIVE),
    eq(gestureState, react_native_gesture_handler_1.State.BEGAN)
  );
});
exports.getOnPanEvent = proc(function(
  gestureState,
  tempTranslate,
  maxTranslate,
  minTranslate,
  pos
) {
  return cond(
    and(
      eq(gestureState, react_native_gesture_handler_1.State.ACTIVE),
      lessOrEq(tempTranslate, maxTranslate),
      greaterOrEq(tempTranslate, minTranslate)
    ),
    set(pos, tempTranslate)
  );
});
function springFill(clock, state, config) {
  return betterSpring(
    state.finished,
    state.velocity,
    state.position,
    state.time,
    new Value(0),
    //@ts-ignore
    config.toValue,
    config.damping,
    config.mass,
    config.stiffness,
    //@ts-ignore
    config.overshootClamping,
    config.restSpeedThreshold,
    config.restDisplacementThreshold,
    clock
  );
}
exports.springFill = springFill;

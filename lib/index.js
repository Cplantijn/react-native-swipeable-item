"use strict";
var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics = function(d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function(d, b) {
            d.__proto__ = b;
          }) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
var __assign =
  (this && this.__assign) ||
  function() {
    __assign =
      Object.assign ||
      function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __spreadArrays =
  (this && this.__spreadArrays) ||
  function() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++)
      s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j];
    return r;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var react_native_reanimated_1 = __importDefault(
  require("react-native-reanimated")
);
var procs_1 = require("./procs");
var event = react_native_reanimated_1.default.event,
  cond = react_native_reanimated_1.default.cond,
  Value = react_native_reanimated_1.default.Value,
  block = react_native_reanimated_1.default.block,
  set = react_native_reanimated_1.default.set,
  eq = react_native_reanimated_1.default.eq,
  neq = react_native_reanimated_1.default.neq,
  not = react_native_reanimated_1.default.not,
  or = react_native_reanimated_1.default.or,
  abs = react_native_reanimated_1.default.abs,
  clockRunning = react_native_reanimated_1.default.clockRunning,
  add = react_native_reanimated_1.default.add,
  and = react_native_reanimated_1.default.and,
  startClock = react_native_reanimated_1.default.startClock,
  stopClock = react_native_reanimated_1.default.stopClock,
  greaterThan = react_native_reanimated_1.default.greaterThan,
  lessThan = react_native_reanimated_1.default.lessThan,
  call = react_native_reanimated_1.default.call,
  Clock = react_native_reanimated_1.default.Clock,
  onChange = react_native_reanimated_1.default.onChange,
  multiply = react_native_reanimated_1.default.multiply,
  divide = react_native_reanimated_1.default.divide;
var OpenDirection;
(function(OpenDirection) {
  OpenDirection["LEFT"] = "left";
  OpenDirection["RIGHT"] = "right";
  OpenDirection[(OpenDirection["NONE"] = 0)] = "NONE";
})((OpenDirection = exports.OpenDirection || (exports.OpenDirection = {})));
var tempResolve = function() {};
var renderNull = function() {
  return null;
};
var SwipeableItem = /** @class */ (function(_super) {
  __extends(SwipeableItem, _super);
  function SwipeableItem() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.state = {
      openDirection: OpenDirection.NONE,
      swipeDirection: OpenDirection.NONE
    };
    _this.clock = new Clock();
    _this.prevTranslate = new Value(0);
    _this.gestureState = new Value(
      react_native_gesture_handler_1.State.UNDETERMINED
    );
    _this.velocity = new Value(0);
    _this.animState = {
      finished: new Value(0),
      position: new Value(0),
      velocity: new Value(0),
      time: new Value(0)
    };
    // Spring animation config
    // Determines how "springy" row is when it
    // snaps back into place after released
    _this.animConfig = __assign(
      {
        toValue: new Value(0),
        damping: 20,
        mass: 0.2,
        stiffness: 100,
        overshootClamping: false,
        restSpeedThreshold: 0.5,
        restDisplacementThreshold: 0.5
      },
      _this.props.animationConfig
    );
    _this.panX = new Value(0);
    _this.hasLeft = greaterThan(_this.props.snapPointsLeft.length, 0);
    _this.hasRight = greaterThan(_this.props.snapPointsRight.length, 0);
    _this.swipingLeft = lessThan(_this.animState.position, 0);
    _this.swipingRight = greaterThan(_this.animState.position, 0);
    _this.leftWidth = new Value(
      _this.props.snapPointsLeft.length
        ? _this.props.snapPointsLeft[_this.props.snapPointsLeft.length - 1]
        : 0
    );
    _this.rightWidth = new Value(
      _this.props.snapPointsRight.length
        ? _this.props.snapPointsRight[_this.props.snapPointsRight.length - 1]
        : 0
    );
    _this.percentOpenLeft = procs_1.getOpenPct(
      _this.swipingLeft,
      _this.animState.position,
      _this.leftWidth
    );
    _this.percentOpenRight = procs_1.getOpenPct(
      _this.swipingRight,
      _this.animState.position,
      _this.rightWidth
    );
    _this.isSwiping = or(_this.swipingLeft, _this.swipingRight);
    _this.leftActive = procs_1.getLeftActive(
      _this.swipingLeft,
      _this.isSwiping,
      _this.panX
    );
    _this.isActive = procs_1.getIsActive(_this.gestureState);
    _this.onSwipeLeftChange = function(_a) {
      var isSwiping = _a[0];
      if (isSwiping) _this.setState({ swipeDirection: OpenDirection.LEFT });
    };
    _this.onSwipeRightChange = function(_a) {
      var isSwiping = _a[0];
      if (isSwiping) _this.setState({ swipeDirection: OpenDirection.RIGHT });
    };
    _this.onIsSwipingChange = function(_a) {
      var isSwiping = _a[0];
      if (!isSwiping) _this.setState({ swipeDirection: OpenDirection.NONE });
    };
    _this.absPosition = abs(_this.animState.position);
    _this.snapPoints = __spreadArrays(
      _this.props.snapPointsLeft.map(function(p) {
        return p * -1;
      }),
      _this.props.snapPointsRight
    )
      .reduce(
        function(acc, cur) {
          if (!acc.includes(cur)) acc.push(cur);
          return acc;
        },
        [0]
      )
      .sort(function(a, b) {
        return a - b;
      })
      .map(function(val, i, arr) {
        return new Value(val);
      });
    _this.midponts = __spreadArrays(
      _this.props.snapPointsLeft.map(function(p) {
        return p * -1;
      }),
      _this.props.snapPointsRight
    )
      .reduce(
        function(acc, cur) {
          if (!acc.includes(cur)) acc.push(cur);
          return acc;
        },
        [0]
      )
      .sort(function(a, b) {
        return a - b;
      })
      .map(function(val, i, arr) {
        var isLast = i == arr.length - 1;
        var mid = isLast ? val : val + (arr[i + 1] - val) / 2;
        return new Value(mid);
      });
    // Approximate where item would end up with velocity taken into account
    _this.velocityModifiedPosition = add(
      _this.animState.position,
      divide(_this.velocity, _this.props.swipeDamping)
    );
    // This beautiful little snippet stolen from
    // https://github.com/osdnk/react-native-reanimated-bottom-sheet/blob/master/src/index.tsx#L364-L373
    _this.currentSnapPoint = (function() {
      var getCurrentSnapPoint = function(i) {
        if (i === void 0) {
          i = 0;
        }
        return i + 1 === _this.snapPoints.length
          ? _this.snapPoints[i]
          : cond(
              lessThan(_this.velocityModifiedPosition, _this.midponts[i]),
              _this.snapPoints[i],
              getCurrentSnapPoint(i + 1)
            );
      };
      // current snap point desired
      return getCurrentSnapPoint();
    })();
    _this.openResolve = tempResolve;
    _this.openLeftFlag = new Value(0);
    _this.openRightFlag = new Value(0);
    _this.open = function(direction, snapPoint) {
      return new Promise(function(resolve) {
        // Make sure any previous promises are resolved before reassignment
        if (_this.openResolve) _this.openResolve();
        _this.openResolve = resolve;
        if (direction === OpenDirection.LEFT) {
          var snapPointsLeft = _this.props.snapPointsLeft;
          var isValid =
            typeof snapPoint === "number" && snapPoint < snapPointsLeft.length;
          var snapTo = isValid
            ? snapPointsLeft[snapPoint]
            : snapPointsLeft[snapPointsLeft.length - 1];
          _this.openLeftFlag.setValue(snapTo);
        } else if (direction === OpenDirection.RIGHT) {
          var snapPointsRight = _this.props.snapPointsRight;
          var isValid =
            typeof snapPoint === "number" && snapPoint < snapPointsRight.length;
          var snapTo = isValid
            ? snapPointsRight[snapPoint]
            : snapPointsRight[snapPointsRight.length - 1];
          _this.openRightFlag.setValue(snapTo);
        }
      });
    };
    _this.closeResolve = tempResolve;
    _this.closeFlag = new Value(0);
    _this.close = function() {
      return new Promise(function(resolve) {
        // Make sure any previous promises are resolved before reassignment
        if (_this.closeResolve) _this.closeResolve();
        _this.closeResolve = resolve;
        _this.closeFlag.setValue(1);
      });
    };
    _this.onOpen = function(snapPoint) {
      if (_this.openResolve) _this.openResolve();
      _this.props.onChange({
        open: _this.state.swipeDirection,
        snapPoint: snapPoint
      });
    };
    _this.onClose = function() {
      if (_this.closeResolve) _this.closeResolve();
      _this.setState({ swipeDirection: null });
      _this.props.onChange({ open: OpenDirection.NONE, snapPoint: 0 });
    };
    _this.maxTranslate = procs_1.getMaxTranslate(
      _this.hasRight,
      _this.rightWidth,
      _this.props.overSwipe
    );
    _this.minTranslate = procs_1.getMinTranslate(
      _this.hasLeft,
      _this.leftWidth,
      _this.props.overSwipe
    );
    _this.onHandlerStateChange = event([
      {
        nativeEvent: function(_a) {
          var state = _a.state;
          return block([set(_this.gestureState, state)]);
        }
      }
    ]);
    _this.tempTranslate = new Value(0);
    _this.onPanEvent = event([
      {
        nativeEvent: function(_a) {
          var translationX = _a.translationX,
            velocityX = _a.velocityX;
          return cond(
            eq(_this.gestureState, react_native_gesture_handler_1.State.ACTIVE),
            [
              set(_this.panX, translationX),
              set(_this.velocity, velocityX),
              set(_this.tempTranslate, add(translationX, _this.prevTranslate)),
              procs_1.getOnPanEvent(
                _this.gestureState,
                _this.tempTranslate,
                _this.maxTranslate,
                _this.minTranslate,
                _this.animState.position
              )
            ]
          );
        }
      }
    ]);
    _this.onAnimationEnd = function(_a) {
      var position = _a[0],
        snapPointRaw = _a[1];
      if (position === 0) {
        _this.onClose();
        _this.setState({ openDirection: OpenDirection.NONE });
      } else {
        _this.onOpen(Math.abs(snapPointRaw));
        _this.setState({
          openDirection: position < 0 ? OpenDirection.LEFT : OpenDirection.RIGHT
        });
      }
    };
    _this.runCode = function() {
      return block([
        cond(neq(_this.openLeftFlag, 0), [
          set(_this.animConfig.toValue, multiply(-1, _this.openLeftFlag)),
          startClock(_this.clock),
          set(_this.openLeftFlag, 0)
        ]),
        cond(neq(_this.openRightFlag, 0), [
          set(_this.animConfig.toValue, _this.openRightFlag),
          startClock(_this.clock),
          set(_this.openRightFlag, 0)
        ]),
        cond(neq(_this.closeFlag, 0), [
          set(_this.animConfig.toValue, 0),
          startClock(_this.clock),
          set(_this.closeFlag, 0)
        ]),
        onChange(
          _this.swipingLeft,
          call([_this.swipingLeft], _this.onSwipeLeftChange)
        ),
        onChange(
          _this.swipingRight,
          call([_this.swipingRight], _this.onSwipeRightChange)
        ),
        // Spring row back into place when user lifts their finger before reaching threshold
        onChange(_this.isActive, [
          cond(and(not(_this.isActive), not(clockRunning(_this.clock))), [
            set(_this.animConfig.toValue, _this.currentSnapPoint),
            set(_this.velocity, 0),
            startClock(_this.clock)
          ])
        ]),
        onChange(
          _this.gestureState,
          cond(
            eq(_this.gestureState, react_native_gesture_handler_1.State.BEGAN),
            [
              cond(clockRunning(_this.clock), stopClock(_this.clock)),
              set(_this.prevTranslate, _this.animState.position)
            ]
          )
        ),
        onChange(
          _this.isSwiping,
          call([_this.isSwiping], _this.onIsSwipingChange)
        ),
        // If the clock is running, increment position in next tick by calling spring()
        cond(clockRunning(_this.clock), [
          procs_1.springFill(_this.clock, _this.animState, _this.animConfig),
          // Stop and reset clock when spring is complete
          cond(_this.animState.finished, [
            stopClock(_this.clock),
            call(
              [_this.animState.position, _this.currentSnapPoint],
              _this.onAnimationEnd
            ),
            set(_this.animState.finished, 0)
          ])
        ])
      ]);
    };
    _this.openLeft = function(snapPoint) {
      return _this.open(OpenDirection.LEFT, snapPoint);
    };
    _this.openRight = function(snapPoint) {
      return _this.open(OpenDirection.RIGHT, snapPoint);
    };
    return _this;
  }
  SwipeableItem.prototype.render = function() {
    var _a = this.props,
      item = _a.item,
      children = _a.children,
      _b = _a.renderOverlay,
      renderOverlay = _b === void 0 ? renderNull : _b,
      _c = _a.renderUnderlayLeft,
      renderUnderlayLeft = _c === void 0 ? renderNull : _c,
      _d = _a.renderUnderlayRight,
      renderUnderlayRight = _d === void 0 ? renderNull : _d,
      snapPointsLeft = _a.snapPointsLeft,
      snapPointsRight = _a.snapPointsRight,
      swipeEnabled = _a.swipeEnabled,
      _e = _a.activationThreshold,
      activationThreshold = _e === void 0 ? 20 : _e;
    var _f = this.state,
      swipeDirection = _f.swipeDirection,
      openDirection = _f.openDirection;
    var hasLeft = !!snapPointsLeft.length;
    var hasRight = !!snapPointsRight.length;
    var activeOffsetL =
      hasLeft || openDirection === OpenDirection.RIGHT
        ? -activationThreshold
        : -Number.MAX_VALUE;
    var activeOffsetR =
      hasRight || openDirection === OpenDirection.LEFT
        ? activationThreshold
        : Number.MAX_VALUE;
    var activeOffsetX = [activeOffsetL, activeOffsetR];
    return react_1.default.createElement(
      react_1.default.Fragment,
      null,
      react_1.default.createElement(
        react_native_reanimated_1.default.View,
        {
          pointerEvents:
            swipeDirection === OpenDirection.LEFT ? "auto" : "none",
          style: [
            styles.underlay,
            { opacity: cond(greaterThan(this.percentOpenLeft, 0), 1, 0) }
          ]
        },
        renderUnderlayLeft({
          item: item,
          percentOpen: this.percentOpenLeft,
          open: this.openLeft,
          close: this.close,
          isGestureActive: this.isActive
        })
      ),
      react_1.default.createElement(
        react_native_reanimated_1.default.View,
        {
          pointerEvents:
            swipeDirection === OpenDirection.RIGHT ? "auto" : "none",
          style: [
            styles.underlay,
            { opacity: cond(greaterThan(this.percentOpenRight, 0), 1, 0) }
          ]
        },
        renderUnderlayRight({
          item: item,
          percentOpen: this.percentOpenRight,
          open: this.openRight,
          close: this.close,
          isGestureActive: this.isActive
        })
      ),
      react_1.default.createElement(
        react_native_gesture_handler_1.PanGestureHandler,
        {
          enabled: swipeEnabled,
          activeOffsetX: activeOffsetX,
          onGestureEvent: this.onPanEvent,
          onHandlerStateChange: this.onHandlerStateChange
        },
        react_1.default.createElement(
          react_native_reanimated_1.default.View,
          {
            style: {
              flex: 1,
              transform: [{ translateX: this.animState.position }]
            }
          },
          react_1.default.createElement(
            react_native_reanimated_1.default.Code,
            { dependencies: [] },
            this.runCode
          ),
          children,
          renderOverlay({
            item: item,
            openLeft: this.openLeft,
            openRight: this.openRight,
            close: this.close,
            openDirection: openDirection
          })
        )
      )
    );
  };
  SwipeableItem.defaultProps = {
    onChange: function() {},
    overSwipe: 20,
    animationConfig: {},
    activationThreshold: 20,
    swipeEnabled: true,
    snapPointsLeft: [],
    snapPointsRight: [],
    swipeDamping: 10
  };
  return SwipeableItem;
})(react_1.default.PureComponent);
exports.default = SwipeableItem;
var styles = react_native_1.StyleSheet.create({
  underlay: __assign({}, react_native_1.StyleSheet.absoluteFillObject)
});

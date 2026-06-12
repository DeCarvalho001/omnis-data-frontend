(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactJsxRuntime_production;
function requireReactJsxRuntime_production() {
  if (hasRequiredReactJsxRuntime_production) return reactJsxRuntime_production;
  hasRequiredReactJsxRuntime_production = 1;
  var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
  function jsxProd(type, config, maybeKey) {
    var key = null;
    void 0 !== maybeKey && (key = "" + maybeKey);
    void 0 !== config.key && (key = "" + config.key);
    if ("key" in config) {
      maybeKey = {};
      for (var propName in config)
        "key" !== propName && (maybeKey[propName] = config[propName]);
    } else maybeKey = config;
    config = maybeKey.ref;
    return {
      $$typeof: REACT_ELEMENT_TYPE,
      type,
      key,
      ref: void 0 !== config ? config : null,
      props: maybeKey
    };
  }
  reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE;
  reactJsxRuntime_production.jsx = jsxProd;
  reactJsxRuntime_production.jsxs = jsxProd;
  return reactJsxRuntime_production;
}
var hasRequiredJsxRuntime;
function requireJsxRuntime() {
  if (hasRequiredJsxRuntime) return jsxRuntime.exports;
  hasRequiredJsxRuntime = 1;
  {
    jsxRuntime.exports = requireReactJsxRuntime_production();
  }
  return jsxRuntime.exports;
}
var jsxRuntimeExports = requireJsxRuntime();
var react = { exports: {} };
var react_production = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReact_production;
function requireReact_production() {
  if (hasRequiredReact_production) return react_production;
  hasRequiredReact_production = 1;
  var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
  function getIteratorFn(maybeIterable) {
    if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
    maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
    return "function" === typeof maybeIterable ? maybeIterable : null;
  }
  var ReactNoopUpdateQueue = {
    isMounted: function() {
      return false;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, assign = Object.assign, emptyObject = {};
  function Component(props, context, updater) {
    this.props = props;
    this.context = context;
    this.refs = emptyObject;
    this.updater = updater || ReactNoopUpdateQueue;
  }
  Component.prototype.isReactComponent = {};
  Component.prototype.setState = function(partialState, callback) {
    if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, partialState, callback, "setState");
  };
  Component.prototype.forceUpdate = function(callback) {
    this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
  };
  function ComponentDummy() {
  }
  ComponentDummy.prototype = Component.prototype;
  function PureComponent(props, context, updater) {
    this.props = props;
    this.context = context;
    this.refs = emptyObject;
    this.updater = updater || ReactNoopUpdateQueue;
  }
  var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
  pureComponentPrototype.constructor = PureComponent;
  assign(pureComponentPrototype, Component.prototype);
  pureComponentPrototype.isPureReactComponent = true;
  var isArrayImpl = Array.isArray;
  function noop() {
  }
  var ReactSharedInternals = { H: null, A: null, T: null, S: null }, hasOwnProperty = Object.prototype.hasOwnProperty;
  function ReactElement(type, key, props) {
    var refProp = props.ref;
    return {
      $$typeof: REACT_ELEMENT_TYPE,
      type,
      key,
      ref: void 0 !== refProp ? refProp : null,
      props
    };
  }
  function cloneAndReplaceKey(oldElement, newKey) {
    return ReactElement(oldElement.type, newKey, oldElement.props);
  }
  function isValidElement(object) {
    return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
  }
  function escape(key) {
    var escaperLookup = { "=": "=0", ":": "=2" };
    return "$" + key.replace(/[=:]/g, function(match) {
      return escaperLookup[match];
    });
  }
  var userProvidedKeyEscapeRegex = /\/+/g;
  function getElementKey(element, index) {
    return "object" === typeof element && null !== element && null != element.key ? escape("" + element.key) : index.toString(36);
  }
  function resolveThenable(thenable) {
    switch (thenable.status) {
      case "fulfilled":
        return thenable.value;
      case "rejected":
        throw thenable.reason;
      default:
        switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(
          function(fulfilledValue) {
            "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
          },
          function(error) {
            "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
          }
        )), thenable.status) {
          case "fulfilled":
            return thenable.value;
          case "rejected":
            throw thenable.reason;
        }
    }
    throw thenable;
  }
  function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
    var type = typeof children;
    if ("undefined" === type || "boolean" === type) children = null;
    var invokeCallback = false;
    if (null === children) invokeCallback = true;
    else
      switch (type) {
        case "bigint":
        case "string":
        case "number":
          invokeCallback = true;
          break;
        case "object":
          switch (children.$$typeof) {
            case REACT_ELEMENT_TYPE:
            case REACT_PORTAL_TYPE:
              invokeCallback = true;
              break;
            case REACT_LAZY_TYPE:
              return invokeCallback = children._init, mapIntoArray(
                invokeCallback(children._payload),
                array,
                escapedPrefix,
                nameSoFar,
                callback
              );
          }
      }
    if (invokeCallback)
      return callback = callback(children), invokeCallback = "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", null != invokeCallback && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
        return c;
      })) : null != callback && (isValidElement(callback) && (callback = cloneAndReplaceKey(
        callback,
        escapedPrefix + (null == callback.key || children && children.key === callback.key ? "" : ("" + callback.key).replace(
          userProvidedKeyEscapeRegex,
          "$&/"
        ) + "/") + invokeCallback
      )), array.push(callback)), 1;
    invokeCallback = 0;
    var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
    if (isArrayImpl(children))
      for (var i = 0; i < children.length; i++)
        nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(
          nameSoFar,
          array,
          escapedPrefix,
          type,
          callback
        );
    else if (i = getIteratorFn(children), "function" === typeof i)
      for (children = i.call(children), i = 0; !(nameSoFar = children.next()).done; )
        nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(
          nameSoFar,
          array,
          escapedPrefix,
          type,
          callback
        );
    else if ("object" === type) {
      if ("function" === typeof children.then)
        return mapIntoArray(
          resolveThenable(children),
          array,
          escapedPrefix,
          nameSoFar,
          callback
        );
      array = String(children);
      throw Error(
        "Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return invokeCallback;
  }
  function mapChildren(children, func, context) {
    if (null == children) return children;
    var result = [], count = 0;
    mapIntoArray(children, result, "", "", function(child) {
      return func.call(context, child, count++);
    });
    return result;
  }
  function lazyInitializer(payload) {
    if (-1 === payload._status) {
      var ctor = payload._result;
      ctor = ctor();
      ctor.then(
        function(moduleObject) {
          if (0 === payload._status || -1 === payload._status)
            payload._status = 1, payload._result = moduleObject;
        },
        function(error) {
          if (0 === payload._status || -1 === payload._status)
            payload._status = 2, payload._result = error;
        }
      );
      -1 === payload._status && (payload._status = 0, payload._result = ctor);
    }
    if (1 === payload._status) return payload._result.default;
    throw payload._result;
  }
  var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
    if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
      var event = new window.ErrorEvent("error", {
        bubbles: true,
        cancelable: true,
        message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
        error
      });
      if (!window.dispatchEvent(event)) return;
    } else if ("object" === typeof process && "function" === typeof process.emit) {
      process.emit("uncaughtException", error);
      return;
    }
    console.error(error);
  }, Children = {
    map: mapChildren,
    forEach: function(children, forEachFunc, forEachContext) {
      mapChildren(
        children,
        function() {
          forEachFunc.apply(this, arguments);
        },
        forEachContext
      );
    },
    count: function(children) {
      var n = 0;
      mapChildren(children, function() {
        n++;
      });
      return n;
    },
    toArray: function(children) {
      return mapChildren(children, function(child) {
        return child;
      }) || [];
    },
    only: function(children) {
      if (!isValidElement(children))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return children;
    }
  };
  react_production.Activity = REACT_ACTIVITY_TYPE;
  react_production.Children = Children;
  react_production.Component = Component;
  react_production.Fragment = REACT_FRAGMENT_TYPE;
  react_production.Profiler = REACT_PROFILER_TYPE;
  react_production.PureComponent = PureComponent;
  react_production.StrictMode = REACT_STRICT_MODE_TYPE;
  react_production.Suspense = REACT_SUSPENSE_TYPE;
  react_production.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
  react_production.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(size) {
      return ReactSharedInternals.H.useMemoCache(size);
    }
  };
  react_production.cache = function(fn) {
    return function() {
      return fn.apply(null, arguments);
    };
  };
  react_production.cacheSignal = function() {
    return null;
  };
  react_production.cloneElement = function(element, config, children) {
    if (null === element || void 0 === element)
      throw Error(
        "The argument must be a React element, but you passed " + element + "."
      );
    var props = assign({}, element.props), key = element.key;
    if (null != config)
      for (propName in void 0 !== config.key && (key = "" + config.key), config)
        !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
    var propName = arguments.length - 2;
    if (1 === propName) props.children = children;
    else if (1 < propName) {
      for (var childArray = Array(propName), i = 0; i < propName; i++)
        childArray[i] = arguments[i + 2];
      props.children = childArray;
    }
    return ReactElement(element.type, key, props);
  };
  react_production.createContext = function(defaultValue) {
    defaultValue = {
      $$typeof: REACT_CONTEXT_TYPE,
      _currentValue: defaultValue,
      _currentValue2: defaultValue,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    };
    defaultValue.Provider = defaultValue;
    defaultValue.Consumer = {
      $$typeof: REACT_CONSUMER_TYPE,
      _context: defaultValue
    };
    return defaultValue;
  };
  react_production.createElement = function(type, config, children) {
    var propName, props = {}, key = null;
    if (null != config)
      for (propName in void 0 !== config.key && (key = "" + config.key), config)
        hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config[propName]);
    var childrenLength = arguments.length - 2;
    if (1 === childrenLength) props.children = children;
    else if (1 < childrenLength) {
      for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++)
        childArray[i] = arguments[i + 2];
      props.children = childArray;
    }
    if (type && type.defaultProps)
      for (propName in childrenLength = type.defaultProps, childrenLength)
        void 0 === props[propName] && (props[propName] = childrenLength[propName]);
    return ReactElement(type, key, props);
  };
  react_production.createRef = function() {
    return { current: null };
  };
  react_production.forwardRef = function(render) {
    return { $$typeof: REACT_FORWARD_REF_TYPE, render };
  };
  react_production.isValidElement = isValidElement;
  react_production.lazy = function(ctor) {
    return {
      $$typeof: REACT_LAZY_TYPE,
      _payload: { _status: -1, _result: ctor },
      _init: lazyInitializer
    };
  };
  react_production.memo = function(type, compare) {
    return {
      $$typeof: REACT_MEMO_TYPE,
      type,
      compare: void 0 === compare ? null : compare
    };
  };
  react_production.startTransition = function(scope) {
    var prevTransition = ReactSharedInternals.T, currentTransition = {};
    ReactSharedInternals.T = currentTransition;
    try {
      var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
      null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
      "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop, reportGlobalError);
    } catch (error) {
      reportGlobalError(error);
    } finally {
      null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
    }
  };
  react_production.unstable_useCacheRefresh = function() {
    return ReactSharedInternals.H.useCacheRefresh();
  };
  react_production.use = function(usable) {
    return ReactSharedInternals.H.use(usable);
  };
  react_production.useActionState = function(action, initialState, permalink) {
    return ReactSharedInternals.H.useActionState(action, initialState, permalink);
  };
  react_production.useCallback = function(callback, deps) {
    return ReactSharedInternals.H.useCallback(callback, deps);
  };
  react_production.useContext = function(Context) {
    return ReactSharedInternals.H.useContext(Context);
  };
  react_production.useDebugValue = function() {
  };
  react_production.useDeferredValue = function(value, initialValue) {
    return ReactSharedInternals.H.useDeferredValue(value, initialValue);
  };
  react_production.useEffect = function(create, deps) {
    return ReactSharedInternals.H.useEffect(create, deps);
  };
  react_production.useEffectEvent = function(callback) {
    return ReactSharedInternals.H.useEffectEvent(callback);
  };
  react_production.useId = function() {
    return ReactSharedInternals.H.useId();
  };
  react_production.useImperativeHandle = function(ref, create, deps) {
    return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
  };
  react_production.useInsertionEffect = function(create, deps) {
    return ReactSharedInternals.H.useInsertionEffect(create, deps);
  };
  react_production.useLayoutEffect = function(create, deps) {
    return ReactSharedInternals.H.useLayoutEffect(create, deps);
  };
  react_production.useMemo = function(create, deps) {
    return ReactSharedInternals.H.useMemo(create, deps);
  };
  react_production.useOptimistic = function(passthrough, reducer) {
    return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
  };
  react_production.useReducer = function(reducer, initialArg, init) {
    return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
  };
  react_production.useRef = function(initialValue) {
    return ReactSharedInternals.H.useRef(initialValue);
  };
  react_production.useState = function(initialState) {
    return ReactSharedInternals.H.useState(initialState);
  };
  react_production.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
    return ReactSharedInternals.H.useSyncExternalStore(
      subscribe,
      getSnapshot,
      getServerSnapshot
    );
  };
  react_production.useTransition = function() {
    return ReactSharedInternals.H.useTransition();
  };
  react_production.version = "19.2.7";
  return react_production;
}
var hasRequiredReact;
function requireReact() {
  if (hasRequiredReact) return react.exports;
  hasRequiredReact = 1;
  {
    react.exports = requireReact_production();
  }
  return react.exports;
}
var reactExports = requireReact();
const React = /* @__PURE__ */ getDefaultExportFromCjs(reactExports);
var client = { exports: {} };
var reactDomClient_production = {};
var scheduler = { exports: {} };
var scheduler_production = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredScheduler_production;
function requireScheduler_production() {
  if (hasRequiredScheduler_production) return scheduler_production;
  hasRequiredScheduler_production = 1;
  (function(exports) {
    function push(heap, node) {
      var index = heap.length;
      heap.push(node);
      a: for (; 0 < index; ) {
        var parentIndex = index - 1 >>> 1, parent = heap[parentIndex];
        if (0 < compare(parent, node))
          heap[parentIndex] = node, heap[index] = parent, index = parentIndex;
        else break a;
      }
    }
    function peek(heap) {
      return 0 === heap.length ? null : heap[0];
    }
    function pop(heap) {
      if (0 === heap.length) return null;
      var first = heap[0], last = heap.pop();
      if (last !== first) {
        heap[0] = last;
        a: for (var index = 0, length = heap.length, halfLength = length >>> 1; index < halfLength; ) {
          var leftIndex = 2 * (index + 1) - 1, left = heap[leftIndex], rightIndex = leftIndex + 1, right = heap[rightIndex];
          if (0 > compare(left, last))
            rightIndex < length && 0 > compare(right, left) ? (heap[index] = right, heap[rightIndex] = last, index = rightIndex) : (heap[index] = left, heap[leftIndex] = last, index = leftIndex);
          else if (rightIndex < length && 0 > compare(right, last))
            heap[index] = right, heap[rightIndex] = last, index = rightIndex;
          else break a;
        }
      }
      return first;
    }
    function compare(a, b) {
      var diff = a.sortIndex - b.sortIndex;
      return 0 !== diff ? diff : a.id - b.id;
    }
    exports.unstable_now = void 0;
    if ("object" === typeof performance && "function" === typeof performance.now) {
      var localPerformance = performance;
      exports.unstable_now = function() {
        return localPerformance.now();
      };
    } else {
      var localDate = Date, initialTime = localDate.now();
      exports.unstable_now = function() {
        return localDate.now() - initialTime;
      };
    }
    var taskQueue = [], timerQueue = [], taskIdCounter = 1, currentTask = null, currentPriorityLevel = 3, isPerformingWork = false, isHostCallbackScheduled = false, isHostTimeoutScheduled = false, needsPaint = false, localSetTimeout = "function" === typeof setTimeout ? setTimeout : null, localClearTimeout = "function" === typeof clearTimeout ? clearTimeout : null, localSetImmediate = "undefined" !== typeof setImmediate ? setImmediate : null;
    function advanceTimers(currentTime) {
      for (var timer = peek(timerQueue); null !== timer; ) {
        if (null === timer.callback) pop(timerQueue);
        else if (timer.startTime <= currentTime)
          pop(timerQueue), timer.sortIndex = timer.expirationTime, push(taskQueue, timer);
        else break;
        timer = peek(timerQueue);
      }
    }
    function handleTimeout(currentTime) {
      isHostTimeoutScheduled = false;
      advanceTimers(currentTime);
      if (!isHostCallbackScheduled)
        if (null !== peek(taskQueue))
          isHostCallbackScheduled = true, isMessageLoopRunning || (isMessageLoopRunning = true, schedulePerformWorkUntilDeadline());
        else {
          var firstTimer = peek(timerQueue);
          null !== firstTimer && requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
        }
    }
    var isMessageLoopRunning = false, taskTimeoutID = -1, frameInterval = 5, startTime = -1;
    function shouldYieldToHost() {
      return needsPaint ? true : exports.unstable_now() - startTime < frameInterval ? false : true;
    }
    function performWorkUntilDeadline() {
      needsPaint = false;
      if (isMessageLoopRunning) {
        var currentTime = exports.unstable_now();
        startTime = currentTime;
        var hasMoreWork = true;
        try {
          a: {
            isHostCallbackScheduled = false;
            isHostTimeoutScheduled && (isHostTimeoutScheduled = false, localClearTimeout(taskTimeoutID), taskTimeoutID = -1);
            isPerformingWork = true;
            var previousPriorityLevel = currentPriorityLevel;
            try {
              b: {
                advanceTimers(currentTime);
                for (currentTask = peek(taskQueue); null !== currentTask && !(currentTask.expirationTime > currentTime && shouldYieldToHost()); ) {
                  var callback = currentTask.callback;
                  if ("function" === typeof callback) {
                    currentTask.callback = null;
                    currentPriorityLevel = currentTask.priorityLevel;
                    var continuationCallback = callback(
                      currentTask.expirationTime <= currentTime
                    );
                    currentTime = exports.unstable_now();
                    if ("function" === typeof continuationCallback) {
                      currentTask.callback = continuationCallback;
                      advanceTimers(currentTime);
                      hasMoreWork = true;
                      break b;
                    }
                    currentTask === peek(taskQueue) && pop(taskQueue);
                    advanceTimers(currentTime);
                  } else pop(taskQueue);
                  currentTask = peek(taskQueue);
                }
                if (null !== currentTask) hasMoreWork = true;
                else {
                  var firstTimer = peek(timerQueue);
                  null !== firstTimer && requestHostTimeout(
                    handleTimeout,
                    firstTimer.startTime - currentTime
                  );
                  hasMoreWork = false;
                }
              }
              break a;
            } finally {
              currentTask = null, currentPriorityLevel = previousPriorityLevel, isPerformingWork = false;
            }
            hasMoreWork = void 0;
          }
        } finally {
          hasMoreWork ? schedulePerformWorkUntilDeadline() : isMessageLoopRunning = false;
        }
      }
    }
    var schedulePerformWorkUntilDeadline;
    if ("function" === typeof localSetImmediate)
      schedulePerformWorkUntilDeadline = function() {
        localSetImmediate(performWorkUntilDeadline);
      };
    else if ("undefined" !== typeof MessageChannel) {
      var channel = new MessageChannel(), port = channel.port2;
      channel.port1.onmessage = performWorkUntilDeadline;
      schedulePerformWorkUntilDeadline = function() {
        port.postMessage(null);
      };
    } else
      schedulePerformWorkUntilDeadline = function() {
        localSetTimeout(performWorkUntilDeadline, 0);
      };
    function requestHostTimeout(callback, ms) {
      taskTimeoutID = localSetTimeout(function() {
        callback(exports.unstable_now());
      }, ms);
    }
    exports.unstable_IdlePriority = 5;
    exports.unstable_ImmediatePriority = 1;
    exports.unstable_LowPriority = 4;
    exports.unstable_NormalPriority = 3;
    exports.unstable_Profiling = null;
    exports.unstable_UserBlockingPriority = 2;
    exports.unstable_cancelCallback = function(task) {
      task.callback = null;
    };
    exports.unstable_forceFrameRate = function(fps) {
      0 > fps || 125 < fps ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : frameInterval = 0 < fps ? Math.floor(1e3 / fps) : 5;
    };
    exports.unstable_getCurrentPriorityLevel = function() {
      return currentPriorityLevel;
    };
    exports.unstable_next = function(eventHandler) {
      switch (currentPriorityLevel) {
        case 1:
        case 2:
        case 3:
          var priorityLevel = 3;
          break;
        default:
          priorityLevel = currentPriorityLevel;
      }
      var previousPriorityLevel = currentPriorityLevel;
      currentPriorityLevel = priorityLevel;
      try {
        return eventHandler();
      } finally {
        currentPriorityLevel = previousPriorityLevel;
      }
    };
    exports.unstable_requestPaint = function() {
      needsPaint = true;
    };
    exports.unstable_runWithPriority = function(priorityLevel, eventHandler) {
      switch (priorityLevel) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          priorityLevel = 3;
      }
      var previousPriorityLevel = currentPriorityLevel;
      currentPriorityLevel = priorityLevel;
      try {
        return eventHandler();
      } finally {
        currentPriorityLevel = previousPriorityLevel;
      }
    };
    exports.unstable_scheduleCallback = function(priorityLevel, callback, options) {
      var currentTime = exports.unstable_now();
      "object" === typeof options && null !== options ? (options = options.delay, options = "number" === typeof options && 0 < options ? currentTime + options : currentTime) : options = currentTime;
      switch (priorityLevel) {
        case 1:
          var timeout = -1;
          break;
        case 2:
          timeout = 250;
          break;
        case 5:
          timeout = 1073741823;
          break;
        case 4:
          timeout = 1e4;
          break;
        default:
          timeout = 5e3;
      }
      timeout = options + timeout;
      priorityLevel = {
        id: taskIdCounter++,
        callback,
        priorityLevel,
        startTime: options,
        expirationTime: timeout,
        sortIndex: -1
      };
      options > currentTime ? (priorityLevel.sortIndex = options, push(timerQueue, priorityLevel), null === peek(taskQueue) && priorityLevel === peek(timerQueue) && (isHostTimeoutScheduled ? (localClearTimeout(taskTimeoutID), taskTimeoutID = -1) : isHostTimeoutScheduled = true, requestHostTimeout(handleTimeout, options - currentTime))) : (priorityLevel.sortIndex = timeout, push(taskQueue, priorityLevel), isHostCallbackScheduled || isPerformingWork || (isHostCallbackScheduled = true, isMessageLoopRunning || (isMessageLoopRunning = true, schedulePerformWorkUntilDeadline())));
      return priorityLevel;
    };
    exports.unstable_shouldYield = shouldYieldToHost;
    exports.unstable_wrapCallback = function(callback) {
      var parentPriorityLevel = currentPriorityLevel;
      return function() {
        var previousPriorityLevel = currentPriorityLevel;
        currentPriorityLevel = parentPriorityLevel;
        try {
          return callback.apply(this, arguments);
        } finally {
          currentPriorityLevel = previousPriorityLevel;
        }
      };
    };
  })(scheduler_production);
  return scheduler_production;
}
var hasRequiredScheduler;
function requireScheduler() {
  if (hasRequiredScheduler) return scheduler.exports;
  hasRequiredScheduler = 1;
  {
    scheduler.exports = requireScheduler_production();
  }
  return scheduler.exports;
}
var reactDom = { exports: {} };
var reactDom_production = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactDom_production;
function requireReactDom_production() {
  if (hasRequiredReactDom_production) return reactDom_production;
  hasRequiredReactDom_production = 1;
  var React2 = requireReact();
  function formatProdErrorMessage(code) {
    var url = "https://react.dev/errors/" + code;
    if (1 < arguments.length) {
      url += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var i = 2; i < arguments.length; i++)
        url += "&args[]=" + encodeURIComponent(arguments[i]);
    }
    return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function noop() {
  }
  var Internals = {
    d: {
      f: noop,
      r: function() {
        throw Error(formatProdErrorMessage(522));
      },
      D: noop,
      C: noop,
      L: noop,
      m: noop,
      X: noop,
      S: noop,
      M: noop
    },
    p: 0,
    findDOMNode: null
  }, REACT_PORTAL_TYPE = Symbol.for("react.portal");
  function createPortal$1(children, containerInfo, implementation) {
    var key = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
    return {
      $$typeof: REACT_PORTAL_TYPE,
      key: null == key ? null : "" + key,
      children,
      containerInfo,
      implementation
    };
  }
  var ReactSharedInternals = React2.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function getCrossOriginStringAs(as, input) {
    if ("font" === as) return "";
    if ("string" === typeof input)
      return "use-credentials" === input ? input : "";
  }
  reactDom_production.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals;
  reactDom_production.createPortal = function(children, container) {
    var key = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
    if (!container || 1 !== container.nodeType && 9 !== container.nodeType && 11 !== container.nodeType)
      throw Error(formatProdErrorMessage(299));
    return createPortal$1(children, container, null, key);
  };
  reactDom_production.flushSync = function(fn) {
    var previousTransition = ReactSharedInternals.T, previousUpdatePriority = Internals.p;
    try {
      if (ReactSharedInternals.T = null, Internals.p = 2, fn) return fn();
    } finally {
      ReactSharedInternals.T = previousTransition, Internals.p = previousUpdatePriority, Internals.d.f();
    }
  };
  reactDom_production.preconnect = function(href, options) {
    "string" === typeof href && (options ? (options = options.crossOrigin, options = "string" === typeof options ? "use-credentials" === options ? options : "" : void 0) : options = null, Internals.d.C(href, options));
  };
  reactDom_production.prefetchDNS = function(href) {
    "string" === typeof href && Internals.d.D(href);
  };
  reactDom_production.preinit = function(href, options) {
    if ("string" === typeof href && options && "string" === typeof options.as) {
      var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin), integrity = "string" === typeof options.integrity ? options.integrity : void 0, fetchPriority = "string" === typeof options.fetchPriority ? options.fetchPriority : void 0;
      "style" === as ? Internals.d.S(
        href,
        "string" === typeof options.precedence ? options.precedence : void 0,
        {
          crossOrigin,
          integrity,
          fetchPriority
        }
      ) : "script" === as && Internals.d.X(href, {
        crossOrigin,
        integrity,
        fetchPriority,
        nonce: "string" === typeof options.nonce ? options.nonce : void 0
      });
    }
  };
  reactDom_production.preinitModule = function(href, options) {
    if ("string" === typeof href)
      if ("object" === typeof options && null !== options) {
        if (null == options.as || "script" === options.as) {
          var crossOrigin = getCrossOriginStringAs(
            options.as,
            options.crossOrigin
          );
          Internals.d.M(href, {
            crossOrigin,
            integrity: "string" === typeof options.integrity ? options.integrity : void 0,
            nonce: "string" === typeof options.nonce ? options.nonce : void 0
          });
        }
      } else null == options && Internals.d.M(href);
  };
  reactDom_production.preload = function(href, options) {
    if ("string" === typeof href && "object" === typeof options && null !== options && "string" === typeof options.as) {
      var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin);
      Internals.d.L(href, as, {
        crossOrigin,
        integrity: "string" === typeof options.integrity ? options.integrity : void 0,
        nonce: "string" === typeof options.nonce ? options.nonce : void 0,
        type: "string" === typeof options.type ? options.type : void 0,
        fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0,
        referrerPolicy: "string" === typeof options.referrerPolicy ? options.referrerPolicy : void 0,
        imageSrcSet: "string" === typeof options.imageSrcSet ? options.imageSrcSet : void 0,
        imageSizes: "string" === typeof options.imageSizes ? options.imageSizes : void 0,
        media: "string" === typeof options.media ? options.media : void 0
      });
    }
  };
  reactDom_production.preloadModule = function(href, options) {
    if ("string" === typeof href)
      if (options) {
        var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
        Internals.d.m(href, {
          as: "string" === typeof options.as && "script" !== options.as ? options.as : void 0,
          crossOrigin,
          integrity: "string" === typeof options.integrity ? options.integrity : void 0
        });
      } else Internals.d.m(href);
  };
  reactDom_production.requestFormReset = function(form) {
    Internals.d.r(form);
  };
  reactDom_production.unstable_batchedUpdates = function(fn, a) {
    return fn(a);
  };
  reactDom_production.useFormState = function(action, initialState, permalink) {
    return ReactSharedInternals.H.useFormState(action, initialState, permalink);
  };
  reactDom_production.useFormStatus = function() {
    return ReactSharedInternals.H.useHostTransitionStatus();
  };
  reactDom_production.version = "19.2.7";
  return reactDom_production;
}
var hasRequiredReactDom;
function requireReactDom() {
  if (hasRequiredReactDom) return reactDom.exports;
  hasRequiredReactDom = 1;
  function checkDCE() {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
      return;
    }
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
    } catch (err) {
      console.error(err);
    }
  }
  {
    checkDCE();
    reactDom.exports = requireReactDom_production();
  }
  return reactDom.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactDomClient_production;
function requireReactDomClient_production() {
  if (hasRequiredReactDomClient_production) return reactDomClient_production;
  hasRequiredReactDomClient_production = 1;
  var Scheduler = requireScheduler(), React2 = requireReact(), ReactDOM2 = requireReactDom();
  function formatProdErrorMessage(code) {
    var url = "https://react.dev/errors/" + code;
    if (1 < arguments.length) {
      url += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var i = 2; i < arguments.length; i++)
        url += "&args[]=" + encodeURIComponent(arguments[i]);
    }
    return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function isValidContainer(node) {
    return !(!node || 1 !== node.nodeType && 9 !== node.nodeType && 11 !== node.nodeType);
  }
  function getNearestMountedFiber(fiber) {
    var node = fiber, nearestMounted = fiber;
    if (fiber.alternate) for (; node.return; ) node = node.return;
    else {
      fiber = node;
      do
        node = fiber, 0 !== (node.flags & 4098) && (nearestMounted = node.return), fiber = node.return;
      while (fiber);
    }
    return 3 === node.tag ? nearestMounted : null;
  }
  function getSuspenseInstanceFromFiber(fiber) {
    if (13 === fiber.tag) {
      var suspenseState = fiber.memoizedState;
      null === suspenseState && (fiber = fiber.alternate, null !== fiber && (suspenseState = fiber.memoizedState));
      if (null !== suspenseState) return suspenseState.dehydrated;
    }
    return null;
  }
  function getActivityInstanceFromFiber(fiber) {
    if (31 === fiber.tag) {
      var activityState = fiber.memoizedState;
      null === activityState && (fiber = fiber.alternate, null !== fiber && (activityState = fiber.memoizedState));
      if (null !== activityState) return activityState.dehydrated;
    }
    return null;
  }
  function assertIsMounted(fiber) {
    if (getNearestMountedFiber(fiber) !== fiber)
      throw Error(formatProdErrorMessage(188));
  }
  function findCurrentFiberUsingSlowPath(fiber) {
    var alternate = fiber.alternate;
    if (!alternate) {
      alternate = getNearestMountedFiber(fiber);
      if (null === alternate) throw Error(formatProdErrorMessage(188));
      return alternate !== fiber ? null : fiber;
    }
    for (var a = fiber, b = alternate; ; ) {
      var parentA = a.return;
      if (null === parentA) break;
      var parentB = parentA.alternate;
      if (null === parentB) {
        b = parentA.return;
        if (null !== b) {
          a = b;
          continue;
        }
        break;
      }
      if (parentA.child === parentB.child) {
        for (parentB = parentA.child; parentB; ) {
          if (parentB === a) return assertIsMounted(parentA), fiber;
          if (parentB === b) return assertIsMounted(parentA), alternate;
          parentB = parentB.sibling;
        }
        throw Error(formatProdErrorMessage(188));
      }
      if (a.return !== b.return) a = parentA, b = parentB;
      else {
        for (var didFindChild = false, child$0 = parentA.child; child$0; ) {
          if (child$0 === a) {
            didFindChild = true;
            a = parentA;
            b = parentB;
            break;
          }
          if (child$0 === b) {
            didFindChild = true;
            b = parentA;
            a = parentB;
            break;
          }
          child$0 = child$0.sibling;
        }
        if (!didFindChild) {
          for (child$0 = parentB.child; child$0; ) {
            if (child$0 === a) {
              didFindChild = true;
              a = parentB;
              b = parentA;
              break;
            }
            if (child$0 === b) {
              didFindChild = true;
              b = parentB;
              a = parentA;
              break;
            }
            child$0 = child$0.sibling;
          }
          if (!didFindChild) throw Error(formatProdErrorMessage(189));
        }
      }
      if (a.alternate !== b) throw Error(formatProdErrorMessage(190));
    }
    if (3 !== a.tag) throw Error(formatProdErrorMessage(188));
    return a.stateNode.current === a ? fiber : alternate;
  }
  function findCurrentHostFiberImpl(node) {
    var tag = node.tag;
    if (5 === tag || 26 === tag || 27 === tag || 6 === tag) return node;
    for (node = node.child; null !== node; ) {
      tag = findCurrentHostFiberImpl(node);
      if (null !== tag) return tag;
      node = node.sibling;
    }
    return null;
  }
  var assign = Object.assign, REACT_LEGACY_ELEMENT_TYPE = Symbol.for("react.element"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy");
  var REACT_ACTIVITY_TYPE = Symbol.for("react.activity");
  var REACT_MEMO_CACHE_SENTINEL = Symbol.for("react.memo_cache_sentinel");
  var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
  function getIteratorFn(maybeIterable) {
    if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
    maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
    return "function" === typeof maybeIterable ? maybeIterable : null;
  }
  var REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference");
  function getComponentNameFromType(type) {
    if (null == type) return null;
    if ("function" === typeof type)
      return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
    if ("string" === typeof type) return type;
    switch (type) {
      case REACT_FRAGMENT_TYPE:
        return "Fragment";
      case REACT_PROFILER_TYPE:
        return "Profiler";
      case REACT_STRICT_MODE_TYPE:
        return "StrictMode";
      case REACT_SUSPENSE_TYPE:
        return "Suspense";
      case REACT_SUSPENSE_LIST_TYPE:
        return "SuspenseList";
      case REACT_ACTIVITY_TYPE:
        return "Activity";
    }
    if ("object" === typeof type)
      switch (type.$$typeof) {
        case REACT_PORTAL_TYPE:
          return "Portal";
        case REACT_CONTEXT_TYPE:
          return type.displayName || "Context";
        case REACT_CONSUMER_TYPE:
          return (type._context.displayName || "Context") + ".Consumer";
        case REACT_FORWARD_REF_TYPE:
          var innerType = type.render;
          type = type.displayName;
          type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
          return type;
        case REACT_MEMO_TYPE:
          return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
        case REACT_LAZY_TYPE:
          innerType = type._payload;
          type = type._init;
          try {
            return getComponentNameFromType(type(innerType));
          } catch (x) {
          }
      }
    return null;
  }
  var isArrayImpl = Array.isArray, ReactSharedInternals = React2.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ReactDOMSharedInternals = ReactDOM2.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, sharedNotPendingObject = {
    pending: false,
    data: null,
    method: null,
    action: null
  }, valueStack = [], index = -1;
  function createCursor(defaultValue) {
    return { current: defaultValue };
  }
  function pop(cursor) {
    0 > index || (cursor.current = valueStack[index], valueStack[index] = null, index--);
  }
  function push(cursor, value) {
    index++;
    valueStack[index] = cursor.current;
    cursor.current = value;
  }
  var contextStackCursor = createCursor(null), contextFiberStackCursor = createCursor(null), rootInstanceStackCursor = createCursor(null), hostTransitionProviderCursor = createCursor(null);
  function pushHostContainer(fiber, nextRootInstance) {
    push(rootInstanceStackCursor, nextRootInstance);
    push(contextFiberStackCursor, fiber);
    push(contextStackCursor, null);
    switch (nextRootInstance.nodeType) {
      case 9:
      case 11:
        fiber = (fiber = nextRootInstance.documentElement) ? (fiber = fiber.namespaceURI) ? getOwnHostContext(fiber) : 0 : 0;
        break;
      default:
        if (fiber = nextRootInstance.tagName, nextRootInstance = nextRootInstance.namespaceURI)
          nextRootInstance = getOwnHostContext(nextRootInstance), fiber = getChildHostContextProd(nextRootInstance, fiber);
        else
          switch (fiber) {
            case "svg":
              fiber = 1;
              break;
            case "math":
              fiber = 2;
              break;
            default:
              fiber = 0;
          }
    }
    pop(contextStackCursor);
    push(contextStackCursor, fiber);
  }
  function popHostContainer() {
    pop(contextStackCursor);
    pop(contextFiberStackCursor);
    pop(rootInstanceStackCursor);
  }
  function pushHostContext(fiber) {
    null !== fiber.memoizedState && push(hostTransitionProviderCursor, fiber);
    var context = contextStackCursor.current;
    var JSCompiler_inline_result = getChildHostContextProd(context, fiber.type);
    context !== JSCompiler_inline_result && (push(contextFiberStackCursor, fiber), push(contextStackCursor, JSCompiler_inline_result));
  }
  function popHostContext(fiber) {
    contextFiberStackCursor.current === fiber && (pop(contextStackCursor), pop(contextFiberStackCursor));
    hostTransitionProviderCursor.current === fiber && (pop(hostTransitionProviderCursor), HostTransitionContext._currentValue = sharedNotPendingObject);
  }
  var prefix, suffix;
  function describeBuiltInComponentFrame(name) {
    if (void 0 === prefix)
      try {
        throw Error();
      } catch (x) {
        var match = x.stack.trim().match(/\n( *(at )?)/);
        prefix = match && match[1] || "";
        suffix = -1 < x.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < x.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return "\n" + prefix + name + suffix;
  }
  var reentry = false;
  function describeNativeComponentFrame(fn, construct) {
    if (!fn || reentry) return "";
    reentry = true;
    var previousPrepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var RunInRootFrame = {
        DetermineComponentFrameRoot: function() {
          try {
            if (construct) {
              var Fake = function() {
                throw Error();
              };
              Object.defineProperty(Fake.prototype, "props", {
                set: function() {
                  throw Error();
                }
              });
              if ("object" === typeof Reflect && Reflect.construct) {
                try {
                  Reflect.construct(Fake, []);
                } catch (x) {
                  var control = x;
                }
                Reflect.construct(fn, [], Fake);
              } else {
                try {
                  Fake.call();
                } catch (x$1) {
                  control = x$1;
                }
                fn.call(Fake.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (x$2) {
                control = x$2;
              }
              (Fake = fn()) && "function" === typeof Fake.catch && Fake.catch(function() {
              });
            }
          } catch (sample) {
            if (sample && control && "string" === typeof sample.stack)
              return [sample.stack, control.stack];
          }
          return [null, null];
        }
      };
      RunInRootFrame.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var namePropDescriptor = Object.getOwnPropertyDescriptor(
        RunInRootFrame.DetermineComponentFrameRoot,
        "name"
      );
      namePropDescriptor && namePropDescriptor.configurable && Object.defineProperty(
        RunInRootFrame.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var _RunInRootFrame$Deter = RunInRootFrame.DetermineComponentFrameRoot(), sampleStack = _RunInRootFrame$Deter[0], controlStack = _RunInRootFrame$Deter[1];
      if (sampleStack && controlStack) {
        var sampleLines = sampleStack.split("\n"), controlLines = controlStack.split("\n");
        for (namePropDescriptor = RunInRootFrame = 0; RunInRootFrame < sampleLines.length && !sampleLines[RunInRootFrame].includes("DetermineComponentFrameRoot"); )
          RunInRootFrame++;
        for (; namePropDescriptor < controlLines.length && !controlLines[namePropDescriptor].includes(
          "DetermineComponentFrameRoot"
        ); )
          namePropDescriptor++;
        if (RunInRootFrame === sampleLines.length || namePropDescriptor === controlLines.length)
          for (RunInRootFrame = sampleLines.length - 1, namePropDescriptor = controlLines.length - 1; 1 <= RunInRootFrame && 0 <= namePropDescriptor && sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]; )
            namePropDescriptor--;
        for (; 1 <= RunInRootFrame && 0 <= namePropDescriptor; RunInRootFrame--, namePropDescriptor--)
          if (sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
            if (1 !== RunInRootFrame || 1 !== namePropDescriptor) {
              do
                if (RunInRootFrame--, namePropDescriptor--, 0 > namePropDescriptor || sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
                  var frame = "\n" + sampleLines[RunInRootFrame].replace(" at new ", " at ");
                  fn.displayName && frame.includes("<anonymous>") && (frame = frame.replace("<anonymous>", fn.displayName));
                  return frame;
                }
              while (1 <= RunInRootFrame && 0 <= namePropDescriptor);
            }
            break;
          }
      }
    } finally {
      reentry = false, Error.prepareStackTrace = previousPrepareStackTrace;
    }
    return (previousPrepareStackTrace = fn ? fn.displayName || fn.name : "") ? describeBuiltInComponentFrame(previousPrepareStackTrace) : "";
  }
  function describeFiber(fiber, childFiber) {
    switch (fiber.tag) {
      case 26:
      case 27:
      case 5:
        return describeBuiltInComponentFrame(fiber.type);
      case 16:
        return describeBuiltInComponentFrame("Lazy");
      case 13:
        return fiber.child !== childFiber && null !== childFiber ? describeBuiltInComponentFrame("Suspense Fallback") : describeBuiltInComponentFrame("Suspense");
      case 19:
        return describeBuiltInComponentFrame("SuspenseList");
      case 0:
      case 15:
        return describeNativeComponentFrame(fiber.type, false);
      case 11:
        return describeNativeComponentFrame(fiber.type.render, false);
      case 1:
        return describeNativeComponentFrame(fiber.type, true);
      case 31:
        return describeBuiltInComponentFrame("Activity");
      default:
        return "";
    }
  }
  function getStackByFiberInDevAndProd(workInProgress2) {
    try {
      var info = "", previous = null;
      do
        info += describeFiber(workInProgress2, previous), previous = workInProgress2, workInProgress2 = workInProgress2.return;
      while (workInProgress2);
      return info;
    } catch (x) {
      return "\nError generating stack: " + x.message + "\n" + x.stack;
    }
  }
  var hasOwnProperty = Object.prototype.hasOwnProperty, scheduleCallback$3 = Scheduler.unstable_scheduleCallback, cancelCallback$1 = Scheduler.unstable_cancelCallback, shouldYield = Scheduler.unstable_shouldYield, requestPaint = Scheduler.unstable_requestPaint, now = Scheduler.unstable_now, getCurrentPriorityLevel = Scheduler.unstable_getCurrentPriorityLevel, ImmediatePriority = Scheduler.unstable_ImmediatePriority, UserBlockingPriority = Scheduler.unstable_UserBlockingPriority, NormalPriority$1 = Scheduler.unstable_NormalPriority, LowPriority = Scheduler.unstable_LowPriority, IdlePriority = Scheduler.unstable_IdlePriority, log$1 = Scheduler.log, unstable_setDisableYieldValue = Scheduler.unstable_setDisableYieldValue, rendererID = null, injectedHook = null;
  function setIsStrictModeForDevtools(newIsStrictMode) {
    "function" === typeof log$1 && unstable_setDisableYieldValue(newIsStrictMode);
    if (injectedHook && "function" === typeof injectedHook.setStrictMode)
      try {
        injectedHook.setStrictMode(rendererID, newIsStrictMode);
      } catch (err) {
      }
  }
  var clz32 = Math.clz32 ? Math.clz32 : clz32Fallback, log = Math.log, LN2 = Math.LN2;
  function clz32Fallback(x) {
    x >>>= 0;
    return 0 === x ? 32 : 31 - (log(x) / LN2 | 0) | 0;
  }
  var nextTransitionUpdateLane = 256, nextTransitionDeferredLane = 262144, nextRetryLane = 4194304;
  function getHighestPriorityLanes(lanes) {
    var pendingSyncLanes = lanes & 42;
    if (0 !== pendingSyncLanes) return pendingSyncLanes;
    switch (lanes & -lanes) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return lanes & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return lanes & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return lanes & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return lanes;
    }
  }
  function getNextLanes(root2, wipLanes, rootHasPendingCommit) {
    var pendingLanes = root2.pendingLanes;
    if (0 === pendingLanes) return 0;
    var nextLanes = 0, suspendedLanes = root2.suspendedLanes, pingedLanes = root2.pingedLanes;
    root2 = root2.warmLanes;
    var nonIdlePendingLanes = pendingLanes & 134217727;
    0 !== nonIdlePendingLanes ? (pendingLanes = nonIdlePendingLanes & ~suspendedLanes, 0 !== pendingLanes ? nextLanes = getHighestPriorityLanes(pendingLanes) : (pingedLanes &= nonIdlePendingLanes, 0 !== pingedLanes ? nextLanes = getHighestPriorityLanes(pingedLanes) : rootHasPendingCommit || (rootHasPendingCommit = nonIdlePendingLanes & ~root2, 0 !== rootHasPendingCommit && (nextLanes = getHighestPriorityLanes(rootHasPendingCommit))))) : (nonIdlePendingLanes = pendingLanes & ~suspendedLanes, 0 !== nonIdlePendingLanes ? nextLanes = getHighestPriorityLanes(nonIdlePendingLanes) : 0 !== pingedLanes ? nextLanes = getHighestPriorityLanes(pingedLanes) : rootHasPendingCommit || (rootHasPendingCommit = pendingLanes & ~root2, 0 !== rootHasPendingCommit && (nextLanes = getHighestPriorityLanes(rootHasPendingCommit))));
    return 0 === nextLanes ? 0 : 0 !== wipLanes && wipLanes !== nextLanes && 0 === (wipLanes & suspendedLanes) && (suspendedLanes = nextLanes & -nextLanes, rootHasPendingCommit = wipLanes & -wipLanes, suspendedLanes >= rootHasPendingCommit || 32 === suspendedLanes && 0 !== (rootHasPendingCommit & 4194048)) ? wipLanes : nextLanes;
  }
  function checkIfRootIsPrerendering(root2, renderLanes2) {
    return 0 === (root2.pendingLanes & ~(root2.suspendedLanes & ~root2.pingedLanes) & renderLanes2);
  }
  function computeExpirationTime(lane, currentTime) {
    switch (lane) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return currentTime + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return currentTime + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function claimNextRetryLane() {
    var lane = nextRetryLane;
    nextRetryLane <<= 1;
    0 === (nextRetryLane & 62914560) && (nextRetryLane = 4194304);
    return lane;
  }
  function createLaneMap(initial) {
    for (var laneMap = [], i = 0; 31 > i; i++) laneMap.push(initial);
    return laneMap;
  }
  function markRootUpdated$1(root2, updateLane) {
    root2.pendingLanes |= updateLane;
    268435456 !== updateLane && (root2.suspendedLanes = 0, root2.pingedLanes = 0, root2.warmLanes = 0);
  }
  function markRootFinished(root2, finishedLanes, remainingLanes, spawnedLane, updatedLanes, suspendedRetryLanes) {
    var previouslyPendingLanes = root2.pendingLanes;
    root2.pendingLanes = remainingLanes;
    root2.suspendedLanes = 0;
    root2.pingedLanes = 0;
    root2.warmLanes = 0;
    root2.expiredLanes &= remainingLanes;
    root2.entangledLanes &= remainingLanes;
    root2.errorRecoveryDisabledLanes &= remainingLanes;
    root2.shellSuspendCounter = 0;
    var entanglements = root2.entanglements, expirationTimes = root2.expirationTimes, hiddenUpdates = root2.hiddenUpdates;
    for (remainingLanes = previouslyPendingLanes & ~remainingLanes; 0 < remainingLanes; ) {
      var index$7 = 31 - clz32(remainingLanes), lane = 1 << index$7;
      entanglements[index$7] = 0;
      expirationTimes[index$7] = -1;
      var hiddenUpdatesForLane = hiddenUpdates[index$7];
      if (null !== hiddenUpdatesForLane)
        for (hiddenUpdates[index$7] = null, index$7 = 0; index$7 < hiddenUpdatesForLane.length; index$7++) {
          var update = hiddenUpdatesForLane[index$7];
          null !== update && (update.lane &= -536870913);
        }
      remainingLanes &= ~lane;
    }
    0 !== spawnedLane && markSpawnedDeferredLane(root2, spawnedLane, 0);
    0 !== suspendedRetryLanes && 0 === updatedLanes && 0 !== root2.tag && (root2.suspendedLanes |= suspendedRetryLanes & ~(previouslyPendingLanes & ~finishedLanes));
  }
  function markSpawnedDeferredLane(root2, spawnedLane, entangledLanes) {
    root2.pendingLanes |= spawnedLane;
    root2.suspendedLanes &= ~spawnedLane;
    var spawnedLaneIndex = 31 - clz32(spawnedLane);
    root2.entangledLanes |= spawnedLane;
    root2.entanglements[spawnedLaneIndex] = root2.entanglements[spawnedLaneIndex] | 1073741824 | entangledLanes & 261930;
  }
  function markRootEntangled(root2, entangledLanes) {
    var rootEntangledLanes = root2.entangledLanes |= entangledLanes;
    for (root2 = root2.entanglements; rootEntangledLanes; ) {
      var index$8 = 31 - clz32(rootEntangledLanes), lane = 1 << index$8;
      lane & entangledLanes | root2[index$8] & entangledLanes && (root2[index$8] |= entangledLanes);
      rootEntangledLanes &= ~lane;
    }
  }
  function getBumpedLaneForHydration(root2, renderLanes2) {
    var renderLane = renderLanes2 & -renderLanes2;
    renderLane = 0 !== (renderLane & 42) ? 1 : getBumpedLaneForHydrationByLane(renderLane);
    return 0 !== (renderLane & (root2.suspendedLanes | renderLanes2)) ? 0 : renderLane;
  }
  function getBumpedLaneForHydrationByLane(lane) {
    switch (lane) {
      case 2:
        lane = 1;
        break;
      case 8:
        lane = 4;
        break;
      case 32:
        lane = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        lane = 128;
        break;
      case 268435456:
        lane = 134217728;
        break;
      default:
        lane = 0;
    }
    return lane;
  }
  function lanesToEventPriority(lanes) {
    lanes &= -lanes;
    return 2 < lanes ? 8 < lanes ? 0 !== (lanes & 134217727) ? 32 : 268435456 : 8 : 2;
  }
  function resolveUpdatePriority() {
    var updatePriority = ReactDOMSharedInternals.p;
    if (0 !== updatePriority) return updatePriority;
    updatePriority = window.event;
    return void 0 === updatePriority ? 32 : getEventPriority(updatePriority.type);
  }
  function runWithPriority(priority, fn) {
    var previousPriority = ReactDOMSharedInternals.p;
    try {
      return ReactDOMSharedInternals.p = priority, fn();
    } finally {
      ReactDOMSharedInternals.p = previousPriority;
    }
  }
  var randomKey = Math.random().toString(36).slice(2), internalInstanceKey = "__reactFiber$" + randomKey, internalPropsKey = "__reactProps$" + randomKey, internalContainerInstanceKey = "__reactContainer$" + randomKey, internalEventHandlersKey = "__reactEvents$" + randomKey, internalEventHandlerListenersKey = "__reactListeners$" + randomKey, internalEventHandlesSetKey = "__reactHandles$" + randomKey, internalRootNodeResourcesKey = "__reactResources$" + randomKey, internalHoistableMarker = "__reactMarker$" + randomKey;
  function detachDeletedInstance(node) {
    delete node[internalInstanceKey];
    delete node[internalPropsKey];
    delete node[internalEventHandlersKey];
    delete node[internalEventHandlerListenersKey];
    delete node[internalEventHandlesSetKey];
  }
  function getClosestInstanceFromNode(targetNode) {
    var targetInst = targetNode[internalInstanceKey];
    if (targetInst) return targetInst;
    for (var parentNode = targetNode.parentNode; parentNode; ) {
      if (targetInst = parentNode[internalContainerInstanceKey] || parentNode[internalInstanceKey]) {
        parentNode = targetInst.alternate;
        if (null !== targetInst.child || null !== parentNode && null !== parentNode.child)
          for (targetNode = getParentHydrationBoundary(targetNode); null !== targetNode; ) {
            if (parentNode = targetNode[internalInstanceKey]) return parentNode;
            targetNode = getParentHydrationBoundary(targetNode);
          }
        return targetInst;
      }
      targetNode = parentNode;
      parentNode = targetNode.parentNode;
    }
    return null;
  }
  function getInstanceFromNode(node) {
    if (node = node[internalInstanceKey] || node[internalContainerInstanceKey]) {
      var tag = node.tag;
      if (5 === tag || 6 === tag || 13 === tag || 31 === tag || 26 === tag || 27 === tag || 3 === tag)
        return node;
    }
    return null;
  }
  function getNodeFromInstance(inst) {
    var tag = inst.tag;
    if (5 === tag || 26 === tag || 27 === tag || 6 === tag) return inst.stateNode;
    throw Error(formatProdErrorMessage(33));
  }
  function getResourcesFromRoot(root2) {
    var resources = root2[internalRootNodeResourcesKey];
    resources || (resources = root2[internalRootNodeResourcesKey] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() });
    return resources;
  }
  function markNodeAsHoistable(node) {
    node[internalHoistableMarker] = true;
  }
  var allNativeEvents = /* @__PURE__ */ new Set(), registrationNameDependencies = {};
  function registerTwoPhaseEvent(registrationName, dependencies) {
    registerDirectEvent(registrationName, dependencies);
    registerDirectEvent(registrationName + "Capture", dependencies);
  }
  function registerDirectEvent(registrationName, dependencies) {
    registrationNameDependencies[registrationName] = dependencies;
    for (registrationName = 0; registrationName < dependencies.length; registrationName++)
      allNativeEvents.add(dependencies[registrationName]);
  }
  var VALID_ATTRIBUTE_NAME_REGEX = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), illegalAttributeNameCache = {}, validatedAttributeNameCache = {};
  function isAttributeNameSafe(attributeName) {
    if (hasOwnProperty.call(validatedAttributeNameCache, attributeName))
      return true;
    if (hasOwnProperty.call(illegalAttributeNameCache, attributeName)) return false;
    if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName))
      return validatedAttributeNameCache[attributeName] = true;
    illegalAttributeNameCache[attributeName] = true;
    return false;
  }
  function setValueForAttribute(node, name, value) {
    if (isAttributeNameSafe(name))
      if (null === value) node.removeAttribute(name);
      else {
        switch (typeof value) {
          case "undefined":
          case "function":
          case "symbol":
            node.removeAttribute(name);
            return;
          case "boolean":
            var prefix$10 = name.toLowerCase().slice(0, 5);
            if ("data-" !== prefix$10 && "aria-" !== prefix$10) {
              node.removeAttribute(name);
              return;
            }
        }
        node.setAttribute(name, "" + value);
      }
  }
  function setValueForKnownAttribute(node, name, value) {
    if (null === value) node.removeAttribute(name);
    else {
      switch (typeof value) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          node.removeAttribute(name);
          return;
      }
      node.setAttribute(name, "" + value);
    }
  }
  function setValueForNamespacedAttribute(node, namespace, name, value) {
    if (null === value) node.removeAttribute(name);
    else {
      switch (typeof value) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          node.removeAttribute(name);
          return;
      }
      node.setAttributeNS(namespace, name, "" + value);
    }
  }
  function getToStringValue(value) {
    switch (typeof value) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return value;
      case "object":
        return value;
      default:
        return "";
    }
  }
  function isCheckable(elem) {
    var type = elem.type;
    return (elem = elem.nodeName) && "input" === elem.toLowerCase() && ("checkbox" === type || "radio" === type);
  }
  function trackValueOnNode(node, valueField, currentValue) {
    var descriptor = Object.getOwnPropertyDescriptor(
      node.constructor.prototype,
      valueField
    );
    if (!node.hasOwnProperty(valueField) && "undefined" !== typeof descriptor && "function" === typeof descriptor.get && "function" === typeof descriptor.set) {
      var get = descriptor.get, set = descriptor.set;
      Object.defineProperty(node, valueField, {
        configurable: true,
        get: function() {
          return get.call(this);
        },
        set: function(value) {
          currentValue = "" + value;
          set.call(this, value);
        }
      });
      Object.defineProperty(node, valueField, {
        enumerable: descriptor.enumerable
      });
      return {
        getValue: function() {
          return currentValue;
        },
        setValue: function(value) {
          currentValue = "" + value;
        },
        stopTracking: function() {
          node._valueTracker = null;
          delete node[valueField];
        }
      };
    }
  }
  function track(node) {
    if (!node._valueTracker) {
      var valueField = isCheckable(node) ? "checked" : "value";
      node._valueTracker = trackValueOnNode(
        node,
        valueField,
        "" + node[valueField]
      );
    }
  }
  function updateValueIfChanged(node) {
    if (!node) return false;
    var tracker = node._valueTracker;
    if (!tracker) return true;
    var lastValue = tracker.getValue();
    var value = "";
    node && (value = isCheckable(node) ? node.checked ? "true" : "false" : node.value);
    node = value;
    return node !== lastValue ? (tracker.setValue(node), true) : false;
  }
  function getActiveElement(doc) {
    doc = doc || ("undefined" !== typeof document ? document : void 0);
    if ("undefined" === typeof doc) return null;
    try {
      return doc.activeElement || doc.body;
    } catch (e) {
      return doc.body;
    }
  }
  var escapeSelectorAttributeValueInsideDoubleQuotesRegex = /[\n"\\]/g;
  function escapeSelectorAttributeValueInsideDoubleQuotes(value) {
    return value.replace(
      escapeSelectorAttributeValueInsideDoubleQuotesRegex,
      function(ch) {
        return "\\" + ch.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function updateInput(element, value, defaultValue, lastDefaultValue, checked, defaultChecked, type, name) {
    element.name = "";
    null != type && "function" !== typeof type && "symbol" !== typeof type && "boolean" !== typeof type ? element.type = type : element.removeAttribute("type");
    if (null != value)
      if ("number" === type) {
        if (0 === value && "" === element.value || element.value != value)
          element.value = "" + getToStringValue(value);
      } else
        element.value !== "" + getToStringValue(value) && (element.value = "" + getToStringValue(value));
    else
      "submit" !== type && "reset" !== type || element.removeAttribute("value");
    null != value ? setDefaultValue(element, type, getToStringValue(value)) : null != defaultValue ? setDefaultValue(element, type, getToStringValue(defaultValue)) : null != lastDefaultValue && element.removeAttribute("value");
    null == checked && null != defaultChecked && (element.defaultChecked = !!defaultChecked);
    null != checked && (element.checked = checked && "function" !== typeof checked && "symbol" !== typeof checked);
    null != name && "function" !== typeof name && "symbol" !== typeof name && "boolean" !== typeof name ? element.name = "" + getToStringValue(name) : element.removeAttribute("name");
  }
  function initInput(element, value, defaultValue, checked, defaultChecked, type, name, isHydrating2) {
    null != type && "function" !== typeof type && "symbol" !== typeof type && "boolean" !== typeof type && (element.type = type);
    if (null != value || null != defaultValue) {
      if (!("submit" !== type && "reset" !== type || void 0 !== value && null !== value)) {
        track(element);
        return;
      }
      defaultValue = null != defaultValue ? "" + getToStringValue(defaultValue) : "";
      value = null != value ? "" + getToStringValue(value) : defaultValue;
      isHydrating2 || value === element.value || (element.value = value);
      element.defaultValue = value;
    }
    checked = null != checked ? checked : defaultChecked;
    checked = "function" !== typeof checked && "symbol" !== typeof checked && !!checked;
    element.checked = isHydrating2 ? element.checked : !!checked;
    element.defaultChecked = !!checked;
    null != name && "function" !== typeof name && "symbol" !== typeof name && "boolean" !== typeof name && (element.name = name);
    track(element);
  }
  function setDefaultValue(node, type, value) {
    "number" === type && getActiveElement(node.ownerDocument) === node || node.defaultValue === "" + value || (node.defaultValue = "" + value);
  }
  function updateOptions(node, multiple, propValue, setDefaultSelected) {
    node = node.options;
    if (multiple) {
      multiple = {};
      for (var i = 0; i < propValue.length; i++)
        multiple["$" + propValue[i]] = true;
      for (propValue = 0; propValue < node.length; propValue++)
        i = multiple.hasOwnProperty("$" + node[propValue].value), node[propValue].selected !== i && (node[propValue].selected = i), i && setDefaultSelected && (node[propValue].defaultSelected = true);
    } else {
      propValue = "" + getToStringValue(propValue);
      multiple = null;
      for (i = 0; i < node.length; i++) {
        if (node[i].value === propValue) {
          node[i].selected = true;
          setDefaultSelected && (node[i].defaultSelected = true);
          return;
        }
        null !== multiple || node[i].disabled || (multiple = node[i]);
      }
      null !== multiple && (multiple.selected = true);
    }
  }
  function updateTextarea(element, value, defaultValue) {
    if (null != value && (value = "" + getToStringValue(value), value !== element.value && (element.value = value), null == defaultValue)) {
      element.defaultValue !== value && (element.defaultValue = value);
      return;
    }
    element.defaultValue = null != defaultValue ? "" + getToStringValue(defaultValue) : "";
  }
  function initTextarea(element, value, defaultValue, children) {
    if (null == value) {
      if (null != children) {
        if (null != defaultValue) throw Error(formatProdErrorMessage(92));
        if (isArrayImpl(children)) {
          if (1 < children.length) throw Error(formatProdErrorMessage(93));
          children = children[0];
        }
        defaultValue = children;
      }
      null == defaultValue && (defaultValue = "");
      value = defaultValue;
    }
    defaultValue = getToStringValue(value);
    element.defaultValue = defaultValue;
    children = element.textContent;
    children === defaultValue && "" !== children && null !== children && (element.value = children);
    track(element);
  }
  function setTextContent(node, text) {
    if (text) {
      var firstChild = node.firstChild;
      if (firstChild && firstChild === node.lastChild && 3 === firstChild.nodeType) {
        firstChild.nodeValue = text;
        return;
      }
    }
    node.textContent = text;
  }
  var unitlessNumbers = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function setValueForStyle(style2, styleName, value) {
    var isCustomProperty = 0 === styleName.indexOf("--");
    null == value || "boolean" === typeof value || "" === value ? isCustomProperty ? style2.setProperty(styleName, "") : "float" === styleName ? style2.cssFloat = "" : style2[styleName] = "" : isCustomProperty ? style2.setProperty(styleName, value) : "number" !== typeof value || 0 === value || unitlessNumbers.has(styleName) ? "float" === styleName ? style2.cssFloat = value : style2[styleName] = ("" + value).trim() : style2[styleName] = value + "px";
  }
  function setValueForStyles(node, styles, prevStyles) {
    if (null != styles && "object" !== typeof styles)
      throw Error(formatProdErrorMessage(62));
    node = node.style;
    if (null != prevStyles) {
      for (var styleName in prevStyles)
        !prevStyles.hasOwnProperty(styleName) || null != styles && styles.hasOwnProperty(styleName) || (0 === styleName.indexOf("--") ? node.setProperty(styleName, "") : "float" === styleName ? node.cssFloat = "" : node[styleName] = "");
      for (var styleName$16 in styles)
        styleName = styles[styleName$16], styles.hasOwnProperty(styleName$16) && prevStyles[styleName$16] !== styleName && setValueForStyle(node, styleName$16, styleName);
    } else
      for (var styleName$17 in styles)
        styles.hasOwnProperty(styleName$17) && setValueForStyle(node, styleName$17, styles[styleName$17]);
  }
  function isCustomElement(tagName) {
    if (-1 === tagName.indexOf("-")) return false;
    switch (tagName) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return false;
      default:
        return true;
    }
  }
  var aliases = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function sanitizeURL(url) {
    return isJavaScriptProtocol.test("" + url) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : url;
  }
  function noop$1() {
  }
  var currentReplayingEvent = null;
  function getEventTarget(nativeEvent) {
    nativeEvent = nativeEvent.target || nativeEvent.srcElement || window;
    nativeEvent.correspondingUseElement && (nativeEvent = nativeEvent.correspondingUseElement);
    return 3 === nativeEvent.nodeType ? nativeEvent.parentNode : nativeEvent;
  }
  var restoreTarget = null, restoreQueue = null;
  function restoreStateOfTarget(target) {
    var internalInstance = getInstanceFromNode(target);
    if (internalInstance && (target = internalInstance.stateNode)) {
      var props = target[internalPropsKey] || null;
      a: switch (target = internalInstance.stateNode, internalInstance.type) {
        case "input":
          updateInput(
            target,
            props.value,
            props.defaultValue,
            props.defaultValue,
            props.checked,
            props.defaultChecked,
            props.type,
            props.name
          );
          internalInstance = props.name;
          if ("radio" === props.type && null != internalInstance) {
            for (props = target; props.parentNode; ) props = props.parentNode;
            props = props.querySelectorAll(
              'input[name="' + escapeSelectorAttributeValueInsideDoubleQuotes(
                "" + internalInstance
              ) + '"][type="radio"]'
            );
            for (internalInstance = 0; internalInstance < props.length; internalInstance++) {
              var otherNode = props[internalInstance];
              if (otherNode !== target && otherNode.form === target.form) {
                var otherProps = otherNode[internalPropsKey] || null;
                if (!otherProps) throw Error(formatProdErrorMessage(90));
                updateInput(
                  otherNode,
                  otherProps.value,
                  otherProps.defaultValue,
                  otherProps.defaultValue,
                  otherProps.checked,
                  otherProps.defaultChecked,
                  otherProps.type,
                  otherProps.name
                );
              }
            }
            for (internalInstance = 0; internalInstance < props.length; internalInstance++)
              otherNode = props[internalInstance], otherNode.form === target.form && updateValueIfChanged(otherNode);
          }
          break a;
        case "textarea":
          updateTextarea(target, props.value, props.defaultValue);
          break a;
        case "select":
          internalInstance = props.value, null != internalInstance && updateOptions(target, !!props.multiple, internalInstance, false);
      }
    }
  }
  var isInsideEventHandler = false;
  function batchedUpdates$1(fn, a, b) {
    if (isInsideEventHandler) return fn(a, b);
    isInsideEventHandler = true;
    try {
      var JSCompiler_inline_result = fn(a);
      return JSCompiler_inline_result;
    } finally {
      if (isInsideEventHandler = false, null !== restoreTarget || null !== restoreQueue) {
        if (flushSyncWork$1(), restoreTarget && (a = restoreTarget, fn = restoreQueue, restoreQueue = restoreTarget = null, restoreStateOfTarget(a), fn))
          for (a = 0; a < fn.length; a++) restoreStateOfTarget(fn[a]);
      }
    }
  }
  function getListener(inst, registrationName) {
    var stateNode = inst.stateNode;
    if (null === stateNode) return null;
    var props = stateNode[internalPropsKey] || null;
    if (null === props) return null;
    stateNode = props[registrationName];
    a: switch (registrationName) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (props = !props.disabled) || (inst = inst.type, props = !("button" === inst || "input" === inst || "select" === inst || "textarea" === inst));
        inst = !props;
        break a;
      default:
        inst = false;
    }
    if (inst) return null;
    if (stateNode && "function" !== typeof stateNode)
      throw Error(
        formatProdErrorMessage(231, registrationName, typeof stateNode)
      );
    return stateNode;
  }
  var canUseDOM = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), passiveBrowserEventsSupported = false;
  if (canUseDOM)
    try {
      var options = {};
      Object.defineProperty(options, "passive", {
        get: function() {
          passiveBrowserEventsSupported = true;
        }
      });
      window.addEventListener("test", options, options);
      window.removeEventListener("test", options, options);
    } catch (e) {
      passiveBrowserEventsSupported = false;
    }
  var root = null, startText = null, fallbackText = null;
  function getData() {
    if (fallbackText) return fallbackText;
    var start, startValue = startText, startLength = startValue.length, end, endValue = "value" in root ? root.value : root.textContent, endLength = endValue.length;
    for (start = 0; start < startLength && startValue[start] === endValue[start]; start++) ;
    var minEnd = startLength - start;
    for (end = 1; end <= minEnd && startValue[startLength - end] === endValue[endLength - end]; end++) ;
    return fallbackText = endValue.slice(start, 1 < end ? 1 - end : void 0);
  }
  function getEventCharCode(nativeEvent) {
    var keyCode = nativeEvent.keyCode;
    "charCode" in nativeEvent ? (nativeEvent = nativeEvent.charCode, 0 === nativeEvent && 13 === keyCode && (nativeEvent = 13)) : nativeEvent = keyCode;
    10 === nativeEvent && (nativeEvent = 13);
    return 32 <= nativeEvent || 13 === nativeEvent ? nativeEvent : 0;
  }
  function functionThatReturnsTrue() {
    return true;
  }
  function functionThatReturnsFalse() {
    return false;
  }
  function createSyntheticEvent(Interface) {
    function SyntheticBaseEvent(reactName, reactEventType, targetInst, nativeEvent, nativeEventTarget) {
      this._reactName = reactName;
      this._targetInst = targetInst;
      this.type = reactEventType;
      this.nativeEvent = nativeEvent;
      this.target = nativeEventTarget;
      this.currentTarget = null;
      for (var propName in Interface)
        Interface.hasOwnProperty(propName) && (reactName = Interface[propName], this[propName] = reactName ? reactName(nativeEvent) : nativeEvent[propName]);
      this.isDefaultPrevented = (null != nativeEvent.defaultPrevented ? nativeEvent.defaultPrevented : false === nativeEvent.returnValue) ? functionThatReturnsTrue : functionThatReturnsFalse;
      this.isPropagationStopped = functionThatReturnsFalse;
      return this;
    }
    assign(SyntheticBaseEvent.prototype, {
      preventDefault: function() {
        this.defaultPrevented = true;
        var event = this.nativeEvent;
        event && (event.preventDefault ? event.preventDefault() : "unknown" !== typeof event.returnValue && (event.returnValue = false), this.isDefaultPrevented = functionThatReturnsTrue);
      },
      stopPropagation: function() {
        var event = this.nativeEvent;
        event && (event.stopPropagation ? event.stopPropagation() : "unknown" !== typeof event.cancelBubble && (event.cancelBubble = true), this.isPropagationStopped = functionThatReturnsTrue);
      },
      persist: function() {
      },
      isPersistent: functionThatReturnsTrue
    });
    return SyntheticBaseEvent;
  }
  var EventInterface = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(event) {
      return event.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, SyntheticEvent = createSyntheticEvent(EventInterface), UIEventInterface = assign({}, EventInterface, { view: 0, detail: 0 }), SyntheticUIEvent = createSyntheticEvent(UIEventInterface), lastMovementX, lastMovementY, lastMouseEvent, MouseEventInterface = assign({}, UIEventInterface, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: getEventModifierState,
    button: 0,
    buttons: 0,
    relatedTarget: function(event) {
      return void 0 === event.relatedTarget ? event.fromElement === event.srcElement ? event.toElement : event.fromElement : event.relatedTarget;
    },
    movementX: function(event) {
      if ("movementX" in event) return event.movementX;
      event !== lastMouseEvent && (lastMouseEvent && "mousemove" === event.type ? (lastMovementX = event.screenX - lastMouseEvent.screenX, lastMovementY = event.screenY - lastMouseEvent.screenY) : lastMovementY = lastMovementX = 0, lastMouseEvent = event);
      return lastMovementX;
    },
    movementY: function(event) {
      return "movementY" in event ? event.movementY : lastMovementY;
    }
  }), SyntheticMouseEvent = createSyntheticEvent(MouseEventInterface), DragEventInterface = assign({}, MouseEventInterface, { dataTransfer: 0 }), SyntheticDragEvent = createSyntheticEvent(DragEventInterface), FocusEventInterface = assign({}, UIEventInterface, { relatedTarget: 0 }), SyntheticFocusEvent = createSyntheticEvent(FocusEventInterface), AnimationEventInterface = assign({}, EventInterface, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), SyntheticAnimationEvent = createSyntheticEvent(AnimationEventInterface), ClipboardEventInterface = assign({}, EventInterface, {
    clipboardData: function(event) {
      return "clipboardData" in event ? event.clipboardData : window.clipboardData;
    }
  }), SyntheticClipboardEvent = createSyntheticEvent(ClipboardEventInterface), CompositionEventInterface = assign({}, EventInterface, { data: 0 }), SyntheticCompositionEvent = createSyntheticEvent(CompositionEventInterface), normalizeKey = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, translateToKey = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, modifierKeyToProp = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function modifierStateGetter(keyArg) {
    var nativeEvent = this.nativeEvent;
    return nativeEvent.getModifierState ? nativeEvent.getModifierState(keyArg) : (keyArg = modifierKeyToProp[keyArg]) ? !!nativeEvent[keyArg] : false;
  }
  function getEventModifierState() {
    return modifierStateGetter;
  }
  var KeyboardEventInterface = assign({}, UIEventInterface, {
    key: function(nativeEvent) {
      if (nativeEvent.key) {
        var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
        if ("Unidentified" !== key) return key;
      }
      return "keypress" === nativeEvent.type ? (nativeEvent = getEventCharCode(nativeEvent), 13 === nativeEvent ? "Enter" : String.fromCharCode(nativeEvent)) : "keydown" === nativeEvent.type || "keyup" === nativeEvent.type ? translateToKey[nativeEvent.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: getEventModifierState,
    charCode: function(event) {
      return "keypress" === event.type ? getEventCharCode(event) : 0;
    },
    keyCode: function(event) {
      return "keydown" === event.type || "keyup" === event.type ? event.keyCode : 0;
    },
    which: function(event) {
      return "keypress" === event.type ? getEventCharCode(event) : "keydown" === event.type || "keyup" === event.type ? event.keyCode : 0;
    }
  }), SyntheticKeyboardEvent = createSyntheticEvent(KeyboardEventInterface), PointerEventInterface = assign({}, MouseEventInterface, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), SyntheticPointerEvent = createSyntheticEvent(PointerEventInterface), TouchEventInterface = assign({}, UIEventInterface, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: getEventModifierState
  }), SyntheticTouchEvent = createSyntheticEvent(TouchEventInterface), TransitionEventInterface = assign({}, EventInterface, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), SyntheticTransitionEvent = createSyntheticEvent(TransitionEventInterface), WheelEventInterface = assign({}, MouseEventInterface, {
    deltaX: function(event) {
      return "deltaX" in event ? event.deltaX : "wheelDeltaX" in event ? -event.wheelDeltaX : 0;
    },
    deltaY: function(event) {
      return "deltaY" in event ? event.deltaY : "wheelDeltaY" in event ? -event.wheelDeltaY : "wheelDelta" in event ? -event.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), SyntheticWheelEvent = createSyntheticEvent(WheelEventInterface), ToggleEventInterface = assign({}, EventInterface, {
    newState: 0,
    oldState: 0
  }), SyntheticToggleEvent = createSyntheticEvent(ToggleEventInterface), END_KEYCODES = [9, 13, 27, 32], canUseCompositionEvent = canUseDOM && "CompositionEvent" in window, documentMode = null;
  canUseDOM && "documentMode" in document && (documentMode = document.documentMode);
  var canUseTextInputEvent = canUseDOM && "TextEvent" in window && !documentMode, useFallbackCompositionData = canUseDOM && (!canUseCompositionEvent || documentMode && 8 < documentMode && 11 >= documentMode), SPACEBAR_CHAR = String.fromCharCode(32), hasSpaceKeypress = false;
  function isFallbackCompositionEnd(domEventName, nativeEvent) {
    switch (domEventName) {
      case "keyup":
        return -1 !== END_KEYCODES.indexOf(nativeEvent.keyCode);
      case "keydown":
        return 229 !== nativeEvent.keyCode;
      case "keypress":
      case "mousedown":
      case "focusout":
        return true;
      default:
        return false;
    }
  }
  function getDataFromCustomEvent(nativeEvent) {
    nativeEvent = nativeEvent.detail;
    return "object" === typeof nativeEvent && "data" in nativeEvent ? nativeEvent.data : null;
  }
  var isComposing = false;
  function getNativeBeforeInputChars(domEventName, nativeEvent) {
    switch (domEventName) {
      case "compositionend":
        return getDataFromCustomEvent(nativeEvent);
      case "keypress":
        if (32 !== nativeEvent.which) return null;
        hasSpaceKeypress = true;
        return SPACEBAR_CHAR;
      case "textInput":
        return domEventName = nativeEvent.data, domEventName === SPACEBAR_CHAR && hasSpaceKeypress ? null : domEventName;
      default:
        return null;
    }
  }
  function getFallbackBeforeInputChars(domEventName, nativeEvent) {
    if (isComposing)
      return "compositionend" === domEventName || !canUseCompositionEvent && isFallbackCompositionEnd(domEventName, nativeEvent) ? (domEventName = getData(), fallbackText = startText = root = null, isComposing = false, domEventName) : null;
    switch (domEventName) {
      case "paste":
        return null;
      case "keypress":
        if (!(nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) || nativeEvent.ctrlKey && nativeEvent.altKey) {
          if (nativeEvent.char && 1 < nativeEvent.char.length)
            return nativeEvent.char;
          if (nativeEvent.which) return String.fromCharCode(nativeEvent.which);
        }
        return null;
      case "compositionend":
        return useFallbackCompositionData && "ko" !== nativeEvent.locale ? null : nativeEvent.data;
      default:
        return null;
    }
  }
  var supportedInputTypes = {
    color: true,
    date: true,
    datetime: true,
    "datetime-local": true,
    email: true,
    month: true,
    number: true,
    password: true,
    range: true,
    search: true,
    tel: true,
    text: true,
    time: true,
    url: true,
    week: true
  };
  function isTextInputElement(elem) {
    var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
    return "input" === nodeName ? !!supportedInputTypes[elem.type] : "textarea" === nodeName ? true : false;
  }
  function createAndAccumulateChangeEvent(dispatchQueue, inst, nativeEvent, target) {
    restoreTarget ? restoreQueue ? restoreQueue.push(target) : restoreQueue = [target] : restoreTarget = target;
    inst = accumulateTwoPhaseListeners(inst, "onChange");
    0 < inst.length && (nativeEvent = new SyntheticEvent(
      "onChange",
      "change",
      null,
      nativeEvent,
      target
    ), dispatchQueue.push({ event: nativeEvent, listeners: inst }));
  }
  var activeElement$1 = null, activeElementInst$1 = null;
  function runEventInBatch(dispatchQueue) {
    processDispatchQueue(dispatchQueue, 0);
  }
  function getInstIfValueChanged(targetInst) {
    var targetNode = getNodeFromInstance(targetInst);
    if (updateValueIfChanged(targetNode)) return targetInst;
  }
  function getTargetInstForChangeEvent(domEventName, targetInst) {
    if ("change" === domEventName) return targetInst;
  }
  var isInputEventSupported = false;
  if (canUseDOM) {
    var JSCompiler_inline_result$jscomp$286;
    if (canUseDOM) {
      var isSupported$jscomp$inline_427 = "oninput" in document;
      if (!isSupported$jscomp$inline_427) {
        var element$jscomp$inline_428 = document.createElement("div");
        element$jscomp$inline_428.setAttribute("oninput", "return;");
        isSupported$jscomp$inline_427 = "function" === typeof element$jscomp$inline_428.oninput;
      }
      JSCompiler_inline_result$jscomp$286 = isSupported$jscomp$inline_427;
    } else JSCompiler_inline_result$jscomp$286 = false;
    isInputEventSupported = JSCompiler_inline_result$jscomp$286 && (!document.documentMode || 9 < document.documentMode);
  }
  function stopWatchingForValueChange() {
    activeElement$1 && (activeElement$1.detachEvent("onpropertychange", handlePropertyChange), activeElementInst$1 = activeElement$1 = null);
  }
  function handlePropertyChange(nativeEvent) {
    if ("value" === nativeEvent.propertyName && getInstIfValueChanged(activeElementInst$1)) {
      var dispatchQueue = [];
      createAndAccumulateChangeEvent(
        dispatchQueue,
        activeElementInst$1,
        nativeEvent,
        getEventTarget(nativeEvent)
      );
      batchedUpdates$1(runEventInBatch, dispatchQueue);
    }
  }
  function handleEventsForInputEventPolyfill(domEventName, target, targetInst) {
    "focusin" === domEventName ? (stopWatchingForValueChange(), activeElement$1 = target, activeElementInst$1 = targetInst, activeElement$1.attachEvent("onpropertychange", handlePropertyChange)) : "focusout" === domEventName && stopWatchingForValueChange();
  }
  function getTargetInstForInputEventPolyfill(domEventName) {
    if ("selectionchange" === domEventName || "keyup" === domEventName || "keydown" === domEventName)
      return getInstIfValueChanged(activeElementInst$1);
  }
  function getTargetInstForClickEvent(domEventName, targetInst) {
    if ("click" === domEventName) return getInstIfValueChanged(targetInst);
  }
  function getTargetInstForInputOrChangeEvent(domEventName, targetInst) {
    if ("input" === domEventName || "change" === domEventName)
      return getInstIfValueChanged(targetInst);
  }
  function is(x, y) {
    return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
  }
  var objectIs = "function" === typeof Object.is ? Object.is : is;
  function shallowEqual(objA, objB) {
    if (objectIs(objA, objB)) return true;
    if ("object" !== typeof objA || null === objA || "object" !== typeof objB || null === objB)
      return false;
    var keysA = Object.keys(objA), keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) return false;
    for (keysB = 0; keysB < keysA.length; keysB++) {
      var currentKey = keysA[keysB];
      if (!hasOwnProperty.call(objB, currentKey) || !objectIs(objA[currentKey], objB[currentKey]))
        return false;
    }
    return true;
  }
  function getLeafNode(node) {
    for (; node && node.firstChild; ) node = node.firstChild;
    return node;
  }
  function getNodeForCharacterOffset(root2, offset) {
    var node = getLeafNode(root2);
    root2 = 0;
    for (var nodeEnd; node; ) {
      if (3 === node.nodeType) {
        nodeEnd = root2 + node.textContent.length;
        if (root2 <= offset && nodeEnd >= offset)
          return { node, offset: offset - root2 };
        root2 = nodeEnd;
      }
      a: {
        for (; node; ) {
          if (node.nextSibling) {
            node = node.nextSibling;
            break a;
          }
          node = node.parentNode;
        }
        node = void 0;
      }
      node = getLeafNode(node);
    }
  }
  function containsNode(outerNode, innerNode) {
    return outerNode && innerNode ? outerNode === innerNode ? true : outerNode && 3 === outerNode.nodeType ? false : innerNode && 3 === innerNode.nodeType ? containsNode(outerNode, innerNode.parentNode) : "contains" in outerNode ? outerNode.contains(innerNode) : outerNode.compareDocumentPosition ? !!(outerNode.compareDocumentPosition(innerNode) & 16) : false : false;
  }
  function getActiveElementDeep(containerInfo) {
    containerInfo = null != containerInfo && null != containerInfo.ownerDocument && null != containerInfo.ownerDocument.defaultView ? containerInfo.ownerDocument.defaultView : window;
    for (var element = getActiveElement(containerInfo.document); element instanceof containerInfo.HTMLIFrameElement; ) {
      try {
        var JSCompiler_inline_result = "string" === typeof element.contentWindow.location.href;
      } catch (err) {
        JSCompiler_inline_result = false;
      }
      if (JSCompiler_inline_result) containerInfo = element.contentWindow;
      else break;
      element = getActiveElement(containerInfo.document);
    }
    return element;
  }
  function hasSelectionCapabilities(elem) {
    var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
    return nodeName && ("input" === nodeName && ("text" === elem.type || "search" === elem.type || "tel" === elem.type || "url" === elem.type || "password" === elem.type) || "textarea" === nodeName || "true" === elem.contentEditable);
  }
  var skipSelectionChangeEvent = canUseDOM && "documentMode" in document && 11 >= document.documentMode, activeElement = null, activeElementInst = null, lastSelection = null, mouseDown = false;
  function constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget) {
    var doc = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget.document : 9 === nativeEventTarget.nodeType ? nativeEventTarget : nativeEventTarget.ownerDocument;
    mouseDown || null == activeElement || activeElement !== getActiveElement(doc) || (doc = activeElement, "selectionStart" in doc && hasSelectionCapabilities(doc) ? doc = { start: doc.selectionStart, end: doc.selectionEnd } : (doc = (doc.ownerDocument && doc.ownerDocument.defaultView || window).getSelection(), doc = {
      anchorNode: doc.anchorNode,
      anchorOffset: doc.anchorOffset,
      focusNode: doc.focusNode,
      focusOffset: doc.focusOffset
    }), lastSelection && shallowEqual(lastSelection, doc) || (lastSelection = doc, doc = accumulateTwoPhaseListeners(activeElementInst, "onSelect"), 0 < doc.length && (nativeEvent = new SyntheticEvent(
      "onSelect",
      "select",
      null,
      nativeEvent,
      nativeEventTarget
    ), dispatchQueue.push({ event: nativeEvent, listeners: doc }), nativeEvent.target = activeElement)));
  }
  function makePrefixMap(styleProp, eventName) {
    var prefixes = {};
    prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
    prefixes["Webkit" + styleProp] = "webkit" + eventName;
    prefixes["Moz" + styleProp] = "moz" + eventName;
    return prefixes;
  }
  var vendorPrefixes = {
    animationend: makePrefixMap("Animation", "AnimationEnd"),
    animationiteration: makePrefixMap("Animation", "AnimationIteration"),
    animationstart: makePrefixMap("Animation", "AnimationStart"),
    transitionrun: makePrefixMap("Transition", "TransitionRun"),
    transitionstart: makePrefixMap("Transition", "TransitionStart"),
    transitioncancel: makePrefixMap("Transition", "TransitionCancel"),
    transitionend: makePrefixMap("Transition", "TransitionEnd")
  }, prefixedEventNames = {}, style = {};
  canUseDOM && (style = document.createElement("div").style, "AnimationEvent" in window || (delete vendorPrefixes.animationend.animation, delete vendorPrefixes.animationiteration.animation, delete vendorPrefixes.animationstart.animation), "TransitionEvent" in window || delete vendorPrefixes.transitionend.transition);
  function getVendorPrefixedEventName(eventName) {
    if (prefixedEventNames[eventName]) return prefixedEventNames[eventName];
    if (!vendorPrefixes[eventName]) return eventName;
    var prefixMap = vendorPrefixes[eventName], styleProp;
    for (styleProp in prefixMap)
      if (prefixMap.hasOwnProperty(styleProp) && styleProp in style)
        return prefixedEventNames[eventName] = prefixMap[styleProp];
    return eventName;
  }
  var ANIMATION_END = getVendorPrefixedEventName("animationend"), ANIMATION_ITERATION = getVendorPrefixedEventName("animationiteration"), ANIMATION_START = getVendorPrefixedEventName("animationstart"), TRANSITION_RUN = getVendorPrefixedEventName("transitionrun"), TRANSITION_START = getVendorPrefixedEventName("transitionstart"), TRANSITION_CANCEL = getVendorPrefixedEventName("transitioncancel"), TRANSITION_END = getVendorPrefixedEventName("transitionend"), topLevelEventsToReactNames = /* @__PURE__ */ new Map(), simpleEventPluginEvents = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  simpleEventPluginEvents.push("scrollEnd");
  function registerSimpleEvent(domEventName, reactName) {
    topLevelEventsToReactNames.set(domEventName, reactName);
    registerTwoPhaseEvent(reactName, [domEventName]);
  }
  var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
    if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
      var event = new window.ErrorEvent("error", {
        bubbles: true,
        cancelable: true,
        message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
        error
      });
      if (!window.dispatchEvent(event)) return;
    } else if ("object" === typeof process && "function" === typeof process.emit) {
      process.emit("uncaughtException", error);
      return;
    }
    console.error(error);
  }, concurrentQueues = [], concurrentQueuesIndex = 0, concurrentlyUpdatedLanes = 0;
  function finishQueueingConcurrentUpdates() {
    for (var endIndex = concurrentQueuesIndex, i = concurrentlyUpdatedLanes = concurrentQueuesIndex = 0; i < endIndex; ) {
      var fiber = concurrentQueues[i];
      concurrentQueues[i++] = null;
      var queue = concurrentQueues[i];
      concurrentQueues[i++] = null;
      var update = concurrentQueues[i];
      concurrentQueues[i++] = null;
      var lane = concurrentQueues[i];
      concurrentQueues[i++] = null;
      if (null !== queue && null !== update) {
        var pending = queue.pending;
        null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
        queue.pending = update;
      }
      0 !== lane && markUpdateLaneFromFiberToRoot(fiber, update, lane);
    }
  }
  function enqueueUpdate$1(fiber, queue, update, lane) {
    concurrentQueues[concurrentQueuesIndex++] = fiber;
    concurrentQueues[concurrentQueuesIndex++] = queue;
    concurrentQueues[concurrentQueuesIndex++] = update;
    concurrentQueues[concurrentQueuesIndex++] = lane;
    concurrentlyUpdatedLanes |= lane;
    fiber.lanes |= lane;
    fiber = fiber.alternate;
    null !== fiber && (fiber.lanes |= lane);
  }
  function enqueueConcurrentHookUpdate(fiber, queue, update, lane) {
    enqueueUpdate$1(fiber, queue, update, lane);
    return getRootForUpdatedFiber(fiber);
  }
  function enqueueConcurrentRenderForLane(fiber, lane) {
    enqueueUpdate$1(fiber, null, null, lane);
    return getRootForUpdatedFiber(fiber);
  }
  function markUpdateLaneFromFiberToRoot(sourceFiber, update, lane) {
    sourceFiber.lanes |= lane;
    var alternate = sourceFiber.alternate;
    null !== alternate && (alternate.lanes |= lane);
    for (var isHidden = false, parent = sourceFiber.return; null !== parent; )
      parent.childLanes |= lane, alternate = parent.alternate, null !== alternate && (alternate.childLanes |= lane), 22 === parent.tag && (sourceFiber = parent.stateNode, null === sourceFiber || sourceFiber._visibility & 1 || (isHidden = true)), sourceFiber = parent, parent = parent.return;
    return 3 === sourceFiber.tag ? (parent = sourceFiber.stateNode, isHidden && null !== update && (isHidden = 31 - clz32(lane), sourceFiber = parent.hiddenUpdates, alternate = sourceFiber[isHidden], null === alternate ? sourceFiber[isHidden] = [update] : alternate.push(update), update.lane = lane | 536870912), parent) : null;
  }
  function getRootForUpdatedFiber(sourceFiber) {
    if (50 < nestedUpdateCount)
      throw nestedUpdateCount = 0, rootWithNestedUpdates = null, Error(formatProdErrorMessage(185));
    for (var parent = sourceFiber.return; null !== parent; )
      sourceFiber = parent, parent = sourceFiber.return;
    return 3 === sourceFiber.tag ? sourceFiber.stateNode : null;
  }
  var emptyContextObject = {};
  function FiberNode(tag, pendingProps, key, mode) {
    this.tag = tag;
    this.key = key;
    this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
    this.index = 0;
    this.refCleanup = this.ref = null;
    this.pendingProps = pendingProps;
    this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
    this.mode = mode;
    this.subtreeFlags = this.flags = 0;
    this.deletions = null;
    this.childLanes = this.lanes = 0;
    this.alternate = null;
  }
  function createFiberImplClass(tag, pendingProps, key, mode) {
    return new FiberNode(tag, pendingProps, key, mode);
  }
  function shouldConstruct(Component) {
    Component = Component.prototype;
    return !(!Component || !Component.isReactComponent);
  }
  function createWorkInProgress(current, pendingProps) {
    var workInProgress2 = current.alternate;
    null === workInProgress2 ? (workInProgress2 = createFiberImplClass(
      current.tag,
      pendingProps,
      current.key,
      current.mode
    ), workInProgress2.elementType = current.elementType, workInProgress2.type = current.type, workInProgress2.stateNode = current.stateNode, workInProgress2.alternate = current, current.alternate = workInProgress2) : (workInProgress2.pendingProps = pendingProps, workInProgress2.type = current.type, workInProgress2.flags = 0, workInProgress2.subtreeFlags = 0, workInProgress2.deletions = null);
    workInProgress2.flags = current.flags & 65011712;
    workInProgress2.childLanes = current.childLanes;
    workInProgress2.lanes = current.lanes;
    workInProgress2.child = current.child;
    workInProgress2.memoizedProps = current.memoizedProps;
    workInProgress2.memoizedState = current.memoizedState;
    workInProgress2.updateQueue = current.updateQueue;
    pendingProps = current.dependencies;
    workInProgress2.dependencies = null === pendingProps ? null : { lanes: pendingProps.lanes, firstContext: pendingProps.firstContext };
    workInProgress2.sibling = current.sibling;
    workInProgress2.index = current.index;
    workInProgress2.ref = current.ref;
    workInProgress2.refCleanup = current.refCleanup;
    return workInProgress2;
  }
  function resetWorkInProgress(workInProgress2, renderLanes2) {
    workInProgress2.flags &= 65011714;
    var current = workInProgress2.alternate;
    null === current ? (workInProgress2.childLanes = 0, workInProgress2.lanes = renderLanes2, workInProgress2.child = null, workInProgress2.subtreeFlags = 0, workInProgress2.memoizedProps = null, workInProgress2.memoizedState = null, workInProgress2.updateQueue = null, workInProgress2.dependencies = null, workInProgress2.stateNode = null) : (workInProgress2.childLanes = current.childLanes, workInProgress2.lanes = current.lanes, workInProgress2.child = current.child, workInProgress2.subtreeFlags = 0, workInProgress2.deletions = null, workInProgress2.memoizedProps = current.memoizedProps, workInProgress2.memoizedState = current.memoizedState, workInProgress2.updateQueue = current.updateQueue, workInProgress2.type = current.type, renderLanes2 = current.dependencies, workInProgress2.dependencies = null === renderLanes2 ? null : {
      lanes: renderLanes2.lanes,
      firstContext: renderLanes2.firstContext
    });
    return workInProgress2;
  }
  function createFiberFromTypeAndProps(type, key, pendingProps, owner, mode, lanes) {
    var fiberTag = 0;
    owner = type;
    if ("function" === typeof type) shouldConstruct(type) && (fiberTag = 1);
    else if ("string" === typeof type)
      fiberTag = isHostHoistableType(
        type,
        pendingProps,
        contextStackCursor.current
      ) ? 26 : "html" === type || "head" === type || "body" === type ? 27 : 5;
    else
      a: switch (type) {
        case REACT_ACTIVITY_TYPE:
          return type = createFiberImplClass(31, pendingProps, key, mode), type.elementType = REACT_ACTIVITY_TYPE, type.lanes = lanes, type;
        case REACT_FRAGMENT_TYPE:
          return createFiberFromFragment(pendingProps.children, mode, lanes, key);
        case REACT_STRICT_MODE_TYPE:
          fiberTag = 8;
          mode |= 24;
          break;
        case REACT_PROFILER_TYPE:
          return type = createFiberImplClass(12, pendingProps, key, mode | 2), type.elementType = REACT_PROFILER_TYPE, type.lanes = lanes, type;
        case REACT_SUSPENSE_TYPE:
          return type = createFiberImplClass(13, pendingProps, key, mode), type.elementType = REACT_SUSPENSE_TYPE, type.lanes = lanes, type;
        case REACT_SUSPENSE_LIST_TYPE:
          return type = createFiberImplClass(19, pendingProps, key, mode), type.elementType = REACT_SUSPENSE_LIST_TYPE, type.lanes = lanes, type;
        default:
          if ("object" === typeof type && null !== type)
            switch (type.$$typeof) {
              case REACT_CONTEXT_TYPE:
                fiberTag = 10;
                break a;
              case REACT_CONSUMER_TYPE:
                fiberTag = 9;
                break a;
              case REACT_FORWARD_REF_TYPE:
                fiberTag = 11;
                break a;
              case REACT_MEMO_TYPE:
                fiberTag = 14;
                break a;
              case REACT_LAZY_TYPE:
                fiberTag = 16;
                owner = null;
                break a;
            }
          fiberTag = 29;
          pendingProps = Error(
            formatProdErrorMessage(130, null === type ? "null" : typeof type, "")
          );
          owner = null;
      }
    key = createFiberImplClass(fiberTag, pendingProps, key, mode);
    key.elementType = type;
    key.type = owner;
    key.lanes = lanes;
    return key;
  }
  function createFiberFromFragment(elements, mode, lanes, key) {
    elements = createFiberImplClass(7, elements, key, mode);
    elements.lanes = lanes;
    return elements;
  }
  function createFiberFromText(content, mode, lanes) {
    content = createFiberImplClass(6, content, null, mode);
    content.lanes = lanes;
    return content;
  }
  function createFiberFromDehydratedFragment(dehydratedNode) {
    var fiber = createFiberImplClass(18, null, null, 0);
    fiber.stateNode = dehydratedNode;
    return fiber;
  }
  function createFiberFromPortal(portal, mode, lanes) {
    mode = createFiberImplClass(
      4,
      null !== portal.children ? portal.children : [],
      portal.key,
      mode
    );
    mode.lanes = lanes;
    mode.stateNode = {
      containerInfo: portal.containerInfo,
      pendingChildren: null,
      implementation: portal.implementation
    };
    return mode;
  }
  var CapturedStacks = /* @__PURE__ */ new WeakMap();
  function createCapturedValueAtFiber(value, source) {
    if ("object" === typeof value && null !== value) {
      var existing = CapturedStacks.get(value);
      if (void 0 !== existing) return existing;
      source = {
        value,
        source,
        stack: getStackByFiberInDevAndProd(source)
      };
      CapturedStacks.set(value, source);
      return source;
    }
    return {
      value,
      source,
      stack: getStackByFiberInDevAndProd(source)
    };
  }
  var forkStack = [], forkStackIndex = 0, treeForkProvider = null, treeForkCount = 0, idStack = [], idStackIndex = 0, treeContextProvider = null, treeContextId = 1, treeContextOverflow = "";
  function pushTreeFork(workInProgress2, totalChildren) {
    forkStack[forkStackIndex++] = treeForkCount;
    forkStack[forkStackIndex++] = treeForkProvider;
    treeForkProvider = workInProgress2;
    treeForkCount = totalChildren;
  }
  function pushTreeId(workInProgress2, totalChildren, index2) {
    idStack[idStackIndex++] = treeContextId;
    idStack[idStackIndex++] = treeContextOverflow;
    idStack[idStackIndex++] = treeContextProvider;
    treeContextProvider = workInProgress2;
    var baseIdWithLeadingBit = treeContextId;
    workInProgress2 = treeContextOverflow;
    var baseLength = 32 - clz32(baseIdWithLeadingBit) - 1;
    baseIdWithLeadingBit &= ~(1 << baseLength);
    index2 += 1;
    var length = 32 - clz32(totalChildren) + baseLength;
    if (30 < length) {
      var numberOfOverflowBits = baseLength - baseLength % 5;
      length = (baseIdWithLeadingBit & (1 << numberOfOverflowBits) - 1).toString(32);
      baseIdWithLeadingBit >>= numberOfOverflowBits;
      baseLength -= numberOfOverflowBits;
      treeContextId = 1 << 32 - clz32(totalChildren) + baseLength | index2 << baseLength | baseIdWithLeadingBit;
      treeContextOverflow = length + workInProgress2;
    } else
      treeContextId = 1 << length | index2 << baseLength | baseIdWithLeadingBit, treeContextOverflow = workInProgress2;
  }
  function pushMaterializedTreeId(workInProgress2) {
    null !== workInProgress2.return && (pushTreeFork(workInProgress2, 1), pushTreeId(workInProgress2, 1, 0));
  }
  function popTreeContext(workInProgress2) {
    for (; workInProgress2 === treeForkProvider; )
      treeForkProvider = forkStack[--forkStackIndex], forkStack[forkStackIndex] = null, treeForkCount = forkStack[--forkStackIndex], forkStack[forkStackIndex] = null;
    for (; workInProgress2 === treeContextProvider; )
      treeContextProvider = idStack[--idStackIndex], idStack[idStackIndex] = null, treeContextOverflow = idStack[--idStackIndex], idStack[idStackIndex] = null, treeContextId = idStack[--idStackIndex], idStack[idStackIndex] = null;
  }
  function restoreSuspendedTreeContext(workInProgress2, suspendedContext) {
    idStack[idStackIndex++] = treeContextId;
    idStack[idStackIndex++] = treeContextOverflow;
    idStack[idStackIndex++] = treeContextProvider;
    treeContextId = suspendedContext.id;
    treeContextOverflow = suspendedContext.overflow;
    treeContextProvider = workInProgress2;
  }
  var hydrationParentFiber = null, nextHydratableInstance = null, isHydrating = false, hydrationErrors = null, rootOrSingletonContext = false, HydrationMismatchException = Error(formatProdErrorMessage(519));
  function throwOnHydrationMismatch(fiber) {
    var error = Error(
      formatProdErrorMessage(
        418,
        1 < arguments.length && void 0 !== arguments[1] && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    queueHydrationError(createCapturedValueAtFiber(error, fiber));
    throw HydrationMismatchException;
  }
  function prepareToHydrateHostInstance(fiber) {
    var instance = fiber.stateNode, type = fiber.type, props = fiber.memoizedProps;
    instance[internalInstanceKey] = fiber;
    instance[internalPropsKey] = props;
    switch (type) {
      case "dialog":
        listenToNonDelegatedEvent("cancel", instance);
        listenToNonDelegatedEvent("close", instance);
        break;
      case "iframe":
      case "object":
      case "embed":
        listenToNonDelegatedEvent("load", instance);
        break;
      case "video":
      case "audio":
        for (type = 0; type < mediaEventTypes.length; type++)
          listenToNonDelegatedEvent(mediaEventTypes[type], instance);
        break;
      case "source":
        listenToNonDelegatedEvent("error", instance);
        break;
      case "img":
      case "image":
      case "link":
        listenToNonDelegatedEvent("error", instance);
        listenToNonDelegatedEvent("load", instance);
        break;
      case "details":
        listenToNonDelegatedEvent("toggle", instance);
        break;
      case "input":
        listenToNonDelegatedEvent("invalid", instance);
        initInput(
          instance,
          props.value,
          props.defaultValue,
          props.checked,
          props.defaultChecked,
          props.type,
          props.name,
          true
        );
        break;
      case "select":
        listenToNonDelegatedEvent("invalid", instance);
        break;
      case "textarea":
        listenToNonDelegatedEvent("invalid", instance), initTextarea(instance, props.value, props.defaultValue, props.children);
    }
    type = props.children;
    "string" !== typeof type && "number" !== typeof type && "bigint" !== typeof type || instance.textContent === "" + type || true === props.suppressHydrationWarning || checkForUnmatchedText(instance.textContent, type) ? (null != props.popover && (listenToNonDelegatedEvent("beforetoggle", instance), listenToNonDelegatedEvent("toggle", instance)), null != props.onScroll && listenToNonDelegatedEvent("scroll", instance), null != props.onScrollEnd && listenToNonDelegatedEvent("scrollend", instance), null != props.onClick && (instance.onclick = noop$1), instance = true) : instance = false;
    instance || throwOnHydrationMismatch(fiber, true);
  }
  function popToNextHostParent(fiber) {
    for (hydrationParentFiber = fiber.return; hydrationParentFiber; )
      switch (hydrationParentFiber.tag) {
        case 5:
        case 31:
        case 13:
          rootOrSingletonContext = false;
          return;
        case 27:
        case 3:
          rootOrSingletonContext = true;
          return;
        default:
          hydrationParentFiber = hydrationParentFiber.return;
      }
  }
  function popHydrationState(fiber) {
    if (fiber !== hydrationParentFiber) return false;
    if (!isHydrating) return popToNextHostParent(fiber), isHydrating = true, false;
    var tag = fiber.tag, JSCompiler_temp;
    if (JSCompiler_temp = 3 !== tag && 27 !== tag) {
      if (JSCompiler_temp = 5 === tag)
        JSCompiler_temp = fiber.type, JSCompiler_temp = !("form" !== JSCompiler_temp && "button" !== JSCompiler_temp) || shouldSetTextContent(fiber.type, fiber.memoizedProps);
      JSCompiler_temp = !JSCompiler_temp;
    }
    JSCompiler_temp && nextHydratableInstance && throwOnHydrationMismatch(fiber);
    popToNextHostParent(fiber);
    if (13 === tag) {
      fiber = fiber.memoizedState;
      fiber = null !== fiber ? fiber.dehydrated : null;
      if (!fiber) throw Error(formatProdErrorMessage(317));
      nextHydratableInstance = getNextHydratableInstanceAfterHydrationBoundary(fiber);
    } else if (31 === tag) {
      fiber = fiber.memoizedState;
      fiber = null !== fiber ? fiber.dehydrated : null;
      if (!fiber) throw Error(formatProdErrorMessage(317));
      nextHydratableInstance = getNextHydratableInstanceAfterHydrationBoundary(fiber);
    } else
      27 === tag ? (tag = nextHydratableInstance, isSingletonScope(fiber.type) ? (fiber = previousHydratableOnEnteringScopedSingleton, previousHydratableOnEnteringScopedSingleton = null, nextHydratableInstance = fiber) : nextHydratableInstance = tag) : nextHydratableInstance = hydrationParentFiber ? getNextHydratable(fiber.stateNode.nextSibling) : null;
    return true;
  }
  function resetHydrationState() {
    nextHydratableInstance = hydrationParentFiber = null;
    isHydrating = false;
  }
  function upgradeHydrationErrorsToRecoverable() {
    var queuedErrors = hydrationErrors;
    null !== queuedErrors && (null === workInProgressRootRecoverableErrors ? workInProgressRootRecoverableErrors = queuedErrors : workInProgressRootRecoverableErrors.push.apply(
      workInProgressRootRecoverableErrors,
      queuedErrors
    ), hydrationErrors = null);
    return queuedErrors;
  }
  function queueHydrationError(error) {
    null === hydrationErrors ? hydrationErrors = [error] : hydrationErrors.push(error);
  }
  var valueCursor = createCursor(null), currentlyRenderingFiber$1 = null, lastContextDependency = null;
  function pushProvider(providerFiber, context, nextValue) {
    push(valueCursor, context._currentValue);
    context._currentValue = nextValue;
  }
  function popProvider(context) {
    context._currentValue = valueCursor.current;
    pop(valueCursor);
  }
  function scheduleContextWorkOnParentPath(parent, renderLanes2, propagationRoot) {
    for (; null !== parent; ) {
      var alternate = parent.alternate;
      (parent.childLanes & renderLanes2) !== renderLanes2 ? (parent.childLanes |= renderLanes2, null !== alternate && (alternate.childLanes |= renderLanes2)) : null !== alternate && (alternate.childLanes & renderLanes2) !== renderLanes2 && (alternate.childLanes |= renderLanes2);
      if (parent === propagationRoot) break;
      parent = parent.return;
    }
  }
  function propagateContextChanges(workInProgress2, contexts, renderLanes2, forcePropagateEntireTree) {
    var fiber = workInProgress2.child;
    null !== fiber && (fiber.return = workInProgress2);
    for (; null !== fiber; ) {
      var list = fiber.dependencies;
      if (null !== list) {
        var nextFiber = fiber.child;
        list = list.firstContext;
        a: for (; null !== list; ) {
          var dependency = list;
          list = fiber;
          for (var i = 0; i < contexts.length; i++)
            if (dependency.context === contexts[i]) {
              list.lanes |= renderLanes2;
              dependency = list.alternate;
              null !== dependency && (dependency.lanes |= renderLanes2);
              scheduleContextWorkOnParentPath(
                list.return,
                renderLanes2,
                workInProgress2
              );
              forcePropagateEntireTree || (nextFiber = null);
              break a;
            }
          list = dependency.next;
        }
      } else if (18 === fiber.tag) {
        nextFiber = fiber.return;
        if (null === nextFiber) throw Error(formatProdErrorMessage(341));
        nextFiber.lanes |= renderLanes2;
        list = nextFiber.alternate;
        null !== list && (list.lanes |= renderLanes2);
        scheduleContextWorkOnParentPath(nextFiber, renderLanes2, workInProgress2);
        nextFiber = null;
      } else nextFiber = fiber.child;
      if (null !== nextFiber) nextFiber.return = fiber;
      else
        for (nextFiber = fiber; null !== nextFiber; ) {
          if (nextFiber === workInProgress2) {
            nextFiber = null;
            break;
          }
          fiber = nextFiber.sibling;
          if (null !== fiber) {
            fiber.return = nextFiber.return;
            nextFiber = fiber;
            break;
          }
          nextFiber = nextFiber.return;
        }
      fiber = nextFiber;
    }
  }
  function propagateParentContextChanges(current, workInProgress2, renderLanes2, forcePropagateEntireTree) {
    current = null;
    for (var parent = workInProgress2, isInsidePropagationBailout = false; null !== parent; ) {
      if (!isInsidePropagationBailout) {
        if (0 !== (parent.flags & 524288)) isInsidePropagationBailout = true;
        else if (0 !== (parent.flags & 262144)) break;
      }
      if (10 === parent.tag) {
        var currentParent = parent.alternate;
        if (null === currentParent) throw Error(formatProdErrorMessage(387));
        currentParent = currentParent.memoizedProps;
        if (null !== currentParent) {
          var context = parent.type;
          objectIs(parent.pendingProps.value, currentParent.value) || (null !== current ? current.push(context) : current = [context]);
        }
      } else if (parent === hostTransitionProviderCursor.current) {
        currentParent = parent.alternate;
        if (null === currentParent) throw Error(formatProdErrorMessage(387));
        currentParent.memoizedState.memoizedState !== parent.memoizedState.memoizedState && (null !== current ? current.push(HostTransitionContext) : current = [HostTransitionContext]);
      }
      parent = parent.return;
    }
    null !== current && propagateContextChanges(
      workInProgress2,
      current,
      renderLanes2,
      forcePropagateEntireTree
    );
    workInProgress2.flags |= 262144;
  }
  function checkIfContextChanged(currentDependencies) {
    for (currentDependencies = currentDependencies.firstContext; null !== currentDependencies; ) {
      if (!objectIs(
        currentDependencies.context._currentValue,
        currentDependencies.memoizedValue
      ))
        return true;
      currentDependencies = currentDependencies.next;
    }
    return false;
  }
  function prepareToReadContext(workInProgress2) {
    currentlyRenderingFiber$1 = workInProgress2;
    lastContextDependency = null;
    workInProgress2 = workInProgress2.dependencies;
    null !== workInProgress2 && (workInProgress2.firstContext = null);
  }
  function readContext(context) {
    return readContextForConsumer(currentlyRenderingFiber$1, context);
  }
  function readContextDuringReconciliation(consumer, context) {
    null === currentlyRenderingFiber$1 && prepareToReadContext(consumer);
    return readContextForConsumer(consumer, context);
  }
  function readContextForConsumer(consumer, context) {
    var value = context._currentValue;
    context = { context, memoizedValue: value, next: null };
    if (null === lastContextDependency) {
      if (null === consumer) throw Error(formatProdErrorMessage(308));
      lastContextDependency = context;
      consumer.dependencies = { lanes: 0, firstContext: context };
      consumer.flags |= 524288;
    } else lastContextDependency = lastContextDependency.next = context;
    return value;
  }
  var AbortControllerLocal = "undefined" !== typeof AbortController ? AbortController : function() {
    var listeners = [], signal = this.signal = {
      aborted: false,
      addEventListener: function(type, listener) {
        listeners.push(listener);
      }
    };
    this.abort = function() {
      signal.aborted = true;
      listeners.forEach(function(listener) {
        return listener();
      });
    };
  }, scheduleCallback$2 = Scheduler.unstable_scheduleCallback, NormalPriority = Scheduler.unstable_NormalPriority, CacheContext = {
    $$typeof: REACT_CONTEXT_TYPE,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function createCache() {
    return {
      controller: new AbortControllerLocal(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function releaseCache(cache) {
    cache.refCount--;
    0 === cache.refCount && scheduleCallback$2(NormalPriority, function() {
      cache.controller.abort();
    });
  }
  var currentEntangledListeners = null, currentEntangledPendingCount = 0, currentEntangledLane = 0, currentEntangledActionThenable = null;
  function entangleAsyncAction(transition, thenable) {
    if (null === currentEntangledListeners) {
      var entangledListeners = currentEntangledListeners = [];
      currentEntangledPendingCount = 0;
      currentEntangledLane = requestTransitionLane();
      currentEntangledActionThenable = {
        status: "pending",
        value: void 0,
        then: function(resolve) {
          entangledListeners.push(resolve);
        }
      };
    }
    currentEntangledPendingCount++;
    thenable.then(pingEngtangledActionScope, pingEngtangledActionScope);
    return thenable;
  }
  function pingEngtangledActionScope() {
    if (0 === --currentEntangledPendingCount && null !== currentEntangledListeners) {
      null !== currentEntangledActionThenable && (currentEntangledActionThenable.status = "fulfilled");
      var listeners = currentEntangledListeners;
      currentEntangledListeners = null;
      currentEntangledLane = 0;
      currentEntangledActionThenable = null;
      for (var i = 0; i < listeners.length; i++) (0, listeners[i])();
    }
  }
  function chainThenableValue(thenable, result) {
    var listeners = [], thenableWithOverride = {
      status: "pending",
      value: null,
      reason: null,
      then: function(resolve) {
        listeners.push(resolve);
      }
    };
    thenable.then(
      function() {
        thenableWithOverride.status = "fulfilled";
        thenableWithOverride.value = result;
        for (var i = 0; i < listeners.length; i++) (0, listeners[i])(result);
      },
      function(error) {
        thenableWithOverride.status = "rejected";
        thenableWithOverride.reason = error;
        for (error = 0; error < listeners.length; error++)
          (0, listeners[error])(void 0);
      }
    );
    return thenableWithOverride;
  }
  var prevOnStartTransitionFinish = ReactSharedInternals.S;
  ReactSharedInternals.S = function(transition, returnValue) {
    globalMostRecentTransitionTime = now();
    "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && entangleAsyncAction(transition, returnValue);
    null !== prevOnStartTransitionFinish && prevOnStartTransitionFinish(transition, returnValue);
  };
  var resumedCache = createCursor(null);
  function peekCacheFromPool() {
    var cacheResumedFromPreviousRender = resumedCache.current;
    return null !== cacheResumedFromPreviousRender ? cacheResumedFromPreviousRender : workInProgressRoot.pooledCache;
  }
  function pushTransition(offscreenWorkInProgress, prevCachePool) {
    null === prevCachePool ? push(resumedCache, resumedCache.current) : push(resumedCache, prevCachePool.pool);
  }
  function getSuspendedCache() {
    var cacheFromPool = peekCacheFromPool();
    return null === cacheFromPool ? null : { parent: CacheContext._currentValue, pool: cacheFromPool };
  }
  var SuspenseException = Error(formatProdErrorMessage(460)), SuspenseyCommitException = Error(formatProdErrorMessage(474)), SuspenseActionException = Error(formatProdErrorMessage(542)), noopSuspenseyCommitThenable = { then: function() {
  } };
  function isThenableResolved(thenable) {
    thenable = thenable.status;
    return "fulfilled" === thenable || "rejected" === thenable;
  }
  function trackUsedThenable(thenableState2, thenable, index2) {
    index2 = thenableState2[index2];
    void 0 === index2 ? thenableState2.push(thenable) : index2 !== thenable && (thenable.then(noop$1, noop$1), thenable = index2);
    switch (thenable.status) {
      case "fulfilled":
        return thenable.value;
      case "rejected":
        throw thenableState2 = thenable.reason, checkIfUseWrappedInAsyncCatch(thenableState2), thenableState2;
      default:
        if ("string" === typeof thenable.status) thenable.then(noop$1, noop$1);
        else {
          thenableState2 = workInProgressRoot;
          if (null !== thenableState2 && 100 < thenableState2.shellSuspendCounter)
            throw Error(formatProdErrorMessage(482));
          thenableState2 = thenable;
          thenableState2.status = "pending";
          thenableState2.then(
            function(fulfilledValue) {
              if ("pending" === thenable.status) {
                var fulfilledThenable = thenable;
                fulfilledThenable.status = "fulfilled";
                fulfilledThenable.value = fulfilledValue;
              }
            },
            function(error) {
              if ("pending" === thenable.status) {
                var rejectedThenable = thenable;
                rejectedThenable.status = "rejected";
                rejectedThenable.reason = error;
              }
            }
          );
        }
        switch (thenable.status) {
          case "fulfilled":
            return thenable.value;
          case "rejected":
            throw thenableState2 = thenable.reason, checkIfUseWrappedInAsyncCatch(thenableState2), thenableState2;
        }
        suspendedThenable = thenable;
        throw SuspenseException;
    }
  }
  function resolveLazy(lazyType) {
    try {
      var init = lazyType._init;
      return init(lazyType._payload);
    } catch (x) {
      if (null !== x && "object" === typeof x && "function" === typeof x.then)
        throw suspendedThenable = x, SuspenseException;
      throw x;
    }
  }
  var suspendedThenable = null;
  function getSuspendedThenable() {
    if (null === suspendedThenable) throw Error(formatProdErrorMessage(459));
    var thenable = suspendedThenable;
    suspendedThenable = null;
    return thenable;
  }
  function checkIfUseWrappedInAsyncCatch(rejectedReason) {
    if (rejectedReason === SuspenseException || rejectedReason === SuspenseActionException)
      throw Error(formatProdErrorMessage(483));
  }
  var thenableState$1 = null, thenableIndexCounter$1 = 0;
  function unwrapThenable(thenable) {
    var index2 = thenableIndexCounter$1;
    thenableIndexCounter$1 += 1;
    null === thenableState$1 && (thenableState$1 = []);
    return trackUsedThenable(thenableState$1, thenable, index2);
  }
  function coerceRef(workInProgress2, element) {
    element = element.props.ref;
    workInProgress2.ref = void 0 !== element ? element : null;
  }
  function throwOnInvalidObjectTypeImpl(returnFiber, newChild) {
    if (newChild.$$typeof === REACT_LEGACY_ELEMENT_TYPE)
      throw Error(formatProdErrorMessage(525));
    returnFiber = Object.prototype.toString.call(newChild);
    throw Error(
      formatProdErrorMessage(
        31,
        "[object Object]" === returnFiber ? "object with keys {" + Object.keys(newChild).join(", ") + "}" : returnFiber
      )
    );
  }
  function createChildReconciler(shouldTrackSideEffects) {
    function deleteChild(returnFiber, childToDelete) {
      if (shouldTrackSideEffects) {
        var deletions = returnFiber.deletions;
        null === deletions ? (returnFiber.deletions = [childToDelete], returnFiber.flags |= 16) : deletions.push(childToDelete);
      }
    }
    function deleteRemainingChildren(returnFiber, currentFirstChild) {
      if (!shouldTrackSideEffects) return null;
      for (; null !== currentFirstChild; )
        deleteChild(returnFiber, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
      return null;
    }
    function mapRemainingChildren(currentFirstChild) {
      for (var existingChildren = /* @__PURE__ */ new Map(); null !== currentFirstChild; )
        null !== currentFirstChild.key ? existingChildren.set(currentFirstChild.key, currentFirstChild) : existingChildren.set(currentFirstChild.index, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
      return existingChildren;
    }
    function useFiber(fiber, pendingProps) {
      fiber = createWorkInProgress(fiber, pendingProps);
      fiber.index = 0;
      fiber.sibling = null;
      return fiber;
    }
    function placeChild(newFiber, lastPlacedIndex, newIndex) {
      newFiber.index = newIndex;
      if (!shouldTrackSideEffects)
        return newFiber.flags |= 1048576, lastPlacedIndex;
      newIndex = newFiber.alternate;
      if (null !== newIndex)
        return newIndex = newIndex.index, newIndex < lastPlacedIndex ? (newFiber.flags |= 67108866, lastPlacedIndex) : newIndex;
      newFiber.flags |= 67108866;
      return lastPlacedIndex;
    }
    function placeSingleChild(newFiber) {
      shouldTrackSideEffects && null === newFiber.alternate && (newFiber.flags |= 67108866);
      return newFiber;
    }
    function updateTextNode(returnFiber, current, textContent, lanes) {
      if (null === current || 6 !== current.tag)
        return current = createFiberFromText(textContent, returnFiber.mode, lanes), current.return = returnFiber, current;
      current = useFiber(current, textContent);
      current.return = returnFiber;
      return current;
    }
    function updateElement(returnFiber, current, element, lanes) {
      var elementType = element.type;
      if (elementType === REACT_FRAGMENT_TYPE)
        return updateFragment(
          returnFiber,
          current,
          element.props.children,
          lanes,
          element.key
        );
      if (null !== current && (current.elementType === elementType || "object" === typeof elementType && null !== elementType && elementType.$$typeof === REACT_LAZY_TYPE && resolveLazy(elementType) === current.type))
        return current = useFiber(current, element.props), coerceRef(current, element), current.return = returnFiber, current;
      current = createFiberFromTypeAndProps(
        element.type,
        element.key,
        element.props,
        null,
        returnFiber.mode,
        lanes
      );
      coerceRef(current, element);
      current.return = returnFiber;
      return current;
    }
    function updatePortal(returnFiber, current, portal, lanes) {
      if (null === current || 4 !== current.tag || current.stateNode.containerInfo !== portal.containerInfo || current.stateNode.implementation !== portal.implementation)
        return current = createFiberFromPortal(portal, returnFiber.mode, lanes), current.return = returnFiber, current;
      current = useFiber(current, portal.children || []);
      current.return = returnFiber;
      return current;
    }
    function updateFragment(returnFiber, current, fragment, lanes, key) {
      if (null === current || 7 !== current.tag)
        return current = createFiberFromFragment(
          fragment,
          returnFiber.mode,
          lanes,
          key
        ), current.return = returnFiber, current;
      current = useFiber(current, fragment);
      current.return = returnFiber;
      return current;
    }
    function createChild(returnFiber, newChild, lanes) {
      if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild)
        return newChild = createFiberFromText(
          "" + newChild,
          returnFiber.mode,
          lanes
        ), newChild.return = returnFiber, newChild;
      if ("object" === typeof newChild && null !== newChild) {
        switch (newChild.$$typeof) {
          case REACT_ELEMENT_TYPE:
            return lanes = createFiberFromTypeAndProps(
              newChild.type,
              newChild.key,
              newChild.props,
              null,
              returnFiber.mode,
              lanes
            ), coerceRef(lanes, newChild), lanes.return = returnFiber, lanes;
          case REACT_PORTAL_TYPE:
            return newChild = createFiberFromPortal(
              newChild,
              returnFiber.mode,
              lanes
            ), newChild.return = returnFiber, newChild;
          case REACT_LAZY_TYPE:
            return newChild = resolveLazy(newChild), createChild(returnFiber, newChild, lanes);
        }
        if (isArrayImpl(newChild) || getIteratorFn(newChild))
          return newChild = createFiberFromFragment(
            newChild,
            returnFiber.mode,
            lanes,
            null
          ), newChild.return = returnFiber, newChild;
        if ("function" === typeof newChild.then)
          return createChild(returnFiber, unwrapThenable(newChild), lanes);
        if (newChild.$$typeof === REACT_CONTEXT_TYPE)
          return createChild(
            returnFiber,
            readContextDuringReconciliation(returnFiber, newChild),
            lanes
          );
        throwOnInvalidObjectTypeImpl(returnFiber, newChild);
      }
      return null;
    }
    function updateSlot(returnFiber, oldFiber, newChild, lanes) {
      var key = null !== oldFiber ? oldFiber.key : null;
      if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild)
        return null !== key ? null : updateTextNode(returnFiber, oldFiber, "" + newChild, lanes);
      if ("object" === typeof newChild && null !== newChild) {
        switch (newChild.$$typeof) {
          case REACT_ELEMENT_TYPE:
            return newChild.key === key ? updateElement(returnFiber, oldFiber, newChild, lanes) : null;
          case REACT_PORTAL_TYPE:
            return newChild.key === key ? updatePortal(returnFiber, oldFiber, newChild, lanes) : null;
          case REACT_LAZY_TYPE:
            return newChild = resolveLazy(newChild), updateSlot(returnFiber, oldFiber, newChild, lanes);
        }
        if (isArrayImpl(newChild) || getIteratorFn(newChild))
          return null !== key ? null : updateFragment(returnFiber, oldFiber, newChild, lanes, null);
        if ("function" === typeof newChild.then)
          return updateSlot(
            returnFiber,
            oldFiber,
            unwrapThenable(newChild),
            lanes
          );
        if (newChild.$$typeof === REACT_CONTEXT_TYPE)
          return updateSlot(
            returnFiber,
            oldFiber,
            readContextDuringReconciliation(returnFiber, newChild),
            lanes
          );
        throwOnInvalidObjectTypeImpl(returnFiber, newChild);
      }
      return null;
    }
    function updateFromMap(existingChildren, returnFiber, newIdx, newChild, lanes) {
      if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild)
        return existingChildren = existingChildren.get(newIdx) || null, updateTextNode(returnFiber, existingChildren, "" + newChild, lanes);
      if ("object" === typeof newChild && null !== newChild) {
        switch (newChild.$$typeof) {
          case REACT_ELEMENT_TYPE:
            return existingChildren = existingChildren.get(
              null === newChild.key ? newIdx : newChild.key
            ) || null, updateElement(returnFiber, existingChildren, newChild, lanes);
          case REACT_PORTAL_TYPE:
            return existingChildren = existingChildren.get(
              null === newChild.key ? newIdx : newChild.key
            ) || null, updatePortal(returnFiber, existingChildren, newChild, lanes);
          case REACT_LAZY_TYPE:
            return newChild = resolveLazy(newChild), updateFromMap(
              existingChildren,
              returnFiber,
              newIdx,
              newChild,
              lanes
            );
        }
        if (isArrayImpl(newChild) || getIteratorFn(newChild))
          return existingChildren = existingChildren.get(newIdx) || null, updateFragment(returnFiber, existingChildren, newChild, lanes, null);
        if ("function" === typeof newChild.then)
          return updateFromMap(
            existingChildren,
            returnFiber,
            newIdx,
            unwrapThenable(newChild),
            lanes
          );
        if (newChild.$$typeof === REACT_CONTEXT_TYPE)
          return updateFromMap(
            existingChildren,
            returnFiber,
            newIdx,
            readContextDuringReconciliation(returnFiber, newChild),
            lanes
          );
        throwOnInvalidObjectTypeImpl(returnFiber, newChild);
      }
      return null;
    }
    function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, lanes) {
      for (var resultingFirstChild = null, previousNewFiber = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null; null !== oldFiber && newIdx < newChildren.length; newIdx++) {
        oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
        var newFiber = updateSlot(
          returnFiber,
          oldFiber,
          newChildren[newIdx],
          lanes
        );
        if (null === newFiber) {
          null === oldFiber && (oldFiber = nextOldFiber);
          break;
        }
        shouldTrackSideEffects && oldFiber && null === newFiber.alternate && deleteChild(returnFiber, oldFiber);
        currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
        null === previousNewFiber ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber;
        previousNewFiber = newFiber;
        oldFiber = nextOldFiber;
      }
      if (newIdx === newChildren.length)
        return deleteRemainingChildren(returnFiber, oldFiber), isHydrating && pushTreeFork(returnFiber, newIdx), resultingFirstChild;
      if (null === oldFiber) {
        for (; newIdx < newChildren.length; newIdx++)
          oldFiber = createChild(returnFiber, newChildren[newIdx], lanes), null !== oldFiber && (currentFirstChild = placeChild(
            oldFiber,
            currentFirstChild,
            newIdx
          ), null === previousNewFiber ? resultingFirstChild = oldFiber : previousNewFiber.sibling = oldFiber, previousNewFiber = oldFiber);
        isHydrating && pushTreeFork(returnFiber, newIdx);
        return resultingFirstChild;
      }
      for (oldFiber = mapRemainingChildren(oldFiber); newIdx < newChildren.length; newIdx++)
        nextOldFiber = updateFromMap(
          oldFiber,
          returnFiber,
          newIdx,
          newChildren[newIdx],
          lanes
        ), null !== nextOldFiber && (shouldTrackSideEffects && null !== nextOldFiber.alternate && oldFiber.delete(
          null === nextOldFiber.key ? newIdx : nextOldFiber.key
        ), currentFirstChild = placeChild(
          nextOldFiber,
          currentFirstChild,
          newIdx
        ), null === previousNewFiber ? resultingFirstChild = nextOldFiber : previousNewFiber.sibling = nextOldFiber, previousNewFiber = nextOldFiber);
      shouldTrackSideEffects && oldFiber.forEach(function(child) {
        return deleteChild(returnFiber, child);
      });
      isHydrating && pushTreeFork(returnFiber, newIdx);
      return resultingFirstChild;
    }
    function reconcileChildrenIterator(returnFiber, currentFirstChild, newChildren, lanes) {
      if (null == newChildren) throw Error(formatProdErrorMessage(151));
      for (var resultingFirstChild = null, previousNewFiber = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null, step = newChildren.next(); null !== oldFiber && !step.done; newIdx++, step = newChildren.next()) {
        oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
        var newFiber = updateSlot(returnFiber, oldFiber, step.value, lanes);
        if (null === newFiber) {
          null === oldFiber && (oldFiber = nextOldFiber);
          break;
        }
        shouldTrackSideEffects && oldFiber && null === newFiber.alternate && deleteChild(returnFiber, oldFiber);
        currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
        null === previousNewFiber ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber;
        previousNewFiber = newFiber;
        oldFiber = nextOldFiber;
      }
      if (step.done)
        return deleteRemainingChildren(returnFiber, oldFiber), isHydrating && pushTreeFork(returnFiber, newIdx), resultingFirstChild;
      if (null === oldFiber) {
        for (; !step.done; newIdx++, step = newChildren.next())
          step = createChild(returnFiber, step.value, lanes), null !== step && (currentFirstChild = placeChild(step, currentFirstChild, newIdx), null === previousNewFiber ? resultingFirstChild = step : previousNewFiber.sibling = step, previousNewFiber = step);
        isHydrating && pushTreeFork(returnFiber, newIdx);
        return resultingFirstChild;
      }
      for (oldFiber = mapRemainingChildren(oldFiber); !step.done; newIdx++, step = newChildren.next())
        step = updateFromMap(oldFiber, returnFiber, newIdx, step.value, lanes), null !== step && (shouldTrackSideEffects && null !== step.alternate && oldFiber.delete(null === step.key ? newIdx : step.key), currentFirstChild = placeChild(step, currentFirstChild, newIdx), null === previousNewFiber ? resultingFirstChild = step : previousNewFiber.sibling = step, previousNewFiber = step);
      shouldTrackSideEffects && oldFiber.forEach(function(child) {
        return deleteChild(returnFiber, child);
      });
      isHydrating && pushTreeFork(returnFiber, newIdx);
      return resultingFirstChild;
    }
    function reconcileChildFibersImpl(returnFiber, currentFirstChild, newChild, lanes) {
      "object" === typeof newChild && null !== newChild && newChild.type === REACT_FRAGMENT_TYPE && null === newChild.key && (newChild = newChild.props.children);
      if ("object" === typeof newChild && null !== newChild) {
        switch (newChild.$$typeof) {
          case REACT_ELEMENT_TYPE:
            a: {
              for (var key = newChild.key; null !== currentFirstChild; ) {
                if (currentFirstChild.key === key) {
                  key = newChild.type;
                  if (key === REACT_FRAGMENT_TYPE) {
                    if (7 === currentFirstChild.tag) {
                      deleteRemainingChildren(
                        returnFiber,
                        currentFirstChild.sibling
                      );
                      lanes = useFiber(
                        currentFirstChild,
                        newChild.props.children
                      );
                      lanes.return = returnFiber;
                      returnFiber = lanes;
                      break a;
                    }
                  } else if (currentFirstChild.elementType === key || "object" === typeof key && null !== key && key.$$typeof === REACT_LAZY_TYPE && resolveLazy(key) === currentFirstChild.type) {
                    deleteRemainingChildren(
                      returnFiber,
                      currentFirstChild.sibling
                    );
                    lanes = useFiber(currentFirstChild, newChild.props);
                    coerceRef(lanes, newChild);
                    lanes.return = returnFiber;
                    returnFiber = lanes;
                    break a;
                  }
                  deleteRemainingChildren(returnFiber, currentFirstChild);
                  break;
                } else deleteChild(returnFiber, currentFirstChild);
                currentFirstChild = currentFirstChild.sibling;
              }
              newChild.type === REACT_FRAGMENT_TYPE ? (lanes = createFiberFromFragment(
                newChild.props.children,
                returnFiber.mode,
                lanes,
                newChild.key
              ), lanes.return = returnFiber, returnFiber = lanes) : (lanes = createFiberFromTypeAndProps(
                newChild.type,
                newChild.key,
                newChild.props,
                null,
                returnFiber.mode,
                lanes
              ), coerceRef(lanes, newChild), lanes.return = returnFiber, returnFiber = lanes);
            }
            return placeSingleChild(returnFiber);
          case REACT_PORTAL_TYPE:
            a: {
              for (key = newChild.key; null !== currentFirstChild; ) {
                if (currentFirstChild.key === key)
                  if (4 === currentFirstChild.tag && currentFirstChild.stateNode.containerInfo === newChild.containerInfo && currentFirstChild.stateNode.implementation === newChild.implementation) {
                    deleteRemainingChildren(
                      returnFiber,
                      currentFirstChild.sibling
                    );
                    lanes = useFiber(currentFirstChild, newChild.children || []);
                    lanes.return = returnFiber;
                    returnFiber = lanes;
                    break a;
                  } else {
                    deleteRemainingChildren(returnFiber, currentFirstChild);
                    break;
                  }
                else deleteChild(returnFiber, currentFirstChild);
                currentFirstChild = currentFirstChild.sibling;
              }
              lanes = createFiberFromPortal(newChild, returnFiber.mode, lanes);
              lanes.return = returnFiber;
              returnFiber = lanes;
            }
            return placeSingleChild(returnFiber);
          case REACT_LAZY_TYPE:
            return newChild = resolveLazy(newChild), reconcileChildFibersImpl(
              returnFiber,
              currentFirstChild,
              newChild,
              lanes
            );
        }
        if (isArrayImpl(newChild))
          return reconcileChildrenArray(
            returnFiber,
            currentFirstChild,
            newChild,
            lanes
          );
        if (getIteratorFn(newChild)) {
          key = getIteratorFn(newChild);
          if ("function" !== typeof key) throw Error(formatProdErrorMessage(150));
          newChild = key.call(newChild);
          return reconcileChildrenIterator(
            returnFiber,
            currentFirstChild,
            newChild,
            lanes
          );
        }
        if ("function" === typeof newChild.then)
          return reconcileChildFibersImpl(
            returnFiber,
            currentFirstChild,
            unwrapThenable(newChild),
            lanes
          );
        if (newChild.$$typeof === REACT_CONTEXT_TYPE)
          return reconcileChildFibersImpl(
            returnFiber,
            currentFirstChild,
            readContextDuringReconciliation(returnFiber, newChild),
            lanes
          );
        throwOnInvalidObjectTypeImpl(returnFiber, newChild);
      }
      return "string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild ? (newChild = "" + newChild, null !== currentFirstChild && 6 === currentFirstChild.tag ? (deleteRemainingChildren(returnFiber, currentFirstChild.sibling), lanes = useFiber(currentFirstChild, newChild), lanes.return = returnFiber, returnFiber = lanes) : (deleteRemainingChildren(returnFiber, currentFirstChild), lanes = createFiberFromText(newChild, returnFiber.mode, lanes), lanes.return = returnFiber, returnFiber = lanes), placeSingleChild(returnFiber)) : deleteRemainingChildren(returnFiber, currentFirstChild);
    }
    return function(returnFiber, currentFirstChild, newChild, lanes) {
      try {
        thenableIndexCounter$1 = 0;
        var firstChildFiber = reconcileChildFibersImpl(
          returnFiber,
          currentFirstChild,
          newChild,
          lanes
        );
        thenableState$1 = null;
        return firstChildFiber;
      } catch (x) {
        if (x === SuspenseException || x === SuspenseActionException) throw x;
        var fiber = createFiberImplClass(29, x, null, returnFiber.mode);
        fiber.lanes = lanes;
        fiber.return = returnFiber;
        return fiber;
      } finally {
      }
    };
  }
  var reconcileChildFibers = createChildReconciler(true), mountChildFibers = createChildReconciler(false), hasForceUpdate = false;
  function initializeUpdateQueue(fiber) {
    fiber.updateQueue = {
      baseState: fiber.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function cloneUpdateQueue(current, workInProgress2) {
    current = current.updateQueue;
    workInProgress2.updateQueue === current && (workInProgress2.updateQueue = {
      baseState: current.baseState,
      firstBaseUpdate: current.firstBaseUpdate,
      lastBaseUpdate: current.lastBaseUpdate,
      shared: current.shared,
      callbacks: null
    });
  }
  function createUpdate(lane) {
    return { lane, tag: 0, payload: null, callback: null, next: null };
  }
  function enqueueUpdate(fiber, update, lane) {
    var updateQueue = fiber.updateQueue;
    if (null === updateQueue) return null;
    updateQueue = updateQueue.shared;
    if (0 !== (executionContext & 2)) {
      var pending = updateQueue.pending;
      null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
      updateQueue.pending = update;
      update = getRootForUpdatedFiber(fiber);
      markUpdateLaneFromFiberToRoot(fiber, null, lane);
      return update;
    }
    enqueueUpdate$1(fiber, updateQueue, update, lane);
    return getRootForUpdatedFiber(fiber);
  }
  function entangleTransitions(root2, fiber, lane) {
    fiber = fiber.updateQueue;
    if (null !== fiber && (fiber = fiber.shared, 0 !== (lane & 4194048))) {
      var queueLanes = fiber.lanes;
      queueLanes &= root2.pendingLanes;
      lane |= queueLanes;
      fiber.lanes = lane;
      markRootEntangled(root2, lane);
    }
  }
  function enqueueCapturedUpdate(workInProgress2, capturedUpdate) {
    var queue = workInProgress2.updateQueue, current = workInProgress2.alternate;
    if (null !== current && (current = current.updateQueue, queue === current)) {
      var newFirst = null, newLast = null;
      queue = queue.firstBaseUpdate;
      if (null !== queue) {
        do {
          var clone = {
            lane: queue.lane,
            tag: queue.tag,
            payload: queue.payload,
            callback: null,
            next: null
          };
          null === newLast ? newFirst = newLast = clone : newLast = newLast.next = clone;
          queue = queue.next;
        } while (null !== queue);
        null === newLast ? newFirst = newLast = capturedUpdate : newLast = newLast.next = capturedUpdate;
      } else newFirst = newLast = capturedUpdate;
      queue = {
        baseState: current.baseState,
        firstBaseUpdate: newFirst,
        lastBaseUpdate: newLast,
        shared: current.shared,
        callbacks: current.callbacks
      };
      workInProgress2.updateQueue = queue;
      return;
    }
    workInProgress2 = queue.lastBaseUpdate;
    null === workInProgress2 ? queue.firstBaseUpdate = capturedUpdate : workInProgress2.next = capturedUpdate;
    queue.lastBaseUpdate = capturedUpdate;
  }
  var didReadFromEntangledAsyncAction = false;
  function suspendIfUpdateReadFromEntangledAsyncAction() {
    if (didReadFromEntangledAsyncAction) {
      var entangledActionThenable = currentEntangledActionThenable;
      if (null !== entangledActionThenable) throw entangledActionThenable;
    }
  }
  function processUpdateQueue(workInProgress$jscomp$0, props, instance$jscomp$0, renderLanes2) {
    didReadFromEntangledAsyncAction = false;
    var queue = workInProgress$jscomp$0.updateQueue;
    hasForceUpdate = false;
    var firstBaseUpdate = queue.firstBaseUpdate, lastBaseUpdate = queue.lastBaseUpdate, pendingQueue = queue.shared.pending;
    if (null !== pendingQueue) {
      queue.shared.pending = null;
      var lastPendingUpdate = pendingQueue, firstPendingUpdate = lastPendingUpdate.next;
      lastPendingUpdate.next = null;
      null === lastBaseUpdate ? firstBaseUpdate = firstPendingUpdate : lastBaseUpdate.next = firstPendingUpdate;
      lastBaseUpdate = lastPendingUpdate;
      var current = workInProgress$jscomp$0.alternate;
      null !== current && (current = current.updateQueue, pendingQueue = current.lastBaseUpdate, pendingQueue !== lastBaseUpdate && (null === pendingQueue ? current.firstBaseUpdate = firstPendingUpdate : pendingQueue.next = firstPendingUpdate, current.lastBaseUpdate = lastPendingUpdate));
    }
    if (null !== firstBaseUpdate) {
      var newState = queue.baseState;
      lastBaseUpdate = 0;
      current = firstPendingUpdate = lastPendingUpdate = null;
      pendingQueue = firstBaseUpdate;
      do {
        var updateLane = pendingQueue.lane & -536870913, isHiddenUpdate = updateLane !== pendingQueue.lane;
        if (isHiddenUpdate ? (workInProgressRootRenderLanes & updateLane) === updateLane : (renderLanes2 & updateLane) === updateLane) {
          0 !== updateLane && updateLane === currentEntangledLane && (didReadFromEntangledAsyncAction = true);
          null !== current && (current = current.next = {
            lane: 0,
            tag: pendingQueue.tag,
            payload: pendingQueue.payload,
            callback: null,
            next: null
          });
          a: {
            var workInProgress2 = workInProgress$jscomp$0, update = pendingQueue;
            updateLane = props;
            var instance = instance$jscomp$0;
            switch (update.tag) {
              case 1:
                workInProgress2 = update.payload;
                if ("function" === typeof workInProgress2) {
                  newState = workInProgress2.call(instance, newState, updateLane);
                  break a;
                }
                newState = workInProgress2;
                break a;
              case 3:
                workInProgress2.flags = workInProgress2.flags & -65537 | 128;
              case 0:
                workInProgress2 = update.payload;
                updateLane = "function" === typeof workInProgress2 ? workInProgress2.call(instance, newState, updateLane) : workInProgress2;
                if (null === updateLane || void 0 === updateLane) break a;
                newState = assign({}, newState, updateLane);
                break a;
              case 2:
                hasForceUpdate = true;
            }
          }
          updateLane = pendingQueue.callback;
          null !== updateLane && (workInProgress$jscomp$0.flags |= 64, isHiddenUpdate && (workInProgress$jscomp$0.flags |= 8192), isHiddenUpdate = queue.callbacks, null === isHiddenUpdate ? queue.callbacks = [updateLane] : isHiddenUpdate.push(updateLane));
        } else
          isHiddenUpdate = {
            lane: updateLane,
            tag: pendingQueue.tag,
            payload: pendingQueue.payload,
            callback: pendingQueue.callback,
            next: null
          }, null === current ? (firstPendingUpdate = current = isHiddenUpdate, lastPendingUpdate = newState) : current = current.next = isHiddenUpdate, lastBaseUpdate |= updateLane;
        pendingQueue = pendingQueue.next;
        if (null === pendingQueue)
          if (pendingQueue = queue.shared.pending, null === pendingQueue)
            break;
          else
            isHiddenUpdate = pendingQueue, pendingQueue = isHiddenUpdate.next, isHiddenUpdate.next = null, queue.lastBaseUpdate = isHiddenUpdate, queue.shared.pending = null;
      } while (1);
      null === current && (lastPendingUpdate = newState);
      queue.baseState = lastPendingUpdate;
      queue.firstBaseUpdate = firstPendingUpdate;
      queue.lastBaseUpdate = current;
      null === firstBaseUpdate && (queue.shared.lanes = 0);
      workInProgressRootSkippedLanes |= lastBaseUpdate;
      workInProgress$jscomp$0.lanes = lastBaseUpdate;
      workInProgress$jscomp$0.memoizedState = newState;
    }
  }
  function callCallback(callback, context) {
    if ("function" !== typeof callback)
      throw Error(formatProdErrorMessage(191, callback));
    callback.call(context);
  }
  function commitCallbacks(updateQueue, context) {
    var callbacks = updateQueue.callbacks;
    if (null !== callbacks)
      for (updateQueue.callbacks = null, updateQueue = 0; updateQueue < callbacks.length; updateQueue++)
        callCallback(callbacks[updateQueue], context);
  }
  var currentTreeHiddenStackCursor = createCursor(null), prevEntangledRenderLanesCursor = createCursor(0);
  function pushHiddenContext(fiber, context) {
    fiber = entangledRenderLanes;
    push(prevEntangledRenderLanesCursor, fiber);
    push(currentTreeHiddenStackCursor, context);
    entangledRenderLanes = fiber | context.baseLanes;
  }
  function reuseHiddenContextOnStack() {
    push(prevEntangledRenderLanesCursor, entangledRenderLanes);
    push(currentTreeHiddenStackCursor, currentTreeHiddenStackCursor.current);
  }
  function popHiddenContext() {
    entangledRenderLanes = prevEntangledRenderLanesCursor.current;
    pop(currentTreeHiddenStackCursor);
    pop(prevEntangledRenderLanesCursor);
  }
  var suspenseHandlerStackCursor = createCursor(null), shellBoundary = null;
  function pushPrimaryTreeSuspenseHandler(handler) {
    var current = handler.alternate;
    push(suspenseStackCursor, suspenseStackCursor.current & 1);
    push(suspenseHandlerStackCursor, handler);
    null === shellBoundary && (null === current || null !== currentTreeHiddenStackCursor.current ? shellBoundary = handler : null !== current.memoizedState && (shellBoundary = handler));
  }
  function pushDehydratedActivitySuspenseHandler(fiber) {
    push(suspenseStackCursor, suspenseStackCursor.current);
    push(suspenseHandlerStackCursor, fiber);
    null === shellBoundary && (shellBoundary = fiber);
  }
  function pushOffscreenSuspenseHandler(fiber) {
    22 === fiber.tag ? (push(suspenseStackCursor, suspenseStackCursor.current), push(suspenseHandlerStackCursor, fiber), null === shellBoundary && (shellBoundary = fiber)) : reuseSuspenseHandlerOnStack();
  }
  function reuseSuspenseHandlerOnStack() {
    push(suspenseStackCursor, suspenseStackCursor.current);
    push(suspenseHandlerStackCursor, suspenseHandlerStackCursor.current);
  }
  function popSuspenseHandler(fiber) {
    pop(suspenseHandlerStackCursor);
    shellBoundary === fiber && (shellBoundary = null);
    pop(suspenseStackCursor);
  }
  var suspenseStackCursor = createCursor(0);
  function findFirstSuspended(row) {
    for (var node = row; null !== node; ) {
      if (13 === node.tag) {
        var state = node.memoizedState;
        if (null !== state && (state = state.dehydrated, null === state || isSuspenseInstancePending(state) || isSuspenseInstanceFallback(state)))
          return node;
      } else if (19 === node.tag && ("forwards" === node.memoizedProps.revealOrder || "backwards" === node.memoizedProps.revealOrder || "unstable_legacy-backwards" === node.memoizedProps.revealOrder || "together" === node.memoizedProps.revealOrder)) {
        if (0 !== (node.flags & 128)) return node;
      } else if (null !== node.child) {
        node.child.return = node;
        node = node.child;
        continue;
      }
      if (node === row) break;
      for (; null === node.sibling; ) {
        if (null === node.return || node.return === row) return null;
        node = node.return;
      }
      node.sibling.return = node.return;
      node = node.sibling;
    }
    return null;
  }
  var renderLanes = 0, currentlyRenderingFiber = null, currentHook = null, workInProgressHook = null, didScheduleRenderPhaseUpdate = false, didScheduleRenderPhaseUpdateDuringThisPass = false, shouldDoubleInvokeUserFnsInHooksDEV = false, localIdCounter = 0, thenableIndexCounter = 0, thenableState = null, globalClientIdCounter = 0;
  function throwInvalidHookError() {
    throw Error(formatProdErrorMessage(321));
  }
  function areHookInputsEqual(nextDeps, prevDeps) {
    if (null === prevDeps) return false;
    for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++)
      if (!objectIs(nextDeps[i], prevDeps[i])) return false;
    return true;
  }
  function renderWithHooks(current, workInProgress2, Component, props, secondArg, nextRenderLanes) {
    renderLanes = nextRenderLanes;
    currentlyRenderingFiber = workInProgress2;
    workInProgress2.memoizedState = null;
    workInProgress2.updateQueue = null;
    workInProgress2.lanes = 0;
    ReactSharedInternals.H = null === current || null === current.memoizedState ? HooksDispatcherOnMount : HooksDispatcherOnUpdate;
    shouldDoubleInvokeUserFnsInHooksDEV = false;
    nextRenderLanes = Component(props, secondArg);
    shouldDoubleInvokeUserFnsInHooksDEV = false;
    didScheduleRenderPhaseUpdateDuringThisPass && (nextRenderLanes = renderWithHooksAgain(
      workInProgress2,
      Component,
      props,
      secondArg
    ));
    finishRenderingHooks(current);
    return nextRenderLanes;
  }
  function finishRenderingHooks(current) {
    ReactSharedInternals.H = ContextOnlyDispatcher;
    var didRenderTooFewHooks = null !== currentHook && null !== currentHook.next;
    renderLanes = 0;
    workInProgressHook = currentHook = currentlyRenderingFiber = null;
    didScheduleRenderPhaseUpdate = false;
    thenableIndexCounter = 0;
    thenableState = null;
    if (didRenderTooFewHooks) throw Error(formatProdErrorMessage(300));
    null === current || didReceiveUpdate || (current = current.dependencies, null !== current && checkIfContextChanged(current) && (didReceiveUpdate = true));
  }
  function renderWithHooksAgain(workInProgress2, Component, props, secondArg) {
    currentlyRenderingFiber = workInProgress2;
    var numberOfReRenders = 0;
    do {
      didScheduleRenderPhaseUpdateDuringThisPass && (thenableState = null);
      thenableIndexCounter = 0;
      didScheduleRenderPhaseUpdateDuringThisPass = false;
      if (25 <= numberOfReRenders) throw Error(formatProdErrorMessage(301));
      numberOfReRenders += 1;
      workInProgressHook = currentHook = null;
      if (null != workInProgress2.updateQueue) {
        var children = workInProgress2.updateQueue;
        children.lastEffect = null;
        children.events = null;
        children.stores = null;
        null != children.memoCache && (children.memoCache.index = 0);
      }
      ReactSharedInternals.H = HooksDispatcherOnRerender;
      children = Component(props, secondArg);
    } while (didScheduleRenderPhaseUpdateDuringThisPass);
    return children;
  }
  function TransitionAwareHostComponent() {
    var dispatcher = ReactSharedInternals.H, maybeThenable = dispatcher.useState()[0];
    maybeThenable = "function" === typeof maybeThenable.then ? useThenable(maybeThenable) : maybeThenable;
    dispatcher = dispatcher.useState()[0];
    (null !== currentHook ? currentHook.memoizedState : null) !== dispatcher && (currentlyRenderingFiber.flags |= 1024);
    return maybeThenable;
  }
  function checkDidRenderIdHook() {
    var didRenderIdHook = 0 !== localIdCounter;
    localIdCounter = 0;
    return didRenderIdHook;
  }
  function bailoutHooks(current, workInProgress2, lanes) {
    workInProgress2.updateQueue = current.updateQueue;
    workInProgress2.flags &= -2053;
    current.lanes &= ~lanes;
  }
  function resetHooksOnUnwind(workInProgress2) {
    if (didScheduleRenderPhaseUpdate) {
      for (workInProgress2 = workInProgress2.memoizedState; null !== workInProgress2; ) {
        var queue = workInProgress2.queue;
        null !== queue && (queue.pending = null);
        workInProgress2 = workInProgress2.next;
      }
      didScheduleRenderPhaseUpdate = false;
    }
    renderLanes = 0;
    workInProgressHook = currentHook = currentlyRenderingFiber = null;
    didScheduleRenderPhaseUpdateDuringThisPass = false;
    thenableIndexCounter = localIdCounter = 0;
    thenableState = null;
  }
  function mountWorkInProgressHook() {
    var hook = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    null === workInProgressHook ? currentlyRenderingFiber.memoizedState = workInProgressHook = hook : workInProgressHook = workInProgressHook.next = hook;
    return workInProgressHook;
  }
  function updateWorkInProgressHook() {
    if (null === currentHook) {
      var nextCurrentHook = currentlyRenderingFiber.alternate;
      nextCurrentHook = null !== nextCurrentHook ? nextCurrentHook.memoizedState : null;
    } else nextCurrentHook = currentHook.next;
    var nextWorkInProgressHook = null === workInProgressHook ? currentlyRenderingFiber.memoizedState : workInProgressHook.next;
    if (null !== nextWorkInProgressHook)
      workInProgressHook = nextWorkInProgressHook, currentHook = nextCurrentHook;
    else {
      if (null === nextCurrentHook) {
        if (null === currentlyRenderingFiber.alternate)
          throw Error(formatProdErrorMessage(467));
        throw Error(formatProdErrorMessage(310));
      }
      currentHook = nextCurrentHook;
      nextCurrentHook = {
        memoizedState: currentHook.memoizedState,
        baseState: currentHook.baseState,
        baseQueue: currentHook.baseQueue,
        queue: currentHook.queue,
        next: null
      };
      null === workInProgressHook ? currentlyRenderingFiber.memoizedState = workInProgressHook = nextCurrentHook : workInProgressHook = workInProgressHook.next = nextCurrentHook;
    }
    return workInProgressHook;
  }
  function createFunctionComponentUpdateQueue() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function useThenable(thenable) {
    var index2 = thenableIndexCounter;
    thenableIndexCounter += 1;
    null === thenableState && (thenableState = []);
    thenable = trackUsedThenable(thenableState, thenable, index2);
    index2 = currentlyRenderingFiber;
    null === (null === workInProgressHook ? index2.memoizedState : workInProgressHook.next) && (index2 = index2.alternate, ReactSharedInternals.H = null === index2 || null === index2.memoizedState ? HooksDispatcherOnMount : HooksDispatcherOnUpdate);
    return thenable;
  }
  function use(usable) {
    if (null !== usable && "object" === typeof usable) {
      if ("function" === typeof usable.then) return useThenable(usable);
      if (usable.$$typeof === REACT_CONTEXT_TYPE) return readContext(usable);
    }
    throw Error(formatProdErrorMessage(438, String(usable)));
  }
  function useMemoCache(size) {
    var memoCache = null, updateQueue = currentlyRenderingFiber.updateQueue;
    null !== updateQueue && (memoCache = updateQueue.memoCache);
    if (null == memoCache) {
      var current = currentlyRenderingFiber.alternate;
      null !== current && (current = current.updateQueue, null !== current && (current = current.memoCache, null != current && (memoCache = {
        data: current.data.map(function(array) {
          return array.slice();
        }),
        index: 0
      })));
    }
    null == memoCache && (memoCache = { data: [], index: 0 });
    null === updateQueue && (updateQueue = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = updateQueue);
    updateQueue.memoCache = memoCache;
    updateQueue = memoCache.data[memoCache.index];
    if (void 0 === updateQueue)
      for (updateQueue = memoCache.data[memoCache.index] = Array(size), current = 0; current < size; current++)
        updateQueue[current] = REACT_MEMO_CACHE_SENTINEL;
    memoCache.index++;
    return updateQueue;
  }
  function basicStateReducer(state, action) {
    return "function" === typeof action ? action(state) : action;
  }
  function updateReducer(reducer) {
    var hook = updateWorkInProgressHook();
    return updateReducerImpl(hook, currentHook, reducer);
  }
  function updateReducerImpl(hook, current, reducer) {
    var queue = hook.queue;
    if (null === queue) throw Error(formatProdErrorMessage(311));
    queue.lastRenderedReducer = reducer;
    var baseQueue = hook.baseQueue, pendingQueue = queue.pending;
    if (null !== pendingQueue) {
      if (null !== baseQueue) {
        var baseFirst = baseQueue.next;
        baseQueue.next = pendingQueue.next;
        pendingQueue.next = baseFirst;
      }
      current.baseQueue = baseQueue = pendingQueue;
      queue.pending = null;
    }
    pendingQueue = hook.baseState;
    if (null === baseQueue) hook.memoizedState = pendingQueue;
    else {
      current = baseQueue.next;
      var newBaseQueueFirst = baseFirst = null, newBaseQueueLast = null, update = current, didReadFromEntangledAsyncAction$60 = false;
      do {
        var updateLane = update.lane & -536870913;
        if (updateLane !== update.lane ? (workInProgressRootRenderLanes & updateLane) === updateLane : (renderLanes & updateLane) === updateLane) {
          var revertLane = update.revertLane;
          if (0 === revertLane)
            null !== newBaseQueueLast && (newBaseQueueLast = newBaseQueueLast.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: update.action,
              hasEagerState: update.hasEagerState,
              eagerState: update.eagerState,
              next: null
            }), updateLane === currentEntangledLane && (didReadFromEntangledAsyncAction$60 = true);
          else if ((renderLanes & revertLane) === revertLane) {
            update = update.next;
            revertLane === currentEntangledLane && (didReadFromEntangledAsyncAction$60 = true);
            continue;
          } else
            updateLane = {
              lane: 0,
              revertLane: update.revertLane,
              gesture: null,
              action: update.action,
              hasEagerState: update.hasEagerState,
              eagerState: update.eagerState,
              next: null
            }, null === newBaseQueueLast ? (newBaseQueueFirst = newBaseQueueLast = updateLane, baseFirst = pendingQueue) : newBaseQueueLast = newBaseQueueLast.next = updateLane, currentlyRenderingFiber.lanes |= revertLane, workInProgressRootSkippedLanes |= revertLane;
          updateLane = update.action;
          shouldDoubleInvokeUserFnsInHooksDEV && reducer(pendingQueue, updateLane);
          pendingQueue = update.hasEagerState ? update.eagerState : reducer(pendingQueue, updateLane);
        } else
          revertLane = {
            lane: updateLane,
            revertLane: update.revertLane,
            gesture: update.gesture,
            action: update.action,
            hasEagerState: update.hasEagerState,
            eagerState: update.eagerState,
            next: null
          }, null === newBaseQueueLast ? (newBaseQueueFirst = newBaseQueueLast = revertLane, baseFirst = pendingQueue) : newBaseQueueLast = newBaseQueueLast.next = revertLane, currentlyRenderingFiber.lanes |= updateLane, workInProgressRootSkippedLanes |= updateLane;
        update = update.next;
      } while (null !== update && update !== current);
      null === newBaseQueueLast ? baseFirst = pendingQueue : newBaseQueueLast.next = newBaseQueueFirst;
      if (!objectIs(pendingQueue, hook.memoizedState) && (didReceiveUpdate = true, didReadFromEntangledAsyncAction$60 && (reducer = currentEntangledActionThenable, null !== reducer)))
        throw reducer;
      hook.memoizedState = pendingQueue;
      hook.baseState = baseFirst;
      hook.baseQueue = newBaseQueueLast;
      queue.lastRenderedState = pendingQueue;
    }
    null === baseQueue && (queue.lanes = 0);
    return [hook.memoizedState, queue.dispatch];
  }
  function rerenderReducer(reducer) {
    var hook = updateWorkInProgressHook(), queue = hook.queue;
    if (null === queue) throw Error(formatProdErrorMessage(311));
    queue.lastRenderedReducer = reducer;
    var dispatch = queue.dispatch, lastRenderPhaseUpdate = queue.pending, newState = hook.memoizedState;
    if (null !== lastRenderPhaseUpdate) {
      queue.pending = null;
      var update = lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
      do
        newState = reducer(newState, update.action), update = update.next;
      while (update !== lastRenderPhaseUpdate);
      objectIs(newState, hook.memoizedState) || (didReceiveUpdate = true);
      hook.memoizedState = newState;
      null === hook.baseQueue && (hook.baseState = newState);
      queue.lastRenderedState = newState;
    }
    return [newState, dispatch];
  }
  function updateSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
    var fiber = currentlyRenderingFiber, hook = updateWorkInProgressHook(), isHydrating$jscomp$0 = isHydrating;
    if (isHydrating$jscomp$0) {
      if (void 0 === getServerSnapshot) throw Error(formatProdErrorMessage(407));
      getServerSnapshot = getServerSnapshot();
    } else getServerSnapshot = getSnapshot();
    var snapshotChanged = !objectIs(
      (currentHook || hook).memoizedState,
      getServerSnapshot
    );
    snapshotChanged && (hook.memoizedState = getServerSnapshot, didReceiveUpdate = true);
    hook = hook.queue;
    updateEffect(subscribeToStore.bind(null, fiber, hook, subscribe), [
      subscribe
    ]);
    if (hook.getSnapshot !== getSnapshot || snapshotChanged || null !== workInProgressHook && workInProgressHook.memoizedState.tag & 1) {
      fiber.flags |= 2048;
      pushSimpleEffect(
        9,
        { destroy: void 0 },
        updateStoreInstance.bind(
          null,
          fiber,
          hook,
          getServerSnapshot,
          getSnapshot
        ),
        null
      );
      if (null === workInProgressRoot) throw Error(formatProdErrorMessage(349));
      isHydrating$jscomp$0 || 0 !== (renderLanes & 127) || pushStoreConsistencyCheck(fiber, getSnapshot, getServerSnapshot);
    }
    return getServerSnapshot;
  }
  function pushStoreConsistencyCheck(fiber, getSnapshot, renderedSnapshot) {
    fiber.flags |= 16384;
    fiber = { getSnapshot, value: renderedSnapshot };
    getSnapshot = currentlyRenderingFiber.updateQueue;
    null === getSnapshot ? (getSnapshot = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = getSnapshot, getSnapshot.stores = [fiber]) : (renderedSnapshot = getSnapshot.stores, null === renderedSnapshot ? getSnapshot.stores = [fiber] : renderedSnapshot.push(fiber));
  }
  function updateStoreInstance(fiber, inst, nextSnapshot, getSnapshot) {
    inst.value = nextSnapshot;
    inst.getSnapshot = getSnapshot;
    checkIfSnapshotChanged(inst) && forceStoreRerender(fiber);
  }
  function subscribeToStore(fiber, inst, subscribe) {
    return subscribe(function() {
      checkIfSnapshotChanged(inst) && forceStoreRerender(fiber);
    });
  }
  function checkIfSnapshotChanged(inst) {
    var latestGetSnapshot = inst.getSnapshot;
    inst = inst.value;
    try {
      var nextValue = latestGetSnapshot();
      return !objectIs(inst, nextValue);
    } catch (error) {
      return true;
    }
  }
  function forceStoreRerender(fiber) {
    var root2 = enqueueConcurrentRenderForLane(fiber, 2);
    null !== root2 && scheduleUpdateOnFiber(root2, fiber, 2);
  }
  function mountStateImpl(initialState) {
    var hook = mountWorkInProgressHook();
    if ("function" === typeof initialState) {
      var initialStateInitializer = initialState;
      initialState = initialStateInitializer();
      if (shouldDoubleInvokeUserFnsInHooksDEV) {
        setIsStrictModeForDevtools(true);
        try {
          initialStateInitializer();
        } finally {
          setIsStrictModeForDevtools(false);
        }
      }
    }
    hook.memoizedState = hook.baseState = initialState;
    hook.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: basicStateReducer,
      lastRenderedState: initialState
    };
    return hook;
  }
  function updateOptimisticImpl(hook, current, passthrough, reducer) {
    hook.baseState = passthrough;
    return updateReducerImpl(
      hook,
      currentHook,
      "function" === typeof reducer ? reducer : basicStateReducer
    );
  }
  function dispatchActionState(fiber, actionQueue, setPendingState, setState, payload) {
    if (isRenderPhaseUpdate(fiber)) throw Error(formatProdErrorMessage(485));
    fiber = actionQueue.action;
    if (null !== fiber) {
      var actionNode = {
        payload,
        action: fiber,
        next: null,
        isTransition: true,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(listener) {
          actionNode.listeners.push(listener);
        }
      };
      null !== ReactSharedInternals.T ? setPendingState(true) : actionNode.isTransition = false;
      setState(actionNode);
      setPendingState = actionQueue.pending;
      null === setPendingState ? (actionNode.next = actionQueue.pending = actionNode, runActionStateAction(actionQueue, actionNode)) : (actionNode.next = setPendingState.next, actionQueue.pending = setPendingState.next = actionNode);
    }
  }
  function runActionStateAction(actionQueue, node) {
    var action = node.action, payload = node.payload, prevState = actionQueue.state;
    if (node.isTransition) {
      var prevTransition = ReactSharedInternals.T, currentTransition = {};
      ReactSharedInternals.T = currentTransition;
      try {
        var returnValue = action(prevState, payload), onStartTransitionFinish = ReactSharedInternals.S;
        null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
        handleActionReturnValue(actionQueue, node, returnValue);
      } catch (error) {
        onActionError(actionQueue, node, error);
      } finally {
        null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
      }
    } else
      try {
        prevTransition = action(prevState, payload), handleActionReturnValue(actionQueue, node, prevTransition);
      } catch (error$66) {
        onActionError(actionQueue, node, error$66);
      }
  }
  function handleActionReturnValue(actionQueue, node, returnValue) {
    null !== returnValue && "object" === typeof returnValue && "function" === typeof returnValue.then ? returnValue.then(
      function(nextState) {
        onActionSuccess(actionQueue, node, nextState);
      },
      function(error) {
        return onActionError(actionQueue, node, error);
      }
    ) : onActionSuccess(actionQueue, node, returnValue);
  }
  function onActionSuccess(actionQueue, actionNode, nextState) {
    actionNode.status = "fulfilled";
    actionNode.value = nextState;
    notifyActionListeners(actionNode);
    actionQueue.state = nextState;
    actionNode = actionQueue.pending;
    null !== actionNode && (nextState = actionNode.next, nextState === actionNode ? actionQueue.pending = null : (nextState = nextState.next, actionNode.next = nextState, runActionStateAction(actionQueue, nextState)));
  }
  function onActionError(actionQueue, actionNode, error) {
    var last = actionQueue.pending;
    actionQueue.pending = null;
    if (null !== last) {
      last = last.next;
      do
        actionNode.status = "rejected", actionNode.reason = error, notifyActionListeners(actionNode), actionNode = actionNode.next;
      while (actionNode !== last);
    }
    actionQueue.action = null;
  }
  function notifyActionListeners(actionNode) {
    actionNode = actionNode.listeners;
    for (var i = 0; i < actionNode.length; i++) (0, actionNode[i])();
  }
  function actionStateReducer(oldState, newState) {
    return newState;
  }
  function mountActionState(action, initialStateProp) {
    if (isHydrating) {
      var ssrFormState = workInProgressRoot.formState;
      if (null !== ssrFormState) {
        a: {
          var JSCompiler_inline_result = currentlyRenderingFiber;
          if (isHydrating) {
            if (nextHydratableInstance) {
              b: {
                var JSCompiler_inline_result$jscomp$0 = nextHydratableInstance;
                for (var inRootOrSingleton = rootOrSingletonContext; 8 !== JSCompiler_inline_result$jscomp$0.nodeType; ) {
                  if (!inRootOrSingleton) {
                    JSCompiler_inline_result$jscomp$0 = null;
                    break b;
                  }
                  JSCompiler_inline_result$jscomp$0 = getNextHydratable(
                    JSCompiler_inline_result$jscomp$0.nextSibling
                  );
                  if (null === JSCompiler_inline_result$jscomp$0) {
                    JSCompiler_inline_result$jscomp$0 = null;
                    break b;
                  }
                }
                inRootOrSingleton = JSCompiler_inline_result$jscomp$0.data;
                JSCompiler_inline_result$jscomp$0 = "F!" === inRootOrSingleton || "F" === inRootOrSingleton ? JSCompiler_inline_result$jscomp$0 : null;
              }
              if (JSCompiler_inline_result$jscomp$0) {
                nextHydratableInstance = getNextHydratable(
                  JSCompiler_inline_result$jscomp$0.nextSibling
                );
                JSCompiler_inline_result = "F!" === JSCompiler_inline_result$jscomp$0.data;
                break a;
              }
            }
            throwOnHydrationMismatch(JSCompiler_inline_result);
          }
          JSCompiler_inline_result = false;
        }
        JSCompiler_inline_result && (initialStateProp = ssrFormState[0]);
      }
    }
    ssrFormState = mountWorkInProgressHook();
    ssrFormState.memoizedState = ssrFormState.baseState = initialStateProp;
    JSCompiler_inline_result = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: actionStateReducer,
      lastRenderedState: initialStateProp
    };
    ssrFormState.queue = JSCompiler_inline_result;
    ssrFormState = dispatchSetState.bind(
      null,
      currentlyRenderingFiber,
      JSCompiler_inline_result
    );
    JSCompiler_inline_result.dispatch = ssrFormState;
    JSCompiler_inline_result = mountStateImpl(false);
    inRootOrSingleton = dispatchOptimisticSetState.bind(
      null,
      currentlyRenderingFiber,
      false,
      JSCompiler_inline_result.queue
    );
    JSCompiler_inline_result = mountWorkInProgressHook();
    JSCompiler_inline_result$jscomp$0 = {
      state: initialStateProp,
      dispatch: null,
      action,
      pending: null
    };
    JSCompiler_inline_result.queue = JSCompiler_inline_result$jscomp$0;
    ssrFormState = dispatchActionState.bind(
      null,
      currentlyRenderingFiber,
      JSCompiler_inline_result$jscomp$0,
      inRootOrSingleton,
      ssrFormState
    );
    JSCompiler_inline_result$jscomp$0.dispatch = ssrFormState;
    JSCompiler_inline_result.memoizedState = action;
    return [initialStateProp, ssrFormState, false];
  }
  function updateActionState(action) {
    var stateHook = updateWorkInProgressHook();
    return updateActionStateImpl(stateHook, currentHook, action);
  }
  function updateActionStateImpl(stateHook, currentStateHook, action) {
    currentStateHook = updateReducerImpl(
      stateHook,
      currentStateHook,
      actionStateReducer
    )[0];
    stateHook = updateReducer(basicStateReducer)[0];
    if ("object" === typeof currentStateHook && null !== currentStateHook && "function" === typeof currentStateHook.then)
      try {
        var state = useThenable(currentStateHook);
      } catch (x) {
        if (x === SuspenseException) throw SuspenseActionException;
        throw x;
      }
    else state = currentStateHook;
    currentStateHook = updateWorkInProgressHook();
    var actionQueue = currentStateHook.queue, dispatch = actionQueue.dispatch;
    action !== currentStateHook.memoizedState && (currentlyRenderingFiber.flags |= 2048, pushSimpleEffect(
      9,
      { destroy: void 0 },
      actionStateActionEffect.bind(null, actionQueue, action),
      null
    ));
    return [state, dispatch, stateHook];
  }
  function actionStateActionEffect(actionQueue, action) {
    actionQueue.action = action;
  }
  function rerenderActionState(action) {
    var stateHook = updateWorkInProgressHook(), currentStateHook = currentHook;
    if (null !== currentStateHook)
      return updateActionStateImpl(stateHook, currentStateHook, action);
    updateWorkInProgressHook();
    stateHook = stateHook.memoizedState;
    currentStateHook = updateWorkInProgressHook();
    var dispatch = currentStateHook.queue.dispatch;
    currentStateHook.memoizedState = action;
    return [stateHook, dispatch, false];
  }
  function pushSimpleEffect(tag, inst, create, deps) {
    tag = { tag, create, deps, inst, next: null };
    inst = currentlyRenderingFiber.updateQueue;
    null === inst && (inst = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = inst);
    create = inst.lastEffect;
    null === create ? inst.lastEffect = tag.next = tag : (deps = create.next, create.next = tag, tag.next = deps, inst.lastEffect = tag);
    return tag;
  }
  function updateRef() {
    return updateWorkInProgressHook().memoizedState;
  }
  function mountEffectImpl(fiberFlags, hookFlags, create, deps) {
    var hook = mountWorkInProgressHook();
    currentlyRenderingFiber.flags |= fiberFlags;
    hook.memoizedState = pushSimpleEffect(
      1 | hookFlags,
      { destroy: void 0 },
      create,
      void 0 === deps ? null : deps
    );
  }
  function updateEffectImpl(fiberFlags, hookFlags, create, deps) {
    var hook = updateWorkInProgressHook();
    deps = void 0 === deps ? null : deps;
    var inst = hook.memoizedState.inst;
    null !== currentHook && null !== deps && areHookInputsEqual(deps, currentHook.memoizedState.deps) ? hook.memoizedState = pushSimpleEffect(hookFlags, inst, create, deps) : (currentlyRenderingFiber.flags |= fiberFlags, hook.memoizedState = pushSimpleEffect(
      1 | hookFlags,
      inst,
      create,
      deps
    ));
  }
  function mountEffect(create, deps) {
    mountEffectImpl(8390656, 8, create, deps);
  }
  function updateEffect(create, deps) {
    updateEffectImpl(2048, 8, create, deps);
  }
  function useEffectEventImpl(payload) {
    currentlyRenderingFiber.flags |= 4;
    var componentUpdateQueue = currentlyRenderingFiber.updateQueue;
    if (null === componentUpdateQueue)
      componentUpdateQueue = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = componentUpdateQueue, componentUpdateQueue.events = [payload];
    else {
      var events = componentUpdateQueue.events;
      null === events ? componentUpdateQueue.events = [payload] : events.push(payload);
    }
  }
  function updateEvent(callback) {
    var ref = updateWorkInProgressHook().memoizedState;
    useEffectEventImpl({ ref, nextImpl: callback });
    return function() {
      if (0 !== (executionContext & 2)) throw Error(formatProdErrorMessage(440));
      return ref.impl.apply(void 0, arguments);
    };
  }
  function updateInsertionEffect(create, deps) {
    return updateEffectImpl(4, 2, create, deps);
  }
  function updateLayoutEffect(create, deps) {
    return updateEffectImpl(4, 4, create, deps);
  }
  function imperativeHandleEffect(create, ref) {
    if ("function" === typeof ref) {
      create = create();
      var refCleanup = ref(create);
      return function() {
        "function" === typeof refCleanup ? refCleanup() : ref(null);
      };
    }
    if (null !== ref && void 0 !== ref)
      return create = create(), ref.current = create, function() {
        ref.current = null;
      };
  }
  function updateImperativeHandle(ref, create, deps) {
    deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
    updateEffectImpl(4, 4, imperativeHandleEffect.bind(null, create, ref), deps);
  }
  function mountDebugValue() {
  }
  function updateCallback(callback, deps) {
    var hook = updateWorkInProgressHook();
    deps = void 0 === deps ? null : deps;
    var prevState = hook.memoizedState;
    if (null !== deps && areHookInputsEqual(deps, prevState[1]))
      return prevState[0];
    hook.memoizedState = [callback, deps];
    return callback;
  }
  function updateMemo(nextCreate, deps) {
    var hook = updateWorkInProgressHook();
    deps = void 0 === deps ? null : deps;
    var prevState = hook.memoizedState;
    if (null !== deps && areHookInputsEqual(deps, prevState[1]))
      return prevState[0];
    prevState = nextCreate();
    if (shouldDoubleInvokeUserFnsInHooksDEV) {
      setIsStrictModeForDevtools(true);
      try {
        nextCreate();
      } finally {
        setIsStrictModeForDevtools(false);
      }
    }
    hook.memoizedState = [prevState, deps];
    return prevState;
  }
  function mountDeferredValueImpl(hook, value, initialValue) {
    if (void 0 === initialValue || 0 !== (renderLanes & 1073741824) && 0 === (workInProgressRootRenderLanes & 261930))
      return hook.memoizedState = value;
    hook.memoizedState = initialValue;
    hook = requestDeferredLane();
    currentlyRenderingFiber.lanes |= hook;
    workInProgressRootSkippedLanes |= hook;
    return initialValue;
  }
  function updateDeferredValueImpl(hook, prevValue, value, initialValue) {
    if (objectIs(value, prevValue)) return value;
    if (null !== currentTreeHiddenStackCursor.current)
      return hook = mountDeferredValueImpl(hook, value, initialValue), objectIs(hook, prevValue) || (didReceiveUpdate = true), hook;
    if (0 === (renderLanes & 42) || 0 !== (renderLanes & 1073741824) && 0 === (workInProgressRootRenderLanes & 261930))
      return didReceiveUpdate = true, hook.memoizedState = value;
    hook = requestDeferredLane();
    currentlyRenderingFiber.lanes |= hook;
    workInProgressRootSkippedLanes |= hook;
    return prevValue;
  }
  function startTransition(fiber, queue, pendingState, finishedState, callback) {
    var previousPriority = ReactDOMSharedInternals.p;
    ReactDOMSharedInternals.p = 0 !== previousPriority && 8 > previousPriority ? previousPriority : 8;
    var prevTransition = ReactSharedInternals.T, currentTransition = {};
    ReactSharedInternals.T = currentTransition;
    dispatchOptimisticSetState(fiber, false, queue, pendingState);
    try {
      var returnValue = callback(), onStartTransitionFinish = ReactSharedInternals.S;
      null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
      if (null !== returnValue && "object" === typeof returnValue && "function" === typeof returnValue.then) {
        var thenableForFinishedState = chainThenableValue(
          returnValue,
          finishedState
        );
        dispatchSetStateInternal(
          fiber,
          queue,
          thenableForFinishedState,
          requestUpdateLane(fiber)
        );
      } else
        dispatchSetStateInternal(
          fiber,
          queue,
          finishedState,
          requestUpdateLane(fiber)
        );
    } catch (error) {
      dispatchSetStateInternal(
        fiber,
        queue,
        { then: function() {
        }, status: "rejected", reason: error },
        requestUpdateLane()
      );
    } finally {
      ReactDOMSharedInternals.p = previousPriority, null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
    }
  }
  function noop() {
  }
  function startHostTransition(formFiber, pendingState, action, formData) {
    if (5 !== formFiber.tag) throw Error(formatProdErrorMessage(476));
    var queue = ensureFormComponentIsStateful(formFiber).queue;
    startTransition(
      formFiber,
      queue,
      pendingState,
      sharedNotPendingObject,
      null === action ? noop : function() {
        requestFormReset$1(formFiber);
        return action(formData);
      }
    );
  }
  function ensureFormComponentIsStateful(formFiber) {
    var existingStateHook = formFiber.memoizedState;
    if (null !== existingStateHook) return existingStateHook;
    existingStateHook = {
      memoizedState: sharedNotPendingObject,
      baseState: sharedNotPendingObject,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: basicStateReducer,
        lastRenderedState: sharedNotPendingObject
      },
      next: null
    };
    var initialResetState = {};
    existingStateHook.next = {
      memoizedState: initialResetState,
      baseState: initialResetState,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: basicStateReducer,
        lastRenderedState: initialResetState
      },
      next: null
    };
    formFiber.memoizedState = existingStateHook;
    formFiber = formFiber.alternate;
    null !== formFiber && (formFiber.memoizedState = existingStateHook);
    return existingStateHook;
  }
  function requestFormReset$1(formFiber) {
    var stateHook = ensureFormComponentIsStateful(formFiber);
    null === stateHook.next && (stateHook = formFiber.alternate.memoizedState);
    dispatchSetStateInternal(
      formFiber,
      stateHook.next.queue,
      {},
      requestUpdateLane()
    );
  }
  function useHostTransitionStatus() {
    return readContext(HostTransitionContext);
  }
  function updateId() {
    return updateWorkInProgressHook().memoizedState;
  }
  function updateRefresh() {
    return updateWorkInProgressHook().memoizedState;
  }
  function refreshCache(fiber) {
    for (var provider = fiber.return; null !== provider; ) {
      switch (provider.tag) {
        case 24:
        case 3:
          var lane = requestUpdateLane();
          fiber = createUpdate(lane);
          var root$69 = enqueueUpdate(provider, fiber, lane);
          null !== root$69 && (scheduleUpdateOnFiber(root$69, provider, lane), entangleTransitions(root$69, provider, lane));
          provider = { cache: createCache() };
          fiber.payload = provider;
          return;
      }
      provider = provider.return;
    }
  }
  function dispatchReducerAction(fiber, queue, action) {
    var lane = requestUpdateLane();
    action = {
      lane,
      revertLane: 0,
      gesture: null,
      action,
      hasEagerState: false,
      eagerState: null,
      next: null
    };
    isRenderPhaseUpdate(fiber) ? enqueueRenderPhaseUpdate(queue, action) : (action = enqueueConcurrentHookUpdate(fiber, queue, action, lane), null !== action && (scheduleUpdateOnFiber(action, fiber, lane), entangleTransitionUpdate(action, queue, lane)));
  }
  function dispatchSetState(fiber, queue, action) {
    var lane = requestUpdateLane();
    dispatchSetStateInternal(fiber, queue, action, lane);
  }
  function dispatchSetStateInternal(fiber, queue, action, lane) {
    var update = {
      lane,
      revertLane: 0,
      gesture: null,
      action,
      hasEagerState: false,
      eagerState: null,
      next: null
    };
    if (isRenderPhaseUpdate(fiber)) enqueueRenderPhaseUpdate(queue, update);
    else {
      var alternate = fiber.alternate;
      if (0 === fiber.lanes && (null === alternate || 0 === alternate.lanes) && (alternate = queue.lastRenderedReducer, null !== alternate))
        try {
          var currentState = queue.lastRenderedState, eagerState = alternate(currentState, action);
          update.hasEagerState = true;
          update.eagerState = eagerState;
          if (objectIs(eagerState, currentState))
            return enqueueUpdate$1(fiber, queue, update, 0), null === workInProgressRoot && finishQueueingConcurrentUpdates(), false;
        } catch (error) {
        } finally {
        }
      action = enqueueConcurrentHookUpdate(fiber, queue, update, lane);
      if (null !== action)
        return scheduleUpdateOnFiber(action, fiber, lane), entangleTransitionUpdate(action, queue, lane), true;
    }
    return false;
  }
  function dispatchOptimisticSetState(fiber, throwIfDuringRender, queue, action) {
    action = {
      lane: 2,
      revertLane: requestTransitionLane(),
      gesture: null,
      action,
      hasEagerState: false,
      eagerState: null,
      next: null
    };
    if (isRenderPhaseUpdate(fiber)) {
      if (throwIfDuringRender) throw Error(formatProdErrorMessage(479));
    } else
      throwIfDuringRender = enqueueConcurrentHookUpdate(
        fiber,
        queue,
        action,
        2
      ), null !== throwIfDuringRender && scheduleUpdateOnFiber(throwIfDuringRender, fiber, 2);
  }
  function isRenderPhaseUpdate(fiber) {
    var alternate = fiber.alternate;
    return fiber === currentlyRenderingFiber || null !== alternate && alternate === currentlyRenderingFiber;
  }
  function enqueueRenderPhaseUpdate(queue, update) {
    didScheduleRenderPhaseUpdateDuringThisPass = didScheduleRenderPhaseUpdate = true;
    var pending = queue.pending;
    null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
    queue.pending = update;
  }
  function entangleTransitionUpdate(root2, queue, lane) {
    if (0 !== (lane & 4194048)) {
      var queueLanes = queue.lanes;
      queueLanes &= root2.pendingLanes;
      lane |= queueLanes;
      queue.lanes = lane;
      markRootEntangled(root2, lane);
    }
  }
  var ContextOnlyDispatcher = {
    readContext,
    use,
    useCallback: throwInvalidHookError,
    useContext: throwInvalidHookError,
    useEffect: throwInvalidHookError,
    useImperativeHandle: throwInvalidHookError,
    useLayoutEffect: throwInvalidHookError,
    useInsertionEffect: throwInvalidHookError,
    useMemo: throwInvalidHookError,
    useReducer: throwInvalidHookError,
    useRef: throwInvalidHookError,
    useState: throwInvalidHookError,
    useDebugValue: throwInvalidHookError,
    useDeferredValue: throwInvalidHookError,
    useTransition: throwInvalidHookError,
    useSyncExternalStore: throwInvalidHookError,
    useId: throwInvalidHookError,
    useHostTransitionStatus: throwInvalidHookError,
    useFormState: throwInvalidHookError,
    useActionState: throwInvalidHookError,
    useOptimistic: throwInvalidHookError,
    useMemoCache: throwInvalidHookError,
    useCacheRefresh: throwInvalidHookError
  };
  ContextOnlyDispatcher.useEffectEvent = throwInvalidHookError;
  var HooksDispatcherOnMount = {
    readContext,
    use,
    useCallback: function(callback, deps) {
      mountWorkInProgressHook().memoizedState = [
        callback,
        void 0 === deps ? null : deps
      ];
      return callback;
    },
    useContext: readContext,
    useEffect: mountEffect,
    useImperativeHandle: function(ref, create, deps) {
      deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
      mountEffectImpl(
        4194308,
        4,
        imperativeHandleEffect.bind(null, create, ref),
        deps
      );
    },
    useLayoutEffect: function(create, deps) {
      return mountEffectImpl(4194308, 4, create, deps);
    },
    useInsertionEffect: function(create, deps) {
      mountEffectImpl(4, 2, create, deps);
    },
    useMemo: function(nextCreate, deps) {
      var hook = mountWorkInProgressHook();
      deps = void 0 === deps ? null : deps;
      var nextValue = nextCreate();
      if (shouldDoubleInvokeUserFnsInHooksDEV) {
        setIsStrictModeForDevtools(true);
        try {
          nextCreate();
        } finally {
          setIsStrictModeForDevtools(false);
        }
      }
      hook.memoizedState = [nextValue, deps];
      return nextValue;
    },
    useReducer: function(reducer, initialArg, init) {
      var hook = mountWorkInProgressHook();
      if (void 0 !== init) {
        var initialState = init(initialArg);
        if (shouldDoubleInvokeUserFnsInHooksDEV) {
          setIsStrictModeForDevtools(true);
          try {
            init(initialArg);
          } finally {
            setIsStrictModeForDevtools(false);
          }
        }
      } else initialState = initialArg;
      hook.memoizedState = hook.baseState = initialState;
      reducer = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: reducer,
        lastRenderedState: initialState
      };
      hook.queue = reducer;
      reducer = reducer.dispatch = dispatchReducerAction.bind(
        null,
        currentlyRenderingFiber,
        reducer
      );
      return [hook.memoizedState, reducer];
    },
    useRef: function(initialValue) {
      var hook = mountWorkInProgressHook();
      initialValue = { current: initialValue };
      return hook.memoizedState = initialValue;
    },
    useState: function(initialState) {
      initialState = mountStateImpl(initialState);
      var queue = initialState.queue, dispatch = dispatchSetState.bind(null, currentlyRenderingFiber, queue);
      queue.dispatch = dispatch;
      return [initialState.memoizedState, dispatch];
    },
    useDebugValue: mountDebugValue,
    useDeferredValue: function(value, initialValue) {
      var hook = mountWorkInProgressHook();
      return mountDeferredValueImpl(hook, value, initialValue);
    },
    useTransition: function() {
      var stateHook = mountStateImpl(false);
      stateHook = startTransition.bind(
        null,
        currentlyRenderingFiber,
        stateHook.queue,
        true,
        false
      );
      mountWorkInProgressHook().memoizedState = stateHook;
      return [false, stateHook];
    },
    useSyncExternalStore: function(subscribe, getSnapshot, getServerSnapshot) {
      var fiber = currentlyRenderingFiber, hook = mountWorkInProgressHook();
      if (isHydrating) {
        if (void 0 === getServerSnapshot)
          throw Error(formatProdErrorMessage(407));
        getServerSnapshot = getServerSnapshot();
      } else {
        getServerSnapshot = getSnapshot();
        if (null === workInProgressRoot)
          throw Error(formatProdErrorMessage(349));
        0 !== (workInProgressRootRenderLanes & 127) || pushStoreConsistencyCheck(fiber, getSnapshot, getServerSnapshot);
      }
      hook.memoizedState = getServerSnapshot;
      var inst = { value: getServerSnapshot, getSnapshot };
      hook.queue = inst;
      mountEffect(subscribeToStore.bind(null, fiber, inst, subscribe), [
        subscribe
      ]);
      fiber.flags |= 2048;
      pushSimpleEffect(
        9,
        { destroy: void 0 },
        updateStoreInstance.bind(
          null,
          fiber,
          inst,
          getServerSnapshot,
          getSnapshot
        ),
        null
      );
      return getServerSnapshot;
    },
    useId: function() {
      var hook = mountWorkInProgressHook(), identifierPrefix = workInProgressRoot.identifierPrefix;
      if (isHydrating) {
        var JSCompiler_inline_result = treeContextOverflow;
        var idWithLeadingBit = treeContextId;
        JSCompiler_inline_result = (idWithLeadingBit & ~(1 << 32 - clz32(idWithLeadingBit) - 1)).toString(32) + JSCompiler_inline_result;
        identifierPrefix = "_" + identifierPrefix + "R_" + JSCompiler_inline_result;
        JSCompiler_inline_result = localIdCounter++;
        0 < JSCompiler_inline_result && (identifierPrefix += "H" + JSCompiler_inline_result.toString(32));
        identifierPrefix += "_";
      } else
        JSCompiler_inline_result = globalClientIdCounter++, identifierPrefix = "_" + identifierPrefix + "r_" + JSCompiler_inline_result.toString(32) + "_";
      return hook.memoizedState = identifierPrefix;
    },
    useHostTransitionStatus,
    useFormState: mountActionState,
    useActionState: mountActionState,
    useOptimistic: function(passthrough) {
      var hook = mountWorkInProgressHook();
      hook.memoizedState = hook.baseState = passthrough;
      var queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      hook.queue = queue;
      hook = dispatchOptimisticSetState.bind(
        null,
        currentlyRenderingFiber,
        true,
        queue
      );
      queue.dispatch = hook;
      return [passthrough, hook];
    },
    useMemoCache,
    useCacheRefresh: function() {
      return mountWorkInProgressHook().memoizedState = refreshCache.bind(
        null,
        currentlyRenderingFiber
      );
    },
    useEffectEvent: function(callback) {
      var hook = mountWorkInProgressHook(), ref = { impl: callback };
      hook.memoizedState = ref;
      return function() {
        if (0 !== (executionContext & 2))
          throw Error(formatProdErrorMessage(440));
        return ref.impl.apply(void 0, arguments);
      };
    }
  }, HooksDispatcherOnUpdate = {
    readContext,
    use,
    useCallback: updateCallback,
    useContext: readContext,
    useEffect: updateEffect,
    useImperativeHandle: updateImperativeHandle,
    useInsertionEffect: updateInsertionEffect,
    useLayoutEffect: updateLayoutEffect,
    useMemo: updateMemo,
    useReducer: updateReducer,
    useRef: updateRef,
    useState: function() {
      return updateReducer(basicStateReducer);
    },
    useDebugValue: mountDebugValue,
    useDeferredValue: function(value, initialValue) {
      var hook = updateWorkInProgressHook();
      return updateDeferredValueImpl(
        hook,
        currentHook.memoizedState,
        value,
        initialValue
      );
    },
    useTransition: function() {
      var booleanOrThenable = updateReducer(basicStateReducer)[0], start = updateWorkInProgressHook().memoizedState;
      return [
        "boolean" === typeof booleanOrThenable ? booleanOrThenable : useThenable(booleanOrThenable),
        start
      ];
    },
    useSyncExternalStore: updateSyncExternalStore,
    useId: updateId,
    useHostTransitionStatus,
    useFormState: updateActionState,
    useActionState: updateActionState,
    useOptimistic: function(passthrough, reducer) {
      var hook = updateWorkInProgressHook();
      return updateOptimisticImpl(hook, currentHook, passthrough, reducer);
    },
    useMemoCache,
    useCacheRefresh: updateRefresh
  };
  HooksDispatcherOnUpdate.useEffectEvent = updateEvent;
  var HooksDispatcherOnRerender = {
    readContext,
    use,
    useCallback: updateCallback,
    useContext: readContext,
    useEffect: updateEffect,
    useImperativeHandle: updateImperativeHandle,
    useInsertionEffect: updateInsertionEffect,
    useLayoutEffect: updateLayoutEffect,
    useMemo: updateMemo,
    useReducer: rerenderReducer,
    useRef: updateRef,
    useState: function() {
      return rerenderReducer(basicStateReducer);
    },
    useDebugValue: mountDebugValue,
    useDeferredValue: function(value, initialValue) {
      var hook = updateWorkInProgressHook();
      return null === currentHook ? mountDeferredValueImpl(hook, value, initialValue) : updateDeferredValueImpl(
        hook,
        currentHook.memoizedState,
        value,
        initialValue
      );
    },
    useTransition: function() {
      var booleanOrThenable = rerenderReducer(basicStateReducer)[0], start = updateWorkInProgressHook().memoizedState;
      return [
        "boolean" === typeof booleanOrThenable ? booleanOrThenable : useThenable(booleanOrThenable),
        start
      ];
    },
    useSyncExternalStore: updateSyncExternalStore,
    useId: updateId,
    useHostTransitionStatus,
    useFormState: rerenderActionState,
    useActionState: rerenderActionState,
    useOptimistic: function(passthrough, reducer) {
      var hook = updateWorkInProgressHook();
      if (null !== currentHook)
        return updateOptimisticImpl(hook, currentHook, passthrough, reducer);
      hook.baseState = passthrough;
      return [passthrough, hook.queue.dispatch];
    },
    useMemoCache,
    useCacheRefresh: updateRefresh
  };
  HooksDispatcherOnRerender.useEffectEvent = updateEvent;
  function applyDerivedStateFromProps(workInProgress2, ctor, getDerivedStateFromProps, nextProps) {
    ctor = workInProgress2.memoizedState;
    getDerivedStateFromProps = getDerivedStateFromProps(nextProps, ctor);
    getDerivedStateFromProps = null === getDerivedStateFromProps || void 0 === getDerivedStateFromProps ? ctor : assign({}, ctor, getDerivedStateFromProps);
    workInProgress2.memoizedState = getDerivedStateFromProps;
    0 === workInProgress2.lanes && (workInProgress2.updateQueue.baseState = getDerivedStateFromProps);
  }
  var classComponentUpdater = {
    enqueueSetState: function(inst, payload, callback) {
      inst = inst._reactInternals;
      var lane = requestUpdateLane(), update = createUpdate(lane);
      update.payload = payload;
      void 0 !== callback && null !== callback && (update.callback = callback);
      payload = enqueueUpdate(inst, update, lane);
      null !== payload && (scheduleUpdateOnFiber(payload, inst, lane), entangleTransitions(payload, inst, lane));
    },
    enqueueReplaceState: function(inst, payload, callback) {
      inst = inst._reactInternals;
      var lane = requestUpdateLane(), update = createUpdate(lane);
      update.tag = 1;
      update.payload = payload;
      void 0 !== callback && null !== callback && (update.callback = callback);
      payload = enqueueUpdate(inst, update, lane);
      null !== payload && (scheduleUpdateOnFiber(payload, inst, lane), entangleTransitions(payload, inst, lane));
    },
    enqueueForceUpdate: function(inst, callback) {
      inst = inst._reactInternals;
      var lane = requestUpdateLane(), update = createUpdate(lane);
      update.tag = 2;
      void 0 !== callback && null !== callback && (update.callback = callback);
      callback = enqueueUpdate(inst, update, lane);
      null !== callback && (scheduleUpdateOnFiber(callback, inst, lane), entangleTransitions(callback, inst, lane));
    }
  };
  function checkShouldComponentUpdate(workInProgress2, ctor, oldProps, newProps, oldState, newState, nextContext) {
    workInProgress2 = workInProgress2.stateNode;
    return "function" === typeof workInProgress2.shouldComponentUpdate ? workInProgress2.shouldComponentUpdate(newProps, newState, nextContext) : ctor.prototype && ctor.prototype.isPureReactComponent ? !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState) : true;
  }
  function callComponentWillReceiveProps(workInProgress2, instance, newProps, nextContext) {
    workInProgress2 = instance.state;
    "function" === typeof instance.componentWillReceiveProps && instance.componentWillReceiveProps(newProps, nextContext);
    "function" === typeof instance.UNSAFE_componentWillReceiveProps && instance.UNSAFE_componentWillReceiveProps(newProps, nextContext);
    instance.state !== workInProgress2 && classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
  }
  function resolveClassComponentProps(Component, baseProps) {
    var newProps = baseProps;
    if ("ref" in baseProps) {
      newProps = {};
      for (var propName in baseProps)
        "ref" !== propName && (newProps[propName] = baseProps[propName]);
    }
    if (Component = Component.defaultProps) {
      newProps === baseProps && (newProps = assign({}, newProps));
      for (var propName$73 in Component)
        void 0 === newProps[propName$73] && (newProps[propName$73] = Component[propName$73]);
    }
    return newProps;
  }
  function defaultOnUncaughtError(error) {
    reportGlobalError(error);
  }
  function defaultOnCaughtError(error) {
    console.error(error);
  }
  function defaultOnRecoverableError(error) {
    reportGlobalError(error);
  }
  function logUncaughtError(root2, errorInfo) {
    try {
      var onUncaughtError = root2.onUncaughtError;
      onUncaughtError(errorInfo.value, { componentStack: errorInfo.stack });
    } catch (e$74) {
      setTimeout(function() {
        throw e$74;
      });
    }
  }
  function logCaughtError(root2, boundary, errorInfo) {
    try {
      var onCaughtError = root2.onCaughtError;
      onCaughtError(errorInfo.value, {
        componentStack: errorInfo.stack,
        errorBoundary: 1 === boundary.tag ? boundary.stateNode : null
      });
    } catch (e$75) {
      setTimeout(function() {
        throw e$75;
      });
    }
  }
  function createRootErrorUpdate(root2, errorInfo, lane) {
    lane = createUpdate(lane);
    lane.tag = 3;
    lane.payload = { element: null };
    lane.callback = function() {
      logUncaughtError(root2, errorInfo);
    };
    return lane;
  }
  function createClassErrorUpdate(lane) {
    lane = createUpdate(lane);
    lane.tag = 3;
    return lane;
  }
  function initializeClassErrorUpdate(update, root2, fiber, errorInfo) {
    var getDerivedStateFromError = fiber.type.getDerivedStateFromError;
    if ("function" === typeof getDerivedStateFromError) {
      var error = errorInfo.value;
      update.payload = function() {
        return getDerivedStateFromError(error);
      };
      update.callback = function() {
        logCaughtError(root2, fiber, errorInfo);
      };
    }
    var inst = fiber.stateNode;
    null !== inst && "function" === typeof inst.componentDidCatch && (update.callback = function() {
      logCaughtError(root2, fiber, errorInfo);
      "function" !== typeof getDerivedStateFromError && (null === legacyErrorBoundariesThatAlreadyFailed ? legacyErrorBoundariesThatAlreadyFailed = /* @__PURE__ */ new Set([this]) : legacyErrorBoundariesThatAlreadyFailed.add(this));
      var stack = errorInfo.stack;
      this.componentDidCatch(errorInfo.value, {
        componentStack: null !== stack ? stack : ""
      });
    });
  }
  function throwException(root2, returnFiber, sourceFiber, value, rootRenderLanes) {
    sourceFiber.flags |= 32768;
    if (null !== value && "object" === typeof value && "function" === typeof value.then) {
      returnFiber = sourceFiber.alternate;
      null !== returnFiber && propagateParentContextChanges(
        returnFiber,
        sourceFiber,
        rootRenderLanes,
        true
      );
      sourceFiber = suspenseHandlerStackCursor.current;
      if (null !== sourceFiber) {
        switch (sourceFiber.tag) {
          case 31:
          case 13:
            return null === shellBoundary ? renderDidSuspendDelayIfPossible() : null === sourceFiber.alternate && 0 === workInProgressRootExitStatus && (workInProgressRootExitStatus = 3), sourceFiber.flags &= -257, sourceFiber.flags |= 65536, sourceFiber.lanes = rootRenderLanes, value === noopSuspenseyCommitThenable ? sourceFiber.flags |= 16384 : (returnFiber = sourceFiber.updateQueue, null === returnFiber ? sourceFiber.updateQueue = /* @__PURE__ */ new Set([value]) : returnFiber.add(value), attachPingListener(root2, value, rootRenderLanes)), false;
          case 22:
            return sourceFiber.flags |= 65536, value === noopSuspenseyCommitThenable ? sourceFiber.flags |= 16384 : (returnFiber = sourceFiber.updateQueue, null === returnFiber ? (returnFiber = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([value])
            }, sourceFiber.updateQueue = returnFiber) : (sourceFiber = returnFiber.retryQueue, null === sourceFiber ? returnFiber.retryQueue = /* @__PURE__ */ new Set([value]) : sourceFiber.add(value)), attachPingListener(root2, value, rootRenderLanes)), false;
        }
        throw Error(formatProdErrorMessage(435, sourceFiber.tag));
      }
      attachPingListener(root2, value, rootRenderLanes);
      renderDidSuspendDelayIfPossible();
      return false;
    }
    if (isHydrating)
      return returnFiber = suspenseHandlerStackCursor.current, null !== returnFiber ? (0 === (returnFiber.flags & 65536) && (returnFiber.flags |= 256), returnFiber.flags |= 65536, returnFiber.lanes = rootRenderLanes, value !== HydrationMismatchException && (root2 = Error(formatProdErrorMessage(422), { cause: value }), queueHydrationError(createCapturedValueAtFiber(root2, sourceFiber)))) : (value !== HydrationMismatchException && (returnFiber = Error(formatProdErrorMessage(423), {
        cause: value
      }), queueHydrationError(
        createCapturedValueAtFiber(returnFiber, sourceFiber)
      )), root2 = root2.current.alternate, root2.flags |= 65536, rootRenderLanes &= -rootRenderLanes, root2.lanes |= rootRenderLanes, value = createCapturedValueAtFiber(value, sourceFiber), rootRenderLanes = createRootErrorUpdate(
        root2.stateNode,
        value,
        rootRenderLanes
      ), enqueueCapturedUpdate(root2, rootRenderLanes), 4 !== workInProgressRootExitStatus && (workInProgressRootExitStatus = 2)), false;
    var wrapperError = Error(formatProdErrorMessage(520), { cause: value });
    wrapperError = createCapturedValueAtFiber(wrapperError, sourceFiber);
    null === workInProgressRootConcurrentErrors ? workInProgressRootConcurrentErrors = [wrapperError] : workInProgressRootConcurrentErrors.push(wrapperError);
    4 !== workInProgressRootExitStatus && (workInProgressRootExitStatus = 2);
    if (null === returnFiber) return true;
    value = createCapturedValueAtFiber(value, sourceFiber);
    sourceFiber = returnFiber;
    do {
      switch (sourceFiber.tag) {
        case 3:
          return sourceFiber.flags |= 65536, root2 = rootRenderLanes & -rootRenderLanes, sourceFiber.lanes |= root2, root2 = createRootErrorUpdate(sourceFiber.stateNode, value, root2), enqueueCapturedUpdate(sourceFiber, root2), false;
        case 1:
          if (returnFiber = sourceFiber.type, wrapperError = sourceFiber.stateNode, 0 === (sourceFiber.flags & 128) && ("function" === typeof returnFiber.getDerivedStateFromError || null !== wrapperError && "function" === typeof wrapperError.componentDidCatch && (null === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(wrapperError))))
            return sourceFiber.flags |= 65536, rootRenderLanes &= -rootRenderLanes, sourceFiber.lanes |= rootRenderLanes, rootRenderLanes = createClassErrorUpdate(rootRenderLanes), initializeClassErrorUpdate(
              rootRenderLanes,
              root2,
              sourceFiber,
              value
            ), enqueueCapturedUpdate(sourceFiber, rootRenderLanes), false;
      }
      sourceFiber = sourceFiber.return;
    } while (null !== sourceFiber);
    return false;
  }
  var SelectiveHydrationException = Error(formatProdErrorMessage(461)), didReceiveUpdate = false;
  function reconcileChildren(current, workInProgress2, nextChildren, renderLanes2) {
    workInProgress2.child = null === current ? mountChildFibers(workInProgress2, null, nextChildren, renderLanes2) : reconcileChildFibers(
      workInProgress2,
      current.child,
      nextChildren,
      renderLanes2
    );
  }
  function updateForwardRef(current, workInProgress2, Component, nextProps, renderLanes2) {
    Component = Component.render;
    var ref = workInProgress2.ref;
    if ("ref" in nextProps) {
      var propsWithoutRef = {};
      for (var key in nextProps)
        "ref" !== key && (propsWithoutRef[key] = nextProps[key]);
    } else propsWithoutRef = nextProps;
    prepareToReadContext(workInProgress2);
    nextProps = renderWithHooks(
      current,
      workInProgress2,
      Component,
      propsWithoutRef,
      ref,
      renderLanes2
    );
    key = checkDidRenderIdHook();
    if (null !== current && !didReceiveUpdate)
      return bailoutHooks(current, workInProgress2, renderLanes2), bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
    isHydrating && key && pushMaterializedTreeId(workInProgress2);
    workInProgress2.flags |= 1;
    reconcileChildren(current, workInProgress2, nextProps, renderLanes2);
    return workInProgress2.child;
  }
  function updateMemoComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
    if (null === current) {
      var type = Component.type;
      if ("function" === typeof type && !shouldConstruct(type) && void 0 === type.defaultProps && null === Component.compare)
        return workInProgress2.tag = 15, workInProgress2.type = type, updateSimpleMemoComponent(
          current,
          workInProgress2,
          type,
          nextProps,
          renderLanes2
        );
      current = createFiberFromTypeAndProps(
        Component.type,
        null,
        nextProps,
        workInProgress2,
        workInProgress2.mode,
        renderLanes2
      );
      current.ref = workInProgress2.ref;
      current.return = workInProgress2;
      return workInProgress2.child = current;
    }
    type = current.child;
    if (!checkScheduledUpdateOrContext(current, renderLanes2)) {
      var prevProps = type.memoizedProps;
      Component = Component.compare;
      Component = null !== Component ? Component : shallowEqual;
      if (Component(prevProps, nextProps) && current.ref === workInProgress2.ref)
        return bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
    }
    workInProgress2.flags |= 1;
    current = createWorkInProgress(type, nextProps);
    current.ref = workInProgress2.ref;
    current.return = workInProgress2;
    return workInProgress2.child = current;
  }
  function updateSimpleMemoComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
    if (null !== current) {
      var prevProps = current.memoizedProps;
      if (shallowEqual(prevProps, nextProps) && current.ref === workInProgress2.ref)
        if (didReceiveUpdate = false, workInProgress2.pendingProps = nextProps = prevProps, checkScheduledUpdateOrContext(current, renderLanes2))
          0 !== (current.flags & 131072) && (didReceiveUpdate = true);
        else
          return workInProgress2.lanes = current.lanes, bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
    }
    return updateFunctionComponent(
      current,
      workInProgress2,
      Component,
      nextProps,
      renderLanes2
    );
  }
  function updateOffscreenComponent(current, workInProgress2, renderLanes2, nextProps) {
    var nextChildren = nextProps.children, prevState = null !== current ? current.memoizedState : null;
    null === current && null === workInProgress2.stateNode && (workInProgress2.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    });
    if ("hidden" === nextProps.mode) {
      if (0 !== (workInProgress2.flags & 128)) {
        prevState = null !== prevState ? prevState.baseLanes | renderLanes2 : renderLanes2;
        if (null !== current) {
          nextProps = workInProgress2.child = current.child;
          for (nextChildren = 0; null !== nextProps; )
            nextChildren = nextChildren | nextProps.lanes | nextProps.childLanes, nextProps = nextProps.sibling;
          nextProps = nextChildren & ~prevState;
        } else nextProps = 0, workInProgress2.child = null;
        return deferHiddenOffscreenComponent(
          current,
          workInProgress2,
          prevState,
          renderLanes2,
          nextProps
        );
      }
      if (0 !== (renderLanes2 & 536870912))
        workInProgress2.memoizedState = { baseLanes: 0, cachePool: null }, null !== current && pushTransition(
          workInProgress2,
          null !== prevState ? prevState.cachePool : null
        ), null !== prevState ? pushHiddenContext(workInProgress2, prevState) : reuseHiddenContextOnStack(), pushOffscreenSuspenseHandler(workInProgress2);
      else
        return nextProps = workInProgress2.lanes = 536870912, deferHiddenOffscreenComponent(
          current,
          workInProgress2,
          null !== prevState ? prevState.baseLanes | renderLanes2 : renderLanes2,
          renderLanes2,
          nextProps
        );
    } else
      null !== prevState ? (pushTransition(workInProgress2, prevState.cachePool), pushHiddenContext(workInProgress2, prevState), reuseSuspenseHandlerOnStack(), workInProgress2.memoizedState = null) : (null !== current && pushTransition(workInProgress2, null), reuseHiddenContextOnStack(), reuseSuspenseHandlerOnStack());
    reconcileChildren(current, workInProgress2, nextChildren, renderLanes2);
    return workInProgress2.child;
  }
  function bailoutOffscreenComponent(current, workInProgress2) {
    null !== current && 22 === current.tag || null !== workInProgress2.stateNode || (workInProgress2.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    });
    return workInProgress2.sibling;
  }
  function deferHiddenOffscreenComponent(current, workInProgress2, nextBaseLanes, renderLanes2, remainingChildLanes) {
    var JSCompiler_inline_result = peekCacheFromPool();
    JSCompiler_inline_result = null === JSCompiler_inline_result ? null : { parent: CacheContext._currentValue, pool: JSCompiler_inline_result };
    workInProgress2.memoizedState = {
      baseLanes: nextBaseLanes,
      cachePool: JSCompiler_inline_result
    };
    null !== current && pushTransition(workInProgress2, null);
    reuseHiddenContextOnStack();
    pushOffscreenSuspenseHandler(workInProgress2);
    null !== current && propagateParentContextChanges(current, workInProgress2, renderLanes2, true);
    workInProgress2.childLanes = remainingChildLanes;
    return null;
  }
  function mountActivityChildren(workInProgress2, nextProps) {
    nextProps = mountWorkInProgressOffscreenFiber(
      { mode: nextProps.mode, children: nextProps.children },
      workInProgress2.mode
    );
    nextProps.ref = workInProgress2.ref;
    workInProgress2.child = nextProps;
    nextProps.return = workInProgress2;
    return nextProps;
  }
  function retryActivityComponentWithoutHydrating(current, workInProgress2, renderLanes2) {
    reconcileChildFibers(workInProgress2, current.child, null, renderLanes2);
    current = mountActivityChildren(workInProgress2, workInProgress2.pendingProps);
    current.flags |= 2;
    popSuspenseHandler(workInProgress2);
    workInProgress2.memoizedState = null;
    return current;
  }
  function updateActivityComponent(current, workInProgress2, renderLanes2) {
    var nextProps = workInProgress2.pendingProps, didSuspend = 0 !== (workInProgress2.flags & 128);
    workInProgress2.flags &= -129;
    if (null === current) {
      if (isHydrating) {
        if ("hidden" === nextProps.mode)
          return current = mountActivityChildren(workInProgress2, nextProps), workInProgress2.lanes = 536870912, bailoutOffscreenComponent(null, current);
        pushDehydratedActivitySuspenseHandler(workInProgress2);
        (current = nextHydratableInstance) ? (current = canHydrateHydrationBoundary(
          current,
          rootOrSingletonContext
        ), current = null !== current && "&" === current.data ? current : null, null !== current && (workInProgress2.memoizedState = {
          dehydrated: current,
          treeContext: null !== treeContextProvider ? { id: treeContextId, overflow: treeContextOverflow } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, renderLanes2 = createFiberFromDehydratedFragment(current), renderLanes2.return = workInProgress2, workInProgress2.child = renderLanes2, hydrationParentFiber = workInProgress2, nextHydratableInstance = null)) : current = null;
        if (null === current) throw throwOnHydrationMismatch(workInProgress2);
        workInProgress2.lanes = 536870912;
        return null;
      }
      return mountActivityChildren(workInProgress2, nextProps);
    }
    var prevState = current.memoizedState;
    if (null !== prevState) {
      var dehydrated = prevState.dehydrated;
      pushDehydratedActivitySuspenseHandler(workInProgress2);
      if (didSuspend)
        if (workInProgress2.flags & 256)
          workInProgress2.flags &= -257, workInProgress2 = retryActivityComponentWithoutHydrating(
            current,
            workInProgress2,
            renderLanes2
          );
        else if (null !== workInProgress2.memoizedState)
          workInProgress2.child = current.child, workInProgress2.flags |= 128, workInProgress2 = null;
        else throw Error(formatProdErrorMessage(558));
      else if (didReceiveUpdate || propagateParentContextChanges(current, workInProgress2, renderLanes2, false), didSuspend = 0 !== (renderLanes2 & current.childLanes), didReceiveUpdate || didSuspend) {
        nextProps = workInProgressRoot;
        if (null !== nextProps && (dehydrated = getBumpedLaneForHydration(nextProps, renderLanes2), 0 !== dehydrated && dehydrated !== prevState.retryLane))
          throw prevState.retryLane = dehydrated, enqueueConcurrentRenderForLane(current, dehydrated), scheduleUpdateOnFiber(nextProps, current, dehydrated), SelectiveHydrationException;
        renderDidSuspendDelayIfPossible();
        workInProgress2 = retryActivityComponentWithoutHydrating(
          current,
          workInProgress2,
          renderLanes2
        );
      } else
        current = prevState.treeContext, nextHydratableInstance = getNextHydratable(dehydrated.nextSibling), hydrationParentFiber = workInProgress2, isHydrating = true, hydrationErrors = null, rootOrSingletonContext = false, null !== current && restoreSuspendedTreeContext(workInProgress2, current), workInProgress2 = mountActivityChildren(workInProgress2, nextProps), workInProgress2.flags |= 4096;
      return workInProgress2;
    }
    current = createWorkInProgress(current.child, {
      mode: nextProps.mode,
      children: nextProps.children
    });
    current.ref = workInProgress2.ref;
    workInProgress2.child = current;
    current.return = workInProgress2;
    return current;
  }
  function markRef(current, workInProgress2) {
    var ref = workInProgress2.ref;
    if (null === ref)
      null !== current && null !== current.ref && (workInProgress2.flags |= 4194816);
    else {
      if ("function" !== typeof ref && "object" !== typeof ref)
        throw Error(formatProdErrorMessage(284));
      if (null === current || current.ref !== ref)
        workInProgress2.flags |= 4194816;
    }
  }
  function updateFunctionComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
    prepareToReadContext(workInProgress2);
    Component = renderWithHooks(
      current,
      workInProgress2,
      Component,
      nextProps,
      void 0,
      renderLanes2
    );
    nextProps = checkDidRenderIdHook();
    if (null !== current && !didReceiveUpdate)
      return bailoutHooks(current, workInProgress2, renderLanes2), bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
    isHydrating && nextProps && pushMaterializedTreeId(workInProgress2);
    workInProgress2.flags |= 1;
    reconcileChildren(current, workInProgress2, Component, renderLanes2);
    return workInProgress2.child;
  }
  function replayFunctionComponent(current, workInProgress2, nextProps, Component, secondArg, renderLanes2) {
    prepareToReadContext(workInProgress2);
    workInProgress2.updateQueue = null;
    nextProps = renderWithHooksAgain(
      workInProgress2,
      Component,
      nextProps,
      secondArg
    );
    finishRenderingHooks(current);
    Component = checkDidRenderIdHook();
    if (null !== current && !didReceiveUpdate)
      return bailoutHooks(current, workInProgress2, renderLanes2), bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
    isHydrating && Component && pushMaterializedTreeId(workInProgress2);
    workInProgress2.flags |= 1;
    reconcileChildren(current, workInProgress2, nextProps, renderLanes2);
    return workInProgress2.child;
  }
  function updateClassComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
    prepareToReadContext(workInProgress2);
    if (null === workInProgress2.stateNode) {
      var context = emptyContextObject, contextType = Component.contextType;
      "object" === typeof contextType && null !== contextType && (context = readContext(contextType));
      context = new Component(nextProps, context);
      workInProgress2.memoizedState = null !== context.state && void 0 !== context.state ? context.state : null;
      context.updater = classComponentUpdater;
      workInProgress2.stateNode = context;
      context._reactInternals = workInProgress2;
      context = workInProgress2.stateNode;
      context.props = nextProps;
      context.state = workInProgress2.memoizedState;
      context.refs = {};
      initializeUpdateQueue(workInProgress2);
      contextType = Component.contextType;
      context.context = "object" === typeof contextType && null !== contextType ? readContext(contextType) : emptyContextObject;
      context.state = workInProgress2.memoizedState;
      contextType = Component.getDerivedStateFromProps;
      "function" === typeof contextType && (applyDerivedStateFromProps(
        workInProgress2,
        Component,
        contextType,
        nextProps
      ), context.state = workInProgress2.memoizedState);
      "function" === typeof Component.getDerivedStateFromProps || "function" === typeof context.getSnapshotBeforeUpdate || "function" !== typeof context.UNSAFE_componentWillMount && "function" !== typeof context.componentWillMount || (contextType = context.state, "function" === typeof context.componentWillMount && context.componentWillMount(), "function" === typeof context.UNSAFE_componentWillMount && context.UNSAFE_componentWillMount(), contextType !== context.state && classComponentUpdater.enqueueReplaceState(context, context.state, null), processUpdateQueue(workInProgress2, nextProps, context, renderLanes2), suspendIfUpdateReadFromEntangledAsyncAction(), context.state = workInProgress2.memoizedState);
      "function" === typeof context.componentDidMount && (workInProgress2.flags |= 4194308);
      nextProps = true;
    } else if (null === current) {
      context = workInProgress2.stateNode;
      var unresolvedOldProps = workInProgress2.memoizedProps, oldProps = resolveClassComponentProps(Component, unresolvedOldProps);
      context.props = oldProps;
      var oldContext = context.context, contextType$jscomp$0 = Component.contextType;
      contextType = emptyContextObject;
      "object" === typeof contextType$jscomp$0 && null !== contextType$jscomp$0 && (contextType = readContext(contextType$jscomp$0));
      var getDerivedStateFromProps = Component.getDerivedStateFromProps;
      contextType$jscomp$0 = "function" === typeof getDerivedStateFromProps || "function" === typeof context.getSnapshotBeforeUpdate;
      unresolvedOldProps = workInProgress2.pendingProps !== unresolvedOldProps;
      contextType$jscomp$0 || "function" !== typeof context.UNSAFE_componentWillReceiveProps && "function" !== typeof context.componentWillReceiveProps || (unresolvedOldProps || oldContext !== contextType) && callComponentWillReceiveProps(
        workInProgress2,
        context,
        nextProps,
        contextType
      );
      hasForceUpdate = false;
      var oldState = workInProgress2.memoizedState;
      context.state = oldState;
      processUpdateQueue(workInProgress2, nextProps, context, renderLanes2);
      suspendIfUpdateReadFromEntangledAsyncAction();
      oldContext = workInProgress2.memoizedState;
      unresolvedOldProps || oldState !== oldContext || hasForceUpdate ? ("function" === typeof getDerivedStateFromProps && (applyDerivedStateFromProps(
        workInProgress2,
        Component,
        getDerivedStateFromProps,
        nextProps
      ), oldContext = workInProgress2.memoizedState), (oldProps = hasForceUpdate || checkShouldComponentUpdate(
        workInProgress2,
        Component,
        oldProps,
        nextProps,
        oldState,
        oldContext,
        contextType
      )) ? (contextType$jscomp$0 || "function" !== typeof context.UNSAFE_componentWillMount && "function" !== typeof context.componentWillMount || ("function" === typeof context.componentWillMount && context.componentWillMount(), "function" === typeof context.UNSAFE_componentWillMount && context.UNSAFE_componentWillMount()), "function" === typeof context.componentDidMount && (workInProgress2.flags |= 4194308)) : ("function" === typeof context.componentDidMount && (workInProgress2.flags |= 4194308), workInProgress2.memoizedProps = nextProps, workInProgress2.memoizedState = oldContext), context.props = nextProps, context.state = oldContext, context.context = contextType, nextProps = oldProps) : ("function" === typeof context.componentDidMount && (workInProgress2.flags |= 4194308), nextProps = false);
    } else {
      context = workInProgress2.stateNode;
      cloneUpdateQueue(current, workInProgress2);
      contextType = workInProgress2.memoizedProps;
      contextType$jscomp$0 = resolveClassComponentProps(Component, contextType);
      context.props = contextType$jscomp$0;
      getDerivedStateFromProps = workInProgress2.pendingProps;
      oldState = context.context;
      oldContext = Component.contextType;
      oldProps = emptyContextObject;
      "object" === typeof oldContext && null !== oldContext && (oldProps = readContext(oldContext));
      unresolvedOldProps = Component.getDerivedStateFromProps;
      (oldContext = "function" === typeof unresolvedOldProps || "function" === typeof context.getSnapshotBeforeUpdate) || "function" !== typeof context.UNSAFE_componentWillReceiveProps && "function" !== typeof context.componentWillReceiveProps || (contextType !== getDerivedStateFromProps || oldState !== oldProps) && callComponentWillReceiveProps(
        workInProgress2,
        context,
        nextProps,
        oldProps
      );
      hasForceUpdate = false;
      oldState = workInProgress2.memoizedState;
      context.state = oldState;
      processUpdateQueue(workInProgress2, nextProps, context, renderLanes2);
      suspendIfUpdateReadFromEntangledAsyncAction();
      var newState = workInProgress2.memoizedState;
      contextType !== getDerivedStateFromProps || oldState !== newState || hasForceUpdate || null !== current && null !== current.dependencies && checkIfContextChanged(current.dependencies) ? ("function" === typeof unresolvedOldProps && (applyDerivedStateFromProps(
        workInProgress2,
        Component,
        unresolvedOldProps,
        nextProps
      ), newState = workInProgress2.memoizedState), (contextType$jscomp$0 = hasForceUpdate || checkShouldComponentUpdate(
        workInProgress2,
        Component,
        contextType$jscomp$0,
        nextProps,
        oldState,
        newState,
        oldProps
      ) || null !== current && null !== current.dependencies && checkIfContextChanged(current.dependencies)) ? (oldContext || "function" !== typeof context.UNSAFE_componentWillUpdate && "function" !== typeof context.componentWillUpdate || ("function" === typeof context.componentWillUpdate && context.componentWillUpdate(nextProps, newState, oldProps), "function" === typeof context.UNSAFE_componentWillUpdate && context.UNSAFE_componentWillUpdate(
        nextProps,
        newState,
        oldProps
      )), "function" === typeof context.componentDidUpdate && (workInProgress2.flags |= 4), "function" === typeof context.getSnapshotBeforeUpdate && (workInProgress2.flags |= 1024)) : ("function" !== typeof context.componentDidUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 4), "function" !== typeof context.getSnapshotBeforeUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 1024), workInProgress2.memoizedProps = nextProps, workInProgress2.memoizedState = newState), context.props = nextProps, context.state = newState, context.context = oldProps, nextProps = contextType$jscomp$0) : ("function" !== typeof context.componentDidUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 4), "function" !== typeof context.getSnapshotBeforeUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 1024), nextProps = false);
    }
    context = nextProps;
    markRef(current, workInProgress2);
    nextProps = 0 !== (workInProgress2.flags & 128);
    context || nextProps ? (context = workInProgress2.stateNode, Component = nextProps && "function" !== typeof Component.getDerivedStateFromError ? null : context.render(), workInProgress2.flags |= 1, null !== current && nextProps ? (workInProgress2.child = reconcileChildFibers(
      workInProgress2,
      current.child,
      null,
      renderLanes2
    ), workInProgress2.child = reconcileChildFibers(
      workInProgress2,
      null,
      Component,
      renderLanes2
    )) : reconcileChildren(current, workInProgress2, Component, renderLanes2), workInProgress2.memoizedState = context.state, current = workInProgress2.child) : current = bailoutOnAlreadyFinishedWork(
      current,
      workInProgress2,
      renderLanes2
    );
    return current;
  }
  function mountHostRootWithoutHydrating(current, workInProgress2, nextChildren, renderLanes2) {
    resetHydrationState();
    workInProgress2.flags |= 256;
    reconcileChildren(current, workInProgress2, nextChildren, renderLanes2);
    return workInProgress2.child;
  }
  var SUSPENDED_MARKER = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function mountSuspenseOffscreenState(renderLanes2) {
    return { baseLanes: renderLanes2, cachePool: getSuspendedCache() };
  }
  function getRemainingWorkInPrimaryTree(current, primaryTreeDidDefer, renderLanes2) {
    current = null !== current ? current.childLanes & ~renderLanes2 : 0;
    primaryTreeDidDefer && (current |= workInProgressDeferredLane);
    return current;
  }
  function updateSuspenseComponent(current, workInProgress2, renderLanes2) {
    var nextProps = workInProgress2.pendingProps, showFallback = false, didSuspend = 0 !== (workInProgress2.flags & 128), JSCompiler_temp;
    (JSCompiler_temp = didSuspend) || (JSCompiler_temp = null !== current && null === current.memoizedState ? false : 0 !== (suspenseStackCursor.current & 2));
    JSCompiler_temp && (showFallback = true, workInProgress2.flags &= -129);
    JSCompiler_temp = 0 !== (workInProgress2.flags & 32);
    workInProgress2.flags &= -33;
    if (null === current) {
      if (isHydrating) {
        showFallback ? pushPrimaryTreeSuspenseHandler(workInProgress2) : reuseSuspenseHandlerOnStack();
        (current = nextHydratableInstance) ? (current = canHydrateHydrationBoundary(
          current,
          rootOrSingletonContext
        ), current = null !== current && "&" !== current.data ? current : null, null !== current && (workInProgress2.memoizedState = {
          dehydrated: current,
          treeContext: null !== treeContextProvider ? { id: treeContextId, overflow: treeContextOverflow } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, renderLanes2 = createFiberFromDehydratedFragment(current), renderLanes2.return = workInProgress2, workInProgress2.child = renderLanes2, hydrationParentFiber = workInProgress2, nextHydratableInstance = null)) : current = null;
        if (null === current) throw throwOnHydrationMismatch(workInProgress2);
        isSuspenseInstanceFallback(current) ? workInProgress2.lanes = 32 : workInProgress2.lanes = 536870912;
        return null;
      }
      var nextPrimaryChildren = nextProps.children;
      nextProps = nextProps.fallback;
      if (showFallback)
        return reuseSuspenseHandlerOnStack(), showFallback = workInProgress2.mode, nextPrimaryChildren = mountWorkInProgressOffscreenFiber(
          { mode: "hidden", children: nextPrimaryChildren },
          showFallback
        ), nextProps = createFiberFromFragment(
          nextProps,
          showFallback,
          renderLanes2,
          null
        ), nextPrimaryChildren.return = workInProgress2, nextProps.return = workInProgress2, nextPrimaryChildren.sibling = nextProps, workInProgress2.child = nextPrimaryChildren, nextProps = workInProgress2.child, nextProps.memoizedState = mountSuspenseOffscreenState(renderLanes2), nextProps.childLanes = getRemainingWorkInPrimaryTree(
          current,
          JSCompiler_temp,
          renderLanes2
        ), workInProgress2.memoizedState = SUSPENDED_MARKER, bailoutOffscreenComponent(null, nextProps);
      pushPrimaryTreeSuspenseHandler(workInProgress2);
      return mountSuspensePrimaryChildren(workInProgress2, nextPrimaryChildren);
    }
    var prevState = current.memoizedState;
    if (null !== prevState && (nextPrimaryChildren = prevState.dehydrated, null !== nextPrimaryChildren)) {
      if (didSuspend)
        workInProgress2.flags & 256 ? (pushPrimaryTreeSuspenseHandler(workInProgress2), workInProgress2.flags &= -257, workInProgress2 = retrySuspenseComponentWithoutHydrating(
          current,
          workInProgress2,
          renderLanes2
        )) : null !== workInProgress2.memoizedState ? (reuseSuspenseHandlerOnStack(), workInProgress2.child = current.child, workInProgress2.flags |= 128, workInProgress2 = null) : (reuseSuspenseHandlerOnStack(), nextPrimaryChildren = nextProps.fallback, showFallback = workInProgress2.mode, nextProps = mountWorkInProgressOffscreenFiber(
          { mode: "visible", children: nextProps.children },
          showFallback
        ), nextPrimaryChildren = createFiberFromFragment(
          nextPrimaryChildren,
          showFallback,
          renderLanes2,
          null
        ), nextPrimaryChildren.flags |= 2, nextProps.return = workInProgress2, nextPrimaryChildren.return = workInProgress2, nextProps.sibling = nextPrimaryChildren, workInProgress2.child = nextProps, reconcileChildFibers(
          workInProgress2,
          current.child,
          null,
          renderLanes2
        ), nextProps = workInProgress2.child, nextProps.memoizedState = mountSuspenseOffscreenState(renderLanes2), nextProps.childLanes = getRemainingWorkInPrimaryTree(
          current,
          JSCompiler_temp,
          renderLanes2
        ), workInProgress2.memoizedState = SUSPENDED_MARKER, workInProgress2 = bailoutOffscreenComponent(null, nextProps));
      else if (pushPrimaryTreeSuspenseHandler(workInProgress2), isSuspenseInstanceFallback(nextPrimaryChildren)) {
        JSCompiler_temp = nextPrimaryChildren.nextSibling && nextPrimaryChildren.nextSibling.dataset;
        if (JSCompiler_temp) var digest = JSCompiler_temp.dgst;
        JSCompiler_temp = digest;
        nextProps = Error(formatProdErrorMessage(419));
        nextProps.stack = "";
        nextProps.digest = JSCompiler_temp;
        queueHydrationError({ value: nextProps, source: null, stack: null });
        workInProgress2 = retrySuspenseComponentWithoutHydrating(
          current,
          workInProgress2,
          renderLanes2
        );
      } else if (didReceiveUpdate || propagateParentContextChanges(current, workInProgress2, renderLanes2, false), JSCompiler_temp = 0 !== (renderLanes2 & current.childLanes), didReceiveUpdate || JSCompiler_temp) {
        JSCompiler_temp = workInProgressRoot;
        if (null !== JSCompiler_temp && (nextProps = getBumpedLaneForHydration(JSCompiler_temp, renderLanes2), 0 !== nextProps && nextProps !== prevState.retryLane))
          throw prevState.retryLane = nextProps, enqueueConcurrentRenderForLane(current, nextProps), scheduleUpdateOnFiber(JSCompiler_temp, current, nextProps), SelectiveHydrationException;
        isSuspenseInstancePending(nextPrimaryChildren) || renderDidSuspendDelayIfPossible();
        workInProgress2 = retrySuspenseComponentWithoutHydrating(
          current,
          workInProgress2,
          renderLanes2
        );
      } else
        isSuspenseInstancePending(nextPrimaryChildren) ? (workInProgress2.flags |= 192, workInProgress2.child = current.child, workInProgress2 = null) : (current = prevState.treeContext, nextHydratableInstance = getNextHydratable(
          nextPrimaryChildren.nextSibling
        ), hydrationParentFiber = workInProgress2, isHydrating = true, hydrationErrors = null, rootOrSingletonContext = false, null !== current && restoreSuspendedTreeContext(workInProgress2, current), workInProgress2 = mountSuspensePrimaryChildren(
          workInProgress2,
          nextProps.children
        ), workInProgress2.flags |= 4096);
      return workInProgress2;
    }
    if (showFallback)
      return reuseSuspenseHandlerOnStack(), nextPrimaryChildren = nextProps.fallback, showFallback = workInProgress2.mode, prevState = current.child, digest = prevState.sibling, nextProps = createWorkInProgress(prevState, {
        mode: "hidden",
        children: nextProps.children
      }), nextProps.subtreeFlags = prevState.subtreeFlags & 65011712, null !== digest ? nextPrimaryChildren = createWorkInProgress(
        digest,
        nextPrimaryChildren
      ) : (nextPrimaryChildren = createFiberFromFragment(
        nextPrimaryChildren,
        showFallback,
        renderLanes2,
        null
      ), nextPrimaryChildren.flags |= 2), nextPrimaryChildren.return = workInProgress2, nextProps.return = workInProgress2, nextProps.sibling = nextPrimaryChildren, workInProgress2.child = nextProps, bailoutOffscreenComponent(null, nextProps), nextProps = workInProgress2.child, nextPrimaryChildren = current.child.memoizedState, null === nextPrimaryChildren ? nextPrimaryChildren = mountSuspenseOffscreenState(renderLanes2) : (showFallback = nextPrimaryChildren.cachePool, null !== showFallback ? (prevState = CacheContext._currentValue, showFallback = showFallback.parent !== prevState ? { parent: prevState, pool: prevState } : showFallback) : showFallback = getSuspendedCache(), nextPrimaryChildren = {
        baseLanes: nextPrimaryChildren.baseLanes | renderLanes2,
        cachePool: showFallback
      }), nextProps.memoizedState = nextPrimaryChildren, nextProps.childLanes = getRemainingWorkInPrimaryTree(
        current,
        JSCompiler_temp,
        renderLanes2
      ), workInProgress2.memoizedState = SUSPENDED_MARKER, bailoutOffscreenComponent(current.child, nextProps);
    pushPrimaryTreeSuspenseHandler(workInProgress2);
    renderLanes2 = current.child;
    current = renderLanes2.sibling;
    renderLanes2 = createWorkInProgress(renderLanes2, {
      mode: "visible",
      children: nextProps.children
    });
    renderLanes2.return = workInProgress2;
    renderLanes2.sibling = null;
    null !== current && (JSCompiler_temp = workInProgress2.deletions, null === JSCompiler_temp ? (workInProgress2.deletions = [current], workInProgress2.flags |= 16) : JSCompiler_temp.push(current));
    workInProgress2.child = renderLanes2;
    workInProgress2.memoizedState = null;
    return renderLanes2;
  }
  function mountSuspensePrimaryChildren(workInProgress2, primaryChildren) {
    primaryChildren = mountWorkInProgressOffscreenFiber(
      { mode: "visible", children: primaryChildren },
      workInProgress2.mode
    );
    primaryChildren.return = workInProgress2;
    return workInProgress2.child = primaryChildren;
  }
  function mountWorkInProgressOffscreenFiber(offscreenProps, mode) {
    offscreenProps = createFiberImplClass(22, offscreenProps, null, mode);
    offscreenProps.lanes = 0;
    return offscreenProps;
  }
  function retrySuspenseComponentWithoutHydrating(current, workInProgress2, renderLanes2) {
    reconcileChildFibers(workInProgress2, current.child, null, renderLanes2);
    current = mountSuspensePrimaryChildren(
      workInProgress2,
      workInProgress2.pendingProps.children
    );
    current.flags |= 2;
    workInProgress2.memoizedState = null;
    return current;
  }
  function scheduleSuspenseWorkOnFiber(fiber, renderLanes2, propagationRoot) {
    fiber.lanes |= renderLanes2;
    var alternate = fiber.alternate;
    null !== alternate && (alternate.lanes |= renderLanes2);
    scheduleContextWorkOnParentPath(fiber.return, renderLanes2, propagationRoot);
  }
  function initSuspenseListRenderState(workInProgress2, isBackwards, tail, lastContentRow, tailMode, treeForkCount2) {
    var renderState = workInProgress2.memoizedState;
    null === renderState ? workInProgress2.memoizedState = {
      isBackwards,
      rendering: null,
      renderingStartTime: 0,
      last: lastContentRow,
      tail,
      tailMode,
      treeForkCount: treeForkCount2
    } : (renderState.isBackwards = isBackwards, renderState.rendering = null, renderState.renderingStartTime = 0, renderState.last = lastContentRow, renderState.tail = tail, renderState.tailMode = tailMode, renderState.treeForkCount = treeForkCount2);
  }
  function updateSuspenseListComponent(current, workInProgress2, renderLanes2) {
    var nextProps = workInProgress2.pendingProps, revealOrder = nextProps.revealOrder, tailMode = nextProps.tail;
    nextProps = nextProps.children;
    var suspenseContext = suspenseStackCursor.current, shouldForceFallback = 0 !== (suspenseContext & 2);
    shouldForceFallback ? (suspenseContext = suspenseContext & 1 | 2, workInProgress2.flags |= 128) : suspenseContext &= 1;
    push(suspenseStackCursor, suspenseContext);
    reconcileChildren(current, workInProgress2, nextProps, renderLanes2);
    nextProps = isHydrating ? treeForkCount : 0;
    if (!shouldForceFallback && null !== current && 0 !== (current.flags & 128))
      a: for (current = workInProgress2.child; null !== current; ) {
        if (13 === current.tag)
          null !== current.memoizedState && scheduleSuspenseWorkOnFiber(current, renderLanes2, workInProgress2);
        else if (19 === current.tag)
          scheduleSuspenseWorkOnFiber(current, renderLanes2, workInProgress2);
        else if (null !== current.child) {
          current.child.return = current;
          current = current.child;
          continue;
        }
        if (current === workInProgress2) break a;
        for (; null === current.sibling; ) {
          if (null === current.return || current.return === workInProgress2)
            break a;
          current = current.return;
        }
        current.sibling.return = current.return;
        current = current.sibling;
      }
    switch (revealOrder) {
      case "forwards":
        renderLanes2 = workInProgress2.child;
        for (revealOrder = null; null !== renderLanes2; )
          current = renderLanes2.alternate, null !== current && null === findFirstSuspended(current) && (revealOrder = renderLanes2), renderLanes2 = renderLanes2.sibling;
        renderLanes2 = revealOrder;
        null === renderLanes2 ? (revealOrder = workInProgress2.child, workInProgress2.child = null) : (revealOrder = renderLanes2.sibling, renderLanes2.sibling = null);
        initSuspenseListRenderState(
          workInProgress2,
          false,
          revealOrder,
          renderLanes2,
          tailMode,
          nextProps
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        renderLanes2 = null;
        revealOrder = workInProgress2.child;
        for (workInProgress2.child = null; null !== revealOrder; ) {
          current = revealOrder.alternate;
          if (null !== current && null === findFirstSuspended(current)) {
            workInProgress2.child = revealOrder;
            break;
          }
          current = revealOrder.sibling;
          revealOrder.sibling = renderLanes2;
          renderLanes2 = revealOrder;
          revealOrder = current;
        }
        initSuspenseListRenderState(
          workInProgress2,
          true,
          renderLanes2,
          null,
          tailMode,
          nextProps
        );
        break;
      case "together":
        initSuspenseListRenderState(
          workInProgress2,
          false,
          null,
          null,
          void 0,
          nextProps
        );
        break;
      default:
        workInProgress2.memoizedState = null;
    }
    return workInProgress2.child;
  }
  function bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2) {
    null !== current && (workInProgress2.dependencies = current.dependencies);
    workInProgressRootSkippedLanes |= workInProgress2.lanes;
    if (0 === (renderLanes2 & workInProgress2.childLanes))
      if (null !== current) {
        if (propagateParentContextChanges(
          current,
          workInProgress2,
          renderLanes2,
          false
        ), 0 === (renderLanes2 & workInProgress2.childLanes))
          return null;
      } else return null;
    if (null !== current && workInProgress2.child !== current.child)
      throw Error(formatProdErrorMessage(153));
    if (null !== workInProgress2.child) {
      current = workInProgress2.child;
      renderLanes2 = createWorkInProgress(current, current.pendingProps);
      workInProgress2.child = renderLanes2;
      for (renderLanes2.return = workInProgress2; null !== current.sibling; )
        current = current.sibling, renderLanes2 = renderLanes2.sibling = createWorkInProgress(current, current.pendingProps), renderLanes2.return = workInProgress2;
      renderLanes2.sibling = null;
    }
    return workInProgress2.child;
  }
  function checkScheduledUpdateOrContext(current, renderLanes2) {
    if (0 !== (current.lanes & renderLanes2)) return true;
    current = current.dependencies;
    return null !== current && checkIfContextChanged(current) ? true : false;
  }
  function attemptEarlyBailoutIfNoScheduledUpdate(current, workInProgress2, renderLanes2) {
    switch (workInProgress2.tag) {
      case 3:
        pushHostContainer(workInProgress2, workInProgress2.stateNode.containerInfo);
        pushProvider(workInProgress2, CacheContext, current.memoizedState.cache);
        resetHydrationState();
        break;
      case 27:
      case 5:
        pushHostContext(workInProgress2);
        break;
      case 4:
        pushHostContainer(workInProgress2, workInProgress2.stateNode.containerInfo);
        break;
      case 10:
        pushProvider(
          workInProgress2,
          workInProgress2.type,
          workInProgress2.memoizedProps.value
        );
        break;
      case 31:
        if (null !== workInProgress2.memoizedState)
          return workInProgress2.flags |= 128, pushDehydratedActivitySuspenseHandler(workInProgress2), null;
        break;
      case 13:
        var state$102 = workInProgress2.memoizedState;
        if (null !== state$102) {
          if (null !== state$102.dehydrated)
            return pushPrimaryTreeSuspenseHandler(workInProgress2), workInProgress2.flags |= 128, null;
          if (0 !== (renderLanes2 & workInProgress2.child.childLanes))
            return updateSuspenseComponent(current, workInProgress2, renderLanes2);
          pushPrimaryTreeSuspenseHandler(workInProgress2);
          current = bailoutOnAlreadyFinishedWork(
            current,
            workInProgress2,
            renderLanes2
          );
          return null !== current ? current.sibling : null;
        }
        pushPrimaryTreeSuspenseHandler(workInProgress2);
        break;
      case 19:
        var didSuspendBefore = 0 !== (current.flags & 128);
        state$102 = 0 !== (renderLanes2 & workInProgress2.childLanes);
        state$102 || (propagateParentContextChanges(
          current,
          workInProgress2,
          renderLanes2,
          false
        ), state$102 = 0 !== (renderLanes2 & workInProgress2.childLanes));
        if (didSuspendBefore) {
          if (state$102)
            return updateSuspenseListComponent(
              current,
              workInProgress2,
              renderLanes2
            );
          workInProgress2.flags |= 128;
        }
        didSuspendBefore = workInProgress2.memoizedState;
        null !== didSuspendBefore && (didSuspendBefore.rendering = null, didSuspendBefore.tail = null, didSuspendBefore.lastEffect = null);
        push(suspenseStackCursor, suspenseStackCursor.current);
        if (state$102) break;
        else return null;
      case 22:
        return workInProgress2.lanes = 0, updateOffscreenComponent(
          current,
          workInProgress2,
          renderLanes2,
          workInProgress2.pendingProps
        );
      case 24:
        pushProvider(workInProgress2, CacheContext, current.memoizedState.cache);
    }
    return bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
  }
  function beginWork(current, workInProgress2, renderLanes2) {
    if (null !== current)
      if (current.memoizedProps !== workInProgress2.pendingProps)
        didReceiveUpdate = true;
      else {
        if (!checkScheduledUpdateOrContext(current, renderLanes2) && 0 === (workInProgress2.flags & 128))
          return didReceiveUpdate = false, attemptEarlyBailoutIfNoScheduledUpdate(
            current,
            workInProgress2,
            renderLanes2
          );
        didReceiveUpdate = 0 !== (current.flags & 131072) ? true : false;
      }
    else
      didReceiveUpdate = false, isHydrating && 0 !== (workInProgress2.flags & 1048576) && pushTreeId(workInProgress2, treeForkCount, workInProgress2.index);
    workInProgress2.lanes = 0;
    switch (workInProgress2.tag) {
      case 16:
        a: {
          var props = workInProgress2.pendingProps;
          current = resolveLazy(workInProgress2.elementType);
          workInProgress2.type = current;
          if ("function" === typeof current)
            shouldConstruct(current) ? (props = resolveClassComponentProps(current, props), workInProgress2.tag = 1, workInProgress2 = updateClassComponent(
              null,
              workInProgress2,
              current,
              props,
              renderLanes2
            )) : (workInProgress2.tag = 0, workInProgress2 = updateFunctionComponent(
              null,
              workInProgress2,
              current,
              props,
              renderLanes2
            ));
          else {
            if (void 0 !== current && null !== current) {
              var $$typeof = current.$$typeof;
              if ($$typeof === REACT_FORWARD_REF_TYPE) {
                workInProgress2.tag = 11;
                workInProgress2 = updateForwardRef(
                  null,
                  workInProgress2,
                  current,
                  props,
                  renderLanes2
                );
                break a;
              } else if ($$typeof === REACT_MEMO_TYPE) {
                workInProgress2.tag = 14;
                workInProgress2 = updateMemoComponent(
                  null,
                  workInProgress2,
                  current,
                  props,
                  renderLanes2
                );
                break a;
              }
            }
            workInProgress2 = getComponentNameFromType(current) || current;
            throw Error(formatProdErrorMessage(306, workInProgress2, ""));
          }
        }
        return workInProgress2;
      case 0:
        return updateFunctionComponent(
          current,
          workInProgress2,
          workInProgress2.type,
          workInProgress2.pendingProps,
          renderLanes2
        );
      case 1:
        return props = workInProgress2.type, $$typeof = resolveClassComponentProps(
          props,
          workInProgress2.pendingProps
        ), updateClassComponent(
          current,
          workInProgress2,
          props,
          $$typeof,
          renderLanes2
        );
      case 3:
        a: {
          pushHostContainer(
            workInProgress2,
            workInProgress2.stateNode.containerInfo
          );
          if (null === current) throw Error(formatProdErrorMessage(387));
          props = workInProgress2.pendingProps;
          var prevState = workInProgress2.memoizedState;
          $$typeof = prevState.element;
          cloneUpdateQueue(current, workInProgress2);
          processUpdateQueue(workInProgress2, props, null, renderLanes2);
          var nextState = workInProgress2.memoizedState;
          props = nextState.cache;
          pushProvider(workInProgress2, CacheContext, props);
          props !== prevState.cache && propagateContextChanges(
            workInProgress2,
            [CacheContext],
            renderLanes2,
            true
          );
          suspendIfUpdateReadFromEntangledAsyncAction();
          props = nextState.element;
          if (prevState.isDehydrated)
            if (prevState = {
              element: props,
              isDehydrated: false,
              cache: nextState.cache
            }, workInProgress2.updateQueue.baseState = prevState, workInProgress2.memoizedState = prevState, workInProgress2.flags & 256) {
              workInProgress2 = mountHostRootWithoutHydrating(
                current,
                workInProgress2,
                props,
                renderLanes2
              );
              break a;
            } else if (props !== $$typeof) {
              $$typeof = createCapturedValueAtFiber(
                Error(formatProdErrorMessage(424)),
                workInProgress2
              );
              queueHydrationError($$typeof);
              workInProgress2 = mountHostRootWithoutHydrating(
                current,
                workInProgress2,
                props,
                renderLanes2
              );
              break a;
            } else {
              current = workInProgress2.stateNode.containerInfo;
              switch (current.nodeType) {
                case 9:
                  current = current.body;
                  break;
                default:
                  current = "HTML" === current.nodeName ? current.ownerDocument.body : current;
              }
              nextHydratableInstance = getNextHydratable(current.firstChild);
              hydrationParentFiber = workInProgress2;
              isHydrating = true;
              hydrationErrors = null;
              rootOrSingletonContext = true;
              renderLanes2 = mountChildFibers(
                workInProgress2,
                null,
                props,
                renderLanes2
              );
              for (workInProgress2.child = renderLanes2; renderLanes2; )
                renderLanes2.flags = renderLanes2.flags & -3 | 4096, renderLanes2 = renderLanes2.sibling;
            }
          else {
            resetHydrationState();
            if (props === $$typeof) {
              workInProgress2 = bailoutOnAlreadyFinishedWork(
                current,
                workInProgress2,
                renderLanes2
              );
              break a;
            }
            reconcileChildren(current, workInProgress2, props, renderLanes2);
          }
          workInProgress2 = workInProgress2.child;
        }
        return workInProgress2;
      case 26:
        return markRef(current, workInProgress2), null === current ? (renderLanes2 = getResource(
          workInProgress2.type,
          null,
          workInProgress2.pendingProps,
          null
        )) ? workInProgress2.memoizedState = renderLanes2 : isHydrating || (renderLanes2 = workInProgress2.type, current = workInProgress2.pendingProps, props = getOwnerDocumentFromRootContainer(
          rootInstanceStackCursor.current
        ).createElement(renderLanes2), props[internalInstanceKey] = workInProgress2, props[internalPropsKey] = current, setInitialProperties(props, renderLanes2, current), markNodeAsHoistable(props), workInProgress2.stateNode = props) : workInProgress2.memoizedState = getResource(
          workInProgress2.type,
          current.memoizedProps,
          workInProgress2.pendingProps,
          current.memoizedState
        ), null;
      case 27:
        return pushHostContext(workInProgress2), null === current && isHydrating && (props = workInProgress2.stateNode = resolveSingletonInstance(
          workInProgress2.type,
          workInProgress2.pendingProps,
          rootInstanceStackCursor.current
        ), hydrationParentFiber = workInProgress2, rootOrSingletonContext = true, $$typeof = nextHydratableInstance, isSingletonScope(workInProgress2.type) ? (previousHydratableOnEnteringScopedSingleton = $$typeof, nextHydratableInstance = getNextHydratable(props.firstChild)) : nextHydratableInstance = $$typeof), reconcileChildren(
          current,
          workInProgress2,
          workInProgress2.pendingProps.children,
          renderLanes2
        ), markRef(current, workInProgress2), null === current && (workInProgress2.flags |= 4194304), workInProgress2.child;
      case 5:
        if (null === current && isHydrating) {
          if ($$typeof = props = nextHydratableInstance)
            props = canHydrateInstance(
              props,
              workInProgress2.type,
              workInProgress2.pendingProps,
              rootOrSingletonContext
            ), null !== props ? (workInProgress2.stateNode = props, hydrationParentFiber = workInProgress2, nextHydratableInstance = getNextHydratable(props.firstChild), rootOrSingletonContext = false, $$typeof = true) : $$typeof = false;
          $$typeof || throwOnHydrationMismatch(workInProgress2);
        }
        pushHostContext(workInProgress2);
        $$typeof = workInProgress2.type;
        prevState = workInProgress2.pendingProps;
        nextState = null !== current ? current.memoizedProps : null;
        props = prevState.children;
        shouldSetTextContent($$typeof, prevState) ? props = null : null !== nextState && shouldSetTextContent($$typeof, nextState) && (workInProgress2.flags |= 32);
        null !== workInProgress2.memoizedState && ($$typeof = renderWithHooks(
          current,
          workInProgress2,
          TransitionAwareHostComponent,
          null,
          null,
          renderLanes2
        ), HostTransitionContext._currentValue = $$typeof);
        markRef(current, workInProgress2);
        reconcileChildren(current, workInProgress2, props, renderLanes2);
        return workInProgress2.child;
      case 6:
        if (null === current && isHydrating) {
          if (current = renderLanes2 = nextHydratableInstance)
            renderLanes2 = canHydrateTextInstance(
              renderLanes2,
              workInProgress2.pendingProps,
              rootOrSingletonContext
            ), null !== renderLanes2 ? (workInProgress2.stateNode = renderLanes2, hydrationParentFiber = workInProgress2, nextHydratableInstance = null, current = true) : current = false;
          current || throwOnHydrationMismatch(workInProgress2);
        }
        return null;
      case 13:
        return updateSuspenseComponent(current, workInProgress2, renderLanes2);
      case 4:
        return pushHostContainer(
          workInProgress2,
          workInProgress2.stateNode.containerInfo
        ), props = workInProgress2.pendingProps, null === current ? workInProgress2.child = reconcileChildFibers(
          workInProgress2,
          null,
          props,
          renderLanes2
        ) : reconcileChildren(current, workInProgress2, props, renderLanes2), workInProgress2.child;
      case 11:
        return updateForwardRef(
          current,
          workInProgress2,
          workInProgress2.type,
          workInProgress2.pendingProps,
          renderLanes2
        );
      case 7:
        return reconcileChildren(
          current,
          workInProgress2,
          workInProgress2.pendingProps,
          renderLanes2
        ), workInProgress2.child;
      case 8:
        return reconcileChildren(
          current,
          workInProgress2,
          workInProgress2.pendingProps.children,
          renderLanes2
        ), workInProgress2.child;
      case 12:
        return reconcileChildren(
          current,
          workInProgress2,
          workInProgress2.pendingProps.children,
          renderLanes2
        ), workInProgress2.child;
      case 10:
        return props = workInProgress2.pendingProps, pushProvider(workInProgress2, workInProgress2.type, props.value), reconcileChildren(current, workInProgress2, props.children, renderLanes2), workInProgress2.child;
      case 9:
        return $$typeof = workInProgress2.type._context, props = workInProgress2.pendingProps.children, prepareToReadContext(workInProgress2), $$typeof = readContext($$typeof), props = props($$typeof), workInProgress2.flags |= 1, reconcileChildren(current, workInProgress2, props, renderLanes2), workInProgress2.child;
      case 14:
        return updateMemoComponent(
          current,
          workInProgress2,
          workInProgress2.type,
          workInProgress2.pendingProps,
          renderLanes2
        );
      case 15:
        return updateSimpleMemoComponent(
          current,
          workInProgress2,
          workInProgress2.type,
          workInProgress2.pendingProps,
          renderLanes2
        );
      case 19:
        return updateSuspenseListComponent(current, workInProgress2, renderLanes2);
      case 31:
        return updateActivityComponent(current, workInProgress2, renderLanes2);
      case 22:
        return updateOffscreenComponent(
          current,
          workInProgress2,
          renderLanes2,
          workInProgress2.pendingProps
        );
      case 24:
        return prepareToReadContext(workInProgress2), props = readContext(CacheContext), null === current ? ($$typeof = peekCacheFromPool(), null === $$typeof && ($$typeof = workInProgressRoot, prevState = createCache(), $$typeof.pooledCache = prevState, prevState.refCount++, null !== prevState && ($$typeof.pooledCacheLanes |= renderLanes2), $$typeof = prevState), workInProgress2.memoizedState = { parent: props, cache: $$typeof }, initializeUpdateQueue(workInProgress2), pushProvider(workInProgress2, CacheContext, $$typeof)) : (0 !== (current.lanes & renderLanes2) && (cloneUpdateQueue(current, workInProgress2), processUpdateQueue(workInProgress2, null, null, renderLanes2), suspendIfUpdateReadFromEntangledAsyncAction()), $$typeof = current.memoizedState, prevState = workInProgress2.memoizedState, $$typeof.parent !== props ? ($$typeof = { parent: props, cache: props }, workInProgress2.memoizedState = $$typeof, 0 === workInProgress2.lanes && (workInProgress2.memoizedState = workInProgress2.updateQueue.baseState = $$typeof), pushProvider(workInProgress2, CacheContext, props)) : (props = prevState.cache, pushProvider(workInProgress2, CacheContext, props), props !== $$typeof.cache && propagateContextChanges(
          workInProgress2,
          [CacheContext],
          renderLanes2,
          true
        ))), reconcileChildren(
          current,
          workInProgress2,
          workInProgress2.pendingProps.children,
          renderLanes2
        ), workInProgress2.child;
      case 29:
        throw workInProgress2.pendingProps;
    }
    throw Error(formatProdErrorMessage(156, workInProgress2.tag));
  }
  function markUpdate(workInProgress2) {
    workInProgress2.flags |= 4;
  }
  function preloadInstanceAndSuspendIfNeeded(workInProgress2, type, oldProps, newProps, renderLanes2) {
    if (type = 0 !== (workInProgress2.mode & 32)) type = false;
    if (type) {
      if (workInProgress2.flags |= 16777216, (renderLanes2 & 335544128) === renderLanes2)
        if (workInProgress2.stateNode.complete) workInProgress2.flags |= 8192;
        else if (shouldRemainOnPreviousScreen()) workInProgress2.flags |= 8192;
        else
          throw suspendedThenable = noopSuspenseyCommitThenable, SuspenseyCommitException;
    } else workInProgress2.flags &= -16777217;
  }
  function preloadResourceAndSuspendIfNeeded(workInProgress2, resource) {
    if ("stylesheet" !== resource.type || 0 !== (resource.state.loading & 4))
      workInProgress2.flags &= -16777217;
    else if (workInProgress2.flags |= 16777216, !preloadResource(resource))
      if (shouldRemainOnPreviousScreen()) workInProgress2.flags |= 8192;
      else
        throw suspendedThenable = noopSuspenseyCommitThenable, SuspenseyCommitException;
  }
  function scheduleRetryEffect(workInProgress2, retryQueue) {
    null !== retryQueue && (workInProgress2.flags |= 4);
    workInProgress2.flags & 16384 && (retryQueue = 22 !== workInProgress2.tag ? claimNextRetryLane() : 536870912, workInProgress2.lanes |= retryQueue, workInProgressSuspendedRetryLanes |= retryQueue);
  }
  function cutOffTailIfNeeded(renderState, hasRenderedATailFallback) {
    if (!isHydrating)
      switch (renderState.tailMode) {
        case "hidden":
          hasRenderedATailFallback = renderState.tail;
          for (var lastTailNode = null; null !== hasRenderedATailFallback; )
            null !== hasRenderedATailFallback.alternate && (lastTailNode = hasRenderedATailFallback), hasRenderedATailFallback = hasRenderedATailFallback.sibling;
          null === lastTailNode ? renderState.tail = null : lastTailNode.sibling = null;
          break;
        case "collapsed":
          lastTailNode = renderState.tail;
          for (var lastTailNode$106 = null; null !== lastTailNode; )
            null !== lastTailNode.alternate && (lastTailNode$106 = lastTailNode), lastTailNode = lastTailNode.sibling;
          null === lastTailNode$106 ? hasRenderedATailFallback || null === renderState.tail ? renderState.tail = null : renderState.tail.sibling = null : lastTailNode$106.sibling = null;
      }
  }
  function bubbleProperties(completedWork) {
    var didBailout = null !== completedWork.alternate && completedWork.alternate.child === completedWork.child, newChildLanes = 0, subtreeFlags = 0;
    if (didBailout)
      for (var child$107 = completedWork.child; null !== child$107; )
        newChildLanes |= child$107.lanes | child$107.childLanes, subtreeFlags |= child$107.subtreeFlags & 65011712, subtreeFlags |= child$107.flags & 65011712, child$107.return = completedWork, child$107 = child$107.sibling;
    else
      for (child$107 = completedWork.child; null !== child$107; )
        newChildLanes |= child$107.lanes | child$107.childLanes, subtreeFlags |= child$107.subtreeFlags, subtreeFlags |= child$107.flags, child$107.return = completedWork, child$107 = child$107.sibling;
    completedWork.subtreeFlags |= subtreeFlags;
    completedWork.childLanes = newChildLanes;
    return didBailout;
  }
  function completeWork(current, workInProgress2, renderLanes2) {
    var newProps = workInProgress2.pendingProps;
    popTreeContext(workInProgress2);
    switch (workInProgress2.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return bubbleProperties(workInProgress2), null;
      case 1:
        return bubbleProperties(workInProgress2), null;
      case 3:
        renderLanes2 = workInProgress2.stateNode;
        newProps = null;
        null !== current && (newProps = current.memoizedState.cache);
        workInProgress2.memoizedState.cache !== newProps && (workInProgress2.flags |= 2048);
        popProvider(CacheContext);
        popHostContainer();
        renderLanes2.pendingContext && (renderLanes2.context = renderLanes2.pendingContext, renderLanes2.pendingContext = null);
        if (null === current || null === current.child)
          popHydrationState(workInProgress2) ? markUpdate(workInProgress2) : null === current || current.memoizedState.isDehydrated && 0 === (workInProgress2.flags & 256) || (workInProgress2.flags |= 1024, upgradeHydrationErrorsToRecoverable());
        bubbleProperties(workInProgress2);
        return null;
      case 26:
        var type = workInProgress2.type, nextResource = workInProgress2.memoizedState;
        null === current ? (markUpdate(workInProgress2), null !== nextResource ? (bubbleProperties(workInProgress2), preloadResourceAndSuspendIfNeeded(workInProgress2, nextResource)) : (bubbleProperties(workInProgress2), preloadInstanceAndSuspendIfNeeded(
          workInProgress2,
          type,
          null,
          newProps,
          renderLanes2
        ))) : nextResource ? nextResource !== current.memoizedState ? (markUpdate(workInProgress2), bubbleProperties(workInProgress2), preloadResourceAndSuspendIfNeeded(workInProgress2, nextResource)) : (bubbleProperties(workInProgress2), workInProgress2.flags &= -16777217) : (current = current.memoizedProps, current !== newProps && markUpdate(workInProgress2), bubbleProperties(workInProgress2), preloadInstanceAndSuspendIfNeeded(
          workInProgress2,
          type,
          current,
          newProps,
          renderLanes2
        ));
        return null;
      case 27:
        popHostContext(workInProgress2);
        renderLanes2 = rootInstanceStackCursor.current;
        type = workInProgress2.type;
        if (null !== current && null != workInProgress2.stateNode)
          current.memoizedProps !== newProps && markUpdate(workInProgress2);
        else {
          if (!newProps) {
            if (null === workInProgress2.stateNode)
              throw Error(formatProdErrorMessage(166));
            bubbleProperties(workInProgress2);
            return null;
          }
          current = contextStackCursor.current;
          popHydrationState(workInProgress2) ? prepareToHydrateHostInstance(workInProgress2) : (current = resolveSingletonInstance(type, newProps, renderLanes2), workInProgress2.stateNode = current, markUpdate(workInProgress2));
        }
        bubbleProperties(workInProgress2);
        return null;
      case 5:
        popHostContext(workInProgress2);
        type = workInProgress2.type;
        if (null !== current && null != workInProgress2.stateNode)
          current.memoizedProps !== newProps && markUpdate(workInProgress2);
        else {
          if (!newProps) {
            if (null === workInProgress2.stateNode)
              throw Error(formatProdErrorMessage(166));
            bubbleProperties(workInProgress2);
            return null;
          }
          nextResource = contextStackCursor.current;
          if (popHydrationState(workInProgress2))
            prepareToHydrateHostInstance(workInProgress2);
          else {
            var ownerDocument = getOwnerDocumentFromRootContainer(
              rootInstanceStackCursor.current
            );
            switch (nextResource) {
              case 1:
                nextResource = ownerDocument.createElementNS(
                  "http://www.w3.org/2000/svg",
                  type
                );
                break;
              case 2:
                nextResource = ownerDocument.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  type
                );
                break;
              default:
                switch (type) {
                  case "svg":
                    nextResource = ownerDocument.createElementNS(
                      "http://www.w3.org/2000/svg",
                      type
                    );
                    break;
                  case "math":
                    nextResource = ownerDocument.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      type
                    );
                    break;
                  case "script":
                    nextResource = ownerDocument.createElement("div");
                    nextResource.innerHTML = "<script><\/script>";
                    nextResource = nextResource.removeChild(
                      nextResource.firstChild
                    );
                    break;
                  case "select":
                    nextResource = "string" === typeof newProps.is ? ownerDocument.createElement("select", {
                      is: newProps.is
                    }) : ownerDocument.createElement("select");
                    newProps.multiple ? nextResource.multiple = true : newProps.size && (nextResource.size = newProps.size);
                    break;
                  default:
                    nextResource = "string" === typeof newProps.is ? ownerDocument.createElement(type, { is: newProps.is }) : ownerDocument.createElement(type);
                }
            }
            nextResource[internalInstanceKey] = workInProgress2;
            nextResource[internalPropsKey] = newProps;
            a: for (ownerDocument = workInProgress2.child; null !== ownerDocument; ) {
              if (5 === ownerDocument.tag || 6 === ownerDocument.tag)
                nextResource.appendChild(ownerDocument.stateNode);
              else if (4 !== ownerDocument.tag && 27 !== ownerDocument.tag && null !== ownerDocument.child) {
                ownerDocument.child.return = ownerDocument;
                ownerDocument = ownerDocument.child;
                continue;
              }
              if (ownerDocument === workInProgress2) break a;
              for (; null === ownerDocument.sibling; ) {
                if (null === ownerDocument.return || ownerDocument.return === workInProgress2)
                  break a;
                ownerDocument = ownerDocument.return;
              }
              ownerDocument.sibling.return = ownerDocument.return;
              ownerDocument = ownerDocument.sibling;
            }
            workInProgress2.stateNode = nextResource;
            a: switch (setInitialProperties(nextResource, type, newProps), type) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                newProps = !!newProps.autoFocus;
                break a;
              case "img":
                newProps = true;
                break a;
              default:
                newProps = false;
            }
            newProps && markUpdate(workInProgress2);
          }
        }
        bubbleProperties(workInProgress2);
        preloadInstanceAndSuspendIfNeeded(
          workInProgress2,
          workInProgress2.type,
          null === current ? null : current.memoizedProps,
          workInProgress2.pendingProps,
          renderLanes2
        );
        return null;
      case 6:
        if (current && null != workInProgress2.stateNode)
          current.memoizedProps !== newProps && markUpdate(workInProgress2);
        else {
          if ("string" !== typeof newProps && null === workInProgress2.stateNode)
            throw Error(formatProdErrorMessage(166));
          current = rootInstanceStackCursor.current;
          if (popHydrationState(workInProgress2)) {
            current = workInProgress2.stateNode;
            renderLanes2 = workInProgress2.memoizedProps;
            newProps = null;
            type = hydrationParentFiber;
            if (null !== type)
              switch (type.tag) {
                case 27:
                case 5:
                  newProps = type.memoizedProps;
              }
            current[internalInstanceKey] = workInProgress2;
            current = current.nodeValue === renderLanes2 || null !== newProps && true === newProps.suppressHydrationWarning || checkForUnmatchedText(current.nodeValue, renderLanes2) ? true : false;
            current || throwOnHydrationMismatch(workInProgress2, true);
          } else
            current = getOwnerDocumentFromRootContainer(current).createTextNode(
              newProps
            ), current[internalInstanceKey] = workInProgress2, workInProgress2.stateNode = current;
        }
        bubbleProperties(workInProgress2);
        return null;
      case 31:
        renderLanes2 = workInProgress2.memoizedState;
        if (null === current || null !== current.memoizedState) {
          newProps = popHydrationState(workInProgress2);
          if (null !== renderLanes2) {
            if (null === current) {
              if (!newProps) throw Error(formatProdErrorMessage(318));
              current = workInProgress2.memoizedState;
              current = null !== current ? current.dehydrated : null;
              if (!current) throw Error(formatProdErrorMessage(557));
              current[internalInstanceKey] = workInProgress2;
            } else
              resetHydrationState(), 0 === (workInProgress2.flags & 128) && (workInProgress2.memoizedState = null), workInProgress2.flags |= 4;
            bubbleProperties(workInProgress2);
            current = false;
          } else
            renderLanes2 = upgradeHydrationErrorsToRecoverable(), null !== current && null !== current.memoizedState && (current.memoizedState.hydrationErrors = renderLanes2), current = true;
          if (!current) {
            if (workInProgress2.flags & 256)
              return popSuspenseHandler(workInProgress2), workInProgress2;
            popSuspenseHandler(workInProgress2);
            return null;
          }
          if (0 !== (workInProgress2.flags & 128))
            throw Error(formatProdErrorMessage(558));
        }
        bubbleProperties(workInProgress2);
        return null;
      case 13:
        newProps = workInProgress2.memoizedState;
        if (null === current || null !== current.memoizedState && null !== current.memoizedState.dehydrated) {
          type = popHydrationState(workInProgress2);
          if (null !== newProps && null !== newProps.dehydrated) {
            if (null === current) {
              if (!type) throw Error(formatProdErrorMessage(318));
              type = workInProgress2.memoizedState;
              type = null !== type ? type.dehydrated : null;
              if (!type) throw Error(formatProdErrorMessage(317));
              type[internalInstanceKey] = workInProgress2;
            } else
              resetHydrationState(), 0 === (workInProgress2.flags & 128) && (workInProgress2.memoizedState = null), workInProgress2.flags |= 4;
            bubbleProperties(workInProgress2);
            type = false;
          } else
            type = upgradeHydrationErrorsToRecoverable(), null !== current && null !== current.memoizedState && (current.memoizedState.hydrationErrors = type), type = true;
          if (!type) {
            if (workInProgress2.flags & 256)
              return popSuspenseHandler(workInProgress2), workInProgress2;
            popSuspenseHandler(workInProgress2);
            return null;
          }
        }
        popSuspenseHandler(workInProgress2);
        if (0 !== (workInProgress2.flags & 128))
          return workInProgress2.lanes = renderLanes2, workInProgress2;
        renderLanes2 = null !== newProps;
        current = null !== current && null !== current.memoizedState;
        renderLanes2 && (newProps = workInProgress2.child, type = null, null !== newProps.alternate && null !== newProps.alternate.memoizedState && null !== newProps.alternate.memoizedState.cachePool && (type = newProps.alternate.memoizedState.cachePool.pool), nextResource = null, null !== newProps.memoizedState && null !== newProps.memoizedState.cachePool && (nextResource = newProps.memoizedState.cachePool.pool), nextResource !== type && (newProps.flags |= 2048));
        renderLanes2 !== current && renderLanes2 && (workInProgress2.child.flags |= 8192);
        scheduleRetryEffect(workInProgress2, workInProgress2.updateQueue);
        bubbleProperties(workInProgress2);
        return null;
      case 4:
        return popHostContainer(), null === current && listenToAllSupportedEvents(workInProgress2.stateNode.containerInfo), bubbleProperties(workInProgress2), null;
      case 10:
        return popProvider(workInProgress2.type), bubbleProperties(workInProgress2), null;
      case 19:
        pop(suspenseStackCursor);
        newProps = workInProgress2.memoizedState;
        if (null === newProps) return bubbleProperties(workInProgress2), null;
        type = 0 !== (workInProgress2.flags & 128);
        nextResource = newProps.rendering;
        if (null === nextResource)
          if (type) cutOffTailIfNeeded(newProps, false);
          else {
            if (0 !== workInProgressRootExitStatus || null !== current && 0 !== (current.flags & 128))
              for (current = workInProgress2.child; null !== current; ) {
                nextResource = findFirstSuspended(current);
                if (null !== nextResource) {
                  workInProgress2.flags |= 128;
                  cutOffTailIfNeeded(newProps, false);
                  current = nextResource.updateQueue;
                  workInProgress2.updateQueue = current;
                  scheduleRetryEffect(workInProgress2, current);
                  workInProgress2.subtreeFlags = 0;
                  current = renderLanes2;
                  for (renderLanes2 = workInProgress2.child; null !== renderLanes2; )
                    resetWorkInProgress(renderLanes2, current), renderLanes2 = renderLanes2.sibling;
                  push(
                    suspenseStackCursor,
                    suspenseStackCursor.current & 1 | 2
                  );
                  isHydrating && pushTreeFork(workInProgress2, newProps.treeForkCount);
                  return workInProgress2.child;
                }
                current = current.sibling;
              }
            null !== newProps.tail && now() > workInProgressRootRenderTargetTime && (workInProgress2.flags |= 128, type = true, cutOffTailIfNeeded(newProps, false), workInProgress2.lanes = 4194304);
          }
        else {
          if (!type)
            if (current = findFirstSuspended(nextResource), null !== current) {
              if (workInProgress2.flags |= 128, type = true, current = current.updateQueue, workInProgress2.updateQueue = current, scheduleRetryEffect(workInProgress2, current), cutOffTailIfNeeded(newProps, true), null === newProps.tail && "hidden" === newProps.tailMode && !nextResource.alternate && !isHydrating)
                return bubbleProperties(workInProgress2), null;
            } else
              2 * now() - newProps.renderingStartTime > workInProgressRootRenderTargetTime && 536870912 !== renderLanes2 && (workInProgress2.flags |= 128, type = true, cutOffTailIfNeeded(newProps, false), workInProgress2.lanes = 4194304);
          newProps.isBackwards ? (nextResource.sibling = workInProgress2.child, workInProgress2.child = nextResource) : (current = newProps.last, null !== current ? current.sibling = nextResource : workInProgress2.child = nextResource, newProps.last = nextResource);
        }
        if (null !== newProps.tail)
          return current = newProps.tail, newProps.rendering = current, newProps.tail = current.sibling, newProps.renderingStartTime = now(), current.sibling = null, renderLanes2 = suspenseStackCursor.current, push(
            suspenseStackCursor,
            type ? renderLanes2 & 1 | 2 : renderLanes2 & 1
          ), isHydrating && pushTreeFork(workInProgress2, newProps.treeForkCount), current;
        bubbleProperties(workInProgress2);
        return null;
      case 22:
      case 23:
        return popSuspenseHandler(workInProgress2), popHiddenContext(), newProps = null !== workInProgress2.memoizedState, null !== current ? null !== current.memoizedState !== newProps && (workInProgress2.flags |= 8192) : newProps && (workInProgress2.flags |= 8192), newProps ? 0 !== (renderLanes2 & 536870912) && 0 === (workInProgress2.flags & 128) && (bubbleProperties(workInProgress2), workInProgress2.subtreeFlags & 6 && (workInProgress2.flags |= 8192)) : bubbleProperties(workInProgress2), renderLanes2 = workInProgress2.updateQueue, null !== renderLanes2 && scheduleRetryEffect(workInProgress2, renderLanes2.retryQueue), renderLanes2 = null, null !== current && null !== current.memoizedState && null !== current.memoizedState.cachePool && (renderLanes2 = current.memoizedState.cachePool.pool), newProps = null, null !== workInProgress2.memoizedState && null !== workInProgress2.memoizedState.cachePool && (newProps = workInProgress2.memoizedState.cachePool.pool), newProps !== renderLanes2 && (workInProgress2.flags |= 2048), null !== current && pop(resumedCache), null;
      case 24:
        return renderLanes2 = null, null !== current && (renderLanes2 = current.memoizedState.cache), workInProgress2.memoizedState.cache !== renderLanes2 && (workInProgress2.flags |= 2048), popProvider(CacheContext), bubbleProperties(workInProgress2), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(formatProdErrorMessage(156, workInProgress2.tag));
  }
  function unwindWork(current, workInProgress2) {
    popTreeContext(workInProgress2);
    switch (workInProgress2.tag) {
      case 1:
        return current = workInProgress2.flags, current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
      case 3:
        return popProvider(CacheContext), popHostContainer(), current = workInProgress2.flags, 0 !== (current & 65536) && 0 === (current & 128) ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
      case 26:
      case 27:
      case 5:
        return popHostContext(workInProgress2), null;
      case 31:
        if (null !== workInProgress2.memoizedState) {
          popSuspenseHandler(workInProgress2);
          if (null === workInProgress2.alternate)
            throw Error(formatProdErrorMessage(340));
          resetHydrationState();
        }
        current = workInProgress2.flags;
        return current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
      case 13:
        popSuspenseHandler(workInProgress2);
        current = workInProgress2.memoizedState;
        if (null !== current && null !== current.dehydrated) {
          if (null === workInProgress2.alternate)
            throw Error(formatProdErrorMessage(340));
          resetHydrationState();
        }
        current = workInProgress2.flags;
        return current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
      case 19:
        return pop(suspenseStackCursor), null;
      case 4:
        return popHostContainer(), null;
      case 10:
        return popProvider(workInProgress2.type), null;
      case 22:
      case 23:
        return popSuspenseHandler(workInProgress2), popHiddenContext(), null !== current && pop(resumedCache), current = workInProgress2.flags, current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
      case 24:
        return popProvider(CacheContext), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function unwindInterruptedWork(current, interruptedWork) {
    popTreeContext(interruptedWork);
    switch (interruptedWork.tag) {
      case 3:
        popProvider(CacheContext);
        popHostContainer();
        break;
      case 26:
      case 27:
      case 5:
        popHostContext(interruptedWork);
        break;
      case 4:
        popHostContainer();
        break;
      case 31:
        null !== interruptedWork.memoizedState && popSuspenseHandler(interruptedWork);
        break;
      case 13:
        popSuspenseHandler(interruptedWork);
        break;
      case 19:
        pop(suspenseStackCursor);
        break;
      case 10:
        popProvider(interruptedWork.type);
        break;
      case 22:
      case 23:
        popSuspenseHandler(interruptedWork);
        popHiddenContext();
        null !== current && pop(resumedCache);
        break;
      case 24:
        popProvider(CacheContext);
    }
  }
  function commitHookEffectListMount(flags, finishedWork) {
    try {
      var updateQueue = finishedWork.updateQueue, lastEffect = null !== updateQueue ? updateQueue.lastEffect : null;
      if (null !== lastEffect) {
        var firstEffect = lastEffect.next;
        updateQueue = firstEffect;
        do {
          if ((updateQueue.tag & flags) === flags) {
            lastEffect = void 0;
            var create = updateQueue.create, inst = updateQueue.inst;
            lastEffect = create();
            inst.destroy = lastEffect;
          }
          updateQueue = updateQueue.next;
        } while (updateQueue !== firstEffect);
      }
    } catch (error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, error);
    }
  }
  function commitHookEffectListUnmount(flags, finishedWork, nearestMountedAncestor$jscomp$0) {
    try {
      var updateQueue = finishedWork.updateQueue, lastEffect = null !== updateQueue ? updateQueue.lastEffect : null;
      if (null !== lastEffect) {
        var firstEffect = lastEffect.next;
        updateQueue = firstEffect;
        do {
          if ((updateQueue.tag & flags) === flags) {
            var inst = updateQueue.inst, destroy = inst.destroy;
            if (void 0 !== destroy) {
              inst.destroy = void 0;
              lastEffect = finishedWork;
              var nearestMountedAncestor = nearestMountedAncestor$jscomp$0, destroy_ = destroy;
              try {
                destroy_();
              } catch (error) {
                captureCommitPhaseError(
                  lastEffect,
                  nearestMountedAncestor,
                  error
                );
              }
            }
          }
          updateQueue = updateQueue.next;
        } while (updateQueue !== firstEffect);
      }
    } catch (error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, error);
    }
  }
  function commitClassCallbacks(finishedWork) {
    var updateQueue = finishedWork.updateQueue;
    if (null !== updateQueue) {
      var instance = finishedWork.stateNode;
      try {
        commitCallbacks(updateQueue, instance);
      } catch (error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, error);
      }
    }
  }
  function safelyCallComponentWillUnmount(current, nearestMountedAncestor, instance) {
    instance.props = resolveClassComponentProps(
      current.type,
      current.memoizedProps
    );
    instance.state = current.memoizedState;
    try {
      instance.componentWillUnmount();
    } catch (error) {
      captureCommitPhaseError(current, nearestMountedAncestor, error);
    }
  }
  function safelyAttachRef(current, nearestMountedAncestor) {
    try {
      var ref = current.ref;
      if (null !== ref) {
        switch (current.tag) {
          case 26:
          case 27:
          case 5:
            var instanceToUse = current.stateNode;
            break;
          case 30:
            instanceToUse = current.stateNode;
            break;
          default:
            instanceToUse = current.stateNode;
        }
        "function" === typeof ref ? current.refCleanup = ref(instanceToUse) : ref.current = instanceToUse;
      }
    } catch (error) {
      captureCommitPhaseError(current, nearestMountedAncestor, error);
    }
  }
  function safelyDetachRef(current, nearestMountedAncestor) {
    var ref = current.ref, refCleanup = current.refCleanup;
    if (null !== ref)
      if ("function" === typeof refCleanup)
        try {
          refCleanup();
        } catch (error) {
          captureCommitPhaseError(current, nearestMountedAncestor, error);
        } finally {
          current.refCleanup = null, current = current.alternate, null != current && (current.refCleanup = null);
        }
      else if ("function" === typeof ref)
        try {
          ref(null);
        } catch (error$140) {
          captureCommitPhaseError(current, nearestMountedAncestor, error$140);
        }
      else ref.current = null;
  }
  function commitHostMount(finishedWork) {
    var type = finishedWork.type, props = finishedWork.memoizedProps, instance = finishedWork.stateNode;
    try {
      a: switch (type) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          props.autoFocus && instance.focus();
          break a;
        case "img":
          props.src ? instance.src = props.src : props.srcSet && (instance.srcset = props.srcSet);
      }
    } catch (error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, error);
    }
  }
  function commitHostUpdate(finishedWork, newProps, oldProps) {
    try {
      var domElement = finishedWork.stateNode;
      updateProperties(domElement, finishedWork.type, oldProps, newProps);
      domElement[internalPropsKey] = newProps;
    } catch (error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, error);
    }
  }
  function isHostParent(fiber) {
    return 5 === fiber.tag || 3 === fiber.tag || 26 === fiber.tag || 27 === fiber.tag && isSingletonScope(fiber.type) || 4 === fiber.tag;
  }
  function getHostSibling(fiber) {
    a: for (; ; ) {
      for (; null === fiber.sibling; ) {
        if (null === fiber.return || isHostParent(fiber.return)) return null;
        fiber = fiber.return;
      }
      fiber.sibling.return = fiber.return;
      for (fiber = fiber.sibling; 5 !== fiber.tag && 6 !== fiber.tag && 18 !== fiber.tag; ) {
        if (27 === fiber.tag && isSingletonScope(fiber.type)) continue a;
        if (fiber.flags & 2) continue a;
        if (null === fiber.child || 4 === fiber.tag) continue a;
        else fiber.child.return = fiber, fiber = fiber.child;
      }
      if (!(fiber.flags & 2)) return fiber.stateNode;
    }
  }
  function insertOrAppendPlacementNodeIntoContainer(node, before, parent) {
    var tag = node.tag;
    if (5 === tag || 6 === tag)
      node = node.stateNode, before ? (9 === parent.nodeType ? parent.body : "HTML" === parent.nodeName ? parent.ownerDocument.body : parent).insertBefore(node, before) : (before = 9 === parent.nodeType ? parent.body : "HTML" === parent.nodeName ? parent.ownerDocument.body : parent, before.appendChild(node), parent = parent._reactRootContainer, null !== parent && void 0 !== parent || null !== before.onclick || (before.onclick = noop$1));
    else if (4 !== tag && (27 === tag && isSingletonScope(node.type) && (parent = node.stateNode, before = null), node = node.child, null !== node))
      for (insertOrAppendPlacementNodeIntoContainer(node, before, parent), node = node.sibling; null !== node; )
        insertOrAppendPlacementNodeIntoContainer(node, before, parent), node = node.sibling;
  }
  function insertOrAppendPlacementNode(node, before, parent) {
    var tag = node.tag;
    if (5 === tag || 6 === tag)
      node = node.stateNode, before ? parent.insertBefore(node, before) : parent.appendChild(node);
    else if (4 !== tag && (27 === tag && isSingletonScope(node.type) && (parent = node.stateNode), node = node.child, null !== node))
      for (insertOrAppendPlacementNode(node, before, parent), node = node.sibling; null !== node; )
        insertOrAppendPlacementNode(node, before, parent), node = node.sibling;
  }
  function commitHostSingletonAcquisition(finishedWork) {
    var singleton = finishedWork.stateNode, props = finishedWork.memoizedProps;
    try {
      for (var type = finishedWork.type, attributes = singleton.attributes; attributes.length; )
        singleton.removeAttributeNode(attributes[0]);
      setInitialProperties(singleton, type, props);
      singleton[internalInstanceKey] = finishedWork;
      singleton[internalPropsKey] = props;
    } catch (error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, error);
    }
  }
  var offscreenSubtreeIsHidden = false, offscreenSubtreeWasHidden = false, needsFormReset = false, PossiblyWeakSet = "function" === typeof WeakSet ? WeakSet : Set, nextEffect = null;
  function commitBeforeMutationEffects(root2, firstChild) {
    root2 = root2.containerInfo;
    eventsEnabled = _enabled;
    root2 = getActiveElementDeep(root2);
    if (hasSelectionCapabilities(root2)) {
      if ("selectionStart" in root2)
        var JSCompiler_temp = {
          start: root2.selectionStart,
          end: root2.selectionEnd
        };
      else
        a: {
          JSCompiler_temp = (JSCompiler_temp = root2.ownerDocument) && JSCompiler_temp.defaultView || window;
          var selection = JSCompiler_temp.getSelection && JSCompiler_temp.getSelection();
          if (selection && 0 !== selection.rangeCount) {
            JSCompiler_temp = selection.anchorNode;
            var anchorOffset = selection.anchorOffset, focusNode = selection.focusNode;
            selection = selection.focusOffset;
            try {
              JSCompiler_temp.nodeType, focusNode.nodeType;
            } catch (e$20) {
              JSCompiler_temp = null;
              break a;
            }
            var length = 0, start = -1, end = -1, indexWithinAnchor = 0, indexWithinFocus = 0, node = root2, parentNode = null;
            b: for (; ; ) {
              for (var next; ; ) {
                node !== JSCompiler_temp || 0 !== anchorOffset && 3 !== node.nodeType || (start = length + anchorOffset);
                node !== focusNode || 0 !== selection && 3 !== node.nodeType || (end = length + selection);
                3 === node.nodeType && (length += node.nodeValue.length);
                if (null === (next = node.firstChild)) break;
                parentNode = node;
                node = next;
              }
              for (; ; ) {
                if (node === root2) break b;
                parentNode === JSCompiler_temp && ++indexWithinAnchor === anchorOffset && (start = length);
                parentNode === focusNode && ++indexWithinFocus === selection && (end = length);
                if (null !== (next = node.nextSibling)) break;
                node = parentNode;
                parentNode = node.parentNode;
              }
              node = next;
            }
            JSCompiler_temp = -1 === start || -1 === end ? null : { start, end };
          } else JSCompiler_temp = null;
        }
      JSCompiler_temp = JSCompiler_temp || { start: 0, end: 0 };
    } else JSCompiler_temp = null;
    selectionInformation = { focusedElem: root2, selectionRange: JSCompiler_temp };
    _enabled = false;
    for (nextEffect = firstChild; null !== nextEffect; )
      if (firstChild = nextEffect, root2 = firstChild.child, 0 !== (firstChild.subtreeFlags & 1028) && null !== root2)
        root2.return = firstChild, nextEffect = root2;
      else
        for (; null !== nextEffect; ) {
          firstChild = nextEffect;
          focusNode = firstChild.alternate;
          root2 = firstChild.flags;
          switch (firstChild.tag) {
            case 0:
              if (0 !== (root2 & 4) && (root2 = firstChild.updateQueue, root2 = null !== root2 ? root2.events : null, null !== root2))
                for (JSCompiler_temp = 0; JSCompiler_temp < root2.length; JSCompiler_temp++)
                  anchorOffset = root2[JSCompiler_temp], anchorOffset.ref.impl = anchorOffset.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if (0 !== (root2 & 1024) && null !== focusNode) {
                root2 = void 0;
                JSCompiler_temp = firstChild;
                anchorOffset = focusNode.memoizedProps;
                focusNode = focusNode.memoizedState;
                selection = JSCompiler_temp.stateNode;
                try {
                  var resolvedPrevProps = resolveClassComponentProps(
                    JSCompiler_temp.type,
                    anchorOffset
                  );
                  root2 = selection.getSnapshotBeforeUpdate(
                    resolvedPrevProps,
                    focusNode
                  );
                  selection.__reactInternalSnapshotBeforeUpdate = root2;
                } catch (error) {
                  captureCommitPhaseError(
                    JSCompiler_temp,
                    JSCompiler_temp.return,
                    error
                  );
                }
              }
              break;
            case 3:
              if (0 !== (root2 & 1024)) {
                if (root2 = firstChild.stateNode.containerInfo, JSCompiler_temp = root2.nodeType, 9 === JSCompiler_temp)
                  clearContainerSparingly(root2);
                else if (1 === JSCompiler_temp)
                  switch (root2.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      clearContainerSparingly(root2);
                      break;
                    default:
                      root2.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if (0 !== (root2 & 1024)) throw Error(formatProdErrorMessage(163));
          }
          root2 = firstChild.sibling;
          if (null !== root2) {
            root2.return = firstChild.return;
            nextEffect = root2;
            break;
          }
          nextEffect = firstChild.return;
        }
  }
  function commitLayoutEffectOnFiber(finishedRoot, current, finishedWork) {
    var flags = finishedWork.flags;
    switch (finishedWork.tag) {
      case 0:
      case 11:
      case 15:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        flags & 4 && commitHookEffectListMount(5, finishedWork);
        break;
      case 1:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        if (flags & 4)
          if (finishedRoot = finishedWork.stateNode, null === current)
            try {
              finishedRoot.componentDidMount();
            } catch (error) {
              captureCommitPhaseError(finishedWork, finishedWork.return, error);
            }
          else {
            var prevProps = resolveClassComponentProps(
              finishedWork.type,
              current.memoizedProps
            );
            current = current.memoizedState;
            try {
              finishedRoot.componentDidUpdate(
                prevProps,
                current,
                finishedRoot.__reactInternalSnapshotBeforeUpdate
              );
            } catch (error$139) {
              captureCommitPhaseError(
                finishedWork,
                finishedWork.return,
                error$139
              );
            }
          }
        flags & 64 && commitClassCallbacks(finishedWork);
        flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
        break;
      case 3:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        if (flags & 64 && (finishedRoot = finishedWork.updateQueue, null !== finishedRoot)) {
          current = null;
          if (null !== finishedWork.child)
            switch (finishedWork.child.tag) {
              case 27:
              case 5:
                current = finishedWork.child.stateNode;
                break;
              case 1:
                current = finishedWork.child.stateNode;
            }
          try {
            commitCallbacks(finishedRoot, current);
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        }
        break;
      case 27:
        null === current && flags & 4 && commitHostSingletonAcquisition(finishedWork);
      case 26:
      case 5:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        null === current && flags & 4 && commitHostMount(finishedWork);
        flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
        break;
      case 12:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        break;
      case 31:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        flags & 4 && commitActivityHydrationCallbacks(finishedRoot, finishedWork);
        break;
      case 13:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        flags & 4 && commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
        flags & 64 && (finishedRoot = finishedWork.memoizedState, null !== finishedRoot && (finishedRoot = finishedRoot.dehydrated, null !== finishedRoot && (finishedWork = retryDehydratedSuspenseBoundary.bind(
          null,
          finishedWork
        ), registerSuspenseInstanceRetry(finishedRoot, finishedWork))));
        break;
      case 22:
        flags = null !== finishedWork.memoizedState || offscreenSubtreeIsHidden;
        if (!flags) {
          current = null !== current && null !== current.memoizedState || offscreenSubtreeWasHidden;
          prevProps = offscreenSubtreeIsHidden;
          var prevOffscreenSubtreeWasHidden = offscreenSubtreeWasHidden;
          offscreenSubtreeIsHidden = flags;
          (offscreenSubtreeWasHidden = current) && !prevOffscreenSubtreeWasHidden ? recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            0 !== (finishedWork.subtreeFlags & 8772)
          ) : recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          offscreenSubtreeIsHidden = prevProps;
          offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden;
        }
        break;
      case 30:
        break;
      default:
        recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
    }
  }
  function detachFiberAfterEffects(fiber) {
    var alternate = fiber.alternate;
    null !== alternate && (fiber.alternate = null, detachFiberAfterEffects(alternate));
    fiber.child = null;
    fiber.deletions = null;
    fiber.sibling = null;
    5 === fiber.tag && (alternate = fiber.stateNode, null !== alternate && detachDeletedInstance(alternate));
    fiber.stateNode = null;
    fiber.return = null;
    fiber.dependencies = null;
    fiber.memoizedProps = null;
    fiber.memoizedState = null;
    fiber.pendingProps = null;
    fiber.stateNode = null;
    fiber.updateQueue = null;
  }
  var hostParent = null, hostParentIsContainer = false;
  function recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, parent) {
    for (parent = parent.child; null !== parent; )
      commitDeletionEffectsOnFiber(finishedRoot, nearestMountedAncestor, parent), parent = parent.sibling;
  }
  function commitDeletionEffectsOnFiber(finishedRoot, nearestMountedAncestor, deletedFiber) {
    if (injectedHook && "function" === typeof injectedHook.onCommitFiberUnmount)
      try {
        injectedHook.onCommitFiberUnmount(rendererID, deletedFiber);
      } catch (err) {
      }
    switch (deletedFiber.tag) {
      case 26:
        offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
        recursivelyTraverseDeletionEffects(
          finishedRoot,
          nearestMountedAncestor,
          deletedFiber
        );
        deletedFiber.memoizedState ? deletedFiber.memoizedState.count-- : deletedFiber.stateNode && (deletedFiber = deletedFiber.stateNode, deletedFiber.parentNode.removeChild(deletedFiber));
        break;
      case 27:
        offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
        var prevHostParent = hostParent, prevHostParentIsContainer = hostParentIsContainer;
        isSingletonScope(deletedFiber.type) && (hostParent = deletedFiber.stateNode, hostParentIsContainer = false);
        recursivelyTraverseDeletionEffects(
          finishedRoot,
          nearestMountedAncestor,
          deletedFiber
        );
        releaseSingletonInstance(deletedFiber.stateNode);
        hostParent = prevHostParent;
        hostParentIsContainer = prevHostParentIsContainer;
        break;
      case 5:
        offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
      case 6:
        prevHostParent = hostParent;
        prevHostParentIsContainer = hostParentIsContainer;
        hostParent = null;
        recursivelyTraverseDeletionEffects(
          finishedRoot,
          nearestMountedAncestor,
          deletedFiber
        );
        hostParent = prevHostParent;
        hostParentIsContainer = prevHostParentIsContainer;
        if (null !== hostParent)
          if (hostParentIsContainer)
            try {
              (9 === hostParent.nodeType ? hostParent.body : "HTML" === hostParent.nodeName ? hostParent.ownerDocument.body : hostParent).removeChild(deletedFiber.stateNode);
            } catch (error) {
              captureCommitPhaseError(
                deletedFiber,
                nearestMountedAncestor,
                error
              );
            }
          else
            try {
              hostParent.removeChild(deletedFiber.stateNode);
            } catch (error) {
              captureCommitPhaseError(
                deletedFiber,
                nearestMountedAncestor,
                error
              );
            }
        break;
      case 18:
        null !== hostParent && (hostParentIsContainer ? (finishedRoot = hostParent, clearHydrationBoundary(
          9 === finishedRoot.nodeType ? finishedRoot.body : "HTML" === finishedRoot.nodeName ? finishedRoot.ownerDocument.body : finishedRoot,
          deletedFiber.stateNode
        ), retryIfBlockedOn(finishedRoot)) : clearHydrationBoundary(hostParent, deletedFiber.stateNode));
        break;
      case 4:
        prevHostParent = hostParent;
        prevHostParentIsContainer = hostParentIsContainer;
        hostParent = deletedFiber.stateNode.containerInfo;
        hostParentIsContainer = true;
        recursivelyTraverseDeletionEffects(
          finishedRoot,
          nearestMountedAncestor,
          deletedFiber
        );
        hostParent = prevHostParent;
        hostParentIsContainer = prevHostParentIsContainer;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        commitHookEffectListUnmount(2, deletedFiber, nearestMountedAncestor);
        offscreenSubtreeWasHidden || commitHookEffectListUnmount(4, deletedFiber, nearestMountedAncestor);
        recursivelyTraverseDeletionEffects(
          finishedRoot,
          nearestMountedAncestor,
          deletedFiber
        );
        break;
      case 1:
        offscreenSubtreeWasHidden || (safelyDetachRef(deletedFiber, nearestMountedAncestor), prevHostParent = deletedFiber.stateNode, "function" === typeof prevHostParent.componentWillUnmount && safelyCallComponentWillUnmount(
          deletedFiber,
          nearestMountedAncestor,
          prevHostParent
        ));
        recursivelyTraverseDeletionEffects(
          finishedRoot,
          nearestMountedAncestor,
          deletedFiber
        );
        break;
      case 21:
        recursivelyTraverseDeletionEffects(
          finishedRoot,
          nearestMountedAncestor,
          deletedFiber
        );
        break;
      case 22:
        offscreenSubtreeWasHidden = (prevHostParent = offscreenSubtreeWasHidden) || null !== deletedFiber.memoizedState;
        recursivelyTraverseDeletionEffects(
          finishedRoot,
          nearestMountedAncestor,
          deletedFiber
        );
        offscreenSubtreeWasHidden = prevHostParent;
        break;
      default:
        recursivelyTraverseDeletionEffects(
          finishedRoot,
          nearestMountedAncestor,
          deletedFiber
        );
    }
  }
  function commitActivityHydrationCallbacks(finishedRoot, finishedWork) {
    if (null === finishedWork.memoizedState && (finishedRoot = finishedWork.alternate, null !== finishedRoot && (finishedRoot = finishedRoot.memoizedState, null !== finishedRoot))) {
      finishedRoot = finishedRoot.dehydrated;
      try {
        retryIfBlockedOn(finishedRoot);
      } catch (error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, error);
      }
    }
  }
  function commitSuspenseHydrationCallbacks(finishedRoot, finishedWork) {
    if (null === finishedWork.memoizedState && (finishedRoot = finishedWork.alternate, null !== finishedRoot && (finishedRoot = finishedRoot.memoizedState, null !== finishedRoot && (finishedRoot = finishedRoot.dehydrated, null !== finishedRoot))))
      try {
        retryIfBlockedOn(finishedRoot);
      } catch (error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, error);
      }
  }
  function getRetryCache(finishedWork) {
    switch (finishedWork.tag) {
      case 31:
      case 13:
      case 19:
        var retryCache = finishedWork.stateNode;
        null === retryCache && (retryCache = finishedWork.stateNode = new PossiblyWeakSet());
        return retryCache;
      case 22:
        return finishedWork = finishedWork.stateNode, retryCache = finishedWork._retryCache, null === retryCache && (retryCache = finishedWork._retryCache = new PossiblyWeakSet()), retryCache;
      default:
        throw Error(formatProdErrorMessage(435, finishedWork.tag));
    }
  }
  function attachSuspenseRetryListeners(finishedWork, wakeables) {
    var retryCache = getRetryCache(finishedWork);
    wakeables.forEach(function(wakeable) {
      if (!retryCache.has(wakeable)) {
        retryCache.add(wakeable);
        var retry = resolveRetryWakeable.bind(null, finishedWork, wakeable);
        wakeable.then(retry, retry);
      }
    });
  }
  function recursivelyTraverseMutationEffects(root$jscomp$0, parentFiber) {
    var deletions = parentFiber.deletions;
    if (null !== deletions)
      for (var i = 0; i < deletions.length; i++) {
        var childToDelete = deletions[i], root2 = root$jscomp$0, returnFiber = parentFiber, parent = returnFiber;
        a: for (; null !== parent; ) {
          switch (parent.tag) {
            case 27:
              if (isSingletonScope(parent.type)) {
                hostParent = parent.stateNode;
                hostParentIsContainer = false;
                break a;
              }
              break;
            case 5:
              hostParent = parent.stateNode;
              hostParentIsContainer = false;
              break a;
            case 3:
            case 4:
              hostParent = parent.stateNode.containerInfo;
              hostParentIsContainer = true;
              break a;
          }
          parent = parent.return;
        }
        if (null === hostParent) throw Error(formatProdErrorMessage(160));
        commitDeletionEffectsOnFiber(root2, returnFiber, childToDelete);
        hostParent = null;
        hostParentIsContainer = false;
        root2 = childToDelete.alternate;
        null !== root2 && (root2.return = null);
        childToDelete.return = null;
      }
    if (parentFiber.subtreeFlags & 13886)
      for (parentFiber = parentFiber.child; null !== parentFiber; )
        commitMutationEffectsOnFiber(parentFiber, root$jscomp$0), parentFiber = parentFiber.sibling;
  }
  var currentHoistableRoot = null;
  function commitMutationEffectsOnFiber(finishedWork, root2) {
    var current = finishedWork.alternate, flags = finishedWork.flags;
    switch (finishedWork.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        recursivelyTraverseMutationEffects(root2, finishedWork);
        commitReconciliationEffects(finishedWork);
        flags & 4 && (commitHookEffectListUnmount(3, finishedWork, finishedWork.return), commitHookEffectListMount(3, finishedWork), commitHookEffectListUnmount(5, finishedWork, finishedWork.return));
        break;
      case 1:
        recursivelyTraverseMutationEffects(root2, finishedWork);
        commitReconciliationEffects(finishedWork);
        flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
        flags & 64 && offscreenSubtreeIsHidden && (finishedWork = finishedWork.updateQueue, null !== finishedWork && (flags = finishedWork.callbacks, null !== flags && (current = finishedWork.shared.hiddenCallbacks, finishedWork.shared.hiddenCallbacks = null === current ? flags : current.concat(flags))));
        break;
      case 26:
        var hoistableRoot = currentHoistableRoot;
        recursivelyTraverseMutationEffects(root2, finishedWork);
        commitReconciliationEffects(finishedWork);
        flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
        if (flags & 4) {
          var currentResource = null !== current ? current.memoizedState : null;
          flags = finishedWork.memoizedState;
          if (null === current)
            if (null === flags)
              if (null === finishedWork.stateNode) {
                a: {
                  flags = finishedWork.type;
                  current = finishedWork.memoizedProps;
                  hoistableRoot = hoistableRoot.ownerDocument || hoistableRoot;
                  b: switch (flags) {
                    case "title":
                      currentResource = hoistableRoot.getElementsByTagName("title")[0];
                      if (!currentResource || currentResource[internalHoistableMarker] || currentResource[internalInstanceKey] || "http://www.w3.org/2000/svg" === currentResource.namespaceURI || currentResource.hasAttribute("itemprop"))
                        currentResource = hoistableRoot.createElement(flags), hoistableRoot.head.insertBefore(
                          currentResource,
                          hoistableRoot.querySelector("head > title")
                        );
                      setInitialProperties(currentResource, flags, current);
                      currentResource[internalInstanceKey] = finishedWork;
                      markNodeAsHoistable(currentResource);
                      flags = currentResource;
                      break a;
                    case "link":
                      var maybeNodes = getHydratableHoistableCache(
                        "link",
                        "href",
                        hoistableRoot
                      ).get(flags + (current.href || ""));
                      if (maybeNodes) {
                        for (var i = 0; i < maybeNodes.length; i++)
                          if (currentResource = maybeNodes[i], currentResource.getAttribute("href") === (null == current.href || "" === current.href ? null : current.href) && currentResource.getAttribute("rel") === (null == current.rel ? null : current.rel) && currentResource.getAttribute("title") === (null == current.title ? null : current.title) && currentResource.getAttribute("crossorigin") === (null == current.crossOrigin ? null : current.crossOrigin)) {
                            maybeNodes.splice(i, 1);
                            break b;
                          }
                      }
                      currentResource = hoistableRoot.createElement(flags);
                      setInitialProperties(currentResource, flags, current);
                      hoistableRoot.head.appendChild(currentResource);
                      break;
                    case "meta":
                      if (maybeNodes = getHydratableHoistableCache(
                        "meta",
                        "content",
                        hoistableRoot
                      ).get(flags + (current.content || ""))) {
                        for (i = 0; i < maybeNodes.length; i++)
                          if (currentResource = maybeNodes[i], currentResource.getAttribute("content") === (null == current.content ? null : "" + current.content) && currentResource.getAttribute("name") === (null == current.name ? null : current.name) && currentResource.getAttribute("property") === (null == current.property ? null : current.property) && currentResource.getAttribute("http-equiv") === (null == current.httpEquiv ? null : current.httpEquiv) && currentResource.getAttribute("charset") === (null == current.charSet ? null : current.charSet)) {
                            maybeNodes.splice(i, 1);
                            break b;
                          }
                      }
                      currentResource = hoistableRoot.createElement(flags);
                      setInitialProperties(currentResource, flags, current);
                      hoistableRoot.head.appendChild(currentResource);
                      break;
                    default:
                      throw Error(formatProdErrorMessage(468, flags));
                  }
                  currentResource[internalInstanceKey] = finishedWork;
                  markNodeAsHoistable(currentResource);
                  flags = currentResource;
                }
                finishedWork.stateNode = flags;
              } else
                mountHoistable(
                  hoistableRoot,
                  finishedWork.type,
                  finishedWork.stateNode
                );
            else
              finishedWork.stateNode = acquireResource(
                hoistableRoot,
                flags,
                finishedWork.memoizedProps
              );
          else
            currentResource !== flags ? (null === currentResource ? null !== current.stateNode && (current = current.stateNode, current.parentNode.removeChild(current)) : currentResource.count--, null === flags ? mountHoistable(
              hoistableRoot,
              finishedWork.type,
              finishedWork.stateNode
            ) : acquireResource(
              hoistableRoot,
              flags,
              finishedWork.memoizedProps
            )) : null === flags && null !== finishedWork.stateNode && commitHostUpdate(
              finishedWork,
              finishedWork.memoizedProps,
              current.memoizedProps
            );
        }
        break;
      case 27:
        recursivelyTraverseMutationEffects(root2, finishedWork);
        commitReconciliationEffects(finishedWork);
        flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
        null !== current && flags & 4 && commitHostUpdate(
          finishedWork,
          finishedWork.memoizedProps,
          current.memoizedProps
        );
        break;
      case 5:
        recursivelyTraverseMutationEffects(root2, finishedWork);
        commitReconciliationEffects(finishedWork);
        flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
        if (finishedWork.flags & 32) {
          hoistableRoot = finishedWork.stateNode;
          try {
            setTextContent(hoistableRoot, "");
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        }
        flags & 4 && null != finishedWork.stateNode && (hoistableRoot = finishedWork.memoizedProps, commitHostUpdate(
          finishedWork,
          hoistableRoot,
          null !== current ? current.memoizedProps : hoistableRoot
        ));
        flags & 1024 && (needsFormReset = true);
        break;
      case 6:
        recursivelyTraverseMutationEffects(root2, finishedWork);
        commitReconciliationEffects(finishedWork);
        if (flags & 4) {
          if (null === finishedWork.stateNode)
            throw Error(formatProdErrorMessage(162));
          flags = finishedWork.memoizedProps;
          current = finishedWork.stateNode;
          try {
            current.nodeValue = flags;
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        }
        break;
      case 3:
        tagCaches = null;
        hoistableRoot = currentHoistableRoot;
        currentHoistableRoot = getHoistableRoot(root2.containerInfo);
        recursivelyTraverseMutationEffects(root2, finishedWork);
        currentHoistableRoot = hoistableRoot;
        commitReconciliationEffects(finishedWork);
        if (flags & 4 && null !== current && current.memoizedState.isDehydrated)
          try {
            retryIfBlockedOn(root2.containerInfo);
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        needsFormReset && (needsFormReset = false, recursivelyResetForms(finishedWork));
        break;
      case 4:
        flags = currentHoistableRoot;
        currentHoistableRoot = getHoistableRoot(
          finishedWork.stateNode.containerInfo
        );
        recursivelyTraverseMutationEffects(root2, finishedWork);
        commitReconciliationEffects(finishedWork);
        currentHoistableRoot = flags;
        break;
      case 12:
        recursivelyTraverseMutationEffects(root2, finishedWork);
        commitReconciliationEffects(finishedWork);
        break;
      case 31:
        recursivelyTraverseMutationEffects(root2, finishedWork);
        commitReconciliationEffects(finishedWork);
        flags & 4 && (flags = finishedWork.updateQueue, null !== flags && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, flags)));
        break;
      case 13:
        recursivelyTraverseMutationEffects(root2, finishedWork);
        commitReconciliationEffects(finishedWork);
        finishedWork.child.flags & 8192 && null !== finishedWork.memoizedState !== (null !== current && null !== current.memoizedState) && (globalMostRecentFallbackTime = now());
        flags & 4 && (flags = finishedWork.updateQueue, null !== flags && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, flags)));
        break;
      case 22:
        hoistableRoot = null !== finishedWork.memoizedState;
        var wasHidden = null !== current && null !== current.memoizedState, prevOffscreenSubtreeIsHidden = offscreenSubtreeIsHidden, prevOffscreenSubtreeWasHidden = offscreenSubtreeWasHidden;
        offscreenSubtreeIsHidden = prevOffscreenSubtreeIsHidden || hoistableRoot;
        offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden || wasHidden;
        recursivelyTraverseMutationEffects(root2, finishedWork);
        offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden;
        offscreenSubtreeIsHidden = prevOffscreenSubtreeIsHidden;
        commitReconciliationEffects(finishedWork);
        if (flags & 8192)
          a: for (root2 = finishedWork.stateNode, root2._visibility = hoistableRoot ? root2._visibility & -2 : root2._visibility | 1, hoistableRoot && (null === current || wasHidden || offscreenSubtreeIsHidden || offscreenSubtreeWasHidden || recursivelyTraverseDisappearLayoutEffects(finishedWork)), current = null, root2 = finishedWork; ; ) {
            if (5 === root2.tag || 26 === root2.tag) {
              if (null === current) {
                wasHidden = current = root2;
                try {
                  if (currentResource = wasHidden.stateNode, hoistableRoot)
                    maybeNodes = currentResource.style, "function" === typeof maybeNodes.setProperty ? maybeNodes.setProperty("display", "none", "important") : maybeNodes.display = "none";
                  else {
                    i = wasHidden.stateNode;
                    var styleProp = wasHidden.memoizedProps.style, display = void 0 !== styleProp && null !== styleProp && styleProp.hasOwnProperty("display") ? styleProp.display : null;
                    i.style.display = null == display || "boolean" === typeof display ? "" : ("" + display).trim();
                  }
                } catch (error) {
                  captureCommitPhaseError(wasHidden, wasHidden.return, error);
                }
              }
            } else if (6 === root2.tag) {
              if (null === current) {
                wasHidden = root2;
                try {
                  wasHidden.stateNode.nodeValue = hoistableRoot ? "" : wasHidden.memoizedProps;
                } catch (error) {
                  captureCommitPhaseError(wasHidden, wasHidden.return, error);
                }
              }
            } else if (18 === root2.tag) {
              if (null === current) {
                wasHidden = root2;
                try {
                  var instance = wasHidden.stateNode;
                  hoistableRoot ? hideOrUnhideDehydratedBoundary(instance, true) : hideOrUnhideDehydratedBoundary(wasHidden.stateNode, false);
                } catch (error) {
                  captureCommitPhaseError(wasHidden, wasHidden.return, error);
                }
              }
            } else if ((22 !== root2.tag && 23 !== root2.tag || null === root2.memoizedState || root2 === finishedWork) && null !== root2.child) {
              root2.child.return = root2;
              root2 = root2.child;
              continue;
            }
            if (root2 === finishedWork) break a;
            for (; null === root2.sibling; ) {
              if (null === root2.return || root2.return === finishedWork) break a;
              current === root2 && (current = null);
              root2 = root2.return;
            }
            current === root2 && (current = null);
            root2.sibling.return = root2.return;
            root2 = root2.sibling;
          }
        flags & 4 && (flags = finishedWork.updateQueue, null !== flags && (current = flags.retryQueue, null !== current && (flags.retryQueue = null, attachSuspenseRetryListeners(finishedWork, current))));
        break;
      case 19:
        recursivelyTraverseMutationEffects(root2, finishedWork);
        commitReconciliationEffects(finishedWork);
        flags & 4 && (flags = finishedWork.updateQueue, null !== flags && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, flags)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        recursivelyTraverseMutationEffects(root2, finishedWork), commitReconciliationEffects(finishedWork);
    }
  }
  function commitReconciliationEffects(finishedWork) {
    var flags = finishedWork.flags;
    if (flags & 2) {
      try {
        for (var hostParentFiber, parentFiber = finishedWork.return; null !== parentFiber; ) {
          if (isHostParent(parentFiber)) {
            hostParentFiber = parentFiber;
            break;
          }
          parentFiber = parentFiber.return;
        }
        if (null == hostParentFiber) throw Error(formatProdErrorMessage(160));
        switch (hostParentFiber.tag) {
          case 27:
            var parent = hostParentFiber.stateNode, before = getHostSibling(finishedWork);
            insertOrAppendPlacementNode(finishedWork, before, parent);
            break;
          case 5:
            var parent$141 = hostParentFiber.stateNode;
            hostParentFiber.flags & 32 && (setTextContent(parent$141, ""), hostParentFiber.flags &= -33);
            var before$142 = getHostSibling(finishedWork);
            insertOrAppendPlacementNode(finishedWork, before$142, parent$141);
            break;
          case 3:
          case 4:
            var parent$143 = hostParentFiber.stateNode.containerInfo, before$144 = getHostSibling(finishedWork);
            insertOrAppendPlacementNodeIntoContainer(
              finishedWork,
              before$144,
              parent$143
            );
            break;
          default:
            throw Error(formatProdErrorMessage(161));
        }
      } catch (error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, error);
      }
      finishedWork.flags &= -3;
    }
    flags & 4096 && (finishedWork.flags &= -4097);
  }
  function recursivelyResetForms(parentFiber) {
    if (parentFiber.subtreeFlags & 1024)
      for (parentFiber = parentFiber.child; null !== parentFiber; ) {
        var fiber = parentFiber;
        recursivelyResetForms(fiber);
        5 === fiber.tag && fiber.flags & 1024 && fiber.stateNode.reset();
        parentFiber = parentFiber.sibling;
      }
  }
  function recursivelyTraverseLayoutEffects(root2, parentFiber) {
    if (parentFiber.subtreeFlags & 8772)
      for (parentFiber = parentFiber.child; null !== parentFiber; )
        commitLayoutEffectOnFiber(root2, parentFiber.alternate, parentFiber), parentFiber = parentFiber.sibling;
  }
  function recursivelyTraverseDisappearLayoutEffects(parentFiber) {
    for (parentFiber = parentFiber.child; null !== parentFiber; ) {
      var finishedWork = parentFiber;
      switch (finishedWork.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          commitHookEffectListUnmount(4, finishedWork, finishedWork.return);
          recursivelyTraverseDisappearLayoutEffects(finishedWork);
          break;
        case 1:
          safelyDetachRef(finishedWork, finishedWork.return);
          var instance = finishedWork.stateNode;
          "function" === typeof instance.componentWillUnmount && safelyCallComponentWillUnmount(
            finishedWork,
            finishedWork.return,
            instance
          );
          recursivelyTraverseDisappearLayoutEffects(finishedWork);
          break;
        case 27:
          releaseSingletonInstance(finishedWork.stateNode);
        case 26:
        case 5:
          safelyDetachRef(finishedWork, finishedWork.return);
          recursivelyTraverseDisappearLayoutEffects(finishedWork);
          break;
        case 22:
          null === finishedWork.memoizedState && recursivelyTraverseDisappearLayoutEffects(finishedWork);
          break;
        case 30:
          recursivelyTraverseDisappearLayoutEffects(finishedWork);
          break;
        default:
          recursivelyTraverseDisappearLayoutEffects(finishedWork);
      }
      parentFiber = parentFiber.sibling;
    }
  }
  function recursivelyTraverseReappearLayoutEffects(finishedRoot$jscomp$0, parentFiber, includeWorkInProgressEffects) {
    includeWorkInProgressEffects = includeWorkInProgressEffects && 0 !== (parentFiber.subtreeFlags & 8772);
    for (parentFiber = parentFiber.child; null !== parentFiber; ) {
      var current = parentFiber.alternate, finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, flags = finishedWork.flags;
      switch (finishedWork.tag) {
        case 0:
        case 11:
        case 15:
          recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            includeWorkInProgressEffects
          );
          commitHookEffectListMount(4, finishedWork);
          break;
        case 1:
          recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            includeWorkInProgressEffects
          );
          current = finishedWork;
          finishedRoot = current.stateNode;
          if ("function" === typeof finishedRoot.componentDidMount)
            try {
              finishedRoot.componentDidMount();
            } catch (error) {
              captureCommitPhaseError(current, current.return, error);
            }
          current = finishedWork;
          finishedRoot = current.updateQueue;
          if (null !== finishedRoot) {
            var instance = current.stateNode;
            try {
              var hiddenCallbacks = finishedRoot.shared.hiddenCallbacks;
              if (null !== hiddenCallbacks)
                for (finishedRoot.shared.hiddenCallbacks = null, finishedRoot = 0; finishedRoot < hiddenCallbacks.length; finishedRoot++)
                  callCallback(hiddenCallbacks[finishedRoot], instance);
            } catch (error) {
              captureCommitPhaseError(current, current.return, error);
            }
          }
          includeWorkInProgressEffects && flags & 64 && commitClassCallbacks(finishedWork);
          safelyAttachRef(finishedWork, finishedWork.return);
          break;
        case 27:
          commitHostSingletonAcquisition(finishedWork);
        case 26:
        case 5:
          recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            includeWorkInProgressEffects
          );
          includeWorkInProgressEffects && null === current && flags & 4 && commitHostMount(finishedWork);
          safelyAttachRef(finishedWork, finishedWork.return);
          break;
        case 12:
          recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            includeWorkInProgressEffects
          );
          break;
        case 31:
          recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            includeWorkInProgressEffects
          );
          includeWorkInProgressEffects && flags & 4 && commitActivityHydrationCallbacks(finishedRoot, finishedWork);
          break;
        case 13:
          recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            includeWorkInProgressEffects
          );
          includeWorkInProgressEffects && flags & 4 && commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
          break;
        case 22:
          null === finishedWork.memoizedState && recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            includeWorkInProgressEffects
          );
          safelyAttachRef(finishedWork, finishedWork.return);
          break;
        case 30:
          break;
        default:
          recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            includeWorkInProgressEffects
          );
      }
      parentFiber = parentFiber.sibling;
    }
  }
  function commitOffscreenPassiveMountEffects(current, finishedWork) {
    var previousCache = null;
    null !== current && null !== current.memoizedState && null !== current.memoizedState.cachePool && (previousCache = current.memoizedState.cachePool.pool);
    current = null;
    null !== finishedWork.memoizedState && null !== finishedWork.memoizedState.cachePool && (current = finishedWork.memoizedState.cachePool.pool);
    current !== previousCache && (null != current && current.refCount++, null != previousCache && releaseCache(previousCache));
  }
  function commitCachePassiveMountEffect(current, finishedWork) {
    current = null;
    null !== finishedWork.alternate && (current = finishedWork.alternate.memoizedState.cache);
    finishedWork = finishedWork.memoizedState.cache;
    finishedWork !== current && (finishedWork.refCount++, null != current && releaseCache(current));
  }
  function recursivelyTraversePassiveMountEffects(root2, parentFiber, committedLanes, committedTransitions) {
    if (parentFiber.subtreeFlags & 10256)
      for (parentFiber = parentFiber.child; null !== parentFiber; )
        commitPassiveMountOnFiber(
          root2,
          parentFiber,
          committedLanes,
          committedTransitions
        ), parentFiber = parentFiber.sibling;
  }
  function commitPassiveMountOnFiber(finishedRoot, finishedWork, committedLanes, committedTransitions) {
    var flags = finishedWork.flags;
    switch (finishedWork.tag) {
      case 0:
      case 11:
      case 15:
        recursivelyTraversePassiveMountEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions
        );
        flags & 2048 && commitHookEffectListMount(9, finishedWork);
        break;
      case 1:
        recursivelyTraversePassiveMountEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions
        );
        break;
      case 3:
        recursivelyTraversePassiveMountEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions
        );
        flags & 2048 && (finishedRoot = null, null !== finishedWork.alternate && (finishedRoot = finishedWork.alternate.memoizedState.cache), finishedWork = finishedWork.memoizedState.cache, finishedWork !== finishedRoot && (finishedWork.refCount++, null != finishedRoot && releaseCache(finishedRoot)));
        break;
      case 12:
        if (flags & 2048) {
          recursivelyTraversePassiveMountEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions
          );
          finishedRoot = finishedWork.stateNode;
          try {
            var _finishedWork$memoize2 = finishedWork.memoizedProps, id = _finishedWork$memoize2.id, onPostCommit = _finishedWork$memoize2.onPostCommit;
            "function" === typeof onPostCommit && onPostCommit(
              id,
              null === finishedWork.alternate ? "mount" : "update",
              finishedRoot.passiveEffectDuration,
              -0
            );
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        } else
          recursivelyTraversePassiveMountEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions
          );
        break;
      case 31:
        recursivelyTraversePassiveMountEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions
        );
        break;
      case 13:
        recursivelyTraversePassiveMountEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions
        );
        break;
      case 23:
        break;
      case 22:
        _finishedWork$memoize2 = finishedWork.stateNode;
        id = finishedWork.alternate;
        null !== finishedWork.memoizedState ? _finishedWork$memoize2._visibility & 2 ? recursivelyTraversePassiveMountEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions
        ) : recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork) : _finishedWork$memoize2._visibility & 2 ? recursivelyTraversePassiveMountEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions
        ) : (_finishedWork$memoize2._visibility |= 2, recursivelyTraverseReconnectPassiveEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions,
          0 !== (finishedWork.subtreeFlags & 10256) || false
        ));
        flags & 2048 && commitOffscreenPassiveMountEffects(id, finishedWork);
        break;
      case 24:
        recursivelyTraversePassiveMountEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions
        );
        flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
        break;
      default:
        recursivelyTraversePassiveMountEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions
        );
    }
  }
  function recursivelyTraverseReconnectPassiveEffects(finishedRoot$jscomp$0, parentFiber, committedLanes$jscomp$0, committedTransitions$jscomp$0, includeWorkInProgressEffects) {
    includeWorkInProgressEffects = includeWorkInProgressEffects && (0 !== (parentFiber.subtreeFlags & 10256) || false);
    for (parentFiber = parentFiber.child; null !== parentFiber; ) {
      var finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, committedLanes = committedLanes$jscomp$0, committedTransitions = committedTransitions$jscomp$0, flags = finishedWork.flags;
      switch (finishedWork.tag) {
        case 0:
        case 11:
        case 15:
          recursivelyTraverseReconnectPassiveEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions,
            includeWorkInProgressEffects
          );
          commitHookEffectListMount(8, finishedWork);
          break;
        case 23:
          break;
        case 22:
          var instance = finishedWork.stateNode;
          null !== finishedWork.memoizedState ? instance._visibility & 2 ? recursivelyTraverseReconnectPassiveEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions,
            includeWorkInProgressEffects
          ) : recursivelyTraverseAtomicPassiveEffects(
            finishedRoot,
            finishedWork
          ) : (instance._visibility |= 2, recursivelyTraverseReconnectPassiveEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions,
            includeWorkInProgressEffects
          ));
          includeWorkInProgressEffects && flags & 2048 && commitOffscreenPassiveMountEffects(
            finishedWork.alternate,
            finishedWork
          );
          break;
        case 24:
          recursivelyTraverseReconnectPassiveEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions,
            includeWorkInProgressEffects
          );
          includeWorkInProgressEffects && flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
          break;
        default:
          recursivelyTraverseReconnectPassiveEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions,
            includeWorkInProgressEffects
          );
      }
      parentFiber = parentFiber.sibling;
    }
  }
  function recursivelyTraverseAtomicPassiveEffects(finishedRoot$jscomp$0, parentFiber) {
    if (parentFiber.subtreeFlags & 10256)
      for (parentFiber = parentFiber.child; null !== parentFiber; ) {
        var finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, flags = finishedWork.flags;
        switch (finishedWork.tag) {
          case 22:
            recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
            flags & 2048 && commitOffscreenPassiveMountEffects(
              finishedWork.alternate,
              finishedWork
            );
            break;
          case 24:
            recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
            flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
            break;
          default:
            recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
        }
        parentFiber = parentFiber.sibling;
      }
  }
  var suspenseyCommitFlag = 8192;
  function recursivelyAccumulateSuspenseyCommit(parentFiber, committedLanes, suspendedState) {
    if (parentFiber.subtreeFlags & suspenseyCommitFlag)
      for (parentFiber = parentFiber.child; null !== parentFiber; )
        accumulateSuspenseyCommitOnFiber(
          parentFiber,
          committedLanes,
          suspendedState
        ), parentFiber = parentFiber.sibling;
  }
  function accumulateSuspenseyCommitOnFiber(fiber, committedLanes, suspendedState) {
    switch (fiber.tag) {
      case 26:
        recursivelyAccumulateSuspenseyCommit(
          fiber,
          committedLanes,
          suspendedState
        );
        fiber.flags & suspenseyCommitFlag && null !== fiber.memoizedState && suspendResource(
          suspendedState,
          currentHoistableRoot,
          fiber.memoizedState,
          fiber.memoizedProps
        );
        break;
      case 5:
        recursivelyAccumulateSuspenseyCommit(
          fiber,
          committedLanes,
          suspendedState
        );
        break;
      case 3:
      case 4:
        var previousHoistableRoot = currentHoistableRoot;
        currentHoistableRoot = getHoistableRoot(fiber.stateNode.containerInfo);
        recursivelyAccumulateSuspenseyCommit(
          fiber,
          committedLanes,
          suspendedState
        );
        currentHoistableRoot = previousHoistableRoot;
        break;
      case 22:
        null === fiber.memoizedState && (previousHoistableRoot = fiber.alternate, null !== previousHoistableRoot && null !== previousHoistableRoot.memoizedState ? (previousHoistableRoot = suspenseyCommitFlag, suspenseyCommitFlag = 16777216, recursivelyAccumulateSuspenseyCommit(
          fiber,
          committedLanes,
          suspendedState
        ), suspenseyCommitFlag = previousHoistableRoot) : recursivelyAccumulateSuspenseyCommit(
          fiber,
          committedLanes,
          suspendedState
        ));
        break;
      default:
        recursivelyAccumulateSuspenseyCommit(
          fiber,
          committedLanes,
          suspendedState
        );
    }
  }
  function detachAlternateSiblings(parentFiber) {
    var previousFiber = parentFiber.alternate;
    if (null !== previousFiber && (parentFiber = previousFiber.child, null !== parentFiber)) {
      previousFiber.child = null;
      do
        previousFiber = parentFiber.sibling, parentFiber.sibling = null, parentFiber = previousFiber;
      while (null !== parentFiber);
    }
  }
  function recursivelyTraversePassiveUnmountEffects(parentFiber) {
    var deletions = parentFiber.deletions;
    if (0 !== (parentFiber.flags & 16)) {
      if (null !== deletions)
        for (var i = 0; i < deletions.length; i++) {
          var childToDelete = deletions[i];
          nextEffect = childToDelete;
          commitPassiveUnmountEffectsInsideOfDeletedTree_begin(
            childToDelete,
            parentFiber
          );
        }
      detachAlternateSiblings(parentFiber);
    }
    if (parentFiber.subtreeFlags & 10256)
      for (parentFiber = parentFiber.child; null !== parentFiber; )
        commitPassiveUnmountOnFiber(parentFiber), parentFiber = parentFiber.sibling;
  }
  function commitPassiveUnmountOnFiber(finishedWork) {
    switch (finishedWork.tag) {
      case 0:
      case 11:
      case 15:
        recursivelyTraversePassiveUnmountEffects(finishedWork);
        finishedWork.flags & 2048 && commitHookEffectListUnmount(9, finishedWork, finishedWork.return);
        break;
      case 3:
        recursivelyTraversePassiveUnmountEffects(finishedWork);
        break;
      case 12:
        recursivelyTraversePassiveUnmountEffects(finishedWork);
        break;
      case 22:
        var instance = finishedWork.stateNode;
        null !== finishedWork.memoizedState && instance._visibility & 2 && (null === finishedWork.return || 13 !== finishedWork.return.tag) ? (instance._visibility &= -3, recursivelyTraverseDisconnectPassiveEffects(finishedWork)) : recursivelyTraversePassiveUnmountEffects(finishedWork);
        break;
      default:
        recursivelyTraversePassiveUnmountEffects(finishedWork);
    }
  }
  function recursivelyTraverseDisconnectPassiveEffects(parentFiber) {
    var deletions = parentFiber.deletions;
    if (0 !== (parentFiber.flags & 16)) {
      if (null !== deletions)
        for (var i = 0; i < deletions.length; i++) {
          var childToDelete = deletions[i];
          nextEffect = childToDelete;
          commitPassiveUnmountEffectsInsideOfDeletedTree_begin(
            childToDelete,
            parentFiber
          );
        }
      detachAlternateSiblings(parentFiber);
    }
    for (parentFiber = parentFiber.child; null !== parentFiber; ) {
      deletions = parentFiber;
      switch (deletions.tag) {
        case 0:
        case 11:
        case 15:
          commitHookEffectListUnmount(8, deletions, deletions.return);
          recursivelyTraverseDisconnectPassiveEffects(deletions);
          break;
        case 22:
          i = deletions.stateNode;
          i._visibility & 2 && (i._visibility &= -3, recursivelyTraverseDisconnectPassiveEffects(deletions));
          break;
        default:
          recursivelyTraverseDisconnectPassiveEffects(deletions);
      }
      parentFiber = parentFiber.sibling;
    }
  }
  function commitPassiveUnmountEffectsInsideOfDeletedTree_begin(deletedSubtreeRoot, nearestMountedAncestor) {
    for (; null !== nextEffect; ) {
      var fiber = nextEffect;
      switch (fiber.tag) {
        case 0:
        case 11:
        case 15:
          commitHookEffectListUnmount(8, fiber, nearestMountedAncestor);
          break;
        case 23:
        case 22:
          if (null !== fiber.memoizedState && null !== fiber.memoizedState.cachePool) {
            var cache = fiber.memoizedState.cachePool.pool;
            null != cache && cache.refCount++;
          }
          break;
        case 24:
          releaseCache(fiber.memoizedState.cache);
      }
      cache = fiber.child;
      if (null !== cache) cache.return = fiber, nextEffect = cache;
      else
        a: for (fiber = deletedSubtreeRoot; null !== nextEffect; ) {
          cache = nextEffect;
          var sibling = cache.sibling, returnFiber = cache.return;
          detachFiberAfterEffects(cache);
          if (cache === fiber) {
            nextEffect = null;
            break a;
          }
          if (null !== sibling) {
            sibling.return = returnFiber;
            nextEffect = sibling;
            break a;
          }
          nextEffect = returnFiber;
        }
    }
  }
  var DefaultAsyncDispatcher = {
    getCacheForType: function(resourceType) {
      var cache = readContext(CacheContext), cacheForType = cache.data.get(resourceType);
      void 0 === cacheForType && (cacheForType = resourceType(), cache.data.set(resourceType, cacheForType));
      return cacheForType;
    },
    cacheSignal: function() {
      return readContext(CacheContext).controller.signal;
    }
  }, PossiblyWeakMap = "function" === typeof WeakMap ? WeakMap : Map, executionContext = 0, workInProgressRoot = null, workInProgress = null, workInProgressRootRenderLanes = 0, workInProgressSuspendedReason = 0, workInProgressThrownValue = null, workInProgressRootDidSkipSuspendedSiblings = false, workInProgressRootIsPrerendering = false, workInProgressRootDidAttachPingListener = false, entangledRenderLanes = 0, workInProgressRootExitStatus = 0, workInProgressRootSkippedLanes = 0, workInProgressRootInterleavedUpdatedLanes = 0, workInProgressRootPingedLanes = 0, workInProgressDeferredLane = 0, workInProgressSuspendedRetryLanes = 0, workInProgressRootConcurrentErrors = null, workInProgressRootRecoverableErrors = null, workInProgressRootDidIncludeRecursiveRenderUpdate = false, globalMostRecentFallbackTime = 0, globalMostRecentTransitionTime = 0, workInProgressRootRenderTargetTime = Infinity, workInProgressTransitions = null, legacyErrorBoundariesThatAlreadyFailed = null, pendingEffectsStatus = 0, pendingEffectsRoot = null, pendingFinishedWork = null, pendingEffectsLanes = 0, pendingEffectsRemainingLanes = 0, pendingPassiveTransitions = null, pendingRecoverableErrors = null, nestedUpdateCount = 0, rootWithNestedUpdates = null;
  function requestUpdateLane() {
    return 0 !== (executionContext & 2) && 0 !== workInProgressRootRenderLanes ? workInProgressRootRenderLanes & -workInProgressRootRenderLanes : null !== ReactSharedInternals.T ? requestTransitionLane() : resolveUpdatePriority();
  }
  function requestDeferredLane() {
    if (0 === workInProgressDeferredLane)
      if (0 === (workInProgressRootRenderLanes & 536870912) || isHydrating) {
        var lane = nextTransitionDeferredLane;
        nextTransitionDeferredLane <<= 1;
        0 === (nextTransitionDeferredLane & 3932160) && (nextTransitionDeferredLane = 262144);
        workInProgressDeferredLane = lane;
      } else workInProgressDeferredLane = 536870912;
    lane = suspenseHandlerStackCursor.current;
    null !== lane && (lane.flags |= 32);
    return workInProgressDeferredLane;
  }
  function scheduleUpdateOnFiber(root2, fiber, lane) {
    if (root2 === workInProgressRoot && (2 === workInProgressSuspendedReason || 9 === workInProgressSuspendedReason) || null !== root2.cancelPendingCommit)
      prepareFreshStack(root2, 0), markRootSuspended(
        root2,
        workInProgressRootRenderLanes,
        workInProgressDeferredLane,
        false
      );
    markRootUpdated$1(root2, lane);
    if (0 === (executionContext & 2) || root2 !== workInProgressRoot)
      root2 === workInProgressRoot && (0 === (executionContext & 2) && (workInProgressRootInterleavedUpdatedLanes |= lane), 4 === workInProgressRootExitStatus && markRootSuspended(
        root2,
        workInProgressRootRenderLanes,
        workInProgressDeferredLane,
        false
      )), ensureRootIsScheduled(root2);
  }
  function performWorkOnRoot(root$jscomp$0, lanes, forceSync) {
    if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(327));
    var shouldTimeSlice = !forceSync && 0 === (lanes & 127) && 0 === (lanes & root$jscomp$0.expiredLanes) || checkIfRootIsPrerendering(root$jscomp$0, lanes), exitStatus = shouldTimeSlice ? renderRootConcurrent(root$jscomp$0, lanes) : renderRootSync(root$jscomp$0, lanes, true), renderWasConcurrent = shouldTimeSlice;
    do {
      if (0 === exitStatus) {
        workInProgressRootIsPrerendering && !shouldTimeSlice && markRootSuspended(root$jscomp$0, lanes, 0, false);
        break;
      } else {
        forceSync = root$jscomp$0.current.alternate;
        if (renderWasConcurrent && !isRenderConsistentWithExternalStores(forceSync)) {
          exitStatus = renderRootSync(root$jscomp$0, lanes, false);
          renderWasConcurrent = false;
          continue;
        }
        if (2 === exitStatus) {
          renderWasConcurrent = lanes;
          if (root$jscomp$0.errorRecoveryDisabledLanes & renderWasConcurrent)
            var JSCompiler_inline_result = 0;
          else
            JSCompiler_inline_result = root$jscomp$0.pendingLanes & -536870913, JSCompiler_inline_result = 0 !== JSCompiler_inline_result ? JSCompiler_inline_result : JSCompiler_inline_result & 536870912 ? 536870912 : 0;
          if (0 !== JSCompiler_inline_result) {
            lanes = JSCompiler_inline_result;
            a: {
              var root2 = root$jscomp$0;
              exitStatus = workInProgressRootConcurrentErrors;
              var wasRootDehydrated = root2.current.memoizedState.isDehydrated;
              wasRootDehydrated && (prepareFreshStack(root2, JSCompiler_inline_result).flags |= 256);
              JSCompiler_inline_result = renderRootSync(
                root2,
                JSCompiler_inline_result,
                false
              );
              if (2 !== JSCompiler_inline_result) {
                if (workInProgressRootDidAttachPingListener && !wasRootDehydrated) {
                  root2.errorRecoveryDisabledLanes |= renderWasConcurrent;
                  workInProgressRootInterleavedUpdatedLanes |= renderWasConcurrent;
                  exitStatus = 4;
                  break a;
                }
                renderWasConcurrent = workInProgressRootRecoverableErrors;
                workInProgressRootRecoverableErrors = exitStatus;
                null !== renderWasConcurrent && (null === workInProgressRootRecoverableErrors ? workInProgressRootRecoverableErrors = renderWasConcurrent : workInProgressRootRecoverableErrors.push.apply(
                  workInProgressRootRecoverableErrors,
                  renderWasConcurrent
                ));
              }
              exitStatus = JSCompiler_inline_result;
            }
            renderWasConcurrent = false;
            if (2 !== exitStatus) continue;
          }
        }
        if (1 === exitStatus) {
          prepareFreshStack(root$jscomp$0, 0);
          markRootSuspended(root$jscomp$0, lanes, 0, true);
          break;
        }
        a: {
          shouldTimeSlice = root$jscomp$0;
          renderWasConcurrent = exitStatus;
          switch (renderWasConcurrent) {
            case 0:
            case 1:
              throw Error(formatProdErrorMessage(345));
            case 4:
              if ((lanes & 4194048) !== lanes) break;
            case 6:
              markRootSuspended(
                shouldTimeSlice,
                lanes,
                workInProgressDeferredLane,
                !workInProgressRootDidSkipSuspendedSiblings
              );
              break a;
            case 2:
              workInProgressRootRecoverableErrors = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(formatProdErrorMessage(329));
          }
          if ((lanes & 62914560) === lanes && (exitStatus = globalMostRecentFallbackTime + 300 - now(), 10 < exitStatus)) {
            markRootSuspended(
              shouldTimeSlice,
              lanes,
              workInProgressDeferredLane,
              !workInProgressRootDidSkipSuspendedSiblings
            );
            if (0 !== getNextLanes(shouldTimeSlice, 0, true)) break a;
            pendingEffectsLanes = lanes;
            shouldTimeSlice.timeoutHandle = scheduleTimeout(
              commitRootWhenReady.bind(
                null,
                shouldTimeSlice,
                forceSync,
                workInProgressRootRecoverableErrors,
                workInProgressTransitions,
                workInProgressRootDidIncludeRecursiveRenderUpdate,
                lanes,
                workInProgressDeferredLane,
                workInProgressRootInterleavedUpdatedLanes,
                workInProgressSuspendedRetryLanes,
                workInProgressRootDidSkipSuspendedSiblings,
                renderWasConcurrent,
                "Throttled",
                -0,
                0
              ),
              exitStatus
            );
            break a;
          }
          commitRootWhenReady(
            shouldTimeSlice,
            forceSync,
            workInProgressRootRecoverableErrors,
            workInProgressTransitions,
            workInProgressRootDidIncludeRecursiveRenderUpdate,
            lanes,
            workInProgressDeferredLane,
            workInProgressRootInterleavedUpdatedLanes,
            workInProgressSuspendedRetryLanes,
            workInProgressRootDidSkipSuspendedSiblings,
            renderWasConcurrent,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (1);
    ensureRootIsScheduled(root$jscomp$0);
  }
  function commitRootWhenReady(root2, finishedWork, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, lanes, spawnedLane, updatedLanes, suspendedRetryLanes, didSkipSuspendedSiblings, exitStatus, suspendedCommitReason, completedRenderStartTime, completedRenderEndTime) {
    root2.timeoutHandle = -1;
    suspendedCommitReason = finishedWork.subtreeFlags;
    if (suspendedCommitReason & 8192 || 16785408 === (suspendedCommitReason & 16785408)) {
      suspendedCommitReason = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: true,
        waitingForViewTransition: false,
        unsuspend: noop$1
      };
      accumulateSuspenseyCommitOnFiber(
        finishedWork,
        lanes,
        suspendedCommitReason
      );
      var timeoutOffset = (lanes & 62914560) === lanes ? globalMostRecentFallbackTime - now() : (lanes & 4194048) === lanes ? globalMostRecentTransitionTime - now() : 0;
      timeoutOffset = waitForCommitToBeReady(
        suspendedCommitReason,
        timeoutOffset
      );
      if (null !== timeoutOffset) {
        pendingEffectsLanes = lanes;
        root2.cancelPendingCommit = timeoutOffset(
          commitRoot.bind(
            null,
            root2,
            finishedWork,
            lanes,
            recoverableErrors,
            transitions,
            didIncludeRenderPhaseUpdate,
            spawnedLane,
            updatedLanes,
            suspendedRetryLanes,
            exitStatus,
            suspendedCommitReason,
            null,
            completedRenderStartTime,
            completedRenderEndTime
          )
        );
        markRootSuspended(root2, lanes, spawnedLane, !didSkipSuspendedSiblings);
        return;
      }
    }
    commitRoot(
      root2,
      finishedWork,
      lanes,
      recoverableErrors,
      transitions,
      didIncludeRenderPhaseUpdate,
      spawnedLane,
      updatedLanes,
      suspendedRetryLanes
    );
  }
  function isRenderConsistentWithExternalStores(finishedWork) {
    for (var node = finishedWork; ; ) {
      var tag = node.tag;
      if ((0 === tag || 11 === tag || 15 === tag) && node.flags & 16384 && (tag = node.updateQueue, null !== tag && (tag = tag.stores, null !== tag)))
        for (var i = 0; i < tag.length; i++) {
          var check = tag[i], getSnapshot = check.getSnapshot;
          check = check.value;
          try {
            if (!objectIs(getSnapshot(), check)) return false;
          } catch (error) {
            return false;
          }
        }
      tag = node.child;
      if (node.subtreeFlags & 16384 && null !== tag)
        tag.return = node, node = tag;
      else {
        if (node === finishedWork) break;
        for (; null === node.sibling; ) {
          if (null === node.return || node.return === finishedWork) return true;
          node = node.return;
        }
        node.sibling.return = node.return;
        node = node.sibling;
      }
    }
    return true;
  }
  function markRootSuspended(root2, suspendedLanes, spawnedLane, didAttemptEntireTree) {
    suspendedLanes &= ~workInProgressRootPingedLanes;
    suspendedLanes &= ~workInProgressRootInterleavedUpdatedLanes;
    root2.suspendedLanes |= suspendedLanes;
    root2.pingedLanes &= ~suspendedLanes;
    didAttemptEntireTree && (root2.warmLanes |= suspendedLanes);
    didAttemptEntireTree = root2.expirationTimes;
    for (var lanes = suspendedLanes; 0 < lanes; ) {
      var index$6 = 31 - clz32(lanes), lane = 1 << index$6;
      didAttemptEntireTree[index$6] = -1;
      lanes &= ~lane;
    }
    0 !== spawnedLane && markSpawnedDeferredLane(root2, spawnedLane, suspendedLanes);
  }
  function flushSyncWork$1() {
    return 0 === (executionContext & 6) ? (flushSyncWorkAcrossRoots_impl(0), false) : true;
  }
  function resetWorkInProgressStack() {
    if (null !== workInProgress) {
      if (0 === workInProgressSuspendedReason)
        var interruptedWork = workInProgress.return;
      else
        interruptedWork = workInProgress, lastContextDependency = currentlyRenderingFiber$1 = null, resetHooksOnUnwind(interruptedWork), thenableState$1 = null, thenableIndexCounter$1 = 0, interruptedWork = workInProgress;
      for (; null !== interruptedWork; )
        unwindInterruptedWork(interruptedWork.alternate, interruptedWork), interruptedWork = interruptedWork.return;
      workInProgress = null;
    }
  }
  function prepareFreshStack(root2, lanes) {
    var timeoutHandle = root2.timeoutHandle;
    -1 !== timeoutHandle && (root2.timeoutHandle = -1, cancelTimeout(timeoutHandle));
    timeoutHandle = root2.cancelPendingCommit;
    null !== timeoutHandle && (root2.cancelPendingCommit = null, timeoutHandle());
    pendingEffectsLanes = 0;
    resetWorkInProgressStack();
    workInProgressRoot = root2;
    workInProgress = timeoutHandle = createWorkInProgress(root2.current, null);
    workInProgressRootRenderLanes = lanes;
    workInProgressSuspendedReason = 0;
    workInProgressThrownValue = null;
    workInProgressRootDidSkipSuspendedSiblings = false;
    workInProgressRootIsPrerendering = checkIfRootIsPrerendering(root2, lanes);
    workInProgressRootDidAttachPingListener = false;
    workInProgressSuspendedRetryLanes = workInProgressDeferredLane = workInProgressRootPingedLanes = workInProgressRootInterleavedUpdatedLanes = workInProgressRootSkippedLanes = workInProgressRootExitStatus = 0;
    workInProgressRootRecoverableErrors = workInProgressRootConcurrentErrors = null;
    workInProgressRootDidIncludeRecursiveRenderUpdate = false;
    0 !== (lanes & 8) && (lanes |= lanes & 32);
    var allEntangledLanes = root2.entangledLanes;
    if (0 !== allEntangledLanes)
      for (root2 = root2.entanglements, allEntangledLanes &= lanes; 0 < allEntangledLanes; ) {
        var index$4 = 31 - clz32(allEntangledLanes), lane = 1 << index$4;
        lanes |= root2[index$4];
        allEntangledLanes &= ~lane;
      }
    entangledRenderLanes = lanes;
    finishQueueingConcurrentUpdates();
    return timeoutHandle;
  }
  function handleThrow(root2, thrownValue) {
    currentlyRenderingFiber = null;
    ReactSharedInternals.H = ContextOnlyDispatcher;
    thrownValue === SuspenseException || thrownValue === SuspenseActionException ? (thrownValue = getSuspendedThenable(), workInProgressSuspendedReason = 3) : thrownValue === SuspenseyCommitException ? (thrownValue = getSuspendedThenable(), workInProgressSuspendedReason = 4) : workInProgressSuspendedReason = thrownValue === SelectiveHydrationException ? 8 : null !== thrownValue && "object" === typeof thrownValue && "function" === typeof thrownValue.then ? 6 : 1;
    workInProgressThrownValue = thrownValue;
    null === workInProgress && (workInProgressRootExitStatus = 1, logUncaughtError(
      root2,
      createCapturedValueAtFiber(thrownValue, root2.current)
    ));
  }
  function shouldRemainOnPreviousScreen() {
    var handler = suspenseHandlerStackCursor.current;
    return null === handler ? true : (workInProgressRootRenderLanes & 4194048) === workInProgressRootRenderLanes ? null === shellBoundary ? true : false : (workInProgressRootRenderLanes & 62914560) === workInProgressRootRenderLanes || 0 !== (workInProgressRootRenderLanes & 536870912) ? handler === shellBoundary : false;
  }
  function pushDispatcher() {
    var prevDispatcher = ReactSharedInternals.H;
    ReactSharedInternals.H = ContextOnlyDispatcher;
    return null === prevDispatcher ? ContextOnlyDispatcher : prevDispatcher;
  }
  function pushAsyncDispatcher() {
    var prevAsyncDispatcher = ReactSharedInternals.A;
    ReactSharedInternals.A = DefaultAsyncDispatcher;
    return prevAsyncDispatcher;
  }
  function renderDidSuspendDelayIfPossible() {
    workInProgressRootExitStatus = 4;
    workInProgressRootDidSkipSuspendedSiblings || (workInProgressRootRenderLanes & 4194048) !== workInProgressRootRenderLanes && null !== suspenseHandlerStackCursor.current || (workInProgressRootIsPrerendering = true);
    0 === (workInProgressRootSkippedLanes & 134217727) && 0 === (workInProgressRootInterleavedUpdatedLanes & 134217727) || null === workInProgressRoot || markRootSuspended(
      workInProgressRoot,
      workInProgressRootRenderLanes,
      workInProgressDeferredLane,
      false
    );
  }
  function renderRootSync(root2, lanes, shouldYieldForPrerendering) {
    var prevExecutionContext = executionContext;
    executionContext |= 2;
    var prevDispatcher = pushDispatcher(), prevAsyncDispatcher = pushAsyncDispatcher();
    if (workInProgressRoot !== root2 || workInProgressRootRenderLanes !== lanes)
      workInProgressTransitions = null, prepareFreshStack(root2, lanes);
    lanes = false;
    var exitStatus = workInProgressRootExitStatus;
    a: do
      try {
        if (0 !== workInProgressSuspendedReason && null !== workInProgress) {
          var unitOfWork = workInProgress, thrownValue = workInProgressThrownValue;
          switch (workInProgressSuspendedReason) {
            case 8:
              resetWorkInProgressStack();
              exitStatus = 6;
              break a;
            case 3:
            case 2:
            case 9:
            case 6:
              null === suspenseHandlerStackCursor.current && (lanes = true);
              var reason = workInProgressSuspendedReason;
              workInProgressSuspendedReason = 0;
              workInProgressThrownValue = null;
              throwAndUnwindWorkLoop(root2, unitOfWork, thrownValue, reason);
              if (shouldYieldForPrerendering && workInProgressRootIsPrerendering) {
                exitStatus = 0;
                break a;
              }
              break;
            default:
              reason = workInProgressSuspendedReason, workInProgressSuspendedReason = 0, workInProgressThrownValue = null, throwAndUnwindWorkLoop(root2, unitOfWork, thrownValue, reason);
          }
        }
        workLoopSync();
        exitStatus = workInProgressRootExitStatus;
        break;
      } catch (thrownValue$165) {
        handleThrow(root2, thrownValue$165);
      }
    while (1);
    lanes && root2.shellSuspendCounter++;
    lastContextDependency = currentlyRenderingFiber$1 = null;
    executionContext = prevExecutionContext;
    ReactSharedInternals.H = prevDispatcher;
    ReactSharedInternals.A = prevAsyncDispatcher;
    null === workInProgress && (workInProgressRoot = null, workInProgressRootRenderLanes = 0, finishQueueingConcurrentUpdates());
    return exitStatus;
  }
  function workLoopSync() {
    for (; null !== workInProgress; ) performUnitOfWork(workInProgress);
  }
  function renderRootConcurrent(root2, lanes) {
    var prevExecutionContext = executionContext;
    executionContext |= 2;
    var prevDispatcher = pushDispatcher(), prevAsyncDispatcher = pushAsyncDispatcher();
    workInProgressRoot !== root2 || workInProgressRootRenderLanes !== lanes ? (workInProgressTransitions = null, workInProgressRootRenderTargetTime = now() + 500, prepareFreshStack(root2, lanes)) : workInProgressRootIsPrerendering = checkIfRootIsPrerendering(
      root2,
      lanes
    );
    a: do
      try {
        if (0 !== workInProgressSuspendedReason && null !== workInProgress) {
          lanes = workInProgress;
          var thrownValue = workInProgressThrownValue;
          b: switch (workInProgressSuspendedReason) {
            case 1:
              workInProgressSuspendedReason = 0;
              workInProgressThrownValue = null;
              throwAndUnwindWorkLoop(root2, lanes, thrownValue, 1);
              break;
            case 2:
            case 9:
              if (isThenableResolved(thrownValue)) {
                workInProgressSuspendedReason = 0;
                workInProgressThrownValue = null;
                replaySuspendedUnitOfWork(lanes);
                break;
              }
              lanes = function() {
                2 !== workInProgressSuspendedReason && 9 !== workInProgressSuspendedReason || workInProgressRoot !== root2 || (workInProgressSuspendedReason = 7);
                ensureRootIsScheduled(root2);
              };
              thrownValue.then(lanes, lanes);
              break a;
            case 3:
              workInProgressSuspendedReason = 7;
              break a;
            case 4:
              workInProgressSuspendedReason = 5;
              break a;
            case 7:
              isThenableResolved(thrownValue) ? (workInProgressSuspendedReason = 0, workInProgressThrownValue = null, replaySuspendedUnitOfWork(lanes)) : (workInProgressSuspendedReason = 0, workInProgressThrownValue = null, throwAndUnwindWorkLoop(root2, lanes, thrownValue, 7));
              break;
            case 5:
              var resource = null;
              switch (workInProgress.tag) {
                case 26:
                  resource = workInProgress.memoizedState;
                case 5:
                case 27:
                  var hostFiber = workInProgress;
                  if (resource ? preloadResource(resource) : hostFiber.stateNode.complete) {
                    workInProgressSuspendedReason = 0;
                    workInProgressThrownValue = null;
                    var sibling = hostFiber.sibling;
                    if (null !== sibling) workInProgress = sibling;
                    else {
                      var returnFiber = hostFiber.return;
                      null !== returnFiber ? (workInProgress = returnFiber, completeUnitOfWork(returnFiber)) : workInProgress = null;
                    }
                    break b;
                  }
              }
              workInProgressSuspendedReason = 0;
              workInProgressThrownValue = null;
              throwAndUnwindWorkLoop(root2, lanes, thrownValue, 5);
              break;
            case 6:
              workInProgressSuspendedReason = 0;
              workInProgressThrownValue = null;
              throwAndUnwindWorkLoop(root2, lanes, thrownValue, 6);
              break;
            case 8:
              resetWorkInProgressStack();
              workInProgressRootExitStatus = 6;
              break a;
            default:
              throw Error(formatProdErrorMessage(462));
          }
        }
        workLoopConcurrentByScheduler();
        break;
      } catch (thrownValue$167) {
        handleThrow(root2, thrownValue$167);
      }
    while (1);
    lastContextDependency = currentlyRenderingFiber$1 = null;
    ReactSharedInternals.H = prevDispatcher;
    ReactSharedInternals.A = prevAsyncDispatcher;
    executionContext = prevExecutionContext;
    if (null !== workInProgress) return 0;
    workInProgressRoot = null;
    workInProgressRootRenderLanes = 0;
    finishQueueingConcurrentUpdates();
    return workInProgressRootExitStatus;
  }
  function workLoopConcurrentByScheduler() {
    for (; null !== workInProgress && !shouldYield(); )
      performUnitOfWork(workInProgress);
  }
  function performUnitOfWork(unitOfWork) {
    var next = beginWork(unitOfWork.alternate, unitOfWork, entangledRenderLanes);
    unitOfWork.memoizedProps = unitOfWork.pendingProps;
    null === next ? completeUnitOfWork(unitOfWork) : workInProgress = next;
  }
  function replaySuspendedUnitOfWork(unitOfWork) {
    var next = unitOfWork;
    var current = next.alternate;
    switch (next.tag) {
      case 15:
      case 0:
        next = replayFunctionComponent(
          current,
          next,
          next.pendingProps,
          next.type,
          void 0,
          workInProgressRootRenderLanes
        );
        break;
      case 11:
        next = replayFunctionComponent(
          current,
          next,
          next.pendingProps,
          next.type.render,
          next.ref,
          workInProgressRootRenderLanes
        );
        break;
      case 5:
        resetHooksOnUnwind(next);
      default:
        unwindInterruptedWork(current, next), next = workInProgress = resetWorkInProgress(next, entangledRenderLanes), next = beginWork(current, next, entangledRenderLanes);
    }
    unitOfWork.memoizedProps = unitOfWork.pendingProps;
    null === next ? completeUnitOfWork(unitOfWork) : workInProgress = next;
  }
  function throwAndUnwindWorkLoop(root2, unitOfWork, thrownValue, suspendedReason) {
    lastContextDependency = currentlyRenderingFiber$1 = null;
    resetHooksOnUnwind(unitOfWork);
    thenableState$1 = null;
    thenableIndexCounter$1 = 0;
    var returnFiber = unitOfWork.return;
    try {
      if (throwException(
        root2,
        returnFiber,
        unitOfWork,
        thrownValue,
        workInProgressRootRenderLanes
      )) {
        workInProgressRootExitStatus = 1;
        logUncaughtError(
          root2,
          createCapturedValueAtFiber(thrownValue, root2.current)
        );
        workInProgress = null;
        return;
      }
    } catch (error) {
      if (null !== returnFiber) throw workInProgress = returnFiber, error;
      workInProgressRootExitStatus = 1;
      logUncaughtError(
        root2,
        createCapturedValueAtFiber(thrownValue, root2.current)
      );
      workInProgress = null;
      return;
    }
    if (unitOfWork.flags & 32768) {
      if (isHydrating || 1 === suspendedReason) root2 = true;
      else if (workInProgressRootIsPrerendering || 0 !== (workInProgressRootRenderLanes & 536870912))
        root2 = false;
      else if (workInProgressRootDidSkipSuspendedSiblings = root2 = true, 2 === suspendedReason || 9 === suspendedReason || 3 === suspendedReason || 6 === suspendedReason)
        suspendedReason = suspenseHandlerStackCursor.current, null !== suspendedReason && 13 === suspendedReason.tag && (suspendedReason.flags |= 16384);
      unwindUnitOfWork(unitOfWork, root2);
    } else completeUnitOfWork(unitOfWork);
  }
  function completeUnitOfWork(unitOfWork) {
    var completedWork = unitOfWork;
    do {
      if (0 !== (completedWork.flags & 32768)) {
        unwindUnitOfWork(
          completedWork,
          workInProgressRootDidSkipSuspendedSiblings
        );
        return;
      }
      unitOfWork = completedWork.return;
      var next = completeWork(
        completedWork.alternate,
        completedWork,
        entangledRenderLanes
      );
      if (null !== next) {
        workInProgress = next;
        return;
      }
      completedWork = completedWork.sibling;
      if (null !== completedWork) {
        workInProgress = completedWork;
        return;
      }
      workInProgress = completedWork = unitOfWork;
    } while (null !== completedWork);
    0 === workInProgressRootExitStatus && (workInProgressRootExitStatus = 5);
  }
  function unwindUnitOfWork(unitOfWork, skipSiblings) {
    do {
      var next = unwindWork(unitOfWork.alternate, unitOfWork);
      if (null !== next) {
        next.flags &= 32767;
        workInProgress = next;
        return;
      }
      next = unitOfWork.return;
      null !== next && (next.flags |= 32768, next.subtreeFlags = 0, next.deletions = null);
      if (!skipSiblings && (unitOfWork = unitOfWork.sibling, null !== unitOfWork)) {
        workInProgress = unitOfWork;
        return;
      }
      workInProgress = unitOfWork = next;
    } while (null !== unitOfWork);
    workInProgressRootExitStatus = 6;
    workInProgress = null;
  }
  function commitRoot(root2, finishedWork, lanes, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, spawnedLane, updatedLanes, suspendedRetryLanes) {
    root2.cancelPendingCommit = null;
    do
      flushPendingEffects();
    while (0 !== pendingEffectsStatus);
    if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(327));
    if (null !== finishedWork) {
      if (finishedWork === root2.current) throw Error(formatProdErrorMessage(177));
      didIncludeRenderPhaseUpdate = finishedWork.lanes | finishedWork.childLanes;
      didIncludeRenderPhaseUpdate |= concurrentlyUpdatedLanes;
      markRootFinished(
        root2,
        lanes,
        didIncludeRenderPhaseUpdate,
        spawnedLane,
        updatedLanes,
        suspendedRetryLanes
      );
      root2 === workInProgressRoot && (workInProgress = workInProgressRoot = null, workInProgressRootRenderLanes = 0);
      pendingFinishedWork = finishedWork;
      pendingEffectsRoot = root2;
      pendingEffectsLanes = lanes;
      pendingEffectsRemainingLanes = didIncludeRenderPhaseUpdate;
      pendingPassiveTransitions = transitions;
      pendingRecoverableErrors = recoverableErrors;
      0 !== (finishedWork.subtreeFlags & 10256) || 0 !== (finishedWork.flags & 10256) ? (root2.callbackNode = null, root2.callbackPriority = 0, scheduleCallback$1(NormalPriority$1, function() {
        flushPassiveEffects();
        return null;
      })) : (root2.callbackNode = null, root2.callbackPriority = 0);
      recoverableErrors = 0 !== (finishedWork.flags & 13878);
      if (0 !== (finishedWork.subtreeFlags & 13878) || recoverableErrors) {
        recoverableErrors = ReactSharedInternals.T;
        ReactSharedInternals.T = null;
        transitions = ReactDOMSharedInternals.p;
        ReactDOMSharedInternals.p = 2;
        spawnedLane = executionContext;
        executionContext |= 4;
        try {
          commitBeforeMutationEffects(root2, finishedWork, lanes);
        } finally {
          executionContext = spawnedLane, ReactDOMSharedInternals.p = transitions, ReactSharedInternals.T = recoverableErrors;
        }
      }
      pendingEffectsStatus = 1;
      flushMutationEffects();
      flushLayoutEffects();
      flushSpawnedWork();
    }
  }
  function flushMutationEffects() {
    if (1 === pendingEffectsStatus) {
      pendingEffectsStatus = 0;
      var root2 = pendingEffectsRoot, finishedWork = pendingFinishedWork, rootMutationHasEffect = 0 !== (finishedWork.flags & 13878);
      if (0 !== (finishedWork.subtreeFlags & 13878) || rootMutationHasEffect) {
        rootMutationHasEffect = ReactSharedInternals.T;
        ReactSharedInternals.T = null;
        var previousPriority = ReactDOMSharedInternals.p;
        ReactDOMSharedInternals.p = 2;
        var prevExecutionContext = executionContext;
        executionContext |= 4;
        try {
          commitMutationEffectsOnFiber(finishedWork, root2);
          var priorSelectionInformation = selectionInformation, curFocusedElem = getActiveElementDeep(root2.containerInfo), priorFocusedElem = priorSelectionInformation.focusedElem, priorSelectionRange = priorSelectionInformation.selectionRange;
          if (curFocusedElem !== priorFocusedElem && priorFocusedElem && priorFocusedElem.ownerDocument && containsNode(
            priorFocusedElem.ownerDocument.documentElement,
            priorFocusedElem
          )) {
            if (null !== priorSelectionRange && hasSelectionCapabilities(priorFocusedElem)) {
              var start = priorSelectionRange.start, end = priorSelectionRange.end;
              void 0 === end && (end = start);
              if ("selectionStart" in priorFocusedElem)
                priorFocusedElem.selectionStart = start, priorFocusedElem.selectionEnd = Math.min(
                  end,
                  priorFocusedElem.value.length
                );
              else {
                var doc = priorFocusedElem.ownerDocument || document, win = doc && doc.defaultView || window;
                if (win.getSelection) {
                  var selection = win.getSelection(), length = priorFocusedElem.textContent.length, start$jscomp$0 = Math.min(priorSelectionRange.start, length), end$jscomp$0 = void 0 === priorSelectionRange.end ? start$jscomp$0 : Math.min(priorSelectionRange.end, length);
                  !selection.extend && start$jscomp$0 > end$jscomp$0 && (curFocusedElem = end$jscomp$0, end$jscomp$0 = start$jscomp$0, start$jscomp$0 = curFocusedElem);
                  var startMarker = getNodeForCharacterOffset(
                    priorFocusedElem,
                    start$jscomp$0
                  ), endMarker = getNodeForCharacterOffset(
                    priorFocusedElem,
                    end$jscomp$0
                  );
                  if (startMarker && endMarker && (1 !== selection.rangeCount || selection.anchorNode !== startMarker.node || selection.anchorOffset !== startMarker.offset || selection.focusNode !== endMarker.node || selection.focusOffset !== endMarker.offset)) {
                    var range = doc.createRange();
                    range.setStart(startMarker.node, startMarker.offset);
                    selection.removeAllRanges();
                    start$jscomp$0 > end$jscomp$0 ? (selection.addRange(range), selection.extend(endMarker.node, endMarker.offset)) : (range.setEnd(endMarker.node, endMarker.offset), selection.addRange(range));
                  }
                }
              }
            }
            doc = [];
            for (selection = priorFocusedElem; selection = selection.parentNode; )
              1 === selection.nodeType && doc.push({
                element: selection,
                left: selection.scrollLeft,
                top: selection.scrollTop
              });
            "function" === typeof priorFocusedElem.focus && priorFocusedElem.focus();
            for (priorFocusedElem = 0; priorFocusedElem < doc.length; priorFocusedElem++) {
              var info = doc[priorFocusedElem];
              info.element.scrollLeft = info.left;
              info.element.scrollTop = info.top;
            }
          }
          _enabled = !!eventsEnabled;
          selectionInformation = eventsEnabled = null;
        } finally {
          executionContext = prevExecutionContext, ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = rootMutationHasEffect;
        }
      }
      root2.current = finishedWork;
      pendingEffectsStatus = 2;
    }
  }
  function flushLayoutEffects() {
    if (2 === pendingEffectsStatus) {
      pendingEffectsStatus = 0;
      var root2 = pendingEffectsRoot, finishedWork = pendingFinishedWork, rootHasLayoutEffect = 0 !== (finishedWork.flags & 8772);
      if (0 !== (finishedWork.subtreeFlags & 8772) || rootHasLayoutEffect) {
        rootHasLayoutEffect = ReactSharedInternals.T;
        ReactSharedInternals.T = null;
        var previousPriority = ReactDOMSharedInternals.p;
        ReactDOMSharedInternals.p = 2;
        var prevExecutionContext = executionContext;
        executionContext |= 4;
        try {
          commitLayoutEffectOnFiber(root2, finishedWork.alternate, finishedWork);
        } finally {
          executionContext = prevExecutionContext, ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = rootHasLayoutEffect;
        }
      }
      pendingEffectsStatus = 3;
    }
  }
  function flushSpawnedWork() {
    if (4 === pendingEffectsStatus || 3 === pendingEffectsStatus) {
      pendingEffectsStatus = 0;
      requestPaint();
      var root2 = pendingEffectsRoot, finishedWork = pendingFinishedWork, lanes = pendingEffectsLanes, recoverableErrors = pendingRecoverableErrors;
      0 !== (finishedWork.subtreeFlags & 10256) || 0 !== (finishedWork.flags & 10256) ? pendingEffectsStatus = 5 : (pendingEffectsStatus = 0, pendingFinishedWork = pendingEffectsRoot = null, releaseRootPooledCache(root2, root2.pendingLanes));
      var remainingLanes = root2.pendingLanes;
      0 === remainingLanes && (legacyErrorBoundariesThatAlreadyFailed = null);
      lanesToEventPriority(lanes);
      finishedWork = finishedWork.stateNode;
      if (injectedHook && "function" === typeof injectedHook.onCommitFiberRoot)
        try {
          injectedHook.onCommitFiberRoot(
            rendererID,
            finishedWork,
            void 0,
            128 === (finishedWork.current.flags & 128)
          );
        } catch (err) {
        }
      if (null !== recoverableErrors) {
        finishedWork = ReactSharedInternals.T;
        remainingLanes = ReactDOMSharedInternals.p;
        ReactDOMSharedInternals.p = 2;
        ReactSharedInternals.T = null;
        try {
          for (var onRecoverableError = root2.onRecoverableError, i = 0; i < recoverableErrors.length; i++) {
            var recoverableError = recoverableErrors[i];
            onRecoverableError(recoverableError.value, {
              componentStack: recoverableError.stack
            });
          }
        } finally {
          ReactSharedInternals.T = finishedWork, ReactDOMSharedInternals.p = remainingLanes;
        }
      }
      0 !== (pendingEffectsLanes & 3) && flushPendingEffects();
      ensureRootIsScheduled(root2);
      remainingLanes = root2.pendingLanes;
      0 !== (lanes & 261930) && 0 !== (remainingLanes & 42) ? root2 === rootWithNestedUpdates ? nestedUpdateCount++ : (nestedUpdateCount = 0, rootWithNestedUpdates = root2) : nestedUpdateCount = 0;
      flushSyncWorkAcrossRoots_impl(0);
    }
  }
  function releaseRootPooledCache(root2, remainingLanes) {
    0 === (root2.pooledCacheLanes &= remainingLanes) && (remainingLanes = root2.pooledCache, null != remainingLanes && (root2.pooledCache = null, releaseCache(remainingLanes)));
  }
  function flushPendingEffects() {
    flushMutationEffects();
    flushLayoutEffects();
    flushSpawnedWork();
    return flushPassiveEffects();
  }
  function flushPassiveEffects() {
    if (5 !== pendingEffectsStatus) return false;
    var root2 = pendingEffectsRoot, remainingLanes = pendingEffectsRemainingLanes;
    pendingEffectsRemainingLanes = 0;
    var renderPriority = lanesToEventPriority(pendingEffectsLanes), prevTransition = ReactSharedInternals.T, previousPriority = ReactDOMSharedInternals.p;
    try {
      ReactDOMSharedInternals.p = 32 > renderPriority ? 32 : renderPriority;
      ReactSharedInternals.T = null;
      renderPriority = pendingPassiveTransitions;
      pendingPassiveTransitions = null;
      var root$jscomp$0 = pendingEffectsRoot, lanes = pendingEffectsLanes;
      pendingEffectsStatus = 0;
      pendingFinishedWork = pendingEffectsRoot = null;
      pendingEffectsLanes = 0;
      if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(331));
      var prevExecutionContext = executionContext;
      executionContext |= 4;
      commitPassiveUnmountOnFiber(root$jscomp$0.current);
      commitPassiveMountOnFiber(
        root$jscomp$0,
        root$jscomp$0.current,
        lanes,
        renderPriority
      );
      executionContext = prevExecutionContext;
      flushSyncWorkAcrossRoots_impl(0, false);
      if (injectedHook && "function" === typeof injectedHook.onPostCommitFiberRoot)
        try {
          injectedHook.onPostCommitFiberRoot(rendererID, root$jscomp$0);
        } catch (err) {
        }
      return true;
    } finally {
      ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition, releaseRootPooledCache(root2, remainingLanes);
    }
  }
  function captureCommitPhaseErrorOnRoot(rootFiber, sourceFiber, error) {
    sourceFiber = createCapturedValueAtFiber(error, sourceFiber);
    sourceFiber = createRootErrorUpdate(rootFiber.stateNode, sourceFiber, 2);
    rootFiber = enqueueUpdate(rootFiber, sourceFiber, 2);
    null !== rootFiber && (markRootUpdated$1(rootFiber, 2), ensureRootIsScheduled(rootFiber));
  }
  function captureCommitPhaseError(sourceFiber, nearestMountedAncestor, error) {
    if (3 === sourceFiber.tag)
      captureCommitPhaseErrorOnRoot(sourceFiber, sourceFiber, error);
    else
      for (; null !== nearestMountedAncestor; ) {
        if (3 === nearestMountedAncestor.tag) {
          captureCommitPhaseErrorOnRoot(
            nearestMountedAncestor,
            sourceFiber,
            error
          );
          break;
        } else if (1 === nearestMountedAncestor.tag) {
          var instance = nearestMountedAncestor.stateNode;
          if ("function" === typeof nearestMountedAncestor.type.getDerivedStateFromError || "function" === typeof instance.componentDidCatch && (null === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(instance))) {
            sourceFiber = createCapturedValueAtFiber(error, sourceFiber);
            error = createClassErrorUpdate(2);
            instance = enqueueUpdate(nearestMountedAncestor, error, 2);
            null !== instance && (initializeClassErrorUpdate(
              error,
              instance,
              nearestMountedAncestor,
              sourceFiber
            ), markRootUpdated$1(instance, 2), ensureRootIsScheduled(instance));
            break;
          }
        }
        nearestMountedAncestor = nearestMountedAncestor.return;
      }
  }
  function attachPingListener(root2, wakeable, lanes) {
    var pingCache = root2.pingCache;
    if (null === pingCache) {
      pingCache = root2.pingCache = new PossiblyWeakMap();
      var threadIDs = /* @__PURE__ */ new Set();
      pingCache.set(wakeable, threadIDs);
    } else
      threadIDs = pingCache.get(wakeable), void 0 === threadIDs && (threadIDs = /* @__PURE__ */ new Set(), pingCache.set(wakeable, threadIDs));
    threadIDs.has(lanes) || (workInProgressRootDidAttachPingListener = true, threadIDs.add(lanes), root2 = pingSuspendedRoot.bind(null, root2, wakeable, lanes), wakeable.then(root2, root2));
  }
  function pingSuspendedRoot(root2, wakeable, pingedLanes) {
    var pingCache = root2.pingCache;
    null !== pingCache && pingCache.delete(wakeable);
    root2.pingedLanes |= root2.suspendedLanes & pingedLanes;
    root2.warmLanes &= ~pingedLanes;
    workInProgressRoot === root2 && (workInProgressRootRenderLanes & pingedLanes) === pingedLanes && (4 === workInProgressRootExitStatus || 3 === workInProgressRootExitStatus && (workInProgressRootRenderLanes & 62914560) === workInProgressRootRenderLanes && 300 > now() - globalMostRecentFallbackTime ? 0 === (executionContext & 2) && prepareFreshStack(root2, 0) : workInProgressRootPingedLanes |= pingedLanes, workInProgressSuspendedRetryLanes === workInProgressRootRenderLanes && (workInProgressSuspendedRetryLanes = 0));
    ensureRootIsScheduled(root2);
  }
  function retryTimedOutBoundary(boundaryFiber, retryLane) {
    0 === retryLane && (retryLane = claimNextRetryLane());
    boundaryFiber = enqueueConcurrentRenderForLane(boundaryFiber, retryLane);
    null !== boundaryFiber && (markRootUpdated$1(boundaryFiber, retryLane), ensureRootIsScheduled(boundaryFiber));
  }
  function retryDehydratedSuspenseBoundary(boundaryFiber) {
    var suspenseState = boundaryFiber.memoizedState, retryLane = 0;
    null !== suspenseState && (retryLane = suspenseState.retryLane);
    retryTimedOutBoundary(boundaryFiber, retryLane);
  }
  function resolveRetryWakeable(boundaryFiber, wakeable) {
    var retryLane = 0;
    switch (boundaryFiber.tag) {
      case 31:
      case 13:
        var retryCache = boundaryFiber.stateNode;
        var suspenseState = boundaryFiber.memoizedState;
        null !== suspenseState && (retryLane = suspenseState.retryLane);
        break;
      case 19:
        retryCache = boundaryFiber.stateNode;
        break;
      case 22:
        retryCache = boundaryFiber.stateNode._retryCache;
        break;
      default:
        throw Error(formatProdErrorMessage(314));
    }
    null !== retryCache && retryCache.delete(wakeable);
    retryTimedOutBoundary(boundaryFiber, retryLane);
  }
  function scheduleCallback$1(priorityLevel, callback) {
    return scheduleCallback$3(priorityLevel, callback);
  }
  var firstScheduledRoot = null, lastScheduledRoot = null, didScheduleMicrotask = false, mightHavePendingSyncWork = false, isFlushingWork = false, currentEventTransitionLane = 0;
  function ensureRootIsScheduled(root2) {
    root2 !== lastScheduledRoot && null === root2.next && (null === lastScheduledRoot ? firstScheduledRoot = lastScheduledRoot = root2 : lastScheduledRoot = lastScheduledRoot.next = root2);
    mightHavePendingSyncWork = true;
    didScheduleMicrotask || (didScheduleMicrotask = true, scheduleImmediateRootScheduleTask());
  }
  function flushSyncWorkAcrossRoots_impl(syncTransitionLanes, onlyLegacy) {
    if (!isFlushingWork && mightHavePendingSyncWork) {
      isFlushingWork = true;
      do {
        var didPerformSomeWork = false;
        for (var root$170 = firstScheduledRoot; null !== root$170; ) {
          if (0 !== syncTransitionLanes) {
            var pendingLanes = root$170.pendingLanes;
            if (0 === pendingLanes) var JSCompiler_inline_result = 0;
            else {
              var suspendedLanes = root$170.suspendedLanes, pingedLanes = root$170.pingedLanes;
              JSCompiler_inline_result = (1 << 31 - clz32(42 | syncTransitionLanes) + 1) - 1;
              JSCompiler_inline_result &= pendingLanes & ~(suspendedLanes & ~pingedLanes);
              JSCompiler_inline_result = JSCompiler_inline_result & 201326741 ? JSCompiler_inline_result & 201326741 | 1 : JSCompiler_inline_result ? JSCompiler_inline_result | 2 : 0;
            }
            0 !== JSCompiler_inline_result && (didPerformSomeWork = true, performSyncWorkOnRoot(root$170, JSCompiler_inline_result));
          } else
            JSCompiler_inline_result = workInProgressRootRenderLanes, JSCompiler_inline_result = getNextLanes(
              root$170,
              root$170 === workInProgressRoot ? JSCompiler_inline_result : 0,
              null !== root$170.cancelPendingCommit || -1 !== root$170.timeoutHandle
            ), 0 === (JSCompiler_inline_result & 3) || checkIfRootIsPrerendering(root$170, JSCompiler_inline_result) || (didPerformSomeWork = true, performSyncWorkOnRoot(root$170, JSCompiler_inline_result));
          root$170 = root$170.next;
        }
      } while (didPerformSomeWork);
      isFlushingWork = false;
    }
  }
  function processRootScheduleInImmediateTask() {
    processRootScheduleInMicrotask();
  }
  function processRootScheduleInMicrotask() {
    mightHavePendingSyncWork = didScheduleMicrotask = false;
    var syncTransitionLanes = 0;
    0 !== currentEventTransitionLane && shouldAttemptEagerTransition() && (syncTransitionLanes = currentEventTransitionLane);
    for (var currentTime = now(), prev = null, root2 = firstScheduledRoot; null !== root2; ) {
      var next = root2.next, nextLanes = scheduleTaskForRootDuringMicrotask(root2, currentTime);
      if (0 === nextLanes)
        root2.next = null, null === prev ? firstScheduledRoot = next : prev.next = next, null === next && (lastScheduledRoot = prev);
      else if (prev = root2, 0 !== syncTransitionLanes || 0 !== (nextLanes & 3))
        mightHavePendingSyncWork = true;
      root2 = next;
    }
    0 !== pendingEffectsStatus && 5 !== pendingEffectsStatus || flushSyncWorkAcrossRoots_impl(syncTransitionLanes);
    0 !== currentEventTransitionLane && (currentEventTransitionLane = 0);
  }
  function scheduleTaskForRootDuringMicrotask(root2, currentTime) {
    for (var suspendedLanes = root2.suspendedLanes, pingedLanes = root2.pingedLanes, expirationTimes = root2.expirationTimes, lanes = root2.pendingLanes & -62914561; 0 < lanes; ) {
      var index$5 = 31 - clz32(lanes), lane = 1 << index$5, expirationTime = expirationTimes[index$5];
      if (-1 === expirationTime) {
        if (0 === (lane & suspendedLanes) || 0 !== (lane & pingedLanes))
          expirationTimes[index$5] = computeExpirationTime(lane, currentTime);
      } else expirationTime <= currentTime && (root2.expiredLanes |= lane);
      lanes &= ~lane;
    }
    currentTime = workInProgressRoot;
    suspendedLanes = workInProgressRootRenderLanes;
    suspendedLanes = getNextLanes(
      root2,
      root2 === currentTime ? suspendedLanes : 0,
      null !== root2.cancelPendingCommit || -1 !== root2.timeoutHandle
    );
    pingedLanes = root2.callbackNode;
    if (0 === suspendedLanes || root2 === currentTime && (2 === workInProgressSuspendedReason || 9 === workInProgressSuspendedReason) || null !== root2.cancelPendingCommit)
      return null !== pingedLanes && null !== pingedLanes && cancelCallback$1(pingedLanes), root2.callbackNode = null, root2.callbackPriority = 0;
    if (0 === (suspendedLanes & 3) || checkIfRootIsPrerendering(root2, suspendedLanes)) {
      currentTime = suspendedLanes & -suspendedLanes;
      if (currentTime === root2.callbackPriority) return currentTime;
      null !== pingedLanes && cancelCallback$1(pingedLanes);
      switch (lanesToEventPriority(suspendedLanes)) {
        case 2:
        case 8:
          suspendedLanes = UserBlockingPriority;
          break;
        case 32:
          suspendedLanes = NormalPriority$1;
          break;
        case 268435456:
          suspendedLanes = IdlePriority;
          break;
        default:
          suspendedLanes = NormalPriority$1;
      }
      pingedLanes = performWorkOnRootViaSchedulerTask.bind(null, root2);
      suspendedLanes = scheduleCallback$3(suspendedLanes, pingedLanes);
      root2.callbackPriority = currentTime;
      root2.callbackNode = suspendedLanes;
      return currentTime;
    }
    null !== pingedLanes && null !== pingedLanes && cancelCallback$1(pingedLanes);
    root2.callbackPriority = 2;
    root2.callbackNode = null;
    return 2;
  }
  function performWorkOnRootViaSchedulerTask(root2, didTimeout) {
    if (0 !== pendingEffectsStatus && 5 !== pendingEffectsStatus)
      return root2.callbackNode = null, root2.callbackPriority = 0, null;
    var originalCallbackNode = root2.callbackNode;
    if (flushPendingEffects() && root2.callbackNode !== originalCallbackNode)
      return null;
    var workInProgressRootRenderLanes$jscomp$0 = workInProgressRootRenderLanes;
    workInProgressRootRenderLanes$jscomp$0 = getNextLanes(
      root2,
      root2 === workInProgressRoot ? workInProgressRootRenderLanes$jscomp$0 : 0,
      null !== root2.cancelPendingCommit || -1 !== root2.timeoutHandle
    );
    if (0 === workInProgressRootRenderLanes$jscomp$0) return null;
    performWorkOnRoot(root2, workInProgressRootRenderLanes$jscomp$0, didTimeout);
    scheduleTaskForRootDuringMicrotask(root2, now());
    return null != root2.callbackNode && root2.callbackNode === originalCallbackNode ? performWorkOnRootViaSchedulerTask.bind(null, root2) : null;
  }
  function performSyncWorkOnRoot(root2, lanes) {
    if (flushPendingEffects()) return null;
    performWorkOnRoot(root2, lanes, true);
  }
  function scheduleImmediateRootScheduleTask() {
    scheduleMicrotask(function() {
      0 !== (executionContext & 6) ? scheduleCallback$3(
        ImmediatePriority,
        processRootScheduleInImmediateTask
      ) : processRootScheduleInMicrotask();
    });
  }
  function requestTransitionLane() {
    if (0 === currentEventTransitionLane) {
      var actionScopeLane = currentEntangledLane;
      0 === actionScopeLane && (actionScopeLane = nextTransitionUpdateLane, nextTransitionUpdateLane <<= 1, 0 === (nextTransitionUpdateLane & 261888) && (nextTransitionUpdateLane = 256));
      currentEventTransitionLane = actionScopeLane;
    }
    return currentEventTransitionLane;
  }
  function coerceFormActionProp(actionProp) {
    return null == actionProp || "symbol" === typeof actionProp || "boolean" === typeof actionProp ? null : "function" === typeof actionProp ? actionProp : sanitizeURL("" + actionProp);
  }
  function createFormDataWithSubmitter(form, submitter) {
    var temp = submitter.ownerDocument.createElement("input");
    temp.name = submitter.name;
    temp.value = submitter.value;
    form.id && temp.setAttribute("form", form.id);
    submitter.parentNode.insertBefore(temp, submitter);
    form = new FormData(form);
    temp.parentNode.removeChild(temp);
    return form;
  }
  function extractEvents$1(dispatchQueue, domEventName, maybeTargetInst, nativeEvent, nativeEventTarget) {
    if ("submit" === domEventName && maybeTargetInst && maybeTargetInst.stateNode === nativeEventTarget) {
      var action = coerceFormActionProp(
        (nativeEventTarget[internalPropsKey] || null).action
      ), submitter = nativeEvent.submitter;
      submitter && (domEventName = (domEventName = submitter[internalPropsKey] || null) ? coerceFormActionProp(domEventName.formAction) : submitter.getAttribute("formAction"), null !== domEventName && (action = domEventName, submitter = null));
      var event = new SyntheticEvent(
        "action",
        "action",
        null,
        nativeEvent,
        nativeEventTarget
      );
      dispatchQueue.push({
        event,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (nativeEvent.defaultPrevented) {
                if (0 !== currentEventTransitionLane) {
                  var formData = submitter ? createFormDataWithSubmitter(nativeEventTarget, submitter) : new FormData(nativeEventTarget);
                  startHostTransition(
                    maybeTargetInst,
                    {
                      pending: true,
                      data: formData,
                      method: nativeEventTarget.method,
                      action
                    },
                    null,
                    formData
                  );
                }
              } else
                "function" === typeof action && (event.preventDefault(), formData = submitter ? createFormDataWithSubmitter(nativeEventTarget, submitter) : new FormData(nativeEventTarget), startHostTransition(
                  maybeTargetInst,
                  {
                    pending: true,
                    data: formData,
                    method: nativeEventTarget.method,
                    action
                  },
                  action,
                  formData
                ));
            },
            currentTarget: nativeEventTarget
          }
        ]
      });
    }
  }
  for (var i$jscomp$inline_1577 = 0; i$jscomp$inline_1577 < simpleEventPluginEvents.length; i$jscomp$inline_1577++) {
    var eventName$jscomp$inline_1578 = simpleEventPluginEvents[i$jscomp$inline_1577], domEventName$jscomp$inline_1579 = eventName$jscomp$inline_1578.toLowerCase(), capitalizedEvent$jscomp$inline_1580 = eventName$jscomp$inline_1578[0].toUpperCase() + eventName$jscomp$inline_1578.slice(1);
    registerSimpleEvent(
      domEventName$jscomp$inline_1579,
      "on" + capitalizedEvent$jscomp$inline_1580
    );
  }
  registerSimpleEvent(ANIMATION_END, "onAnimationEnd");
  registerSimpleEvent(ANIMATION_ITERATION, "onAnimationIteration");
  registerSimpleEvent(ANIMATION_START, "onAnimationStart");
  registerSimpleEvent("dblclick", "onDoubleClick");
  registerSimpleEvent("focusin", "onFocus");
  registerSimpleEvent("focusout", "onBlur");
  registerSimpleEvent(TRANSITION_RUN, "onTransitionRun");
  registerSimpleEvent(TRANSITION_START, "onTransitionStart");
  registerSimpleEvent(TRANSITION_CANCEL, "onTransitionCancel");
  registerSimpleEvent(TRANSITION_END, "onTransitionEnd");
  registerDirectEvent("onMouseEnter", ["mouseout", "mouseover"]);
  registerDirectEvent("onMouseLeave", ["mouseout", "mouseover"]);
  registerDirectEvent("onPointerEnter", ["pointerout", "pointerover"]);
  registerDirectEvent("onPointerLeave", ["pointerout", "pointerover"]);
  registerTwoPhaseEvent(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  );
  registerTwoPhaseEvent(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  );
  registerTwoPhaseEvent("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]);
  registerTwoPhaseEvent(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  );
  registerTwoPhaseEvent(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  );
  registerTwoPhaseEvent(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var mediaEventTypes = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), nonDelegatedEvents = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(mediaEventTypes)
  );
  function processDispatchQueue(dispatchQueue, eventSystemFlags) {
    eventSystemFlags = 0 !== (eventSystemFlags & 4);
    for (var i = 0; i < dispatchQueue.length; i++) {
      var _dispatchQueue$i = dispatchQueue[i], event = _dispatchQueue$i.event;
      _dispatchQueue$i = _dispatchQueue$i.listeners;
      a: {
        var previousInstance = void 0;
        if (eventSystemFlags)
          for (var i$jscomp$0 = _dispatchQueue$i.length - 1; 0 <= i$jscomp$0; i$jscomp$0--) {
            var _dispatchListeners$i = _dispatchQueue$i[i$jscomp$0], instance = _dispatchListeners$i.instance, currentTarget = _dispatchListeners$i.currentTarget;
            _dispatchListeners$i = _dispatchListeners$i.listener;
            if (instance !== previousInstance && event.isPropagationStopped())
              break a;
            previousInstance = _dispatchListeners$i;
            event.currentTarget = currentTarget;
            try {
              previousInstance(event);
            } catch (error) {
              reportGlobalError(error);
            }
            event.currentTarget = null;
            previousInstance = instance;
          }
        else
          for (i$jscomp$0 = 0; i$jscomp$0 < _dispatchQueue$i.length; i$jscomp$0++) {
            _dispatchListeners$i = _dispatchQueue$i[i$jscomp$0];
            instance = _dispatchListeners$i.instance;
            currentTarget = _dispatchListeners$i.currentTarget;
            _dispatchListeners$i = _dispatchListeners$i.listener;
            if (instance !== previousInstance && event.isPropagationStopped())
              break a;
            previousInstance = _dispatchListeners$i;
            event.currentTarget = currentTarget;
            try {
              previousInstance(event);
            } catch (error) {
              reportGlobalError(error);
            }
            event.currentTarget = null;
            previousInstance = instance;
          }
      }
    }
  }
  function listenToNonDelegatedEvent(domEventName, targetElement) {
    var JSCompiler_inline_result = targetElement[internalEventHandlersKey];
    void 0 === JSCompiler_inline_result && (JSCompiler_inline_result = targetElement[internalEventHandlersKey] = /* @__PURE__ */ new Set());
    var listenerSetKey = domEventName + "__bubble";
    JSCompiler_inline_result.has(listenerSetKey) || (addTrappedEventListener(targetElement, domEventName, 2, false), JSCompiler_inline_result.add(listenerSetKey));
  }
  function listenToNativeEvent(domEventName, isCapturePhaseListener, target) {
    var eventSystemFlags = 0;
    isCapturePhaseListener && (eventSystemFlags |= 4);
    addTrappedEventListener(
      target,
      domEventName,
      eventSystemFlags,
      isCapturePhaseListener
    );
  }
  var listeningMarker = "_reactListening" + Math.random().toString(36).slice(2);
  function listenToAllSupportedEvents(rootContainerElement) {
    if (!rootContainerElement[listeningMarker]) {
      rootContainerElement[listeningMarker] = true;
      allNativeEvents.forEach(function(domEventName) {
        "selectionchange" !== domEventName && (nonDelegatedEvents.has(domEventName) || listenToNativeEvent(domEventName, false, rootContainerElement), listenToNativeEvent(domEventName, true, rootContainerElement));
      });
      var ownerDocument = 9 === rootContainerElement.nodeType ? rootContainerElement : rootContainerElement.ownerDocument;
      null === ownerDocument || ownerDocument[listeningMarker] || (ownerDocument[listeningMarker] = true, listenToNativeEvent("selectionchange", false, ownerDocument));
    }
  }
  function addTrappedEventListener(targetContainer, domEventName, eventSystemFlags, isCapturePhaseListener) {
    switch (getEventPriority(domEventName)) {
      case 2:
        var listenerWrapper = dispatchDiscreteEvent;
        break;
      case 8:
        listenerWrapper = dispatchContinuousEvent;
        break;
      default:
        listenerWrapper = dispatchEvent;
    }
    eventSystemFlags = listenerWrapper.bind(
      null,
      domEventName,
      eventSystemFlags,
      targetContainer
    );
    listenerWrapper = void 0;
    !passiveBrowserEventsSupported || "touchstart" !== domEventName && "touchmove" !== domEventName && "wheel" !== domEventName || (listenerWrapper = true);
    isCapturePhaseListener ? void 0 !== listenerWrapper ? targetContainer.addEventListener(domEventName, eventSystemFlags, {
      capture: true,
      passive: listenerWrapper
    }) : targetContainer.addEventListener(domEventName, eventSystemFlags, true) : void 0 !== listenerWrapper ? targetContainer.addEventListener(domEventName, eventSystemFlags, {
      passive: listenerWrapper
    }) : targetContainer.addEventListener(domEventName, eventSystemFlags, false);
  }
  function dispatchEventForPluginEventSystem(domEventName, eventSystemFlags, nativeEvent, targetInst$jscomp$0, targetContainer) {
    var ancestorInst = targetInst$jscomp$0;
    if (0 === (eventSystemFlags & 1) && 0 === (eventSystemFlags & 2) && null !== targetInst$jscomp$0)
      a: for (; ; ) {
        if (null === targetInst$jscomp$0) return;
        var nodeTag = targetInst$jscomp$0.tag;
        if (3 === nodeTag || 4 === nodeTag) {
          var container = targetInst$jscomp$0.stateNode.containerInfo;
          if (container === targetContainer) break;
          if (4 === nodeTag)
            for (nodeTag = targetInst$jscomp$0.return; null !== nodeTag; ) {
              var grandTag = nodeTag.tag;
              if ((3 === grandTag || 4 === grandTag) && nodeTag.stateNode.containerInfo === targetContainer)
                return;
              nodeTag = nodeTag.return;
            }
          for (; null !== container; ) {
            nodeTag = getClosestInstanceFromNode(container);
            if (null === nodeTag) return;
            grandTag = nodeTag.tag;
            if (5 === grandTag || 6 === grandTag || 26 === grandTag || 27 === grandTag) {
              targetInst$jscomp$0 = ancestorInst = nodeTag;
              continue a;
            }
            container = container.parentNode;
          }
        }
        targetInst$jscomp$0 = targetInst$jscomp$0.return;
      }
    batchedUpdates$1(function() {
      var targetInst = ancestorInst, nativeEventTarget = getEventTarget(nativeEvent), dispatchQueue = [];
      a: {
        var reactName = topLevelEventsToReactNames.get(domEventName);
        if (void 0 !== reactName) {
          var SyntheticEventCtor = SyntheticEvent, reactEventType = domEventName;
          switch (domEventName) {
            case "keypress":
              if (0 === getEventCharCode(nativeEvent)) break a;
            case "keydown":
            case "keyup":
              SyntheticEventCtor = SyntheticKeyboardEvent;
              break;
            case "focusin":
              reactEventType = "focus";
              SyntheticEventCtor = SyntheticFocusEvent;
              break;
            case "focusout":
              reactEventType = "blur";
              SyntheticEventCtor = SyntheticFocusEvent;
              break;
            case "beforeblur":
            case "afterblur":
              SyntheticEventCtor = SyntheticFocusEvent;
              break;
            case "click":
              if (2 === nativeEvent.button) break a;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              SyntheticEventCtor = SyntheticMouseEvent;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              SyntheticEventCtor = SyntheticDragEvent;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              SyntheticEventCtor = SyntheticTouchEvent;
              break;
            case ANIMATION_END:
            case ANIMATION_ITERATION:
            case ANIMATION_START:
              SyntheticEventCtor = SyntheticAnimationEvent;
              break;
            case TRANSITION_END:
              SyntheticEventCtor = SyntheticTransitionEvent;
              break;
            case "scroll":
            case "scrollend":
              SyntheticEventCtor = SyntheticUIEvent;
              break;
            case "wheel":
              SyntheticEventCtor = SyntheticWheelEvent;
              break;
            case "copy":
            case "cut":
            case "paste":
              SyntheticEventCtor = SyntheticClipboardEvent;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              SyntheticEventCtor = SyntheticPointerEvent;
              break;
            case "toggle":
            case "beforetoggle":
              SyntheticEventCtor = SyntheticToggleEvent;
          }
          var inCapturePhase = 0 !== (eventSystemFlags & 4), accumulateTargetOnly = !inCapturePhase && ("scroll" === domEventName || "scrollend" === domEventName), reactEventName = inCapturePhase ? null !== reactName ? reactName + "Capture" : null : reactName;
          inCapturePhase = [];
          for (var instance = targetInst, lastHostComponent; null !== instance; ) {
            var _instance = instance;
            lastHostComponent = _instance.stateNode;
            _instance = _instance.tag;
            5 !== _instance && 26 !== _instance && 27 !== _instance || null === lastHostComponent || null === reactEventName || (_instance = getListener(instance, reactEventName), null != _instance && inCapturePhase.push(
              createDispatchListener(instance, _instance, lastHostComponent)
            ));
            if (accumulateTargetOnly) break;
            instance = instance.return;
          }
          0 < inCapturePhase.length && (reactName = new SyntheticEventCtor(
            reactName,
            reactEventType,
            null,
            nativeEvent,
            nativeEventTarget
          ), dispatchQueue.push({ event: reactName, listeners: inCapturePhase }));
        }
      }
      if (0 === (eventSystemFlags & 7)) {
        a: {
          reactName = "mouseover" === domEventName || "pointerover" === domEventName;
          SyntheticEventCtor = "mouseout" === domEventName || "pointerout" === domEventName;
          if (reactName && nativeEvent !== currentReplayingEvent && (reactEventType = nativeEvent.relatedTarget || nativeEvent.fromElement) && (getClosestInstanceFromNode(reactEventType) || reactEventType[internalContainerInstanceKey]))
            break a;
          if (SyntheticEventCtor || reactName) {
            reactName = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget : (reactName = nativeEventTarget.ownerDocument) ? reactName.defaultView || reactName.parentWindow : window;
            if (SyntheticEventCtor) {
              if (reactEventType = nativeEvent.relatedTarget || nativeEvent.toElement, SyntheticEventCtor = targetInst, reactEventType = reactEventType ? getClosestInstanceFromNode(reactEventType) : null, null !== reactEventType && (accumulateTargetOnly = getNearestMountedFiber(reactEventType), inCapturePhase = reactEventType.tag, reactEventType !== accumulateTargetOnly || 5 !== inCapturePhase && 27 !== inCapturePhase && 6 !== inCapturePhase))
                reactEventType = null;
            } else SyntheticEventCtor = null, reactEventType = targetInst;
            if (SyntheticEventCtor !== reactEventType) {
              inCapturePhase = SyntheticMouseEvent;
              _instance = "onMouseLeave";
              reactEventName = "onMouseEnter";
              instance = "mouse";
              if ("pointerout" === domEventName || "pointerover" === domEventName)
                inCapturePhase = SyntheticPointerEvent, _instance = "onPointerLeave", reactEventName = "onPointerEnter", instance = "pointer";
              accumulateTargetOnly = null == SyntheticEventCtor ? reactName : getNodeFromInstance(SyntheticEventCtor);
              lastHostComponent = null == reactEventType ? reactName : getNodeFromInstance(reactEventType);
              reactName = new inCapturePhase(
                _instance,
                instance + "leave",
                SyntheticEventCtor,
                nativeEvent,
                nativeEventTarget
              );
              reactName.target = accumulateTargetOnly;
              reactName.relatedTarget = lastHostComponent;
              _instance = null;
              getClosestInstanceFromNode(nativeEventTarget) === targetInst && (inCapturePhase = new inCapturePhase(
                reactEventName,
                instance + "enter",
                reactEventType,
                nativeEvent,
                nativeEventTarget
              ), inCapturePhase.target = lastHostComponent, inCapturePhase.relatedTarget = accumulateTargetOnly, _instance = inCapturePhase);
              accumulateTargetOnly = _instance;
              if (SyntheticEventCtor && reactEventType)
                b: {
                  inCapturePhase = getParent;
                  reactEventName = SyntheticEventCtor;
                  instance = reactEventType;
                  lastHostComponent = 0;
                  for (_instance = reactEventName; _instance; _instance = inCapturePhase(_instance))
                    lastHostComponent++;
                  _instance = 0;
                  for (var tempB = instance; tempB; tempB = inCapturePhase(tempB))
                    _instance++;
                  for (; 0 < lastHostComponent - _instance; )
                    reactEventName = inCapturePhase(reactEventName), lastHostComponent--;
                  for (; 0 < _instance - lastHostComponent; )
                    instance = inCapturePhase(instance), _instance--;
                  for (; lastHostComponent--; ) {
                    if (reactEventName === instance || null !== instance && reactEventName === instance.alternate) {
                      inCapturePhase = reactEventName;
                      break b;
                    }
                    reactEventName = inCapturePhase(reactEventName);
                    instance = inCapturePhase(instance);
                  }
                  inCapturePhase = null;
                }
              else inCapturePhase = null;
              null !== SyntheticEventCtor && accumulateEnterLeaveListenersForEvent(
                dispatchQueue,
                reactName,
                SyntheticEventCtor,
                inCapturePhase,
                false
              );
              null !== reactEventType && null !== accumulateTargetOnly && accumulateEnterLeaveListenersForEvent(
                dispatchQueue,
                accumulateTargetOnly,
                reactEventType,
                inCapturePhase,
                true
              );
            }
          }
        }
        a: {
          reactName = targetInst ? getNodeFromInstance(targetInst) : window;
          SyntheticEventCtor = reactName.nodeName && reactName.nodeName.toLowerCase();
          if ("select" === SyntheticEventCtor || "input" === SyntheticEventCtor && "file" === reactName.type)
            var getTargetInstFunc = getTargetInstForChangeEvent;
          else if (isTextInputElement(reactName))
            if (isInputEventSupported)
              getTargetInstFunc = getTargetInstForInputOrChangeEvent;
            else {
              getTargetInstFunc = getTargetInstForInputEventPolyfill;
              var handleEventFunc = handleEventsForInputEventPolyfill;
            }
          else
            SyntheticEventCtor = reactName.nodeName, !SyntheticEventCtor || "input" !== SyntheticEventCtor.toLowerCase() || "checkbox" !== reactName.type && "radio" !== reactName.type ? targetInst && isCustomElement(targetInst.elementType) && (getTargetInstFunc = getTargetInstForChangeEvent) : getTargetInstFunc = getTargetInstForClickEvent;
          if (getTargetInstFunc && (getTargetInstFunc = getTargetInstFunc(domEventName, targetInst))) {
            createAndAccumulateChangeEvent(
              dispatchQueue,
              getTargetInstFunc,
              nativeEvent,
              nativeEventTarget
            );
            break a;
          }
          handleEventFunc && handleEventFunc(domEventName, reactName, targetInst);
          "focusout" === domEventName && targetInst && "number" === reactName.type && null != targetInst.memoizedProps.value && setDefaultValue(reactName, "number", reactName.value);
        }
        handleEventFunc = targetInst ? getNodeFromInstance(targetInst) : window;
        switch (domEventName) {
          case "focusin":
            if (isTextInputElement(handleEventFunc) || "true" === handleEventFunc.contentEditable)
              activeElement = handleEventFunc, activeElementInst = targetInst, lastSelection = null;
            break;
          case "focusout":
            lastSelection = activeElementInst = activeElement = null;
            break;
          case "mousedown":
            mouseDown = true;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            mouseDown = false;
            constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget);
            break;
          case "selectionchange":
            if (skipSelectionChangeEvent) break;
          case "keydown":
          case "keyup":
            constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget);
        }
        var fallbackData;
        if (canUseCompositionEvent)
          b: {
            switch (domEventName) {
              case "compositionstart":
                var eventType = "onCompositionStart";
                break b;
              case "compositionend":
                eventType = "onCompositionEnd";
                break b;
              case "compositionupdate":
                eventType = "onCompositionUpdate";
                break b;
            }
            eventType = void 0;
          }
        else
          isComposing ? isFallbackCompositionEnd(domEventName, nativeEvent) && (eventType = "onCompositionEnd") : "keydown" === domEventName && 229 === nativeEvent.keyCode && (eventType = "onCompositionStart");
        eventType && (useFallbackCompositionData && "ko" !== nativeEvent.locale && (isComposing || "onCompositionStart" !== eventType ? "onCompositionEnd" === eventType && isComposing && (fallbackData = getData()) : (root = nativeEventTarget, startText = "value" in root ? root.value : root.textContent, isComposing = true)), handleEventFunc = accumulateTwoPhaseListeners(targetInst, eventType), 0 < handleEventFunc.length && (eventType = new SyntheticCompositionEvent(
          eventType,
          domEventName,
          null,
          nativeEvent,
          nativeEventTarget
        ), dispatchQueue.push({ event: eventType, listeners: handleEventFunc }), fallbackData ? eventType.data = fallbackData : (fallbackData = getDataFromCustomEvent(nativeEvent), null !== fallbackData && (eventType.data = fallbackData))));
        if (fallbackData = canUseTextInputEvent ? getNativeBeforeInputChars(domEventName, nativeEvent) : getFallbackBeforeInputChars(domEventName, nativeEvent))
          eventType = accumulateTwoPhaseListeners(targetInst, "onBeforeInput"), 0 < eventType.length && (handleEventFunc = new SyntheticCompositionEvent(
            "onBeforeInput",
            "beforeinput",
            null,
            nativeEvent,
            nativeEventTarget
          ), dispatchQueue.push({
            event: handleEventFunc,
            listeners: eventType
          }), handleEventFunc.data = fallbackData);
        extractEvents$1(
          dispatchQueue,
          domEventName,
          targetInst,
          nativeEvent,
          nativeEventTarget
        );
      }
      processDispatchQueue(dispatchQueue, eventSystemFlags);
    });
  }
  function createDispatchListener(instance, listener, currentTarget) {
    return {
      instance,
      listener,
      currentTarget
    };
  }
  function accumulateTwoPhaseListeners(targetFiber, reactName) {
    for (var captureName = reactName + "Capture", listeners = []; null !== targetFiber; ) {
      var _instance2 = targetFiber, stateNode = _instance2.stateNode;
      _instance2 = _instance2.tag;
      5 !== _instance2 && 26 !== _instance2 && 27 !== _instance2 || null === stateNode || (_instance2 = getListener(targetFiber, captureName), null != _instance2 && listeners.unshift(
        createDispatchListener(targetFiber, _instance2, stateNode)
      ), _instance2 = getListener(targetFiber, reactName), null != _instance2 && listeners.push(
        createDispatchListener(targetFiber, _instance2, stateNode)
      ));
      if (3 === targetFiber.tag) return listeners;
      targetFiber = targetFiber.return;
    }
    return [];
  }
  function getParent(inst) {
    if (null === inst) return null;
    do
      inst = inst.return;
    while (inst && 5 !== inst.tag && 27 !== inst.tag);
    return inst ? inst : null;
  }
  function accumulateEnterLeaveListenersForEvent(dispatchQueue, event, target, common, inCapturePhase) {
    for (var registrationName = event._reactName, listeners = []; null !== target && target !== common; ) {
      var _instance3 = target, alternate = _instance3.alternate, stateNode = _instance3.stateNode;
      _instance3 = _instance3.tag;
      if (null !== alternate && alternate === common) break;
      5 !== _instance3 && 26 !== _instance3 && 27 !== _instance3 || null === stateNode || (alternate = stateNode, inCapturePhase ? (stateNode = getListener(target, registrationName), null != stateNode && listeners.unshift(
        createDispatchListener(target, stateNode, alternate)
      )) : inCapturePhase || (stateNode = getListener(target, registrationName), null != stateNode && listeners.push(
        createDispatchListener(target, stateNode, alternate)
      )));
      target = target.return;
    }
    0 !== listeners.length && dispatchQueue.push({ event, listeners });
  }
  var NORMALIZE_NEWLINES_REGEX = /\r\n?/g, NORMALIZE_NULL_AND_REPLACEMENT_REGEX = /\u0000|\uFFFD/g;
  function normalizeMarkupForTextOrAttribute(markup) {
    return ("string" === typeof markup ? markup : "" + markup).replace(NORMALIZE_NEWLINES_REGEX, "\n").replace(NORMALIZE_NULL_AND_REPLACEMENT_REGEX, "");
  }
  function checkForUnmatchedText(serverText, clientText) {
    clientText = normalizeMarkupForTextOrAttribute(clientText);
    return normalizeMarkupForTextOrAttribute(serverText) === clientText ? true : false;
  }
  function setProp(domElement, tag, key, value, props, prevValue) {
    switch (key) {
      case "children":
        "string" === typeof value ? "body" === tag || "textarea" === tag && "" === value || setTextContent(domElement, value) : ("number" === typeof value || "bigint" === typeof value) && "body" !== tag && setTextContent(domElement, "" + value);
        break;
      case "className":
        setValueForKnownAttribute(domElement, "class", value);
        break;
      case "tabIndex":
        setValueForKnownAttribute(domElement, "tabindex", value);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        setValueForKnownAttribute(domElement, key, value);
        break;
      case "style":
        setValueForStyles(domElement, value, prevValue);
        break;
      case "data":
        if ("object" !== tag) {
          setValueForKnownAttribute(domElement, "data", value);
          break;
        }
      case "src":
      case "href":
        if ("" === value && ("a" !== tag || "href" !== key)) {
          domElement.removeAttribute(key);
          break;
        }
        if (null == value || "function" === typeof value || "symbol" === typeof value || "boolean" === typeof value) {
          domElement.removeAttribute(key);
          break;
        }
        value = sanitizeURL("" + value);
        domElement.setAttribute(key, value);
        break;
      case "action":
      case "formAction":
        if ("function" === typeof value) {
          domElement.setAttribute(
            key,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          "function" === typeof prevValue && ("formAction" === key ? ("input" !== tag && setProp(domElement, tag, "name", props.name, props, null), setProp(
            domElement,
            tag,
            "formEncType",
            props.formEncType,
            props,
            null
          ), setProp(
            domElement,
            tag,
            "formMethod",
            props.formMethod,
            props,
            null
          ), setProp(
            domElement,
            tag,
            "formTarget",
            props.formTarget,
            props,
            null
          )) : (setProp(domElement, tag, "encType", props.encType, props, null), setProp(domElement, tag, "method", props.method, props, null), setProp(domElement, tag, "target", props.target, props, null)));
        if (null == value || "symbol" === typeof value || "boolean" === typeof value) {
          domElement.removeAttribute(key);
          break;
        }
        value = sanitizeURL("" + value);
        domElement.setAttribute(key, value);
        break;
      case "onClick":
        null != value && (domElement.onclick = noop$1);
        break;
      case "onScroll":
        null != value && listenToNonDelegatedEvent("scroll", domElement);
        break;
      case "onScrollEnd":
        null != value && listenToNonDelegatedEvent("scrollend", domElement);
        break;
      case "dangerouslySetInnerHTML":
        if (null != value) {
          if ("object" !== typeof value || !("__html" in value))
            throw Error(formatProdErrorMessage(61));
          key = value.__html;
          if (null != key) {
            if (null != props.children) throw Error(formatProdErrorMessage(60));
            domElement.innerHTML = key;
          }
        }
        break;
      case "multiple":
        domElement.multiple = value && "function" !== typeof value && "symbol" !== typeof value;
        break;
      case "muted":
        domElement.muted = value && "function" !== typeof value && "symbol" !== typeof value;
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (null == value || "function" === typeof value || "boolean" === typeof value || "symbol" === typeof value) {
          domElement.removeAttribute("xlink:href");
          break;
        }
        key = sanitizeURL("" + value);
        domElement.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          key
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        null != value && "function" !== typeof value && "symbol" !== typeof value ? domElement.setAttribute(key, "" + value) : domElement.removeAttribute(key);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        value && "function" !== typeof value && "symbol" !== typeof value ? domElement.setAttribute(key, "") : domElement.removeAttribute(key);
        break;
      case "capture":
      case "download":
        true === value ? domElement.setAttribute(key, "") : false !== value && null != value && "function" !== typeof value && "symbol" !== typeof value ? domElement.setAttribute(key, value) : domElement.removeAttribute(key);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        null != value && "function" !== typeof value && "symbol" !== typeof value && !isNaN(value) && 1 <= value ? domElement.setAttribute(key, value) : domElement.removeAttribute(key);
        break;
      case "rowSpan":
      case "start":
        null == value || "function" === typeof value || "symbol" === typeof value || isNaN(value) ? domElement.removeAttribute(key) : domElement.setAttribute(key, value);
        break;
      case "popover":
        listenToNonDelegatedEvent("beforetoggle", domElement);
        listenToNonDelegatedEvent("toggle", domElement);
        setValueForAttribute(domElement, "popover", value);
        break;
      case "xlinkActuate":
        setValueForNamespacedAttribute(
          domElement,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          value
        );
        break;
      case "xlinkArcrole":
        setValueForNamespacedAttribute(
          domElement,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          value
        );
        break;
      case "xlinkRole":
        setValueForNamespacedAttribute(
          domElement,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          value
        );
        break;
      case "xlinkShow":
        setValueForNamespacedAttribute(
          domElement,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          value
        );
        break;
      case "xlinkTitle":
        setValueForNamespacedAttribute(
          domElement,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          value
        );
        break;
      case "xlinkType":
        setValueForNamespacedAttribute(
          domElement,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          value
        );
        break;
      case "xmlBase":
        setValueForNamespacedAttribute(
          domElement,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          value
        );
        break;
      case "xmlLang":
        setValueForNamespacedAttribute(
          domElement,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          value
        );
        break;
      case "xmlSpace":
        setValueForNamespacedAttribute(
          domElement,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          value
        );
        break;
      case "is":
        setValueForAttribute(domElement, "is", value);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!(2 < key.length) || "o" !== key[0] && "O" !== key[0] || "n" !== key[1] && "N" !== key[1])
          key = aliases.get(key) || key, setValueForAttribute(domElement, key, value);
    }
  }
  function setPropOnCustomElement(domElement, tag, key, value, props, prevValue) {
    switch (key) {
      case "style":
        setValueForStyles(domElement, value, prevValue);
        break;
      case "dangerouslySetInnerHTML":
        if (null != value) {
          if ("object" !== typeof value || !("__html" in value))
            throw Error(formatProdErrorMessage(61));
          key = value.__html;
          if (null != key) {
            if (null != props.children) throw Error(formatProdErrorMessage(60));
            domElement.innerHTML = key;
          }
        }
        break;
      case "children":
        "string" === typeof value ? setTextContent(domElement, value) : ("number" === typeof value || "bigint" === typeof value) && setTextContent(domElement, "" + value);
        break;
      case "onScroll":
        null != value && listenToNonDelegatedEvent("scroll", domElement);
        break;
      case "onScrollEnd":
        null != value && listenToNonDelegatedEvent("scrollend", domElement);
        break;
      case "onClick":
        null != value && (domElement.onclick = noop$1);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!registrationNameDependencies.hasOwnProperty(key))
          a: {
            if ("o" === key[0] && "n" === key[1] && (props = key.endsWith("Capture"), tag = key.slice(2, props ? key.length - 7 : void 0), prevValue = domElement[internalPropsKey] || null, prevValue = null != prevValue ? prevValue[key] : null, "function" === typeof prevValue && domElement.removeEventListener(tag, prevValue, props), "function" === typeof value)) {
              "function" !== typeof prevValue && null !== prevValue && (key in domElement ? domElement[key] = null : domElement.hasAttribute(key) && domElement.removeAttribute(key));
              domElement.addEventListener(tag, value, props);
              break a;
            }
            key in domElement ? domElement[key] = value : true === value ? domElement.setAttribute(key, "") : setValueForAttribute(domElement, key, value);
          }
    }
  }
  function setInitialProperties(domElement, tag, props) {
    switch (tag) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        listenToNonDelegatedEvent("error", domElement);
        listenToNonDelegatedEvent("load", domElement);
        var hasSrc = false, hasSrcSet = false, propKey;
        for (propKey in props)
          if (props.hasOwnProperty(propKey)) {
            var propValue = props[propKey];
            if (null != propValue)
              switch (propKey) {
                case "src":
                  hasSrc = true;
                  break;
                case "srcSet":
                  hasSrcSet = true;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(formatProdErrorMessage(137, tag));
                default:
                  setProp(domElement, tag, propKey, propValue, props, null);
              }
          }
        hasSrcSet && setProp(domElement, tag, "srcSet", props.srcSet, props, null);
        hasSrc && setProp(domElement, tag, "src", props.src, props, null);
        return;
      case "input":
        listenToNonDelegatedEvent("invalid", domElement);
        var defaultValue = propKey = propValue = hasSrcSet = null, checked = null, defaultChecked = null;
        for (hasSrc in props)
          if (props.hasOwnProperty(hasSrc)) {
            var propValue$184 = props[hasSrc];
            if (null != propValue$184)
              switch (hasSrc) {
                case "name":
                  hasSrcSet = propValue$184;
                  break;
                case "type":
                  propValue = propValue$184;
                  break;
                case "checked":
                  checked = propValue$184;
                  break;
                case "defaultChecked":
                  defaultChecked = propValue$184;
                  break;
                case "value":
                  propKey = propValue$184;
                  break;
                case "defaultValue":
                  defaultValue = propValue$184;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (null != propValue$184)
                    throw Error(formatProdErrorMessage(137, tag));
                  break;
                default:
                  setProp(domElement, tag, hasSrc, propValue$184, props, null);
              }
          }
        initInput(
          domElement,
          propKey,
          defaultValue,
          checked,
          defaultChecked,
          propValue,
          hasSrcSet,
          false
        );
        return;
      case "select":
        listenToNonDelegatedEvent("invalid", domElement);
        hasSrc = propValue = propKey = null;
        for (hasSrcSet in props)
          if (props.hasOwnProperty(hasSrcSet) && (defaultValue = props[hasSrcSet], null != defaultValue))
            switch (hasSrcSet) {
              case "value":
                propKey = defaultValue;
                break;
              case "defaultValue":
                propValue = defaultValue;
                break;
              case "multiple":
                hasSrc = defaultValue;
              default:
                setProp(domElement, tag, hasSrcSet, defaultValue, props, null);
            }
        tag = propKey;
        props = propValue;
        domElement.multiple = !!hasSrc;
        null != tag ? updateOptions(domElement, !!hasSrc, tag, false) : null != props && updateOptions(domElement, !!hasSrc, props, true);
        return;
      case "textarea":
        listenToNonDelegatedEvent("invalid", domElement);
        propKey = hasSrcSet = hasSrc = null;
        for (propValue in props)
          if (props.hasOwnProperty(propValue) && (defaultValue = props[propValue], null != defaultValue))
            switch (propValue) {
              case "value":
                hasSrc = defaultValue;
                break;
              case "defaultValue":
                hasSrcSet = defaultValue;
                break;
              case "children":
                propKey = defaultValue;
                break;
              case "dangerouslySetInnerHTML":
                if (null != defaultValue) throw Error(formatProdErrorMessage(91));
                break;
              default:
                setProp(domElement, tag, propValue, defaultValue, props, null);
            }
        initTextarea(domElement, hasSrc, hasSrcSet, propKey);
        return;
      case "option":
        for (checked in props)
          if (props.hasOwnProperty(checked) && (hasSrc = props[checked], null != hasSrc))
            switch (checked) {
              case "selected":
                domElement.selected = hasSrc && "function" !== typeof hasSrc && "symbol" !== typeof hasSrc;
                break;
              default:
                setProp(domElement, tag, checked, hasSrc, props, null);
            }
        return;
      case "dialog":
        listenToNonDelegatedEvent("beforetoggle", domElement);
        listenToNonDelegatedEvent("toggle", domElement);
        listenToNonDelegatedEvent("cancel", domElement);
        listenToNonDelegatedEvent("close", domElement);
        break;
      case "iframe":
      case "object":
        listenToNonDelegatedEvent("load", domElement);
        break;
      case "video":
      case "audio":
        for (hasSrc = 0; hasSrc < mediaEventTypes.length; hasSrc++)
          listenToNonDelegatedEvent(mediaEventTypes[hasSrc], domElement);
        break;
      case "image":
        listenToNonDelegatedEvent("error", domElement);
        listenToNonDelegatedEvent("load", domElement);
        break;
      case "details":
        listenToNonDelegatedEvent("toggle", domElement);
        break;
      case "embed":
      case "source":
      case "link":
        listenToNonDelegatedEvent("error", domElement), listenToNonDelegatedEvent("load", domElement);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (defaultChecked in props)
          if (props.hasOwnProperty(defaultChecked) && (hasSrc = props[defaultChecked], null != hasSrc))
            switch (defaultChecked) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(formatProdErrorMessage(137, tag));
              default:
                setProp(domElement, tag, defaultChecked, hasSrc, props, null);
            }
        return;
      default:
        if (isCustomElement(tag)) {
          for (propValue$184 in props)
            props.hasOwnProperty(propValue$184) && (hasSrc = props[propValue$184], void 0 !== hasSrc && setPropOnCustomElement(
              domElement,
              tag,
              propValue$184,
              hasSrc,
              props,
              void 0
            ));
          return;
        }
    }
    for (defaultValue in props)
      props.hasOwnProperty(defaultValue) && (hasSrc = props[defaultValue], null != hasSrc && setProp(domElement, tag, defaultValue, hasSrc, props, null));
  }
  function updateProperties(domElement, tag, lastProps, nextProps) {
    switch (tag) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var name = null, type = null, value = null, defaultValue = null, lastDefaultValue = null, checked = null, defaultChecked = null;
        for (propKey in lastProps) {
          var lastProp = lastProps[propKey];
          if (lastProps.hasOwnProperty(propKey) && null != lastProp)
            switch (propKey) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                lastDefaultValue = lastProp;
              default:
                nextProps.hasOwnProperty(propKey) || setProp(domElement, tag, propKey, null, nextProps, lastProp);
            }
        }
        for (var propKey$201 in nextProps) {
          var propKey = nextProps[propKey$201];
          lastProp = lastProps[propKey$201];
          if (nextProps.hasOwnProperty(propKey$201) && (null != propKey || null != lastProp))
            switch (propKey$201) {
              case "type":
                type = propKey;
                break;
              case "name":
                name = propKey;
                break;
              case "checked":
                checked = propKey;
                break;
              case "defaultChecked":
                defaultChecked = propKey;
                break;
              case "value":
                value = propKey;
                break;
              case "defaultValue":
                defaultValue = propKey;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (null != propKey)
                  throw Error(formatProdErrorMessage(137, tag));
                break;
              default:
                propKey !== lastProp && setProp(
                  domElement,
                  tag,
                  propKey$201,
                  propKey,
                  nextProps,
                  lastProp
                );
            }
        }
        updateInput(
          domElement,
          value,
          defaultValue,
          lastDefaultValue,
          checked,
          defaultChecked,
          type,
          name
        );
        return;
      case "select":
        propKey = value = defaultValue = propKey$201 = null;
        for (type in lastProps)
          if (lastDefaultValue = lastProps[type], lastProps.hasOwnProperty(type) && null != lastDefaultValue)
            switch (type) {
              case "value":
                break;
              case "multiple":
                propKey = lastDefaultValue;
              default:
                nextProps.hasOwnProperty(type) || setProp(
                  domElement,
                  tag,
                  type,
                  null,
                  nextProps,
                  lastDefaultValue
                );
            }
        for (name in nextProps)
          if (type = nextProps[name], lastDefaultValue = lastProps[name], nextProps.hasOwnProperty(name) && (null != type || null != lastDefaultValue))
            switch (name) {
              case "value":
                propKey$201 = type;
                break;
              case "defaultValue":
                defaultValue = type;
                break;
              case "multiple":
                value = type;
              default:
                type !== lastDefaultValue && setProp(
                  domElement,
                  tag,
                  name,
                  type,
                  nextProps,
                  lastDefaultValue
                );
            }
        tag = defaultValue;
        lastProps = value;
        nextProps = propKey;
        null != propKey$201 ? updateOptions(domElement, !!lastProps, propKey$201, false) : !!nextProps !== !!lastProps && (null != tag ? updateOptions(domElement, !!lastProps, tag, true) : updateOptions(domElement, !!lastProps, lastProps ? [] : "", false));
        return;
      case "textarea":
        propKey = propKey$201 = null;
        for (defaultValue in lastProps)
          if (name = lastProps[defaultValue], lastProps.hasOwnProperty(defaultValue) && null != name && !nextProps.hasOwnProperty(defaultValue))
            switch (defaultValue) {
              case "value":
                break;
              case "children":
                break;
              default:
                setProp(domElement, tag, defaultValue, null, nextProps, name);
            }
        for (value in nextProps)
          if (name = nextProps[value], type = lastProps[value], nextProps.hasOwnProperty(value) && (null != name || null != type))
            switch (value) {
              case "value":
                propKey$201 = name;
                break;
              case "defaultValue":
                propKey = name;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (null != name) throw Error(formatProdErrorMessage(91));
                break;
              default:
                name !== type && setProp(domElement, tag, value, name, nextProps, type);
            }
        updateTextarea(domElement, propKey$201, propKey);
        return;
      case "option":
        for (var propKey$217 in lastProps)
          if (propKey$201 = lastProps[propKey$217], lastProps.hasOwnProperty(propKey$217) && null != propKey$201 && !nextProps.hasOwnProperty(propKey$217))
            switch (propKey$217) {
              case "selected":
                domElement.selected = false;
                break;
              default:
                setProp(
                  domElement,
                  tag,
                  propKey$217,
                  null,
                  nextProps,
                  propKey$201
                );
            }
        for (lastDefaultValue in nextProps)
          if (propKey$201 = nextProps[lastDefaultValue], propKey = lastProps[lastDefaultValue], nextProps.hasOwnProperty(lastDefaultValue) && propKey$201 !== propKey && (null != propKey$201 || null != propKey))
            switch (lastDefaultValue) {
              case "selected":
                domElement.selected = propKey$201 && "function" !== typeof propKey$201 && "symbol" !== typeof propKey$201;
                break;
              default:
                setProp(
                  domElement,
                  tag,
                  lastDefaultValue,
                  propKey$201,
                  nextProps,
                  propKey
                );
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var propKey$222 in lastProps)
          propKey$201 = lastProps[propKey$222], lastProps.hasOwnProperty(propKey$222) && null != propKey$201 && !nextProps.hasOwnProperty(propKey$222) && setProp(domElement, tag, propKey$222, null, nextProps, propKey$201);
        for (checked in nextProps)
          if (propKey$201 = nextProps[checked], propKey = lastProps[checked], nextProps.hasOwnProperty(checked) && propKey$201 !== propKey && (null != propKey$201 || null != propKey))
            switch (checked) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (null != propKey$201)
                  throw Error(formatProdErrorMessage(137, tag));
                break;
              default:
                setProp(
                  domElement,
                  tag,
                  checked,
                  propKey$201,
                  nextProps,
                  propKey
                );
            }
        return;
      default:
        if (isCustomElement(tag)) {
          for (var propKey$227 in lastProps)
            propKey$201 = lastProps[propKey$227], lastProps.hasOwnProperty(propKey$227) && void 0 !== propKey$201 && !nextProps.hasOwnProperty(propKey$227) && setPropOnCustomElement(
              domElement,
              tag,
              propKey$227,
              void 0,
              nextProps,
              propKey$201
            );
          for (defaultChecked in nextProps)
            propKey$201 = nextProps[defaultChecked], propKey = lastProps[defaultChecked], !nextProps.hasOwnProperty(defaultChecked) || propKey$201 === propKey || void 0 === propKey$201 && void 0 === propKey || setPropOnCustomElement(
              domElement,
              tag,
              defaultChecked,
              propKey$201,
              nextProps,
              propKey
            );
          return;
        }
    }
    for (var propKey$232 in lastProps)
      propKey$201 = lastProps[propKey$232], lastProps.hasOwnProperty(propKey$232) && null != propKey$201 && !nextProps.hasOwnProperty(propKey$232) && setProp(domElement, tag, propKey$232, null, nextProps, propKey$201);
    for (lastProp in nextProps)
      propKey$201 = nextProps[lastProp], propKey = lastProps[lastProp], !nextProps.hasOwnProperty(lastProp) || propKey$201 === propKey || null == propKey$201 && null == propKey || setProp(domElement, tag, lastProp, propKey$201, nextProps, propKey);
  }
  function isLikelyStaticResource(initiatorType) {
    switch (initiatorType) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return true;
      default:
        return false;
    }
  }
  function estimateBandwidth() {
    if ("function" === typeof performance.getEntriesByType) {
      for (var count = 0, bits = 0, resourceEntries = performance.getEntriesByType("resource"), i = 0; i < resourceEntries.length; i++) {
        var entry = resourceEntries[i], transferSize = entry.transferSize, initiatorType = entry.initiatorType, duration = entry.duration;
        if (transferSize && duration && isLikelyStaticResource(initiatorType)) {
          initiatorType = 0;
          duration = entry.responseEnd;
          for (i += 1; i < resourceEntries.length; i++) {
            var overlapEntry = resourceEntries[i], overlapStartTime = overlapEntry.startTime;
            if (overlapStartTime > duration) break;
            var overlapTransferSize = overlapEntry.transferSize, overlapInitiatorType = overlapEntry.initiatorType;
            overlapTransferSize && isLikelyStaticResource(overlapInitiatorType) && (overlapEntry = overlapEntry.responseEnd, initiatorType += overlapTransferSize * (overlapEntry < duration ? 1 : (duration - overlapStartTime) / (overlapEntry - overlapStartTime)));
          }
          --i;
          bits += 8 * (transferSize + initiatorType) / (entry.duration / 1e3);
          count++;
          if (10 < count) break;
        }
      }
      if (0 < count) return bits / count / 1e6;
    }
    return navigator.connection && (count = navigator.connection.downlink, "number" === typeof count) ? count : 5;
  }
  var eventsEnabled = null, selectionInformation = null;
  function getOwnerDocumentFromRootContainer(rootContainerElement) {
    return 9 === rootContainerElement.nodeType ? rootContainerElement : rootContainerElement.ownerDocument;
  }
  function getOwnHostContext(namespaceURI) {
    switch (namespaceURI) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function getChildHostContextProd(parentNamespace, type) {
    if (0 === parentNamespace)
      switch (type) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return 1 === parentNamespace && "foreignObject" === type ? 0 : parentNamespace;
  }
  function shouldSetTextContent(type, props) {
    return "textarea" === type || "noscript" === type || "string" === typeof props.children || "number" === typeof props.children || "bigint" === typeof props.children || "object" === typeof props.dangerouslySetInnerHTML && null !== props.dangerouslySetInnerHTML && null != props.dangerouslySetInnerHTML.__html;
  }
  var currentPopstateTransitionEvent = null;
  function shouldAttemptEagerTransition() {
    var event = window.event;
    if (event && "popstate" === event.type) {
      if (event === currentPopstateTransitionEvent) return false;
      currentPopstateTransitionEvent = event;
      return true;
    }
    currentPopstateTransitionEvent = null;
    return false;
  }
  var scheduleTimeout = "function" === typeof setTimeout ? setTimeout : void 0, cancelTimeout = "function" === typeof clearTimeout ? clearTimeout : void 0, localPromise = "function" === typeof Promise ? Promise : void 0, scheduleMicrotask = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof localPromise ? function(callback) {
    return localPromise.resolve(null).then(callback).catch(handleErrorInNextTick);
  } : scheduleTimeout;
  function handleErrorInNextTick(error) {
    setTimeout(function() {
      throw error;
    });
  }
  function isSingletonScope(type) {
    return "head" === type;
  }
  function clearHydrationBoundary(parentInstance, hydrationInstance) {
    var node = hydrationInstance, depth = 0;
    do {
      var nextNode = node.nextSibling;
      parentInstance.removeChild(node);
      if (nextNode && 8 === nextNode.nodeType)
        if (node = nextNode.data, "/$" === node || "/&" === node) {
          if (0 === depth) {
            parentInstance.removeChild(nextNode);
            retryIfBlockedOn(hydrationInstance);
            return;
          }
          depth--;
        } else if ("$" === node || "$?" === node || "$~" === node || "$!" === node || "&" === node)
          depth++;
        else if ("html" === node)
          releaseSingletonInstance(parentInstance.ownerDocument.documentElement);
        else if ("head" === node) {
          node = parentInstance.ownerDocument.head;
          releaseSingletonInstance(node);
          for (var node$jscomp$0 = node.firstChild; node$jscomp$0; ) {
            var nextNode$jscomp$0 = node$jscomp$0.nextSibling, nodeName = node$jscomp$0.nodeName;
            node$jscomp$0[internalHoistableMarker] || "SCRIPT" === nodeName || "STYLE" === nodeName || "LINK" === nodeName && "stylesheet" === node$jscomp$0.rel.toLowerCase() || node.removeChild(node$jscomp$0);
            node$jscomp$0 = nextNode$jscomp$0;
          }
        } else
          "body" === node && releaseSingletonInstance(parentInstance.ownerDocument.body);
      node = nextNode;
    } while (node);
    retryIfBlockedOn(hydrationInstance);
  }
  function hideOrUnhideDehydratedBoundary(suspenseInstance, isHidden) {
    var node = suspenseInstance;
    suspenseInstance = 0;
    do {
      var nextNode = node.nextSibling;
      1 === node.nodeType ? isHidden ? (node._stashedDisplay = node.style.display, node.style.display = "none") : (node.style.display = node._stashedDisplay || "", "" === node.getAttribute("style") && node.removeAttribute("style")) : 3 === node.nodeType && (isHidden ? (node._stashedText = node.nodeValue, node.nodeValue = "") : node.nodeValue = node._stashedText || "");
      if (nextNode && 8 === nextNode.nodeType)
        if (node = nextNode.data, "/$" === node)
          if (0 === suspenseInstance) break;
          else suspenseInstance--;
        else
          "$" !== node && "$?" !== node && "$~" !== node && "$!" !== node || suspenseInstance++;
      node = nextNode;
    } while (node);
  }
  function clearContainerSparingly(container) {
    var nextNode = container.firstChild;
    nextNode && 10 === nextNode.nodeType && (nextNode = nextNode.nextSibling);
    for (; nextNode; ) {
      var node = nextNode;
      nextNode = nextNode.nextSibling;
      switch (node.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          clearContainerSparingly(node);
          detachDeletedInstance(node);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if ("stylesheet" === node.rel.toLowerCase()) continue;
      }
      container.removeChild(node);
    }
  }
  function canHydrateInstance(instance, type, props, inRootOrSingleton) {
    for (; 1 === instance.nodeType; ) {
      var anyProps = props;
      if (instance.nodeName.toLowerCase() !== type.toLowerCase()) {
        if (!inRootOrSingleton && ("INPUT" !== instance.nodeName || "hidden" !== instance.type))
          break;
      } else if (!inRootOrSingleton)
        if ("input" === type && "hidden" === instance.type) {
          var name = null == anyProps.name ? null : "" + anyProps.name;
          if ("hidden" === anyProps.type && instance.getAttribute("name") === name)
            return instance;
        } else return instance;
      else if (!instance[internalHoistableMarker])
        switch (type) {
          case "meta":
            if (!instance.hasAttribute("itemprop")) break;
            return instance;
          case "link":
            name = instance.getAttribute("rel");
            if ("stylesheet" === name && instance.hasAttribute("data-precedence"))
              break;
            else if (name !== anyProps.rel || instance.getAttribute("href") !== (null == anyProps.href || "" === anyProps.href ? null : anyProps.href) || instance.getAttribute("crossorigin") !== (null == anyProps.crossOrigin ? null : anyProps.crossOrigin) || instance.getAttribute("title") !== (null == anyProps.title ? null : anyProps.title))
              break;
            return instance;
          case "style":
            if (instance.hasAttribute("data-precedence")) break;
            return instance;
          case "script":
            name = instance.getAttribute("src");
            if ((name !== (null == anyProps.src ? null : anyProps.src) || instance.getAttribute("type") !== (null == anyProps.type ? null : anyProps.type) || instance.getAttribute("crossorigin") !== (null == anyProps.crossOrigin ? null : anyProps.crossOrigin)) && name && instance.hasAttribute("async") && !instance.hasAttribute("itemprop"))
              break;
            return instance;
          default:
            return instance;
        }
      instance = getNextHydratable(instance.nextSibling);
      if (null === instance) break;
    }
    return null;
  }
  function canHydrateTextInstance(instance, text, inRootOrSingleton) {
    if ("" === text) return null;
    for (; 3 !== instance.nodeType; ) {
      if ((1 !== instance.nodeType || "INPUT" !== instance.nodeName || "hidden" !== instance.type) && !inRootOrSingleton)
        return null;
      instance = getNextHydratable(instance.nextSibling);
      if (null === instance) return null;
    }
    return instance;
  }
  function canHydrateHydrationBoundary(instance, inRootOrSingleton) {
    for (; 8 !== instance.nodeType; ) {
      if ((1 !== instance.nodeType || "INPUT" !== instance.nodeName || "hidden" !== instance.type) && !inRootOrSingleton)
        return null;
      instance = getNextHydratable(instance.nextSibling);
      if (null === instance) return null;
    }
    return instance;
  }
  function isSuspenseInstancePending(instance) {
    return "$?" === instance.data || "$~" === instance.data;
  }
  function isSuspenseInstanceFallback(instance) {
    return "$!" === instance.data || "$?" === instance.data && "loading" !== instance.ownerDocument.readyState;
  }
  function registerSuspenseInstanceRetry(instance, callback) {
    var ownerDocument = instance.ownerDocument;
    if ("$~" === instance.data) instance._reactRetry = callback;
    else if ("$?" !== instance.data || "loading" !== ownerDocument.readyState)
      callback();
    else {
      var listener = function() {
        callback();
        ownerDocument.removeEventListener("DOMContentLoaded", listener);
      };
      ownerDocument.addEventListener("DOMContentLoaded", listener);
      instance._reactRetry = listener;
    }
  }
  function getNextHydratable(node) {
    for (; null != node; node = node.nextSibling) {
      var nodeType = node.nodeType;
      if (1 === nodeType || 3 === nodeType) break;
      if (8 === nodeType) {
        nodeType = node.data;
        if ("$" === nodeType || "$!" === nodeType || "$?" === nodeType || "$~" === nodeType || "&" === nodeType || "F!" === nodeType || "F" === nodeType)
          break;
        if ("/$" === nodeType || "/&" === nodeType) return null;
      }
    }
    return node;
  }
  var previousHydratableOnEnteringScopedSingleton = null;
  function getNextHydratableInstanceAfterHydrationBoundary(hydrationInstance) {
    hydrationInstance = hydrationInstance.nextSibling;
    for (var depth = 0; hydrationInstance; ) {
      if (8 === hydrationInstance.nodeType) {
        var data = hydrationInstance.data;
        if ("/$" === data || "/&" === data) {
          if (0 === depth)
            return getNextHydratable(hydrationInstance.nextSibling);
          depth--;
        } else
          "$" !== data && "$!" !== data && "$?" !== data && "$~" !== data && "&" !== data || depth++;
      }
      hydrationInstance = hydrationInstance.nextSibling;
    }
    return null;
  }
  function getParentHydrationBoundary(targetInstance) {
    targetInstance = targetInstance.previousSibling;
    for (var depth = 0; targetInstance; ) {
      if (8 === targetInstance.nodeType) {
        var data = targetInstance.data;
        if ("$" === data || "$!" === data || "$?" === data || "$~" === data || "&" === data) {
          if (0 === depth) return targetInstance;
          depth--;
        } else "/$" !== data && "/&" !== data || depth++;
      }
      targetInstance = targetInstance.previousSibling;
    }
    return null;
  }
  function resolveSingletonInstance(type, props, rootContainerInstance) {
    props = getOwnerDocumentFromRootContainer(rootContainerInstance);
    switch (type) {
      case "html":
        type = props.documentElement;
        if (!type) throw Error(formatProdErrorMessage(452));
        return type;
      case "head":
        type = props.head;
        if (!type) throw Error(formatProdErrorMessage(453));
        return type;
      case "body":
        type = props.body;
        if (!type) throw Error(formatProdErrorMessage(454));
        return type;
      default:
        throw Error(formatProdErrorMessage(451));
    }
  }
  function releaseSingletonInstance(instance) {
    for (var attributes = instance.attributes; attributes.length; )
      instance.removeAttributeNode(attributes[0]);
    detachDeletedInstance(instance);
  }
  var preloadPropsMap = /* @__PURE__ */ new Map(), preconnectsSet = /* @__PURE__ */ new Set();
  function getHoistableRoot(container) {
    return "function" === typeof container.getRootNode ? container.getRootNode() : 9 === container.nodeType ? container : container.ownerDocument;
  }
  var previousDispatcher = ReactDOMSharedInternals.d;
  ReactDOMSharedInternals.d = {
    f: flushSyncWork,
    r: requestFormReset,
    D: prefetchDNS,
    C: preconnect,
    L: preload,
    m: preloadModule,
    X: preinitScript,
    S: preinitStyle,
    M: preinitModuleScript
  };
  function flushSyncWork() {
    var previousWasRendering = previousDispatcher.f(), wasRendering = flushSyncWork$1();
    return previousWasRendering || wasRendering;
  }
  function requestFormReset(form) {
    var formInst = getInstanceFromNode(form);
    null !== formInst && 5 === formInst.tag && "form" === formInst.type ? requestFormReset$1(formInst) : previousDispatcher.r(form);
  }
  var globalDocument = "undefined" === typeof document ? null : document;
  function preconnectAs(rel, href, crossOrigin) {
    var ownerDocument = globalDocument;
    if (ownerDocument && "string" === typeof href && href) {
      var limitedEscapedHref = escapeSelectorAttributeValueInsideDoubleQuotes(href);
      limitedEscapedHref = 'link[rel="' + rel + '"][href="' + limitedEscapedHref + '"]';
      "string" === typeof crossOrigin && (limitedEscapedHref += '[crossorigin="' + crossOrigin + '"]');
      preconnectsSet.has(limitedEscapedHref) || (preconnectsSet.add(limitedEscapedHref), rel = { rel, crossOrigin, href }, null === ownerDocument.querySelector(limitedEscapedHref) && (href = ownerDocument.createElement("link"), setInitialProperties(href, "link", rel), markNodeAsHoistable(href), ownerDocument.head.appendChild(href)));
    }
  }
  function prefetchDNS(href) {
    previousDispatcher.D(href);
    preconnectAs("dns-prefetch", href, null);
  }
  function preconnect(href, crossOrigin) {
    previousDispatcher.C(href, crossOrigin);
    preconnectAs("preconnect", href, crossOrigin);
  }
  function preload(href, as, options2) {
    previousDispatcher.L(href, as, options2);
    var ownerDocument = globalDocument;
    if (ownerDocument && href && as) {
      var preloadSelector = 'link[rel="preload"][as="' + escapeSelectorAttributeValueInsideDoubleQuotes(as) + '"]';
      "image" === as ? options2 && options2.imageSrcSet ? (preloadSelector += '[imagesrcset="' + escapeSelectorAttributeValueInsideDoubleQuotes(
        options2.imageSrcSet
      ) + '"]', "string" === typeof options2.imageSizes && (preloadSelector += '[imagesizes="' + escapeSelectorAttributeValueInsideDoubleQuotes(
        options2.imageSizes
      ) + '"]')) : preloadSelector += '[href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"]' : preloadSelector += '[href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"]';
      var key = preloadSelector;
      switch (as) {
        case "style":
          key = getStyleKey(href);
          break;
        case "script":
          key = getScriptKey(href);
      }
      preloadPropsMap.has(key) || (href = assign(
        {
          rel: "preload",
          href: "image" === as && options2 && options2.imageSrcSet ? void 0 : href,
          as
        },
        options2
      ), preloadPropsMap.set(key, href), null !== ownerDocument.querySelector(preloadSelector) || "style" === as && ownerDocument.querySelector(getStylesheetSelectorFromKey(key)) || "script" === as && ownerDocument.querySelector(getScriptSelectorFromKey(key)) || (as = ownerDocument.createElement("link"), setInitialProperties(as, "link", href), markNodeAsHoistable(as), ownerDocument.head.appendChild(as)));
    }
  }
  function preloadModule(href, options2) {
    previousDispatcher.m(href, options2);
    var ownerDocument = globalDocument;
    if (ownerDocument && href) {
      var as = options2 && "string" === typeof options2.as ? options2.as : "script", preloadSelector = 'link[rel="modulepreload"][as="' + escapeSelectorAttributeValueInsideDoubleQuotes(as) + '"][href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"]', key = preloadSelector;
      switch (as) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          key = getScriptKey(href);
      }
      if (!preloadPropsMap.has(key) && (href = assign({ rel: "modulepreload", href }, options2), preloadPropsMap.set(key, href), null === ownerDocument.querySelector(preloadSelector))) {
        switch (as) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (ownerDocument.querySelector(getScriptSelectorFromKey(key)))
              return;
        }
        as = ownerDocument.createElement("link");
        setInitialProperties(as, "link", href);
        markNodeAsHoistable(as);
        ownerDocument.head.appendChild(as);
      }
    }
  }
  function preinitStyle(href, precedence, options2) {
    previousDispatcher.S(href, precedence, options2);
    var ownerDocument = globalDocument;
    if (ownerDocument && href) {
      var styles = getResourcesFromRoot(ownerDocument).hoistableStyles, key = getStyleKey(href);
      precedence = precedence || "default";
      var resource = styles.get(key);
      if (!resource) {
        var state = { loading: 0, preload: null };
        if (resource = ownerDocument.querySelector(
          getStylesheetSelectorFromKey(key)
        ))
          state.loading = 5;
        else {
          href = assign(
            { rel: "stylesheet", href, "data-precedence": precedence },
            options2
          );
          (options2 = preloadPropsMap.get(key)) && adoptPreloadPropsForStylesheet(href, options2);
          var link = resource = ownerDocument.createElement("link");
          markNodeAsHoistable(link);
          setInitialProperties(link, "link", href);
          link._p = new Promise(function(resolve, reject) {
            link.onload = resolve;
            link.onerror = reject;
          });
          link.addEventListener("load", function() {
            state.loading |= 1;
          });
          link.addEventListener("error", function() {
            state.loading |= 2;
          });
          state.loading |= 4;
          insertStylesheet(resource, precedence, ownerDocument);
        }
        resource = {
          type: "stylesheet",
          instance: resource,
          count: 1,
          state
        };
        styles.set(key, resource);
      }
    }
  }
  function preinitScript(src, options2) {
    previousDispatcher.X(src, options2);
    var ownerDocument = globalDocument;
    if (ownerDocument && src) {
      var scripts = getResourcesFromRoot(ownerDocument).hoistableScripts, key = getScriptKey(src), resource = scripts.get(key);
      resource || (resource = ownerDocument.querySelector(getScriptSelectorFromKey(key)), resource || (src = assign({ src, async: true }, options2), (options2 = preloadPropsMap.get(key)) && adoptPreloadPropsForScript(src, options2), resource = ownerDocument.createElement("script"), markNodeAsHoistable(resource), setInitialProperties(resource, "link", src), ownerDocument.head.appendChild(resource)), resource = {
        type: "script",
        instance: resource,
        count: 1,
        state: null
      }, scripts.set(key, resource));
    }
  }
  function preinitModuleScript(src, options2) {
    previousDispatcher.M(src, options2);
    var ownerDocument = globalDocument;
    if (ownerDocument && src) {
      var scripts = getResourcesFromRoot(ownerDocument).hoistableScripts, key = getScriptKey(src), resource = scripts.get(key);
      resource || (resource = ownerDocument.querySelector(getScriptSelectorFromKey(key)), resource || (src = assign({ src, async: true, type: "module" }, options2), (options2 = preloadPropsMap.get(key)) && adoptPreloadPropsForScript(src, options2), resource = ownerDocument.createElement("script"), markNodeAsHoistable(resource), setInitialProperties(resource, "link", src), ownerDocument.head.appendChild(resource)), resource = {
        type: "script",
        instance: resource,
        count: 1,
        state: null
      }, scripts.set(key, resource));
    }
  }
  function getResource(type, currentProps, pendingProps, currentResource) {
    var JSCompiler_inline_result = (JSCompiler_inline_result = rootInstanceStackCursor.current) ? getHoistableRoot(JSCompiler_inline_result) : null;
    if (!JSCompiler_inline_result) throw Error(formatProdErrorMessage(446));
    switch (type) {
      case "meta":
      case "title":
        return null;
      case "style":
        return "string" === typeof pendingProps.precedence && "string" === typeof pendingProps.href ? (currentProps = getStyleKey(pendingProps.href), pendingProps = getResourcesFromRoot(
          JSCompiler_inline_result
        ).hoistableStyles, currentResource = pendingProps.get(currentProps), currentResource || (currentResource = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, pendingProps.set(currentProps, currentResource)), currentResource) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if ("stylesheet" === pendingProps.rel && "string" === typeof pendingProps.href && "string" === typeof pendingProps.precedence) {
          type = getStyleKey(pendingProps.href);
          var styles$243 = getResourcesFromRoot(
            JSCompiler_inline_result
          ).hoistableStyles, resource$244 = styles$243.get(type);
          resource$244 || (JSCompiler_inline_result = JSCompiler_inline_result.ownerDocument || JSCompiler_inline_result, resource$244 = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, styles$243.set(type, resource$244), (styles$243 = JSCompiler_inline_result.querySelector(
            getStylesheetSelectorFromKey(type)
          )) && !styles$243._p && (resource$244.instance = styles$243, resource$244.state.loading = 5), preloadPropsMap.has(type) || (pendingProps = {
            rel: "preload",
            as: "style",
            href: pendingProps.href,
            crossOrigin: pendingProps.crossOrigin,
            integrity: pendingProps.integrity,
            media: pendingProps.media,
            hrefLang: pendingProps.hrefLang,
            referrerPolicy: pendingProps.referrerPolicy
          }, preloadPropsMap.set(type, pendingProps), styles$243 || preloadStylesheet(
            JSCompiler_inline_result,
            type,
            pendingProps,
            resource$244.state
          )));
          if (currentProps && null === currentResource)
            throw Error(formatProdErrorMessage(528, ""));
          return resource$244;
        }
        if (currentProps && null !== currentResource)
          throw Error(formatProdErrorMessage(529, ""));
        return null;
      case "script":
        return currentProps = pendingProps.async, pendingProps = pendingProps.src, "string" === typeof pendingProps && currentProps && "function" !== typeof currentProps && "symbol" !== typeof currentProps ? (currentProps = getScriptKey(pendingProps), pendingProps = getResourcesFromRoot(
          JSCompiler_inline_result
        ).hoistableScripts, currentResource = pendingProps.get(currentProps), currentResource || (currentResource = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, pendingProps.set(currentProps, currentResource)), currentResource) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(formatProdErrorMessage(444, type));
    }
  }
  function getStyleKey(href) {
    return 'href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"';
  }
  function getStylesheetSelectorFromKey(key) {
    return 'link[rel="stylesheet"][' + key + "]";
  }
  function stylesheetPropsFromRawProps(rawProps) {
    return assign({}, rawProps, {
      "data-precedence": rawProps.precedence,
      precedence: null
    });
  }
  function preloadStylesheet(ownerDocument, key, preloadProps, state) {
    ownerDocument.querySelector('link[rel="preload"][as="style"][' + key + "]") ? state.loading = 1 : (key = ownerDocument.createElement("link"), state.preload = key, key.addEventListener("load", function() {
      return state.loading |= 1;
    }), key.addEventListener("error", function() {
      return state.loading |= 2;
    }), setInitialProperties(key, "link", preloadProps), markNodeAsHoistable(key), ownerDocument.head.appendChild(key));
  }
  function getScriptKey(src) {
    return '[src="' + escapeSelectorAttributeValueInsideDoubleQuotes(src) + '"]';
  }
  function getScriptSelectorFromKey(key) {
    return "script[async]" + key;
  }
  function acquireResource(hoistableRoot, resource, props) {
    resource.count++;
    if (null === resource.instance)
      switch (resource.type) {
        case "style":
          var instance = hoistableRoot.querySelector(
            'style[data-href~="' + escapeSelectorAttributeValueInsideDoubleQuotes(props.href) + '"]'
          );
          if (instance)
            return resource.instance = instance, markNodeAsHoistable(instance), instance;
          var styleProps = assign({}, props, {
            "data-href": props.href,
            "data-precedence": props.precedence,
            href: null,
            precedence: null
          });
          instance = (hoistableRoot.ownerDocument || hoistableRoot).createElement(
            "style"
          );
          markNodeAsHoistable(instance);
          setInitialProperties(instance, "style", styleProps);
          insertStylesheet(instance, props.precedence, hoistableRoot);
          return resource.instance = instance;
        case "stylesheet":
          styleProps = getStyleKey(props.href);
          var instance$249 = hoistableRoot.querySelector(
            getStylesheetSelectorFromKey(styleProps)
          );
          if (instance$249)
            return resource.state.loading |= 4, resource.instance = instance$249, markNodeAsHoistable(instance$249), instance$249;
          instance = stylesheetPropsFromRawProps(props);
          (styleProps = preloadPropsMap.get(styleProps)) && adoptPreloadPropsForStylesheet(instance, styleProps);
          instance$249 = (hoistableRoot.ownerDocument || hoistableRoot).createElement("link");
          markNodeAsHoistable(instance$249);
          var linkInstance = instance$249;
          linkInstance._p = new Promise(function(resolve, reject) {
            linkInstance.onload = resolve;
            linkInstance.onerror = reject;
          });
          setInitialProperties(instance$249, "link", instance);
          resource.state.loading |= 4;
          insertStylesheet(instance$249, props.precedence, hoistableRoot);
          return resource.instance = instance$249;
        case "script":
          instance$249 = getScriptKey(props.src);
          if (styleProps = hoistableRoot.querySelector(
            getScriptSelectorFromKey(instance$249)
          ))
            return resource.instance = styleProps, markNodeAsHoistable(styleProps), styleProps;
          instance = props;
          if (styleProps = preloadPropsMap.get(instance$249))
            instance = assign({}, props), adoptPreloadPropsForScript(instance, styleProps);
          hoistableRoot = hoistableRoot.ownerDocument || hoistableRoot;
          styleProps = hoistableRoot.createElement("script");
          markNodeAsHoistable(styleProps);
          setInitialProperties(styleProps, "link", instance);
          hoistableRoot.head.appendChild(styleProps);
          return resource.instance = styleProps;
        case "void":
          return null;
        default:
          throw Error(formatProdErrorMessage(443, resource.type));
      }
    else
      "stylesheet" === resource.type && 0 === (resource.state.loading & 4) && (instance = resource.instance, resource.state.loading |= 4, insertStylesheet(instance, props.precedence, hoistableRoot));
    return resource.instance;
  }
  function insertStylesheet(instance, precedence, root2) {
    for (var nodes = root2.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), last = nodes.length ? nodes[nodes.length - 1] : null, prior = last, i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (node.dataset.precedence === precedence) prior = node;
      else if (prior !== last) break;
    }
    prior ? prior.parentNode.insertBefore(instance, prior.nextSibling) : (precedence = 9 === root2.nodeType ? root2.head : root2, precedence.insertBefore(instance, precedence.firstChild));
  }
  function adoptPreloadPropsForStylesheet(stylesheetProps, preloadProps) {
    null == stylesheetProps.crossOrigin && (stylesheetProps.crossOrigin = preloadProps.crossOrigin);
    null == stylesheetProps.referrerPolicy && (stylesheetProps.referrerPolicy = preloadProps.referrerPolicy);
    null == stylesheetProps.title && (stylesheetProps.title = preloadProps.title);
  }
  function adoptPreloadPropsForScript(scriptProps, preloadProps) {
    null == scriptProps.crossOrigin && (scriptProps.crossOrigin = preloadProps.crossOrigin);
    null == scriptProps.referrerPolicy && (scriptProps.referrerPolicy = preloadProps.referrerPolicy);
    null == scriptProps.integrity && (scriptProps.integrity = preloadProps.integrity);
  }
  var tagCaches = null;
  function getHydratableHoistableCache(type, keyAttribute, ownerDocument) {
    if (null === tagCaches) {
      var cache = /* @__PURE__ */ new Map();
      var caches = tagCaches = /* @__PURE__ */ new Map();
      caches.set(ownerDocument, cache);
    } else
      caches = tagCaches, cache = caches.get(ownerDocument), cache || (cache = /* @__PURE__ */ new Map(), caches.set(ownerDocument, cache));
    if (cache.has(type)) return cache;
    cache.set(type, null);
    ownerDocument = ownerDocument.getElementsByTagName(type);
    for (caches = 0; caches < ownerDocument.length; caches++) {
      var node = ownerDocument[caches];
      if (!(node[internalHoistableMarker] || node[internalInstanceKey] || "link" === type && "stylesheet" === node.getAttribute("rel")) && "http://www.w3.org/2000/svg" !== node.namespaceURI) {
        var nodeKey = node.getAttribute(keyAttribute) || "";
        nodeKey = type + nodeKey;
        var existing = cache.get(nodeKey);
        existing ? existing.push(node) : cache.set(nodeKey, [node]);
      }
    }
    return cache;
  }
  function mountHoistable(hoistableRoot, type, instance) {
    hoistableRoot = hoistableRoot.ownerDocument || hoistableRoot;
    hoistableRoot.head.insertBefore(
      instance,
      "title" === type ? hoistableRoot.querySelector("head > title") : null
    );
  }
  function isHostHoistableType(type, props, hostContext) {
    if (1 === hostContext || null != props.itemProp) return false;
    switch (type) {
      case "meta":
      case "title":
        return true;
      case "style":
        if ("string" !== typeof props.precedence || "string" !== typeof props.href || "" === props.href)
          break;
        return true;
      case "link":
        if ("string" !== typeof props.rel || "string" !== typeof props.href || "" === props.href || props.onLoad || props.onError)
          break;
        switch (props.rel) {
          case "stylesheet":
            return type = props.disabled, "string" === typeof props.precedence && null == type;
          default:
            return true;
        }
      case "script":
        if (props.async && "function" !== typeof props.async && "symbol" !== typeof props.async && !props.onLoad && !props.onError && props.src && "string" === typeof props.src)
          return true;
    }
    return false;
  }
  function preloadResource(resource) {
    return "stylesheet" === resource.type && 0 === (resource.state.loading & 3) ? false : true;
  }
  function suspendResource(state, hoistableRoot, resource, props) {
    if ("stylesheet" === resource.type && ("string" !== typeof props.media || false !== matchMedia(props.media).matches) && 0 === (resource.state.loading & 4)) {
      if (null === resource.instance) {
        var key = getStyleKey(props.href), instance = hoistableRoot.querySelector(
          getStylesheetSelectorFromKey(key)
        );
        if (instance) {
          hoistableRoot = instance._p;
          null !== hoistableRoot && "object" === typeof hoistableRoot && "function" === typeof hoistableRoot.then && (state.count++, state = onUnsuspend.bind(state), hoistableRoot.then(state, state));
          resource.state.loading |= 4;
          resource.instance = instance;
          markNodeAsHoistable(instance);
          return;
        }
        instance = hoistableRoot.ownerDocument || hoistableRoot;
        props = stylesheetPropsFromRawProps(props);
        (key = preloadPropsMap.get(key)) && adoptPreloadPropsForStylesheet(props, key);
        instance = instance.createElement("link");
        markNodeAsHoistable(instance);
        var linkInstance = instance;
        linkInstance._p = new Promise(function(resolve, reject) {
          linkInstance.onload = resolve;
          linkInstance.onerror = reject;
        });
        setInitialProperties(instance, "link", props);
        resource.instance = instance;
      }
      null === state.stylesheets && (state.stylesheets = /* @__PURE__ */ new Map());
      state.stylesheets.set(resource, hoistableRoot);
      (hoistableRoot = resource.state.preload) && 0 === (resource.state.loading & 3) && (state.count++, resource = onUnsuspend.bind(state), hoistableRoot.addEventListener("load", resource), hoistableRoot.addEventListener("error", resource));
    }
  }
  var estimatedBytesWithinLimit = 0;
  function waitForCommitToBeReady(state, timeoutOffset) {
    state.stylesheets && 0 === state.count && insertSuspendedStylesheets(state, state.stylesheets);
    return 0 < state.count || 0 < state.imgCount ? function(commit) {
      var stylesheetTimer = setTimeout(function() {
        state.stylesheets && insertSuspendedStylesheets(state, state.stylesheets);
        if (state.unsuspend) {
          var unsuspend = state.unsuspend;
          state.unsuspend = null;
          unsuspend();
        }
      }, 6e4 + timeoutOffset);
      0 < state.imgBytes && 0 === estimatedBytesWithinLimit && (estimatedBytesWithinLimit = 62500 * estimateBandwidth());
      var imgTimer = setTimeout(
        function() {
          state.waitingForImages = false;
          if (0 === state.count && (state.stylesheets && insertSuspendedStylesheets(state, state.stylesheets), state.unsuspend)) {
            var unsuspend = state.unsuspend;
            state.unsuspend = null;
            unsuspend();
          }
        },
        (state.imgBytes > estimatedBytesWithinLimit ? 50 : 800) + timeoutOffset
      );
      state.unsuspend = commit;
      return function() {
        state.unsuspend = null;
        clearTimeout(stylesheetTimer);
        clearTimeout(imgTimer);
      };
    } : null;
  }
  function onUnsuspend() {
    this.count--;
    if (0 === this.count && (0 === this.imgCount || !this.waitingForImages)) {
      if (this.stylesheets) insertSuspendedStylesheets(this, this.stylesheets);
      else if (this.unsuspend) {
        var unsuspend = this.unsuspend;
        this.unsuspend = null;
        unsuspend();
      }
    }
  }
  var precedencesByRoot = null;
  function insertSuspendedStylesheets(state, resources) {
    state.stylesheets = null;
    null !== state.unsuspend && (state.count++, precedencesByRoot = /* @__PURE__ */ new Map(), resources.forEach(insertStylesheetIntoRoot, state), precedencesByRoot = null, onUnsuspend.call(state));
  }
  function insertStylesheetIntoRoot(root2, resource) {
    if (!(resource.state.loading & 4)) {
      var precedences = precedencesByRoot.get(root2);
      if (precedences) var last = precedences.get(null);
      else {
        precedences = /* @__PURE__ */ new Map();
        precedencesByRoot.set(root2, precedences);
        for (var nodes = root2.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), i = 0; i < nodes.length; i++) {
          var node = nodes[i];
          if ("LINK" === node.nodeName || "not all" !== node.getAttribute("media"))
            precedences.set(node.dataset.precedence, node), last = node;
        }
        last && precedences.set(null, last);
      }
      nodes = resource.instance;
      node = nodes.getAttribute("data-precedence");
      i = precedences.get(node) || last;
      i === last && precedences.set(null, nodes);
      precedences.set(node, nodes);
      this.count++;
      last = onUnsuspend.bind(this);
      nodes.addEventListener("load", last);
      nodes.addEventListener("error", last);
      i ? i.parentNode.insertBefore(nodes, i.nextSibling) : (root2 = 9 === root2.nodeType ? root2.head : root2, root2.insertBefore(nodes, root2.firstChild));
      resource.state.loading |= 4;
    }
  }
  var HostTransitionContext = {
    $$typeof: REACT_CONTEXT_TYPE,
    Provider: null,
    Consumer: null,
    _currentValue: sharedNotPendingObject,
    _currentValue2: sharedNotPendingObject,
    _threadCount: 0
  };
  function FiberRootNode(containerInfo, tag, hydrate, identifierPrefix, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator, formState) {
    this.tag = 1;
    this.containerInfo = containerInfo;
    this.pingCache = this.current = this.pendingChildren = null;
    this.timeoutHandle = -1;
    this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null;
    this.callbackPriority = 0;
    this.expirationTimes = createLaneMap(-1);
    this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
    this.entanglements = createLaneMap(0);
    this.hiddenUpdates = createLaneMap(null);
    this.identifierPrefix = identifierPrefix;
    this.onUncaughtError = onUncaughtError;
    this.onCaughtError = onCaughtError;
    this.onRecoverableError = onRecoverableError;
    this.pooledCache = null;
    this.pooledCacheLanes = 0;
    this.formState = formState;
    this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function createFiberRoot(containerInfo, tag, hydrate, initialChildren, hydrationCallbacks, isStrictMode, identifierPrefix, formState, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator) {
    containerInfo = new FiberRootNode(
      containerInfo,
      tag,
      hydrate,
      identifierPrefix,
      onUncaughtError,
      onCaughtError,
      onRecoverableError,
      onDefaultTransitionIndicator,
      formState
    );
    tag = 1;
    true === isStrictMode && (tag |= 24);
    isStrictMode = createFiberImplClass(3, null, null, tag);
    containerInfo.current = isStrictMode;
    isStrictMode.stateNode = containerInfo;
    tag = createCache();
    tag.refCount++;
    containerInfo.pooledCache = tag;
    tag.refCount++;
    isStrictMode.memoizedState = {
      element: initialChildren,
      isDehydrated: hydrate,
      cache: tag
    };
    initializeUpdateQueue(isStrictMode);
    return containerInfo;
  }
  function getContextForSubtree(parentComponent) {
    if (!parentComponent) return emptyContextObject;
    parentComponent = emptyContextObject;
    return parentComponent;
  }
  function updateContainerImpl(rootFiber, lane, element, container, parentComponent, callback) {
    parentComponent = getContextForSubtree(parentComponent);
    null === container.context ? container.context = parentComponent : container.pendingContext = parentComponent;
    container = createUpdate(lane);
    container.payload = { element };
    callback = void 0 === callback ? null : callback;
    null !== callback && (container.callback = callback);
    element = enqueueUpdate(rootFiber, container, lane);
    null !== element && (scheduleUpdateOnFiber(element, rootFiber, lane), entangleTransitions(element, rootFiber, lane));
  }
  function markRetryLaneImpl(fiber, retryLane) {
    fiber = fiber.memoizedState;
    if (null !== fiber && null !== fiber.dehydrated) {
      var a = fiber.retryLane;
      fiber.retryLane = 0 !== a && a < retryLane ? a : retryLane;
    }
  }
  function markRetryLaneIfNotHydrated(fiber, retryLane) {
    markRetryLaneImpl(fiber, retryLane);
    (fiber = fiber.alternate) && markRetryLaneImpl(fiber, retryLane);
  }
  function attemptContinuousHydration(fiber) {
    if (13 === fiber.tag || 31 === fiber.tag) {
      var root2 = enqueueConcurrentRenderForLane(fiber, 67108864);
      null !== root2 && scheduleUpdateOnFiber(root2, fiber, 67108864);
      markRetryLaneIfNotHydrated(fiber, 67108864);
    }
  }
  function attemptHydrationAtCurrentPriority(fiber) {
    if (13 === fiber.tag || 31 === fiber.tag) {
      var lane = requestUpdateLane();
      lane = getBumpedLaneForHydrationByLane(lane);
      var root2 = enqueueConcurrentRenderForLane(fiber, lane);
      null !== root2 && scheduleUpdateOnFiber(root2, fiber, lane);
      markRetryLaneIfNotHydrated(fiber, lane);
    }
  }
  var _enabled = true;
  function dispatchDiscreteEvent(domEventName, eventSystemFlags, container, nativeEvent) {
    var prevTransition = ReactSharedInternals.T;
    ReactSharedInternals.T = null;
    var previousPriority = ReactDOMSharedInternals.p;
    try {
      ReactDOMSharedInternals.p = 2, dispatchEvent(domEventName, eventSystemFlags, container, nativeEvent);
    } finally {
      ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition;
    }
  }
  function dispatchContinuousEvent(domEventName, eventSystemFlags, container, nativeEvent) {
    var prevTransition = ReactSharedInternals.T;
    ReactSharedInternals.T = null;
    var previousPriority = ReactDOMSharedInternals.p;
    try {
      ReactDOMSharedInternals.p = 8, dispatchEvent(domEventName, eventSystemFlags, container, nativeEvent);
    } finally {
      ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition;
    }
  }
  function dispatchEvent(domEventName, eventSystemFlags, targetContainer, nativeEvent) {
    if (_enabled) {
      var blockedOn = findInstanceBlockingEvent(nativeEvent);
      if (null === blockedOn)
        dispatchEventForPluginEventSystem(
          domEventName,
          eventSystemFlags,
          nativeEvent,
          return_targetInst,
          targetContainer
        ), clearIfContinuousEvent(domEventName, nativeEvent);
      else if (queueIfContinuousEvent(
        blockedOn,
        domEventName,
        eventSystemFlags,
        targetContainer,
        nativeEvent
      ))
        nativeEvent.stopPropagation();
      else if (clearIfContinuousEvent(domEventName, nativeEvent), eventSystemFlags & 4 && -1 < discreteReplayableEvents.indexOf(domEventName)) {
        for (; null !== blockedOn; ) {
          var fiber = getInstanceFromNode(blockedOn);
          if (null !== fiber)
            switch (fiber.tag) {
              case 3:
                fiber = fiber.stateNode;
                if (fiber.current.memoizedState.isDehydrated) {
                  var lanes = getHighestPriorityLanes(fiber.pendingLanes);
                  if (0 !== lanes) {
                    var root2 = fiber;
                    root2.pendingLanes |= 2;
                    for (root2.entangledLanes |= 2; lanes; ) {
                      var lane = 1 << 31 - clz32(lanes);
                      root2.entanglements[1] |= lane;
                      lanes &= ~lane;
                    }
                    ensureRootIsScheduled(fiber);
                    0 === (executionContext & 6) && (workInProgressRootRenderTargetTime = now() + 500, flushSyncWorkAcrossRoots_impl(0));
                  }
                }
                break;
              case 31:
              case 13:
                root2 = enqueueConcurrentRenderForLane(fiber, 2), null !== root2 && scheduleUpdateOnFiber(root2, fiber, 2), flushSyncWork$1(), markRetryLaneIfNotHydrated(fiber, 2);
            }
          fiber = findInstanceBlockingEvent(nativeEvent);
          null === fiber && dispatchEventForPluginEventSystem(
            domEventName,
            eventSystemFlags,
            nativeEvent,
            return_targetInst,
            targetContainer
          );
          if (fiber === blockedOn) break;
          blockedOn = fiber;
        }
        null !== blockedOn && nativeEvent.stopPropagation();
      } else
        dispatchEventForPluginEventSystem(
          domEventName,
          eventSystemFlags,
          nativeEvent,
          null,
          targetContainer
        );
    }
  }
  function findInstanceBlockingEvent(nativeEvent) {
    nativeEvent = getEventTarget(nativeEvent);
    return findInstanceBlockingTarget(nativeEvent);
  }
  var return_targetInst = null;
  function findInstanceBlockingTarget(targetNode) {
    return_targetInst = null;
    targetNode = getClosestInstanceFromNode(targetNode);
    if (null !== targetNode) {
      var nearestMounted = getNearestMountedFiber(targetNode);
      if (null === nearestMounted) targetNode = null;
      else {
        var tag = nearestMounted.tag;
        if (13 === tag) {
          targetNode = getSuspenseInstanceFromFiber(nearestMounted);
          if (null !== targetNode) return targetNode;
          targetNode = null;
        } else if (31 === tag) {
          targetNode = getActivityInstanceFromFiber(nearestMounted);
          if (null !== targetNode) return targetNode;
          targetNode = null;
        } else if (3 === tag) {
          if (nearestMounted.stateNode.current.memoizedState.isDehydrated)
            return 3 === nearestMounted.tag ? nearestMounted.stateNode.containerInfo : null;
          targetNode = null;
        } else nearestMounted !== targetNode && (targetNode = null);
      }
    }
    return_targetInst = targetNode;
    return null;
  }
  function getEventPriority(domEventName) {
    switch (domEventName) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (getCurrentPriorityLevel()) {
          case ImmediatePriority:
            return 2;
          case UserBlockingPriority:
            return 8;
          case NormalPriority$1:
          case LowPriority:
            return 32;
          case IdlePriority:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var hasScheduledReplayAttempt = false, queuedFocus = null, queuedDrag = null, queuedMouse = null, queuedPointers = /* @__PURE__ */ new Map(), queuedPointerCaptures = /* @__PURE__ */ new Map(), queuedExplicitHydrationTargets = [], discreteReplayableEvents = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function clearIfContinuousEvent(domEventName, nativeEvent) {
    switch (domEventName) {
      case "focusin":
      case "focusout":
        queuedFocus = null;
        break;
      case "dragenter":
      case "dragleave":
        queuedDrag = null;
        break;
      case "mouseover":
      case "mouseout":
        queuedMouse = null;
        break;
      case "pointerover":
      case "pointerout":
        queuedPointers.delete(nativeEvent.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        queuedPointerCaptures.delete(nativeEvent.pointerId);
    }
  }
  function accumulateOrCreateContinuousQueuedReplayableEvent(existingQueuedEvent, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent) {
    if (null === existingQueuedEvent || existingQueuedEvent.nativeEvent !== nativeEvent)
      return existingQueuedEvent = {
        blockedOn,
        domEventName,
        eventSystemFlags,
        nativeEvent,
        targetContainers: [targetContainer]
      }, null !== blockedOn && (blockedOn = getInstanceFromNode(blockedOn), null !== blockedOn && attemptContinuousHydration(blockedOn)), existingQueuedEvent;
    existingQueuedEvent.eventSystemFlags |= eventSystemFlags;
    blockedOn = existingQueuedEvent.targetContainers;
    null !== targetContainer && -1 === blockedOn.indexOf(targetContainer) && blockedOn.push(targetContainer);
    return existingQueuedEvent;
  }
  function queueIfContinuousEvent(blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent) {
    switch (domEventName) {
      case "focusin":
        return queuedFocus = accumulateOrCreateContinuousQueuedReplayableEvent(
          queuedFocus,
          blockedOn,
          domEventName,
          eventSystemFlags,
          targetContainer,
          nativeEvent
        ), true;
      case "dragenter":
        return queuedDrag = accumulateOrCreateContinuousQueuedReplayableEvent(
          queuedDrag,
          blockedOn,
          domEventName,
          eventSystemFlags,
          targetContainer,
          nativeEvent
        ), true;
      case "mouseover":
        return queuedMouse = accumulateOrCreateContinuousQueuedReplayableEvent(
          queuedMouse,
          blockedOn,
          domEventName,
          eventSystemFlags,
          targetContainer,
          nativeEvent
        ), true;
      case "pointerover":
        var pointerId = nativeEvent.pointerId;
        queuedPointers.set(
          pointerId,
          accumulateOrCreateContinuousQueuedReplayableEvent(
            queuedPointers.get(pointerId) || null,
            blockedOn,
            domEventName,
            eventSystemFlags,
            targetContainer,
            nativeEvent
          )
        );
        return true;
      case "gotpointercapture":
        return pointerId = nativeEvent.pointerId, queuedPointerCaptures.set(
          pointerId,
          accumulateOrCreateContinuousQueuedReplayableEvent(
            queuedPointerCaptures.get(pointerId) || null,
            blockedOn,
            domEventName,
            eventSystemFlags,
            targetContainer,
            nativeEvent
          )
        ), true;
    }
    return false;
  }
  function attemptExplicitHydrationTarget(queuedTarget) {
    var targetInst = getClosestInstanceFromNode(queuedTarget.target);
    if (null !== targetInst) {
      var nearestMounted = getNearestMountedFiber(targetInst);
      if (null !== nearestMounted) {
        if (targetInst = nearestMounted.tag, 13 === targetInst) {
          if (targetInst = getSuspenseInstanceFromFiber(nearestMounted), null !== targetInst) {
            queuedTarget.blockedOn = targetInst;
            runWithPriority(queuedTarget.priority, function() {
              attemptHydrationAtCurrentPriority(nearestMounted);
            });
            return;
          }
        } else if (31 === targetInst) {
          if (targetInst = getActivityInstanceFromFiber(nearestMounted), null !== targetInst) {
            queuedTarget.blockedOn = targetInst;
            runWithPriority(queuedTarget.priority, function() {
              attemptHydrationAtCurrentPriority(nearestMounted);
            });
            return;
          }
        } else if (3 === targetInst && nearestMounted.stateNode.current.memoizedState.isDehydrated) {
          queuedTarget.blockedOn = 3 === nearestMounted.tag ? nearestMounted.stateNode.containerInfo : null;
          return;
        }
      }
    }
    queuedTarget.blockedOn = null;
  }
  function attemptReplayContinuousQueuedEvent(queuedEvent) {
    if (null !== queuedEvent.blockedOn) return false;
    for (var targetContainers = queuedEvent.targetContainers; 0 < targetContainers.length; ) {
      var nextBlockedOn = findInstanceBlockingEvent(queuedEvent.nativeEvent);
      if (null === nextBlockedOn) {
        nextBlockedOn = queuedEvent.nativeEvent;
        var nativeEventClone = new nextBlockedOn.constructor(
          nextBlockedOn.type,
          nextBlockedOn
        );
        currentReplayingEvent = nativeEventClone;
        nextBlockedOn.target.dispatchEvent(nativeEventClone);
        currentReplayingEvent = null;
      } else
        return targetContainers = getInstanceFromNode(nextBlockedOn), null !== targetContainers && attemptContinuousHydration(targetContainers), queuedEvent.blockedOn = nextBlockedOn, false;
      targetContainers.shift();
    }
    return true;
  }
  function attemptReplayContinuousQueuedEventInMap(queuedEvent, key, map) {
    attemptReplayContinuousQueuedEvent(queuedEvent) && map.delete(key);
  }
  function replayUnblockedEvents() {
    hasScheduledReplayAttempt = false;
    null !== queuedFocus && attemptReplayContinuousQueuedEvent(queuedFocus) && (queuedFocus = null);
    null !== queuedDrag && attemptReplayContinuousQueuedEvent(queuedDrag) && (queuedDrag = null);
    null !== queuedMouse && attemptReplayContinuousQueuedEvent(queuedMouse) && (queuedMouse = null);
    queuedPointers.forEach(attemptReplayContinuousQueuedEventInMap);
    queuedPointerCaptures.forEach(attemptReplayContinuousQueuedEventInMap);
  }
  function scheduleCallbackIfUnblocked(queuedEvent, unblocked) {
    queuedEvent.blockedOn === unblocked && (queuedEvent.blockedOn = null, hasScheduledReplayAttempt || (hasScheduledReplayAttempt = true, Scheduler.unstable_scheduleCallback(
      Scheduler.unstable_NormalPriority,
      replayUnblockedEvents
    )));
  }
  var lastScheduledReplayQueue = null;
  function scheduleReplayQueueIfNeeded(formReplayingQueue) {
    lastScheduledReplayQueue !== formReplayingQueue && (lastScheduledReplayQueue = formReplayingQueue, Scheduler.unstable_scheduleCallback(
      Scheduler.unstable_NormalPriority,
      function() {
        lastScheduledReplayQueue === formReplayingQueue && (lastScheduledReplayQueue = null);
        for (var i = 0; i < formReplayingQueue.length; i += 3) {
          var form = formReplayingQueue[i], submitterOrAction = formReplayingQueue[i + 1], formData = formReplayingQueue[i + 2];
          if ("function" !== typeof submitterOrAction)
            if (null === findInstanceBlockingTarget(submitterOrAction || form))
              continue;
            else break;
          var formInst = getInstanceFromNode(form);
          null !== formInst && (formReplayingQueue.splice(i, 3), i -= 3, startHostTransition(
            formInst,
            {
              pending: true,
              data: formData,
              method: form.method,
              action: submitterOrAction
            },
            submitterOrAction,
            formData
          ));
        }
      }
    ));
  }
  function retryIfBlockedOn(unblocked) {
    function unblock(queuedEvent) {
      return scheduleCallbackIfUnblocked(queuedEvent, unblocked);
    }
    null !== queuedFocus && scheduleCallbackIfUnblocked(queuedFocus, unblocked);
    null !== queuedDrag && scheduleCallbackIfUnblocked(queuedDrag, unblocked);
    null !== queuedMouse && scheduleCallbackIfUnblocked(queuedMouse, unblocked);
    queuedPointers.forEach(unblock);
    queuedPointerCaptures.forEach(unblock);
    for (var i = 0; i < queuedExplicitHydrationTargets.length; i++) {
      var queuedTarget = queuedExplicitHydrationTargets[i];
      queuedTarget.blockedOn === unblocked && (queuedTarget.blockedOn = null);
    }
    for (; 0 < queuedExplicitHydrationTargets.length && (i = queuedExplicitHydrationTargets[0], null === i.blockedOn); )
      attemptExplicitHydrationTarget(i), null === i.blockedOn && queuedExplicitHydrationTargets.shift();
    i = (unblocked.ownerDocument || unblocked).$$reactFormReplay;
    if (null != i)
      for (queuedTarget = 0; queuedTarget < i.length; queuedTarget += 3) {
        var form = i[queuedTarget], submitterOrAction = i[queuedTarget + 1], formProps = form[internalPropsKey] || null;
        if ("function" === typeof submitterOrAction)
          formProps || scheduleReplayQueueIfNeeded(i);
        else if (formProps) {
          var action = null;
          if (submitterOrAction && submitterOrAction.hasAttribute("formAction"))
            if (form = submitterOrAction, formProps = submitterOrAction[internalPropsKey] || null)
              action = formProps.formAction;
            else {
              if (null !== findInstanceBlockingTarget(form)) continue;
            }
          else action = formProps.action;
          "function" === typeof action ? i[queuedTarget + 1] = action : (i.splice(queuedTarget, 3), queuedTarget -= 3);
          scheduleReplayQueueIfNeeded(i);
        }
      }
  }
  function defaultOnDefaultTransitionIndicator() {
    function handleNavigate(event) {
      event.canIntercept && "react-transition" === event.info && event.intercept({
        handler: function() {
          return new Promise(function(resolve) {
            return pendingResolve = resolve;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function handleNavigateComplete() {
      null !== pendingResolve && (pendingResolve(), pendingResolve = null);
      isCancelled || setTimeout(startFakeNavigation, 20);
    }
    function startFakeNavigation() {
      if (!isCancelled && !navigation.transition) {
        var currentEntry = navigation.currentEntry;
        currentEntry && null != currentEntry.url && navigation.navigate(currentEntry.url, {
          state: currentEntry.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if ("object" === typeof navigation) {
      var isCancelled = false, pendingResolve = null;
      navigation.addEventListener("navigate", handleNavigate);
      navigation.addEventListener("navigatesuccess", handleNavigateComplete);
      navigation.addEventListener("navigateerror", handleNavigateComplete);
      setTimeout(startFakeNavigation, 100);
      return function() {
        isCancelled = true;
        navigation.removeEventListener("navigate", handleNavigate);
        navigation.removeEventListener("navigatesuccess", handleNavigateComplete);
        navigation.removeEventListener("navigateerror", handleNavigateComplete);
        null !== pendingResolve && (pendingResolve(), pendingResolve = null);
      };
    }
  }
  function ReactDOMRoot(internalRoot) {
    this._internalRoot = internalRoot;
  }
  ReactDOMHydrationRoot.prototype.render = ReactDOMRoot.prototype.render = function(children) {
    var root2 = this._internalRoot;
    if (null === root2) throw Error(formatProdErrorMessage(409));
    var current = root2.current, lane = requestUpdateLane();
    updateContainerImpl(current, lane, children, root2, null, null);
  };
  ReactDOMHydrationRoot.prototype.unmount = ReactDOMRoot.prototype.unmount = function() {
    var root2 = this._internalRoot;
    if (null !== root2) {
      this._internalRoot = null;
      var container = root2.containerInfo;
      updateContainerImpl(root2.current, 2, null, root2, null, null);
      flushSyncWork$1();
      container[internalContainerInstanceKey] = null;
    }
  };
  function ReactDOMHydrationRoot(internalRoot) {
    this._internalRoot = internalRoot;
  }
  ReactDOMHydrationRoot.prototype.unstable_scheduleHydration = function(target) {
    if (target) {
      var updatePriority = resolveUpdatePriority();
      target = { blockedOn: null, target, priority: updatePriority };
      for (var i = 0; i < queuedExplicitHydrationTargets.length && 0 !== updatePriority && updatePriority < queuedExplicitHydrationTargets[i].priority; i++) ;
      queuedExplicitHydrationTargets.splice(i, 0, target);
      0 === i && attemptExplicitHydrationTarget(target);
    }
  };
  var isomorphicReactPackageVersion$jscomp$inline_1840 = React2.version;
  if ("19.2.7" !== isomorphicReactPackageVersion$jscomp$inline_1840)
    throw Error(
      formatProdErrorMessage(
        527,
        isomorphicReactPackageVersion$jscomp$inline_1840,
        "19.2.7"
      )
    );
  ReactDOMSharedInternals.findDOMNode = function(componentOrElement) {
    var fiber = componentOrElement._reactInternals;
    if (void 0 === fiber) {
      if ("function" === typeof componentOrElement.render)
        throw Error(formatProdErrorMessage(188));
      componentOrElement = Object.keys(componentOrElement).join(",");
      throw Error(formatProdErrorMessage(268, componentOrElement));
    }
    componentOrElement = findCurrentFiberUsingSlowPath(fiber);
    componentOrElement = null !== componentOrElement ? findCurrentHostFiberImpl(componentOrElement) : null;
    componentOrElement = null === componentOrElement ? null : componentOrElement.stateNode;
    return componentOrElement;
  };
  var internals$jscomp$inline_2347 = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: ReactSharedInternals,
    reconcilerVersion: "19.2.7"
  };
  if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
    var hook$jscomp$inline_2348 = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!hook$jscomp$inline_2348.isDisabled && hook$jscomp$inline_2348.supportsFiber)
      try {
        rendererID = hook$jscomp$inline_2348.inject(
          internals$jscomp$inline_2347
        ), injectedHook = hook$jscomp$inline_2348;
      } catch (err) {
      }
  }
  reactDomClient_production.createRoot = function(container, options2) {
    if (!isValidContainer(container)) throw Error(formatProdErrorMessage(299));
    var isStrictMode = false, identifierPrefix = "", onUncaughtError = defaultOnUncaughtError, onCaughtError = defaultOnCaughtError, onRecoverableError = defaultOnRecoverableError;
    null !== options2 && void 0 !== options2 && (true === options2.unstable_strictMode && (isStrictMode = true), void 0 !== options2.identifierPrefix && (identifierPrefix = options2.identifierPrefix), void 0 !== options2.onUncaughtError && (onUncaughtError = options2.onUncaughtError), void 0 !== options2.onCaughtError && (onCaughtError = options2.onCaughtError), void 0 !== options2.onRecoverableError && (onRecoverableError = options2.onRecoverableError));
    options2 = createFiberRoot(
      container,
      1,
      false,
      null,
      null,
      isStrictMode,
      identifierPrefix,
      null,
      onUncaughtError,
      onCaughtError,
      onRecoverableError,
      defaultOnDefaultTransitionIndicator
    );
    container[internalContainerInstanceKey] = options2.current;
    listenToAllSupportedEvents(container);
    return new ReactDOMRoot(options2);
  };
  reactDomClient_production.hydrateRoot = function(container, initialChildren, options2) {
    if (!isValidContainer(container)) throw Error(formatProdErrorMessage(299));
    var isStrictMode = false, identifierPrefix = "", onUncaughtError = defaultOnUncaughtError, onCaughtError = defaultOnCaughtError, onRecoverableError = defaultOnRecoverableError, formState = null;
    null !== options2 && void 0 !== options2 && (true === options2.unstable_strictMode && (isStrictMode = true), void 0 !== options2.identifierPrefix && (identifierPrefix = options2.identifierPrefix), void 0 !== options2.onUncaughtError && (onUncaughtError = options2.onUncaughtError), void 0 !== options2.onCaughtError && (onCaughtError = options2.onCaughtError), void 0 !== options2.onRecoverableError && (onRecoverableError = options2.onRecoverableError), void 0 !== options2.formState && (formState = options2.formState));
    initialChildren = createFiberRoot(
      container,
      1,
      true,
      initialChildren,
      null != options2 ? options2 : null,
      isStrictMode,
      identifierPrefix,
      formState,
      onUncaughtError,
      onCaughtError,
      onRecoverableError,
      defaultOnDefaultTransitionIndicator
    );
    initialChildren.context = getContextForSubtree(null);
    options2 = initialChildren.current;
    isStrictMode = requestUpdateLane();
    isStrictMode = getBumpedLaneForHydrationByLane(isStrictMode);
    identifierPrefix = createUpdate(isStrictMode);
    identifierPrefix.callback = null;
    enqueueUpdate(options2, identifierPrefix, isStrictMode);
    options2 = isStrictMode;
    initialChildren.current.lanes = options2;
    markRootUpdated$1(initialChildren, options2);
    ensureRootIsScheduled(initialChildren);
    container[internalContainerInstanceKey] = initialChildren.current;
    listenToAllSupportedEvents(container);
    return new ReactDOMHydrationRoot(initialChildren);
  };
  reactDomClient_production.version = "19.2.7";
  return reactDomClient_production;
}
var hasRequiredClient;
function requireClient() {
  if (hasRequiredClient) return client.exports;
  hasRequiredClient = 1;
  function checkDCE() {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
      return;
    }
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
    } catch (err) {
      console.error(err);
    }
  }
  {
    checkDCE();
    client.exports = requireReactDomClient_production();
  }
  return client.exports;
}
var clientExports = requireClient();
const ReactDOM = /* @__PURE__ */ getDefaultExportFromCjs(clientExports);
/**
 * react-router v7.17.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
var PopStateEventType = "popstate";
function isLocation(obj) {
  return typeof obj === "object" && obj != null && "pathname" in obj && "search" in obj && "hash" in obj && "state" in obj && "key" in obj;
}
function createBrowserHistory(options = {}) {
  function createBrowserLocation(window2, globalHistory) {
    var _a;
    let maskedLocation = (_a = globalHistory.state) == null ? void 0 : _a.masked;
    let { pathname, search, hash } = maskedLocation || window2.location;
    return createLocation(
      "",
      { pathname, search, hash },
      // state defaults to `null` because `window.history.state` does
      globalHistory.state && globalHistory.state.usr || null,
      globalHistory.state && globalHistory.state.key || "default",
      maskedLocation ? {
        pathname: window2.location.pathname,
        search: window2.location.search,
        hash: window2.location.hash
      } : void 0
    );
  }
  function createBrowserHref(window2, to) {
    return typeof to === "string" ? to : createPath(to);
  }
  return getUrlBasedHistory(
    createBrowserLocation,
    createBrowserHref,
    null,
    options
  );
}
function invariant(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
function warning(cond, message) {
  if (!cond) {
    if (typeof console !== "undefined") console.warn(message);
    try {
      throw new Error(message);
    } catch (e) {
    }
  }
}
function createKey() {
  return Math.random().toString(36).substring(2, 10);
}
function getHistoryState(location, index) {
  return {
    usr: location.state,
    key: location.key,
    idx: index,
    masked: location.mask ? {
      pathname: location.pathname,
      search: location.search,
      hash: location.hash
    } : void 0
  };
}
function createLocation(current, to, state = null, key, mask) {
  let location = {
    pathname: typeof current === "string" ? current : current.pathname,
    search: "",
    hash: "",
    ...typeof to === "string" ? parsePath(to) : to,
    state,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: to && to.key || key || createKey(),
    mask
  };
  return location;
}
function createPath({
  pathname = "/",
  search = "",
  hash = ""
}) {
  if (search && search !== "?")
    pathname += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#")
    pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
  return pathname;
}
function parsePath(path) {
  let parsedPath = {};
  if (path) {
    let hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      parsedPath.hash = path.substring(hashIndex);
      path = path.substring(0, hashIndex);
    }
    let searchIndex = path.indexOf("?");
    if (searchIndex >= 0) {
      parsedPath.search = path.substring(searchIndex);
      path = path.substring(0, searchIndex);
    }
    if (path) {
      parsedPath.pathname = path;
    }
  }
  return parsedPath;
}
function getUrlBasedHistory(getLocation, createHref2, validateLocation, options = {}) {
  let { window: window2 = document.defaultView, v5Compat = false } = options;
  let globalHistory = window2.history;
  let action = "POP";
  let listener = null;
  let index = getIndex();
  if (index == null) {
    index = 0;
    globalHistory.replaceState({ ...globalHistory.state, idx: index }, "");
  }
  function getIndex() {
    let state = globalHistory.state || { idx: null };
    return state.idx;
  }
  function handlePop() {
    action = "POP";
    let nextIndex = getIndex();
    let delta = nextIndex == null ? null : nextIndex - index;
    index = nextIndex;
    if (listener) {
      listener({ action, location: history.location, delta });
    }
  }
  function push(to, state) {
    action = "PUSH";
    let location = isLocation(to) ? to : createLocation(history.location, to, state);
    index = getIndex() + 1;
    let historyState = getHistoryState(location, index);
    let url = history.createHref(location.mask || location);
    try {
      globalHistory.pushState(historyState, "", url);
    } catch (error) {
      if (error instanceof DOMException && error.name === "DataCloneError") {
        throw error;
      }
      window2.location.assign(url);
    }
    if (v5Compat && listener) {
      listener({ action, location: history.location, delta: 1 });
    }
  }
  function replace2(to, state) {
    action = "REPLACE";
    let location = isLocation(to) ? to : createLocation(history.location, to, state);
    index = getIndex();
    let historyState = getHistoryState(location, index);
    let url = history.createHref(location.mask || location);
    globalHistory.replaceState(historyState, "", url);
    if (v5Compat && listener) {
      listener({ action, location: history.location, delta: 0 });
    }
  }
  function createURL(to) {
    return createBrowserURLImpl(window2, to);
  }
  let history = {
    get action() {
      return action;
    },
    get location() {
      return getLocation(window2, globalHistory);
    },
    listen(fn) {
      if (listener) {
        throw new Error("A history only accepts one active listener");
      }
      window2.addEventListener(PopStateEventType, handlePop);
      listener = fn;
      return () => {
        window2.removeEventListener(PopStateEventType, handlePop);
        listener = null;
      };
    },
    createHref(to) {
      return createHref2(window2, to);
    },
    createURL,
    encodeLocation(to) {
      let url = createURL(to);
      return {
        pathname: url.pathname,
        search: url.search,
        hash: url.hash
      };
    },
    push,
    replace: replace2,
    go(n) {
      return globalHistory.go(n);
    }
  };
  return history;
}
function createBrowserURLImpl(windowImpl, to, isAbsolute = false) {
  let base = "http://localhost";
  if (windowImpl) {
    base = windowImpl.location.origin !== "null" ? windowImpl.location.origin : windowImpl.location.href;
  }
  invariant(base, "No window.location.(origin|href) available to create URL");
  let href = typeof to === "string" ? to : createPath(to);
  href = href.replace(/ $/, "%20");
  if (!isAbsolute && href.startsWith("//")) {
    href = base + href;
  }
  return new URL(href, base);
}
function matchRoutes(routes, locationArg, basename = "/") {
  return matchRoutesImpl(routes, locationArg, basename, false);
}
function matchRoutesImpl(routes, locationArg, basename, allowPartial, precomputedBranches) {
  let location = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
  let pathname = stripBasename(location.pathname || "/", basename);
  if (pathname == null) {
    return null;
  }
  let branches = flattenAndRankRoutes(routes);
  let matches = null;
  let decoded = decodePath(pathname);
  for (let i = 0; matches == null && i < branches.length; ++i) {
    matches = matchRouteBranch(
      branches[i],
      decoded,
      allowPartial
    );
  }
  return matches;
}
function flattenAndRankRoutes(routes) {
  let branches = flattenRoutes(routes);
  rankRouteBranches(branches);
  return branches;
}
function flattenRoutes(routes, branches = [], parentsMeta = [], parentPath = "", _hasParentOptionalSegments = false) {
  let flattenRoute = (route, index, hasParentOptionalSegments = _hasParentOptionalSegments, relativePath) => {
    let meta = {
      relativePath: relativePath === void 0 ? route.path || "" : relativePath,
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index,
      route
    };
    if (meta.relativePath.startsWith("/")) {
      if (!meta.relativePath.startsWith(parentPath) && hasParentOptionalSegments) {
        return;
      }
      invariant(
        meta.relativePath.startsWith(parentPath),
        `Absolute route path "${meta.relativePath}" nested under path "${parentPath}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      );
      meta.relativePath = meta.relativePath.slice(parentPath.length);
    }
    let path = joinPaths([parentPath, meta.relativePath]);
    let routesMeta = parentsMeta.concat(meta);
    if (route.children && route.children.length > 0) {
      invariant(
        // Our types know better, but runtime JS may not!
        // @ts-expect-error
        route.index !== true,
        `Index routes must not have child routes. Please remove all child routes from route path "${path}".`
      );
      flattenRoutes(
        route.children,
        branches,
        routesMeta,
        path,
        hasParentOptionalSegments
      );
    }
    if (route.path == null && !route.index) {
      return;
    }
    branches.push({
      path,
      score: computeScore(path, route.index),
      routesMeta
    });
  };
  routes.forEach((route, index) => {
    var _a;
    if (route.path === "" || !((_a = route.path) == null ? void 0 : _a.includes("?"))) {
      flattenRoute(route, index);
    } else {
      for (let exploded of explodeOptionalSegments(route.path)) {
        flattenRoute(route, index, true, exploded);
      }
    }
  });
  return branches;
}
function explodeOptionalSegments(path) {
  let segments = path.split("/");
  if (segments.length === 0) return [];
  let [first, ...rest] = segments;
  let isOptional = first.endsWith("?");
  let required = first.replace(/\?$/, "");
  if (rest.length === 0) {
    return isOptional ? [required, ""] : [required];
  }
  let restExploded = explodeOptionalSegments(rest.join("/"));
  let result = [];
  result.push(
    ...restExploded.map(
      (subpath) => subpath === "" ? required : [required, subpath].join("/")
    )
  );
  if (isOptional) {
    result.push(...restExploded);
  }
  return result.map(
    (exploded) => path.startsWith("/") && exploded === "" ? "/" : exploded
  );
}
function rankRouteBranches(branches) {
  branches.sort(
    (a, b) => a.score !== b.score ? b.score - a.score : compareIndexes(
      a.routesMeta.map((meta) => meta.childrenIndex),
      b.routesMeta.map((meta) => meta.childrenIndex)
    )
  );
}
var paramRe = /^:[\w-]+$/;
var dynamicSegmentValue = 3;
var indexRouteValue = 2;
var emptySegmentValue = 1;
var staticSegmentValue = 10;
var splatPenalty = -2;
var isSplat = (s) => s === "*";
function computeScore(path, index) {
  let segments = path.split("/");
  let initialScore = segments.length;
  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }
  if (index) {
    initialScore += indexRouteValue;
  }
  return segments.filter((s) => !isSplat(s)).reduce(
    (score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue),
    initialScore
  );
}
function compareIndexes(a, b) {
  let siblings = a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i]);
  return siblings ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    a[a.length - 1] - b[b.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function matchRouteBranch(branch, pathname, allowPartial = false) {
  let { routesMeta } = branch;
  let matchedParams = {};
  let matchedPathname = "/";
  let matches = [];
  for (let i = 0; i < routesMeta.length; ++i) {
    let meta = routesMeta[i];
    let end = i === routesMeta.length - 1;
    let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
    let match = matchPath(
      { path: meta.relativePath, caseSensitive: meta.caseSensitive, end },
      remainingPathname
    );
    let route = meta.route;
    if (!match && end && allowPartial && !routesMeta[routesMeta.length - 1].route.index) {
      match = matchPath(
        {
          path: meta.relativePath,
          caseSensitive: meta.caseSensitive,
          end: false
        },
        remainingPathname
      );
    }
    if (!match) {
      return null;
    }
    Object.assign(matchedParams, match.params);
    matches.push({
      // TODO: Can this as be avoided?
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(
        joinPaths([matchedPathname, match.pathnameBase])
      ),
      route
    });
    if (match.pathnameBase !== "/") {
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
    }
  }
  return matches;
}
function matchPath(pattern, pathname) {
  if (typeof pattern === "string") {
    pattern = { path: pattern, caseSensitive: false, end: true };
  }
  let [matcher, compiledParams] = compilePath(
    pattern.path,
    pattern.caseSensitive,
    pattern.end
  );
  let match = pathname.match(matcher);
  if (!match) return null;
  let matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  let captureGroups = match.slice(1);
  let params = compiledParams.reduce(
    (memo2, { paramName, isOptional }, index) => {
      if (paramName === "*") {
        let splatValue = captureGroups[index] || "";
        pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
      }
      const value = captureGroups[index];
      if (isOptional && !value) {
        memo2[paramName] = void 0;
      } else {
        memo2[paramName] = (value || "").replace(/%2F/g, "/");
      }
      return memo2;
    },
    {}
  );
  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}
function compilePath(path, caseSensitive = false, end = true) {
  warning(
    path === "*" || !path.endsWith("*") || path.endsWith("/*"),
    `Route path "${path}" will be treated as if it were "${path.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${path.replace(/\*$/, "/*")}".`
  );
  let params = [];
  let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (match, paramName, isOptional, index, str) => {
      params.push({ paramName, isOptional: isOptional != null });
      if (isOptional) {
        let nextChar = str.charAt(index + match.length);
        if (nextChar && nextChar !== "/") {
          return "/([^\\/]*)";
        }
        return "(?:/([^\\/]*))?";
      }
      return "/([^\\/]+)";
    }
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  if (path.endsWith("*")) {
    params.push({ paramName: "*" });
    regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
  } else if (end) {
    regexpSource += "\\/*$";
  } else if (path !== "" && path !== "/") {
    regexpSource += "(?:(?=\\/|$))";
  } else ;
  let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
  return [matcher, params];
}
function decodePath(value) {
  try {
    return value.split("/").map((v) => decodeURIComponent(v).replace(/\//g, "%2F")).join("/");
  } catch (error) {
    warning(
      false,
      `The URL path "${value}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${error}).`
    );
    return value;
  }
}
function stripBasename(pathname, basename) {
  if (basename === "/") return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  }
  let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
  let nextChar = pathname.charAt(startIndex);
  if (nextChar && nextChar !== "/") {
    return null;
  }
  return pathname.slice(startIndex) || "/";
}
var ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function resolvePath(to, fromPathname = "/") {
  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to === "string" ? parsePath(to) : to;
  let pathname;
  if (toPathname) {
    toPathname = removeDoubleSlashes(toPathname);
    if (toPathname.startsWith("/")) {
      pathname = resolvePathname(toPathname.substring(1), "/");
    } else {
      pathname = resolvePathname(toPathname, fromPathname);
    }
  } else {
    pathname = fromPathname;
  }
  return {
    pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}
function resolvePathname(relativePath, fromPathname) {
  let segments = removeTrailingSlash(fromPathname).split("/");
  let relativeSegments = relativePath.split("/");
  relativeSegments.forEach((segment) => {
    if (segment === "..") {
      if (segments.length > 1) segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return segments.length > 1 ? segments.join("/") : "/";
}
function getInvalidPathError(char, field, dest, path) {
  return `Cannot include a '${char}' character in a manually specified \`to.${field}\` field [${JSON.stringify(
    path
  )}].  Please separate it out to the \`to.${dest}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function getPathContributingMatches(matches) {
  return matches.filter(
    (match, index) => index === 0 || match.route.path && match.route.path.length > 0
  );
}
function getResolveToMatches(matches) {
  let pathMatches = getPathContributingMatches(matches);
  return pathMatches.map(
    (match, idx) => idx === pathMatches.length - 1 ? match.pathname : match.pathnameBase
  );
}
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative = false) {
  let to;
  if (typeof toArg === "string") {
    to = parsePath(toArg);
  } else {
    to = { ...toArg };
    invariant(
      !to.pathname || !to.pathname.includes("?"),
      getInvalidPathError("?", "pathname", "search", to)
    );
    invariant(
      !to.pathname || !to.pathname.includes("#"),
      getInvalidPathError("#", "pathname", "hash", to)
    );
    invariant(
      !to.search || !to.search.includes("#"),
      getInvalidPathError("#", "search", "hash", to)
    );
  }
  let isEmptyPath = toArg === "" || to.pathname === "";
  let toPathname = isEmptyPath ? "/" : to.pathname;
  let from;
  if (toPathname == null) {
    from = locationPathname;
  } else {
    let routePathnameIndex = routePathnames.length - 1;
    if (!isPathRelative && toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/");
      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }
      to.pathname = toSegments.join("/");
    }
    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }
  let path = resolvePath(to, from);
  let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
  let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
  if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
    path.pathname += "/";
  }
  return path;
}
var removeDoubleSlashes = (path) => path.replace(/\/\/+/g, "/");
var joinPaths = (paths) => removeDoubleSlashes(paths.join("/"));
var removeTrailingSlash = (path) => path.replace(/\/+$/, "");
var normalizePathname = (pathname) => removeTrailingSlash(pathname).replace(/^\/*/, "/");
var normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
var normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
var ErrorResponseImpl = class {
  constructor(status, statusText, data2, internal = false) {
    this.status = status;
    this.statusText = statusText || "";
    this.internal = internal;
    if (data2 instanceof Error) {
      this.data = data2.toString();
      this.error = data2;
    } else {
      this.data = data2;
    }
  }
};
function isRouteErrorResponse(error) {
  return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
}
function getRoutePattern(matches) {
  let parts = matches.map((m) => m.route.path).filter(Boolean);
  return joinPaths(parts) || "/";
}
var isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
function parseToInfo(_to, basename) {
  let to = _to;
  if (typeof to !== "string" || !ABSOLUTE_URL_REGEX.test(to)) {
    return {
      absoluteURL: void 0,
      isExternal: false,
      to
    };
  }
  let absoluteURL = to;
  let isExternal = false;
  if (isBrowser) {
    try {
      let currentUrl = new URL(window.location.href);
      let targetUrl = to.startsWith("//") ? new URL(currentUrl.protocol + to) : new URL(to);
      let path = stripBasename(targetUrl.pathname, basename);
      if (targetUrl.origin === currentUrl.origin && path != null) {
        to = path + targetUrl.search + targetUrl.hash;
      } else {
        isExternal = true;
      }
    } catch (e) {
      warning(
        false,
        `<Link to="${to}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  }
  return {
    absoluteURL,
    isExternal,
    to
  };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var validMutationMethodsArr = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
];
new Set(
  validMutationMethodsArr
);
var validRequestMethodsArr = [
  "GET",
  ...validMutationMethodsArr
];
new Set(validRequestMethodsArr);
var DataRouterContext = reactExports.createContext(null);
DataRouterContext.displayName = "DataRouter";
var DataRouterStateContext = reactExports.createContext(null);
DataRouterStateContext.displayName = "DataRouterState";
var RSCRouterContext = reactExports.createContext(false);
function useIsRSCRouterContext() {
  return reactExports.useContext(RSCRouterContext);
}
var ViewTransitionContext = reactExports.createContext({
  isTransitioning: false
});
ViewTransitionContext.displayName = "ViewTransition";
var FetchersContext = reactExports.createContext(
  /* @__PURE__ */ new Map()
);
FetchersContext.displayName = "Fetchers";
var AwaitContext = reactExports.createContext(null);
AwaitContext.displayName = "Await";
var NavigationContext = reactExports.createContext(
  null
);
NavigationContext.displayName = "Navigation";
var LocationContext = reactExports.createContext(
  null
);
LocationContext.displayName = "Location";
var RouteContext = reactExports.createContext({
  outlet: null,
  matches: [],
  isDataRoute: false
});
RouteContext.displayName = "Route";
var RouteErrorContext = reactExports.createContext(null);
RouteErrorContext.displayName = "RouteError";
var ERROR_DIGEST_BASE = "REACT_ROUTER_ERROR";
var ERROR_DIGEST_REDIRECT = "REDIRECT";
var ERROR_DIGEST_ROUTE_ERROR_RESPONSE = "ROUTE_ERROR_RESPONSE";
function decodeRedirectErrorDigest(digest) {
  if (digest.startsWith(`${ERROR_DIGEST_BASE}:${ERROR_DIGEST_REDIRECT}:{`)) {
    try {
      let parsed = JSON.parse(digest.slice(28));
      if (typeof parsed === "object" && parsed && typeof parsed.status === "number" && typeof parsed.statusText === "string" && typeof parsed.location === "string" && typeof parsed.reloadDocument === "boolean" && typeof parsed.replace === "boolean") {
        return parsed;
      }
    } catch {
    }
  }
}
function decodeRouteErrorResponseDigest(digest) {
  if (digest.startsWith(
    `${ERROR_DIGEST_BASE}:${ERROR_DIGEST_ROUTE_ERROR_RESPONSE}:{`
  )) {
    try {
      let parsed = JSON.parse(digest.slice(40));
      if (typeof parsed === "object" && parsed && typeof parsed.status === "number" && typeof parsed.statusText === "string") {
        return new ErrorResponseImpl(
          parsed.status,
          parsed.statusText,
          parsed.data
        );
      }
    } catch {
    }
  }
}
function useHref(to, { relative } = {}) {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useHref() may be used only in the context of a <Router> component.`
  );
  let { basename, navigator: navigator2 } = reactExports.useContext(NavigationContext);
  let { hash, pathname, search } = useResolvedPath(to, { relative });
  let joinedPathname = pathname;
  if (basename !== "/") {
    joinedPathname = pathname === "/" ? basename : joinPaths([basename, pathname]);
  }
  return navigator2.createHref({ pathname: joinedPathname, search, hash });
}
function useInRouterContext() {
  return reactExports.useContext(LocationContext) != null;
}
function useLocation() {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useLocation() may be used only in the context of a <Router> component.`
  );
  return reactExports.useContext(LocationContext).location;
}
var navigateEffectWarning = `You should call navigate() in a React.useEffect(), not when your component is first rendered.`;
function useIsomorphicLayoutEffect(cb) {
  let isStatic = reactExports.useContext(NavigationContext).static;
  if (!isStatic) {
    reactExports.useLayoutEffect(cb);
  }
}
function useNavigate() {
  let { isDataRoute } = reactExports.useContext(RouteContext);
  return isDataRoute ? useNavigateStable() : useNavigateUnstable();
}
function useNavigateUnstable() {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useNavigate() may be used only in the context of a <Router> component.`
  );
  let dataRouterContext = reactExports.useContext(DataRouterContext);
  let { basename, navigator: navigator2 } = reactExports.useContext(NavigationContext);
  let { matches } = reactExports.useContext(RouteContext);
  let { pathname: locationPathname } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches));
  let activeRef = reactExports.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = reactExports.useCallback(
    (to, options = {}) => {
      warning(activeRef.current, navigateEffectWarning);
      if (!activeRef.current) return;
      if (typeof to === "number") {
        navigator2.go(to);
        return;
      }
      let path = resolveTo(
        to,
        JSON.parse(routePathnamesJson),
        locationPathname,
        options.relative === "path"
      );
      if (dataRouterContext == null && basename !== "/") {
        path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
      }
      (!!options.replace ? navigator2.replace : navigator2.push)(
        path,
        options.state,
        options
      );
    },
    [
      basename,
      navigator2,
      routePathnamesJson,
      locationPathname,
      dataRouterContext
    ]
  );
  return navigate;
}
var OutletContext = reactExports.createContext(null);
function useOutlet(context) {
  let outlet = reactExports.useContext(RouteContext).outlet;
  return reactExports.useMemo(
    () => outlet && /* @__PURE__ */ reactExports.createElement(OutletContext.Provider, { value: context }, outlet),
    [outlet, context]
  );
}
function useResolvedPath(to, { relative } = {}) {
  let { matches } = reactExports.useContext(RouteContext);
  let { pathname: locationPathname } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches));
  return reactExports.useMemo(
    () => resolveTo(
      to,
      JSON.parse(routePathnamesJson),
      locationPathname,
      relative === "path"
    ),
    [to, routePathnamesJson, locationPathname, relative]
  );
}
function useRoutes(routes, locationArg) {
  return useRoutesImpl(routes, locationArg);
}
function useRoutesImpl(routes, locationArg, dataRouterOpts) {
  var _a;
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useRoutes() may be used only in the context of a <Router> component.`
  );
  let { navigator: navigator2 } = reactExports.useContext(NavigationContext);
  let { matches: parentMatches } = reactExports.useContext(RouteContext);
  let routeMatch = parentMatches[parentMatches.length - 1];
  let parentParams = routeMatch ? routeMatch.params : {};
  let parentPathname = routeMatch ? routeMatch.pathname : "/";
  let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
  let parentRoute = routeMatch && routeMatch.route;
  {
    let parentPath = parentRoute && parentRoute.path || "";
    warningOnce(
      parentPathname,
      !parentRoute || parentPath.endsWith("*") || parentPath.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${parentPathname}" (under <Route path="${parentPath}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${parentPath}"> to <Route path="${parentPath === "/" ? "*" : `${parentPath}/*`}">.`
    );
  }
  let locationFromContext = useLocation();
  let location;
  if (locationArg) {
    let parsedLocationArg = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
    invariant(
      parentPathnameBase === "/" || ((_a = parsedLocationArg.pathname) == null ? void 0 : _a.startsWith(parentPathnameBase)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${parentPathnameBase}" but pathname "${parsedLocationArg.pathname}" was given in the \`location\` prop.`
    );
    location = parsedLocationArg;
  } else {
    location = locationFromContext;
  }
  let pathname = location.pathname || "/";
  let remainingPathname = pathname;
  if (parentPathnameBase !== "/") {
    let parentSegments = parentPathnameBase.replace(/^\//, "").split("/");
    let segments = pathname.replace(/^\//, "").split("/");
    remainingPathname = "/" + segments.slice(parentSegments.length).join("/");
  }
  let matches = dataRouterOpts && dataRouterOpts.state.matches.length ? (
    // If we're in a data router, use the matches we've already identified but ensure
    // we have the latest route instances from the manifest in case elements have changed
    dataRouterOpts.state.matches.map(
      (m) => Object.assign(m, {
        route: dataRouterOpts.manifest[m.route.id] || m.route
      })
    )
  ) : matchRoutes(routes, { pathname: remainingPathname });
  {
    warning(
      parentRoute || matches != null,
      `No routes matched location "${location.pathname}${location.search}${location.hash}" `
    );
    warning(
      matches == null || matches[matches.length - 1].route.element !== void 0 || matches[matches.length - 1].route.Component !== void 0 || matches[matches.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${location.pathname}${location.search}${location.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    );
  }
  let renderedMatches = _renderMatches(
    matches && matches.map(
      (match) => Object.assign({}, match, {
        params: Object.assign({}, parentParams, match.params),
        pathname: joinPaths([
          parentPathnameBase,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          navigator2.encodeLocation ? navigator2.encodeLocation(
            match.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : match.pathname
        ]),
        pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([
          parentPathnameBase,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          navigator2.encodeLocation ? navigator2.encodeLocation(
            match.pathnameBase.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : match.pathnameBase
        ])
      })
    ),
    parentMatches,
    dataRouterOpts
  );
  if (locationArg && renderedMatches) {
    return /* @__PURE__ */ reactExports.createElement(
      LocationContext.Provider,
      {
        value: {
          location: {
            pathname: "/",
            search: "",
            hash: "",
            state: null,
            key: "default",
            mask: void 0,
            ...location
          },
          navigationType: "POP"
          /* Pop */
        }
      },
      renderedMatches
    );
  }
  return renderedMatches;
}
function DefaultErrorComponent() {
  let error = useRouteError();
  let message = isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : error instanceof Error ? error.message : JSON.stringify(error);
  let stack = error instanceof Error ? error.stack : null;
  let lightgrey = "rgba(200,200,200, 0.5)";
  let preStyles = { padding: "0.5rem", backgroundColor: lightgrey };
  let codeStyles = { padding: "2px 4px", backgroundColor: lightgrey };
  let devInfo = null;
  {
    console.error(
      "Error handled by React Router default ErrorBoundary:",
      error
    );
    devInfo = /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ reactExports.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ reactExports.createElement("code", { style: codeStyles }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ reactExports.createElement("code", { style: codeStyles }, "errorElement"), " prop on your route."));
  }
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ reactExports.createElement("h3", { style: { fontStyle: "italic" } }, message), stack ? /* @__PURE__ */ reactExports.createElement("pre", { style: preStyles }, stack) : null, devInfo);
}
var defaultErrorElement = /* @__PURE__ */ reactExports.createElement(DefaultErrorComponent, null);
var RenderErrorBoundary = class extends reactExports.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.location,
      revalidation: props.revalidation,
      error: props.error
    };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  static getDerivedStateFromProps(props, state) {
    if (state.location !== props.location || state.revalidation !== "idle" && props.revalidation === "idle") {
      return {
        error: props.error,
        location: props.location,
        revalidation: props.revalidation
      };
    }
    return {
      error: props.error !== void 0 ? props.error : state.error,
      location: state.location,
      revalidation: props.revalidation || state.revalidation
    };
  }
  componentDidCatch(error, errorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    } else {
      console.error(
        "React Router caught the following error during render",
        error
      );
    }
  }
  render() {
    let error = this.state.error;
    if (this.context && typeof error === "object" && error && "digest" in error && typeof error.digest === "string") {
      const decoded = decodeRouteErrorResponseDigest(error.digest);
      if (decoded) error = decoded;
    }
    let result = error !== void 0 ? /* @__PURE__ */ reactExports.createElement(RouteContext.Provider, { value: this.props.routeContext }, /* @__PURE__ */ reactExports.createElement(
      RouteErrorContext.Provider,
      {
        value: error,
        children: this.props.component
      }
    )) : this.props.children;
    if (this.context) {
      return /* @__PURE__ */ reactExports.createElement(RSCErrorHandler, { error }, result);
    }
    return result;
  }
};
RenderErrorBoundary.contextType = RSCRouterContext;
var errorRedirectHandledMap = /* @__PURE__ */ new WeakMap();
function RSCErrorHandler({
  children,
  error
}) {
  let { basename } = reactExports.useContext(NavigationContext);
  if (typeof error === "object" && error && "digest" in error && typeof error.digest === "string") {
    let redirect2 = decodeRedirectErrorDigest(error.digest);
    if (redirect2) {
      let existingRedirect = errorRedirectHandledMap.get(error);
      if (existingRedirect) throw existingRedirect;
      let parsed = parseToInfo(redirect2.location, basename);
      if (isBrowser && !errorRedirectHandledMap.get(error)) {
        if (parsed.isExternal || redirect2.reloadDocument) {
          window.location.href = parsed.absoluteURL || parsed.to;
        } else {
          const redirectPromise = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(parsed.to, {
              replace: redirect2.replace
            })
          );
          errorRedirectHandledMap.set(error, redirectPromise);
          throw redirectPromise;
        }
      }
      return /* @__PURE__ */ reactExports.createElement(
        "meta",
        {
          httpEquiv: "refresh",
          content: `0;url=${parsed.absoluteURL || parsed.to}`
        }
      );
    }
  }
  return children;
}
function RenderedRoute({ routeContext, match, children }) {
  let dataRouterContext = reactExports.useContext(DataRouterContext);
  if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary)) {
    dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
  }
  return /* @__PURE__ */ reactExports.createElement(RouteContext.Provider, { value: routeContext }, children);
}
function _renderMatches(matches, parentMatches = [], dataRouterOpts) {
  let dataRouterState = dataRouterOpts == null ? void 0 : dataRouterOpts.state;
  if (matches == null) {
    if (!dataRouterState) {
      return null;
    }
    if (dataRouterState.errors) {
      matches = dataRouterState.matches;
    } else if (parentMatches.length === 0 && !dataRouterState.initialized && dataRouterState.matches.length > 0) {
      matches = dataRouterState.matches;
    } else {
      return null;
    }
  }
  let renderedMatches = matches;
  let errors = dataRouterState == null ? void 0 : dataRouterState.errors;
  if (errors != null) {
    let errorIndex = renderedMatches.findIndex(
      (m) => m.route.id && (errors == null ? void 0 : errors[m.route.id]) !== void 0
    );
    invariant(
      errorIndex >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        errors
      ).join(",")}`
    );
    renderedMatches = renderedMatches.slice(
      0,
      Math.min(renderedMatches.length, errorIndex + 1)
    );
  }
  let renderFallback = false;
  let fallbackIndex = -1;
  if (dataRouterOpts && dataRouterState) {
    renderFallback = dataRouterState.renderFallback;
    for (let i = 0; i < renderedMatches.length; i++) {
      let match = renderedMatches[i];
      if (match.route.HydrateFallback || match.route.hydrateFallbackElement) {
        fallbackIndex = i;
      }
      if (match.route.id) {
        let { loaderData, errors: errors2 } = dataRouterState;
        let needsToRunLoader = match.route.loader && !loaderData.hasOwnProperty(match.route.id) && (!errors2 || errors2[match.route.id] === void 0);
        if (match.route.lazy || needsToRunLoader) {
          if (dataRouterOpts.isStatic) {
            renderFallback = true;
          }
          if (fallbackIndex >= 0) {
            renderedMatches = renderedMatches.slice(0, fallbackIndex + 1);
          } else {
            renderedMatches = [renderedMatches[0]];
          }
          break;
        }
      }
    }
  }
  let onErrorHandler = dataRouterOpts == null ? void 0 : dataRouterOpts.onError;
  let onError = dataRouterState && onErrorHandler ? (error, errorInfo) => {
    var _a, _b;
    onErrorHandler(error, {
      location: dataRouterState.location,
      params: ((_b = (_a = dataRouterState.matches) == null ? void 0 : _a[0]) == null ? void 0 : _b.params) ?? {},
      pattern: getRoutePattern(dataRouterState.matches),
      errorInfo
    });
  } : void 0;
  return renderedMatches.reduceRight(
    (outlet, match, index) => {
      let error;
      let shouldRenderHydrateFallback = false;
      let errorElement = null;
      let hydrateFallbackElement = null;
      if (dataRouterState) {
        error = errors && match.route.id ? errors[match.route.id] : void 0;
        errorElement = match.route.errorElement || defaultErrorElement;
        if (renderFallback) {
          if (fallbackIndex < 0 && index === 0) {
            warningOnce(
              "route-fallback",
              false,
              "No `HydrateFallback` element provided to render during initial hydration"
            );
            shouldRenderHydrateFallback = true;
            hydrateFallbackElement = null;
          } else if (fallbackIndex === index) {
            shouldRenderHydrateFallback = true;
            hydrateFallbackElement = match.route.hydrateFallbackElement || null;
          }
        }
      }
      let matches2 = parentMatches.concat(renderedMatches.slice(0, index + 1));
      let getChildren = () => {
        let children;
        if (error) {
          children = errorElement;
        } else if (shouldRenderHydrateFallback) {
          children = hydrateFallbackElement;
        } else if (match.route.Component) {
          children = /* @__PURE__ */ reactExports.createElement(match.route.Component, null);
        } else if (match.route.element) {
          children = match.route.element;
        } else {
          children = outlet;
        }
        return /* @__PURE__ */ reactExports.createElement(
          RenderedRoute,
          {
            match,
            routeContext: {
              outlet,
              matches: matches2,
              isDataRoute: dataRouterState != null
            },
            children
          }
        );
      };
      return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index === 0) ? /* @__PURE__ */ reactExports.createElement(
        RenderErrorBoundary,
        {
          location: dataRouterState.location,
          revalidation: dataRouterState.revalidation,
          component: errorElement,
          error,
          children: getChildren(),
          routeContext: { outlet: null, matches: matches2, isDataRoute: true },
          onError
        }
      ) : getChildren();
    },
    null
  );
}
function getDataRouterConsoleError(hookName) {
  return `${hookName} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function useDataRouterContext(hookName) {
  let ctx = reactExports.useContext(DataRouterContext);
  invariant(ctx, getDataRouterConsoleError(hookName));
  return ctx;
}
function useDataRouterState(hookName) {
  let state = reactExports.useContext(DataRouterStateContext);
  invariant(state, getDataRouterConsoleError(hookName));
  return state;
}
function useRouteContext(hookName) {
  let route = reactExports.useContext(RouteContext);
  invariant(route, getDataRouterConsoleError(hookName));
  return route;
}
function useCurrentRouteId(hookName) {
  let route = useRouteContext(hookName);
  let thisRoute = route.matches[route.matches.length - 1];
  invariant(
    thisRoute.route.id,
    `${hookName} can only be used on routes that contain a unique "id"`
  );
  return thisRoute.route.id;
}
function useRouteId() {
  return useCurrentRouteId(
    "useRouteId"
    /* UseRouteId */
  );
}
function useRouteError() {
  var _a;
  let error = reactExports.useContext(RouteErrorContext);
  let state = useDataRouterState(
    "useRouteError"
    /* UseRouteError */
  );
  let routeId = useCurrentRouteId(
    "useRouteError"
    /* UseRouteError */
  );
  if (error !== void 0) {
    return error;
  }
  return (_a = state.errors) == null ? void 0 : _a[routeId];
}
function useNavigateStable() {
  let { router } = useDataRouterContext(
    "useNavigate"
    /* UseNavigateStable */
  );
  let id = useCurrentRouteId(
    "useNavigate"
    /* UseNavigateStable */
  );
  let activeRef = reactExports.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = reactExports.useCallback(
    async (to, options = {}) => {
      warning(activeRef.current, navigateEffectWarning);
      if (!activeRef.current) return;
      if (typeof to === "number") {
        await router.navigate(to);
      } else {
        await router.navigate(to, { fromRouteId: id, ...options });
      }
    },
    [router, id]
  );
  return navigate;
}
var alreadyWarned = {};
function warningOnce(key, cond, message) {
  if (!cond && !alreadyWarned[key]) {
    alreadyWarned[key] = true;
    warning(false, message);
  }
}
reactExports.memo(DataRoutes2);
function DataRoutes2({
  routes,
  manifest,
  future,
  state,
  isStatic,
  onError
}) {
  return useRoutesImpl(routes, void 0, {
    manifest,
    state,
    isStatic,
    onError
  });
}
function Navigate({
  to,
  replace: replace2,
  state,
  relative
}) {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of
    // the router loaded. We can help them understand how to avoid that.
    `<Navigate> may be used only in the context of a <Router> component.`
  );
  let { static: isStatic } = reactExports.useContext(NavigationContext);
  warning(
    !isStatic,
    `<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.`
  );
  let { matches } = reactExports.useContext(RouteContext);
  let { pathname: locationPathname } = useLocation();
  let navigate = useNavigate();
  let path = resolveTo(
    to,
    getResolveToMatches(matches),
    locationPathname,
    relative === "path"
  );
  let jsonPath = JSON.stringify(path);
  reactExports.useEffect(() => {
    navigate(JSON.parse(jsonPath), { replace: replace2, state, relative });
  }, [navigate, jsonPath, relative, replace2, state]);
  return null;
}
function Outlet(props) {
  return useOutlet(props.context);
}
function Route(props) {
  invariant(
    false,
    `A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.`
  );
}
function Router({
  basename: basenameProp = "/",
  children = null,
  location: locationProp,
  navigationType = "POP",
  navigator: navigator2,
  static: staticProp = false,
  useTransitions
}) {
  invariant(
    !useInRouterContext(),
    `You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`
  );
  let basename = basenameProp.replace(/^\/*/, "/");
  let navigationContext = reactExports.useMemo(
    () => ({
      basename,
      navigator: navigator2,
      static: staticProp,
      useTransitions,
      future: {}
    }),
    [basename, navigator2, staticProp, useTransitions]
  );
  if (typeof locationProp === "string") {
    locationProp = parsePath(locationProp);
  }
  let {
    pathname = "/",
    search = "",
    hash = "",
    state = null,
    key = "default",
    mask
  } = locationProp;
  let locationContext = reactExports.useMemo(() => {
    let trailingPathname = stripBasename(pathname, basename);
    if (trailingPathname == null) {
      return null;
    }
    return {
      location: {
        pathname: trailingPathname,
        search,
        hash,
        state,
        key,
        mask
      },
      navigationType
    };
  }, [basename, pathname, search, hash, state, key, navigationType, mask]);
  warning(
    locationContext != null,
    `<Router basename="${basename}"> is not able to match the URL "${pathname}${search}${hash}" because it does not start with the basename, so the <Router> won't render anything.`
  );
  if (locationContext == null) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(NavigationContext.Provider, { value: navigationContext }, /* @__PURE__ */ reactExports.createElement(LocationContext.Provider, { children, value: locationContext }));
}
function Routes({
  children,
  location
}) {
  return useRoutes(createRoutesFromChildren(children), location);
}
function createRoutesFromChildren(children, parentPath = []) {
  let routes = [];
  reactExports.Children.forEach(children, (element, index) => {
    if (!reactExports.isValidElement(element)) {
      return;
    }
    let treePath = [...parentPath, index];
    if (element.type === reactExports.Fragment) {
      routes.push.apply(
        routes,
        createRoutesFromChildren(element.props.children, treePath)
      );
      return;
    }
    invariant(
      element.type === Route,
      `[${typeof element.type === "string" ? element.type : element.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
    );
    invariant(
      !element.props.index || !element.props.children,
      "An index route cannot have child routes."
    );
    let route = {
      id: element.props.id || treePath.join("-"),
      caseSensitive: element.props.caseSensitive,
      element: element.props.element,
      Component: element.props.Component,
      index: element.props.index,
      path: element.props.path,
      middleware: element.props.middleware,
      loader: element.props.loader,
      action: element.props.action,
      hydrateFallbackElement: element.props.hydrateFallbackElement,
      HydrateFallback: element.props.HydrateFallback,
      errorElement: element.props.errorElement,
      ErrorBoundary: element.props.ErrorBoundary,
      hasErrorBoundary: element.props.hasErrorBoundary === true || element.props.ErrorBoundary != null || element.props.errorElement != null,
      shouldRevalidate: element.props.shouldRevalidate,
      handle: element.props.handle,
      lazy: element.props.lazy
    };
    if (element.props.children) {
      route.children = createRoutesFromChildren(
        element.props.children,
        treePath
      );
    }
    routes.push(route);
  });
  return routes;
}
var defaultMethod = "get";
var defaultEncType = "application/x-www-form-urlencoded";
function isHtmlElement(object) {
  return typeof HTMLElement !== "undefined" && object instanceof HTMLElement;
}
function isButtonElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "button";
}
function isFormElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "form";
}
function isInputElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "input";
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
function shouldProcessLinkClick(event, target) {
  return event.button === 0 && // Ignore everything but left clicks
  (!target || target === "_self") && // Let browser handle "target=_blank" etc.
  !isModifiedEvent(event);
}
var _formDataSupportsSubmitter = null;
function isFormDataSubmitterSupported() {
  if (_formDataSupportsSubmitter === null) {
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      );
      _formDataSupportsSubmitter = false;
    } catch (e) {
      _formDataSupportsSubmitter = true;
    }
  }
  return _formDataSupportsSubmitter;
}
var supportedFormEncTypes = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function getFormEncType(encType) {
  if (encType != null && !supportedFormEncTypes.has(encType)) {
    warning(
      false,
      `"${encType}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${defaultEncType}"`
    );
    return null;
  }
  return encType;
}
function getFormSubmissionInfo(target, basename) {
  let method;
  let action;
  let encType;
  let formData;
  let body;
  if (isFormElement(target)) {
    let attr = target.getAttribute("action");
    action = attr ? stripBasename(attr, basename) : null;
    method = target.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("enctype")) || defaultEncType;
    formData = new FormData(target);
  } else if (isButtonElement(target) || isInputElement(target) && (target.type === "submit" || target.type === "image")) {
    let form = target.form;
    if (form == null) {
      throw new Error(
        `Cannot submit a <button> or <input type="submit"> without a <form>`
      );
    }
    let attr = target.getAttribute("formaction") || form.getAttribute("action");
    action = attr ? stripBasename(attr, basename) : null;
    method = target.getAttribute("formmethod") || form.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("formenctype")) || getFormEncType(form.getAttribute("enctype")) || defaultEncType;
    formData = new FormData(form, target);
    if (!isFormDataSubmitterSupported()) {
      let { name, type, value } = target;
      if (type === "image") {
        let prefix = name ? `${name}.` : "";
        formData.append(`${prefix}x`, "0");
        formData.append(`${prefix}y`, "0");
      } else if (name) {
        formData.append(name, value);
      }
    }
  } else if (isHtmlElement(target)) {
    throw new Error(
      `Cannot submit element that is not <form>, <button>, or <input type="submit|image">`
    );
  } else {
    method = defaultMethod;
    action = null;
    encType = defaultEncType;
    body = target;
  }
  if (formData && encType === "text/plain") {
    body = formData;
    formData = void 0;
  }
  return { action, method: method.toLowerCase(), encType, formData, body };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function invariant2(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
function singleFetchUrl(reqUrl, basename, trailingSlashAware, extension) {
  let url = typeof reqUrl === "string" ? new URL(
    reqUrl,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window === "undefined" ? "server://singlefetch/" : window.location.origin
  ) : reqUrl;
  if (trailingSlashAware) {
    if (url.pathname.endsWith("/")) {
      url.pathname = `${url.pathname}_.${extension}`;
    } else {
      url.pathname = `${url.pathname}.${extension}`;
    }
  } else {
    if (url.pathname === "/") {
      url.pathname = `_root.${extension}`;
    } else if (basename && stripBasename(url.pathname, basename) === "/") {
      url.pathname = `${removeTrailingSlash(basename)}/_root.${extension}`;
    } else {
      url.pathname = `${removeTrailingSlash(url.pathname)}.${extension}`;
    }
  }
  return url;
}
async function loadRouteModule(route, routeModulesCache) {
  if (route.id in routeModulesCache) {
    return routeModulesCache[route.id];
  }
  try {
    let routeModule = await import(
      /* @vite-ignore */
      /* webpackIgnore: true */
      route.module
    );
    routeModulesCache[route.id] = routeModule;
    return routeModule;
  } catch (error) {
    console.error(
      `Error loading route module \`${route.module}\`, reloading page...`
    );
    console.error(error);
    if (window.__reactRouterContext && window.__reactRouterContext.isSpaMode && // @ts-expect-error
    void 0) ;
    window.location.reload();
    return new Promise(() => {
    });
  }
}
function isHtmlLinkDescriptor(object) {
  if (object == null) {
    return false;
  }
  if (object.href == null) {
    return object.rel === "preload" && typeof object.imageSrcSet === "string" && typeof object.imageSizes === "string";
  }
  return typeof object.rel === "string" && typeof object.href === "string";
}
async function getKeyedPrefetchLinks(matches, manifest, routeModules) {
  let links = await Promise.all(
    matches.map(async (match) => {
      let route = manifest.routes[match.route.id];
      if (route) {
        let mod = await loadRouteModule(route, routeModules);
        return mod.links ? mod.links() : [];
      }
      return [];
    })
  );
  return dedupeLinkDescriptors(
    links.flat(1).filter(isHtmlLinkDescriptor).filter((link) => link.rel === "stylesheet" || link.rel === "preload").map(
      (link) => link.rel === "stylesheet" ? { ...link, rel: "prefetch", as: "style" } : { ...link, rel: "prefetch" }
    )
  );
}
function getNewMatchesForLinks(page, nextMatches, currentMatches, manifest, location, mode) {
  let isNew = (match, index) => {
    if (!currentMatches[index]) return true;
    return match.route.id !== currentMatches[index].route.id;
  };
  let matchPathChanged = (match, index) => {
    var _a;
    return (
      // param change, /users/123 -> /users/456
      currentMatches[index].pathname !== match.pathname || // splat param changed, which is not present in match.path
      // e.g. /files/images/avatar.jpg -> files/finances.xls
      ((_a = currentMatches[index].route.path) == null ? void 0 : _a.endsWith("*")) && currentMatches[index].params["*"] !== match.params["*"]
    );
  };
  if (mode === "assets") {
    return nextMatches.filter(
      (match, index) => isNew(match, index) || matchPathChanged(match, index)
    );
  }
  if (mode === "data") {
    return nextMatches.filter((match, index) => {
      var _a;
      let manifestRoute = manifest.routes[match.route.id];
      if (!manifestRoute || !manifestRoute.hasLoader) {
        return false;
      }
      if (isNew(match, index) || matchPathChanged(match, index)) {
        return true;
      }
      if (match.route.shouldRevalidate) {
        let routeChoice = match.route.shouldRevalidate({
          currentUrl: new URL(
            location.pathname + location.search + location.hash,
            window.origin
          ),
          currentParams: ((_a = currentMatches[0]) == null ? void 0 : _a.params) || {},
          nextUrl: new URL(page, window.origin),
          nextParams: match.params,
          defaultShouldRevalidate: true
        });
        if (typeof routeChoice === "boolean") {
          return routeChoice;
        }
      }
      return true;
    });
  }
  return [];
}
function getModuleLinkHrefs(matches, manifest, { includeHydrateFallback } = {}) {
  return dedupeHrefs(
    matches.map((match) => {
      let route = manifest.routes[match.route.id];
      if (!route) return [];
      let hrefs = [route.module];
      if (route.clientActionModule) {
        hrefs = hrefs.concat(route.clientActionModule);
      }
      if (route.clientLoaderModule) {
        hrefs = hrefs.concat(route.clientLoaderModule);
      }
      if (includeHydrateFallback && route.hydrateFallbackModule) {
        hrefs = hrefs.concat(route.hydrateFallbackModule);
      }
      if (route.imports) {
        hrefs = hrefs.concat(route.imports);
      }
      return hrefs;
    }).flat(1)
  );
}
function dedupeHrefs(hrefs) {
  return [...new Set(hrefs)];
}
function sortKeys(obj) {
  let sorted = {};
  let keys = Object.keys(obj).sort();
  for (let key of keys) {
    sorted[key] = obj[key];
  }
  return sorted;
}
function dedupeLinkDescriptors(descriptors, preloads) {
  let set = /* @__PURE__ */ new Set();
  new Set(preloads);
  return descriptors.reduce((deduped, descriptor) => {
    let key = JSON.stringify(sortKeys(descriptor));
    if (!set.has(key)) {
      set.add(key);
      deduped.push({ key, link: descriptor });
    }
    return deduped;
  }, []);
}
function useDataRouterContext2() {
  let context = reactExports.useContext(DataRouterContext);
  invariant2(
    context,
    "You must render this element inside a <DataRouterContext.Provider> element"
  );
  return context;
}
function useDataRouterStateContext() {
  let context = reactExports.useContext(DataRouterStateContext);
  invariant2(
    context,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  );
  return context;
}
var FrameworkContext = reactExports.createContext(void 0);
FrameworkContext.displayName = "FrameworkContext";
function useFrameworkContext() {
  let context = reactExports.useContext(FrameworkContext);
  invariant2(
    context,
    "You must render this element inside a <HydratedRouter> element"
  );
  return context;
}
function usePrefetchBehavior(prefetch, theirElementProps) {
  let frameworkContext = reactExports.useContext(FrameworkContext);
  let [maybePrefetch, setMaybePrefetch] = reactExports.useState(false);
  let [shouldPrefetch, setShouldPrefetch] = reactExports.useState(false);
  let { onFocus, onBlur, onMouseEnter, onMouseLeave, onTouchStart } = theirElementProps;
  let ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (prefetch === "render") {
      setShouldPrefetch(true);
    }
    if (prefetch === "viewport") {
      let callback = (entries) => {
        entries.forEach((entry) => {
          setShouldPrefetch(entry.isIntersecting);
        });
      };
      let observer = new IntersectionObserver(callback, { threshold: 0.5 });
      if (ref.current) observer.observe(ref.current);
      return () => {
        observer.disconnect();
      };
    }
  }, [prefetch]);
  reactExports.useEffect(() => {
    if (maybePrefetch) {
      let id = setTimeout(() => {
        setShouldPrefetch(true);
      }, 100);
      return () => {
        clearTimeout(id);
      };
    }
  }, [maybePrefetch]);
  let setIntent = () => {
    setMaybePrefetch(true);
  };
  let cancelIntent = () => {
    setMaybePrefetch(false);
    setShouldPrefetch(false);
  };
  if (!frameworkContext) {
    return [false, ref, {}];
  }
  if (prefetch !== "intent") {
    return [shouldPrefetch, ref, {}];
  }
  return [
    shouldPrefetch,
    ref,
    {
      onFocus: composeEventHandlers(onFocus, setIntent),
      onBlur: composeEventHandlers(onBlur, cancelIntent),
      onMouseEnter: composeEventHandlers(onMouseEnter, setIntent),
      onMouseLeave: composeEventHandlers(onMouseLeave, cancelIntent),
      onTouchStart: composeEventHandlers(onTouchStart, setIntent)
    }
  ];
}
function composeEventHandlers(theirHandler, ourHandler) {
  return (event) => {
    theirHandler && theirHandler(event);
    if (!event.defaultPrevented) {
      ourHandler(event);
    }
  };
}
function PrefetchPageLinks({ page, ...linkProps }) {
  let rsc = useIsRSCRouterContext();
  let { router } = useDataRouterContext2();
  let matches = reactExports.useMemo(
    () => matchRoutes(router.routes, page, router.basename),
    [router.routes, page, router.basename]
  );
  if (!matches) {
    return null;
  }
  if (rsc) {
    return /* @__PURE__ */ reactExports.createElement(RSCPrefetchPageLinksImpl, { page, matches, ...linkProps });
  }
  return /* @__PURE__ */ reactExports.createElement(PrefetchPageLinksImpl, { page, matches, ...linkProps });
}
function useKeyedPrefetchLinks(matches) {
  let { manifest, routeModules } = useFrameworkContext();
  let [keyedPrefetchLinks, setKeyedPrefetchLinks] = reactExports.useState([]);
  reactExports.useEffect(() => {
    let interrupted = false;
    void getKeyedPrefetchLinks(matches, manifest, routeModules).then(
      (links) => {
        if (!interrupted) {
          setKeyedPrefetchLinks(links);
        }
      }
    );
    return () => {
      interrupted = true;
    };
  }, [matches, manifest, routeModules]);
  return keyedPrefetchLinks;
}
function RSCPrefetchPageLinksImpl({
  page,
  matches: nextMatches,
  ...linkProps
}) {
  let location = useLocation();
  let { future } = useFrameworkContext();
  let { basename } = useDataRouterContext2();
  let dataHrefs = reactExports.useMemo(() => {
    if (page === location.pathname + location.search + location.hash) {
      return [];
    }
    let url = singleFetchUrl(
      page,
      basename,
      future.v8_trailingSlashAwareDataRequests,
      "rsc"
    );
    let hasSomeRoutesWithShouldRevalidate = false;
    let targetRoutes = [];
    for (let match of nextMatches) {
      if (typeof match.route.shouldRevalidate === "function") {
        hasSomeRoutesWithShouldRevalidate = true;
      } else {
        targetRoutes.push(match.route.id);
      }
    }
    if (hasSomeRoutesWithShouldRevalidate && targetRoutes.length > 0) {
      url.searchParams.set("_routes", targetRoutes.join(","));
    }
    return [url.pathname + url.search];
  }, [
    basename,
    future.v8_trailingSlashAwareDataRequests,
    page,
    location,
    nextMatches
  ]);
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, dataHrefs.map((href) => /* @__PURE__ */ reactExports.createElement("link", { key: href, rel: "prefetch", as: "fetch", href, ...linkProps })));
}
function PrefetchPageLinksImpl({
  page,
  matches: nextMatches,
  ...linkProps
}) {
  let location = useLocation();
  let { future, manifest, routeModules } = useFrameworkContext();
  let { basename } = useDataRouterContext2();
  let { loaderData, matches } = useDataRouterStateContext();
  let newMatchesForData = reactExports.useMemo(
    () => getNewMatchesForLinks(
      page,
      nextMatches,
      matches,
      manifest,
      location,
      "data"
    ),
    [page, nextMatches, matches, manifest, location]
  );
  let newMatchesForAssets = reactExports.useMemo(
    () => getNewMatchesForLinks(
      page,
      nextMatches,
      matches,
      manifest,
      location,
      "assets"
    ),
    [page, nextMatches, matches, manifest, location]
  );
  let dataHrefs = reactExports.useMemo(() => {
    if (page === location.pathname + location.search + location.hash) {
      return [];
    }
    let routesParams = /* @__PURE__ */ new Set();
    let foundOptOutRoute = false;
    nextMatches.forEach((m) => {
      var _a;
      let manifestRoute = manifest.routes[m.route.id];
      if (!manifestRoute || !manifestRoute.hasLoader) {
        return;
      }
      if (!newMatchesForData.some((m2) => m2.route.id === m.route.id) && m.route.id in loaderData && ((_a = routeModules[m.route.id]) == null ? void 0 : _a.shouldRevalidate)) {
        foundOptOutRoute = true;
      } else if (manifestRoute.hasClientLoader) {
        foundOptOutRoute = true;
      } else {
        routesParams.add(m.route.id);
      }
    });
    if (routesParams.size === 0) {
      return [];
    }
    let url = singleFetchUrl(
      page,
      basename,
      future.v8_trailingSlashAwareDataRequests,
      "data"
    );
    if (foundOptOutRoute && routesParams.size > 0) {
      url.searchParams.set(
        "_routes",
        nextMatches.filter((m) => routesParams.has(m.route.id)).map((m) => m.route.id).join(",")
      );
    }
    return [url.pathname + url.search];
  }, [
    basename,
    future.v8_trailingSlashAwareDataRequests,
    loaderData,
    location,
    manifest,
    newMatchesForData,
    nextMatches,
    page,
    routeModules
  ]);
  let moduleHrefs = reactExports.useMemo(
    () => getModuleLinkHrefs(newMatchesForAssets, manifest),
    [newMatchesForAssets, manifest]
  );
  let keyedPrefetchLinks = useKeyedPrefetchLinks(newMatchesForAssets);
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, dataHrefs.map((href) => /* @__PURE__ */ reactExports.createElement("link", { key: href, rel: "prefetch", as: "fetch", href, ...linkProps })), moduleHrefs.map((href) => /* @__PURE__ */ reactExports.createElement("link", { key: href, rel: "modulepreload", href, ...linkProps })), keyedPrefetchLinks.map(({ key, link }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ reactExports.createElement(
      "link",
      {
        key,
        nonce: linkProps.nonce,
        ...link,
        crossOrigin: link.crossOrigin ?? linkProps.crossOrigin
      }
    )
  )));
}
function mergeRefs(...refs) {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        ref.current = value;
      }
    });
  };
}
var isBrowser2 = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
try {
  if (isBrowser2) {
    window.__reactRouterVersion = // @ts-expect-error
    "7.17.0";
  }
} catch (e) {
}
function BrowserRouter({
  basename,
  children,
  useTransitions,
  window: window2
}) {
  let historyRef = reactExports.useRef();
  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory({ window: window2, v5Compat: true });
  }
  let history = historyRef.current;
  let [state, setStateImpl] = reactExports.useState({
    action: history.action,
    location: history.location
  });
  let setState = reactExports.useCallback(
    (newState) => {
      if (useTransitions === false) {
        setStateImpl(newState);
      } else {
        reactExports.startTransition(() => setStateImpl(newState));
      }
    },
    [useTransitions]
  );
  reactExports.useLayoutEffect(() => history.listen(setState), [history, setState]);
  return /* @__PURE__ */ reactExports.createElement(
    Router,
    {
      basename,
      children,
      location: state.location,
      navigationType: state.action,
      navigator: history,
      useTransitions
    }
  );
}
var ABSOLUTE_URL_REGEX2 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
var Link = reactExports.forwardRef(
  function LinkWithRef({
    onClick,
    discover = "render",
    prefetch = "none",
    relative,
    reloadDocument,
    replace: replace2,
    mask,
    state,
    target,
    to,
    preventScrollReset,
    viewTransition,
    defaultShouldRevalidate,
    ...rest
  }, forwardedRef) {
    let { basename, navigator: navigator2, useTransitions } = reactExports.useContext(NavigationContext);
    let isAbsolute = typeof to === "string" && ABSOLUTE_URL_REGEX2.test(to);
    let parsed = parseToInfo(to, basename);
    to = parsed.to;
    let href = useHref(to, { relative });
    let location = useLocation();
    let maskedHref = null;
    if (mask) {
      let resolved = resolveTo(
        mask,
        [],
        location.mask ? location.mask.pathname : "/",
        true
      );
      if (basename !== "/") {
        resolved.pathname = resolved.pathname === "/" ? basename : joinPaths([basename, resolved.pathname]);
      }
      maskedHref = navigator2.createHref(resolved);
    }
    let [shouldPrefetch, prefetchRef, prefetchHandlers] = usePrefetchBehavior(
      prefetch,
      rest
    );
    let internalOnClick = useLinkClickHandler(to, {
      replace: replace2,
      mask,
      state,
      target,
      preventScrollReset,
      relative,
      viewTransition,
      defaultShouldRevalidate,
      useTransitions
    });
    function handleClick(event) {
      if (onClick) onClick(event);
      if (!event.defaultPrevented) {
        internalOnClick(event);
      }
    }
    let isSpaLink = !(parsed.isExternal || reloadDocument);
    let link = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ reactExports.createElement(
        "a",
        {
          ...rest,
          ...prefetchHandlers,
          href: (isSpaLink ? maskedHref : void 0) || parsed.absoluteURL || href,
          onClick: isSpaLink ? handleClick : onClick,
          ref: mergeRefs(forwardedRef, prefetchRef),
          target,
          "data-discover": !isAbsolute && discover === "render" ? "true" : void 0
        }
      )
    );
    return shouldPrefetch && !isAbsolute ? /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, link, /* @__PURE__ */ reactExports.createElement(PrefetchPageLinks, { page: href })) : link;
  }
);
Link.displayName = "Link";
var NavLink = reactExports.forwardRef(
  function NavLinkWithRef({
    "aria-current": ariaCurrentProp = "page",
    caseSensitive = false,
    className: classNameProp = "",
    end = false,
    style: styleProp,
    to,
    viewTransition,
    children,
    ...rest
  }, ref) {
    let path = useResolvedPath(to, { relative: rest.relative });
    let location = useLocation();
    let routerState = reactExports.useContext(DataRouterStateContext);
    let { navigator: navigator2, basename } = reactExports.useContext(NavigationContext);
    let isTransitioning = routerState != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useViewTransitionState(path) && viewTransition === true;
    let toPathname = navigator2.encodeLocation ? navigator2.encodeLocation(path).pathname : path.pathname;
    let locationPathname = location.pathname;
    let nextLocationPathname = routerState && routerState.navigation && routerState.navigation.location ? routerState.navigation.location.pathname : null;
    if (!caseSensitive) {
      locationPathname = locationPathname.toLowerCase();
      nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null;
      toPathname = toPathname.toLowerCase();
    }
    if (nextLocationPathname && basename) {
      nextLocationPathname = stripBasename(nextLocationPathname, basename) || nextLocationPathname;
    }
    const endSlashPosition = toPathname !== "/" && toPathname.endsWith("/") ? toPathname.length - 1 : toPathname.length;
    let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(endSlashPosition) === "/";
    let isPending = nextLocationPathname != null && (nextLocationPathname === toPathname || !end && nextLocationPathname.startsWith(toPathname) && nextLocationPathname.charAt(toPathname.length) === "/");
    let renderProps = {
      isActive,
      isPending,
      isTransitioning
    };
    let ariaCurrent = isActive ? ariaCurrentProp : void 0;
    let className;
    if (typeof classNameProp === "function") {
      className = classNameProp(renderProps);
    } else {
      className = [
        classNameProp,
        isActive ? "active" : null,
        isPending ? "pending" : null,
        isTransitioning ? "transitioning" : null
      ].filter(Boolean).join(" ");
    }
    let style = typeof styleProp === "function" ? styleProp(renderProps) : styleProp;
    return /* @__PURE__ */ reactExports.createElement(
      Link,
      {
        ...rest,
        "aria-current": ariaCurrent,
        className,
        ref,
        style,
        to,
        viewTransition
      },
      typeof children === "function" ? children(renderProps) : children
    );
  }
);
NavLink.displayName = "NavLink";
var Form = reactExports.forwardRef(
  ({
    discover = "render",
    fetcherKey,
    navigate,
    reloadDocument,
    replace: replace2,
    state,
    method = defaultMethod,
    action,
    onSubmit,
    relative,
    preventScrollReset,
    viewTransition,
    defaultShouldRevalidate,
    ...props
  }, forwardedRef) => {
    let { useTransitions } = reactExports.useContext(NavigationContext);
    let submit = useSubmit();
    let formAction = useFormAction(action, { relative });
    let formMethod = method.toLowerCase() === "get" ? "get" : "post";
    let isAbsolute = typeof action === "string" && ABSOLUTE_URL_REGEX2.test(action);
    let submitHandler = (event) => {
      onSubmit && onSubmit(event);
      if (event.defaultPrevented) return;
      event.preventDefault();
      let submitter = event.nativeEvent.submitter;
      let submitMethod = (submitter == null ? void 0 : submitter.getAttribute("formmethod")) || method;
      let doSubmit = () => submit(submitter || event.currentTarget, {
        fetcherKey,
        method: submitMethod,
        navigate,
        replace: replace2,
        state,
        relative,
        preventScrollReset,
        viewTransition,
        defaultShouldRevalidate
      });
      if (useTransitions && navigate !== false) {
        reactExports.startTransition(() => doSubmit());
      } else {
        doSubmit();
      }
    };
    return /* @__PURE__ */ reactExports.createElement(
      "form",
      {
        ref: forwardedRef,
        method: formMethod,
        action: formAction,
        onSubmit: reloadDocument ? onSubmit : submitHandler,
        ...props,
        "data-discover": !isAbsolute && discover === "render" ? "true" : void 0
      }
    );
  }
);
Form.displayName = "Form";
function getDataRouterConsoleError2(hookName) {
  return `${hookName} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function useDataRouterContext3(hookName) {
  let ctx = reactExports.useContext(DataRouterContext);
  invariant(ctx, getDataRouterConsoleError2(hookName));
  return ctx;
}
function useLinkClickHandler(to, {
  target,
  replace: replaceProp,
  mask,
  state,
  preventScrollReset,
  relative,
  viewTransition,
  defaultShouldRevalidate,
  useTransitions
} = {}) {
  let navigate = useNavigate();
  let location = useLocation();
  let path = useResolvedPath(to, { relative });
  return reactExports.useCallback(
    (event) => {
      if (shouldProcessLinkClick(event, target)) {
        event.preventDefault();
        let replace2 = replaceProp !== void 0 ? replaceProp : createPath(location) === createPath(path);
        let doNavigate = () => navigate(to, {
          replace: replace2,
          mask,
          state,
          preventScrollReset,
          relative,
          viewTransition,
          defaultShouldRevalidate
        });
        if (useTransitions) {
          reactExports.startTransition(() => doNavigate());
        } else {
          doNavigate();
        }
      }
    },
    [
      location,
      navigate,
      path,
      replaceProp,
      mask,
      state,
      target,
      to,
      preventScrollReset,
      relative,
      viewTransition,
      defaultShouldRevalidate,
      useTransitions
    ]
  );
}
var fetcherId = 0;
var getUniqueFetcherId = () => `__${String(++fetcherId)}__`;
function useSubmit() {
  let { router } = useDataRouterContext3(
    "useSubmit"
    /* UseSubmit */
  );
  let { basename } = reactExports.useContext(NavigationContext);
  let currentRouteId = useRouteId();
  let routerFetch = router.fetch;
  let routerNavigate = router.navigate;
  return reactExports.useCallback(
    async (target, options = {}) => {
      let { action, method, encType, formData, body } = getFormSubmissionInfo(
        target,
        basename
      );
      if (options.navigate === false) {
        let key = options.fetcherKey || getUniqueFetcherId();
        await routerFetch(key, currentRouteId, options.action || action, {
          defaultShouldRevalidate: options.defaultShouldRevalidate,
          preventScrollReset: options.preventScrollReset,
          formData,
          body,
          formMethod: options.method || method,
          formEncType: options.encType || encType,
          flushSync: options.flushSync
        });
      } else {
        await routerNavigate(options.action || action, {
          defaultShouldRevalidate: options.defaultShouldRevalidate,
          preventScrollReset: options.preventScrollReset,
          formData,
          body,
          formMethod: options.method || method,
          formEncType: options.encType || encType,
          replace: options.replace,
          state: options.state,
          fromRouteId: currentRouteId,
          flushSync: options.flushSync,
          viewTransition: options.viewTransition
        });
      }
    },
    [routerFetch, routerNavigate, basename, currentRouteId]
  );
}
function useFormAction(action, { relative } = {}) {
  let { basename } = reactExports.useContext(NavigationContext);
  let routeContext = reactExports.useContext(RouteContext);
  invariant(routeContext, "useFormAction must be used inside a RouteContext");
  let [match] = routeContext.matches.slice(-1);
  let path = { ...useResolvedPath(action ? action : ".", { relative }) };
  let location = useLocation();
  if (action == null) {
    path.search = location.search;
    let params = new URLSearchParams(path.search);
    let indexValues = params.getAll("index");
    let hasNakedIndexParam = indexValues.some((v) => v === "");
    if (hasNakedIndexParam) {
      params.delete("index");
      indexValues.filter((v) => v).forEach((v) => params.append("index", v));
      let qs = params.toString();
      path.search = qs ? `?${qs}` : "";
    }
  }
  if ((!action || action === ".") && match.route.index) {
    path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
  }
  if (basename !== "/") {
    path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
  }
  return createPath(path);
}
function useViewTransitionState(to, { relative } = {}) {
  let vtContext = reactExports.useContext(ViewTransitionContext);
  invariant(
    vtContext != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename } = useDataRouterContext3(
    "useViewTransitionState"
    /* useViewTransitionState */
  );
  let path = useResolvedPath(to, { relative });
  if (!vtContext.isTransitioning) {
    return false;
  }
  let currentPath = stripBasename(vtContext.currentLocation.pathname, basename) || vtContext.currentLocation.pathname;
  let nextPath = stripBasename(vtContext.nextLocation.pathname, basename) || vtContext.nextLocation.pathname;
  return matchPath(path.pathname, nextPath) != null || matchPath(path.pathname, currentPath) != null;
}
const API_BASE = "/api";
async function request(path, options = {}) {
  const token = localStorage.getItem("omnis_token");
  const headers = {
    "Content-Type": "application/json",
    ...token ? { Authorization: `Bearer ${token}` } : {},
    ...options.headers || {}
  };
  if (options.body instanceof FormData) {
    delete headers["Content-Type"];
  }
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (res.status === 401) {
    localStorage.removeItem("omnis_token");
    window.location.href = "/login";
    throw new Error("Not authenticated");
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || "Request failed");
  }
  return res.json();
}
const api = {
  // Auth
  login: (email, password) => request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  }),
  register: (data) => request("/auth/register", { method: "POST", body: JSON.stringify(data) }),
  me: () => request("/auth/me"),
  // Products
  getProducts: (params) => request(`/products?${params || ""}`),
  getProduct: (id) => request(`/products/${id}`),
  updateProduct: (id, data) => request(`/products/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteProduct: (id) => request(`/products/${id}`, { method: "DELETE" }),
  // Clients
  getClients: (params) => request(`/clients?${params || ""}`),
  createClient: (data) => request("/clients", { method: "POST", body: JSON.stringify(data) }),
  updateClient: (id, data) => request(`/clients/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteClient: (id) => request(`/clients/${id}`, { method: "DELETE" }),
  // Suppliers
  getSuppliers: (params) => request(`/suppliers?${params || ""}`),
  createSupplier: (data) => request("/suppliers", { method: "POST", body: JSON.stringify(data) }),
  // Orders
  getOrders: (params) => request(`/orders?${params || ""}`),
  createOrder: (data) => request("/orders", { method: "POST", body: JSON.stringify(data) }),
  // Financial
  getFinancial: (params) => request(`/financial?${params || ""}`),
  createTransaction: (data) => request("/financial", { method: "POST", body: JSON.stringify(data) }),
  // Tasks
  getTasks: (params) => request(`/tasks?${params || ""}`),
  createTask: (data) => request("/tasks", { method: "POST", body: JSON.stringify(data) }),
  completeTask: (id) => request(`/tasks/${id}/complete`, { method: "PUT" }),
  // Dashboard
  getDashboardStats: () => request("/dashboard/stats"),
  getDashboardWidgets: () => request("/dashboard/widgets"),
  getDashboardLayout: () => request("/dashboard/layout"),
  saveDashboardLayout: (data) => request("/dashboard/layout", { method: "PUT", body: JSON.stringify(data) }),
  // Knowledge Base
  getKnowledge: (params) => request(`/knowledge?${params || ""}`),
  createKnowledge: (data) => request("/knowledge", { method: "POST", body: JSON.stringify(data) }),
  // AI
  askAI: (query) => request("/ai/ask", { method: "POST", body: JSON.stringify({ query }) }),
  getAIHistory: () => request("/ai/history"),
  // Upload
  uploadSpreadsheet: (file) => {
    const form = new FormData();
    form.append("file", file);
    return request("/upload", { method: "POST", body: form });
  },
  // Global search
  search: (q) => request(`/search?q=${encodeURIComponent(q)}`)
};
const AuthContext = reactExports.createContext(null);
function AuthProvider({ children }) {
  const [user, setUser] = reactExports.useState(null);
  const [token, setToken] = reactExports.useState(localStorage.getItem("omnis_token"));
  const [loading, setLoading] = reactExports.useState(true);
  const fetchUser = reactExports.useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const u = await api.me();
      setUser(u);
    } catch {
      localStorage.removeItem("omnis_token");
      setToken(null);
    } finally {
      setLoading(false);
    }
  }, [token]);
  reactExports.useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  const login = async (email, password) => {
    const res = await api.login(email, password);
    localStorage.setItem("omnis_token", res.token);
    setToken(res.token);
    setUser(res.user);
  };
  const register = async (data) => {
    await api.register(data);
    await login(data.email, data.password);
  };
  const logout = () => {
    localStorage.removeItem("omnis_token");
    setToken(null);
    setUser(null);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthContext.Provider, { value: { user, token, login, register, logout, loading }, children });
}
function useAuth() {
  const ctx = reactExports.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Icon = reactExports.forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => {
    return reactExports.createElement(
      "svg",
      {
        ref,
        ...defaultAttributes,
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: mergeClasses("lucide", className),
        ...rest
      },
      [
        ...iconNode.map(([tag, attrs]) => reactExports.createElement(tag, attrs)),
        ...Array.isArray(children) ? children : [children]
      ]
    );
  }
);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const createLucideIcon = (iconName, iconNode) => {
  const Component = reactExports.forwardRef(
    ({ className, ...props }, ref) => reactExports.createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(`lucide-${toKebabCase(iconName)}`, className),
      ...props
    })
  );
  Component.displayName = `${iconName}`;
  return Component;
};
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Archive = createLucideIcon("Archive", [
  ["rect", { width: "20", height: "5", x: "2", y: "3", rx: "1", key: "1wp1u1" }],
  ["path", { d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8", key: "1s80jp" }],
  ["path", { d: "M10 12h4", key: "a56b0p" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ArrowRight = createLucideIcon("ArrowRight", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const BellOff = createLucideIcon("BellOff", [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742",
      key: "178tsu"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05", key: "1hqiys" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bell = createLucideIcon("Bell", [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const BookOpen = createLucideIcon("BookOpen", [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Brain = createLucideIcon("Brain", [
  [
    "path",
    {
      d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",
      key: "l5xja"
    }
  ],
  [
    "path",
    {
      d: "M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z",
      key: "ep3f8r"
    }
  ],
  ["path", { d: "M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4", key: "1p4c4q" }],
  ["path", { d: "M17.599 6.5a3 3 0 0 0 .399-1.375", key: "tmeiqw" }],
  ["path", { d: "M6.003 5.125A3 3 0 0 0 6.401 6.5", key: "105sqy" }],
  ["path", { d: "M3.477 10.896a4 4 0 0 1 .585-.396", key: "ql3yin" }],
  ["path", { d: "M19.938 10.5a4 4 0 0 1 .585.396", key: "1qfode" }],
  ["path", { d: "M6 18a4 4 0 0 1-1.967-.516", key: "2e4loj" }],
  ["path", { d: "M19.967 17.484A4 4 0 0 1 18 18", key: "159ez6" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const CalendarDays = createLucideIcon("CalendarDays", [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Calendar = createLucideIcon("Calendar", [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ChartColumn = createLucideIcon("ChartColumn", [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Check = createLucideIcon("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ChevronLeft = createLucideIcon("ChevronLeft", [
  ["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ChevronRight = createLucideIcon("ChevronRight", [
  ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const CircleAlert = createLucideIcon("CircleAlert", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const CircleArrowDown = createLucideIcon("CircleArrowDown", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 8v8", key: "napkw2" }],
  ["path", { d: "m8 12 4 4 4-4", key: "k98ssh" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const CircleArrowUp = createLucideIcon("CircleArrowUp", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m16 12-4-4-4 4", key: "177agl" }],
  ["path", { d: "M12 16V8", key: "1sbj14" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const CircleCheckBig = createLucideIcon("CircleCheckBig", [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const CircleX = createLucideIcon("CircleX", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Circle = createLucideIcon("Circle", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Clock = createLucideIcon("Clock", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Database = createLucideIcon("Database", [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
  ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const DollarSign = createLucideIcon("DollarSign", [
  ["line", { x1: "12", x2: "12", y1: "2", y2: "22", key: "7eqyqh" }],
  ["path", { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6", key: "1b0p4s" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Download = createLucideIcon("Download", [
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["polyline", { points: "7 10 12 15 17 10", key: "2ggqvy" }],
  ["line", { x1: "12", x2: "12", y1: "15", y2: "3", key: "1vk2je" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Eye = createLucideIcon("Eye", [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const FileDown = createLucideIcon("FileDown", [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M12 18v-6", key: "17g6i2" }],
  ["path", { d: "m9 15 3 3 3-3", key: "1npd3o" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const FilePenLine = createLucideIcon("FilePenLine", [
  [
    "path",
    {
      d: "m18 5-2.414-2.414A2 2 0 0 0 14.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2",
      key: "142zxg"
    }
  ],
  [
    "path",
    {
      d: "M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
      key: "2t3380"
    }
  ],
  ["path", { d: "M8 18h1", key: "13wk12" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const FileSpreadsheet$1 = createLucideIcon("FileSpreadsheet", [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M8 13h2", key: "yr2amv" }],
  ["path", { d: "M14 13h2", key: "un5t4a" }],
  ["path", { d: "M8 17h2", key: "2yhykz" }],
  ["path", { d: "M14 17h2", key: "10kma7" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const FileText$1 = createLucideIcon("FileText", [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Filter = createLucideIcon("Filter", [
  ["polygon", { points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3", key: "1yg77f" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Flag = createLucideIcon("Flag", [
  ["path", { d: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z", key: "i9b6wo" }],
  ["line", { x1: "4", x2: "4", y1: "22", y2: "15", key: "1cm3nv" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const GripVertical = createLucideIcon("GripVertical", [
  ["circle", { cx: "9", cy: "12", r: "1", key: "1vctgf" }],
  ["circle", { cx: "9", cy: "5", r: "1", key: "hp0tcf" }],
  ["circle", { cx: "9", cy: "19", r: "1", key: "fkjjf6" }],
  ["circle", { cx: "15", cy: "12", r: "1", key: "1tmaij" }],
  ["circle", { cx: "15", cy: "5", r: "1", key: "19l28e" }],
  ["circle", { cx: "15", cy: "19", r: "1", key: "f4zoj3" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const History = createLucideIcon("History", [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M12 7v5l4 2", key: "1fdv2h" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Image = createLucideIcon("Image", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Inbox = createLucideIcon("Inbox", [
  ["polyline", { points: "22 12 16 12 14 15 10 15 8 12 2 12", key: "o97t9d" }],
  [
    "path",
    {
      d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
      key: "oot6mr"
    }
  ]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Key = createLucideIcon("Key", [
  ["path", { d: "m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4", key: "g0fldk" }],
  ["path", { d: "m21 2-9.6 9.6", key: "1j0ho8" }],
  ["circle", { cx: "7.5", cy: "15.5", r: "5.5", key: "yqb3hr" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const LayoutDashboard = createLucideIcon("LayoutDashboard", [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const LogOut = createLucideIcon("LogOut", [
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }],
  ["polyline", { points: "16 17 21 12 16 7", key: "1gabdz" }],
  ["line", { x1: "21", x2: "9", y1: "12", y2: "12", key: "1uyos4" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mail = createLucideIcon("Mail", [
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Menu = createLucideIcon("Menu", [
  ["line", { x1: "4", x2: "20", y1: "12", y2: "12", key: "1e0a9i" }],
  ["line", { x1: "4", x2: "20", y1: "6", y2: "6", key: "1owob3" }],
  ["line", { x1: "4", x2: "20", y1: "18", y2: "18", key: "yk5zj1" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const MessageSquare = createLucideIcon("MessageSquare", [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Package = createLucideIcon("Package", [
  [
    "path",
    {
      d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
      key: "1a0edw"
    }
  ],
  ["path", { d: "M12 22V12", key: "d0xqtd" }],
  ["path", { d: "m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7", key: "yx3hmr" }],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const PanelRightClose = createLucideIcon("PanelRightClose", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M15 3v18", key: "14nvp0" }],
  ["path", { d: "m8 9 3 3-3 3", key: "12hl5m" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const PanelRightOpen = createLucideIcon("PanelRightOpen", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M15 3v18", key: "14nvp0" }],
  ["path", { d: "m10 15-3-3 3-3", key: "1pgupc" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const PanelsTopLeft = createLucideIcon("PanelsTopLeft", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["path", { d: "M9 21V9", key: "1oto5p" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Plus = createLucideIcon("Plus", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Presentation$1 = createLucideIcon("Presentation", [
  ["path", { d: "M2 3h20", key: "91anmk" }],
  ["path", { d: "M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3", key: "2k9sn8" }],
  ["path", { d: "m7 21 5-5 5 5", key: "bip4we" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const RefreshCw = createLucideIcon("RefreshCw", [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rocket = createLucideIcon("Rocket", [
  [
    "path",
    {
      d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",
      key: "m3kijz"
    }
  ],
  [
    "path",
    {
      d: "m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z",
      key: "1fmvmk"
    }
  ],
  ["path", { d: "M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0", key: "1f8sc4" }],
  ["path", { d: "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5", key: "qeys4" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const RotateCcw = createLucideIcon("RotateCcw", [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Save = createLucideIcon("Save", [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Search$1 = createLucideIcon("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Send = createLucideIcon("Send", [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Settings2 = createLucideIcon("Settings2", [
  ["path", { d: "M20 7h-9", key: "3s1dr2" }],
  ["path", { d: "M14 17H5", key: "gfn3mx" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
  ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Settings = createLucideIcon("Settings", [
  [
    "path",
    {
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      key: "1qme2f"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Shield = createLucideIcon("Shield", [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ShoppingCart = createLucideIcon("ShoppingCart", [
  ["circle", { cx: "8", cy: "21", r: "1", key: "jimo8o" }],
  ["circle", { cx: "19", cy: "21", r: "1", key: "13723u" }],
  [
    "path",
    {
      d: "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",
      key: "9zh506"
    }
  ]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const SquareCheckBig = createLucideIcon("SquareCheckBig", [
  ["path", { d: "M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.5", key: "1uzm8b" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Star = createLucideIcon("Star", [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Target = createLucideIcon("Target", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Trash2 = createLucideIcon("Trash2", [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const TrendingDown = createLucideIcon("TrendingDown", [
  ["polyline", { points: "22 17 13.5 8.5 8.5 13.5 2 7", key: "1r2t7k" }],
  ["polyline", { points: "16 17 22 17 22 11", key: "11uiuu" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const TrendingUp = createLucideIcon("TrendingUp", [
  ["polyline", { points: "22 7 13.5 15.5 8.5 10.5 2 17", key: "126l90" }],
  ["polyline", { points: "16 7 22 7 22 13", key: "kwv8wd" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const TriangleAlert = createLucideIcon("TriangleAlert", [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Truck = createLucideIcon("Truck", [
  ["path", { d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2", key: "wrbu53" }],
  ["path", { d: "M15 18H9", key: "1lyqi6" }],
  [
    "path",
    {
      d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
      key: "lysw3i"
    }
  ],
  ["circle", { cx: "17", cy: "18", r: "2", key: "332jqn" }],
  ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Upload = createLucideIcon("Upload", [
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["polyline", { points: "17 8 12 3 7 8", key: "t8dd8p" }],
  ["line", { x1: "12", x2: "12", y1: "3", y2: "15", key: "widbto" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const User = createLucideIcon("User", [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const UsersRound = createLucideIcon("UsersRound", [
  ["path", { d: "M18 21a8 8 0 0 0-16 0", key: "3ypg7q" }],
  ["circle", { cx: "10", cy: "8", r: "5", key: "o932ke" }],
  ["path", { d: "M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3", key: "10s06x" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Users = createLucideIcon("Users", [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75", key: "1da9ce" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const X = createLucideIcon("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zap = createLucideIcon("Zap", [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
]);
const navGroups = [
  {
    title: "Main",
    items: [
      { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
      { to: "/upload", icon: Upload, label: "Import" },
      { to: "/visualsearch", icon: Search, label: "Visual Search" },
      { to: "/clipboard", icon: Clipboard, label: "Clipboard" }
    ]
  },
  {
    title: "Operational",
    items: [
      { to: "/products", icon: Package, label: "Products" },
      { to: "/clients", icon: Users, label: "Clients" },
      { to: "/suppliers", icon: Truck, label: "Suppliers" },
      { to: "/orders", icon: ShoppingCart, label: "Orders" }
    ]
  },
  {
    title: "Financial",
    items: [
      { to: "/financial", icon: DollarSign, label: "Financial" },
      { to: "/reports", icon: ChartColumn, label: "Reports" }
    ]
  },
  {
    title: "Management",
    items: [
      { to: "/tasks", icon: SquareCheckBig, label: "Tasks" },
      { to: "/agenda", icon: CalendarDays, label: "Agenda" },
      { to: "/goals", icon: Target, label: "Goals" },
      { to: "/contracts", icon: FilePenLine, label: "Contracts" },
      { to: "/documents", icon: FileText$1, label: "Documents" }
    ]
  },
  {
    title: "People",
    items: [
      { to: "/employees", icon: UsersRound, label: "Employees" },
      { to: "/directives", icon: MessageSquare, label: "Directives" },
      { to: "/emails", icon: Mail, label: "Emails" }
    ]
  },
  {
    title: "Knowledge",
    items: [
      { to: "/knowledge", icon: BookOpen, label: "Knowledge Base" },
      { to: "/ai", icon: Brain, label: "AI Assistant" }
    ]
  },
  {
    title: "System",
    items: [
      { to: "/alerts", icon: TriangleAlert, label: "Alerts" },
      { to: "/archive", icon: Archive, label: "Archive" },
      { to: "/settings", icon: Settings, label: "Settings" },
      { to: "/security", icon: Shield, label: "Security" }
    ]
  }
];
function SidebarContent({ user, logout, onItemClick }) {
  var _a;
  const location = useLocation();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sidebar-logo", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "28", height: "28", viewBox: "0 0 100 100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "lg", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#6366f1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#3b82f6" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "100", height: "100", rx: "20", fill: "url(#lg)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "50", y: "68", fontFamily: "Arial", fontSize: "45", fontWeight: "bold", fill: "white", textAnchor: "middle", children: "O" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "OMNIS Data" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "sidebar-nav", children: navGroups.map((group) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "nav-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "nav-section-title", children: group.title }),
      group.items.map((item) => {
        const isActive = location.pathname.startsWith(item.to);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          NavLink,
          {
            to: item.to,
            className: `nav-item ${isActive ? "active" : ""}`,
            onClick: onItemClick,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { size: 16 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.label })
            ]
          },
          item.to
        );
      })
    ] }, group.title)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "12px 8px", borderTop: "1px solid var(--border)", marginTop: "auto" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 12px",
        marginBottom: 4,
        borderRadius: 8
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "user-avatar", children: ((_a = user == null ? void 0 : user.name) == null ? void 0 : _a[0]) || "U" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { overflow: "hidden" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 13, fontWeight: 500, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: (user == null ? void 0 : user.name) || "User" }),
          (user == null ? void 0 : user.email) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11, color: "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: user.email })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: "btn btn-ghost btn-sm",
          style: { width: "100%", justifyContent: "center" },
          onClick: logout,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 14 }),
            " Logout"
          ]
        }
      )
    ] })
  ] });
}
function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    open && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "sidebar-overlay",
        onClick: onClose,
        style: {
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          zIndex: 40,
          backdropFilter: "blur(4px)"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "aside",
      {
        className: `sidebar ${open ? "open" : ""}`,
        style: {
          position: "fixed",
          left: open ? 0 : void 0,
          top: 0,
          height: "100%",
          zIndex: 45,
          transition: "left 0.25s ease",
          display: "flex",
          flexDirection: "column",
          background: "var(--bg-sidebar)",
          width: 240
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarContent, { user, logout, onItemClick: onClose })
      }
    )
  ] });
}
function DesktopSidebar() {
  const { user, logout } = useAuth();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "aside",
    {
      className: "sidebar",
      style: {
        position: "sticky",
        top: 0,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--bg-sidebar)",
        width: 240,
        borderRight: "1px solid var(--border)"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarContent, { user, logout })
    }
  );
}
function Layout() {
  var _a;
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = reactExports.useState(false);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [searchResults, setSearchResults] = reactExports.useState([]);
  const [searching, setSearching] = reactExports.useState(false);
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearching(true);
    try {
      const res = await api.search(searchQuery);
      setSearchResults(res.results || []);
    } catch {
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "app-layout", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, { open: sidebarOpen, onClose: () => setSidebarOpen(false) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "none" }, className: "desktop-sidebar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DesktopSidebar, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "main-area", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "header-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "mobile-menu-btn btn btn-ghost btn-sm",
              onClick: () => setSidebarOpen(true),
              style: { display: "none" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { size: 20 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: handleSearch, style: { display: "flex", alignItems: "center" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              className: "header-search",
              placeholder: "Buscar produtos, clientes, pedidos...",
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value),
              onBlur: () => setTimeout(() => setSearchResults([]), 200)
            }
          ) }),
          searchResults.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            position: "absolute",
            top: "100%",
            left: 24,
            right: 24,
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            maxHeight: 300,
            overflowY: "auto",
            zIndex: 50,
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)"
          }, children: searchResults.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                padding: "10px 14px",
                borderBottom: "1px solid var(--border)",
                cursor: "pointer",
                fontSize: 13
              },
              onClick: () => {
                const paths = { product: "/products", client: "/clients", order: "/orders", spreadsheet: "/upload" };
                navigate(paths[r.type] || "/");
                setSearchResults([]);
                setSearchQuery("");
              },
              onMouseEnter: (e) => e.currentTarget.style.background = "var(--bg-hover)",
              onMouseLeave: (e) => e.currentTarget.style.background = "transparent",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `badge badge-info`, style: { marginRight: 8 }, children: r.type }),
                r.name || r.filename || r.code || `#${r.id}`
              ]
            },
            i
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "header-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 13, color: "var(--text-secondary)" }, children: user == null ? void 0 : user.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "user-avatar", children: ((_a = user == null ? void 0 : user.name) == null ? void 0 : _a[0]) || "U" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "content", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @media (min-width: 769px) {
          .sidebar { position: sticky !important; left: auto !important; }
          .desktop-sidebar { display: block !important; }
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 768px) {
          .desktop-sidebar { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      ` })
  ] });
}
function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className = "",
  style,
  onClick,
  disabled,
  children
}) {
  const classNames = `btn btn-${variant} btn-${size} ${className}`.trim();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      className: classNames,
      style,
      onClick,
      disabled: disabled || loading,
      children: [
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "spinner", style: { width: 14, height: 14, marginRight: 4 } }) : null,
        children
      ]
    }
  );
}
function LoginPage() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = reactExports.useState("login");
  const [form, setForm] = reactExports.useState({ email: "", password: "", name: "", companyName: "" });
  const [error, setError] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "login") {
        await login(form.email, form.password);
      } else {
        await register({ name: form.name, email: form.email, password: form.password, companyName: form.companyName });
      }
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Authentication error");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "radial-gradient(ellipse at top, #1e293b 0%, #0f172a 50%, #0a0f1a 100%)",
    padding: 20
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: 16,
    padding: 40,
    width: "100%",
    maxWidth: 420,
    boxShadow: "0 25px 50px rgba(0,0,0,0.4)"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center", marginBottom: 32 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "56", height: "56", viewBox: "0 0 100 100", style: { marginBottom: 16 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "lg", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#6366f1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#3b82f6" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "100", height: "100", rx: "20", fill: "url(#lg)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "50", y: "68", fontFamily: "Arial", fontSize: "45", fontWeight: "bold", fill: "white", textAnchor: "middle", children: "O" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { style: { fontSize: 24, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }, children: "OMNIS Data" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: 14, color: "var(--text-secondary)" }, children: "Turn your data into decisions" })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      background: "rgba(239, 68, 68, 0.1)",
      border: "1px solid rgba(239, 68, 68, 0.3)",
      borderRadius: 8,
      padding: "10px 14px",
      marginBottom: 20,
      fontSize: 13,
      color: "var(--danger)"
    }, children: error }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
      mode === "register" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", children: "Your name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "form-input", value: form.name, onChange: (e) => setForm({ ...form, name: e.target.value }), placeholder: "John Doe", required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", children: "Company name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "form-input", value: form.companyName, onChange: (e) => setForm({ ...form, companyName: e.target.value }), placeholder: "My Company Ltd", required: true })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "form-input", type: "email", value: form.email, onChange: (e) => setForm({ ...form, email: e.target.value }), placeholder: "you@company.com", required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", children: "Password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "form-input", type: "password", value: form.password, onChange: (e) => setForm({ ...form, password: e.target.value }), placeholder: "••••••••", required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "primary", size: "lg", loading, style: { width: "100%", justifyContent: "center", marginTop: 8 }, children: mode === "login" ? "Sign In" : "Create Account" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { textAlign: "center", marginTop: 20, fontSize: 13, color: "var(--text-secondary)" }, children: mode === "login" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
      "Don't have an account?",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            setMode("register");
            setError("");
          },
          style: { background: "none", border: "none", color: "var(--accent)", cursor: "pointer", fontSize: 13, fontWeight: 500 },
          children: "Register"
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
      "Already have an account?",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            setMode("login");
            setError("");
          },
          style: { background: "none", border: "none", color: "var(--accent)", cursor: "pointer", fontSize: 13, fontWeight: 500 },
          children: "Sign In"
        }
      )
    ] }) })
  ] }) });
}
const variantMap = {
  warning: "badge-warning",
  danger: "badge-danger",
  success: "badge-success",
  info: "badge-info",
  neutral: "badge-neutral"
};
function Badge({ variant = "neutral", children }) {
  const cls = variantMap[variant] || "badge-neutral";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `badge ${cls}`, children });
}
function EmptyState({ icon, message, action }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", children: [
    icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginBottom: 12, opacity: 0.5 }, children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "var(--text-muted)", marginBottom: action ? 16 : 0 }, children: message }),
    action && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: action })
  ] });
}
const AVAILABLE_WIDGETS = [
  { id: "stats", type: "stats", title: "Quick Stats", defaultW: 4, defaultH: 1, icon: ChartColumn },
  { id: "low_stock", type: "low_stock", title: "Low Stock Items", defaultW: 2, defaultH: 2, icon: TriangleAlert },
  { id: "financial", type: "financial", title: "Financial Summary", defaultW: 2, defaultH: 2, icon: DollarSign },
  { id: "recent_orders", type: "recent_orders", title: "Recent Orders", defaultW: 2, defaultH: 2, icon: ShoppingCart },
  { id: "products_summary", type: "products_summary", title: "Products Overview", defaultW: 2, defaultH: 2, icon: Package },
  { id: "alerts_list", type: "alerts_list", title: "Active Alerts", defaultW: 2, defaultH: 2, icon: TriangleAlert },
  { id: "recent_docs", type: "recent_docs", title: "Recent Documents", defaultW: 2, defaultH: 2, icon: FileText$1 },
  { id: "top_clients", type: "top_clients", title: "Top Clients", defaultW: 2, defaultH: 2, icon: Users }
];
function WidgetContent({ widget, stats, widgets }) {
  var _a, _b, _c;
  switch (widget.type) {
    case "stats":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, height: "100%" }, children: [
        { label: "Products", value: (stats == null ? void 0 : stats.totalProducts) || 0, color: "var(--accent)" },
        { label: "Low Stock", value: ((_a = stats == null ? void 0 : stats.lowStock) == null ? void 0 : _a.length) || 0, color: "var(--warning)" },
        { label: "Out of Stock", value: (stats == null ? void 0 : stats.outOfStock) || 0, color: "var(--danger)" },
        { label: "Alerts", value: ((_b = stats == null ? void 0 : stats.alerts) == null ? void 0 : _b.length) || 0, color: "var(--info)" }
      ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        background: "var(--bg-secondary)",
        borderRadius: 8,
        padding: "14px 12px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }, children: s.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 24, fontWeight: 700, color: s.color }, children: s.value })
      ] }, s.label)) });
    case "financial": {
      const w = widgets == null ? void 0 : widgets.widgets;
      const finData = w ? (_c = Object.entries(w).find(([, v]) => (v == null ? void 0 : v.income) !== void 0)) == null ? void 0 : _c[1] : null;
      if (!finData) return /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { size: 24 }), message: "No financial data" });
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 12, height: "100%", justifyContent: "center" }, children: [
        { label: "Revenue", value: finData.income, color: "var(--success)" },
        { label: "Expenses", value: finData.expense, color: "var(--danger)" },
        { label: "Balance", value: finData.balance, color: finData.balance >= 0 ? "var(--success)" : "var(--danger)", big: true }
      ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 12, color: "var(--text-muted)" }, children: s.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontSize: s.big ? 22 : 16, fontWeight: 700, color: s.color }, children: [
          "$ ",
          s.value.toFixed(2)
        ] })
      ] }, s.label)) });
    }
    case "low_stock": {
      const items = (stats == null ? void 0 : stats.lowStock) || [];
      if (items.length === 0) return /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 24 }), message: "All items well stocked" });
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { overflow: "auto", height: "100%" }, children: items.slice(0, 8).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "6px 0",
        borderBottom: "1px solid var(--border)",
        fontSize: 12
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--text-primary)" }, children: item.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: item.quantity < 3 ? "danger" : "warning", children: item.quantity })
      ] }, item.id)) });
    }
    default:
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--text-muted)", fontSize: 13 }, children: "Widget data loading..." });
  }
}
function DashboardPage() {
  const [stats, setStats] = reactExports.useState(null);
  const [widgets, setWidgets] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [layout, setLayout] = reactExports.useState(() => {
    try {
      const saved = localStorage.getItem("omnis_dashboard_layout");
      if (saved) return JSON.parse(saved);
    } catch {
    }
    return [
      { id: "stats", type: "stats", title: "Quick Stats", w: 4, h: 1, x: 0, y: 0 },
      { id: "financial", type: "financial", title: "Financial Summary", w: 2, h: 2, x: 0, y: 1 },
      { id: "low_stock", type: "low_stock", title: "Low Stock Items", w: 2, h: 2, x: 2, y: 1 }
    ];
  });
  const [editMode, setEditMode] = reactExports.useState(false);
  const [showAddPanel, setShowAddPanel] = reactExports.useState(false);
  const [saving, setSaving] = reactExports.useState(false);
  const dragItem = reactExports.useRef(null);
  const dragOverItem = reactExports.useRef(null);
  reactExports.useEffect(() => {
    Promise.all([
      api.getDashboardStats(),
      api.getDashboardWidgets()
    ]).then(([s, w]) => {
      setStats(s);
      setWidgets(w);
    }).finally(() => setLoading(false));
  }, []);
  const saveLayout = reactExports.useCallback(() => {
    setSaving(true);
    localStorage.setItem("omnis_dashboard_layout", JSON.stringify(layout));
    setTimeout(() => setSaving(false), 600);
  }, [layout]);
  const resetLayout = reactExports.useCallback(() => {
    const defaultLayout = [
      { id: "stats", type: "stats", title: "Quick Stats", w: 4, h: 1, x: 0, y: 0 },
      { id: "financial", type: "financial", title: "Financial Summary", w: 2, h: 2, x: 0, y: 1 },
      { id: "low_stock", type: "low_stock", title: "Low Stock Items", w: 2, h: 2, x: 2, y: 1 }
    ];
    setLayout(defaultLayout);
    localStorage.setItem("omnis_dashboard_layout", JSON.stringify(defaultLayout));
  }, []);
  const addWidget = (def) => {
    const maxY = Math.max(...layout.map((w) => w.y + w.h), 0);
    const newWidget = {
      id: `${def.id}_${Date.now()}`,
      type: def.id,
      title: def.title,
      w: def.defaultW,
      h: def.defaultH,
      x: 0,
      y: maxY
    };
    const newLayout = [...layout, newWidget];
    setLayout(newLayout);
    localStorage.setItem("omnis_dashboard_layout", JSON.stringify(newLayout));
    setShowAddPanel(false);
  };
  const removeWidget = (id) => {
    const newLayout = layout.filter((w) => w.id !== id);
    setLayout(newLayout);
    localStorage.setItem("omnis_dashboard_layout", JSON.stringify(newLayout));
  };
  const cycleSize = (widget) => {
    const sizes = [
      { w: 1, h: 1 },
      { w: 2, h: 1 },
      { w: 2, h: 2 },
      { w: 3, h: 2 },
      { w: 4, h: 2 }
    ];
    const currentIdx = sizes.findIndex((s) => s.w === widget.w && s.h === widget.h);
    const nextIdx = (currentIdx + 1) % sizes.length;
    const newLayout = layout.map(
      (w) => w.id === widget.id ? { ...w, w: sizes[nextIdx].w, h: sizes[nextIdx].h } : w
    );
    setLayout(newLayout);
    localStorage.setItem("omnis_dashboard_layout", JSON.stringify(newLayout));
  };
  const handleDragStart = (widget, index) => {
    dragItem.current = { widget, index };
  };
  const handleDragEnter = (index) => {
    dragOverItem.current = index;
  };
  const handleDragEnd = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    const newLayout = [...layout];
    const dragItemContent = newLayout[dragItem.current.index];
    newLayout.splice(dragItem.current.index, 1);
    newLayout.splice(dragOverItem.current, 0, dragItemContent);
    setLayout(newLayout);
    localStorage.setItem("omnis_dashboard_layout", JSON.stringify(newLayout));
    dragItem.current = null;
    dragOverItem.current = null;
  };
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner" });
  const gridCols = 4;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "page-title", children: "Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }, children: [
        editMode && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              className: "btn btn-secondary btn-sm",
              onClick: () => setShowAddPanel(!showAddPanel),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
                " Add Widget"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "btn btn-ghost btn-sm",
              onClick: resetLayout,
              title: "Reset to default layout",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 14 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              className: "btn btn-primary btn-sm",
              onClick: saveLayout,
              disabled: saving,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 14 }),
                " ",
                saving ? "Saved!" : "Save"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: `btn ${editMode ? "btn-primary" : "btn-secondary"} btn-sm`,
            onClick: () => {
              setEditMode(!editMode);
              setShowAddPanel(false);
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(PanelsTopLeft, { size: 14 }),
              " ",
              editMode ? "Done" : "Customize"
            ]
          }
        )
      ] })
    ] }),
    showAddPanel && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      background: "var(--bg-card)",
      border: "1px solid var(--border)",
      borderRadius: 12,
      padding: 20,
      marginBottom: 20
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }, children: "Available Widgets" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 8 }, children: [
        AVAILABLE_WIDGETS.filter(
          (def) => !layout.some((w) => w.type === def.id)
        ).map((def) => {
          const Icon2 = def.icon;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              className: "btn btn-secondary btn-sm",
              style: { justifyContent: "flex-start", gap: 8, padding: "10px 12px" },
              onClick: () => addWidget(def),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, { size: 14 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: def.title })
              ]
            },
            def.id
          );
        }),
        AVAILABLE_WIDGETS.filter((def) => !layout.some((w) => w.type === def.id)).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 13, color: "var(--text-muted)", padding: 8 }, children: "All widgets are already on your dashboard!" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      display: "grid",
      gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
      gap: 16,
      gridAutoRows: "minmax(120px, auto)",
      position: "relative"
    }, children: [
      layout.map((widget, index) => {
        const widgetDef = AVAILABLE_WIDGETS.find((w) => w.id === widget.type);
        const Icon2 = (widgetDef == null ? void 0 : widgetDef.icon) || PanelRightClose;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            draggable: editMode,
            onDragStart: () => handleDragStart(widget, index),
            onDragEnter: () => handleDragEnter(index),
            onDragEnd: handleDragEnd,
            onDragOver: (e) => e.preventDefault(),
            style: {
              gridColumn: `span ${Math.min(widget.w, gridCols)}`,
              gridRow: `span ${widget.h}`,
              background: "var(--bg-card)",
              border: editMode ? "2px dashed var(--accent)" : "1px solid var(--border)",
              borderRadius: 12,
              padding: 16,
              cursor: editMode ? "grab" : "default",
              transition: "border-color 0.2s, box-shadow 0.2s",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 12,
                gap: 8
              }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, minWidth: 0 }, children: [
                  editMode && /* @__PURE__ */ jsxRuntimeExports.jsx(GripVertical, { size: 14, style: { color: "var(--text-muted)", cursor: "grab", flexShrink: 0 } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, { size: 14, style: { color: "var(--accent)", flexShrink: 0 } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: {
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }, children: widget.title })
                ] }),
                editMode && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 4, flexShrink: 0 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      className: "btn btn-ghost btn-sm",
                      style: { padding: "4px" },
                      onClick: () => cycleSize(widget),
                      title: "Resize widget",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(PanelRightOpen, { size: 12 })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      className: "btn btn-ghost btn-sm",
                      style: { padding: "4px", color: "var(--danger)" },
                      onClick: () => removeWidget(widget.id),
                      title: "Remove widget",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 12 })
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: 1, overflow: "auto", minHeight: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(WidgetContent, { widget, stats, widgets }) })
            ]
          },
          widget.id
        );
      }),
      layout.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        gridColumn: "1 / -1",
        padding: 48,
        textAlign: "center",
        color: "var(--text-muted)"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PanelsTopLeft, { size: 48, style: { opacity: 0.3, marginBottom: 12 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: 14, marginBottom: 16 }, children: "Your dashboard is empty!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-primary", onClick: () => setShowAddPanel(true), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
          " Add your first widget"
        ] })
      ] })
    ] }),
    editMode && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      marginTop: 16,
      padding: "10px 16px",
      background: "var(--accent-light)",
      border: "1px solid rgba(59, 130, 246, 0.3)",
      borderRadius: 8,
      fontSize: 12,
      color: "var(--accent)",
      display: "flex",
      alignItems: "center",
      gap: 8
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Settings2, { size: 14 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Customize mode:" }),
        " Drag to reorder • Click resize to change size • Click X to remove • Add widgets from the panel"
      ] })
    ] })
  ] });
}
const ALL_FORMATS = ["xlsx", "csv", "json", "pdf", "docx", "txt", "md"];
const DESCRIPTIONS = {
  xlsx: "Planilha Excel",
  csv: "Arquivo CSV",
  json: "JSON (dados)",
  pdf: "Documento PDF",
  docx: "Documento Word",
  txt: "Texto puro",
  md: "Markdown"
};
const DESTINO_DESC = {
  analysis: { title: "📊 Análise de Dados", desc: "Vai pro SmartImport: vira produtos, clientes, pedidos, dashboards", icon: ChartColumn, color: "#6366f1" },
  knowledge: { title: "📚 Base de Conhecimento", desc: "Vira artigo pesquisável: manuais, políticas, apostilas", icon: BookOpen, color: "#22c55e" }
};
const ACCEPT = {
  xlsx: ".xlsx,.xls",
  csv: ".csv",
  json: ".json",
  pdf: ".pdf",
  docx: ".docx,.doc",
  txt: ".txt",
  md: ".md"
};
function UploadPage() {
  var _a, _b, _c, _d;
  const [step, setStep] = reactExports.useState("choose-destino");
  const [destino, setDestino] = reactExports.useState(null);
  const [formatos, setFormatos] = reactExports.useState([]);
  const [file, setFile] = reactExports.useState(null);
  const [result, setResult] = reactExports.useState(null);
  const [error, setError] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [meta, setMeta] = reactExports.useState({ title: "", category: "geral", tags: "", type: "manual" });
  const inputRef = reactExports.useRef(null);
  const resetTudo = () => {
    setStep("choose-destino");
    setDestino(null);
    setFormatos([]);
    setFile(null);
    setResult(null);
    setError("");
    setMeta({ title: "", category: "geral", tags: "", type: "manual" });
  };
  const setDestinoHandler = (d) => {
    setDestino(d);
    if (d === "analysis") setFormatos(["xlsx", "csv", "json"]);
    else setFormatos(["pdf", "docx", "txt", "md"]);
    setStep("pick-formatos");
  };
  const toggleFormato = (f) => {
    setFormatos((prev) => prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]);
  };
  const handleUpload = async () => {
    var _a2, _b2, _c2, _d2, _e, _f, _g;
    if (!file || !destino) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const token = localStorage.getItem("omnis_token");
      const allowedAnalysis = ["xlsx", "csv", "json"];
      const allowedKnowledge = ["pdf", "docx", "txt", "md"];
      const ext = ((_a2 = file.name.split(".").pop()) == null ? void 0 : _a2.toLowerCase()) || "";
      if (destino === "analysis" && allowedAnalysis.includes(ext)) {
        const form = new FormData();
        form.append("file", file);
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: form
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Falha no upload");
        setResult({
          destino: "analysis",
          message: data.message || `Importado com sucesso!`,
          details: {
            "Tipo detectado": data.type || "—",
            "Confiança": data.confidence ? `${data.confidence}%` : "—",
            "Linhas": data.rowCount || "—",
            "Colunas": ((_b2 = data.columns) == null ? void 0 : _b2.join(", ")) || "—"
          }
        });
      } else if (destino === "knowledge" && allowedKnowledge.includes(ext)) {
        const form = new FormData();
        form.append("file", file);
        if (meta.title) form.append("title", meta.title);
        form.append("category", meta.category);
        form.append("tags", meta.tags);
        form.append("type", meta.type);
        const res = await fetch("/api/knowledge/upload", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: form
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Falha no upload");
        setResult({
          destino: "knowledge",
          message: `"${((_c2 = data.article) == null ? void 0 : _c2.title) || file.name}" adicionado à Base de Conhecimento`,
          details: {
            "Categoria": ((_d2 = data.article) == null ? void 0 : _d2.category) || meta.category,
            "Tipo": ((_e = data.article) == null ? void 0 : _e.type) || meta.type,
            "Tags": ((_f = data.article) == null ? void 0 : _f.tags) || meta.tags || "—",
            "Tamanho": `${(file.size / 1024).toFixed(1)} KB`
          }
        });
      } else {
        const form = new FormData();
        form.append("file", file);
        const title = meta.title || file.name.replace(/\.[^/.]+$/, "");
        form.append("title", title);
        form.append("category", destino === "analysis" ? "dados-importados" : meta.category);
        form.append("tags", `convertido,${destino},${ext}`);
        form.append("type", destino === "analysis" ? "dados" : "manual");
        const res = await fetch("/api/knowledge/upload", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: form
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Falha no upload");
        setResult({
          destino,
          message: `"${title}" recebido e registrado!`,
          conversion: true,
          details: {
            "Arquivo": file.name,
            "Tamanho": `${(file.size / 1024).toFixed(1)} KB`,
            "Destino": ((_g = DESTINO_DESC[destino]) == null ? void 0 : _g.title) || destino,
            "Nota": "Formato convertido — conteúdo disponível para consulta"
          }
        });
      }
      setStep("result");
    } catch (err) {
      setError(err.message || "Erro no upload");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { maxWidth: 720, margin: "0 auto" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "page-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "page-title", children: "Importar Arquivo" }) }),
    step === "choose-destino" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "var(--text-secondary)", marginBottom: 24, fontSize: 14 }, children: "Para onde este arquivo deve ir?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr", gap: 12, maxWidth: 500, margin: "0 auto" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            onClick: () => setDestinoHandler("analysis"),
            style: {
              background: "var(--bg-card)",
              border: "2px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: 24,
              cursor: "pointer",
              transition: "all 0.2s",
              display: "flex",
              gap: 16,
              alignItems: "center"
            },
            onMouseEnter: (e) => e.currentTarget.style.borderColor = "#6366f1",
            onMouseLeave: (e) => e.currentTarget.style.borderColor = "var(--border)",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { size: 40, style: { color: "#6366f1", flexShrink: 0 } }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { fontSize: 16, fontWeight: 600, marginBottom: 2 }, children: "📊 Análise de Dados" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: 13, color: "var(--text-secondary)" }, children: "Vai pro SmartImport: vira produtos, clientes, dashboards, alertas" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 20, style: { color: "var(--text-muted)", marginLeft: "auto", flexShrink: 0 } })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            onClick: () => setDestinoHandler("knowledge"),
            style: {
              background: "var(--bg-card)",
              border: "2px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: 24,
              cursor: "pointer",
              transition: "all 0.2s",
              display: "flex",
              gap: 16,
              alignItems: "center"
            },
            onMouseEnter: (e) => e.currentTarget.style.borderColor = "#22c55e",
            onMouseLeave: (e) => e.currentTarget.style.borderColor = "var(--border)",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { size: 40, style: { color: "#22c55e", flexShrink: 0 } }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { fontSize: 16, fontWeight: 600, marginBottom: 2 }, children: "📚 Base de Conhecimento" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: 13, color: "var(--text-secondary)" }, children: "Vira artigo pesquisável: manuais, políticas, apostilas, ética" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 20, style: { color: "var(--text-muted)", marginLeft: "auto", flexShrink: 0 } })
            ]
          }
        )
      ] })
    ] }),
    step === "pick-formatos" && destino && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost btn-sm", onClick: resetTudo, children: "← Voltar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { fontSize: 16, fontWeight: 600 }, children: ((_a = DESTINO_DESC[destino]) == null ? void 0 : _a.title) || destino })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { fontSize: 13, color: "var(--text-secondary)", marginBottom: 16 }, children: [
        "Quais formatos de arquivo este destino aceita?",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { style: { fontSize: 12 }, children: "(desmarque os que não quiser permitir)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 8, marginBottom: 24 }, children: ALL_FORMATS.map((fmt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          onClick: () => toggleFormato(fmt),
          style: {
            padding: "12px",
            borderRadius: "var(--radius-sm)",
            cursor: "pointer",
            textAlign: "center",
            fontSize: 13,
            fontWeight: 500,
            background: formatos.includes(fmt) ? "var(--primary-dim)" : "var(--bg)",
            border: `2px solid ${formatos.includes(fmt) ? "var(--primary)" : "var(--border)"}`,
            color: formatos.includes(fmt) ? "var(--primary-hover)" : "var(--text-secondary)",
            transition: "all 0.15s"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 20, marginBottom: 4 }, children: fmt === "xlsx" ? "📊" : fmt === "csv" ? "📋" : fmt === "json" ? "⚙️" : fmt === "pdf" ? "📕" : fmt === "docx" ? "📝" : fmt === "txt" ? "📄" : "📑" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              ".",
              fmt
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11, fontWeight: 400, marginTop: 2 }, children: DESCRIPTIONS[fmt] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 10, marginTop: 4, color: formatos.includes(fmt) ? "var(--primary)" : "var(--text-muted)" }, children: formatos.includes(fmt) ? "✓ aceito" : "clique p/ aceitar" })
          ]
        },
        fmt
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { borderTop: "1px solid var(--border)", paddingTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 13, color: "var(--text-secondary)" }, children: formatos.length === 0 ? "Selecione pelo menos um formato" : `${formatos.length} formato(s) selecionado(s)` }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: "btn btn-primary",
            disabled: formatos.length === 0,
            onClick: () => {
              setStep("upload");
            },
            children: [
              "Continuar ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 16 })
            ]
          }
        )
      ] })
    ] }),
    step === "upload" && destino && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost btn-sm", onClick: () => setStep("pick-formatos"), children: "← Voltar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: { fontSize: 16, fontWeight: 600 }, children: [
          (_b = DESTINO_DESC[destino]) == null ? void 0 : _b.title,
          " — Selecione o arquivo"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 12, color: "var(--text-muted)", padding: "4px 0" }, children: "Formatos aceitos:" }),
        formatos.map((fmt) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "badge badge-info", children: [
          ".",
          fmt
        ] }, fmt))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          onClick: () => {
            var _a2;
            return (_a2 = inputRef.current) == null ? void 0 : _a2.click();
          },
          style: {
            border: `2px dashed ${file ? "var(--primary)" : "var(--border)"}`,
            borderRadius: "var(--radius)",
            padding: 40,
            textAlign: "center",
            cursor: "pointer",
            marginBottom: 16,
            background: file ? "var(--primary-dim)" : "transparent",
            transition: "all 0.2s"
          },
          children: [
            file ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText$1, { size: 48, style: { opacity: 0.6, marginBottom: 12 } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontWeight: 500, fontSize: 15, marginBottom: 4 }, children: file.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { fontSize: 12, color: "var(--text-muted)" }, children: [
                (file.size / 1024).toFixed(1),
                " KB • ",
                DESCRIPTIONS[(_c = file.name.split(".").pop()) == null ? void 0 : _c.toLowerCase()] || "arquivo"
              ] })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 48, style: { opacity: 0.4, marginBottom: 12 } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontWeight: 500, marginBottom: 4, fontSize: 15 }, children: "Clique para selecionar ou arraste aqui" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: 12, color: "var(--text-muted)" }, children: formatos.map((f) => `.${f}`).join(", ") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: inputRef,
                type: "file",
                accept: formatos.map((f) => ACCEPT[f]).join(","),
                style: { display: "none" },
                onChange: (e) => {
                  var _a2;
                  return setFile(((_a2 = e.target.files) == null ? void 0 : _a2[0]) || null);
                }
              }
            )
          ]
        }
      ),
      file && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginBottom: 16 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", children: "Título (opcional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              className: "form-input",
              value: meta.title,
              onChange: (e) => setMeta({ ...meta, title: e.target.value }),
              placeholder: file.name.replace(/\.[^/.]+$/, "")
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", children: "Categoria" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              className: "form-select",
              value: meta.category,
              onChange: (e) => setMeta({ ...meta, category: e.target.value }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "geral", children: "Geral" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "etica", children: "Ética e Conduta" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "rh", children: "RH / Recursos Humanos" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "sistema", children: "Manual do Sistema" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "processos", children: "Processos" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "qualidade", children: "Qualidade" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "seguranca", children: "Segurança" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "financeiro", children: "Financeiro" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "vendas", children: "Vendas" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "compras", children: "Compras" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "juridico", children: "Jurídico" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "ti", children: "TI" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "dados-importados", children: "Dados Importados" })
              ]
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "btn btn-primary",
          onClick: handleUpload,
          disabled: !file || loading,
          style: { width: "100%", justifyContent: "center", padding: "10px" },
          children: loading ? "Processando..." : `Enviar para ${((_d = DESTINO_DESC[destino]) == null ? void 0 : _d.title) || "..."}`
        }
      ),
      error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        marginTop: 16,
        padding: 12,
        background: "rgba(239,68,68,0.1)",
        borderRadius: "var(--radius-sm)",
        color: "var(--danger)",
        fontSize: 13,
        display: "flex",
        gap: 8,
        alignItems: "center"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 16 }),
        " ",
        error
      ] })
    ] }),
    step === "result" && result && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        padding: 20,
        background: "rgba(34,197,94,0.08)",
        borderRadius: "var(--radius-sm)",
        marginBottom: 16,
        display: "flex",
        gap: 12,
        alignItems: "flex-start"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 24, style: { color: "var(--success)", flexShrink: 0, marginTop: 2 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontWeight: 600, fontSize: 15, marginBottom: 4, color: "var(--success)" }, children: result.message }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 12, color: "var(--text-muted)" }, children: [
            result.destino === "analysis" ? "Os dados foram importados e já estão disponíveis para consulta e análises." : "O documento foi adicionado à Base de Conhecimento. Todos podem consultar.",
            result.conversion && " O sistema registrou o arquivo para processamento futuro."
          ] })
        ] })
      ] }),
      result.details && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }, children: Object.entries(result.details).map(([key, val]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "8px 12px", background: "var(--bg)", borderRadius: "var(--radius-sm)" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11, color: "var(--text-muted)", marginBottom: 2 }, children: key }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 13, fontWeight: 500 }, children: String(val) })
      ] }, key)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary", onClick: resetTudo, children: "Importar Outro Arquivo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "btn btn-ghost",
            onClick: () => window.location.href = result.destino === "analysis" ? "/products" : "/knowledge",
            children: result.destino === "analysis" ? "Ver Dados" : "Ver Base"
          }
        )
      ] })
    ] }),
    step !== "result" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: 24, padding: 16, background: "var(--bg-card)", borderRadius: "var(--radius)", border: "1px solid var(--border)", fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "💡 Sem restrições:" }),
      " Qualquer formato pode ir para qualquer destino.",
      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
      "• Uma planilha ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: ".xlsx" }),
      " pode virar artigo na Base de Conhecimento",
      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
      "• Um ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: ".pdf" }),
      " pode ser enviado como dado para análise",
      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
      "• O sistema adapta o conteúdo ao destino escolhido"
    ] })
  ] });
}
function Card({ title, children, className = "", action }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `card ${className}`, children: [
    (title || action) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-header", children: [
      title && /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "card-title", children: title }),
      action && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: action })
    ] }),
    children
  ] });
}
const alertTypeConfig = {
  stock: { label: "Stock", variant: "warning" },
  payment: { label: "Payment", variant: "danger" },
  contract: { label: "Contract", variant: "info" },
  system: { label: "System", variant: "success" }
};
const severityConfig = {
  critical: { label: "Critical", variant: "danger" },
  high: { label: "High", variant: "warning" },
  medium: { label: "Medium", variant: "info" },
  low: { label: "Low", variant: "success" }
};
const mockAlerts = [
  { id: 1, type: "stock", severity: "critical", title: "Feijão Preto 1kg out of stock", message: "Stock is at 0 units. Minimum required: 30. Immediate replenishment needed.", source: "Products", isRead: false, isResolved: false, isConfigurable: true, actions: [{ label: "Create Purchase Order", type: "investigate" }, { label: "Dismiss", type: "dismiss" }], createdAt: "2026-06-10T08:00:00Z", resolvedAt: null },
  { id: 2, type: "stock", severity: "high", title: "Leite em Pó 400g low stock", message: "Stock is at 5 units. Minimum required: 15. Order recommended soon.", source: "Products", isRead: false, isResolved: false, isConfigurable: true, actions: [{ label: "View Product", type: "investigate" }, { label: "Dismiss", type: "dismiss" }], createdAt: "2026-06-10T07:30:00Z", resolvedAt: null },
  { id: 3, type: "payment", severity: "critical", title: "Client Carlos Mendes - Overdue invoice", message: "Invoice #ORD-2026-0006 ($45.00) is 21 days overdue. Payment expected.", source: "Accounts Receivable", isRead: false, isResolved: false, isConfigurable: true, actions: [{ label: "Contact Client", type: "notify" }, { label: "Mark as Collected", type: "resolve" }], createdAt: "2026-06-09T14:00:00Z", resolvedAt: null },
  { id: 4, type: "payment", severity: "medium", title: "Upcoming payments due in 5 days", message: "3 invoices totaling $18,250.00 are due within the next 5 days. Ensure sufficient funds.", source: "Accounts Payable", isRead: true, isResolved: false, isConfigurable: true, actions: [{ label: "View Invoices", type: "investigate" }, { label: "Dismiss", type: "dismiss" }], createdAt: "2026-06-08T10:00:00Z", resolvedAt: null },
  { id: 5, type: "contract", severity: "high", title: "Supplier contract expiring soon", message: "Contract with Distribuidora ABC expires in 15 days. Review and renew terms.", source: "Contracts", isRead: false, isResolved: false, isConfigurable: true, actions: [{ label: "Review Contract", type: "investigate" }, { label: "Contact Supplier", type: "notify" }], createdAt: "2026-06-07T09:00:00Z", resolvedAt: null },
  { id: 6, type: "system", severity: "low", title: "Daily backup completed successfully", message: "Full database backup completed at 02:00 AM. Duration: 12 minutes. Size: 2.4 GB.", source: "IT", isRead: true, isResolved: true, isConfigurable: false, actions: [], createdAt: "2026-06-10T02:15:00Z", resolvedAt: "2026-06-10T02:15:00Z" },
  { id: 7, type: "system", severity: "medium", title: "API rate limit approaching", message: "API usage at 75% of daily limit. 25000 requests used out of 33333.", source: "IT", isRead: false, isResolved: false, isConfigurable: true, actions: [{ label: "View Usage", type: "investigate" }, { label: "Dismiss", type: "dismiss" }], createdAt: "2026-06-10T06:00:00Z", resolvedAt: null },
  { id: 8, type: "stock", severity: "critical", title: "Multiple products below minimum stock", message: "3 products (Arroz, Detergente, Óleo) are below minimum stock levels. Review recommended.", source: "Products", isRead: true, isResolved: false, isConfigurable: true, actions: [{ label: "View Products", type: "investigate" }, { label: "Dismiss", type: "dismiss" }], createdAt: "2026-06-09T16:00:00Z", resolvedAt: null },
  { id: 9, type: "contract", severity: "low", title: "Client contract renewal reminder", message: "Gold client Tech Solutions Ltda contract renewal available in 30 days.", source: "Contracts", isRead: false, isResolved: false, isConfigurable: true, actions: [{ label: "View Contract", type: "investigate" }, { label: "Dismiss", type: "dismiss" }], createdAt: "2026-06-08T11:00:00Z", resolvedAt: null },
  { id: 10, type: "payment", severity: "high", title: "Client credit limit exceeded", message: "Client Comercial ABC Ltda has exceeded credit limit. Block further orders.", source: "Accounts Receivable", isRead: false, isResolved: false, isConfigurable: true, actions: [{ label: "Block Client", type: "resolve" }, { label: "Review Limit", type: "investigate" }], createdAt: "2026-06-07T15:00:00Z", resolvedAt: null }
];
function AlertsPage() {
  const [search, setSearch] = reactExports.useState("");
  const [typeFilter, setTypeFilter] = reactExports.useState("all");
  const [severityFilter, setSeverityFilter] = reactExports.useState("all");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const filtered = reactExports.useMemo(() => {
    let data = [...mockAlerts];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (a) => a.title.toLowerCase().includes(q) || a.message.toLowerCase().includes(q) || a.source.toLowerCase().includes(q)
      );
    }
    if (typeFilter !== "all") data = data.filter((a) => a.type === typeFilter);
    if (severityFilter !== "all") data = data.filter((a) => a.severity === severityFilter);
    if (statusFilter === "unread") data = data.filter((a) => !a.isRead);
    else if (statusFilter === "resolved") data = data.filter((a) => a.isResolved);
    else if (statusFilter === "active") data = data.filter((a) => !a.isResolved);
    return data;
  }, [search, typeFilter, severityFilter, statusFilter]);
  const [alerts, setAlerts] = reactExports.useState(mockAlerts);
  const handleAction = (alertId, actionType) => {
    setAlerts((prev) => prev.map((a) => {
      if (a.id !== alertId) return a;
      if (actionType === "dismiss") return { ...a, isRead: true };
      if (actionType === "resolve") return { ...a, isResolved: true, isRead: true, resolvedAt: (/* @__PURE__ */ new Date()).toISOString() };
      return { ...a, isRead: true };
    }));
  };
  const criticalCount = mockAlerts.filter((a) => a.severity === "critical" && !a.isResolved).length;
  const unreadCount = mockAlerts.filter((a) => !a.isRead).length;
  const activeCount = mockAlerts.filter((a) => !a.isResolved).length;
  const stockAlerts = mockAlerts.filter((a) => a.type === "stock" && !a.isResolved).length;
  const getTypeIcon = (type) => {
    switch (type) {
      case "stock":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { size: 16 });
      case "payment":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 16 });
      case "contract":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(BellOff, { size: 16 });
      case "system":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { size: 16 });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { size: 16 });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "page-title", children: "Alerts" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search$1, { size: 14, style: { position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "form-input", placeholder: "Search alerts...", value: search, onChange: (e) => setSearch(e.target.value), style: { width: 220, paddingLeft: 30 } })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "form-input", value: typeFilter, onChange: (e) => setTypeFilter(e.target.value), style: { width: 120 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Types" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "stock", children: "Stock" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "payment", children: "Payment" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "contract", children: "Contract" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "system", children: "System" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "form-input", value: severityFilter, onChange: (e) => setSeverityFilter(e.target.value), style: { width: 120 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Severity" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "critical", children: "Critical" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "high", children: "High" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "medium", children: "Medium" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "low", children: "Low" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "form-input", value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), style: { width: 120 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "active", children: "Active" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "unread", children: "Unread" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "resolved", children: "Resolved" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "secondary", size: "sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { size: 14 }),
          " Configure"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stats-grid", style: { marginBottom: 24 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-label", children: "Active Alerts" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-value", style: { color: "var(--danger)" }, children: activeCount })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-label", children: "Critical" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-value", style: { color: "var(--danger)" }, children: criticalCount })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-label", children: "Unread" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-value", style: { color: "var(--warning)" }, children: unreadCount })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-label", children: "Stock Alerts" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-value", style: { color: "var(--warning)" }, children: stockAlerts })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: `Alerts (${filtered.length})`, children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 48 }),
        message: "No alerts found matching your filters",
        action: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "primary", size: "sm", children: "Configure Alerts" })
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: filtered.map((a) => {
      const displayedAlert = alerts.find((al) => al.id === a.id) || a;
      const typeCfg = alertTypeConfig[displayedAlert.type];
      const severityCfg = severityConfig[displayedAlert.severity];
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        padding: "14px 16px",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        opacity: displayedAlert.isResolved ? 0.45 : displayedAlert.isRead ? 0.7 : 1,
        borderLeft: displayedAlert.severity === "critical" ? "3px solid var(--danger)" : displayedAlert.severity === "high" ? "3px solid var(--warning)" : "3px solid transparent",
        transition: "all 0.2s",
        background: displayedAlert.isRead ? "transparent" : "var(--accent-light)",
        borderRadius: "0 4px 4px 0",
        marginBottom: 2
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          width: 32,
          height: 32,
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: displayedAlert.severity === "critical" ? "rgba(239,68,68,0.15)" : displayedAlert.severity === "high" ? "rgba(245,158,11,0.15)" : "var(--bg-secondary)",
          color: displayedAlert.severity === "critical" ? "var(--danger)" : displayedAlert.severity === "high" ? "var(--warning)" : "var(--text-muted)",
          flexShrink: 0
        }, children: getTypeIcon(displayedAlert.type) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontWeight: 600, fontSize: 14 }, children: displayedAlert.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: typeCfg.variant, children: typeCfg.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: severityCfg.variant, children: severityCfg.label }),
            displayedAlert.isResolved && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "success", children: "Resolved" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 13, color: "var(--text-secondary)", marginBottom: 6 }, children: displayedAlert.message }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 16, fontSize: 12, color: "var(--text-muted)", flexWrap: "wrap" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Source: ",
              displayedAlert.source
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(displayedAlert.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) }),
            displayedAlert.resolvedAt && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Resolved: ",
              new Date(displayedAlert.resolvedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
            ] })
          ] }),
          !displayedAlert.isResolved && displayedAlert.actions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 6, marginTop: 10 }, children: displayedAlert.actions.map((action, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: action.type === "resolve" ? "primary" : action.type === "investigate" ? "secondary" : "ghost",
              size: "sm",
              onClick: () => handleAction(displayedAlert.id, action.type),
              children: [
                action.type === "resolve" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 12 }) : action.type === "dismiss" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 12 }) : action.type === "notify" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { size: 12 }) : null,
                " ",
                action.label
              ]
            },
            idx
          )) })
        ] })
      ] }, displayedAlert.id);
    }) }) })
  ] });
}
const mockProducts = [
  { id: 1, code: "PROD-001", barcode: "7891234560010", name: "Arroz Integral 5kg", description: "Arroz integral tipo 1", category: "Alimentos", brand: "MinhaMarca", quantity: 120, minStock: 20, unitPrice: 22.9, costPrice: 15, supplier: "Distribuidora ABC", suppliers: ["Distribuidora ABC", "Alimentos SP"], status: "active", imageUrl: null, createdAt: "2025-01-15" },
  { id: 2, code: "PROD-002", barcode: "7891234560027", name: "Feijão Preto 1kg", description: "Feijão preto selecionado", category: "Alimentos", brand: "MinhaMarca", quantity: 8, minStock: 30, unitPrice: 8.5, costPrice: 5.2, supplier: "Alimentos SP", suppliers: ["Alimentos SP"], status: "active", imageUrl: null, createdAt: "2025-02-10" },
  { id: 3, code: "PROD-003", barcode: "7891234560034", name: "Óleo de Soja 900ml", description: "Óleo de soja refinado", category: "Alimentos", brand: "CozinhaFácil", quantity: 200, minStock: 50, unitPrice: 6.99, costPrice: 4.1, supplier: "Distribuidora ABC", suppliers: ["Distribuidora ABC", "Mega Distrib"], status: "active", imageUrl: null, createdAt: "2025-01-20" },
  { id: 4, code: "PROD-004", barcode: "7891234560041", name: "Detergente Líquido 500ml", description: "Detergente neutro", category: "Limpeza", brand: "Limpol", quantity: 0, minStock: 40, unitPrice: 2.5, costPrice: 1.3, supplier: "Produtos de Limpeza Ltda", suppliers: ["Produtos de Limpeza Ltda"], status: "inactive", imageUrl: null, createdAt: "2025-03-05" },
  { id: 5, code: "PROD-005", barcode: "7891234560058", name: "Sabão em Pó 1kg", description: "Sabão em pó biological", category: "Limpeza", brand: "Limpol", quantity: 55, minStock: 25, unitPrice: 12.9, costPrice: 8, supplier: "Produtos de Limpeza Ltda", suppliers: ["Produtos de Limpeza Ltda", "Químicos União"], status: "active", imageUrl: null, createdAt: "2025-02-28" },
  { id: 6, code: "PROD-006", barcode: "7891234560065", name: "Leite em Pó 400g", description: "Leite em pó integral", category: "Alimentos", brand: "NutriLeite", quantity: 5, minStock: 15, unitPrice: 18.5, costPrice: 12, supplier: "Laticínios Premium", suppliers: ["Laticínios Premium"], status: "active", imageUrl: null, createdAt: "2025-04-01" },
  { id: 7, code: "PROD-007", barcode: "7891234560072", name: "Papel Higiênico 12un", description: "Papel higiênico folha dupla", category: "Higiene", brand: "Conforto", quantity: 300, minStock: 60, unitPrice: 15.9, costPrice: 10.5, supplier: "Higiene Total", suppliers: ["Higiene Total", "Mega Distrib"], status: "active", imageUrl: null, createdAt: "2025-01-10" },
  { id: 8, code: "PROD-008", barcode: "7891234560089", name: "Café Torrado 500g", description: "Café torrado moído", category: "Alimentos", brand: "CaféBom", quantity: 0, minStock: 30, unitPrice: 14.9, costPrice: 9, supplier: "Alimentos SP", suppliers: ["Alimentos SP"], status: "discontinued", imageUrl: null, createdAt: "2025-05-12" },
  { id: 9, code: "PROD-009", barcode: "7891234560096", name: "Amaciante 2L", description: "Amaciante concentrado", category: "Limpeza", brand: "MaciezTotal", quantity: 18, minStock: 20, unitPrice: 9.9, costPrice: 5.8, supplier: "Químicos União", suppliers: ["Químicos União", "Produtos de Limpeza Ltda"], status: "active", imageUrl: null, createdAt: "2025-03-20" },
  { id: 10, code: "PROD-010", barcode: "7891234560102", name: "Água Sanitária 1L", description: "Água sanitária cloro ativo", category: "Limpeza", brand: "BrilhoMax", quantity: 40, minStock: 20, unitPrice: 3.9, costPrice: 2.1, supplier: "Produtos de Limpeza Ltda", suppliers: ["Produtos de Limpeza Ltda"], status: "active", imageUrl: null, createdAt: "2025-04-15" }
];
function ProductsPage() {
  const [search, setSearch] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [stockFilter, setStockFilter] = reactExports.useState("all");
  const [categoryFilter, setCategoryFilter] = reactExports.useState("all");
  const [page, setPage] = reactExports.useState(1);
  const perPage = 10;
  const categories = reactExports.useMemo(() => {
    const cats = new Set(mockProducts.map((p) => p.category));
    return ["all", ...Array.from(cats)];
  }, []);
  const filtered = reactExports.useMemo(() => {
    let data = [...mockProducts];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (p) => p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q) || p.barcode.includes(q) || p.supplier.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== "all") {
      data = data.filter((p) => p.status === statusFilter);
    }
    if (stockFilter === "low") {
      data = data.filter((p) => p.quantity > 0 && p.quantity <= p.minStock);
    } else if (stockFilter === "out") {
      data = data.filter((p) => p.quantity === 0);
    } else if (stockFilter === "ok") {
      data = data.filter((p) => p.quantity > p.minStock);
    }
    if (categoryFilter !== "all") {
      data = data.filter((p) => p.category === categoryFilter);
    }
    return data;
  }, [search, statusFilter, stockFilter, categoryFilter]);
  const totalPages = Math.ceil(filtered.length / perPage);
  const pageData = filtered.slice((page - 1) * perPage, page * perPage);
  const getStockBadge = (qty, min) => {
    if (qty === 0) return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "danger", children: "Out of Stock" });
    if (qty <= min) return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "warning", children: "Low Stock" });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "success", children: "In Stock" });
  };
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "success", children: "Active" });
      case "inactive":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "warning", children: "Inactive" });
      case "discontinued":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "danger", children: "Discontinued" });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "info", children: status });
    }
  };
  const productCount = mockProducts.length;
  const lowStockCount = mockProducts.filter((p) => p.quantity > 0 && p.quantity <= p.minStock).length;
  const outOfStockCount = mockProducts.filter((p) => p.quantity === 0).length;
  const totalValue = mockProducts.reduce((sum, p) => sum + p.quantity * p.unitPrice, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "page-title", children: "Products" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: (e) => {
          e.preventDefault();
          setPage(1);
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search$1, { size: 14, style: { position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              className: "form-input",
              placeholder: "Search products...",
              value: search,
              onChange: (e) => {
                setSearch(e.target.value);
                setPage(1);
              },
              style: { width: 220, paddingLeft: 30 }
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "form-input", value: statusFilter, onChange: (e) => {
          setStatusFilter(e.target.value);
          setPage(1);
        }, style: { width: 130 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "active", children: "Active" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "inactive", children: "Inactive" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "discontinued", children: "Discontinued" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "form-input", value: stockFilter, onChange: (e) => {
          setStockFilter(e.target.value);
          setPage(1);
        }, style: { width: 130 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Stock" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "low", children: "Low Stock" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "out", children: "Out of Stock" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "ok", children: "In Stock" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: "form-input", value: categoryFilter, onChange: (e) => {
          setCategoryFilter(e.target.value);
          setPage(1);
        }, style: { width: 130 }, children: categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: cat, children: cat === "all" ? "All Categories" : cat }, cat)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "primary", size: "sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
          " Add Product"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stats-grid", style: { marginBottom: 24 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-label", children: "Total Products" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-value", children: productCount })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-label", children: "Low Stock" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-value", style: { color: "var(--warning)" }, children: lowStockCount })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-label", children: "Out of Stock" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-value", style: { color: "var(--danger)" }, children: outOfStockCount })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-label", children: "Inventory Value" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-value", children: [
          "$",
          totalValue.toFixed(2)
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { title: `Products (${filtered.length})`, children: [
      filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 48 }),
          message: "No products found matching your filters",
          action: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "primary", size: "sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
            " Add Product"
          ] })
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "table-wrapper", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { width: 50 }, children: "Photo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Code / Barcode" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Stock" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Min. Stock" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Price" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Suppliers" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: pageData.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            width: 40,
            height: 40,
            borderRadius: 6,
            background: "var(--bg-secondary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid var(--border)"
          }, children: p.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.imageUrl, alt: p.name, style: { width: 40, height: 40, borderRadius: 6, objectFit: "cover" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { size: 18, style: { color: "var(--text-muted)" } }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontWeight: 600, fontSize: 13 }, children: p.code }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11, color: "var(--text-muted)", fontFamily: "monospace" }, children: p.barcode })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontWeight: 500 }, children: p.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11, color: "var(--text-muted)" }, children: p.brand })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "info", children: p.category }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontWeight: 600, color: p.quantity === 0 ? "var(--danger)" : p.quantity <= p.minStock ? "var(--warning)" : void 0 }, children: p.quantity }),
            getStockBadge(p.quantity, p.minStock)
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { color: "var(--text-secondary)" }, children: p.minStock }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontWeight: 600 }, children: [
              "$",
              p.unitPrice.toFixed(2)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 11, color: "var(--text-muted)" }, children: [
              "Cost: $",
              p.costPrice.toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 13 }, children: p.supplier }),
            p.suppliers.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 11, color: "var(--text-muted)" }, children: [
              "+",
              p.suppliers.length - 1,
              " more"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: getStatusBadge(p.status) })
        ] }, p.id)) })
      ] }) }),
      totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "center", gap: 8, marginTop: 16 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", disabled: page <= 1, onClick: () => setPage(page - 1), children: "Previous" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { padding: "4px 8px", fontSize: 13, color: "var(--text-secondary)" }, children: [
          page,
          " of ",
          totalPages
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", disabled: page >= totalPages, onClick: () => setPage(page + 1), children: "Next" })
      ] })
    ] })
  ] });
}
const mockClients = [
  { id: 1, name: "João Silva", type: "person", email: "joao@email.com", phone: "(11) 99999-0001", cpfCnpj: "123.456.789-00", city: "São Paulo", state: "SP", status: "active", creditLimit: 5e3, totalSpent: 32500.5, lastPurchase: "2026-06-01", birthday: "1990-03-15", segment: "Gold", notes: "Cliente VIP, pagamento sempre em dia", createdAt: "2024-01-10" },
  { id: 2, name: "Maria Oliveira", type: "person", email: "maria@email.com", phone: "(21) 98888-0002", cpfCnpj: "987.654.321-00", city: "Rio de Janeiro", state: "RJ", status: "active", creditLimit: 3e3, totalSpent: 12800, lastPurchase: "2026-05-28", birthday: "1985-07-22", segment: "Silver", notes: "", createdAt: "2024-03-15" },
  { id: 3, name: "Tech Solutions Ltda", type: "company", email: "contato@techsolutions.com", phone: "(11) 3000-0003", cpfCnpj: "11.222.333/0001-44", city: "Campinas", state: "SP", status: "active", creditLimit: 25e3, totalSpent: 89500, lastPurchase: "2026-06-05", birthday: null, segment: "Gold", notes: "Contrato anual de manutenção", createdAt: "2023-11-20" },
  { id: 4, name: "Carlos Mendes", type: "person", email: "carlos@email.com", phone: "(31) 97777-0004", cpfCnpj: "456.789.123-00", city: "Belo Horizonte", state: "MG", status: "inactive", creditLimit: 1e3, totalSpent: 450, lastPurchase: "2025-12-10", birthday: "1992-11-30", segment: "Bronze", notes: "Cliente inativo há 6 meses", createdAt: "2025-06-01" },
  { id: 5, name: "Ana Beatriz Costa", type: "person", email: "ana@email.com", phone: "(41) 96666-0005", cpfCnpj: "321.654.987-00", city: "Curitiba", state: "PR", status: "active", creditLimit: 8e3, totalSpent: 22300.75, lastPurchase: "2026-06-02", birthday: "1988-09-08", segment: "Gold", notes: "", createdAt: "2024-07-10" },
  { id: 6, name: "Comercial ABC Ltda", type: "company", email: "abc@comercialabc.com", phone: "(11) 4000-0006", cpfCnpj: "22.333.444/0001-55", city: "São Paulo", state: "SP", status: "blocked", creditLimit: 0, totalSpent: 15e3, lastPurchase: "2026-04-15", birthday: null, segment: "Silver", notes: "Bloqueado por inadimplência", createdAt: "2024-02-05" },
  { id: 7, name: "Fernanda Lima", type: "person", email: "fernanda@email.com", phone: "(51) 95555-0007", cpfCnpj: "654.321.789-00", city: "Porto Alegre", state: "RS", status: "active", creditLimit: 2e3, totalSpent: 6700, lastPurchase: "2026-05-20", birthday: "1995-01-25", segment: "Silver", notes: "", createdAt: "2025-01-20" },
  { id: 8, name: "Distribuidora Norte", type: "company", email: "vendas@distnorte.com", phone: "(92) 3333-0008", cpfCnpj: "33.444.555/0001-66", city: "Manaus", state: "AM", status: "active", creditLimit: 15e3, totalSpent: 45e3, lastPurchase: "2026-06-03", birthday: null, segment: "Gold", notes: "Parceiro estratégico região norte", createdAt: "2024-09-01" },
  { id: 9, name: "Pedro Alves", type: "person", email: "pedro@email.com", phone: "(61) 94444-0009", cpfCnpj: "789.123.456-00", city: "Brasília", state: "DF", status: "active", creditLimit: 1500, totalSpent: 3200, lastPurchase: "2026-05-10", birthday: "1993-06-14", segment: "Bronze", notes: "", createdAt: "2025-10-05" },
  { id: 10, name: "Luciana Souza", type: "person", email: "luciana@email.com", phone: "(71) 93333-0010", cpfCnpj: "147.258.369-00", city: "Salvador", state: "BA", status: "active", creditLimit: 4e3, totalSpent: 9800.5, lastPurchase: "2026-06-04", birthday: "1991-12-01", segment: "Silver", notes: "", createdAt: "2025-03-18" }
];
function ClientsPage() {
  const [search, setSearch] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [segmentFilter, setSegmentFilter] = reactExports.useState("all");
  const [typeFilter, setTypeFilter] = reactExports.useState("all");
  const filtered = reactExports.useMemo(() => {
    let data = [...mockClients];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.cpfCnpj.includes(q) || c.phone.includes(q) || c.city.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== "all") data = data.filter((c) => c.status === statusFilter);
    if (segmentFilter !== "all") data = data.filter((c) => c.segment === segmentFilter);
    if (typeFilter !== "all") data = data.filter((c) => c.type === typeFilter);
    return data;
  }, [search, statusFilter, segmentFilter, typeFilter]);
  const getSegmentBadge = (segment) => {
    switch (segment) {
      case "Gold":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "warning", children: "Gold" });
      case "Silver":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "info", children: "Silver" });
      case "Bronze":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "success", children: "Bronze" });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "info", children: segment });
    }
  };
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "success", children: "Active" });
      case "inactive":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "warning", children: "Inactive" });
      case "blocked":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "danger", children: "Blocked" });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "info", children: status });
    }
  };
  const activeClients = mockClients.filter((c) => c.status === "active").length;
  const totalRevenue = mockClients.reduce((sum, c) => sum + c.totalSpent, 0);
  const goldCount = mockClients.filter((c) => c.segment === "Gold").length;
  const avgTicket = mockClients.length > 0 ? totalRevenue / mockClients.length : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "page-title", children: "Clients" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search$1, { size: 14, style: { position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              className: "form-input",
              placeholder: "Search clients...",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              style: { width: 220, paddingLeft: 30 }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "form-input", value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), style: { width: 120 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "active", children: "Active" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "inactive", children: "Inactive" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "blocked", children: "Blocked" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "form-input", value: segmentFilter, onChange: (e) => setSegmentFilter(e.target.value), style: { width: 120 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Segments" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Gold", children: "Gold" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Silver", children: "Silver" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Bronze", children: "Bronze" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "form-input", value: typeFilter, onChange: (e) => setTypeFilter(e.target.value), style: { width: 120 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Types" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "person", children: "Individual" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "company", children: "Company" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "primary", size: "sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
          " Add Client"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stats-grid", style: { marginBottom: 24 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-label", children: "Total Clients" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-value", children: mockClients.length })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-label", children: "Active" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-value", style: { color: "var(--success)" }, children: activeClients })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-label", children: "Gold Clients" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-value", style: { color: "var(--warning)" }, children: goldCount })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-label", children: "Avg. Ticket" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-value", children: [
          "$",
          avgTicket.toFixed(2)
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: `Clients (${filtered.length})`, children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 48 }),
        message: "No clients found matching your filters",
        action: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "primary", size: "sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
          " Add Client"
        ] })
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "table-wrapper", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Contact" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Segment" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Total Spent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Last Purchase" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Credit Limit" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Birthday" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontWeight: 500 }, children: c.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11, color: "var(--text-muted)" }, children: c.cpfCnpj })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "info", children: c.type === "person" ? "Individual" : "Company" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 13 }, children: c.email }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11, color: "var(--text-muted)" }, children: c.phone }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 11, color: "var(--text-muted)" }, children: [
            c.city,
            "/",
            c.state
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: getSegmentBadge(c.segment) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { style: { fontWeight: 600 }, children: [
          "$",
          c.totalSpent.toFixed(2)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: c.lastPurchase ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 13 }, children: new Date(c.lastPurchase).toLocaleDateString("en-US") }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--text-muted)" }, children: "Never" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontWeight: 600, color: c.creditLimit > 0 ? void 0 : "var(--text-muted)" }, children: [
          "$",
          c.creditLimit.toFixed(2)
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: c.birthday ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 4 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 12, style: { color: "var(--text-muted)" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 13 }, children: new Date(c.birthday).toLocaleDateString("en-US", { month: "short", day: "numeric" }) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--text-muted)", fontSize: 12 }, children: "N/A" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: getStatusBadge(c.status) })
      ] }, c.id)) })
    ] }) }) })
  ] });
}
function SuppliersPage() {
  const [items, setItems] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [search, setSearch] = reactExports.useState("");
  reactExports.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ limit: "100" });
        if (search) params.set("search", search);
        const res = await api.getSuppliers(params.toString());
        setItems(res.data || []);
      } finally {
        setLoading(false);
      }
    })();
  }, [search]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "page-title", children: "Fornecedores" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "form-input", placeholder: "Buscar...", value: search, onChange: (e) => setSearch(e.target.value), style: { width: 200 } })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "table-container", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Razão Social" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "CNPJ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Contato" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Telefone" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Avaliação" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 7, style: { textAlign: "center", padding: 40, color: "var(--text-muted)" }, children: "Nenhum fornecedor" }) }) : items.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { fontWeight: 500 }, children: s.corporateName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: s.cnpj || "-" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: s.contactPerson || "-" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: s.email || "-" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: s.phone || "-" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: "⭐".repeat(Math.round(s.rating || 0)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `badge badge-${s.status === "active" ? "success" : "neutral"}`, children: s.status }) })
      ] }, s.id)) })
    ] }) }) })
  ] });
}
const mockOrders = [
  { id: 1, orderNumber: "ORD-2026-0001", type: "sale", clientName: "João Silva", supplierName: null, status: "delivered", total: 458.5, items: [{ productName: "Arroz Integral 5kg", quantity: 10, unitPrice: 22.9 }, { productName: "Feijão Preto 1kg", quantity: 20, unitPrice: 8.5 }, { productName: "Óleo de Soja 900ml", quantity: 15, unitPrice: 6.99 }], orderDate: "2026-05-20", expectedDate: "2026-05-25", deliveredDate: "2026-05-24", invoiceNumber: "NF-2026-001", paymentMethod: "Credit Card", notes: "" },
  { id: 2, orderNumber: "ORD-2026-0002", type: "purchase", clientName: "-", supplierName: "Distribuidora ABC", status: "shipped", total: 12500, items: [{ productName: "Arroz Integral 5kg", quantity: 200, unitPrice: 15 }, { productName: "Feijão Preto 1kg", quantity: 300, unitPrice: 5.2 }, { productName: "Óleo de Soja 900ml", quantity: 150, unitPrice: 4.1 }], orderDate: "2026-05-28", expectedDate: "2026-06-05", deliveredDate: null, invoiceNumber: "NF-2026-002", paymentMethod: "Boleto", notes: "Compra mensal estoque" },
  { id: 3, orderNumber: "ORD-2026-0003", type: "sale", clientName: "Maria Oliveira", supplierName: null, status: "approved", total: 189, items: [{ productName: "Papel Higiênico 12un", quantity: 6, unitPrice: 15.9 }, { productName: "Sabão em Pó 1kg", quantity: 4, unitPrice: 12.9 }, { productName: "Amaciante 2L", quantity: 3, unitPrice: 9.9 }], orderDate: "2026-06-01", expectedDate: "2026-06-06", deliveredDate: null, invoiceNumber: null, paymentMethod: "Pix", notes: "Entrega urgente" },
  { id: 4, orderNumber: "ORD-2026-0004", type: "sale", clientName: "Tech Solutions Ltda", supplierName: null, status: "pending", total: 3450, items: [{ productName: "Café Torrado 500g", quantity: 50, unitPrice: 14.9 }, { productName: "Leite em Pó 400g", quantity: 30, unitPrice: 18.5 }, { productName: "Água Sanitária 1L", quantity: 100, unitPrice: 3.9 }, { productName: "Detergente Líquido 500ml", quantity: 200, unitPrice: 2.5 }], orderDate: "2026-06-05", expectedDate: "2026-06-10", deliveredDate: null, invoiceNumber: null, paymentMethod: "Credit Card", notes: "Pedido corporativo" },
  { id: 5, orderNumber: "ORD-2026-0005", type: "purchase", clientName: "-", supplierName: "Alimentos SP", status: "pending", total: 8900, items: [{ productName: "Arroz Integral 5kg", quantity: 300, unitPrice: 15 }, { productName: "Café Torrado 500g", quantity: 120, unitPrice: 9 }], orderDate: "2026-06-06", expectedDate: "2026-06-12", deliveredDate: null, invoiceNumber: null, paymentMethod: "Boleto", notes: "" },
  { id: 6, orderNumber: "ORD-2026-0006", type: "sale", clientName: "Carlos Mendes", supplierName: null, status: "cancelled", total: 45, items: [{ productName: "Água Sanitária 1L", quantity: 5, unitPrice: 3.9 }, { productName: "Sabão em Pó 1kg", quantity: 2, unitPrice: 12.9 }], orderDate: "2026-05-15", expectedDate: "2026-05-20", deliveredDate: null, invoiceNumber: null, paymentMethod: "Pix", notes: "Cancelado por solicitação do cliente" },
  { id: 7, orderNumber: "ORD-2026-0007", type: "sale", clientName: "Ana Beatriz Costa", supplierName: null, status: "pending", total: 125.4, items: [{ productName: "Leite em Pó 400g", quantity: 3, unitPrice: 18.5 }, { productName: "Café Torrado 500g", quantity: 2, unitPrice: 14.9 }, { productName: "Óleo de Soja 900ml", quantity: 5, unitPrice: 6.99 }], orderDate: "2026-06-07", expectedDate: "2026-06-10", deliveredDate: null, invoiceNumber: null, paymentMethod: "Pix", notes: "" },
  { id: 8, orderNumber: "ORD-2026-0008", type: "purchase", clientName: "-", supplierName: "Produtos de Limpeza Ltda", status: "approved", total: 15e3, items: [{ productName: "Detergente Líquido 500ml", quantity: 500, unitPrice: 1.3 }, { productName: "Sabão em Pó 1kg", quantity: 200, unitPrice: 8 }, { productName: "Amaciante 2L", quantity: 150, unitPrice: 5.8 }], orderDate: "2026-06-03", expectedDate: "2026-06-08", deliveredDate: null, invoiceNumber: "NF-2026-003", paymentMethod: "Boleto", notes: "Reposição estoque limpeza" },
  { id: 9, orderNumber: "ORD-2026-0009", type: "sale", clientName: "Distribuidora Norte", supplierName: null, status: "shipped", total: 8720, items: [{ productName: "Arroz Integral 5kg", quantity: 200, unitPrice: 22.9 }, { productName: "Feijão Preto 1kg", quantity: 200, unitPrice: 8.5 }, { productName: "Papel Higiênico 12un", quantity: 100, unitPrice: 15.9 }, { productName: "Sabão em Pó 1kg", quantity: 50, unitPrice: 12.9 }], orderDate: "2026-05-30", expectedDate: "2026-06-07", deliveredDate: null, invoiceNumber: "NF-2026-004", paymentMethod: "Credit Card", notes: "Envio para Manaus via transportadora" },
  { id: 10, orderNumber: "ORD-2026-0010", type: "sale", clientName: "Fernanda Lima", supplierName: null, status: "delivered", total: 67.8, items: [{ productName: "Papel Higiênico 12un", quantity: 2, unitPrice: 15.9 }, { productName: "Amaciante 2L", quantity: 2, unitPrice: 9.9 }, { productName: "Água Sanitária 1L", quantity: 4, unitPrice: 3.9 }], orderDate: "2026-05-25", expectedDate: "2026-05-28", deliveredDate: "2026-05-27", invoiceNumber: "NF-2026-005", paymentMethod: "Pix", notes: "" }
];
const STATUS_FLOW = {
  pending: { label: "Pending", variant: "warning", icon: "P" },
  approved: { label: "Approved", variant: "info", icon: "A" },
  shipped: { label: "Shipped", variant: "info", icon: "S" },
  delivered: { label: "Delivered", variant: "success", icon: "D" },
  cancelled: { label: "Cancelled", variant: "danger", icon: "C" }
};
function OrdersPage() {
  const [search, setSearch] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [typeFilter, setTypeFilter] = reactExports.useState("all");
  const filtered = reactExports.useMemo(() => {
    let data = [...mockOrders];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (o) => o.orderNumber.toLowerCase().includes(q) || o.clientName.toLowerCase().includes(q) || o.supplierName && o.supplierName.toLowerCase().includes(q) || o.invoiceNumber && o.invoiceNumber.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== "all") data = data.filter((o) => o.status === statusFilter);
    if (typeFilter !== "all") data = data.filter((o) => o.type === typeFilter);
    return data;
  }, [search, statusFilter, typeFilter]);
  const statusBarrier = (status) => {
    const stages = ["pending", "approved", "shipped", "delivered"];
    if (status === "cancelled") return null;
    const currentIdx = stages.indexOf(status);
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", alignItems: "center", gap: 2 }, children: stages.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        width: 18,
        height: 18,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 9,
        fontWeight: 600,
        background: i <= currentIdx ? "var(--accent)" : "var(--bg-secondary)",
        color: i <= currentIdx ? "#fff" : "var(--text-muted)",
        border: i <= currentIdx ? "none" : "1px solid var(--border)"
      }, children: s[0].toUpperCase() }),
      i < stages.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        width: 14,
        height: 2,
        background: i < currentIdx ? "var(--accent)" : "var(--border)",
        borderRadius: 1
      } })
    ] }, s)) });
  };
  const totalRevenue = mockOrders.filter((o) => o.type === "sale" && o.status !== "cancelled").reduce((s, o) => s + o.total, 0);
  const pendingOrders = mockOrders.filter((o) => o.status === "pending").length;
  const shippedOrders = mockOrders.filter((o) => o.status === "shipped").length;
  const cancelledOrders = mockOrders.filter((o) => o.status === "cancelled").length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "page-title", children: "Orders" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search$1, { size: 14, style: { position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              className: "form-input",
              placeholder: "Search orders...",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              style: { width: 220, paddingLeft: 30 }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "form-input", value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), style: { width: 130 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "pending", children: "Pending" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "approved", children: "Approved" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "shipped", children: "Shipped" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "delivered", children: "Delivered" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "cancelled", children: "Cancelled" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "form-input", value: typeFilter, onChange: (e) => setTypeFilter(e.target.value), style: { width: 110 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Types" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "sale", children: "Sales" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "purchase", children: "Purchases" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "primary", size: "sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
          " New Order"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stats-grid", style: { marginBottom: 24 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-label", children: "Total Revenue" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-value", style: { color: "var(--success)" }, children: [
          "$",
          totalRevenue.toFixed(2)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-label", children: "Pending" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-value", style: { color: "var(--warning)" }, children: pendingOrders })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-label", children: "Shipped" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-value", style: { color: "var(--accent)" }, children: shippedOrders })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-label", children: "Cancelled" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-value", style: { color: "var(--danger)" }, children: cancelledOrders })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: `Orders (${filtered.length})`, children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { size: 48 }),
        message: "No orders found matching your filters",
        action: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "primary", size: "sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
          " New Order"
        ] })
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "table-wrapper", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Order #" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Client / Supplier" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Items" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Order Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Estimated Delivery" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Invoice" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((o) => {
        const statusMeta = STATUS_FLOW[o.status];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { fontWeight: 600, fontSize: 13 }, children: o.orderNumber }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: o.type === "sale" ? "success" : "info", children: o.type === "sale" ? "Sale" : "Purchase" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontWeight: 500, fontSize: 13 }, children: o.type === "sale" ? o.clientName : o.supplierName || "-" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 12, color: "var(--text-secondary)" }, children: [
              o.items.length,
              " item",
              o.items.length !== 1 ? "s" : ""
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11, color: "var(--text-muted)", maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: o.items.map((i) => i.productName).join(", ") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { style: { fontWeight: 600 }, children: [
            "$",
            o.total.toFixed(2)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { fontSize: 13 }, children: new Date(o.orderDate).toLocaleDateString("en-US") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { children: [
            o.expectedDate ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 13 }, children: new Date(o.expectedDate).toLocaleDateString("en-US") }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--text-muted)" }, children: "-" }),
            o.deliveredDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 11, color: "var(--success)" }, children: [
              "Actual: ",
              new Date(o.deliveredDate).toLocaleDateString("en-US")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: o.invoiceNumber ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 4 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText$1, { size: 12, style: { color: "var(--accent)" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 12 }, children: o.invoiceNumber })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--text-muted)", fontSize: 12 }, children: "Pending" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: statusMeta.variant, children: statusMeta.label }),
            o.status !== "cancelled" && statusBarrier(o.status)
          ] }) })
        ] }, o.id);
      }) })
    ] }) }) })
  ] });
}
const mockEntries = [
  { id: 1, description: "Venda Loja - João Silva", reference: "ORD-2026-0001", type: "income", category: "Sales", amount: 458.5, date: "2026-05-24", dueDate: "2026-05-24", paidDate: "2026-05-24", status: "paid", paymentMethod: "Credit Card", reconciled: true, notes: "", origin: "receivable" },
  { id: 2, description: "Compra Estoque - Distribuidora ABC", reference: "ORD-2026-0002", type: "expense", category: "Inventory", amount: 12500, date: "2026-05-28", dueDate: "2026-06-15", paidDate: null, status: "pending", paymentMethod: "Boleto", reconciled: false, notes: "Vencimento 15/06", origin: "payable" },
  { id: 3, description: "Venda - Maria Oliveira", reference: "ORD-2026-0003", type: "income", category: "Sales", amount: 189, date: "2026-06-01", dueDate: "2026-06-01", paidDate: "2026-06-01", status: "paid", paymentMethod: "Pix", reconciled: true, notes: "", origin: "receivable" },
  { id: 4, description: "Aluguel Matriz", reference: "RENT-001", type: "expense", category: "Rent", amount: 4500, date: "2026-06-01", dueDate: "2026-06-10", paidDate: null, status: "pending", paymentMethod: "Bank Transfer", reconciled: false, notes: "Aluguel junho", origin: "payable" },
  { id: 5, description: "Venda Corporativa - Tech Solutions", reference: "ORD-2026-0004", type: "income", category: "Sales", amount: 3450, date: "2026-06-05", dueDate: "2026-06-10", paidDate: null, status: "pending", paymentMethod: "Credit Card", reconciled: false, notes: "Parcelado 3x", origin: "receivable" },
  { id: 6, description: "Salários Funcionários", reference: "PAY-2026-06", type: "expense", category: "Payroll", amount: 28e3, date: "2026-06-05", dueDate: "2026-06-05", paidDate: "2026-06-05", status: "paid", paymentMethod: "Bank Transfer", reconciled: true, notes: "Folha junho", origin: "payable" },
  { id: 7, description: "Conta de Luz", reference: "UTIL-2026-06", type: "expense", category: "Utilities", amount: 1280, date: "2026-06-03", dueDate: "2026-06-15", paidDate: null, status: "pending", paymentMethod: "Boleto", reconciled: false, notes: "", origin: "payable" },
  { id: 8, description: "Venda - Ana Beatriz Costa", reference: "ORD-2026-0007", type: "income", category: "Sales", amount: 125.4, date: "2026-06-07", dueDate: "2026-06-07", paidDate: null, status: "pending", paymentMethod: "Pix", reconciled: false, notes: "", origin: "receivable" },
  { id: 9, description: "Venda Atacado - Distribuidora Norte", reference: "ORD-2026-0009", type: "income", category: "Sales", amount: 8720, date: "2026-05-30", dueDate: "2026-06-15", paidDate: null, status: "pending", paymentMethod: "Credit Card", reconciled: false, notes: "Receber até 15/06", origin: "receivable" },
  { id: 10, description: "Internet e Telefone", reference: "UTIL-2026-06", type: "expense", category: "Utilities", amount: 450, date: "2026-06-02", dueDate: "2026-06-10", paidDate: null, status: "pending", paymentMethod: "Boleto", reconciled: false, notes: "", origin: "payable" },
  { id: 11, description: "Fornecedor Alimentos SP", reference: "ORD-2026-0005", type: "expense", category: "Inventory", amount: 8900, date: "2026-06-06", dueDate: "2026-06-20", paidDate: null, status: "pending", paymentMethod: "Boleto", reconciled: false, notes: "", origin: "payable" },
  { id: 12, description: "Comissão Vendedores", reference: "COMM-2026-05", type: "expense", category: "Payroll", amount: 3200, date: "2026-05-31", dueDate: "2026-06-05", paidDate: "2026-06-05", status: "paid", paymentMethod: "Bank Transfer", reconciled: true, notes: "Comissão maio", origin: "payable" },
  { id: 13, description: "Conta de Água", reference: "UTIL-2026-06", type: "expense", category: "Utilities", amount: 670, date: "2026-06-04", dueDate: "2026-06-20", paidDate: null, status: "pending", paymentMethod: "Boleto", reconciled: false, notes: "", origin: "payable" },
  { id: 14, description: "Venda Loja - Fernanda Lima", reference: "ORD-2026-0010", type: "income", category: "Sales", amount: 67.8, date: "2026-05-27", dueDate: "2026-05-27", paidDate: "2026-05-27", status: "paid", paymentMethod: "Pix", reconciled: true, notes: "", origin: "receivable" },
  { id: 15, description: "Serviço Contabilidade", reference: "ACC-2026-06", type: "expense", category: "Services", amount: 2500, date: "2026-06-01", dueDate: "2026-06-15", paidDate: null, status: "pending", paymentMethod: "Bank Transfer", reconciled: false, notes: "Mensalidade contabilidade", origin: "payable" },
  { id: 16, description: "Compra Estoque - Limpeza Ltda", reference: "ORD-2026-0008", type: "expense", category: "Inventory", amount: 15e3, date: "2026-06-03", dueDate: "2026-07-03", paidDate: null, status: "pending", paymentMethod: "Boleto", reconciled: false, notes: "30 dias", origin: "payable" },
  { id: 17, description: "Cliente Carlos - Em Aberto", reference: "ORD-2026-0006", type: "income", category: "Sales", amount: 45, date: "2026-05-15", dueDate: "2026-05-20", paidDate: null, status: "overdue", paymentMethod: "Pix", reconciled: false, notes: "Vencido - cobrar cliente", origin: "receivable" },
  { id: 18, description: "Manutenção Servidores", reference: "IT-2026-06", type: "expense", category: "Services", amount: 1900, date: "2026-06-07", dueDate: "2026-06-07", paidDate: "2026-06-07", status: "paid", paymentMethod: "Credit Card", reconciled: true, notes: "", origin: "payable" }
];
const CATEGORIES = ["Sales", "Inventory", "Rent", "Payroll", "Utilities", "Services"];
function FinancialPage() {
  const [search, setSearch] = reactExports.useState("");
  const [originFilter, setOriginFilter] = reactExports.useState("all");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [categoryFilter, setCategoryFilter] = reactExports.useState("all");
  const [reconciledFilter, setReconciledFilter] = reactExports.useState("all");
  const [cashFlowPeriod, setCashFlowPeriod] = reactExports.useState("30days");
  const filtered = reactExports.useMemo(() => {
    let data = [...mockEntries];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (e) => e.description.toLowerCase().includes(q) || e.reference.toLowerCase().includes(q) || e.category.toLowerCase().includes(q) || e.paymentMethod.toLowerCase().includes(q)
      );
    }
    if (originFilter !== "all") data = data.filter((e) => e.origin === originFilter);
    if (statusFilter !== "all") data = data.filter((e) => e.status === statusFilter);
    if (categoryFilter !== "all") data = data.filter((e) => e.category === categoryFilter);
    if (reconciledFilter === "reconciled") data = data.filter((e) => e.reconciled);
    else if (reconciledFilter === "pending") data = data.filter((e) => !e.reconciled);
    return data;
  }, [search, originFilter, statusFilter, categoryFilter, reconciledFilter]);
  const cashFlowProjection = reactExports.useMemo(() => {
    const days = cashFlowPeriod === "7days" ? 7 : cashFlowPeriod === "15days" ? 15 : cashFlowPeriod === "30days" ? 30 : 60;
    const today = /* @__PURE__ */ new Date();
    const cutoff = new Date(today);
    cutoff.setDate(cutoff.getDate() + days);
    const projectedInvoices = mockEntries.filter((e) => {
      const d = new Date(e.dueDate);
      return d >= today && d <= cutoff && e.status !== "paid" && e.status !== "cancelled";
    });
    const income = projectedInvoices.filter((e) => e.type === "income").reduce((s, e) => s + e.amount, 0);
    const expense = projectedInvoices.filter((e) => e.type === "expense").reduce((s, e) => s + e.amount, 0);
    return { income, expense, balance: income - expense, days };
  }, [cashFlowPeriod]);
  const stats = reactExports.useMemo(() => {
    const totalIncome = mockEntries.filter((e) => e.type === "income" && e.status === "paid").reduce((s, e) => s + e.amount, 0);
    const totalExpense = mockEntries.filter((e) => e.type === "expense" && e.status === "paid").reduce((s, e) => s + e.amount, 0);
    const pendingIncome = mockEntries.filter((e) => e.type === "income" && e.status === "pending").reduce((s, e) => s + e.amount, 0);
    const pendingExpense = mockEntries.filter((e) => e.type === "expense" && e.status === "pending").reduce((s, e) => s + e.amount, 0);
    const overdue = mockEntries.filter((e) => e.status === "overdue").reduce((s, e) => s + e.amount, 0);
    return { totalIncome, totalExpense, currentBalance: totalIncome - totalExpense, pendingIncome, pendingExpense, overdue, pendingTotal: pendingIncome - pendingExpense };
  }, []);
  const getStatusBadge = (status) => {
    switch (status) {
      case "paid":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "success", children: "Paid" });
      case "pending":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "warning", children: "Pending" });
      case "overdue":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "danger", children: "Overdue" });
      case "cancelled":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "info", children: "Cancelled" });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "info", children: status });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "page-title", children: "Financial" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search$1, { size: 14, style: { position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "form-input", placeholder: "Search...", value: search, onChange: (e) => setSearch(e.target.value), style: { width: 200, paddingLeft: 30 } })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "form-input", value: originFilter, onChange: (e) => setOriginFilter(e.target.value), style: { width: 120 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Origins" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "receivable", children: "Receivable" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "payable", children: "Payable" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "form-input", value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), style: { width: 120 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "paid", children: "Paid" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "pending", children: "Pending" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "overdue", children: "Overdue" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "cancelled", children: "Cancelled" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "form-input", value: categoryFilter, onChange: (e) => setCategoryFilter(e.target.value), style: { width: 120 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Categories" }),
          CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c }, c))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "form-input", value: reconciledFilter, onChange: (e) => setReconciledFilter(e.target.value), style: { width: 130 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Reconciliation: All" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "reconciled", children: "Reconciled" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "pending", children: "Pending Recon." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "primary", size: "sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
          " Add Transaction"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stats-grid", style: { marginBottom: 24 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-label", children: "Current Balance" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-value", style: { color: stats.currentBalance >= 0 ? "var(--success)" : "var(--danger)" }, children: [
          "$",
          stats.currentBalance.toFixed(2)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-label", children: "Paid Income" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-value", style: { color: "var(--success)" }, children: [
          "$",
          stats.totalIncome.toFixed(2)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-label", children: "Paid Expenses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-value", style: { color: "var(--danger)" }, children: [
          "$",
          stats.totalExpense.toFixed(2)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-label", children: "Pending Net" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-value", style: { color: stats.pendingTotal >= 0 ? "var(--warning)" : "var(--danger)" }, children: [
          "$",
          stats.pendingTotal.toFixed(2)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-label", children: "Overdue" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-value", style: { color: "var(--danger)" }, children: [
          "$",
          stats.overdue.toFixed(2)
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: `Cash Flow Projection (${cashFlowProjection.days} days)`, action: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "form-input", value: cashFlowPeriod, onChange: (e) => setCashFlowPeriod(e.target.value), style: { width: 110, fontSize: 12 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "7days", children: "7 days" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "15days", children: "15 days" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "30days", children: "30 days" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "60days", children: "60 days" })
    ] }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 16, marginBottom: 16 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, padding: 16, borderRadius: 8, background: "var(--bg-secondary)" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 18, style: { color: "var(--success)" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 13, color: "var(--text-secondary)" }, children: "Projected Income" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 20, fontWeight: 700, color: "var(--success)" }, children: [
          "$",
          cashFlowProjection.income.toFixed(2)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, padding: 16, borderRadius: 8, background: "var(--bg-secondary)" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { size: 18, style: { color: "var(--danger)" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 13, color: "var(--text-secondary)" }, children: "Projected Expenses" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 20, fontWeight: 700, color: "var(--danger)" }, children: [
          "$",
          cashFlowProjection.expense.toFixed(2)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, padding: 16, borderRadius: 8, background: "var(--bg-secondary)" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { size: 18, style: { color: cashFlowProjection.balance >= 0 ? "var(--success)" : "var(--danger)" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 13, color: "var(--text-secondary)" }, children: "Projected Balance" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 20, fontWeight: 700, color: cashFlowProjection.balance >= 0 ? "var(--success)" : "var(--danger)" }, children: [
          "$",
          cashFlowProjection.balance.toFixed(2)
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: `Transactions (${filtered.length})`, children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { size: 48 }),
        message: "No transactions found matching your filters",
        action: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "primary", size: "sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
          " Add Transaction"
        ] })
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "table-wrapper", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Origin" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Amount" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Due Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Reconciled" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontWeight: 500, fontSize: 13 }, children: e.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11, color: "var(--text-muted)" }, children: e.reference })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: e.origin === "receivable" ? "success" : "danger", children: e.origin === "receivable" ? "Receivable" : "Payable" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 13 }, children: e.category }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { fontWeight: 600, color: e.type === "income" ? "var(--success)" : "var(--danger)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 4 }, children: [
          e.type === "income" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleArrowUp, { size: 14 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleArrowDown, { size: 14 }),
          "$",
          e.amount.toFixed(2)
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { fontSize: 13 }, children: new Date(e.date).toLocaleDateString("en-US") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 13 }, children: new Date(e.dueDate).toLocaleDateString("en-US") }),
          e.paidDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 11, color: "var(--success)" }, children: [
            "Paid: ",
            new Date(e.paidDate).toLocaleDateString("en-US")
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: getStatusBadge(e.status) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: e.reconciled ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "success", children: "Yes" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "warning", children: "Pending" }) })
      ] }, e.id)) })
    ] }) }) })
  ] });
}
const mockTasks = [
  { id: 1, title: "Review monthly inventory report", description: "Check all stock levels and identify items below minimum threshold", priority: "high", status: "in_progress", dueDate: "2026-06-12", completedDate: null, assignedTo: "Carlos Lima", category: "Inventory", estimatedHours: 3, createdAt: "2026-06-08" },
  { id: 2, title: "Update client credit limits", description: "Re-evaluate credit limits for Gold segment clients based on purchase history", priority: "medium", status: "pending", dueDate: "2026-06-15", completedDate: null, assignedTo: "Ana Souza", category: "Finance", estimatedHours: 4, createdAt: "2026-06-07" },
  { id: 3, title: "Process pending order #ORD-2026-0004", description: "Review and approve the pending order from Tech Solutions", priority: "high", status: "pending", dueDate: "2026-06-10", completedDate: null, assignedTo: "Carlos Lima", category: "Orders", estimatedHours: 1, createdAt: "2026-06-06" },
  { id: 4, title: "Contact overdue clients", description: "Call clients with payments past due date and negotiate", priority: "high", status: "pending", dueDate: "2026-06-11", completedDate: null, assignedTo: "Marina Costa", category: "Finance", estimatedHours: 5, createdAt: "2026-06-05" },
  { id: 5, title: "Schedule supplier meeting", description: "Arrange quarterly meeting with Distribuidora ABC and Alimentos SP", priority: "low", status: "completed", dueDate: "2026-06-09", completedDate: "2026-06-08", assignedTo: "Pedro Santos", category: "Suppliers", estimatedHours: 2, createdAt: "2026-06-01" },
  { id: 6, title: "Update website product catalog", description: "Add new products and update pricing on the online store", priority: "medium", status: "in_progress", dueDate: "2026-06-14", completedDate: null, assignedTo: "Luiza Mendes", category: "Marketing", estimatedHours: 6, createdAt: "2026-06-03" },
  { id: 7, title: "Backup database", description: "Perform full database backup and verify integrity", priority: "high", status: "completed", dueDate: "2026-06-07", completedDate: "2026-06-07", assignedTo: "IT Team", category: "IT", estimatedHours: 2, createdAt: "2026-06-01" },
  { id: 8, title: "Prepare quarterly financial report", description: "Compile income, expenses, and balance sheet for Q2 2026", priority: "medium", status: "pending", dueDate: "2026-06-25", completedDate: null, assignedTo: "Ana Souza", category: "Finance", estimatedHours: 10, createdAt: "2026-06-02" },
  { id: 9, title: "Review employee timesheets", description: "Approve timesheets for May payroll processing", priority: "low", status: "completed", dueDate: "2026-06-05", completedDate: "2026-06-04", assignedTo: "HR Team", category: "HR", estimatedHours: 2, createdAt: "2026-05-28" },
  { id: 10, title: "Negotiate new supplier contract", description: "Discuss pricing and terms with Químicos União for bulk purchase", priority: "medium", status: "pending", dueDate: "2026-06-18", completedDate: null, assignedTo: "Pedro Santos", category: "Suppliers", estimatedHours: 4, createdAt: "2026-06-06" },
  { id: 11, title: "Fix stock alert for low inventory items", description: "Configure automatic alerts when stock falls below minimum", priority: "low", status: "in_progress", dueDate: "2026-06-16", completedDate: null, assignedTo: "IT Team", category: "IT", estimatedHours: 3, createdAt: "2026-06-04" },
  { id: 12, title: "Client onboarding - new Gold member", description: "Set up account, credit, and welcome package for new client", priority: "high", status: "pending", dueDate: "2026-06-13", completedDate: null, assignedTo: "Marina Costa", category: "Sales", estimatedHours: 3, createdAt: "2026-06-09" }
];
const PRIORITY_CONFIG = {
  high: { label: "High", variant: "danger" },
  medium: { label: "Medium", variant: "warning" },
  low: { label: "Low", variant: "info" }
};
const STATUS_CONFIG = {
  pending: { label: "Pending", variant: "warning" },
  in_progress: { label: "In Progress", variant: "info" },
  completed: { label: "Completed", variant: "success" },
  cancelled: { label: "Cancelled", variant: "danger" }
};
function TasksPage() {
  const [search, setSearch] = reactExports.useState("");
  const [priorityFilter, setPriorityFilter] = reactExports.useState("all");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [assignedFilter, setAssignedFilter] = reactExports.useState("all");
  const [showForm, setShowForm] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({ title: "", description: "", priority: "medium", dueDate: "", assignedTo: "", category: "" });
  const assignees = reactExports.useMemo(() => {
    const set = new Set(mockTasks.map((t) => t.assignedTo).filter(Boolean));
    return ["all", ...Array.from(set)];
  }, []);
  const filtered = reactExports.useMemo(() => {
    let data = [...mockTasks];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (t) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.assignedTo && t.assignedTo.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)
      );
    }
    if (priorityFilter !== "all") data = data.filter((t) => t.priority === priorityFilter);
    if (statusFilter !== "all") data = data.filter((t) => t.status === statusFilter);
    if (assignedFilter !== "all") data = data.filter((t) => t.assignedTo === assignedFilter);
    return data;
  }, [search, priorityFilter, statusFilter, assignedFilter]);
  const pendingCount = mockTasks.filter((t) => t.status === "pending" || t.status === "in_progress").length;
  const completedCount = mockTasks.filter((t) => t.status === "completed").length;
  const highPriorityCount = mockTasks.filter((t) => t.priority === "high" && t.status !== "completed").length;
  const overdueCount = mockTasks.filter((t) => t.dueDate && t.status !== "completed" && t.status !== "cancelled" && new Date(t.dueDate) < /* @__PURE__ */ new Date()).length;
  const save = () => {
    setShowForm(false);
    setForm({ title: "", description: "", priority: "medium", dueDate: "", assignedTo: "", category: "" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "page-title", children: "Tasks" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search$1, { size: 14, style: { position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "form-input", placeholder: "Search tasks...", value: search, onChange: (e) => setSearch(e.target.value), style: { width: 200, paddingLeft: 30 } })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "form-input", value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), style: { width: 120 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "pending", children: "Pending" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "in_progress", children: "In Progress" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "completed", children: "Completed" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "cancelled", children: "Cancelled" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "form-input", value: priorityFilter, onChange: (e) => setPriorityFilter(e.target.value), style: { width: 120 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Priority" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "high", children: "High" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "medium", children: "Medium" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "low", children: "Low" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "form-input", value: assignedFilter, onChange: (e) => setAssignedFilter(e.target.value), style: { width: 140 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Assignees" }),
          assignees.filter((a) => a !== "all").map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: a, children: a }, a))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "primary", size: "sm", onClick: () => setShowForm(true), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
          " New Task"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stats-grid", style: { marginBottom: 24 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-label", children: "Active Tasks" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-value", children: pendingCount })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-label", children: "Completed" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-value", style: { color: "var(--success)" }, children: completedCount })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-label", children: "High Priority" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-value", style: { color: "var(--danger)" }, children: highPriorityCount })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-label", children: "Overdue" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-value", style: { color: "var(--danger)" }, children: overdueCount })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: `Tasks (${filtered.length})`, children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 48 }),
        message: "No tasks found matching your filters",
        action: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "primary", size: "sm", onClick: () => setShowForm(true), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
          " New Task"
        ] })
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: filtered.map((t) => {
      const priorityCfg = PRIORITY_CONFIG[t.priority];
      const statusCfg = STATUS_CONFIG[t.status];
      const isOverdue = t.dueDate && t.status !== "completed" && t.status !== "cancelled" && new Date(t.dueDate) < /* @__PURE__ */ new Date();
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        padding: "14px 16px",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        opacity: t.status === "completed" ? 0.6 : 1,
        transition: "opacity 0.2s"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: 2 }, children: t.status === "completed" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 18, style: { color: "var(--success)" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { size: 18, style: { color: "var(--text-muted)" } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontWeight: 500, fontSize: 14, textDecoration: t.status === "completed" ? "line-through" : "none" }, children: t.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: priorityCfg.variant, children: priorityCfg.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: statusCfg.variant, children: statusCfg.label })
          ] }),
          t.description && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 12, color: "var(--text-secondary)", marginBottom: 6 }, children: t.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 16, fontSize: 12, color: "var(--text-muted)", flexWrap: "wrap" }, children: [
            t.assignedTo && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 4 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 12 }),
              t.assignedTo
            ] }),
            t.dueDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
              display: "flex",
              alignItems: "center",
              gap: 4,
              color: isOverdue ? "var(--danger)" : void 0,
              fontWeight: isOverdue ? 600 : void 0
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 12 }),
              "Due: ",
              new Date(t.dueDate).toLocaleDateString("en-US"),
              isOverdue && " (Overdue!)"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "info", children: t.category }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              t.estimatedHours,
              "h estimated"
            ] })
          ] })
        ] }),
        t.status !== "completed" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 14 }),
          " Complete"
        ] })
      ] }, t.id);
    }) }) }),
    showForm && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "modal-overlay", onClick: () => setShowForm(false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "modal-title", children: "New Task" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", children: "Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "form-input", value: form.title, onChange: (e) => setForm({ ...form, title: e.target.value }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", children: "Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { className: "form-textarea", value: form.description, onChange: (e) => setForm({ ...form, description: e.target.value }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", children: "Priority" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "form-select", value: form.priority, onChange: (e) => setForm({ ...form, priority: e.target.value }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "low", children: "Low" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "medium", children: "Medium" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "high", children: "High" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", children: "Due Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "form-input", type: "date", value: form.dueDate, onChange: (e) => setForm({ ...form, dueDate: e.target.value }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", children: "Assigned To" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "form-select", value: form.assignedTo, onChange: (e) => setForm({ ...form, assignedTo: e.target.value }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Unassigned" }),
            assignees.filter((a) => a !== "all").map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: a, children: a }, a))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "form-select", value: form.category, onChange: (e) => setForm({ ...form, category: e.target.value }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select..." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Inventory", children: "Inventory" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Finance", children: "Finance" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Orders", children: "Orders" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Suppliers", children: "Suppliers" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Marketing", children: "Marketing" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "IT", children: "IT" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "HR", children: "HR" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Sales", children: "Sales" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-actions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: () => setShowForm(false), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "primary", onClick: save, children: "Create Task" })
      ] })
    ] }) })
  ] });
}
function DocumentsPage() {
  const [items, setItems] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/documents?limit=100", { headers: { Authorization: `Bearer ${localStorage.getItem("omnis_token")}` } }).then((r) => r.json());
        setItems(res.data || []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "page-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "page-title", children: "Documentos" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "table-container", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Título" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Tipo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Categoria" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Emissão" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Vencimento" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, style: { textAlign: "center", padding: 40, color: "var(--text-muted)" }, children: "Nenhum documento" }) }) : items.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { fontWeight: 500 }, children: d.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge badge-neutral", children: d.type }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: d.category || "-" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: d.issueDate ? new Date(d.issueDate).toLocaleDateString("pt-BR") : "-" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { color: d.expiryDate && new Date(d.expiryDate) < /* @__PURE__ */ new Date() ? "var(--danger)" : void 0, fontWeight: d.expiryDate ? 600 : void 0 }, children: d.expiryDate ? new Date(d.expiryDate).toLocaleDateString("pt-BR") : "-" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `badge badge-${d.status === "active" ? "success" : "neutral"}`, children: d.status }) })
      ] }, d.id)) })
    ] }) }) })
  ] });
}
function KnowledgePage() {
  const [articles, setArticles] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [selected, setSelected] = reactExports.useState(null);
  const [category, setCategory] = reactExports.useState("");
  const [search, setSearch] = reactExports.useState("");
  const [showForm, setShowForm] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({ title: "", content: "", category: "", type: "article", tags: "" });
  const load = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: "100" });
      if (category) params.set("category", category);
      if (search) params.set("search", search);
      const res = await api.getKnowledge(params.toString());
      setArticles(res.data || []);
    } finally {
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    load();
  }, [category, search]);
  const createArticle = async () => {
    await api.createKnowledge(form);
    setShowForm(false);
    setForm({ title: "", content: "", category: "", type: "article", tags: "" });
    load();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 24, height: "calc(100vh - 120px)" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { width: 300, flexShrink: 0 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-header", style: { marginBottom: 12 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "page-title", style: { fontSize: 18 }, children: "Base de Conhecimento" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-primary btn-sm", onClick: () => setShowForm(!showForm), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
          " Novo"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: "form-input",
          placeholder: "Buscar...",
          value: search,
          onChange: (e) => setSearch(e.target.value),
          style: { marginBottom: 8 }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "form-select", value: category, onChange: (e) => setCategory(e.target.value), style: { marginBottom: 12 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Todas as categorias" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "etica", children: "Ética" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "rh", children: "RH" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "sistema", children: "Sistema" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "processos", children: "Processos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "qualidade", children: "Qualidade" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "seguranca", children: "Segurança" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "geral", children: "Geral" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { overflowY: "auto", flex: 1 }, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner" }) : articles.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          onClick: () => setSelected(a),
          style: {
            padding: "12px",
            borderRadius: "var(--radius-sm)",
            cursor: "pointer",
            background: (selected == null ? void 0 : selected.id) === a.id ? "var(--primary-dim)" : "transparent",
            borderBottom: "1px solid var(--border)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontWeight: 500, fontSize: 13, marginBottom: 2 }, children: a.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 6, fontSize: 11, color: "var(--text-muted)" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `badge badge-neutral`, children: a.category || "geral" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                a.viewCount || 0,
                " visualizações"
              ] })
            ] })
          ]
        },
        a.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: 1, overflowY: "auto" }, children: showForm ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { marginBottom: 16 }, children: "Novo Artigo" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", children: "Título" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "form-input", value: form.title, onChange: (e) => setForm({ ...form, title: e.target.value }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", children: "Categoria" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "form-select", value: form.category, onChange: (e) => setForm({ ...form, category: e.target.value }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Selecione" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "etica", children: "Ética" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "rh", children: "RH" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "sistema", children: "Sistema" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "processos", children: "Processos" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "qualidade", children: "Qualidade" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "seguranca", children: "Segurança" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "geral", children: "Geral" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", children: "Tags (vírgula)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "form-input", value: form.tags, onChange: (e) => setForm({ ...form, tags: e.target.value }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", children: "Conteúdo (Markdown)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { className: "form-textarea", rows: 12, value: form.content, onChange: (e) => setForm({ ...form, content: e.target.value }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-actions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost", onClick: () => setShowForm(false), children: "Cancelar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary", onClick: createArticle, children: "Publicar" })
      ] })
    ] }) : selected ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { fontSize: 20, fontWeight: 700 }, children: selected.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `badge badge-info`, children: selected.category || "geral" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 12, color: "var(--text-muted)", marginBottom: 16 }, children: [
        selected.type,
        " • ",
        selected.viewCount || 0,
        " visualizações • v",
        selected.version || "1.0"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "knowledge-content", children: selected.content.split("\n").map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: p }, i)) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { size: 48 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Selecione um artigo ou crie um novo" })
    ] }) })
  ] });
}
function AiPage() {
  const [query, setQuery] = reactExports.useState("");
  const [conversation, setConversation] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [history, setHistory] = reactExports.useState([]);
  const [showHistory, setShowHistory] = reactExports.useState(false);
  const [lastSources, setLastSources] = reactExports.useState([]);
  const [canGenerate, setCanGenerate] = reactExports.useState([]);
  const [generating, setGenerating] = reactExports.useState(null);
  const generateDoc = async (format) => {
    var _a, _b;
    setGenerating(format);
    try {
      const token = localStorage.getItem("omnis_token");
      const lastUserMsg = ((_a = conversation.filter((c) => c.role === "user").pop()) == null ? void 0 : _a.content) || query;
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ query: lastUserMsg, format, sourceType: ((_b = lastSources[0]) == null ? void 0 : _b.type) || "" })
      });
      if (!res.ok) throw new Error("Failed to generate");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `omnis-${format}-${Date.now()}.${format === "excel" ? "xlsx" : format}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setConversation((prev) => [...prev, { role: "assistant", content: `❌ Error generating document: ${err.message}` }]);
    } finally {
      setGenerating(null);
    }
  };
  const chatEnd = reactExports.useRef(null);
  reactExports.useEffect(() => {
    api.getAIHistory().then((res) => setHistory(res.data || [])).catch(() => {
    });
  }, []);
  reactExports.useEffect(() => {
    var _a;
    (_a = chatEnd.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);
  const ask = async () => {
    if (!query.trim() || loading) return;
    const q = query;
    setQuery("");
    setConversation((prev) => [...prev, { role: "user", content: q }]);
    setLoading(true);
    try {
      const res = await api.askAI(q);
      setConversation((prev) => [...prev, { role: "assistant", content: res.response }]);
      setLastSources(res.sources || []);
      setCanGenerate(res.canGenerate || []);
    } catch (err) {
      setConversation((prev) => [...prev, { role: "assistant", content: `❌ Error: ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 24, height: "calc(100vh - 120px)" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", style: { flex: 1, display: "flex", flexDirection: "column" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-header", style: { marginBottom: 0, paddingBottom: 16, borderBottom: "1px solid var(--border)" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "page-title", style: { fontSize: 18, display: "flex", alignItems: "center", gap: 8 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { size: 20 }),
          " Internal Assistant"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-ghost btn-sm", onClick: () => setShowHistory(!showHistory), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(History, { size: 14 }),
          " History"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chat-messages", style: { flex: 1, overflowY: "auto", padding: "16px 0" }, children: [
        conversation.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", style: { paddingTop: 80 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { size: 48 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Ask anything about your company" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: 16, display: "flex", flexDirection: "column", gap: 8, maxWidth: 300, margin: "16px auto" }, children: ["What is our return policy?", "How to register a client?", "How many open orders?", "Show me pending tasks"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost btn-sm", onClick: () => {
            setQuery(s);
          }, style: { fontSize: 12 }, children: s }, s)) })
        ] }),
        conversation.map((msg, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `chat-message ${msg.role}`, children: msg.content.split("\n").map((p, j) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { marginBottom: 4 }, children: p }, j)) }, i)),
        loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "chat-message assistant", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner", style: { width: 20, height: 20, margin: 0 } }) }),
        canGenerate.length > 0 && conversation.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8, paddingTop: 12, borderTop: "1px solid var(--border)" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 12, color: "var(--text-muted)", padding: "4px 0" }, children: "Generate document:" }),
          canGenerate.includes("excel") && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-ghost btn-sm", onClick: () => generateDoc("excel"), disabled: !!generating, children: [
            generating === "excel" ? "..." : /* @__PURE__ */ jsxRuntimeExports.jsx(FileSpreadsheet, { size: 14 }),
            " Excel"
          ] }),
          canGenerate.includes("pdf") && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-ghost btn-sm", onClick: () => generateDoc("pdf"), disabled: !!generating, children: [
            generating === "pdf" ? "..." : /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 14 }),
            " PDF"
          ] }),
          canGenerate.includes("docx") && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-ghost btn-sm", onClick: () => generateDoc("docx"), disabled: !!generating, children: [
            generating === "docx" ? "..." : /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 14 }),
            " Word"
          ] }),
          canGenerate.includes("pptx") && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-ghost btn-sm", onClick: () => generateDoc("pptx"), disabled: !!generating, children: [
            generating === "pptx" ? "..." : /* @__PURE__ */ jsxRuntimeExports.jsx(Presentation, { size: 14 }),
            " PowerPoint"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: chatEnd })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chat-input-area", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: "chat-input",
            value: query,
            onChange: (e) => setQuery(e.target.value),
            placeholder: "Type your question...",
            onKeyDown: (e) => e.key === "Enter" && ask()
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary", onClick: ask, disabled: loading || !query.trim(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 16 }) })
      ] })
    ] }),
    showHistory && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 280, flexShrink: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", style: { height: "100%", overflowY: "auto" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { fontSize: 14, fontWeight: 600, marginBottom: 12 }, children: "Question History" }),
      history.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 13, color: "var(--text-muted)" }, children: "No questions yet" }) : history.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: { padding: "8px 0", borderBottom: "1px solid var(--border)", cursor: "pointer" },
          onClick: () => setConversation([{ role: "user", content: h.query }, { role: "assistant", content: h.response }]),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 12, fontWeight: 500, marginBottom: 2 }, children: h.query }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11, color: "var(--text-muted)" }, children: h.responseTimeMs ? `${(h.responseTimeMs / 1e3).toFixed(1)}s` : "" })
          ]
        },
        h.id
      ))
    ] }) })
  ] });
}
const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "For small businesses starting to organize their data",
    icon: Zap,
    color: "#3b82f6",
    features: [
      "Smart spreadsheet import",
      "Product & inventory management",
      "Basic CRM (up to 200 clients)",
      "Financial dashboard",
      "Low stock alerts",
      "Excel and CSV export",
      "1 user",
      "Up to 5 uploads/month"
    ],
    cta: "Start Free",
    popular: false
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    description: "For growing businesses that need more power",
    icon: Star,
    color: "#8b5cf6",
    features: [
      "Everything in Starter, plus:",
      "Unlimited product imports",
      "Unlimited clients",
      "Order & supplier management",
      "AI Assistant (OmnisBrain)",
      "Document generation (Word, Excel, PDF)",
      "Up to 5 users",
      "Unlimited uploads",
      "Priority support",
      "Custom alerts & notifications"
    ],
    cta: "Start Free",
    popular: true
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/month",
    description: "For organizations with advanced needs",
    icon: Rocket,
    color: "#f59e0b",
    features: [
      "Everything in Pro, plus:",
      "Custom integrations & API",
      "Dedicated support",
      "Team accounts (unlimited)",
      "Advanced security & audit",
      "SLA guarantee",
      "Custom training",
      "White-label option"
    ],
    cta: "Contact Sales",
    popular: false
  }
];
function PricingPage() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
    minHeight: "100vh",
    background: "var(--bg-primary)",
    padding: "60px 24px"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center", marginBottom: 48 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { style: {
        fontSize: 36,
        fontWeight: 800,
        color: "var(--text-primary)",
        marginBottom: 12
      }, children: "Simple, transparent pricing" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: {
        fontSize: 16,
        color: "var(--text-secondary)",
        maxWidth: 500,
        margin: "0 auto"
      }, children: "Choose the plan that fits your business. All plans include a 14-day free trial." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: 24,
      maxWidth: 1100,
      margin: "0 auto",
      alignItems: "start"
    }, children: plans.map((plan) => {
      const Icon2 = plan.icon;
      const isPopular = plan.popular;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            background: isPopular ? "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.05))" : "var(--bg-card)",
            border: isPopular ? "1px solid rgba(139, 92, 246, 0.3)" : "1px solid var(--border)",
            borderRadius: 16,
            padding: 32,
            position: "relative",
            transition: "transform 0.2s, border-color 0.2s"
          },
          onMouseEnter: (e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.borderColor = isPopular ? "rgba(139, 92, 246, 0.5)" : "var(--border-light)";
          },
          onMouseLeave: (e) => {
            e.currentTarget.style.transform = "";
            e.currentTarget.style.borderColor = isPopular ? "rgba(139, 92, 246, 0.3)" : "var(--border)";
          },
          children: [
            isPopular && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
              position: "absolute",
              top: -12,
              left: "50%",
              transform: "translateX(-50%)",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "white",
              padding: "4px 16px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 600
            }, children: "Most Popular" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                width: 44,
                height: 44,
                borderRadius: 12,
                background: `${plan.color}20`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: plan.color
              }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, { size: 22 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { fontSize: 20, fontWeight: 700, color: "var(--text-primary)" }, children: plan.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: 13, color: "var(--text-secondary)" }, children: plan.description })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 24 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 40, fontWeight: 800, color: "var(--text-primary)" }, children: plan.price }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 14, color: "var(--text-muted)" }, children: plan.period })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginBottom: 24 }, children: plan.features.map((feat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "6px 0",
              fontSize: 13,
              color: "var(--text-secondary)"
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 14, style: { color: plan.color, flexShrink: 0 } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: feat })
            ] }, i)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: isPopular ? "primary" : "secondary",
                size: "lg",
                style: { width: "100%", justifyContent: "center" },
                onClick: () => navigate("/register"),
                children: [
                  plan.cta,
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 16 })
                ]
              }
            )
          ]
        },
        plan.name
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      textAlign: "center",
      marginTop: 48,
      padding: 32,
      background: "var(--bg-card)",
      border: "1px solid var(--border)",
      borderRadius: 16,
      maxWidth: 700,
      margin: "48px auto 0"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { fontSize: 18, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }, children: "Need a custom solution?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: 14, color: "var(--text-secondary)", marginBottom: 16 }, children: "We offer custom plans for large organizations. Contact us to discuss your needs." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "secondary", onClick: () => window.location.href = "mailto:sales@omnisdata.app", children: "Contact Sales" })
    ] })
  ] });
}
function SettingsPage() {
  const [downloading, setDownloading] = reactExports.useState(false);
  const [downloaded, setDownloaded] = reactExports.useState(false);
  const handleDownloadAll = async () => {
    setDownloading(true);
    try {
      const token = localStorage.getItem("omnis_token");
      const res = await fetch("/api/settings/download-all", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Falha ao baixar");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `omnis-full-backup-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3e3);
    } catch (err) {
      alert("Erro: " + err.message);
    } finally {
      setDownloading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { maxWidth: 640, margin: "0 auto" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "page-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "page-title", children: "Configurações" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card", style: { marginBottom: 16 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 16, alignItems: "flex-start" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { size: 32, style: { color: "var(--primary)", flexShrink: 0, marginTop: 4 } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { fontSize: 16, fontWeight: 600, marginBottom: 4 }, children: "Download de Todos os Dados" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: 13, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.5 }, children: "Baixe tudo que você já enviou para o OMNIS em uma única planilha Excel. O arquivo conterá abas separadas para cada tipo de dado:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }, children: [
          { icon: FileSpreadsheet$1, label: "Planilhas Importadas", color: "var(--info)" },
          { icon: FileText$1, label: "Produtos", color: "var(--success)" },
          { icon: FileText$1, label: "Clientes", color: "var(--primary)" },
          { icon: FileText$1, label: "Pedidos", color: "var(--warning)" },
          { icon: FileSpreadsheet$1, label: "Financeiro", color: "var(--danger)" },
          { icon: FileText$1, label: "Base de Conhecimento", color: "var(--success)" },
          { icon: FileText$1, label: "Documentos", color: "var(--info)" }
        ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 10px",
          background: "var(--bg)",
          borderRadius: "var(--radius-sm)",
          fontSize: 12
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { size: 14, style: { color: item.color } }),
          item.label
        ] }, item.label)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "btn btn-primary",
            onClick: handleDownloadAll,
            disabled: downloading,
            style: { width: "100%", justifyContent: "center", padding: "12px" },
            children: downloading ? "Gerando backup..." : downloaded ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "✅ Baixado com sucesso!" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 18 }),
              " Baixar Tudo em Um Clique"
            ] })
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 16, alignItems: "flex-start" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileDown, { size: 32, style: { color: "var(--success)", flexShrink: 0, marginTop: 4 } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { fontSize: 16, fontWeight: 600, marginBottom: 4 }, children: "Gerar Documentos Office" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: 13, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.5 }, children: 'No Assistente IA, peça qualquer coisa e depois clique em "Gerar" para baixar como Excel, PDF, Word ou PowerPoint — pronto para uso, sem formatação manual.' }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 8 }, children: [
          { icon: FileSpreadsheet$1, label: "Excel (.xlsx)", color: "var(--success)" },
          { icon: FileText$1, label: "PDF", color: "var(--danger)" },
          { icon: FileText$1, label: "Word (.docx)", color: "var(--info)" },
          { icon: Presentation$1, label: "PPT (.pptx)", color: "var(--warning)" }
        ].map((fmt) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 10px",
          background: "var(--bg)",
          borderRadius: "var(--radius-sm)",
          fontSize: 12
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(fmt.icon, { size: 14, style: { color: fmt.color } }),
          fmt.label
        ] }, fmt.label)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: 12, padding: 12, background: "var(--bg)", borderRadius: "var(--radius-sm)", fontSize: 13, color: "var(--text-secondary)" }, children: [
          "💡 ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Dica:" }),
          " Vá até o ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/ai", style: { color: "var(--primary)", textDecoration: "underline" }, children: "Assistente IA" }),
          ", pergunte algo como ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: '"lista de produtos"' }),
          " ou ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: '"relatório financeiro"' }),
          ", e clique no botão de download para gerar o documento automaticamente."
        ] })
      ] })
    ] }) })
  ] });
}
const mockAppointments = [
  { id: 1, title: "Sprint Planning", date: "2026-06-11", time: "09:00", endTime: "10:30", type: "meeting", description: "Weekly sprint planning with the dev team", relatedTask: "OMNIS-234" },
  { id: 2, title: "Call with Client ABC", date: "2026-06-11", time: "14:00", endTime: "14:45", type: "call", description: "Discuss Q3 requirements", relatedTask: "OMNIS-240" },
  { id: 3, title: "Code Review", date: "2026-06-11", time: "16:00", endTime: "17:00", type: "task", description: "Review PR #142 for auth module" },
  { id: 4, title: "Team Standup", date: "2026-06-12", time: "09:30", endTime: "09:45", type: "meeting", description: "Daily standup" },
  { id: 5, title: "Submit Report", date: "2026-06-13", time: "10:00", endTime: "11:00", type: "task", description: "Monthly financial report", relatedTask: "OMNIS-245" },
  { id: 6, title: "Doctor Appointment", date: "2026-06-14", time: "08:00", endTime: "09:00", type: "reminder", description: "Annual checkup" },
  { id: 7, title: "Product Demo", date: "2026-06-15", time: "15:00", endTime: "16:00", type: "meeting", description: "Demo new features to stakeholders" }
];
const typeColors = {
  meeting: "info",
  call: "success",
  task: "warning",
  reminder: "danger"
};
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}
function formatDate(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}
function AgendaPage() {
  const [view, setView] = reactExports.useState("month");
  const [currentDate, setCurrentDate] = reactExports.useState(/* @__PURE__ */ new Date());
  const [selectedDate, setSelectedDate] = reactExports.useState(formatDate(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()));
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = formatDate((/* @__PURE__ */ new Date()).getFullYear(), (/* @__PURE__ */ new Date()).getMonth(), (/* @__PURE__ */ new Date()).getDate());
  const navigate = (direction) => {
    const delta = direction === "prev" ? -1 : 1;
    if (view === "month") {
      setCurrentDate(new Date(year, month + delta, 1));
    } else if (view === "week") {
      setCurrentDate(new Date(year, month, currentDate.getDate() + 7 * delta));
    } else {
      setCurrentDate(new Date(year, month, currentDate.getDate() + delta));
    }
  };
  const appointmentsForDate = (date) => {
    return mockAppointments.filter((a) => a.date === date);
  };
  const selectedAppointments = appointmentsForDate(selectedDate);
  const weekDays = reactExports.useMemo(() => {
    const days = [];
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    for (let i = 0; i < 7; i++) {
      const d = new Date(startOfWeek);
      d.setDate(d.getDate() + i);
      days.push(formatDate(d.getFullYear(), d.getMonth(), d.getDate()));
    }
    return days;
  }, [currentDate]);
  const titleLabel = view === "month" ? currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" }) : view === "week" ? `Week of ${weekDays[0]}` : currentDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "page-title", children: "Agenda" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "btn-group", style: { display: "flex", gap: 2 }, children: ["day", "week", "month"].map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: view === v ? "primary" : "ghost",
            size: "sm",
            onClick: () => setView(v),
            children: v.charAt(0).toUpperCase() + v.slice(1)
          },
          v
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "primary", size: "sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
          " New"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 16, marginBottom: 16, alignItems: "center" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => navigate("prev"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 18 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { fontSize: "var(--font-lg)", fontWeight: 600, minWidth: 200, textAlign: "center" }, children: titleLabel }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => navigate("next"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 18 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => {
        const d = /* @__PURE__ */ new Date();
        setCurrentDate(d);
        setSelectedDate(formatDate(d.getFullYear(), d.getMonth(), d.getDate()));
      }, children: "Today" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 320px", gap: 16 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        view === "month" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 0 }, children: [
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                padding: "8px 4px",
                textAlign: "center",
                fontSize: "var(--font-sm)",
                color: "var(--text-muted)",
                fontWeight: 500,
                borderBottom: "1px solid var(--border)"
              },
              children: d
            },
            d
          )),
          Array.from({ length: getFirstDayOfMonth(year, month) }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { minHeight: 80, borderBottom: "1px solid var(--border)" } }, `empty-${i}`)),
          Array.from({ length: getDaysInMonth(year, month) }).map((_, i) => {
            const day = i + 1;
            const dateStr = formatDate(year, month, day);
            const dayApps = appointmentsForDate(dateStr);
            const isToday = dateStr === today;
            const isSelected = dateStr === selectedDate;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                onClick: () => setSelectedDate(dateStr),
                style: {
                  minHeight: 80,
                  padding: 4,
                  borderBottom: "1px solid var(--border)",
                  borderRight: "1px solid var(--border)",
                  cursor: "pointer",
                  background: isSelected ? "color-mix(in srgb, var(--accent) 8%, transparent)" : "transparent",
                  transition: "background 0.15s"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        width: 24,
                        height: 24,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        fontSize: "var(--font-sm)",
                        fontWeight: isToday ? 700 : 400,
                        background: isToday ? "var(--accent)" : "transparent",
                        color: isToday ? "#fff" : "var(--text-primary)",
                        marginBottom: 2
                      },
                      children: day
                    }
                  ),
                  dayApps.slice(0, 3).map((app) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: {
                        fontSize: 10,
                        padding: "1px 4px",
                        borderRadius: 3,
                        marginBottom: 1,
                        background: app.type === "meeting" ? "color-mix(in srgb, var(--accent) 20%, transparent)" : app.type === "call" ? "color-mix(in srgb, var(--success) 20%, transparent)" : app.type === "task" ? "color-mix(in srgb, var(--warning) 20%, transparent)" : "color-mix(in srgb, var(--danger) 20%, transparent)",
                        color: "var(--text-primary)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      },
                      children: [
                        app.time,
                        " ",
                        app.title
                      ]
                    },
                    app.id
                  )),
                  dayApps.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 10, color: "var(--text-muted)", paddingLeft: 2 }, children: [
                    "+",
                    dayApps.length - 3,
                    " more"
                  ] })
                ]
              },
              day
            );
          })
        ] }),
        view === "week" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 0 }, children: weekDays.map((dateStr) => {
          const dayApps = appointmentsForDate(dateStr);
          const d = new Date(dateStr);
          const isToday = dateStr === today;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              onClick: () => setSelectedDate(dateStr),
              style: {
                minHeight: 120,
                padding: 6,
                borderRight: "1px solid var(--border)",
                cursor: "pointer",
                background: dateStr === selectedDate ? "color-mix(in srgb, var(--accent) 8%, transparent)" : "transparent"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      textAlign: "center",
                      fontWeight: isToday ? 700 : 400,
                      fontSize: "var(--font-sm)",
                      marginBottom: 8,
                      color: isToday ? "var(--accent)" : "var(--text-secondary)"
                    },
                    children: [
                      d.toLocaleDateString("en-US", { weekday: "short" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            width: 28,
                            height: 28,
                            margin: "2px auto",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "50%",
                            background: isToday ? "var(--accent)" : "transparent",
                            color: isToday ? "#fff" : "var(--text-primary)",
                            fontSize: "var(--font-sm)"
                          },
                          children: d.getDate()
                        }
                      )
                    ]
                  }
                ),
                dayApps.slice(0, 4).map((app) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: 10,
                      padding: "2px 4px",
                      borderRadius: 3,
                      marginBottom: 2,
                      background: app.type === "meeting" ? "color-mix(in srgb, var(--accent) 20%, transparent)" : app.type === "call" ? "color-mix(in srgb, var(--success) 20%, transparent)" : app.type === "task" ? "color-mix(in srgb, var(--warning) 20%, transparent)" : "color-mix(in srgb, var(--danger) 20%, transparent)"
                    },
                    children: app.time
                  },
                  app.id
                ))
              ]
            },
            dateStr
          );
        }) }),
        view === "day" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                fontSize: "var(--font-lg)",
                fontWeight: 600,
                marginBottom: 16,
                color: "var(--text-primary)"
              },
              children: new Date(selectedDate).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric"
              })
            }
          ),
          selectedAppointments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            EmptyState,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 40 }),
              message: "No appointments for this day",
              action: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "primary", size: "sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
                " Add Appointment"
              ] })
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 4 }, children: Array.from({ length: 24 }).map((_, hour) => {
            const hourStr = `${String(hour).padStart(2, "0")}:00`;
            const hourApps = selectedAppointments.filter(
              (a) => parseInt(a.time) <= hour && parseInt(a.endTime || a.time) > hour
            );
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  display: "flex",
                  gap: 12,
                  minHeight: 40,
                  borderTop: "1px solid var(--border)",
                  padding: "4px 0"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        width: 60,
                        fontSize: "var(--font-sm)",
                        color: "var(--text-muted)",
                        textAlign: "right",
                        paddingRight: 8,
                        flexShrink: 0
                      },
                      children: hourStr
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: 1, display: "flex", flexDirection: "column", gap: 2 }, children: hourApps.map((app) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: {
                        padding: "6px 10px",
                        borderRadius: "var(--radius-sm)",
                        background: app.type === "meeting" ? "color-mix(in srgb, var(--accent) 15%, transparent)" : app.type === "call" ? "color-mix(in srgb, var(--success) 15%, transparent)" : app.type === "task" ? "color-mix(in srgb, var(--warning) 15%, transparent)" : "color-mix(in srgb, var(--danger) 15%, transparent)",
                        border: `1px solid color-mix(in srgb, var(--border) 50%, transparent)`,
                        cursor: "pointer"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontWeight: 500, fontSize: "var(--font-sm)" }, children: app.title }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 11, color: "var(--text-secondary)" }, children: [
                          app.time,
                          " - ",
                          app.endTime
                        ] })
                      ]
                    },
                    app.id
                  )) })
                ]
              },
              hour
            );
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: selectedDate ? new Date(selectedDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "Select a date", children: selectedAppointments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 32 }),
          message: "No appointments on this day",
          action: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "primary", size: "sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
            " Add"
          ] })
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 12 }, children: selectedAppointments.map((app) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            padding: 12,
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--border)",
            background: "var(--bg-secondary)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 6 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontWeight: 600, fontSize: "var(--font-sm)" }, children: app.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: typeColors[app.type], children: app.type })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "var(--font-sm)", color: "var(--text-secondary)", marginBottom: 4 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 12, style: { display: "inline", verticalAlign: "middle", marginRight: 4 } }),
              app.time,
              " - ",
              app.endTime
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "var(--font-sm)", color: "var(--text-muted)" }, children: app.description }),
            app.relatedTask && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: 6, fontSize: 11, color: "var(--accent)" }, children: [
              "🔗 Task: ",
              app.relatedTask
            ] })
          ]
        },
        app.id
      )) }) })
    ] })
  ] });
}
function CalendarPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AgendaPage, {});
}
function DirectivesPage() {
  const [items, setItems] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [showForm, setShowForm] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({ title: "", description: "", assignedTo: "", priority: "medium", source: "verbal", dueDate: "" });
  const token = localStorage.getItem("omnis_token");
  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/directives", { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      setItems(data.data || []);
    } finally {
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    load();
  }, []);
  const save = async () => {
    await fetch("/api/directives", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(form)
    });
    setShowForm(false);
    setForm({ title: "", description: "", assignedTo: "", priority: "medium", source: "verbal", dueDate: "" });
    load();
  };
  const acknowledge = async (id) => {
    await fetch(`/api/directives/${id}/acknowledge`, { method: "PUT", headers: { Authorization: `Bearer ${token}` } });
    load();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "page-title", style: { display: "flex", alignItems: "center", gap: 8 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { size: 22 }),
        " Ordens e Diretivas"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-primary btn-sm", onClick: () => setShowForm(true), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 14 }),
        " Nova Ordem"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: 13, color: "var(--text-secondary)", marginBottom: 16 }, children: "Registre ordens verbais, ordens de reunião, e-mails de superiores — tudo vira registro com data, origem e responsável. Se mudarem a versão da história, o sistema mostra quem disse o quê e quando." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner" }) : items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { size: 48 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Nenhuma ordem registrada" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: items.map((d) => {
      var _a, _b;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        padding: "14px 16px",
        borderBottom: "1px solid var(--border)",
        borderLeft: `3px solid ${d.status === "disputed" ? "var(--danger)" : d.priority === "urgent" || d.priority === "high" ? "var(--warning)" : "var(--primary)"}`,
        marginBottom: 4,
        background: d.status === "disputed" ? "rgba(239,68,68,0.04)" : "transparent",
        borderRadius: "var(--radius-sm)"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontWeight: 600, fontSize: 14 }, children: d.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 4, alignItems: "center" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `badge badge-${d.priority === "urgent" ? "danger" : d.priority === "high" ? "warning" : "neutral"}`, children: d.priority }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `badge badge-${d.status === "completed" ? "success" : d.status === "disputed" ? "danger" : "warning"}`, children: d.status })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 13, color: "var(--text-secondary)", marginBottom: 8 }, children: d.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 12, fontSize: 11, color: "var(--text-muted)", flexWrap: "wrap" }, children: [
          ((_a = d.issuer) == null ? void 0 : _a.name) && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "🗣️ ",
            d.issuer.name
          ] }),
          ((_b = d.assignee) == null ? void 0 : _b.name) && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "👤 para: ",
            d.assignee.name
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "📅 ",
            d.issuedDate ? new Date(d.issuedDate).toLocaleDateString("pt-BR") : ""
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "📬 via: ",
            d.source
          ] }),
          d.dueDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "⏰ vence: ",
            new Date(d.dueDate).toLocaleDateString("pt-BR")
          ] }),
          d.acknowledged && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "var(--success)" }, children: [
            "✅ Ciência ",
            d.acknowledgedAt ? new Date(d.acknowledgedAt).toLocaleDateString("pt-BR") : ""
          ] }),
          d.status === "disputed" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "var(--danger)" }, children: [
            "⚠️ Disputa: ",
            d.disputeReason || "sem justificativa"
          ] })
        ] }),
        !d.acknowledged && d.status !== "cancelled" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: 8, display: "flex", gap: 6 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-primary btn-sm", onClick: () => acknowledge(d.id), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 12 }),
          " Dar Ciência"
        ] }) })
      ] }, d.id);
    }) }) }),
    showForm && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "modal-overlay", onClick: () => setShowForm(false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "modal-title", children: "Registrar Ordem" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", children: "Título" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "form-input", value: form.title, onChange: (e) => setForm({ ...form, title: e.target.value }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", children: "Descrição" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { className: "form-textarea", rows: 4, value: form.description, onChange: (e) => setForm({ ...form, description: e.target.value }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", children: "Prioridade" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "form-select", value: form.priority, onChange: (e) => setForm({ ...form, priority: e.target.value }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "low", children: "Baixa" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "medium", children: "Média" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "high", children: "Alta" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "urgent", children: "Urgente" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", children: "Origem" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "form-select", value: form.source, onChange: (e) => setForm({ ...form, source: e.target.value }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "verbal", children: "Verbal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "email", children: "E-mail" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "meeting", children: "Reunião" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "whatsapp", children: "WhatsApp" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "system", children: "Sistema" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "written", children: "Escrito" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", children: "Para (ID do usuário)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "form-input", value: form.assignedTo, onChange: (e) => setForm({ ...form, assignedTo: e.target.value }), placeholder: "opcional" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", children: "Data limite" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "form-input", type: "date", value: form.dueDate, onChange: (e) => setForm({ ...form, dueDate: e.target.value }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-actions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-ghost", onClick: () => setShowForm(false), children: "Cancelar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary", onClick: save, children: "Registrar Ordem" })
      ] })
    ] }) })
  ] });
}
function SecurityPage() {
  const [tab, setTab] = reactExports.useState("overview");
  const [settings, setSettings] = reactExports.useState({});
  const [report, setReport] = reactExports.useState({});
  const [apiKeys, setApiKeys] = reactExports.useState([]);
  const [loginHistory, setLoginHistory] = reactExports.useState([]);
  const [newKey, setNewKey] = reactExports.useState(null);
  const token = localStorage.getItem("omnis_token");
  const load = () => {
    Promise.all([
      fetch("/api/security/settings", { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
      fetch("/api/security/report", { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
      fetch("/api/security/api-keys", { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
      fetch("/api/security/login-history", { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json())
    ]).then(([s, r, k, h]) => {
      setSettings(s);
      setReport(r);
      setApiKeys(k.data || k || []);
      setLoginHistory(h.data || h || []);
    });
  };
  reactExports.useEffect(() => {
    load();
  }, []);
  const updateSetting = async (key, val) => {
    await fetch("/api/security/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...settings, [key]: val })
    });
    load();
  };
  const createKey2 = async () => {
    const res = await fetch("/api/security/api-keys", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name: `Key ${Date.now()}` })
    });
    const data = await res.json();
    setNewKey(data.key);
    load();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "page-header", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "page-title", style: { display: "flex", alignItems: "center", gap: 8 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 22 }),
      " Segurança"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 4, marginBottom: 20 }, children: [
      { key: "overview", label: "Visão Geral", icon: Shield },
      { key: "password", label: "Política de Senha", icon: Eye },
      { key: "keys", label: "API Keys", icon: Key },
      { key: "history", label: "Histórico de Login", icon: History }
    ].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        className: `btn btn-sm ${tab === t.key ? "btn-primary" : "btn-ghost"}`,
        onClick: () => setTab(t.key),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(t.icon, { size: 14 }),
          " ",
          t.label
        ]
      },
      t.key
    )) }),
    tab === "overview" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stats-grid", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-label", children: "Total de Logins" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-value", children: report.totalLogins || 0 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-label", children: "Tentativas Falhas" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-value", style: { color: "var(--danger)" }, children: report.failedLogins || 0 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-label", children: "API Keys Ativas" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-value", style: { color: "var(--info)" }, children: report.activeApiKeys || 0 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-label", children: "Sessão expira em" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-value", style: { fontSize: 20 }, children: [
            settings.sessionTimeoutMinutes || 480,
            "min"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", style: { marginTop: 16 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "card-title", style: { marginBottom: 12 }, children: "✅ Checklist de Segurança" }),
        [
          { label: "Senha forte obrigatória", ok: settings.passwordMinLength >= 8 },
          { label: "Expiração de senha configurada", ok: settings.passwordExpiryDays > 0 },
          { label: "2FA disponível", ok: true },
          { label: "Backup automático", ok: settings.autoBackupEnabled },
          { label: "Auditoria de ações ativa", ok: settings.logAllActions },
          { label: "Rate limiting ativo (nginx)", ok: true },
          { label: "HTTPS obrigatório (Cloudflare)", ok: true }
        ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "8px 0", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8, fontSize: 13 }, children: [
          item.ok ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 16, style: { color: "var(--success)" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 16, style: { color: "var(--warning)" } }),
          item.label
        ] }, item.label))
      ] })
    ] }),
    tab === "password" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "card-title", style: { marginBottom: 16 }, children: "Política de Senha" }),
      [
        { key: "passwordMinLength", label: "Tamanho mínimo", type: "number", min: 4, max: 32 },
        { key: "passwordExpiryDays", label: "Expira em (dias, 0 = nunca)", type: "number", min: 0, max: 365 },
        { key: "passwordHistory", label: "Não repetir últimas N senhas", type: "number", min: 0, max: 20 },
        { key: "sessionTimeoutMinutes", label: "Sessão expira em (minutos)", type: "number", min: 30, max: 1440 },
        { key: "logRetentionDays", label: "Reter logs por (dias)", type: "number", min: 30, max: 730 },
        { key: "backupRetentionDays", label: "Reter backups por (dias)", type: "number", min: 7, max: 365 }
      ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--border)" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 13 }, children: item.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: "form-input",
            type: "number",
            min: item.min,
            max: item.max,
            value: settings[item.key] ?? "",
            onChange: (e) => updateSetting(item.key, Number(e.target.value)),
            style: { width: 80, textAlign: "center" }
          }
        )
      ] }, item.key)),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { fontSize: 14, fontWeight: 600, marginTop: 20, marginBottom: 12 }, children: "Requisitos de caracteres" }),
      [
        { key: "passwordRequireUppercase", label: "Exigir maiúscula" },
        { key: "passwordRequireNumbers", label: "Exigir número" },
        { key: "passwordRequireSpecial", label: "Exigir caractere especial" },
        { key: "notifyNewDevice", label: "Notificar novo dispositivo" },
        { key: "notifyFailedLogin", label: "Notificar falha de login" }
      ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid var(--border)" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 13 }, children: item.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: { position: "relative", display: "inline-block", width: 44, height: 24, cursor: "pointer" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: settings[item.key] ?? false,
              onChange: (e) => updateSetting(item.key, e.target.checked),
              style: { opacity: 0, width: 0, height: 0 }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
            position: "absolute",
            inset: 0,
            borderRadius: 12,
            background: settings[item.key] ? "var(--primary)" : "var(--border)",
            transition: "0.2s"
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
            position: "absolute",
            top: 2,
            left: settings[item.key] ? 22 : 2,
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "white",
            transition: "0.2s"
          } }) })
        ] })
      ] }, item.key))
    ] }),
    tab === "keys" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", justifyContent: "flex-end", marginBottom: 12 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-primary btn-sm", onClick: createKey2, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
        " Nova API Key"
      ] }) }),
      newKey && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: 16, background: "rgba(245,158,11,0.1)", borderRadius: "var(--radius-sm)", marginBottom: 16, border: "1px solid var(--warning)" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 8 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { size: 18, style: { color: "var(--warning)", flexShrink: 0, marginTop: 2 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: { fontSize: 13 }, children: "🔑 Guarde esta chave agora!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: 12, color: "var(--text-secondary)", marginTop: 4 }, children: "Ela não será mostrada novamente. Se perder, crie outra e revogue esta." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { style: {
          display: "block",
          padding: 12,
          background: "var(--bg)",
          borderRadius: "var(--radius-sm)",
          fontSize: 12,
          wordBreak: "break-all",
          fontFamily: "monospace"
        }, children: newKey }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "btn btn-primary btn-sm",
            style: { marginTop: 8 },
            onClick: () => {
              navigator.clipboard.writeText(newKey);
              setNewKey(null);
            },
            children: "✅ Copiado! Fechar"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "table-container", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Nome" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Prefixo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Permissões" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Criada" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Último uso" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", {})
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          (apiKeys.length === 0 ? [] : apiKeys).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: k.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("code", { style: { fontSize: 11 }, children: [
              k.keyPrefix,
              "..."
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge badge-info", children: k.permissions }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `badge badge-${k.status === "active" ? "success" : "neutral"}`, children: k.status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { fontSize: 12 }, children: k.createdAt ? new Date(k.createdAt).toLocaleDateString("pt-BR") : "-" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { fontSize: 12 }, children: k.lastUsedAt ? new Date(k.lastUsedAt).toLocaleDateString("pt-BR") : "nunca" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: k.status === "active" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-danger btn-sm", onClick: async () => {
              await fetch(`/api/security/api-keys/${k.id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
              });
              load();
            }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 12 }) }) })
          ] }, k.id)),
          apiKeys.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 7, style: { textAlign: "center", padding: 40, color: "var(--text-muted)" }, children: "Nenhuma API key criada" }) })
        ] })
      ] }) }) })
    ] }),
    tab === "history" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "table-container", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Data" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Usuário" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "IP" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Motivo" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        (loginHistory.length === 0 ? [] : loginHistory).map((h) => {
          var _a;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { fontSize: 12 }, children: h.attemptedAt ? new Date(h.attemptedAt).toLocaleString("pt-BR") : "-" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: ((_a = h.user) == null ? void 0 : _a.name) || "-" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: h.email }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { fontSize: 12, fontFamily: "monospace" }, children: h.ipAddress || "-" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `badge badge-${h.status === "success" ? "success" : h.status === "blocked" ? "danger" : "warning"}`, children: [
              h.status === "success" ? "✅" : h.status === "blocked" ? "🚫" : "❌",
              " ",
              h.status
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { fontSize: 12 }, children: h.failureReason || "-" })
          ] }, h.id);
        }),
        loginHistory.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, style: { textAlign: "center", padding: 40, color: "var(--text-muted)" }, children: "Nenhum login registrado" }) })
      ] })
    ] }) }) })
  ] });
}
function EmailsPage() {
  const [items, setItems] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [selected, setSelected] = reactExports.useState(null);
  const [filter, setFilter] = reactExports.useState("");
  const [stats, setStats] = reactExports.useState({ unread: 0, urgent: 0, total: 0 });
  const token = localStorage.getItem("omnis_token");
  const load = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: "200" });
      if (filter) params.set("status", filter);
      const [emailsRes, statsRes] = await Promise.all([
        fetch(`/api/emails?${params}`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch("/api/emails/stats", { headers: { Authorization: `Bearer ${token}` } })
      ]);
      const emails = await emailsRes.json();
      setItems(emails.data || []);
      setStats(await statsRes.json());
    } finally {
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    load();
  }, [filter]);
  const viewEmail = async (email) => {
    setSelected(email);
    if (email.status === "unread") {
      await fetch(`/api/emails/${email.id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: "read" })
      });
      load();
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 24, height: "calc(100vh - 120px)" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { width: 320, flexShrink: 0, display: "flex", flexDirection: "column" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "page-header", style: { marginBottom: 12 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "page-title", style: { fontSize: 18, display: "flex", alignItems: "center", gap: 8 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 18 }),
        " Emails"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, marginBottom: 12 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", style: { padding: "8px 12px", flex: 1 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-label", style: { fontSize: 10 }, children: "Não lidos" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-value", style: { fontSize: 18, color: "var(--primary)" }, children: stats.unread })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", style: { padding: "8px 12px", flex: 1 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-label", style: { fontSize: 10 }, children: "Urgentes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-value", style: { fontSize: 18, color: "var(--danger)" }, children: stats.urgent })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 4, marginBottom: 12, flexWrap: "wrap" }, children: [
        { key: "", label: "Todas", icon: Inbox },
        { key: "unread", label: "Não lidas", icon: TriangleAlert },
        { key: "flagged", label: "Sinalizadas", icon: Flag },
        { key: "archived", label: "Arquivadas", icon: Archive }
      ].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: `btn btn-sm ${filter === f.key ? "btn-primary" : "btn-ghost"}`,
          onClick: () => setFilter(f.key),
          style: { fontSize: 11 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { size: 12 }),
            " ",
            f.label
          ]
        },
        f.key
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: 1, overflowY: "auto" }, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner" }) : items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-state", style: { padding: 20 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Nenhum email" }) }) : items.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          onClick: () => viewEmail(e),
          style: {
            padding: "10px 12px",
            borderRadius: "var(--radius-sm)",
            cursor: "pointer",
            borderBottom: "1px solid var(--border)",
            background: (selected == null ? void 0 : selected.id) === e.id ? "var(--primary-dim)" : e.status === "unread" ? "rgba(99,102,241,0.03)" : "transparent",
            fontWeight: e.status === "unread" ? 600 : 400
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 13 }, children: e.fromName || e.fromEmail }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 4 }, children: [
                e.urgency === "urgent" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge badge-danger", children: "!" }),
                e.status === "unread" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { width: 8, height: 8, borderRadius: "50%", background: "var(--primary)", display: "inline-block" } })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 12, color: "var(--text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: e.subject }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 10, color: "var(--text-muted)", marginTop: 2 }, children: [
              new Date(e.receivedAt).toLocaleString("pt-BR"),
              " · ",
              e.category
            ] })
          ]
        },
        e.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: 1 }, children: selected ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", style: { height: "100%", overflowY: "auto" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { fontSize: 18, fontWeight: 600, marginBottom: 4 }, children: selected.subject }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 13, color: "var(--text-secondary)" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "De:" }),
            " ",
            selected.fromName ? `${selected.fromName} <${selected.fromEmail}>` : selected.fromEmail
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 13, color: "var(--text-secondary)" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Recebido:" }),
            " ",
            new Date(selected.receivedAt).toLocaleString("pt-BR")
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 4 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `badge badge-${selected.urgency === "urgent" ? "danger" : "neutral"}`, children: selected.urgency }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge badge-info", children: selected.category })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: 16, background: "var(--bg)", borderRadius: "var(--radius-sm)", fontSize: 14, lineHeight: 1.6, whiteSpace: "pre-wrap" }, children: selected.body || selected.bodyPlain || "(sem conteúdo)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: 16, display: "flex", gap: 6 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-ghost btn-sm", onClick: async () => {
          await fetch(`/api/emails/${selected.id}/status`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({ status: selected.status === "archived" ? "read" : "archived" })
          });
          load();
          setSelected(null);
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Archive, { size: 14 }),
          " ",
          selected.status === "archived" ? "Restaurar" : "Arquivar"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn btn-ghost btn-sm", onClick: async () => {
          await fetch(`/api/emails/${selected.id}/status`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({ status: "flagged" })
          });
          load();
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, { size: 14 }),
          " Sinalizar"
        ] })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", style: { height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 48 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Selecione um email para visualizar" })
    ] }) })
  ] });
}
const reportTypes = [
  { id: "sales", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 24 }), title: "Sales Report", description: "Revenue, orders, and sales performance", count: 12, lastGenerated: "2026-06-10" },
  { id: "products", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 24 }), title: "Products Report", description: "Inventory levels, top sellers, stock alerts", count: 8, lastGenerated: "2026-06-09" },
  { id: "clients", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 24 }), title: "Clients Report", description: "Client acquisition, retention, demographics", count: 6, lastGenerated: "2026-06-08" },
  { id: "financial", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { size: 24 }), title: "Financial Report", description: "P&L, cash flow, expenses, revenue breakdown", count: 10, lastGenerated: "2026-06-07" }
];
const periods = ["Today", "This Week", "This Month", "This Quarter", "This Year", "Custom"];
function ReportsPage() {
  const [period, setPeriod] = reactExports.useState("This Month");
  const [exporting, setExporting] = reactExports.useState(null);
  const handleExport = (id) => {
    setExporting(id);
    setTimeout(() => setExporting(null), 1500);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "page-title", children: "Reports" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Filter, { size: 14, style: { color: "var(--text-muted)" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            className: "form-select",
            style: { width: 160 },
            value: period,
            onChange: (e) => setPeriod(e.target.value),
            children: periods.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p, children: p }, p))
          }
        )
      ] })
    ] }),
    reportTypes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { size: 48 }),
        message: "No reports available yet",
        action: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "primary", children: "Generate Report" })
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }, children: reportTypes.map((report) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { title: report.title, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 16 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              width: 48,
              height: 48,
              borderRadius: "var(--radius-md)",
              background: "color-mix(in srgb, var(--accent) 12%, transparent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--accent)",
              flexShrink: 0
            },
            children: report.icon
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "var(--font-sm)", color: "var(--text-secondary)", marginBottom: 4 }, children: report.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 16, fontSize: "var(--font-sm)" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "var(--text-muted)" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText$1, { size: 12, style: { display: "inline", verticalAlign: "middle", marginRight: 4 } }),
              report.count,
              " reports"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "var(--text-muted)" }, children: [
              "Last: ",
              report.lastGenerated
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "primary",
            size: "sm",
            loading: exporting === report.id,
            onClick: () => handleExport(report.id),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 14 }),
              " Export"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "secondary", size: "sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText$1, { size: 14 }),
          " View"
        ] })
      ] })
    ] }, report.id)) })
  ] });
}
const mockGoals = [
  {
    id: 1,
    title: "Increase Q3 Revenue",
    description: "Achieve 25% revenue growth through upselling and new client acquisition",
    quarter: "Q3 2026",
    category: "Revenue",
    keyResults: [
      { id: 1, title: "New recurring revenue (MRR)", current: 18500, target: 25e3, unit: "USD" },
      { id: 2, title: "Enterprise deals closed", current: 3, target: 8, unit: "deals" },
      { id: 3, title: "Revenue from upsells", current: 4200, target: 1e4, unit: "USD" }
    ]
  },
  {
    id: 2,
    title: "Improve Product Quality",
    description: "Reduce bug reports and improve NPS score for the platform",
    quarter: "Q3 2026",
    category: "Product",
    keyResults: [
      { id: 4, title: "Bug report count (monthly)", current: 34, target: 10, unit: "reports" },
      { id: 5, title: "NPS score", current: 42, target: 60, unit: "points" },
      { id: 6, title: "Feature adoption rate", current: 56, target: 80, unit: "%" }
    ]
  },
  {
    id: 3,
    title: "Expand Customer Base",
    description: "Grow active customer count and reduce churn",
    quarter: "Q3 2026",
    category: "Customers",
    keyResults: [
      { id: 7, title: "New active customers", current: 45, target: 120, unit: "customers" },
      { id: 8, title: "Monthly churn rate", current: 5.2, target: 2.5, unit: "%" },
      { id: 9, title: "Customer satisfaction score", current: 3.8, target: 4.5, unit: "/5" }
    ]
  }
];
function ProgressBar({ current, target, color }) {
  const pct = Math.min(Math.round(current / target * 100), 100);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          flex: 1,
          height: 8,
          borderRadius: 4,
          background: "var(--bg-primary)",
          overflow: "hidden"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              width: `${pct}%`,
              height: "100%",
              borderRadius: 4,
              background: color,
              transition: "width 0.4s ease"
            }
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontSize: "var(--font-sm)", fontWeight: 600, color: "var(--text-primary)", minWidth: 36, textAlign: "right" }, children: [
      pct,
      "%"
    ] })
  ] });
}
function getCategoryColor(cat) {
  switch (cat) {
    case "Revenue":
      return "var(--success)";
    case "Product":
      return "var(--accent)";
    case "Customers":
      return "var(--warning)";
    case "Operations":
      return "var(--danger)";
  }
}
function getCategoryBadgeVariant(cat) {
  switch (cat) {
    case "Revenue":
      return "success";
    case "Product":
      return "info";
    case "Customers":
      return "warning";
    case "Operations":
      return "danger";
  }
}
function GoalsPage() {
  const [filter, setFilter] = reactExports.useState("All");
  const categories = ["All", "Revenue", "Product", "Customers", "Operations"];
  const filtered = filter === "All" ? mockGoals : mockGoals.filter((g) => g.category === filter);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "page-title", children: "Goals & OKRs" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "btn-group", style: { display: "flex", gap: 2 }, children: categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: filter === cat ? "primary" : "ghost",
            size: "sm",
            onClick: () => setFilter(cat),
            children: cat
          },
          cat
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "primary", size: "sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
          " New Goal"
        ] })
      ] })
    ] }),
    filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { size: 48 }),
        message: "No goals defined yet. Start by creating a new OKR.",
        action: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
          " Create Goal"
        ] })
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))", gap: 16 }, children: filtered.map((goal) => {
      const overallPct = Math.round(
        goal.keyResults.reduce((sum, kr) => sum + Math.min(kr.current / kr.target, 1), 0) / goal.keyResults.length * 100
      );
      const color = getCategoryColor(goal.category);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { title: goal.title, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 12, display: "flex", gap: 8, alignItems: "center" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: getCategoryBadgeVariant(goal.category), children: goal.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "var(--font-sm)", color: "var(--text-muted)" }, children: goal.quarter })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: "var(--font-sm)", color: "var(--text-secondary)", marginBottom: 16 }, children: goal.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 16 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "var(--font-sm)", fontWeight: 600, color: "var(--text-primary)" }, children: "Overall Progress" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontSize: "var(--font-lg)", fontWeight: 700, color }, children: [
              overallPct,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressBar, { current: overallPct, target: 100, color })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { borderTop: "1px solid var(--border)", paddingTop: 12 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "var(--font-sm)", fontWeight: 500, color: "var(--text-secondary)", marginBottom: 8 }, children: "Key Results" }),
          goal.keyResults.map((kr) => {
            const krPct = Math.round(Math.min(kr.current / kr.target * 100, 100));
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  padding: "8px 0",
                  borderBottom: "1px solid var(--border)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "var(--font-sm)", color: "var(--text-primary)", display: "flex", alignItems: "center", gap: 6 }, children: [
                      krPct >= 100 ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 14, style: { color: "var(--success)" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { size: 14, style: { color: "var(--text-muted)" } }),
                      kr.title
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontSize: "var(--font-sm)", fontWeight: 500, color: "var(--text-secondary)" }, children: [
                      kr.current,
                      " / ",
                      kr.target,
                      " ",
                      kr.unit
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressBar, { current: kr.current, target: kr.target, color: krPct >= 100 ? "var(--success)" : color })
                ]
              },
              kr.id
            );
          })
        ] })
      ] }, goal.id);
    }) })
  ] });
}
const mockContracts = [
  { id: 1, name: "Enterprise License - ABC Corp", client: "ABC Corporation", value: 25e3, startDate: "2026-01-15", endDate: "2026-12-31", status: "active", description: "Annual enterprise software license" },
  { id: 2, name: "Consulting Services - XYZ Ltd", client: "XYZ Ltd", value: 12e3, startDate: "2026-03-01", endDate: "2026-06-15", status: "expiring", description: "Q2 consulting engagement" },
  { id: 3, name: "Support Contract - Beta Inc", client: "Beta Inc", value: 8e3, startDate: "2025-06-01", endDate: "2026-05-31", status: "expired", description: "Annual support and maintenance" },
  { id: 4, name: "Data Analytics Package - Delta Co", client: "Delta Co", value: 18e3, startDate: "2026-04-01", endDate: "2027-03-31", status: "active", description: "Data platform subscription" },
  { id: 5, name: "Cloud Migration - Gamma LLC", client: "Gamma LLC", value: 35e3, startDate: "2026-05-01", endDate: "2026-07-20", status: "expiring", description: "AWS migration project" },
  { id: 6, name: "Training Program - Epsilon SA", client: "Epsilon SA", value: 5e3, startDate: "2025-01-01", endDate: "2025-12-31", status: "expired", description: "Staff training subscription" }
];
const statusConfig$1 = {
  active: { label: "Active", variant: "success" },
  expiring: { label: "Expiring Soon", variant: "warning" },
  expired: { label: "Expired", variant: "danger" }
};
function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(value);
}
function ContractsPage() {
  const [filter, setFilter] = reactExports.useState("All");
  const filters = ["All", "Active", "Expiring", "Expired"];
  const filtered = filter === "All" ? mockContracts : mockContracts.filter((c) => c.status === filter.toLowerCase());
  const expiringSoon = mockContracts.filter((c) => c.status === "expiring");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "page-title", children: "Contracts" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "btn-group", style: { display: "flex", gap: 2 }, children: filters.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: filter === f ? "primary" : "ghost",
            size: "sm",
            onClick: () => setFilter(f),
            children: f
          },
          f
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "primary", size: "sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
          " New Contract"
        ] })
      ] })
    ] }),
    expiringSoon.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 16px",
          borderRadius: "var(--radius-md)",
          background: "color-mix(in srgb, var(--warning) 12%, transparent)",
          border: "1px solid color-mix(in srgb, var(--warning) 30%, transparent)",
          marginBottom: 16
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 18, style: { color: "var(--warning)", flexShrink: 0 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontWeight: 600, fontSize: "var(--font-sm)" }, children: [
              expiringSoon.length,
              " contract",
              expiringSoon.length > 1 ? "s" : "",
              " expiring soon"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "var(--font-sm)", color: "var(--text-secondary)", marginLeft: 8 }, children: expiringSoon.map((c) => c.name).join(", ") })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText$1, { size: 40 }),
        message: "No contracts found",
        action: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "primary", size: "sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
          " Create Contract"
        ] })
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "table-container", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Contract Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Client" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Value" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Start Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "End Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((contract) => {
        const cfg = statusConfig$1[contract.status];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { style: { cursor: "pointer" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { fontWeight: 500 }, children: contract.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: contract.client }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { fontWeight: 600, color: "var(--text-primary)" }, children: formatCurrency(contract.value) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: contract.startDate }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: contract.status === "expiring" ? "var(--warning)" : contract.status === "expired" ? "var(--danger)" : "var(--text-primary)" }, children: contract.endDate }),
            contract.status === "expiring" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 10, color: "var(--warning)", marginLeft: 4 }, children: "(soon)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: cfg.variant, children: cfg.label }) })
        ] }, contract.id);
      }) })
    ] }) }) })
  ] });
}
const mockEmployees = [
  { id: 1, name: "Alice Johnson", position: "Software Engineer", department: "Engineering", email: "alice@omnisdata.com", phone: "+1 (555) 123-4567", status: "active", hireDate: "2024-03-15" },
  { id: 2, name: "Bob Smith", position: "Product Manager", department: "Product", email: "bob@omnisdata.com", phone: "+1 (555) 234-5678", status: "active", hireDate: "2023-11-01" },
  { id: 3, name: "Carol Davis", position: "UX Designer", department: "Design", email: "carol@omnisdata.com", phone: "+1 (555) 345-6789", status: "on-leave", hireDate: "2024-06-10" },
  { id: 4, name: "David Lee", position: "Data Analyst", department: "Analytics", email: "david@omnisdata.com", phone: "+1 (555) 456-7890", status: "active", hireDate: "2025-01-20" },
  { id: 5, name: "Emma Wilson", position: "Sales Representative", department: "Sales", email: "emma@omnisdata.com", phone: "+1 (555) 567-8901", status: "inactive", hireDate: "2024-09-05" },
  { id: 6, name: "Frank Brown", position: "DevOps Engineer", department: "Engineering", email: "frank@omnisdata.com", phone: "+1 (555) 678-9012", status: "active", hireDate: "2025-04-12" }
];
const statusConfig = {
  active: { label: "Active", variant: "success" },
  "on-leave": { label: "On Leave", variant: "warning" },
  inactive: { label: "Inactive", variant: "danger" }
};
const departments = ["All", "Engineering", "Product", "Design", "Analytics", "Sales"];
function EmployeesPage() {
  const [search, setSearch] = reactExports.useState("");
  const [department, setDepartment] = reactExports.useState("All");
  const [clockedIn, setClockedIn] = reactExports.useState(false);
  const [clockTime, setClockTime] = reactExports.useState(null);
  const filtered = mockEmployees.filter((e) => {
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.position.toLowerCase().includes(search.toLowerCase()) || e.department.toLowerCase().includes(search.toLowerCase());
    const matchesDept = department === "All" || e.department === department;
    return matchesSearch && matchesDept;
  });
  const handleClock = () => {
    if (clockedIn) {
      setClockedIn(false);
    } else {
      setClockedIn(true);
      setClockTime((/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "page-title", children: "Employees" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "primary", size: "sm", onClick: handleClock, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 14 }),
          " ",
          clockedIn ? "Clock Out" : "Clock In"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "primary", size: "sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
          " Add Employee"
        ] })
      ] })
    ] }),
    clockedIn && clockTime && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 16px",
          borderRadius: "var(--radius-md)",
          background: "color-mix(in srgb, var(--success) 12%, transparent)",
          border: "1px solid color-mix(in srgb, var(--success) 30%, transparent)",
          marginBottom: 16
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 16, style: { color: "var(--success)" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontSize: "var(--font-sm)", fontWeight: 500 }, children: [
            "Clocked in at ",
            clockTime
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative", flex: 1, maxWidth: 300 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search$1, { size: 14, style: { position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: "form-input",
            placeholder: "Search employees...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            style: { paddingLeft: 32, width: "100%" }
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "btn-group", style: { display: "flex", gap: 2, flexWrap: "wrap" }, children: departments.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: department === d ? "primary" : "ghost",
          size: "sm",
          onClick: () => setDepartment(d),
          children: d
        },
        d
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 40 }),
        message: "No employees found",
        action: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "primary", size: "sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
          " Add Employee"
        ] })
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "table-container", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Position" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Department" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Phone" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((emp) => {
        const cfg = statusConfig[emp.status];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { fontWeight: 500 }, children: emp.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: emp.position }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: emp.department }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { color: "var(--text-secondary)", fontSize: "var(--font-sm)" }, children: emp.email }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { color: "var(--text-muted)", fontSize: "var(--font-sm)" }, children: emp.phone }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: cfg.variant, children: cfg.label }) })
        ] }, emp.id);
      }) })
    ] }) }) })
  ] });
}
const mockArchivedItems = [
  { id: 1, type: "document", name: "Q2 Report 2025.pdf", archivedDate: "2026-06-01", originalDate: "2025-07-15", archivedBy: "System", description: "Quarterly report from previous year" },
  { id: 2, type: "contract", name: "Legacy Agreement - OldCorp", archivedDate: "2026-05-20", originalDate: "2024-01-10", archivedBy: "Admin", description: "Expired contract with legacy client" },
  { id: 3, type: "client", name: "OldCorp (Inactive)", archivedDate: "2026-05-20", originalDate: "2024-01-10", archivedBy: "Admin", description: "Inactive client moved to archive" },
  { id: 4, type: "order", name: "PO-2025-0891", archivedDate: "2026-04-15", originalDate: "2025-12-01", archivedBy: "System", description: "Completed order from last year" },
  { id: 5, type: "task", name: "Migrate legacy database", archivedDate: "2026-03-10", originalDate: "2025-11-20", archivedBy: "Alice J.", description: "Completed migration task" },
  { id: 6, type: "document", name: "Employee Handbook v2.pdf", archivedDate: "2026-02-28", originalDate: "2024-06-01", archivedBy: "HR", description: "Superseded by v3" },
  { id: 7, type: "contract", name: "Trial License - StartupZ", archivedDate: "2026-01-15", originalDate: "2025-07-01", archivedBy: "System", description: "Expired trial agreement" }
];
const typeConfig = {
  document: { label: "Document", variant: "info" },
  contract: { label: "Contract", variant: "success" },
  client: { label: "Client", variant: "warning" },
  order: { label: "Order", variant: "danger" },
  task: { label: "Task", variant: "info" }
};
const types = ["All", "document", "contract", "client", "order", "task"];
function ArchivePage() {
  const [search, setSearch] = reactExports.useState("");
  const [typeFilter, setTypeFilter] = reactExports.useState("All");
  const [restoring, setRestoring] = reactExports.useState(null);
  const filtered = mockArchivedItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "All" || item.type === typeFilter;
    return matchesSearch && matchesType;
  });
  const handleRestore = (id) => {
    setRestoring(id);
    setTimeout(() => {
      setRestoring(null);
    }, 1e3);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "page-title", children: "Archive" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search$1, { size: 14, style: { position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              className: "form-input",
              placeholder: "Search archive...",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              style: { paddingLeft: 32, width: 200 }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "btn-group", style: { display: "flex", gap: 2 }, children: types.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: typeFilter === t ? "primary" : "ghost",
            size: "sm",
            onClick: () => setTypeFilter(t),
            children: t.charAt(0).toUpperCase() + t.slice(1)
          },
          t
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Archive, { size: 40 }),
        message: "No archived items found",
        action: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "primary", size: "sm", children: "Browse Archive" })
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "table-container", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Archived Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Original Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Archived By" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((item) => {
        const cfg = typeConfig[item.type];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: cfg.variant, children: cfg.label }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontWeight: 500 }, children: item.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11, color: "var(--text-muted)", marginTop: 2 }, children: item.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { color: "var(--text-secondary)", fontSize: "var(--font-sm)" }, children: item.archivedDate }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { color: "var(--text-muted)", fontSize: "var(--font-sm)" }, children: item.originalDate }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { color: "var(--text-secondary)", fontSize: "var(--font-sm)" }, children: item.archivedBy }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              loading: restoring === item.id,
              onClick: () => handleRestore(item.id),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { size: 14 }),
                " Restore"
              ]
            }
          ) })
        ] }, item.id);
      }) })
    ] }) }) })
  ] });
}
function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", height: "100vh", alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner" }) });
  if (!token) return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/login", replace: true });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
}
function PublicRoute({ children }) {
  const { token, loading } = useAuth();
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", height: "100vh", alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner" }) });
  if (token) return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/dashboard", replace: true });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
}
function App() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(BrowserRouter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AuthProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Routes, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/pricing", element: /* @__PURE__ */ jsxRuntimeExports.jsx(PricingPage, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/agenda", element: /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AgendaPage, {}) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/reports", element: /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ReportsPage, {}) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/goals", element: /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(GoalsPage, {}) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/contracts", element: /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ContractsPage, {}) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/employees", element: /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(EmployeesPage, {}) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/archive", element: /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArchivePage, {}) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/login", element: /* @__PURE__ */ jsxRuntimeExports.jsx(PublicRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoginPage, {}) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Route, { path: "/", element: /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, {}) }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { index: true, element: /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/dashboard", replace: true }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "dashboard", element: /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardPage, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "upload", element: /* @__PURE__ */ jsxRuntimeExports.jsx(UploadPage, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "alerts", element: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertsPage, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "products", element: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductsPage, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "clients", element: /* @__PURE__ */ jsxRuntimeExports.jsx(ClientsPage, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "suppliers", element: /* @__PURE__ */ jsxRuntimeExports.jsx(SuppliersPage, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "orders", element: /* @__PURE__ */ jsxRuntimeExports.jsx(OrdersPage, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "financial", element: /* @__PURE__ */ jsxRuntimeExports.jsx(FinancialPage, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "tasks", element: /* @__PURE__ */ jsxRuntimeExports.jsx(TasksPage, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "documents", element: /* @__PURE__ */ jsxRuntimeExports.jsx(DocumentsPage, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "knowledge", element: /* @__PURE__ */ jsxRuntimeExports.jsx(KnowledgePage, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "ai", element: /* @__PURE__ */ jsxRuntimeExports.jsx(AiPage, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "settings", element: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsPage, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "calendar", element: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarPage, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "directives", element: /* @__PURE__ */ jsxRuntimeExports.jsx(DirectivesPage, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "emails", element: /* @__PURE__ */ jsxRuntimeExports.jsx(EmailsPage, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "security", element: /* @__PURE__ */ jsxRuntimeExports.jsx(SecurityPage, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "*", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/dashboard", replace: true }) })
  ] }) }) });
}
ReactDOM.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);

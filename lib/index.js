'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SimpleEventEmitter = function () {
  function SimpleEventEmitter() {
    _classCallCheck(this, SimpleEventEmitter);

    this._map = new Map();
  }

  _createClass(SimpleEventEmitter, [{
    key: 'listeners',
    value: function listeners(name) {
      var listeners = this._map.get(name);
      if (!listeners) {
        listeners = new Set();
        this._map.set(name, listeners);
      }
      return listeners;
    }
  }, {
    key: 'on',
    value: function on(name, fn) {
      this.listeners(name).add(fn);
    }
  }, {
    key: 'off',
    value: function off(name, fn) {
      if (typeof fn !== 'undefined') {
        this.listeners(name).delete(fn);
      } else {
        this._map.delete(name);
      }
    }
  }, {
    key: 'once',
    value: function once(name, fn) {
      var listeners = this.listeners(name);

      function wrapped() {
        fn.call.apply(fn, [this].concat(Array.prototype.slice.call(arguments)));
        listeners.delete(wrapped);
      }

      listeners.add(wrapped);
    }
  }, {
    key: 'emit',
    value: function emit(name) {
      for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
      }

      this.emitWithContext.apply(this, [name, this].concat(params));
    }
  }, {
    key: 'emitWithContext',
    value: function emitWithContext(name, context) {
      for (var _len2 = arguments.length, params = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        params[_key2 - 2] = arguments[_key2];
      }

      this.listeners(name).forEach(function (fn) {
        return fn.call.apply(fn, [context].concat(params));
      });
    }
  }]);

  return SimpleEventEmitter;
}();

exports.default = SimpleEventEmitter;
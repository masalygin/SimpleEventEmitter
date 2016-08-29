export default class SimpleEventEmitter {

  _map = new Map();

  listeners(name) {
    let listeners = this._map.get(name);
    if (!listeners) {
      listeners = new Set();
      this._map.set(name, listeners);
    }
    return listeners;
  }


  on(name, fn) {
    this.listeners(name).add(fn);
  }


  off(name, fn) {
    if (typeof fn !== 'undefined') {
      this.listeners(name).delete(fn);
    } else {
      this._map.delete(name);
    }
  }


  once(name, fn) {
    let listeners = this.listeners(name);

    function wrapped(...args) {
      this::fn(...args);
      listeners.delete(wrapped);
    }

    listeners.add(wrapped);
  }


  emit(name, ...params) {
    this.emitWithContext(name, this, ...params);
  }


  emitWithContext(name, context, ...params) {
    this.listeners(name).forEach((fn) => context::fn(...params));
  }

}

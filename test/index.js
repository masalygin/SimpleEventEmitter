import {expect} from 'chai';
import SimpleEventEmitter from '../src';


describe('SimpleEventEmitter', () => {

  let emitter = new SimpleEventEmitter();
  let tmp;
  let fn1 = function() {
    tmp += 1;
  };
  let fn2 = function() {
    tmp += 2;
  };


  it('#on', () => {

    tmp = 0;

    emitter.on('event', fn1);
    emitter.on('event', fn2);
    emitter.emit('event');
    expect(tmp).to.be.equal(3);

  });


  it('#off', () => {

    tmp = 0;

    emitter.off('event', fn1);
    emitter.emit('event');
    expect(tmp).to.be.equal(2);
    emitter.off('event');
    emitter.emit('event');
    expect(tmp).to.be.equal(2);

  });


  it('#once', () => {

    tmp = 0;

    emitter.once('event', fn1);
    emitter.emit('event');
    expect(tmp).to.be.equal(1);
    emitter.emit('event');
    expect(tmp).to.be.equal(1);

  });


});

'use strict';

const common = require('./common.cjs');
const assert = require('assert');

const bench = common.createBenchmark(main, {
  method: [
    'object', 'nullProtoObject', 'nullProtoLiteralObject', 'storageObject',
    'fakeMap', 'map', 'loadNativeSet', 'loadDictSet', 'entriesNativeSet', 'entriesDictSet', 'hasNativeSet', 'hasDictSet'
  ],
  n: [1e6]
});

function runObject(n) {
  const m = {};
  bench.start();
  for (let i = 0; i < n; i++) {
    m[`i${i}`] = i;
    m[`s${i}`] = String(i);
    assert.strictEqual(String(m[`i${i}`]), m[`s${i}`]);
    m[`i${i}`] = undefined;
    m[`s${i}`] = undefined;
  }
  bench.end(n);
}

function runNullProtoObject(n) {
  const m = Object.create(null);
  bench.start();
  for (let i = 0; i < n; i++) {
    m[`i${i}`] = i;
    m[`s${i}`] = String(i);
    assert.strictEqual(String(m[`i${i}`]), m[`s${i}`]);
    m[`i${i}`] = undefined;
    m[`s${i}`] = undefined;
  }
  bench.end(n);
}

function runNullProtoLiteralObject(n) {
  const m = { __proto__: null };
  bench.start();
  for (let i = 0; i < n; i++) {
    m[`i${i}`] = i;
    m[`s${i}`] = String(i);
    assert.strictEqual(String(m[`i${i}`]), m[`s${i}`]);
    m[`i${i}`] = undefined;
    m[`s${i}`] = undefined;
  }
  bench.end(n);
}

function StorageObject() { }
StorageObject.prototype = Object.create(null);

function runStorageObject(n) {
  const m = new StorageObject();
  bench.start();
  for (let i = 0; i < n; i++) {
    m[`i${i}`] = i;
    m[`s${i}`] = String(i);
    assert.strictEqual(String(m[`i${i}`]), m[`s${i}`]);
    m[`i${i}`] = undefined;
    m[`s${i}`] = undefined;
  }
  bench.end(n);
}

function fakeMap() {
  const m = {};
  return {
    get(key) { return m[`$${key}`]; },
    set(key, val) { m[`$${key}`] = val; },
    get size() { return Object.keys(m).length; },
    has(key) { return Object.hasOwn(m, `$${key}`); }
  };
}

function runFakeMap(n) {
  const m = fakeMap();
  bench.start();
  for (let i = 0; i < n; i++) {
    m.set(`i${i}`, i);
    m.set(`s${i}`, String(i));
    assert.strictEqual(String(m.get(`i${i}`)), m.get(`s${i}`));
    m.set(`i${i}`, undefined);
    m.set(`s${i}`, undefined);
  }
  bench.end(n);
}

function runMap(n) {
  const m = new Map();
  bench.start();
  for (let i = 0; i < n; i++) {
    m.set(`i${i}`, i);
    m.set(`s${i}`, String(i));
    assert.strictEqual(String(m.get(`i${i}`)), m.get(`s${i}`));
    m.set(`i${i}`, undefined);
    m.set(`s${i}`, undefined);
  }
  bench.end(n);
}
async function loadDictSet(n) {
  const DictSet = (await import('./index.js')).default
  bench.start()
  const set = new DictSet()
  let val = ''
  for (let i = 0; i < n; i++) {
    val = Math.random().toString() + Math.random().toString()
    set.add(val)
    set.size
  }
  bench.end(n)
}

function loadNativeSet(n) {
  bench.start()
  const set = new Set()
  let val = ''
  for (let i = 0; i < n; i++) {
    val = Math.random().toString() + Math.random().toString()
    set.add(val)
    set.size
  }
  bench.end(n)
}


async function entriesDictSet(n) {
  const DictSet = (await import('./index.js')).default
  bench.start()
  const set = new DictSet()
  let val = ''
  let pairs = []
  for (let i = 0; i < n; i++) {
    val = Math.random().toString() + Math.random().toString()
    // val = Math.random(200)
    set.add(val)
    pairs = set.entries()
    for (let p of pairs) p
  }
  bench.end(n)
}

function entriesNativeSet(n) {
  bench.start()
  const set = new Set()
  let val = ''
  let pairs = []
  for (let i = 0; i < n; i++) {
    val = Math.random().toString() + Math.random().toString()
    // val = Math.random(200)
    set.add(val)
    pairs = set.entries()
    for (let p of pairs) p
  }
  bench.end(n)
}

async function hasDictSet(n) {
  const DictSet = (await import('./index.js')).default
  bench.start()
  const set = new DictSet()
  let val = ''
  let pairs = []
  for (let i = 0; i < n; i++) {
    val = Math.random().toString() + Math.random().toString()
    // val = Math.random(200)
    set.add(val)
    values = set.values()
    for (let v of values) set.has(v)
  }
  bench.end(n)
}

async function haveNativeSet(n) {
  const DictSet = (await import('./index.js')).default
  bench.start()
  const set = new DictSet()
  let val = ''
  let pairs = []
  for (let i = 0; i < n; i++) {
    val = Math.random().toString() + Math.random().toString()
    // val = Math.random(200)
    set.add(val)
    values = set.values()
    for (let v of values) set.has(v)
  }
  bench.end(n)
}

function main({ n, method }) {
  switch (method) {
    case 'object':
      runObject(n);
      break;
    case 'nullProtoObject':
      runNullProtoObject(n);
      break;
    case 'nullProtoLiteralObject':
      runNullProtoLiteralObject(n);
      break;
    case 'storageObject':
      runStorageObject(n);
      break;
    case 'fakeMap':
      runFakeMap(n);
      break;
    case 'map':
      runMap(n);
      break;
    case 'loadNativeSet':
      console.log('||||||||||||||||||||||||||||||||||')
      loadNativeSet(n);
      break;
    case 'loadDictSet':
      loadDictSet(n);
      break;
    case 'entriesNativeSet':
      entriesNativeSet(1e5);
      break;
    case 'entriesDictSet':
      entriesDictSet(1e5);
      break;
    case 'hasNativeSet':
      entriesNativeSet(1e3);
      break;
    case 'hasDictSet':
      entriesDictSet(1e3);
      break;
    default:
      throw new Error(`Unexpected method "${method}"`);
  }
}

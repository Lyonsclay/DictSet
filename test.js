// A set is a list of unique values.
//

import assert from 'node:assert/strict';
import DictSet from './index.js'

const error = '\x1b[31m%s\x1b[0m'; //red
const success = '\x1b[32m%s\x1b[0m'; //green

class logger {
  static error(message) { console.error(error, message) }
  static success(message) { console.info(success, message) }
}

function test(tests) {
  const numTests = tests.length
  for (let t in tests) {
    try {
      tests[t]()
      logger.success(tests[t])
    } catch (error) {
      logger.error(tests[t])
      logger.error(error)
    }
  }
}


function testUnique() {
  const data = [0, 0, 0]
  const set = new DictSet(data)
  assert.equal(set.size, 1)
}

function testPreserveOrder() {
  const data = [null, undefined, 0, Array, 2]
  const set = new DictSet(data)
  const values = set.values()

  assert.equal(values.next().value, null)
  assert.equal(values.next().value, undefined)
  assert.equal(values.next().value, 0)
  assert.equal(values.next().value, Array)
  assert.equal(values.next().value, 2)
}


(function testsSet() {
  test([testUnique, testPreserveOrder])
})()

// A set is a list of unique values.
//
// notest
// here



export default class DictSet {
  constructor(values) {
    this.init(values)
  }

  add(obj) {
    if (!this.Dict.hasOwnProperty(obj)) {
      this.Array.push(obj)
      this.size = this.size + 1
      this.Dict[obj] = obj
    }
  }

  init(values) {
    this.Array = []
    this.Dict = {}
    this.size = 0
    if (values) {
      if (typeof values == "object" && values.length) {
        values.forEach(v => this.add(v))
        // for (let i in values) this.add(values[i])
      } else {
        this.add(values)
      }
    }
  }

  clear() {
    this.init()
  }

  *values() {
    yield* this.Array
  }

  [Symbol.iterator]() {
    return this.values()
  }

  keys() {
    return this.values()
  }

  *entries() {
    const values = this.values()
    for (let v in values) {
      const nv = v.next()
      yield [nv, nv]
    }
  }

  has(value) {
    return this.Dict.hasOwnProperty(value)
  }

  forEach(func) {
    this.Dict.values().forEach(func)
  }
}

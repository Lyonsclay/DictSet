export default class DictSet {
  constructor(values) {
    this._init(values)
  }

  add(obj) {
    if (Object.is(obj, -0) && !this.Dict.hasOwnProperty('-0')) {
      this.Array.push(obj)
      this.size = this.size + 1
      this.Dict[obj] = obj
    } else if (!this.Dict.hasOwnProperty(obj)) {
      this.Array.push(obj)
      this.size = this.size + 1
      this.Dict[obj] = obj
    }
  }

  _init(values) {
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
    this._init()
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

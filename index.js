// A set is a list of unique values.
//
// notest
// here



export default class Sentient {
  constructor(values) {
    this.init(values)
  }
  add(obj) {
    this.Hash[obj] = obj
  }
  addList(list) {
    for (l in list) this.add(l)

  }
  init(values) {

    this.Hash = function(oSource) {
      for (sKey in oSource) if (Object.prototype.hasOwnProperty.call(oSource, sKey)) this[sKey] = oSource[sKey];
    };
    // this.Hash.prototype = Object.create(null);
    if (values) {
      if (typeof values == "object" && values.length) {
        for (let v in values) this.add(v)
      } else {
        this.add(values)
      }
    }

  }

  clear() {
    this.init()
  }

  *values() {
    const names = Object.getOwnPropertyNames(job.Hash)
    for (let i in names) {
      const prop = names[i]
      console.log({prop})
      try {
        assert.notDeepStrictEqual(this.Hash[prop], Object.create(null))
        yield this.Hash[prop]
      } catch {
        undefined
      }
    }
  }


  keys() {
    return this.values()
  }


}

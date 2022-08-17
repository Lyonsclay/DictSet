### Custom Set implementation in JavaScript
* All items in set are unique. 
* The items are iterable by their insertion order.
* Built with nodejs core library using `node@16.16.0`.


I used a basic javascript object as a dictionary to implement a Set; objects are stored with their string representation as the key. However, I realised that while the latest javascript iterables preserve the order of the items, the order is determined in part by the type of the key. If the key is a number or a string representation of a number then those keys will come first in alphabetical/numerical order. So I added an array to store the objects in the order of inserstion. 

Storing the object twice will use more memory but insures the fastest lookups. Indeed the `DictSet` is about twice as fast in most tests than `Set` from the core library. In fact, I was going to create a hash map implementation of Set but decided that wasn't neccesary because the performance of `DictSet` is superior(with some interesting caveats that are mentioned below).

To check performance I used some [benchmarks](./map-bench.cjs) from the nodejs source code that explore the performance of different configurations of objects for storing integers and strings.  I had considered trying a different type of object for storing the Set values or a different method of assignment but the difference in performance in these variations is minimal with the exception of `Map` which is about twice as slow as the straight object benchmarks. 

I added some tests comparing the performance of various methods on `DictSet` and `Set`. Generally, the `DictSet` was twice as fast as the `Set` with 1,000,000 iterations of the method calls. This changes considerably whith runs less than 1,000,000; for example with the `entriesNativeSet` and `entriesDictSet` and 100,000 runs `Set` is several hundred times faster than `DictSet` but at 1,000,000 runs `DictSet` is much faster(infact I couldn't get `Set` to finish the runs even after 20 minutes). It would be intresting to explore further why the performance tanks at a certain point. I would guess it has something to do with how `Set` is using the memory space and that there is change that occurs somewhere after 100,000 item insertions.


There are no outside dependencies for this code so you can simply git clone this repo and then run the following commands to test.

To run the benchmarks:

`npm run benchmark`

To run the tests:

`npm test`


``` javascript
> set = new DictSet([0, 2, 4, Array, Function])
DictSet {
  Dict: {
    '0': 0,
    '2': 2,
    '4': 4,
    'function Array() { [native code] }': [Function: Array],
    'function Function() { [native code] }': [Function: Function]
  },
  size: 5
}
```

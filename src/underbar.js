(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n === 0 ) {return [];}
    if (n > array.length) {return array}
    return n === undefined ? array[array.length - 1] : array.slice(n - 1);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
          iterator(collection[i], i, collection);
      }
    } else {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var passes = []
    _.each(collection, function(item) {
      if (test(item)) {
        passes.push(item);
      }
    });
    return passes;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function(item) {
      if (!test(item))
      return item;
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator) {


    var copy = array.slice();
    var uniqElements = [];
    var transformed = [];
    if (!isSorted) {
      copy.sort();
    } else {
      _.each(copy, function(item) {
        if (transformed.indexOf(iterator(item)) === -1)
        transformed.push(iterator(item));
      });
      return copy.slice(0, transformed.length);
    }
    _.each(copy, function(item) {
      if (uniqElements.indexOf(item) === -1) {
        uniqElements.push(item);
      }
    })
    return uniqElements;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var mappedArray = [];
    _.each(collection, function(item) {
      mappedArray.push(iterator(item))
    })
    return mappedArray;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    //use each to create accumulator 
       // accumulator = accumulator || collection[0];

    var defined = true;
    if (accumulator === undefined) {
      accumulator = collection[0];
      defined = false;
    }
    _.each(collection, function(item) {
      if (defined) {
        accumulator = iterator(accumulator, item);
      }
      defined = true;
    })
    return accumulator;

    // var count = 0;
    // if (Array.isArray(collection)) {
    //   if (accumulator === undefined) {
    //     accumulator = collection[0];
    //     count++;
    //   }
    //   while (count < collection.length) {
    //     accumulator = iterator(accumulator, collection[count]);
    //     count++;
    //   }
    // } else {
    //   for (var key in collection) {
    //     if (accumulator === undefined) {
    //       accumulator = collection[key];
    //     } else {
    //       accumulator = iterator(accumulator, collection[key]);
    //     }
    //   }
    // }
    // return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    iterator = iterator || _.identity;
    return _.reduce(collection, function(accumulator, current) {
      return !!(accumulator && iterator(current));  
    },true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    iterator = iterator || _.identity;
    return !_.every(collection, function(item) {
      return !iterator(item);
    });
  };
//         S   E  Op.E  op.t  Both
// T T T   O   O   X     X     O
// T F T   O   X   O     X     O
// F F F   X   X   O     O     X

  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    for (var i = 0; i < arguments.length; i++)
      // console.log('arguments[i]:', arguments[i]);
      for (var key in arguments[i]) {
        obj[key] = arguments[i][key];
      }
    return obj;
    // _.each(arguments, function(argument) {
    //   for (var key in argument) {
    //     obj[key] = argument[key];
    //   }
    //   return obj;
    // })
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    for (var i = 0; i < arguments.length; i++)
      // console.log('arguments[i]:', arguments[i]);
      for (var key in arguments[i]) {
        if (!obj.hasOwnProperty(key))
        obj[key] = arguments[i][key];
      }
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var memos = {};
    return function() {
      if (memos.hasOwnProperty(JSON.stringify(arguments))) {
        return memos[JSON.stringify(arguments)];
      }
      memos[JSON.stringify(arguments)] = func.apply(this, arguments);
      return memos[JSON.stringify(arguments)];
    }
  };

    // var isNotInMemories = true;
    // var memories = [];
    // // var mySet = new Set();
    // if (!memories.includes(func.apply(this, arguments))) {
    //   isNotInMemories = false;
    // }

    // // TIP: We'll return a new function that delegates to the old one, but only
    // // if it hasn't been called before.
    // return function() {
    //   if (isNotInMemories) {
    //     memories.push(func.apply(this, arguments));
    //     // isNotInMemories = false;
    //     // TIP: .apply(this, arguments) is the standard way to pass on all of the
    //     // infromation from one function call to another.
    //     // memories.push(func.apply(this, arguments));

    //     // // var unique = _.uniq(memories);
    //     // // console.log('memories:',memories, 'unique:', unique)
    //     // // if (unique.length !== memories.length) {
    //     //   alreadyCalled = true;
    //     //   console.log('memories:',memories)
    //     //   memories = _.uniq(memories)
    //     //   console.log('memories:',memories)
    //     // }
        
    //   }
    //   return memories[memories.length - 1];
    //   // The new function always returns the originally computed result.
      
    // };
    // var memories = [];
    // memories.push(func.apply(this, arguments))
    // var unique = _.uniq(memories);
    // if (unique.length !== memories.length) {
    //   memories.pop();
    // }
    // return memories[memories.length - 1];
    // var memories = new Set();
    // // var mLength = memories.size;
    // var setSize = memories.size;
    // var result;
    // // if (!memories.has(func.apply(this, arguments))) {
      
    
    // memories.add(func.apply(this, arguments));
    // return function() {
    //   if (memories.size > setSize) {
    //     console.log('memories:',memories, 'setSize:', setSize, 'actual set size:',memories.size);
    //     return _.each(memories, func[this, arguments])
    //   }
      
    // }
      // if (memories.size !== mLength) {
        // return [...memories][memories.length - 1]
      // }
    // return [...memories][memories.length - 1]
      // var intersection = new Set([...set1].filter(x => set2.has(x)));
      // return memories[memories.length - 1];
    // }
    
    // var memories = [];
    // return function() {
    //   if (!memories.includes(func)) {
    //     // TIP: .apply(this, arguments) is the standard way to pass on all of the
    //     // infromation from one function call to another.
    //     memories.push(func.apply(this, arguments));
    //   }
    //   // The new function always returns the originally computed result.
    //   return memories[memories.length - 1];
    // }
    // return memories[memories.length - 1];
  // };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    // console.log(arguments)
    var args = [...arguments].slice(2);
    return setTimeout(function() {
      func.apply(this, args);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var shuffled = [];
    var randomIndices = new Set();
    while (randomIndices.size < array.length) {
      randomIndices.add(Math.floor(Math.random() * array.length));
    }
    randomIndices = [...randomIndices];
    _.each(array, function(item, index) {
      shuffled[randomIndices[index]] = array[index];
    });
    return shuffled;
  };

  //  _.shuffle = function(array) {
  //   var array = array.slice();
  //   var currentIndex = array.length; 
  //   var temporaryValue;
  //   console.log(array + " The Array");
  //   var randomIndex;
  //     while (0 !== currentIndex) {
  //       randomIndex = Math.floor(Math.random() * currentIndex);
  //       console.log("randomIndex:", randomIndex);
  //       console.log("currentIndex",currentIndex);
  //       currentIndex -= 1;
  //       // console.log('currentIndex -= 1:',currentIndex -= 1)
  //       temporaryValue = array[currentIndex];
  //       console.log('temporaryValue = array[currentIndex]:', temporaryValue = array[currentIndex]);
  //       array[currentIndex] = array[randomIndex];
  //       console.log('array[currentIndex] = array[randomIndex]',array[currentIndex] = array[randomIndex]);
  //       array[randomIndex] = temporaryValue;
  //       console.log('array[randomIndex] = temporaryValue', array[randomIndex] = temporaryValue);
  //       console.log('array:',array);
  //     }
  //   console.log('final array:', array);
  //   return array;
   
   
  // };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    if (typeof functionOrKey === 'string') {
      return _.map(collection, function(item) {
        return item[functionOrKey]();
      });
    }
    return _.map(collection, function(item) {
      return functionOrKey.call(item);
    });
  }; 
    

    // var isMethod;
    //  if (typeof functionOrKey === 'string') {
    //   isMethod = false;
    //  }
    // return _.map(functionOrKey, function(value) {
    //   var func = isMethod ? functionOrKey : value[functionOrKey];
    //   return func == null ? func : func.apply(value, collection);
    // });
    
  

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  // [3, [[[4]]]]
  _.flatten = function(nestedArray, result) {
    result = [];
    _.each(nestedArray, function(item) {
      if (Array.isArray(item)) {
        result.push(..._.flatten(item));
      } else {
        result.push(item);
      }
    });
    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());

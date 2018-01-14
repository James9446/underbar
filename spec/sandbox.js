var each = function(collection, iterator) {
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

var invoke = function(collection, functionOrKey, args) {
  // console.log('args:', args);  
  // return each(collection, function(item) {
  //     functionOrKey.call(item);
  //   })
  invoked = [];
  // for (var i = 0; i < collection.length; i++) {
  //   invoked.push(functionOrKey.call(null, collection[i]));
  // }
  if (typeof functionOrKey !== 'string') {
    each(collection, function(item) {
      invoked.push(functionOrKey.call(item, item));
    })
  } else {
    return collection.map(function(item) {
      return item[functionOrKey]();
    });
  }
  return invoked;
 };

 var reverse = function(arr){
  return arr.split('').reverse().join('');
};

var reversedStrings = invoke(['dog', 'cat'], reverse);
console.log(reversedStrings);
// console.log('cat'['toUpperCase']())
var upperCasedStrings = invoke(['dog', 'cat'], 'toUpperCase');
console.log(upperCasedStrings);



// var flatten = function(nestedArray, result) {
//     result = [];
//     var count = 0;
//     function flattenRecursion(array, i) {
//     	console.log('array:', array);
//     	// console.log('i:', i);
//     	console.log('array['+i+']', array[i]);
//       if (i === array.length) {
//       	console.log('end')
//         return;
//       }
//       if (!Array.isArray(array[i])) {
//         result.push(array[i]);
//         return
//         // return flattenRecursion(array, i + 1);
//       }
//       if (Array.isArray(array[i])) {
//       	var newArr = array[i].slice();
//         return flattenRecursion(newArr, 0);
//       }
//       console.log('ever?')
//       return flattenRecursion(array, i + 1);
//     }
//     // do {
//     	// flattenRecursion(nestedArray, count);
//     while (result.length <= nestedArray.length) {
    	
//     	flattenRecursion(nestedArray, count);
//     	count++;
//     }
    
//     // if (!Array.isArray(nestedArray[0])) {
//     //   return 
//     // }
//     // result.unshift(nestedArray);
//     return result;
//     // return _.reduce(nestedArray, function(accumulator, current) {
//     //   if (Array.isArray(current)) {
//     //     return accumulator = current;
//     //   }
//     // },[])
//   };
// var arraySum = function(array) {
//   result = [];
//   each(array, function(item) {
//     if (Array.isArray(item)) {
//       result.push(...arraySum(item));
//     } else {
//       result.push(item);
//     }
//   });
//   return result;
// }
// var arraySum = function(array) {
//   var sum = 0;
//   array.forEach(item => {
//   	if (Array.isArray(item)) {
//   		sum += arraySum(item);
//   	} else {
//   		sum += item;
//   	}
//   });
//   return sum;
// }


// var flatten = function(nestedArray, result) {
// 	result = [];
// 	each(nestedArray, function(item) {
// 		if (Array.isArray(item)) {
// 			result.push(...flatten(item));
// 		} else {
// 			result.push(item);
// 		}
// 	});
// 	var sum = function(array) {
// 		if (!array.length) {
// 			return 0;
// 		}
// 		return array[0] + sum(array.slice(1));
// 	};
// 	var value = result.splice();
// 	return sum(value);
// }
// console.log(arraySum([1,[2,3],[[4]],5]));
// console.log(flatten([1,[2,3],[[4]],5]));
// console.log(flatten([1, [2], [3, [[[4]]]]]));







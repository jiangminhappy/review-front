function flatten(arr) {
  let res = [];
  for(let i = 0, length = arr.length; i < length; i++) {
    if (Array.isArray(arr[i])) {
      res.push(...flatten(arr[i]))
    } else {
      res.push(arr[i])
    }
  }
  return res;
}

// var arr1 = [1, 2, [3], [1, 2, 3, [4, [2, 3, 4]]]];
//  function flatten(arr) {
//       while (arr.some(item => Array.isArray(item))) {
//         console.log('1', arr)
//         arr = [].concat(...arr);
//         console.log('2', arr)
//         //arr = Array.prototype.concat.apply([],arr);
//       }
//       return arr;
//     }
//     flatten(arr1); //[1, 2, 3, 1, 2, 3, 4, 2, 3, 4]

// console.log([1, 2, [3], [1, 2, 3, [4, [2, 3, 4]]]].toString().split(','))
console.log(("1,2,3,1,2,3,4,2,3,4").split(','))

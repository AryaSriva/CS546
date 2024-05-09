/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let arrayPartition = (arrayToPartition, partitionFunc) => {
  /* check that params are valid */
  if (!Array.isArray(arrayToPartition)) {
    throw `${arrayToPartition} is not an array`;
  }
  if (arrayToPartition.length === 0) {
    throw `${arrayToPartition} is not a nonempty array`;
  }
  if (arrayToPartition.length < 2) {
    throw `${arrayToPartition} does not have at least 2 elements`;
  }
  if (typeof partitionFunc !== "function") {
    throw `${partitionFunc} is not a function`;
  }
  /*loop through array elements*/
  let result = [[], []];
  for (let i = 0; i < arrayToPartition.length; i++) {
      if (partitionFunc(arrayToPartition[i])) {
        result[0].push(arrayToPartition[i]);
      } else {
        result[1].push(arrayToPartition[i]);
      } 
  }
  return result;
};

let arrayShift = (arr, n) => {
  /* check that params are valid */
  if (!Array.isArray(arr)) {
    throw `${arr} is not an array`;
  }
  if (arr.length < 2) {
    throw `${arr} does not have at least 2 elements`;
  }
  if (typeof n !== "number" || isNaN(n)) {
    throw `${n} is not a number`;
  }
  if (!Number.isInteger(n)) {
    throw `${n} is not a whole number`;
  }
  /* initialize a new object to store all the new indices of the elements*/ 
  let newIndices = {};
  for (let i = 0; i < arr.length; i++) {
    let newIndex = i + n;
    while (newIndex > arr.length - 1) {
      newIndex -= arr.length;
    }
    while (newIndex < 0) {
      newIndex += arr.length;
    }
    newIndices[newIndex] = arr[i];
  }
  /* rearrange the array according to the new indices of the elements */
  for (let i = 0; i < arr.length; i++) {
    arr[i] = newIndices[i];
  }
  return arr;
};

let matrixOne = (matrix) => {
  /* check that the matrix is valid */
  if (!Array.isArray(matrix)) {
    throw `${matrix} is not an array`;
  }
  if (matrix.length === 0) {
    throw `${matrix} is empty`;
  }
  let matrixLengths = matrix[0].length;
  for (let i = 0; i < matrix.length; i++) {
    if (!Array.isArray(matrix)) {
      throw `${matrix[i]} is not an array`;
    }
    if (matrix[i].length === 0) {
      throw `${matrix[i]} is empty`;
    }
    if (matrix[i].length !== matrixLengths) {
      throw `Subarrays do not have same number of elements`;
    }
    for (let j = 0; j < matrix[i].length; j++) {  
      if (typeof matrix[i][j] !== "number" || isNaN(matrix[i][j])) {
        throw `${matrix[i]} does not contain all numbers`;
      }
      if (!Number.isInteger(matrix[i][j])) {
        throw `${matrix[i]} does not contain all integers`;
      }
    }
  }
  /* loop through the matrix and keep track of which rows/columns have a 0*/
  let zeroes = [[], []];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 0) {
        zeroes[0].push(i);
        zeroes[1].push(j);
      }
    }
  }
  /* set all the rows and columns which have 0s to be 1s */
  for (let i = 0; i < zeroes[0].length; i++) {
    let indexToSet = zeroes[0][i];
    for (let j = 0; j < matrix[0].length; j++) {
      matrix[indexToSet][j] = 1;
    }
  }
  for (let j = 0; j < zeroes[1].length; j++) {
    let indexToSet = zeroes[1][j];
    for (let i = 0; i < matrix.length; i++) {
      matrix[i][indexToSet] = 1;
    }
  }

  return matrix;
};

export {arrayPartition, arrayShift, matrixOne};
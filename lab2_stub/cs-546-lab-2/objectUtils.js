/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

import { differenceHelper, differenceCleanUp } from "./helpers.js";

let objectStats = (arrObjects) => {
  /* check params */
  if (!Array.isArray(arrObjects)) {
    throw `${arrObjects} is not an array`;
  }
  let values = [];
  for (let i = 0; i < arrObjects.length; i++) {
    if (typeof arrObjects[i] !== "object") {
      throw `${arrObjects[i]} is not an object`;
    }
    if (Object.keys(arrObjects[i]).length === 0) {
      throw `${arrObjects[i]} cannot be empty`;
    }
    for (let j in arrObjects[i]) {
      if (typeof arrObjects[i][j] !== "number" || Number.isNaN(arrObjects[i][j])) {
        throw `${arrObjects[i][j]} is not a number`;
      } 
      let num = arrObjects[i][j];
      let nums = num.toString().split('.');
      if (nums.length === 2) {
        if (nums[1].length > 3) {
          throw `${num} has too many decimal places`;
        }
      }
      values.push(arrObjects[i][j]);
    }
  }
  /* sort all values */
  for (let i = 0; i < values.length; i++) {
    for (let j = i + 1; j < values.length; j++) {
      if (values[i] > values[j]) {
        let temp = values[i];
        values[i] = values[j];
        values[j] = temp;
      }
    }
  }
  /* count number of occurrences for each value(for mode calculation) */
  let result = {};
  let occurrences = {};
  let sum = 0;
  for (let i = 0; i < values.length; i++) {
    sum += values[i];
    if (!(values[i] in occurrences)) {
      occurrences[values[i]] = 1;
    } else {
      occurrences[values[i]] += 1;
    }
  }
  /* set all the attributes for the return object, excluding mode */
  result["maximum"] = values[values.length - 1];
  result["minimum"] = values[0];
  result["count"] = values.length;
  result["sum"] = sum;
  result["range"] = result["maximum"] - result["minimum"];
  result["mean"] = Math.round(result["sum"]/result["count"]*1000)/1000;
  if ((values.length) % 2 !== 0) {
    result["median"] = values[(values.length - 1)/2];
  } else {
    result["median"] = (values[(values.length)/2 - 1] + values[(values.length)/2])/2;
  }
  /*find the mode and set the mode attribute accordingly */
  let maxOccurrences = 0;
  for (let i in occurrences) {
    if (occurrences[i] > maxOccurrences) {
      maxOccurrences = occurrences[i];
    }
  }
  let modes = [];
  for (let i in occurrences) {
    if (occurrences[i] == maxOccurrences) {
      modes.push(i)
    }
  }
  for (let i = 0; i < modes.length; i++) {
    for (let j = i + 1; j < modes.length; j++) {
      if (modes[i] > modes[j]) {
        let temp = modes[i];
        modes[i] = modes[j];
        modes[j] = temp;
      }
    }
  }
  if (modes.length > 1) {
    result["mode"] = modes;
  } else if (modes.length == values.length) {
    result["mode"] = 0;
  } else {
    result["mode"] = Number(modes[0]);
  }
  return result;
};

let nestedObjectsDiff = (obj1, obj2) => {
  /* check params */
  if (typeof obj1 !== "object") {
    throw `${obj1} is not an object`;
  } 
  if (typeof obj2 !== "object") {
    throw `${obj2} is not an object`;
  }
  if (Object.keys(obj1).length === 0) {
    throw `${obj1} cannot be empty`;
  }
  if (Object.keys(obj2).length === 0) {
    throw `${obj2} cannot be empty`;
  }
  /* call recursive helper to change result to have all the differences between the two objects */
  let result = {};
  differenceHelper(obj1, obj2, result);
  /* delete any empty nested objects in the differences object (edge case for when two objects are the same) */
  for (let i in result) {
    differenceCleanUp(result[i]);
  }
  differenceCleanUp(result);
  return result;
};

let mergeAndSumValues = (...args) => {
  /* check params */
  for (let i = 0; i < args.length; i++) {
    if (typeof args[i] !== "object") {
      throw `${args[i]} is not an object`;
    }
    if (Object.keys(args[i]).length === 0) {
      throw `${args[i]} cannot be empty`;
    }
    for (let j in args[i]) {
      if (typeof args[i][j] !== "number") {
        if (typeof args[i][j] === "string") {
          if (isNaN(Number(args[i][j]))) {
            throw `${args[i][j]} is not a valid value`;
          }
          args[i][j] = Number(args[i][j]);
        } else {
          throw `${args[i][j]} is not a valid value`;
        }
      }
    }
  }
  /* merge two objects into one */
  let result = {};
  for (let i = 0; i < args.length; i++) {
    for (let j in args[i]) {
      if (!(j in result)) {
        result[j] = args[i][j];
      } else {
        result[j] += args[i][j];
      }
    }
  }
  return result;
};

export {objectStats, nestedObjectsDiff, mergeAndSumValues};
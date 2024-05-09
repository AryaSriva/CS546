/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
import {isPalindrome, isIsogram, LCS} from "./helpers.js";

let swapChars = (string1, string2) => {
  /* check params are valid */
  if (typeof string1 !== "string") {
    throw `${string1} is not a string`;
  }
  if (typeof string2 !== "string") {
    throw `${string2} is not a string`;
  }
  if (string1.length < 4 || string1.trim().length === 0) {
    throw `${string1} is not at least 4 non-space characters`;
  }
  if (string2.length < 4 || string2.trim().length === 0) {
    throw `${string2} is not at least 4 non-space characters`;
  }
  /* trim each input string and rearrange it accordingly*/
  string1 = string1.trim();
  string2 = string2.trim();
  let result = "";
  result += string2.slice(0, 4);
  result += string1.slice(4);
  result += " ";
  result += string1.slice(0, 4);
  result += string2.slice(4);
  return result;
};
let longestCommonSubstring = (str1, str2) => {
  /* check params are valid */
  if (typeof str1 !== "string") {
    throw `${str1} is not a string`;
  }
  if (typeof str2 !== "string") {
    throw `${str1} is not a string`;
  }
  if (str1.length < 5 || str1.trim().length === 0) {
    throw `${str1} is not at least 5 non-space characters`;
  }
  if (str2.length < 5 || str2.trim().length === 0) {
    throw `${str2} is not at least 5 non-space characters`;
  }
  /*loop over one string and find all common substrings and store them into an array using LCS helper function*/
  let result = [];
  if (str2.length < str1.length) {
    LCS(str2, str1, result);
  } else {
    LCS(str1, str2, result);
  }
  /* loop over the array to find the length of the longest substring, and then loop over it again to find and return the substring*/
  let max = -1;
  for (let i = 0; i < result.length; i++) {
    if (result[i].length > max) {
      max = result[i].length;
    }
  }
  for (let i = 0; i < result.length; i++) {
    if (result[i].length === max) {
      return result[i];
    }
  }
  return "";
};

let palindromeOrIsogram = (arrStrings) => {
  /* check array is valid*/
  if (!Array.isArray(arrStrings)) {
    throw `${arrStrings} is not an array`;
  }
  if (arrStrings.length < 2) {
    throw `${arrStrings} does not contain at least 2 string elements`;
  }
  for (let i = 0; i < arrStrings.length; i++) {
    if (typeof arrStrings[i] !== "string") {
      throw `${arrStrings[i]} is not a string`;
    } 
    if (arrStrings[i].trim().length === 0) {
      throw `${arrStrings[i]} is not a non-empty string`;
    }
  }
  /* loop over the array, calling the helper function on each string*/
  let result = {};
  for (let i = 0; i < arrStrings.length; i++) {
    if (isPalindrome(arrStrings[i]) && isIsogram(arrStrings[i])) {
      result[arrStrings[i]] = "Both";
    } else if (isPalindrome(arrStrings[i])) {
      result[arrStrings[i]] = "Palindrome";
    } else if (isIsogram(arrStrings[i])) {
      result[arrStrings[i]] = "Isogram";
    } else {
      result[arrStrings[i]] = "Neither";
    }
  }
  return result;
};

export {swapChars, longestCommonSubstring, palindromeOrIsogram};

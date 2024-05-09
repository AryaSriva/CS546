/*
Name: Aryaman Srivastava
Pledge: I pledge my honor that I have abided by the Stevens Honors System.
CS 546 Lab 1
*/ 

export const questionOne = (index) => {
  // Implement question 1 here
  if (index == 0) { //base case 
    return 0;
  } else if (index == 1) {
    return 1;
  } else {
    return questionOne(index - 1) + questionOne(index - 2); //return result
  }
};

export const questionTwo = (arr) => {
  // Implement question 2 here
  if (arr == null) { //base case
    return {};
  }
  let result = {};
  for (let i = 0; i < arr.length; i++) { //loop to check if current arr element is prime
    let bool = true;
    let n = arr[i];
    for (let j = 2; j < n; j++) {
      for (let k = 2; k < n; k++) {
        if (k*j == n) {
          bool = false;
        }
      }
    }
    result[n] = bool; //update object property accordingly
    if (n <= 1) { //edge case
      result[n] = false;
    }
  }
  return result; //return result
};

export const questionThree = (str) => {
  // Implement question 3 here
  let result = {consonants: 0, vowels: 0, numbers: 0, spaces: 0, punctuation: 0, specialCharacters: 0};
  let consonants = "zxcvbnmsdfghjklqwrtypZXCVBNMSDFGHJKLQWRTYP"; //initialize strings holding all the characters
  let vowels = "aeiouAEIOU";
  let numbers = "1234567890";
  let punctuation = ".?!,:;-[]{}()'\"\"\…";
  let spaces = " ";
  for (let i = 0; i < str.length; i++) { //iterate over the string, conditionally incrementing properties 
    if (consonants.includes(str.charAt(i))) {
      result.consonants += 1;
    } else if (vowels.includes(str.charAt(i))) {
      result.vowels += 1;
    } else if (numbers.includes(str.charAt(i))) {
      result.numbers += 1;
    } else if (spaces.includes(str.charAt(i))) {
      result.spaces += 1;
    } else if (punctuation.includes(str.charAt(i))) {
      result.punctuation += 1;
    } else {
      result.specialCharacters += 1;
    }
  }

  return result; //return result
};

export const questionFour = (arr) => {
  // Implement question 4 here
  if (arr == null || arr.length == 0) {
    return [];
  }
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (!result.includes(arr[i])) {
      result.push(arr[i]);
    }
  }
  return result; //return result
};

//DO NOT FORGET TO UPDATE THE INFORMATION BELOW OR IT WILL BE -2 POINTS PER FIELD THAT IS MISSING.
export const studentInfo = {
  firstName: 'Aryaman',
  lastName: 'Srivastava',
  studentId: '20014024'
};

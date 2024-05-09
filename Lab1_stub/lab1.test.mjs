/* 
Name: Aryaman Srivastava
Pledge: I pledge my honor that I have abided by the Stevens Honors System
CS 546 Lab 1 Tester
*/

import * as lab1 from './lab1.mjs';

//TODO: Write and call each function in lab1.js 5 times each, passing in different input

//Test Question 1
console.log(lab1.questionOne(0)); //output: 0
console.log(lab1.questionOne(1)); //output: 1
console.log(lab1.questionOne(4)); //output: 3
console.log(lab1.questionOne(9)); //output: 34
console.log(lab1.questionOne(11)); //output: 89

//Test Question 2
console.log(lab1.questionTwo()); //output: {}
console.log(lab1.questionTwo([0, 1, 2, 3])); //output: {0: false, 1: false, 2: true, 3: true}
console.log(lab1.questionTwo([4,6,12])); //output: {4: false, 6: false, 12: false}
console.log(lab1.questionTwo([2, 7, 10, 15])); //output: {2: true, 7: true, 10: false, 15: false}
console.log(lab1.questionTwo([3,5,7,11,13,17])); //output: {3: true, 5: true, 11: true, 13: true, 17: true}

//Test Question 3
console.log(lab1.questionThree("")); //output: {consonants: 0, vowels: 0, numbers: 0, spaces: 0, punctuation: 0, specialCharacters: 0}
console.log(lab1.questionThree("The quick brown fox jumps over the lazy dog.")); //output: {consonants: 24, vowels: 11, numbers: 0, spaces: 8, punctuation: 1, specialCharacters: 0}
console.log(lab1.questionThree("How now brown cow!!!")); //output: {consonants: 10, vowels: 4, numbers: 0, spaces: 3, punctuation: 3, specialCharacters: 0}
console.log(lab1.questionThree("One day, the kids from the neighborhood carried my mother's groceries all the way home. You know why? It was out of respect.")); //output: {consonants: 61, vowels: 36, numbers: 0, spaces: 22, punctuation: 5, specialCharacters: 0}
console.log(lab1.questionThree("CS 546 is going to be fun & I'm looking forward to working with you all this semester!!" )); //output: {consonants: 40, vowels: 23, numbers: 3, spaces: 17, punctuation: 3, specialCharacters: 1}

//Test Question 4
console.log(lab1.questionFour([1, 1, 1, 1, 1, 1])); //output: [1]
console.log(lab1.questionFour([1, '1', 1, '1', 2])); //output: [1, '1', 2] 
console.log(lab1.questionFour([3, 'a', 'b', 3, '1'])); //output: [3, 'a', 'b', '1']
console.log(lab1.questionFour([])); //output: []
console.log(lab1.questionFour(["Hello", "Hello!", 1, 1])) //output: ["Hello", "Hello!", 1]
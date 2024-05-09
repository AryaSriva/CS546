/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/
import { arrayPartition, arrayShift, matrixOne } from "./arrayUtils.js";
import { swapChars, longestCommonSubstring, palindromeOrIsogram } from "./stringUtils.js";
import {objectStats, nestedObjectsDiff, mergeAndSumValues} from "./objectUtils.js";

/* test cases for arrayPartition */ 
try {
    let partitionedArray = arrayPartition(); //throws error
    console.log(partitionedArray);
} catch (e) {
    console.log(e);
}

try {
    let arrayToPartition = [10, 15, 20, 25, 30]; 
    let partitionFunc2 = (num) => num > 18; 
    let partitionedArrays2 = arrayPartition(arrayToPartition, partitionFunc2); // Expected Result: [[20, 25, 30], [10, 15]]
    console.log(partitionedArrays2);
} catch (e) {
    console.log(e);
}

/* test cases for arrayShfit */

try {
    let shiftedArray = arrayShift([1,2,3], 0.5); //throws error
    console.log(shiftedArray);
} catch (e) {
    console.log(e);
}

try {
    let shiftedArray2 = arrayShift([1,2,3,4], -2);   // returns [3,4,1,2]
    console.log(shiftedArray2);
} catch (e) {
    console.log(e);
}

/* test cases for matrixOne */

try {
    let newMatrix = matrixOne([[0,1,2,0],[3,5,4]]); //throws error
    console.log(newMatrix);
} catch (e) {
    console.log(e);
}

try {
    let newMatrix1 = matrixOne([[0,1,2,0],[3,5,4,2],[1,7,3,5]]); //returns [[1,1,1,1],[1,5,4,1],[1,7,3,1]] 
    console.log(newMatrix1);
} catch (e) {
    console.log(e);
}

/* test cases for swapChars */

try {
    let swappedString = swapChars("                ", "hello"); //throws error
    console.log(swappedString);
} catch (e) {
    console.log(e);
}

try {
    let swappedString1 = swapChars("Patrick", "Hill"); //Returns "Hillick Patr"
    console.log(swappedString1);
} catch (e) {
    console.log(e);
}

/* test cases for longestCommonSubstring */

try {
    let substring = longestCommonSubstring("a", "apple"); //throws error
    console.log(substring);
} catch (e) {   
    console.log(e);
}

try {
    let commonSubstring = longestCommonSubstring("apple", "applesauce"); //returns apple
    console.log(commonSubstring);
} catch (e) {
    console.log(e);
}

/* test case for palindromeOrIsogram */

try {
    let testString = palindromeOrIsogram(["Hello", "Hi", 5]); //throws error
    console.log(testString);
} catch (e) {
    console.log(e);
}

try {
    let checkStrings = (["Madam", "Lumberjack", "He did, eh?", "Background", "Taco cat? Taco cat.", "Invalid String"]); 
    let results = palindromeOrIsogram(checkStrings); 
    console.log(results);
    //returns {"Madam": "Palindrome", "Lumberjack": "Isogram", "He did, eh?": "Palindrome", "Background": "Isogram", "Taco cat? Taco cat.": "Palindrome", "Invalid String": "Neither" }
} catch (e) {
    console.log(e);
}

/* test case for objectStats */

try {
    let arrOfObjects = [{a: 14, b: 1, c: 3.343}, "hello", {d:1}]; //throws error
    console.log(objectStats(arrOfObjects));
} catch (e) {
    console.log(e);
}

try {
    let arrayOfObjects1 = [ { a: 12, b: 8, c: 15, d: 12, e: 10, f: 15 }, { x: 5, y: 10, z: 15 }, { p: -2, q: 0, r: 5, s: 3.5 }, ]; 
    let statsResult1 = objectStats(arrayOfObjects1);
    console.log(statsResult1);
    // Expected Result:{ mean: 8.346, median: 10, mode: 15, range: 17, minimum: -2, maximum: 15, count: 13, sum: 108.5 }
} catch (e) {
    console.log(e);
}

/* test case for nestedObjectsDiff */

try {
    let diff = nestedObjectsDiff({a: 1}, ); //throws error
    console.log(diff);
} catch (e) {
    console.log(e);
}

try {
    let obj1 = { x: { y: { z: 1 } } }; 
    let obj2 = { x: { y: { z: 1 } } }; 
    let diff = nestedObjectsDiff(obj1, obj2); //Expected output : {}
    console.log(diff);
} catch (e) {
    console.log(e);
}

/* test case for mergeAndSumValues */

try {
    let merge = mergeAndSumValues({a: 1, b: "hello"}, {a: 2}); //throws error
    console.log(merge);
} catch (e) {
    console.log(e);
}

try {
    let object1 = { a: 3, b: 7, c: "5" };
    let object2 = { b: 2, c: "8", d: "4" };
    let object3 = { a: 5, c: 3, e: 6 };
    let resultMergedAndSummed = mergeAndSumValues(object1, object2, object3);
    console.log(resultMergedAndSummed);
    // Expected Result: { a: 8, b: 9, c: 16, d: 4, e: 6 }
} catch (e) {
    console.log(e);
}

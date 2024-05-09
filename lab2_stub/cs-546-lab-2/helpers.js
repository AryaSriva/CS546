/* Todo: Implment any helper functions below 
    and then export them for use in your other files.
*/

let isPalindrome = (str) => {
    /*function to determine if a string is a palindrome*/
    str = str.trim();
    str = str.toLowerCase();
    let reverse = "";
    let alphaNumeric = "abcdefghijklmnopqrstuvwxyz1234567890";
    let temp = "";
    for (let i = 0; i < str.length; i++) {
        if (alphaNumeric.includes(str[i])) {
            temp += str[i];
        }
    }
    for (let i = temp.length - 1; i >= 0; i--) {
        reverse += temp[i];
    }
    return reverse === temp;
};

let isIsogram = (str) => {
    /*function to determine if a string is an isogram*/
    str = str.trim();
    str = str.toLowerCase();
    let letters = [];
    let alphaNumeric = "abcdefghijklmnopqrstuvwxyz1234567890";
    let temp = "";
    for (let i = 0; i < str.length; i++) {
        if (alphaNumeric.includes(str[i])) {
            temp += str[i];
        }
    }
    for (let i = 0; i < temp.length; i++) {
        if (!letters.includes(temp[i])) {
            letters.push(temp[i]);
        } else {
            return false;
        }
    }
    return true;
};

let LCS = (str1, str2, result) => {
    /* function to store all common substrings into given array*/
    for (let start = 0; start < str1.length; start++) {
        let end = start + 1;
        while (end <= str1.length && str2.includes(str1.slice(start, end))) {
            end++;
        }
        result.push(str1.slice(start, end - 1));
    }
};


let differenceHelper = (obj1, obj2, result) => {
    /* function to recursively find differences between the two objects and store them in result */
     for (let i in obj2) {
        if (!(i in obj1)) {
            result[i] = obj2[i];
        } else {
            if (Array.isArray(obj2[i])) {
                if (Array.isArray(obj1[i])) {
                    if (obj1[i].length == obj2[i].length) {
                        for (let j = 0; j < obj1[i].length; j++) {
                            if (obj1[i][j] != obj2[i][j]) {
                                result[i] = obj2[i];
                                break;
                            }
                        }
                    } else {
                        result[i] = obj2[i];
                    }
                }
            } else if (typeof obj2[i] === "object") {
                if (typeof obj1[i] === "object") {
                    result[i] = {};
                    differenceHelper(obj1[i], obj2[i], result[i]);
                } 
            } else if (obj2[i] !== obj1[i]) {
                result[i] = obj2[i];
            }
        }
    }
    for (let i in obj1) {
        if (!(i in obj2)) {
            result[i] = undefined;
        }
    }
    return;
};

let differenceCleanUp = (obj) => {
    /* function to recursively remove empty nested objects */
    for (let i in obj) {
        if (typeof obj[i] === "object") {
            if (Object.keys(obj[i]).length === 0) {
                delete obj[i];
            } else {
                differenceCleanUp(obj[i]);
            }
        }
    }
};

export {isIsogram, isPalindrome, differenceHelper, LCS, differenceCleanUp};
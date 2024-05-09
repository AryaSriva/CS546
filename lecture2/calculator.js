const checkIsProperNumber = (val, variableName)=> {
    if (typeof val !== 'number' || isNaN(val)) {
        throw `${variableName || 'Provided variable'} is not a number`;
    }
}
export const addTwoNumbers = (num1, num2)=> {
    checkIsProperNumber(num1, "First Input Param");
    checkIsProperNumber(num2, "Second Input Param");
    return num1 + num2;
};
export const subtractTwoNumbers = (num1, num2)=> {
    checkIsProperNumber(num1, "First Input Param");
    checkIsProperNumber(num2, "Second Input Param");
    return num1 - num2;
};
export const multiplyTwoNumbers = (num1, num2)=> {
    checkIsProperNumber(num1, "First Input Param");
    checkIsProperNumber(num2, "Second Input Param");
    return num1*num2;
};
export const divideTwoNumbers = (num1, num2)=> {
    checkIsProperNumber(num1, "First Input Param");
    checkIsProperNumber(num2, "Second Input Param");
    if (num2 == 0) throw 'Error: Division by Zero';
    return num1/num2;
};


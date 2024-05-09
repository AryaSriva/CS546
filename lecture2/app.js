import { divideTwoNumbers, addTwoNumbers, subtractTwoNumbers, multiplyTwoNumbers } from "./calculator.js";

try {
    let result = divideTwoNumbers(NaN, NaN);
    console.log(result);
} catch(e) {
    console.log(e);
}

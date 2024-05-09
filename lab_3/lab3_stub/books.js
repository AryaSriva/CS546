//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Books data link: https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json

import{getBooks} from "./helpers.js";

const getBookName = async (id, arr) => {
    const data = await getBooks();
    for (let i = 0; i < data.length; i++) {
        if (data[i].authorId === id) {
            arr.push(data[i].title);
        }
    }
};

const getBookById = async (id) => {
    if (typeof id !== "string") {
        throw `${id} is not a string`;
    } 
    if (id.trim().length === 0) {
        throw `${id} cannot be an empty string`;
    }
    const data = await getBooks();
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
            return data[i];
        }
    }
    throw `book not found`;
};

const booksByPageCount = async (min, max) => {
    if (typeof min !== "number" || isNaN(min)) {
        throw `${min} is not a number`;
    } 
    if (typeof max !== "number" || isNaN(max)) {
        throw `${max} is not a number`;
    }
    if (min <= 0 || !Number.isInteger(min)) {
        throw `${min} is not a positive whole number`;
    }
    if (max <= 0 || !Number.isInteger(max)) {
        throw `${max} is not a positive whole number greater than 0`;
    } 
    if (max <= min) {
        throw `max page count must be greater than min page count`;
    }
    const data = await getBooks();
    let result = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].pageCount >= min && data[i].pageCount <= max) {
            result.push(data[i].id);
        }
    }
    return result;
};

const sameYear = async (year) => {
    if (typeof year !== "number" || year < 0 || !Number.isInteger(year)) {
        throw `${year} is not a whole positive number`;
    } 
    if (year > 2024 || year < 1452) {
        throw `${year} is not a valid year`;
    }
    let result = [];
    const data = await getBooks();
    for (let i = 0; i < data.length; i++) {
        let date = new Date(data[i].publicationDate);
        if (date.getFullYear() === year) {
            result.push(data[i]);
        }
    }
    return result;

};

const minMaxPrice = async () => {
    let min = Number.MAX_VALUE;
    let max = Number.MIN_VALUE;
    let result = {};
    let cheapest = [];
    let mostExpensive = [];
    const data = await getBooks();
    for (let i = 0; i < data.length; i++) {
        if (data[i].price > max) {
            max = data[i].price;
        }
        if (data[i].price < min) {
            min = data[i].price;
        }
    }    
    for (let i = 0; i < data.length; i++) {
        if (data[i].price === max) {
            mostExpensive.push(data[i].id);
        } 
        if (data[i].price === min) {
            cheapest.push(data[i].id);
        }
    }
    if (mostExpensive.length === 1) {
        result["mostExpensive"] = mostExpensive[0];
    } else {
        result["mostExpensive"] = mostExpensive;
    }
    if (cheapest.length === 1) {
        result["cheapest"] = cheapest[0];
    } else {
        result["cheapest"] = cheapest;
    }
    return result;
};

const searchBooksByPublisher = async (publisher) => {
    if (typeof publisher !== "string") {
        throw `${publisher} is not a string`;
    }
    const data = await getBooks();
    let found = false;
    for (let i = 0; i < data.length; i++) {
        if (data[i].publisher === publisher) {
            found = true;
        }
    }
    if (!found) {
        throw `${publisher} cannot be found`;
    }
    let result = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].publisher === publisher) {
            result.push(data[i].id);
        }
    }
    return result;
};

export {getBookById, booksByPageCount, sameYear, minMaxPrice, searchBooksByPublisher, getBookName};
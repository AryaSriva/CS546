//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Authors data link: https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json

//you must use axios to get the data
import {compareLastNames, getAuthors} from "./helpers.js";
import {getBookName} from "./books.js";

const getAuthorById = async (id) => {
    if (typeof id !== "string") {
        throw `${id} is not a string`;
    } 
    if (id.trim().length === 0) {
        throw `${id} cannot be an empty string`;
    }
    const data = await getAuthors();
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === id.trim()) {
            return data[i];
        }
    }
    throw `author not found`;
};

const searchAuthorsByAge = async (age) => {
    if (typeof age !== "number" || isNaN(age)) {
        throw `${age} is not a number`;
    }
    if (!Number.isInteger(age) || age < 1 || age > 100) {
        throw `${age} is not a whole number between 1-100`;
    }
    let result = []
    const data = await getAuthors();
    for (let i = 0; i < data.length; i++) {
        let date_of_birth = new Date(data[i].date_of_birth);
        let current_day = new Date(2024, 2, 14);
        let difference = Math.floor((current_day - date_of_birth)/31536000000);
        if (difference >= age) {
            result.push(data[i].first_name + ' ' + data[i].last_name);
        }
    }
    return result;
};

const getBooksByState = async (state) => {
    if (typeof state !== "string") {
        throw `${state} is not a string`;
    } else if (state.length !== 2) {
        throw `${state} is not a valid state abbreviation`;
    }
    const abbreviations = "ALAKAZARCACOCTDEFLGAHIIDILINIAKSKYLAMEMDMAMIMNMSMOMTNENVNHNJNMNYNCNDOHOKORPARISCSDTNTXUTVTVAWAWVWIWY";
    if (!abbreviations.includes(state.trim().toUpperCase())) {
        throw `${state} is not a valid state abbreviation`;
    }
    const data = await getAuthors();
    let result = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].HometownState === state.trim()) {
            await getBookName(data[i].id, result);
        }
    }
    return result;
};

const searchAuthorsByHometown = async (town, state) => {
    if (typeof town !== "string") {
        throw `${town} is not a valid string`;
    } 
    if (typeof state !== "string") {
        throw `${state} is not a valid string`;
    }
    if (town.trim().length === 0) {
        throw `${town} is not a valid town`;
    }
    if (state.trim().length !== 2) {
        throw `${state} is not a valid state abbreviation`;
    }
    const abbreviations = "ALAKAZARCACOCTDEFLGAHIIDILINIAKSKYLAMEMDMAMIMNMSMOMTNENVNHNJNMNYNCNDOHOKORPARISCSDTNTXUTVTVAWAWVWIWY";
    if (!abbreviations.includes(state.trim().toUpperCase())) {
        throw `${state} is not a valid state abbreviation`;
    }
    let result = [];
    const data = await getAuthors();
    for (let i = 0; i < data.length; i++) {
        if (data[i].HometownState === state.trim()) {
            if (data[i].HometownCity === town.trim()) {
                result.push(data[i].first_name + " " + data[i].last_name);
            }
        }
    }
    result.sort(compareLastNames);
    return result;
};

const getAuthorBooks = async (authorid) => {
    if (typeof authorid !== "string") {
        throw `${authorid} is not a string`;
    }
    let found = false;
    const data = await getAuthors();
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === authorid) {
            found = true;
        }
    }
    if (!found) {
        throw `${authorid} not found`;
    }
    let result = [];
    await getBookName(authorid, result);
    return result;
};

export {getAuthorById, searchAuthorsByAge, getBooksByState, searchAuthorsByHometown, getAuthorBooks};
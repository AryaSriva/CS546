/*Here, you can export the data functions
to get the comapnies, people, getCompanyByID, getPersonById.  You will import these functions into your routing files and call the relevant function depending on the route. 
*/

import axios from "axios";
import {checkId} from "../helpers.js";

const getCompanies = async () => {
    const companies = await axios.get('https://gist.githubusercontent.com/graffixnyc/90b56a2abf10cfd88b2310b4a0ae3381/raw/f43962e103672e15f8ec2d5e19106e9d134e33c6/companies.json');
    return companies.data;
};

const getPeople = async () => {
    const people = await axios.get('https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json');
    return people.data;
};

const getCompanyById = async (id) => {
    id = checkId(id);
    const companies = await getCompanies();
    for (let i = 0; i < companies.length; i++) {
        if (companies[i].id === id) {
            return companies[i];
        }
    }
    throw 'Error: Company Not Found!';
};

const getPersonById = async (id) => {
    id = checkId(id);
    const people = await getPeople();
    for (let i = 0; i < people.length; i++) {
        if (people[i].id === id) {
            return people[i];
        }
    }
    throw `Error: Person Not Found!`;
};

export {getCompanies, getPeople, getCompanyById, getPersonById};
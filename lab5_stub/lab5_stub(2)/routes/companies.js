//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

//You can import your getComapnies() function in the /data/data.js file 3 to return the list of comapnies and call it in the /companies route.  You can also import your getComapny(id) function and call it in the :/id route.
import {Router} from 'express';
import { getCompanies,getCompanyById } from '../data/data.js';

const router = Router();

router
.route('/')
.get(async (req, res) => {
    try {
        const companyList = await getCompanies();
        return res.json(companyList);
    } catch (e) {
        return res.status(500).send(e);
    }
});
// Implement GET Request Method and send a JSON response See lecture code!

router
.route('/:id')
.get(async (req, res) => {
    // try {
    //     req.params.id = checkId(req.params.id);
    // } catch (e) {
    //     return res.status(400).json({error: e});
    // }
    try {
        const company = await getCompanyById(req.params.id);
        return res.json(company);
    } catch (e) {
        return res.status(404).json(e);
    }
});
//Implement GET Request Method and send a JSON response See lecture code!

export default router;

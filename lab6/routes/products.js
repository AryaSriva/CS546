// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!

import {Router} from 'express';
import {productData} from '../data/index.js';

const router = Router();

router
  .route('/')
  .get(async (req, res) => {
    //code here for GET
    try {
      const productList = await productData.getAll();
      return res.json(productList);
    } catch (e) {
      return res.status(500).send(e);
    }
  })
  .post(async (req, res) => {
    //code here for POST
    if (!req.body || Object.keys(req.body).length == 0) {
      return res.status(400).json({error: `There are no fields in the request body`});
    }
    try {
      const product = await productData.create(req.body.productName, req.body.productDescription,
        req.body.modelNumber, req.body.price, req.body.manufacturer, req.body.manufacturerWebsite,
        req.body.keywords, req.body.categories, req.body.dateReleased, req.body.discontinued);
      return res.status(200).json(product);
    } catch (e) {
      return res.status(400).send(e);
    }
  });

router
  .route('/:productId')
  .get(async (req, res) => {
    //code here for GET
    try {
      const product = await productData.get(req.params.productId);
      return res.status(200).json(product);
    } catch (e) {
      if (e === `couldn't find a product with that id`) {
        return res.status(404).send(e);
      } else {
        return res.status(400).send(e);
      }
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    try {
      await productData.remove(req.params.productId);
      return res.status(200).json({id: req.params.productId, deleted: true});
    } catch(e) {
      if (e === `could not remove product with id: ${req.params.productId}`) {
        return res.status(404).send(e);
      } else {
        return res.status(400).send(e);
      }
    }
  })
  .put(async (req, res) => {
    //code here for PUT
    if (!req.body || Object.keys(req.body).length == 0) {
      return res.status(400).json({error: `There are no fields in the request body`});
    }
    try {
      const product = await productData.update(req.params.productId, req.body.productName, req.body.productDescription,
        req.body.modelNumber, req.body.price, req.body.manufacturer, req.body.manufacturerWebsite, req.body.keywords,
        req.body.categories, req.body.dateReleased, req.body.discontinued);
      return res.status(200).json(product);
    } catch (e) {
      if (e === `could not update product`) {
        return res.status(404).send(e);
      } else {
        return res.status(400).send(e);
      }
    }
  });
export default router;
// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import {Router} from 'express';
import {reviewData, productData} from '../data/index.js';

const router = Router();

router
  .route('/:productId')
  .get(async (req, res) => {
    //code here for GET
    try {
      const reviewList = await reviewData.getAllReviews(req.params.productId); 
      if (reviewList.length == 0) {
        return res.status(404).send("No reviews for given product Id")
      }
      return res.status(200).json(reviewList);
    } catch (e) {
      if (e === `couldn't find a product with that id`) {
        return res.status(404).send(e);
      } else {
        return res.status(400).send(e);
      }
    }
  })
  .post(async (req, res) => {
    //code here for POST
    try {
      await reviewData.createReview(req.params.productId, req.body.title, req.body.reviewerName, req.body.review, req.body.rating);
      const product = await productData.get(req.params.productId);
      return res.status(200).json(product);
    } catch (e) {
      if (e === `couldn't find a product with that id`) {
        return res.status(404).send(e);
      } else {
        return res.status(200).send(e);
      }
    }
  });

router
  .route('/review/:reviewId')
  .get(async (req, res) => {
    //code here for GET
    try {
      const review = await reviewData.getReview(req.params.reviewId);
      return res.status(200).json(review);
    } catch (e) {
      if (e === `review with given id could not be found`) {
        return res.status(404).send(e);
      } else {
        return res.status(400).send(e);
      }
    }
  })
  .patch(async (req, res) => {
    //code for PATCH
    if (!req.body || Object.keys(req.body).length == 0) {
      return res.status(400).json({error: `There are no fields in the request body`});
    }
    try {
      const product = await reviewData.updateReview(req.params.reviewId, req.body);
      return res.status(200).json(product);
    } catch (e) {
      if (e === `review with given id could not be found`) {
        return res.status(404).send(e);
      } else {
        return res.status(400).send(e);
      }
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    try {
      const product = await reviewData.removeReview(req.params.reviewId);
      return res.status(200).json(product);
    } catch (e) {
      if (e === `review with given id could not be found`) {
        return res.status(404).send(e);
      } else {
        return res.status(400).send(e);
      }
    }
  });
export default router;

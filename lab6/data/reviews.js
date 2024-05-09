// This data file should export all functions using the ES6 standard as shown in the lecture code
import {products} from "../config/mongoCollections.js";
import {get} from "./products.js";
import { ObjectId } from "mongodb";
const createReview = async (
  productId,
  title,
  reviewerName,
  review,
  rating
) => {
  if (!productId) {
    throw `provide a valid product Id`;
  }
  if (typeof productId != "string" || productId.trim() == "") {
    throw `${productId} is not a valid non-empty string`;
  }
  productId = productId.trim();
  if (!ObjectId.isValid(productId)) {
    throw `${productId} is not a valid objectId`;
  }
  if (!title) {
    throw `provide a valid title`;
  }
  if (typeof title != "string" || title.trim() == "") {
    throw `${title} is not a valid non-empty string`;
  }
  title = title.trim();
  if (!reviewerName) {
    throw `provide a valid title`;
  }
  if (typeof reviewerName != "string" || reviewerName.trim() == "") {
    throw `${reviewerName} is not a valid non-empty string`;
  }
  reviewerName = reviewerName.trim();
  if (!review) {
    throw `provide a valid title`;
  }
  if (typeof review != "string" || review.trim() == "") {
    throw `${review} is not a valid non-empty string`;
  }
  if (typeof rating != "number" || isNaN(rating)) {
    throw `${rating} is not a number`;
  }
  if (rating < 1 || rating > 5) {
    throw `${rating} must be in the range 1-5`;
  }
  if (rating.toString().split(".").length == 2 && rating.toString().split(".")[1].length > 1) {
    throw `${rating} can only have 1 decimal place`;
  }
  review = review.trim();
  const date = new Date();
  let dateFormatted = ""
  if (date.getMonth() + 1 < 10) {
    dateFormatted += '0' 
    dateFormatted += (date.getMonth() + 1).toString();
  } else {
    dateFormatted += (date.getMonth() + 1).toString();
  }
  if (date.getDate() < 10) {
    dateFormatted += '/0' 
    dateFormatted += date.getDate();
  } else {
    dateFormatted += '/';
    dateFormatted += date.getDate();
  }
  dateFormatted += '/';
  dateFormatted += date.getFullYear();
  const newReview = {_id: new ObjectId(), title: title, reviewerName: reviewerName, review: review, rating:rating, reviewDate: dateFormatted};
  const product = await get(productId);
  product.reviews.push(newReview);
  const length = product.reviews.length;
  let sumRatings = 0;
  product.reviews.forEach(element => {
    sumRatings += element.rating;
  });
  if (length !== 0) {
    product.averageRating = sumRatings/length;
  } else {
    product.averageRating = 0;
  }
  const productCollection = await products();
  await productCollection.findOneAndUpdate(
    {_id: new ObjectId(productId)},
    {$set: {reviews: product.reviews, averageRating: product.averageRating}},
    {returnDocument: 'after'}
  );
  return newReview;
};

const getAllReviews = async (productId) => {
  if (!productId) {
    throw `please provide a product id`;
  }
  if (typeof productId != "string" || productId.trim() === "") {
    throw `${productId} is not a valid non-empty string`;
  }
  productId = productId.trim();
  if (!ObjectId.isValid(productId)) {
    throw `${productId} is not a valid object id`;
  }
  const productCollection = await products();
  const product = await productCollection.findOne({_id: new ObjectId(productId)});
  if (product === null) {
    throw `couldn't find a product with that id`;
  }
  return product.reviews;
};

const getReview = async (reviewId) => {
  if (!reviewId || typeof reviewId != "string" || !ObjectId.isValid(reviewId) || reviewId.trim() == "") {
    throw `${reviewId} is not valid`;
  }
  reviewId = reviewId.trim();
  const productCollection = await products();
  const allProducts = await productCollection
  .find({})
  .toArray();
  for (let i of allProducts) {
    for (let j of i.reviews) {
      if (j._id == reviewId) {
        return j;
      }
    }
  }
  throw `review with given id could not be found`;
};

const updateReview = async (reviewId, updateObject) => {
  if (!reviewId || typeof reviewId != "string" || reviewId.trim() === "" || !ObjectId.isValid(reviewId)) {
    throw `${reviewId} is not a valid non empty string that is a valid Object id`;
  }
  reviewId = reviewId.trim();
  const reviewToUpdate = await getReview(reviewId);
  let numUpdates = 0;
  // if (reviewId in updateObject) {
  //   if (typeof updateObject.reviewId != "string" || updateObject.reviewId.trim() === "") {
  //     throw `reviewId in ${updateObject} is not a valid non empty string`;
  //   } else {
  //     reviewToUpdate.reviewId = updateObject.reviewId;
  //     numUpdates++;
  //   }
  // }
  if ("title" in updateObject) {
    if (typeof updateObject.title != "string" || updateObject.title.trim() === "") {
      throw `title in ${updateObject} is not a valid non empty string`;
    } else {
      reviewToUpdate.title = updateObject.title;
      numUpdates++;
    }
  } 
  if ("reviewerName" in updateObject) { 
    if (typeof updateObject.reviewerName != "string" || updateObject.reviewerName.trim() === "") {
      throw `reviewerName in ${updateObject} is not a valid non empty string`;
    } else {
      reviewToUpdate.reviewerName = updateObject.reviewerName;
      numUpdates++;
    }
  }
  if ("review" in updateObject) {
    if (typeof updateObject.review != "string" || updateObject.review.trim() === "") {
      throw `review in ${updateObject} is not a valid non empty string`;
    } else {
      reviewToUpdate.review = updateObject.review;
      numUpdates++;
    }
  }
  if ("rating" in updateObject) {
    if (updateObject.rating < 1 || updateObject.rating > 5 || 
    (updateObject.rating.toString().split(".").length == 2 && updateObject.rating.toString().split(".")[1].length > 1)) {
      throw `rating in ${updateObject} is not a valid value`;
    } else {
      reviewToUpdate.rating = updateObject.rating;
      numUpdates++;
    }
  }
  if (numUpdates === 0) {
    throw `${updateObject} must contain at least one field to update`;
  }
  const date = new Date();
  let dateFormatted = ""
  if (date.getMonth() + 1 < 10) {
    dateFormatted += '0' 
    dateFormatted += (date.getMonth() + 1).toString();
  } else {
    dateFormatted += (date.getMonth() + 1).toString();
  }
  if (date.getDate() < 10) {
    dateFormatted += '/0' 
    dateFormatted += date.getDate();
  } else {
    dateFormatted += '/';
    dateFormatted += date.getDate();
  }
  dateFormatted += '/';
  dateFormatted += date.getFullYear();
  reviewToUpdate.reviewDate = dateFormatted;
  const productCollection = await products()
  const productList = await productCollection.find({}).toArray(); 
  for (let i of productList) {
    const reviewList = await getAllReviews(i._id.toString());
    for (let j = 0; j < reviewList.length; j++) {
      if (reviewList[j]._id.toString() === reviewId) {
        reviewList.splice(j, 1, reviewToUpdate);
        let sumRatings = 0;
        reviewList.forEach(review => {
          sumRatings += review.rating;
        });
        if (reviewList.length !== 0) {
          sumRatings = sumRatings/reviewList.length;
        } else {
          sumRatings = 0;
        }
        const product = await productCollection.findOneAndUpdate(
          {_id: new ObjectId(i._id)},
          {$set: {reviews:reviewList, averageRating:sumRatings}},
          {returnDocument: 'after'}
          );
        return product;
      }
    }
  }
  throw `review with given id could not be found`;
};

const removeReview = async (reviewId) => {
  if (!reviewId || typeof reviewId != "string" || !ObjectId.isValid(reviewId) || reviewId.trim() === "") {
    throw `${reviewId} is not valid`;
  }
  reviewId = reviewId.trim();
  const productCollection = await products();
  const productList = await productCollection
  .find({})
  .toArray();
  for (let i of productList) {
    let id = i._id;
    let currLength = i.reviews.length;
    const updateTheProduct = await productCollection.findOneAndUpdate(
      {_id: id},
      {$pull: {reviews: {_id: new ObjectId(reviewId)}}},
      {returnDocument: 'after'}
    );
    if (currLength != updateTheProduct.reviews.length) {
      const length = updateTheProduct.reviews.length;
      let sumRatings = 0;
      updateTheProduct.reviews.forEach(element => {
        sumRatings += element.rating;
      });
      if (length !== 0) {
        updateTheProduct.averageRating = sumRatings/length;
      } else {
        updateTheProduct.averageRating = 0;
      }
      const product = await productCollection.findOneAndUpdate(
        {_id: id},
        {$set: {averageRating: updateTheProduct.averageRating}},
        {returnDocument: 'after'}
      );
      if (product != null) {
        return product;
      }
    }
  }
  throw `no review with given id could be found`;
};

export {createReview, getAllReviews, getReview, updateReview, removeReview};
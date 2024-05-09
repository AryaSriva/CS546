// TODO: Export and implement the following functions in ES6 format
import {products} from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
const create = async (
  productName,
  productDescription,
  modelNumber,
  price,
  manufacturer,
  manufacturerWebsite,
  keywords,
  categories,
  dateReleased,
  discontinued
) => {
  if (typeof productName !== "string" || productName.trim() === "") {
    throw `${productName} is not a non-empty string`;
  } 
  productName = productName.trim();
  if (typeof productDescription !== "string" || productDescription.trim() === "") {
    throw `${productDescription} is not a non-empty string`;
  } 
  productDescription = productDescription.trim();
  if (typeof modelNumber !== "string" || modelNumber.trim() === "") {
    throw `${modelNumber} is not a non-empty string`;
  }
  modelNumber = modelNumber.trim();
  if (typeof price !== "number" || isNaN(price) || price < 0 || (price.toString().split(".").length == 2 && price.toString().split(".")[1].length > 2)) {
    throw `${price} is not a valid whole number or decimal number with only 2 decimal places`;
  }
  if (typeof manufacturer !== "string" || manufacturer.trim() === "") {
    throw `${manufacturer}  is not a non-empty string`;
  }
  manufacturer = manufacturer.trim();
  if (typeof manufacturerWebsite !== "string" || manufacturerWebsite.trim() === "") {
    throw `${manufacturerWebsite} is not a non-empty string`;
  }
  manufacturerWebsite = manufacturerWebsite.trim();
  if (typeof discontinued !== "boolean") {
    throw `${keywords} is not a boolean`;
  }
  if (!Array.isArray(categories) || categories.length < 1) {
    throw `${categories} is not a non-empty array`;
  } 
  if (typeof dateReleased !== "string" || dateReleased.trim() === "") {
    throw `${dateReleased} is not a non-empty string`;
  }
  dateReleased = dateReleased.trim();
  if (!Array.isArray(keywords) || keywords.length < 1) {
    throw `${keywords} is not a non-empty array`;
  }
  for (let i = 0; i < categories.length; i++) {
    if (typeof categories[i] !== "string" || categories[i].trim() === "") {
      throw `${categories} does not contain all valid strings`;
    }
  }
  for (let i = 0; i < keywords.length; i++) {
    if (typeof keywords[i] !== "string" || keywords[i].trim() === "") {
      throw `${keywords} does not contain all valid strings`;
    }
  }
  if (manufacturerWebsite.slice(0, 11) !== "http://www.") {
    throw `${manufacturerWebsite} is not a valid website`;
  }
  if (!manufacturerWebsite.endsWith(".com")) {
    throw `${manufacturerWebsite} is not a valid website`;
  }
  if (manufacturerWebsite.split("https://www.")[0].split(".com")[0].length < 5) {
    throw `${manufacturerWebsite} is not a valid website`;
  }
  let date = new Date(dateReleased);
  if (isNaN(date.getTime())) {
    throw `${dateReleased} is not a valid date`;
  }
  let dateSplitUp = dateReleased.split("/");
  if (dateSplitUp[0].length !=2 || dateSplitUp[1].length != 2 || dateSplitUp[2].length != 4) {
    throw `${dateReleased} is not in mm/dd/yyyy format`;
  }
  let daysAndMonths = {1: 31, 2: 29, 3: 31, 4:30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10:31, 11: 30, 12: 31};
  if (Number.parseInt(dateSplitUp[0]) < 1 || Number.parseInt(dateSplitUp[0]) > 12) {
    throw `${dateReleased} is not a valid date`;
  }
  if (Number.parseInt((dateSplitUp[1])) < 1 || Number.parseInt(dateSplitUp[1]) > daysAndMonths[Number.parseInt(dateSplitUp[0])]) {
    throw `${dateReleased} is not a valid date`;
  }
  if (Number.parseInt(dateSplitUp[2]) < 1000) {
    throw `${dateReleased} is not a valid date`;
  }
  let currentDate = new Date("02/21/2024");
  if (date.getTime() > currentDate.getTime()) {
    throw `${dateReleased} is not a valid date`;
  }
  let newProduct = {productName: productName, productDescription: productDescription, modelNumber: modelNumber, 
  price: price, manufacturer: manufacturer, manufacturerWebsite: manufacturerWebsite, keywords: keywords, 
  categories: categories, dateReleased: dateReleased, discontinued: discontinued};
  const productCollection = await products();
  const insertInfo = await productCollection.insertOne(newProduct);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw `product could not be inserted`;
  }
  const newId = insertInfo.insertedId.toString();
  const product = await get(newId);
  return product;
};

const getAll = async () => {
  const productCollection = await products();
  let list = await productCollection.find({}).toArray();
  if (!list) throw `couldn't find product list`;
  list = list.map((element) => {
    element._id = element._id.toString();
    return element;
  });
  return list;
};

const get = async (id) => {
  if (typeof id !== "string" || id.trim() === "") {
    throw `${id} is not a valid non-empty string`;
  }
  id = id.trim();
  if (!ObjectId.isValid(id)) {
    throw `${id} is not a valid id`;
  }
  const productCollection = await products();
  const product = await productCollection.findOne({_id: new ObjectId(id)});
  if (product === null) {
    throw `couldn't find a product with that id`;
  }
  product._id = product._id.toString();
  return product;
};

const remove = async (id) => {
  if (typeof id !== 'string' || id.trim() === "") {
    throw `${id} is not a valid non-empty string`;
  }
  id = id.trim();
  const productCollection = await products();
  if (!ObjectId.isValid(id)) {
    throw `${id} is not a valid id`;
  }
  const deletionInfo = await productCollection.findOneAndDelete({
    _id: new ObjectId(id)
  });
  if (!deletionInfo) {
    throw `could not remove product with id: ${id}`;
  }
  return `${deletionInfo.productName} has been successfully deleted!`;
};

const rename = async (id, newProductName) => {
  if (typeof id !== "string" || id.trim() === "") {
    throw `${id} is not a  non-empty string`;
  }
  if (!ObjectId.isValid(id)) {
    throw `${id} is not a valid id`;
  }
  id = id.trim();
  if (typeof newProductName !== "string" || newProductName.trim() === "") {
    throw `${newProductName} is not a non-empty string`;
  }
  newProductName = newProductName.trim();
  const productCollection = await products();
  let product = await get(id);
  if (product.productName === newProductName) {
    throw `new product name is the same as the old one`;
  }
  // product.productName = newProductName;
  const updatedInfo = await productCollection.findOneAndUpdate(
    {_id: new ObjectId(id)},
    {$set: {productName: newProductName}},
    {returnDocument: 'after'}
  );
  if (!updatedInfo) {
    throw `could not update product`;
  }
  updatedInfo._id = updatedInfo._id.toString();
  return updatedInfo;
};

export {create, get, getAll, remove, rename};
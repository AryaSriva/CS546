import { dbConnection, closeConnection } from "../config/mongoConnection.js";
import { productData } from "../data/index.js";
import { reviewData } from "../data/index.js";
const db = await dbConnection();
await db.dropDatabase();

const productName = "83 inch LG C3 OLED TV";
const productDescription = "television";
const modelNumber = "OLED83C3PUA";    
const price = 4757.29; 
const manufacturer = "LG";
const manufacturerWebsite = "http://www.lgelectronics.com";
const keywords = ["TV", "Smart TV", "OLED", "LG", "Big Screen", "83 Inch"];
const categories = ["Electronics", "Television & Video", "Televisions",  "OLED TVs"];
const dateReleased = "02/27/2023";
const discontinued = false;
await productData.create(productName, productDescription, modelNumber, price, manufacturer,
    manufacturerWebsite, keywords, categories, dateReleased, discontinued);

const productName1 = "Iphone 15";
const productDescription1 = "phone";
const modelNumber1 = "phone";    
const price1 = 1400; 
const manufacturer1 = "apple";
const manufacturerWebsite1 = "http://www.apple.com";
const keywords1 = ["apple"];
const categories1 = ["phone"];
const dateReleased1 = "05/27/2023";
const discontinued1 = false;
await productData.create(productName1, productDescription1, modelNumber1, price1, manufacturer1,
    manufacturerWebsite1, keywords1, categories1, dateReleased1, discontinued1);
    
await closeConnection();
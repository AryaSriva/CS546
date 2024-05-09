/*

Create a product of your choice.
Log the newly created product. (Just that product, not all products)
Create another product of your choice.
Query all products, and log them all
Create the 3rd product of your choice.
Log the newly created 3rd product. (Just that product, not all product)
Rename the first product
Log the first product with the updated name. 
Remove the second product you created.
Query all products, and log them all
Try to create a product with bad input parameters to make sure it throws errors.
Try to remove a product that does not exist to make sure it throws errors.
Try to rename a product that does not exist to make sure it throws errors.
Try to rename a product passing in invalid data for the newProductName parameter to make sure it throws errors.
Try getting a product by ID that does not exist to make sure it throws errors.
*/
import { dbConnection, closeConnection } from "./config/mongoConnection.js";
import * as products from "./data/products.js";
const db = await dbConnection();
await db.dropDatabase();
const lgTV = await products.create("83 inch LG C3 OLED TV", "The advanced LG OLED evo C-Series is better than ever. The LG OLED evo C3 is powered by the next-gen a9 AI Processor Gen6—exclusively made for LG OLED—for ultra-realistic picture and sound. And the Brightness Booster improves brightness so you get luminous picture and high contrast, even in well-lit rooms.* AI-assisted deep learning analyzes what you're watching to choose the best picture and sound setting for your content. The LG OLED evo C3 not only performs great, but looks great as well. With an almost invisible bezel, it will blend into the background for a seamless look. When you're finished watching, display paintings, photos and other content to blend the LG OLED evo C3 into your space even more. But that's not all. Experience less searching and more streaming, thanks to the next generation of AI technology from LG webOS 23. Every LG OLED comes loaded with Dolby Vision for extraordinary color, contrast and brightness, plus Dolby Atmos** for wrap-around sound. And LG's FILMMAKER MODE allows you to see films just as the director intended. Packed with gaming features, the LG OLED evo C-Series comes with everything you need to win like a 0.1ms response time, native 120Hz refresh rate and four HDMI 2.1 inputs. *Based on LG internal testing: 55/65/77/83 LG OLED evo C3 models are brighter than non-OLED evo B3 models and excludes the 42 and 48 LG OLED evo C3. **Dolby, Dolby Atmos and the double-D symbol are registered trademarks of Dolby Laboratories.",
 "OLED83C3PUA", 4757.29, "LG" , "http://www.lgelectronics.com",  ["TV", "Smart TV", "OLED", "LG", "Big Screen", "83 Inch"],["Electronics", "Television & Video", "Televisions",  "OLED TVs"],
 "02/27/2023", false );
 console.log(lgTV);

const iphone = await products.create("Apple iPhone 14 Pro 1TB - Space Grey", "The all new iPhone 14 pro has many upgraded features................", "MQ2L3LL/A", 1499, "Apple",
"http://www.apple.com",["Cell Phone", "Phone", "iPhone", "Apple", "Smartphone", "iPhone 14", "pro"],["Electronics", "Cell Phones and Accessories", "Cell Phones"],"09/16/2022", false);
const list = await products.getAll();
console.log(list);

const toaster = await products.create("Toaster", "Toaster", "00000001", 100.57, "ToasterIncorporated", "http://www.toaster.com", ["toast", "crispy", "burnt"],
["Electronics", "Appliances"], "10/01/1995", false);
console.log(toaster);
const newTv = await products.rename(lgTV._id.toString(), "Television");
console.log(newTv);
console.log(await products.remove(iphone._id.toString()));
const newList = await products.getAll();
console.log(newList);
try {
    const badProduct = await products.create("t", "t", "1", 104.00002);
} catch (e) {
    console.log(e);
}
try {
    const badProduct = await products.remove("this id does not exist");
} catch (e) {
    console.log(e);
}
try {
    const badProduct = await products.rename("this id does not exist", "toaster");
} catch (e) {
    console.log(e);
}
try {
    const badProduct = await products.rename(toaster._id.toString(), "Toaster");
} catch (e) {
    console.log(e);
}
try {
    const badProduct = await products.get("this id does not exist");
} catch (e) {
    console.log(e);
}
await closeConnection();
/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

Note: 
1. You will need that calls your functions like the example below. 
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder.

import * as authors from "./authors.js");

    try{
        const authorData = await authors.getAuthors();
        console.log (authorData);
    }catch(e){
        console.log (e);
    }
*/
import * as authors from "./authors.js";
import * as books from "./books.js";

try {
    const a = await authors.getAuthorById("1871e6d7-551f-41cb-9a07-08240b86c95c"); 
    console.log(a);
    // Returns:
    // {
    // id: '1871e6d7-551f-41cb-9a07-08240b86c95c',
    // first_name: 'Derward',
    // last_name: 'Ticic',
    // date_of_birth: '6/3/1932',
    // HometownCity: 'Garden Grove',
    // HometownState: 'CA',
    // books: ['4efdb199-5a0f-4410-bded-ce07990c6aa4']
    // }
} catch (e) {
    console.log(e);
}

try {
    const a1 = await authors.getAuthorById(-1); // Throws Error 
    console.log(a1);
} catch(e) {
    console.log(e);
}
try {
    const a2 = await authors.getAuthorById(1001);  // Throws Error 
    console.log(a2);
} catch (e) {
    console.log(e);
}
try {
    const a3 = await authors.getAuthorById(); // Throws Error
    console.log(a3);
} catch (e) {
    console.log(e);
}
try {
    const a4 = await authors.getAuthorById('7989fa5e-5617-43f7-a931-46036f9dbcff');// Throws Author not found Error
    console.log(a4);
} catch (e) {
    console.log(e);
}

try {
    const authorSearch = await authors.searchAuthorsByAge(40); 
    console.log(authorSearch);
// Returns:["Mayer Staddart", "Madelaine Armatage", "Adorne Byrant"...] //Only the first three are shown
} catch (e) {
    console.log(e);
}

try {
    const authorSearch1 = await authors.searchAuthorsByAge(5000);
    console.log(authorSearch1); //Throws Error
} catch (e) {
    console.log(e);
}
try {
    const authorSearch2 = await authors.searchAuthorsByAge(" "); // Throws Error
    console.log(authorSearch2);
} catch (e) {
    console.log(e);
}
try {
    const authorSearch3 = await authors.searchAuthorsByAge("abc"); // Throws Error
    console.log(authorSearch3);
} catch (e) {
    console.log(e);
}
try {
    const authorSearch4 = await authors.searchAuthorsByAge(); // Throws Error 
    console.log(authorSearch4);
} catch (e) {
    console.log(e);
}

try {
    const state = await authors.getBooksByState("NJ");
    console.log(state);
} catch(e) {
    console.log(e);
}

try {
    const state = await authors.getBooksByState(123);
    console.log(state);
} catch(e) {
    console.log(e);
}
try {
    const state = await authors.getBooksByState(" ");
    console.log(state);
} catch(e) {
    console.log(e);
}
try {
    const state = await authors.getBooksByState("Patrick");
    console.log(state);
} catch(e) {
    console.log(e);
}
try {
    const state = await authors.getBooksByState();
    console.log(state);
} catch(e) {
    console.log(e);
}

try {
    const x = await authors.searchAuthorsByHometown("New York City", "NY");
    console.log(x);
} catch (e) {
    console.log(e);
}
try {
    const x = await authors.searchAuthorsByHometown(123, 456);
    console.log(x);
} catch (e) {
    console.log(e);
}
try {
    const x = await authors.searchAuthorsByHometown("","");
    console.log(x);
} catch (e) {
    console.log(e);
}
try {
    const x = await authors.searchAuthorsByHometown("Patrick", "Hill");
    console.log(x);
} catch (e) {
    console.log(e);
}
try {
    const x = await authors.searchAuthorsByHometown();
    console.log(x);
} catch (e) {
    console.log(e);
}
try {
    const x = await authors.getAuthorBooks("69b3f32f-5690-49d1-b9a6-9d2dd7d6e6cd");
    console.log(x);
} catch (e) {
    console.log(e);
}
try {
    const x = await authors.getAuthorBooks("2155574a-80b0-4389-8bb3-3240da52b770");
    console.log(x);
} catch (e) {
    console.log(e);
}
try {
    const x = await authors.getAuthorBooks("");
    console.log(x);
} catch (e) {
    console.log(e);
}
try {
    const x = await authors.getAuthorBooks(230);
    console.log(x);
} catch (e) {
    console.log(e);
}
try {
    const x = await authors.getAuthorBooks();
    console.log(x);
} catch (e) {
    console.log(e);
}
try {
    const x = await books.getBookById("99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e");
    console.log(x);
} catch (e) {
    console.log(e);
}
try {
    const x = await books.getBookById(-1);
    console.log(x);
} catch (e) {
    console.log(e);
}
try {
    const x = await books.getBookById(1001);
    console.log(x);
} catch (e) {
    console.log(e);
}
try {
    const x = await books.getBookById();
    console.log(x);
} catch (e) {
    console.log(e);
}
try {
    const x = await books.getBookById('7989fa5e-5617-43f7-a931-46036f9dbcff');
    console.log(x);
} catch (e) {
    console.log(e);
}
try {
    const x = await books.booksByPageCount(300, 500);
    console.log(x);
} catch (e) {
    console.log(e);
}
try {
    const x = await books.booksByPageCount(-1, 100);
    console.log(x);
} catch (e) {
    console.log(e);
}
try {
    const x = await books.booksByPageCount("ABC", "3");
    console.log(x);
} catch (e) {
    console.log(e);
}
try {
    const x = await books.booksByPageCount();
    console.log(x);
} catch (e) {
    console.log(e);
}
try {
    const x = await books.sameYear(2000);
    console.log(x);
} catch (e) {
    console.log(e);
}
try {
    const x = await books.sameYear(-1);
    console.log(x);
} catch (e) {
    console.log(e);
}
try {
    const x = await books.sameYear(1001);
    console.log(x);
} catch (e) {
    console.log(e);
}
try {
    const x = await books.sameYear();
    console.log(x);
} catch (e) {
    console.log(e);
}
try {
    const x = await books.sameYear(false);
    console.log(x);
} catch (e) {
    console.log(e);
}
try {
    const x = await books.sameYear('foo bar');
    console.log(x);
} catch (e) {
    console.log(e);
}
try {
    const x = await books.minMaxPrice();
    console.log(x);
} catch (e) {
    console.log(e);
}
try {
    const x = await books.searchBooksByPublisher("Skilith");
    console.log(x);
} catch (e) {
    console.log(e);
}
try {
    const x = await books.searchBooksByPublisher("A fake publisher");
    console.log(x);
} catch (e) {
    console.log(e);
}
try {
    const x = await books.searchBooksByPublisher();
    console.log(x);
} catch (e) {
    console.log(e);
}
try {
    const x = await books.searchBooksByPublisher(false);
    console.log(x);
} catch (e) {
    console.log(e);
}
try {
    const x = await books.searchBooksByPublisher('foo bar');
    console.log(x);
} catch (e) {
    console.log(e);
}
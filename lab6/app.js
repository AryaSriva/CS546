// This file should set up the express server as shown in the lecture code
// import { dbConnection, closeConnection } from "./config/mongoConnection.js";
import express from 'express';
import configRoutesFunction from './routes/index.js';
const app = express();
// const db = await dbConnection();
// await db.dropDatabase();

app.use(express.json());
configRoutesFunction(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on  http://localhost:3000');
});

// await closeConnection();
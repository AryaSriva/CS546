//import mongo collections, bcrypt and implement the following data functions
import { users } from "../config/mongoCollections.js";
import { findUser } from "../helpers.js";
import bcrypt from "bcrypt";

export const registerUser = async (
  firstName,
  lastName,
  username,
  password,
  favoriteQuote,
  themePreference,
  role
) => {
  if (
    !firstName ||
    typeof firstName != "string" ||
    firstName.trim().length == 0
  ) {
    throw `Please provide a valid first name`;
  }
  firstName = firstName.trim();
  if (firstName.length < 2 || firstName.length > 25) {
    throw `first name must be at least 2 characters and no more than 25 characters`;
  }
  if (!lastName || typeof lastName != "string" || lastName.trim().length == 0) {
    throw `Please provide a valid last name`;
  }
  lastName = lastName.trim();
  if (lastName.length < 2 || lastName.length > 25) {
    throw `last name must be at least 2 characters and no more than 25 characters`;
  }
  if (!username || typeof username != "string" || username.trim().length == 0) {
    throw `Please provide a valid username`;
  }
  username = username.trim();
  if (username.length < 5 || username.length > 10) {
    throw `username must be 5-10 characters`;
  }
  let numbers = "1234567890";
  for (let i of username) {
    if (numbers.includes(i)) {
      throw `username cannot contain any numbers`;
    }
  }
  username = username.toLowerCase();
  await findUser(username);
  if (!password || typeof password != "string" || password.trim().length == 0) {
    throw `please provide a valid password`;
  }
  password = password.trim();
  if (password.length < 8 || password.includes(" ")) {
    throw `password must be at least 8 characters long and can't contain spaces`;
  }
  let containsNumbers = false;
  let containsCapitals = false;
  let containsSpecials = false;
  let capitals = "ABCDEFGHIJKLMONPQRSTUVWXYZ";
  let specials = "`~!@#$%^&*()_-+={}[]|\\:;'\",<.>/?";
  for (let i of password) {
    if (numbers.includes(i)) {
      containsNumbers = true;
    }
    if (capitals.includes(i)) {
      containsCapitals = true;
    }
    if (specials.includes(i)) {
      containsSpecials = true;
    }
  }
  if (!containsCapitals || !containsNumbers || !containsSpecials) {
    throw `password must contain at least one upper-case letter, one number, and one special character`;
  }
  if (
    !favoriteQuote ||
    typeof favoriteQuote != "string" ||
    favoriteQuote.trim().length == 0
  ) {
    throw `please provide a valid favoriteQuote`;
  }
  favoriteQuote = favoriteQuote.trim();
  for (let i of favoriteQuote) {
    if (numbers.includes(i)) {
      throw `favorite quote cannot include any numbers`;
    }
  }
  if (favoriteQuote.length < 20 || favoriteQuote.length > 255) {
    throw `favorite quote should be between 20 and 255 characters long`;
  }
  if (
    !themePreference ||
    typeof themePreference != "string" ||
    themePreference.trim().length == 0
  ) {
    throw `please provide a valid theme preference`;
  }
  themePreference = themePreference.trim();
  themePreference = themePreference.toLowerCase();
  if (themePreference != "dark" && themePreference != "light") {
    throw `theme preference must be dark or light`;
  }
  if (!role || typeof role != "string" || role.trim().length == 0) {
    throw `please provide a valid theme preference`;
  }
  role = role.trim();
  role = role.toLowerCase();
  if (role != "admin" && role != "user") {
    throw `role must be admin or user`;
  }
  const theSalt = 10;
  let hash = await bcrypt.hash(password, theSalt);
  let newUser = {
    firstName: firstName,
    lastName: lastName,
    username: username,
    password: hash,
    favoriteQuote: favoriteQuote,
    themePreference: themePreference,
    role: role,
  };
  const userCollection = await users();
  const insertedInfo = await userCollection.insertOne(newUser);
  if (!insertedInfo) {
    throw `couldn't insert into database`;
  } else {
    return { signupCompleted: true };
  }
};

export const loginUser = async (username, password) => {
  if (!username || typeof username != "string" || username.trim().length == 0) {
    throw `Please provide a valid username`;
  }
  username = username.trim();
  if (username.length < 5 || username.length > 10) {
    throw `username must be between 5-10 characters`;
  }
  let numbers = "1234567890";
  for (let i of username) {
    if (numbers.includes(i)) {
      throw `username cannot contain any numbers`;
    }
  }
  if (!password || typeof password != "string" || password.trim().length == 0) {
    throw `please provide a valid password`;
  }
  password = password.trim();
  if (password.length < 8 || password.includes(" ")) {
    throw `password must be at least 8 characters long and can't contain spaces`;
  }
  let containsNumbers = false;
  let containsCapitals = false;
  let containsSpecials = false;
  let capitals = "ABCDEFGHIJKLMONPQRSTUVWXYZ";
  let specials = "`~!@#$%^&*()_-+={}[]|\\:;'\",<.>/?";
  for (let i of password) {
    if (numbers.includes(i)) {
      containsNumbers = true;
    }
    if (capitals.includes(i)) {
      containsCapitals = true;
    }
    if (specials.includes(i)) {
      containsSpecials = true;
    }
  }
  if (!containsCapitals || !containsNumbers || !containsSpecials) {
    throw `password must contain at least one upper-case letter, one number, and one special character`;
  }
  const userCollection = await users();
  const user = await userCollection.findOne({
    username: username,
  });
  if (!user) {
    throw `Either the username or password is invalid`;
  }
  if (await bcrypt.compare(password, user.password)) {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      favoriteQuote: user.favoriteQuote,
      themePreference: user.themePreference,
      role: user.role,
    };
  } else {
    throw `Either the username or password is invalid`;
  }
};

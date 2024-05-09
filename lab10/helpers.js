//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
import { users } from "./config/mongoCollections.js";

export const findUser = async (username) => {
  const usersCollection = await users();
  let user = await usersCollection.findOne({
    username: username,
  });
  if (!user) {
    return;
  } else {
    throw `there is already a user with that username`;
  }
};

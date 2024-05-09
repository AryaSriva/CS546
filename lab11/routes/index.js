//Here you will require route files and export the constructor method as shown in lecture code and worked in previous labs.
import api_rotes from "./routesApi.js";

const constructorMethod = (app) => {
  app.use("/", api_rotes);
  app.use("*", (req, res) => {
    res.redirect("/");
  });
};

export default constructorMethod;

//import express, express router as shown in lecture code
import { Router } from "express";
import { registerUser, loginUser } from "../data/users.js";

const router = Router();

router.route("/").get(async (req, res) => {
  //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
  return res.json({ error: "YOU SHOULD NOT BE HERE!" });
});

router
  .route("/register")
  .get(async (req, res) => {
    //code here for GET
    return res.render("register");
  })
  .post(async (req, res) => {
    try {
      await registerUser(
        req.body.firstName,
        req.body.lastName,
        req.body.username,
        req.body.password,
        req.body.favoriteQuote,
        req.body.themePreference,
        req.body.role
      );
      return res.redirect("/login");
    } catch (e) {
      if (e == "couldn't insert into database") {
        res.status(500).render("login", { error: "Internal Server Error" });
      } else {
        res.status(400).render("login", { error: e });
      }
    }
  });

router
  .route("/login")
  .get(async (req, res) => {
    //code here for GET
    return res.render("login");
  })
  .post(async (req, res) => {
    //code here for POST
    try {
      const user = await loginUser(req.body.username, req.body.password);
      req.session.user = user;
      if (user.role === "admin") {
        return res.redirect("/admin");
      } else {
        return res.redirect("/user");
      }
    } catch (e) {
      res.status(400).render("login", { error: e });
    }
  });

router.route("/user").get(async (req, res) => {
  //code here for GET
  let user = req.session.user;
  return res.render("user", {
    firstName: user.firstName,
    lastName: user.lastName,
    currentTime: new Date().toUTCString(),
    role: user.role,
    favoriteQuote: user.favoriteQuote,
    themePreference: user.themePreference,
  });
});

router.route("/admin").get(async (req, res) => {
  //code here for GET
  let user = req.session.user;
  return res.render("admin", {
    firstName: user.firstName,
    lastName: user.lastName,
    currentTime: new Date().toUTCString(),
    favoriteQuote: user.favoriteQuote,
    themePreference: user.themePreference,
  });
});

router.route("/logout").get(async (req, res) => {
  //code here for GET
  req.session.destroy();
  return res.render("logout");
});

export default router;

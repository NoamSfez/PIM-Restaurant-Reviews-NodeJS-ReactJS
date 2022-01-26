import express from "express";
import UsersController from "../Controllers/users.controller.js";

const router = express.Router();

//point de depart c'est apres api/v1/users
router
  .route("/")
  .get(UsersController.getAllUsers)
  .post(UsersController.postUser);
router.route("/id/:id").get(UsersController.getUserByID);

export default router;

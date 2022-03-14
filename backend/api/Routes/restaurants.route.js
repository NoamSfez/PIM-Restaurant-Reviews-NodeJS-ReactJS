import express from "express";
import RestaurantsController from "../Controllers/restaurants.controller.js";
import ReviewsController from "../Controllers/reviews.controller.js";

const router = express.Router();

//point de depart c'est apres api/v1/restaurants
router.route("/").get(RestaurantsController.apiGetRestaurants);
router.route("/id/:id").get(RestaurantsController.apiGetRestaurantById);
router.route("/cuisines").get(RestaurantsController.apiGetRestaurantCuisines);
router
  .route("/cuisines/simple")
  .get(RestaurantsController.apiGetRestaurantCuisinesSimple);

router.route("/:id/reviews").get(RestaurantsController.apiGetRestaurantReviews);

router
  .route("/review")
  .post(ReviewsController.apiPostReview)
  .put(ReviewsController.apiUpdateReview)
  .delete(ReviewsController.apiDeleteReview);
export default router;

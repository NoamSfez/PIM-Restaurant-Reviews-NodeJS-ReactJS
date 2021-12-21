import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv"; //environment variables
import RestaurantsDAO from "./dao/restaurantsDAO.js";
import ReviewsDAO from "./dao/reviewsDAO.js";
dotenv.config();

const MongoClient = mongodb.MongoClient;
const port = process.env.PORT || 8000;

MongoClient.connect(process.env.RESTREVIEWS_DB_URI)
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await RestaurantsDAO.injectDB(client);
    await ReviewsDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  });

// ../node-course/restaurant-reviews/backend nodemon index.js
//https://www.youtube.com/watch?v=mrHNSanmqQ4 a 1:05:38
// https://cloud.mongodb.com/v2/61b0895c892afd224d38c2cd#metrics/replicaSet/61b08a7d9c6328293e0aa076/explorer/sample_restaurants/reviews/find

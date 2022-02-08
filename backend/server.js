import express from "express";
import cors from "cors";
import restaurantsRouter from "./api/Routes/restaurants.route.js";

const app = express();
app.use(cors());
app.use(express.json()); //remplace BodyParser from older versions

app.use("/api/v1/restaurants", restaurantsRouter);
app.use("*", (req, res) => res.status(404).json({ error: "not found" })); //not defined page

export default app; //separate server part and database part

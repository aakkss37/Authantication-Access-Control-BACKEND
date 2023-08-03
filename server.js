import express from "express";
const app = express()
import bodyParser from "body-parser";
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

import cors from "cors"
import { errorHandler } from "./middleware/errorHandler.js";

import corsOption from "./config/cors.js";
app.use(cors(corsOption));


// DATABASE CONNECTION
import mongoseConnection from "./db/dbConfig.js";
mongoseConnection();


// routes
import publicRouter from "./routes/publicRouter.js";
app.use('/employee', publicRouter);


app.use(errorHandler)


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
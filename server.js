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
import mongoseConnection from "./config/dbConfig.js";
mongoseConnection();


// routes
import publicRouter from "./routes/publicRouter.js";
app.use('/auth', publicRouter);


import verifyJWT from "./middleware/verifyJWT.js";
app.use(verifyJWT);
import privateRouter from "./routes/privateRoute.js";
app.use("/", privateRouter);


app.use(errorHandler)

app.all('*', (req, res) => {
	res.status(404);
	if (req.accepts('html')) {
		res.sendFile("./view/404Error.html");
	} else if (req.accepts('json')) {
		res.json({ "error": "404 Not Found" });
	} else {
		res.type('txt').send("404 Not Found");
	}
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
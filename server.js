import express from "express";
import cors from "cors"
import path from "path"
const __dirname = path.resolve();
import { errorHandler } from "./middleware/errorHandler.js";
const app = express()
const whiteList = ["https://www.yourdomain.com", "https://www.google.com", "http://localhos:3000"]
const corsOption = {
	origin: (origin, callBack) => {
		if(whiteList.indexOf(origin) !== -1 || !origin){
			callBack(null, true)
		}else{
			callBack(new Error("Request rejected by CORS"))
		}
	},
	optionSucessStatus: 200,
}
app.use(cors(corsOption));


//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/subdir', express.static(path.join(__dirname, '/public')));

// routes
import router from "./routes/router.js";
app.use('/', router);


app.all("*", (req, res) => {
	res.status(404)
	if (req.accepts("html")) {
		res.status(404).sendFile(path.join(__dirname, "view", "404Error.html"))
	}
	else if (req.accepts("json")){
		res.json({
			status: 404,
			message: "404 Page not found"
		})
	} else{
		res.type("text").send("404 Page not found")
	}
})

app.use(errorHandler)





const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
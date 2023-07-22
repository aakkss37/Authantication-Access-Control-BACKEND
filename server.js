import express from "express";
import cors from "cors"
import path from "path"
import { errorHandler } from "./middleware/errorHandler.js";
const app = express()
const whiteList = ["https://www.yourdomain.com", "https://www.google.com", "http://localhos:3000"]
const corsOption = {
	origin: (origin, callBack) => {
		if(whiteList.indexOf(origin) !== -1 ){
			callBack(null, true)
		}else{
			callBack(new Error("Request rejected by CORS"))
		}
	},
	optionSucessStatus: 200,
}
app.use(cors(corsOption));

app.get("/", (req, res) => {
	res.send("Hello from server")
})

app.use(errorHandler)





const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
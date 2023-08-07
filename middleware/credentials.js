import { whiteList } from "../config/cors.js";

const credentials = (req, res, next) => {
	const origin = req.headers.origin;
	if (whiteList.includes(origin)) {
		res.header('Access-Control-Allow-Credentials', true);
	}
	next();
}

module.exports = credentials
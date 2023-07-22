import { logEvents } from "./logEvents.js"

export const errorHandler = (err, req, res, next) => {
	logEvents(`${err.name}: ${err.message}`, "errorLog")
	// console.log(err.stack)
	console.log("------->>>>",`${err.name}: ${err.message}`)
	res.status(500).send(err.message)
}


import  { format } from 'date-fns';
import  { v4 as uuid } from 'uuid';
import fs from 'fs';
import { promises } from 'fs';
import  path from 'path';
const __dirname = path.resolve();

export const logEvents = async (message, logName) => {
	console.log(message)
	const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
	const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

	try {
		if (!fs.existsSync(path.join(__dirname, 'logs'))) {
			await promises.mkdir(path.join(__dirname, 'logs'));
		}

		await promises.appendFile(path.join(__dirname, 'logs', logName), logItem);
	} catch (err) {
		console.log(err);
	}
}

// export const logger = (req, res, next) => {
// 	console.log("=======>>>>>>>",`${req.method} ${req.path}`);
// 	logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
// 	next();
// }

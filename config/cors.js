export const whiteList = [
	"https://www.yourdomain.com", 
	"https://www.google.com", 
	'http://127.0.0.1:5500',
	'http://localhost:3500',
	'http://localhost:3000',
	'http://localhost:5173'
]

const corsOption = {
	origin: (origin, callBack) => {
		if (whiteList.indexOf(origin) !== -1 || !origin) {
			callBack(null, true)
		} else {
			callBack(new Error("Request rejected by CORS"))
		}
	},
	optionSucessStatus: 200,
}

export default corsOption
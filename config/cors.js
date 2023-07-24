const whiteList = [
	"https://www.yourdomain.com", 
	"https://www.google.com", 
	"http://localhos:3000"
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
const getEmployees = async (req, res) => {
	console.log("request in _getEmployee controller")
	res.status(200).json(
		[
			{
				firstname: "Dave",
				lastname: "Gray"
			},
			{
				firstname: "John",
				lastname: "Smith"
			}
		]
	)
}
const getEmployeeById = async (req, res) => {
	console.log("request in _getEmployeeById controller")
	res.status(200).json(
		[
			{
				firstname: "Dave",
				lastname: "Gray"
			},
			{
				firstname: "John",
				lastname: "Smith"
			}
		]
	)
}
const createEmployee = async (req, res) => {
	console.log("request in _createEmployee controller")
	console.log(req.body)
	res.status(201).json(
		[
			{
				firstname: "Dave",
				lastname: "Gray"
			},
			{
				firstname: "John",
				lastname: "Smith"
			}
		]
	)
}
const updateEmployee = async (req, res) => {
	console.log("request in _updateEmployee controller")
	res.status(202).json(
		[
			{
				firstname: "Dave",
				lastname: "Gray"
			},
			{
				firstname: "John",
				lastname: "Smith"
			}
		]
	)
}
const deleteEmployee = async (req, res) => {
	console.log("request in _deleteEmployee controller")
	res.status(202).json(
		[
			{
				firstname: "Dave",
				lastname: "Gray"
			},
			{
				firstname: "John",
				lastname: "Smith"
			}
		]
	)
}

const employeeController = {
	getEmployees,
	createEmployee,
	updateEmployee,
	deleteEmployee,
	getEmployeeById
};

export default employeeController;

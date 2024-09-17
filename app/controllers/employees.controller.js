const db = require('../config/db.config.js');
const Employee = db.Employee;

// Create a new Employee
exports.create = (req, res) => {
    let employee = {};

    try{
        // Building Employee object from uploading request's body
        employee.firstname = req.body.firstname;
        employee.lastname = req.body.lastname;
        employee.address = req.body.address;
        employee.salary = req.body.salary;
        employee.department = req.body.department;
    
        // Save to MySQL database
        Employee.create(employee).then(result => {    
            // send uploading message to client
            res.status(200).json({
                message: "Upload Successfully an Employee with id = " + result.id,
                employee: result,
            });
        });
    } catch(error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

// Retrieve all Employees
exports.retrieveAllEmployees = (req, res) => {
    Employee.findAll()
        .then(employeeInfos => {
            res.status(200).json({
                message: "Get all Employees' Infos Successfully!",
                employees: employeeInfos
            });
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({
              message: "Error!",
              error: error
          });
        });
}

// Get an Employee by Id
exports.getEmployeeById = (req, res) => {
    let employeeId = req.params.id;
    Employee.findByPk(employeeId)
        .then(employee => {
            res.status(200).json({
                message: "Successfully Get an Employee with id = " + employeeId,
                employee: employee
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

// Update an Employee by Id
exports.updateById = async (req, res) => {
    try{
        let employeeId = req.params.id;
        let employee = await Employee.findByPk(employeeId);

        if(!employee){
            res.status(404).json({
                message: "Not Found for updating an Employee with id = " + employeeId,
                employee: "",
                error: "404"
            });
        } else {    
            let updatedObject = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                address: req.body.address,
                salary: req.body.salary,
                department: req.body.department
            }
            let result = await Employee.update(updatedObject, {returning: true, where: {id: employeeId}});
            
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update an Employee with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully an Employee with id = " + employeeId,
                employee: updatedObject,
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update an Employee with id = " + req.params.id,
            error: error.message
        });
    }
}

// Delete an Employee by Id
exports.deleteById = async (req, res) => {
    try{
        let employeeId = req.params.id;
        let employee = await Employee.findByPk(employeeId);

        if(!employee){
            res.status(404).json({
                message: "Does Not exist an Employee with id = " + employeeId,
                error: "404",
            });
        } else {
            await employee.destroy();
            res.status(200).json({
                message: "Delete Successfully an Employee with id = " + employeeId,
                employee: employee,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete an Employee with id = " + req.params.id,
            error: error.message,
        });
    }
}

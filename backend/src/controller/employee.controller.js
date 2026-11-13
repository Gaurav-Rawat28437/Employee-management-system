const Employee  = require("../model/employee.model")


const createEmployee = async (req, res) => {

    try {

        const {
            employeeName,
            email,
            phoneNumber,
            department,
            designation,
            joiningDate,
            status
        } = req.body

      
        if (
            !employeeName ||
            !email ||
            !phoneNumber ||
            !department ||
            !designation ||
            !joiningDate
        ) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided"
            })
        }

       
        const existingEmployee = await Employee.findOne({
            email
        })

        if (existingEmployee) {
            return res.status(409).json({
                success: false,
                message: "Employee with this email already exists"
            })
        }

       
        const employee = await Employee.create({
            employeeName,
            email,
            phoneNumber,
            department,
            designation,
            joiningDate,
            status
        })

        return res.status(201).json({
            success: true,
            message: "Employee created successfully",
            data: employee
        })

    } catch (error) {

        console.log("Create Employee Error:", error)

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })

    }

}



const getAllEmployees = async (req, res) => {

    try {

        const { search, status } = req.query

        let filter = {}

    
        if (search) {

            filter.$or = [
                {
                    employeeName: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    email: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    department: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    designation: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ]

        }

      
        if (status) {

            if (!["Active", "Inactive"].includes(status)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid employee status"
                })
            }

            filter.status = status

        }

        const employees = await Employee
            .find(filter)
            .sort({ createdAt: -1 })

        return res.status(200).json({

            success: true,

            totalEmployees: employees.length,

            data: employees

        })

    } catch (error) {

        console.log("Get All Employees Error:", error)

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })

    }

}



const mongoose = require("mongoose")

const updateEmployee = async (req, res) => {

    try {

        const { id } = req.params

        const {
            employeeName,
            email,
            phoneNumber,
            department,
            designation,
            joiningDate,
            status
        } = req.body

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid employee ID"
            })
        }

        const existingEmployee = await Employee.findById(id)

        if (!existingEmployee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            })
        }

        if (email) {

            const duplicateEmail = await Employee.findOne({
                email: email.toLowerCase().trim(),
                _id: { $ne: id }
            })

            if (duplicateEmail) {
                return res.status(409).json({
                    success: false,
                    message: "Email already exists"
                })
            }

        }

       
        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            {
                $set: {
                    employeeName,
                    email,
                    phoneNumber,
                    department,
                    designation,
                    joiningDate,
                    status
                }
            },
            {
                new: true,
                runValidators: true
            }
        )

        return res.status(200).json({
            success: true,
            message: "Employee updated successfully",
            data: updatedEmployee
        })

    } catch (error) {

        console.log("Update Employee Error:", error)

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })

    }

}



const deleteEmployee = async (req, res) => {

    try {

        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid employee ID"
            })
        }

        const employee = await Employee.findById(id)

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            })
        }

      
        await Employee.findByIdAndDelete(id)

        return res.status(200).json({
            success: true,
            message: "Employee deleted successfully"
        })

    } catch (error) {

        console.log("Delete Employee Error:", error)

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })

    }

}



module.exports = {
    createEmployee,
    getAllEmployees,
    updateEmployee ,
    deleteEmployee
}

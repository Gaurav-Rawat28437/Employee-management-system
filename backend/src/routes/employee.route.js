
const express = require("express")
const { createEmployee, getAllEmployees, updateEmployee, deleteEmployee } = require("../controller/employee.controller")

const router = express.Router()



router.post("/create", createEmployee)

router.get("/getAll", getAllEmployees)

router.put("/update/:id", updateEmployee)

router.delete("/delete/:id", deleteEmployee)


module.exports = {employeeRouter:router}


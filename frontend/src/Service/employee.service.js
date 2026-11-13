
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

export const createEmployee = async (employeeData) => {

    const response = await axios.post(
        `${API_URL}/create`,
        employeeData,
        {
            withCredentials: true
        }
    )

    return response.data
}


export const getAllEmployees = async (params = {}) => {

    const response = await axios.get(
        `${API_URL}/getAll`,
        {
            params,
            withCredentials: true
        }
    )

    return response.data
}


export const getEmployeeById = async (employeeId) => {

    const response = await axios.get(
        `${API_URL}/getByID/${employeeId}`,
        {
            withCredentials: true
        }
    )

    return response.data
}


export const updateEmployee = async (employeeId, employeeData) => {

    const response = await axios.put(
        `${API_URL}/update/${employeeId}`,
        employeeData,
        {
            withCredentials: true
        }
    )

    return response.data
}


export const deleteEmployee = async (employeeId) => {

    const response = await axios.delete(
        `${API_URL}/delete/${employeeId}`,
        {
            withCredentials: true
        }
    )

    return response.data
}


import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import {
    Users,
    UserCheck,
    UserX,
    UserPlus,
    ArrowUpRight,
    Search,
    BriefcaseBusiness,
    CalendarDays,
    Eye
} from "lucide-react"

import Navbar from "../component/Navbar"
import EmployeeDetailsModal from "../component/EmployeeDetailsModal"
import { getAllEmployees } from "../Service/employee.service"

function Home() {

    const navigate = useNavigate()

    const [employees, setEmployees] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [status, setStatus] = useState("")
    const [selectedEmployee, setSelectedEmployee] = useState(null)

    const fetchEmployees = async () => {

        try {

            setLoading(true)

            const response = await getAllEmployees()

            setEmployees(response.data || [])

        } catch (error) {

            console.log("Fetch Employees Error:", error)

            toast.error(
                error.response?.data?.message ||
                "Failed to fetch employees"
            )

        } finally {

            setLoading(false)

        }

    }

    useEffect(() => {
        fetchEmployees()
    }, [])

    const filteredEmployees = employees.filter((employee) => {

        const searchValue = search.toLowerCase()

        const matchesSearch =
            employee.employeeName?.toLowerCase().includes(searchValue) ||
            employee.email?.toLowerCase().includes(searchValue) ||
            employee.department?.toLowerCase().includes(searchValue) ||
            employee.designation?.toLowerCase().includes(searchValue)

        const matchesStatus =
            status === "" || employee.status === status

        return matchesSearch && matchesStatus

    })

    const activeEmployees = employees.filter(
        (employee) => employee.status === "Active"
    ).length

    const inactiveEmployees = employees.filter(
        (employee) => employee.status === "Inactive"
    ).length

    const departments = new Set(
        employees.map((employee) => employee.department)
    ).size

    const stats = [
        {
            title: "Total Employees",
            value: employees.length,
            icon: Users,
            color: "bg-blue-100 text-blue-600",
            growth: "All registered employees"
        },
        {
            title: "Active Employees",
            value: activeEmployees,
            icon: UserCheck,
            color: "bg-green-100 text-green-600",
            growth: "Currently working"
        },
        {
            title: "Inactive Employees",
            value: inactiveEmployees,
            icon: UserX,
            color: "bg-red-100 text-red-600",
            growth: "Currently inactive"
        },
        {
            title: "Departments",
            value: departments,
            icon: BriefcaseBusiness,
            color: "bg-purple-100 text-purple-600",
            growth: "Across the organization"
        }
    ]

    const formatDate = (date) => {

        if (!date) return "N/A"

        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        })

    }

    const handleEmployeeUpdated = () => {

        setSelectedEmployee(null)

        fetchEmployees()

    }

    const handleEmployeeDeleted = (employeeId) => {

        setEmployees((prev) =>
            prev.filter((employee) => employee._id !== employeeId)
        )

        setSelectedEmployee(null)

    }

    return (

        <div className="min-h-screen bg-gray-50">

            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-8">

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">

                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Dashboard Overview
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Welcome back, Admin! Here's what's happening today.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate("/create-employee")}
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium transition shadow-sm"
                    >
                        <UserPlus size={19} />
                        Add Employee
                    </button>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

                    {stats.map((item, index) => {

                        const Icon = item.icon

                        return (

                            <div
                                key={index}
                                className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition"
                            >

                                <div className="flex items-center justify-between mb-5">

                                    <div className={`p-3 rounded-xl ${item.color}`}>
                                        <Icon size={23} />
                                    </div>

                                    <ArrowUpRight
                                        size={19}
                                        className="text-gray-400"
                                    />

                                </div>

                                <p className="text-sm text-gray-500 font-medium">
                                    {item.title}
                                </p>

                                <div className="flex items-end justify-between mt-2">

                                    <h2 className="text-3xl font-bold text-gray-900">
                                        {item.value}
                                    </h2>

                                </div>

                                <p className="text-xs text-gray-400 mt-3">
                                    {item.growth}
                                </p>

                            </div>

                        )

                    })}

                </div>

                <div
                    id="employees"
                    className="bg-white border border-gray-200 rounded-2xl"
                >

                    <div className="p-6 border-b border-gray-100">

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                            <div>
                                <h2 className="text-lg font-bold text-gray-900">
                                    Recent Employees
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Manage and monitor your employees
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">

                                <div className="relative">

                                    <Search
                                        size={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search employees..."
                                        className="w-full sm:w-64 pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />

                                </div>

                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="px-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-blue-500 text-gray-600"
                                >
                                    <option value="">All Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>

                            </div>

                        </div>

                    </div>

                    <div className="overflow-x-auto">

                        <table className="w-full text-left">

                            <thead className="bg-gray-50">

                                <tr className="text-xs uppercase tracking-wider text-gray-500">

                                    <th className="px-6 py-4 font-semibold">Employee</th>
                                    <th className="px-6 py-4 font-semibold">Department</th>
                                    <th className="px-6 py-4 font-semibold">Designation</th>
                                    <th className="px-6 py-4 font-semibold">Joining Date</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold">Action</th>

                                </tr>

                            </thead>

                            <tbody className="divide-y divide-gray-100">

                                {loading ? (

                                    <tr>
                                        <td colSpan="6" className="px-6 py-16 text-center text-gray-500">
                                            Loading employees...
                                        </td>
                                    </tr>

                                ) : filteredEmployees.length === 0 ? (

                                    <tr>
                                        <td colSpan="6" className="px-6 py-16 text-center">

                                            <div className="flex flex-col items-center">

                                                <div className="bg-blue-50 p-4 rounded-full mb-4">
                                                    <Users
                                                        size={32}
                                                        className="text-blue-500"
                                                    />
                                                </div>

                                                <h3 className="text-gray-800 font-semibold">
                                                    No employees found
                                                </h3>

                                                <p className="text-sm text-gray-500 mt-2">
                                                    {search || status
                                                        ? "Try changing your search or status filter."
                                                        : "Start by adding your first employee."
                                                    }
                                                </p>

                                                {!search && !status && (
                                                    <button
                                                        type="button"
                                                        onClick={() => navigate("/create-employee")}
                                                        className="mt-5 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition"
                                                    >
                                                        <UserPlus size={17} />
                                                        Add Employee
                                                    </button>
                                                )}

                                            </div>

                                        </td>
                                    </tr>

                                ) : (

                                    filteredEmployees.map((employee) => (

                                        <tr
                                            key={employee._id}
                                            className="hover:bg-gray-50 transition"
                                        >

                                            <td className="px-6 py-4">

                                                <div className="flex items-center gap-3">

                                                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                                                        {employee.employeeName?.charAt(0).toUpperCase()}
                                                    </div>

                                                    <div>
                                                        <p className="font-semibold text-gray-800">
                                                            {employee.employeeName}
                                                        </p>

                                                        <p className="text-sm text-gray-500">
                                                            {employee.email}
                                                        </p>
                                                    </div>

                                                </div>

                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {employee.department}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {employee.designation}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                <div className="flex items-center gap-2">
                                                    <CalendarDays size={16} className="text-gray-400" />
                                                    {formatDate(employee.joiningDate)}
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">

                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                        employee.status === "Active"
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-red-100 text-red-700"
                                                    }`}
                                                >
                                                    {employee.status}
                                                </span>

                                            </td>

                                            <td className="px-6 py-4">

                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedEmployee(employee)}
                                                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-blue-600 hover:bg-blue-50 transition text-sm font-medium"
                                                    title="View Details"
                                                >
                                                    <Eye size={18} />
                                                    View Details
                                                </button>

                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>

                    <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-2">

                        <p className="text-sm text-gray-500">
                            Showing {filteredEmployees.length} of {employees.length} employees
                        </p>

                        <p className="text-sm text-gray-400">
                            Employee Management System
                        </p>

                    </div>

                </div>

            </main>

            {selectedEmployee && (

                <EmployeeDetailsModal
                    employee={selectedEmployee}
                    onClose={() => setSelectedEmployee(null)}
                    onUpdated={handleEmployeeUpdated}
                    onDeleted={handleEmployeeDeleted}
                />

            )}

        </div>
    )
}

export default Home

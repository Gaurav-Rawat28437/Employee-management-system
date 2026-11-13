
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

import {
    ArrowLeft,
    UserRound,
    Mail,
    Phone,
    BriefcaseBusiness,
    CalendarDays,
    Building2,
    Save,
    X,
    UserPlus
} from "lucide-react"

import Navbar from "../component/Navbar"
import { createEmployee } from "../Service/employee.service"

function CreateEmployee() {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        employeeName: "",
        email: "",
        phoneNumber: "",
        department: "",
        designation: "",
        joiningDate: "",
        status: "Active"
    })

    const [errors, setErrors] = useState({})

    const validateForm = () => {

        const newErrors = {}

        if (!formData.employeeName.trim()) {
            newErrors.employeeName = "Employee name is required"
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ) {
            newErrors.email = "Enter a valid email address"
        }

        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = "Phone number is required"
        } else if (!/^[0-9]{10}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = "Enter a valid 10-digit phone number"
        }

        if (!formData.department) {
            newErrors.department = "Please select a department"
        }

        if (!formData.designation.trim()) {
            newErrors.designation = "Designation is required"
        }

        if (!formData.joiningDate) {
            newErrors.joiningDate = "Joining date is required"
        } else if (
            new Date(`${formData.joiningDate}T00:00:00`) >
            new Date()
        ) {
            newErrors.joiningDate = "Joining date cannot be in the future"
        }

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        if (!validateForm()) {
            return
        }

        try {

            setLoading(true)

            const response = await createEmployee(formData)

            toast.success(
                response.message || "Employee created successfully"
            )

            setFormData({
                employeeName: "",
                email: "",
                phoneNumber: "",
                department: "",
                designation: "",
                joiningDate: "",
                status: "Active"
            })

            navigate("/")

        } catch (error) {

            console.log("Create Employee Error:", error)

            toast.error(
                error.response?.data?.message ||
                "Failed to create employee"
            )

        } finally {

            setLoading(false)

        }

    }

    const inputClass = (field) => `
        w-full px-4 py-3 border rounded-xl outline-none transition
        ${errors[field]
            ? "border-red-400 focus:ring-2 focus:ring-red-100"
            : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        }
    `

    return (

        <div className="min-h-screen bg-gray-50">

            <Navbar />

            <main className="max-w-5xl mx-auto px-5 py-8">

                <div className="flex items-center gap-3 mb-7">

                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-100 transition"
                    >
                        <ArrowLeft size={20} className="text-gray-600" />
                    </button>

                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Create Employee
                        </h1>

                        <p className="text-sm text-gray-500 mt-1">
                            Add a new employee to your organization
                        </p>
                    </div>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

                        <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">

                            <div className="p-3 bg-blue-50 rounded-xl">
                                <UserPlus className="text-blue-600" size={22} />
                            </div>

                            <div>
                                <h2 className="font-bold text-gray-900">
                                    Employee Information
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Enter the employee's personal and professional details
                                </p>
                            </div>

                        </div>

                        <div className="p-6 md:p-8">

                            <div className="mb-8">

                                <h3 className="text-sm font-bold text-gray-800 mb-5 uppercase tracking-wide">
                                    Personal Details
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Employee Name *
                                        </label>

                                        <div className="relative">
                                            <UserRound
                                                size={18}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                            />

                                            <input
                                                type="text"
                                                name="employeeName"
                                                value={formData.employeeName}
                                                onChange={(e) => {
                                                    setFormData({
                                                        ...formData,
                                                        employeeName: e.target.value
                                                    })

                                                    setErrors({
                                                        ...errors,
                                                        employeeName: ""
                                                    })
                                                }}
                                                placeholder="Enter full name"
                                                className={`${inputClass("employeeName")} pl-10`}
                                            />
                                        </div>

                                        {errors.employeeName && (
                                            <p className="text-red-500 text-xs mt-2">
                                                {errors.employeeName}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>

                                        <div className="relative">
                                            <Mail
                                                size={18}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                            />

                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={(e) => {
                                                    setFormData({
                                                        ...formData,
                                                        email: e.target.value
                                                    })

                                                    setErrors({
                                                        ...errors,
                                                        email: ""
                                                    })
                                                }}
                                                placeholder="employee@example.com"
                                                className={`${inputClass("email")} pl-10`}
                                            />
                                        </div>

                                        {errors.email && (
                                            <p className="text-red-500 text-xs mt-2">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number *
                                        </label>

                                        <div className="relative">
                                            <Phone
                                                size={18}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                            />

                                            <input
                                                type="tel"
                                                name="phoneNumber"
                                                value={formData.phoneNumber}
                                                onChange={(e) => {
                                                    setFormData({
                                                        ...formData,
                                                        phoneNumber: e.target.value
                                                    })

                                                    setErrors({
                                                        ...errors,
                                                        phoneNumber: ""
                                                    })
                                                }}
                                                placeholder="Enter 10-digit phone number"
                                                maxLength={10}
                                                className={`${inputClass("phoneNumber")} pl-10`}
                                            />
                                        </div>

                                        {errors.phoneNumber && (
                                            <p className="text-red-500 text-xs mt-2">
                                                {errors.phoneNumber}
                                            </p>
                                        )}
                                    </div>

                                </div>

                            </div>

                            <div className="border-t border-gray-100 my-8"></div>

                            <div>

                                <h3 className="text-sm font-bold text-gray-800 mb-5 uppercase tracking-wide">
                                    Professional Details
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Department *
                                        </label>

                                        <div className="relative">
                                            <Building2
                                                size={18}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                                            />

                                            <select
                                                name="department"
                                                value={formData.department}
                                                onChange={(e) => {
                                                    setFormData({
                                                        ...formData,
                                                        department: e.target.value
                                                    })

                                                    setErrors({
                                                        ...errors,
                                                        department: ""
                                                    })
                                                }}
                                                className={`${inputClass("department")} pl-10 bg-white`}
                                            >
                                                <option value="">
                                                    Select department
                                                </option>

                                                <option value="Engineering">Engineering</option>
                                                <option value="Human Resources">Human Resources</option>
                                                <option value="Marketing">Marketing</option>
                                                <option value="Sales">Sales</option>
                                                <option value="Finance">Finance</option>
                                                <option value="Design">Design</option>
                                                <option value="Operations">Operations</option>
                                            </select>
                                        </div>

                                        {errors.department && (
                                            <p className="text-red-500 text-xs mt-2">
                                                {errors.department}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Designation *
                                        </label>

                                        <div className="relative">
                                            <BriefcaseBusiness
                                                size={18}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                            />

                                            <input
                                                type="text"
                                                name="designation"
                                                value={formData.designation}
                                                onChange={(e) => {
                                                    setFormData({
                                                        ...formData,
                                                        designation: e.target.value
                                                    })

                                                    setErrors({
                                                        ...errors,
                                                        designation: ""
                                                    })
                                                }}
                                                placeholder="e.g. Frontend Developer"
                                                className={`${inputClass("designation")} pl-10`}
                                            />
                                        </div>

                                        {errors.designation && (
                                            <p className="text-red-500 text-xs mt-2">
                                                {errors.designation}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Joining Date *
                                        </label>

                                        <div className="relative">
                                            <CalendarDays
                                                size={18}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                                            />

                                            <input
                                                type="date"
                                                name="joiningDate"
                                                value={formData.joiningDate}
                                                onChange={(e) => {
                                                    setFormData({
                                                        ...formData,
                                                        joiningDate: e.target.value
                                                    })

                                                    setErrors({
                                                        ...errors,
                                                        joiningDate: ""
                                                    })
                                                }}
                                                max={new Date().toLocaleDateString("en-CA")}
                                                className={`${inputClass("joiningDate")} pl-10`}
                                            />
                                        </div>

                                        {errors.joiningDate && (
                                            <p className="text-red-500 text-xs mt-2">
                                                {errors.joiningDate}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Employee Status *
                                        </label>

                                        <select
                                            name="status"
                                            value={formData.status}
                                            onChange={(e) => {
                                                setFormData({
                                                    ...formData,
                                                    status: e.target.value
                                                })
                                            }}
                                            className={`${inputClass("status")} bg-white`}
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="px-6 md:px-8 py-5 bg-gray-50 border-t border-gray-100 flex flex-col-reverse sm:flex-row justify-end gap-3">

                            <button
                                type="button"
                                onClick={() => navigate("/")}
                                disabled={loading}
                                className="flex items-center justify-center gap-2 px-5 py-3 border border-gray-300 rounded-xl text-gray-600 font-medium hover:bg-white transition disabled:opacity-50"
                            >
                                <X size={18} />
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition shadow-sm"
                            >
                                <Save size={18} />
                                {loading ? "Creating..." : "Create Employee"}
                            </button>

                        </div>

                    </div>

                </form>

            </main>

        </div>

    )
}

export default CreateEmployee

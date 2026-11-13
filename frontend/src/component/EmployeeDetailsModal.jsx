
import { useState } from "react"
import {
    X,
    UserRound,
    Mail,
    Phone,
    Building2,
    BriefcaseBusiness,
    CalendarDays,
    Pencil,
    Trash2,
    Save,
    XCircle
} from "lucide-react"
import toast from "react-hot-toast"

import {
    updateEmployee,
    deleteEmployee
} from "../Service/employee.service"

function EmployeeDetailsModal({ employee, onClose, onUpdated, onDeleted }) {

    const [isEditing, setIsEditing] = useState(false)
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        employeeName: employee?.employeeName || "",
        email: employee?.email || "",
        phoneNumber: employee?.phoneNumber || "",
        department: employee?.department || "",
        designation: employee?.designation || "",
        joiningDate: employee?.joiningDate
            ? new Date(employee.joiningDate).toISOString().split("T")[0]
            : "",
        status: employee?.status || "Active"
    })

    if (!employee) return null

    const inputClass = "w-full px-3 py-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 text-sm"

    const details = [
        {
            label: "Full Name",
            value: employee.employeeName,
            icon: UserRound
        },
        {
            label: "Email Address",
            value: employee.email,
            icon: Mail
        },
        {
            label: "Phone Number",
            value: employee.phoneNumber,
            icon: Phone
        },
        {
            label: "Department",
            value: employee.department,
            icon: Building2
        },
        {
            label: "Designation",
            value: employee.designation,
            icon: BriefcaseBusiness
        },
        {
            label: "Joining Date",
            value: employee.joiningDate
                ? new Date(employee.joiningDate).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric"
                })
                : "N/A",
            icon: CalendarDays
        }
    ]

    const handleUpdate = async (e) => {

        e.preventDefault()

        try {

            setLoading(true)

            const response = await updateEmployee(employee._id, formData)

            toast.success(response.message || "Employee updated successfully")

            onUpdated()

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Failed to update employee"
            )

        } finally {

            setLoading(false)

        }
    }

    const handleDelete = async () => {


        try {

            setLoading(true)

            const response = await deleteEmployee(employee._id)

            toast.success(response.message || "Employee deleted successfully")

            onDeleted(employee._id)

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Failed to delete employee"
            )

        } finally {

            setLoading(false)

        }
    }

    return (

        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6"
            onClick={onClose}
        >

            <div
                className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden max-h-full overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="flex items-center justify-between p-5 border-b border-gray-100">

                    <div>
                        <h2 className="text-lg font-bold text-gray-900">
                            {isEditing ? "Update Employee" : "Employee Details"}
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            {isEditing
                                ? "Edit employee information"
                                : "Complete employee information"}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition"
                    >
                        <X size={20} />
                    </button>

                </div>

                <form onSubmit={handleUpdate}>

                    <div className="p-5">

                        <div className="flex items-center gap-4 mb-6">

                            <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold">
                                {employee.employeeName?.charAt(0).toUpperCase()}
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-900">
                                    {employee.employeeName}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    {employee.designation}
                                </p>

                                <span
                                    className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                                        employee.status === "Active"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                    }`}
                                >
                                    {employee.status}
                                </span>
                            </div>

                        </div>

                        {isEditing ? (

                            <div className="space-y-4">

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Employee Name
                                    </label>

                                    <input
                                        type="text"
                                        value={formData.employeeName}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            employeeName: e.target.value
                                        })}
                                        className={inputClass}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            email: e.target.value
                                        })}
                                        className={inputClass}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number
                                    </label>

                                    <input
                                        type="tel"
                                        value={formData.phoneNumber}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            phoneNumber: e.target.value
                                        })}
                                        className={inputClass}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Department
                                    </label>

                                    <select
                                        value={formData.department}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            department: e.target.value
                                        })}
                                        className={inputClass}
                                        required
                                    >
                                        <option value="">Select Department</option>
                                        <option value="Engineering">Engineering</option>
                                        <option value="Human Resources">Human Resources</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Sales">Sales</option>
                                        <option value="Finance">Finance</option>
                                        <option value="Design">Design</option>
                                        <option value="Operations">Operations</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Designation
                                    </label>

                                    <input
                                        type="text"
                                        value={formData.designation}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            designation: e.target.value
                                        })}
                                        className={inputClass}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Joining Date
                                    </label>

                                    <input
                                        type="date"
                                        value={formData.joiningDate}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            joiningDate: e.target.value
                                        })}
                                        className={inputClass}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Employee Status
                                    </label>

                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            status: e.target.value
                                        })}
                                        className={inputClass}
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>

                            </div>

                        ) : (

                            <div className="space-y-4">

                                {details.map((item, index) => {

                                    const Icon = item.icon

                                    return (

                                        <div
                                            key={index}
                                            className="flex items-center gap-3"
                                        >

                                            <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                                                <Icon size={18} />
                                            </div>

                                            <div>
                                                <p className="text-xs text-gray-400">
                                                    {item.label}
                                                </p>

                                                <p className="text-sm font-medium text-gray-800">
                                                    {item.value || "N/A"}
                                                </p>
                                            </div>

                                        </div>

                                    )

                                })}

                            </div>

                        )}

                    </div>

                    <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 flex flex-wrap justify-between gap-3">

                        {isEditing ? (

                            <>
                                <button
                                    type="button"
                                    disabled={loading}
                                    onClick={() => setIsEditing(false)}
                                    className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-100 transition disabled:opacity-50"
                                >
                                    <XCircle size={17} />
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition disabled:opacity-50"
                                >
                                    <Save size={17} />
                                    {loading ? "Saving..." : "Save Changes"}
                                </button>
                            </>

                        ) : (

                            <>
                                <button
                                    type="button"
                                    disabled={loading}
                                    onClick={handleDelete}
                                    className="flex items-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-sm font-medium transition disabled:opacity-50"
                                >
                                    <Trash2 size={17} />
                                    {loading ? "Deleting..." : "Delete"}
                                </button>

                                <div className="flex gap-2">

                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-100 transition"
                                    >
                                        Close
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition"
                                    >
                                        <Pencil size={17} />
                                        Update
                                    </button>

                                </div>
                            </>

                        )}

                    </div>

                </form>

            </div>

        </div>
    )
}

export default EmployeeDetailsModal

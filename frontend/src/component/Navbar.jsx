
import { Users, LayoutDashboard, UserPlus, Bell } from "lucide-react"

function Navbar() {

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">

            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                
                <div className="flex items-center gap-3">

                    <div className="bg-blue-600 p-2 rounded-xl">
                        <Users className="text-white" size={23} />
                    </div>

                    <div>
                        <h1 className="text-xl font-bold text-gray-900">
                            Employify
                        </h1>
                        <p className="text-xs text-gray-500">
                            Employee Management
                        </p>
                    </div>

                </div>

               
                <div className="hidden md:flex items-center gap-8">

                    <a
                        href="/"
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold"
                    >
                        <LayoutDashboard size={18} />
                        Dashboard
                    </a>

                    <a
                        href="/addEmployee"
                        className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition"
                    >
                        <Users size={18} />
                        Employees
                    </a>

                </div>

                
                <div className="flex items-center gap-4">


                    <div className="flex items-center gap-3 border-l pl-4">

                        <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold">
                            A
                        </div>

                        <div className="hidden sm:block">
                            <p className="text-sm font-semibold text-gray-800">
                                Admin
                            </p>
                            <p className="text-xs text-gray-500">
                                Administrator
                            </p>
                        </div>

                    </div>

                </div>

            </div>

        </nav>
    )
}

export default Navbar

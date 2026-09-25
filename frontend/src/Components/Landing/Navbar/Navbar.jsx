import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import Logo from "../../../assets/Logo.jpeg";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    const navItems = [
        { name: "Courses" },
        { name: "Career Path" },
        { name: "Instructors" },
        { name: "Exams" },
        { name: "Pricing" },
        { name: "Contact Us" },
    ];

    const handleNavigation = (path) => {
        navigate(path);
        setMenuOpen(false);
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md shadow-sm">
            <div className="mx-auto flex h-[76px] max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-10">
                <div
                    onClick={() => navigate("/")}
                    className="group flex cursor-pointer items-center gap-3"
                >
                    <div className="overflow-hidden rounded-xl transition-all duration-300 group-hover:scale-105 group-hover:rotate-2">
                        <img
                            src={Logo}
                            alt="CodeSphere"
                            className="h-15 w-15 object-cover"
                        />
                    </div>
                    <div className="hidden sm:block">
                        <h1 className="text-xl font-extrabold tracking-tight text-gray-900 transition-colors duration-300 group-hover:text-[#0C6A12]">
                            CodeSphere
                        </h1>
                        <p className="text-[9px] font-medium tracking-[0.15em] text-gray-500">
                            LEARN • BUILD • GROW
                        </p>
                    </div>
                </div>
                <ul className="hidden items-center gap-6 lg:flex xl:gap-8">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <button
                                onClick={() => handleNavigation(item.path)}
                                className="group relative py-2 text-sm font-semibold text-gray-600 transition-colors duration-300 hover:text-[#0C6A12]"
                            >
                                {item.name}
                                <span className="absolute bottom-0 left-0 h-[2px] w-0 rounded-full bg-[#0C6A12] transition-all duration-300 group-hover:w-full" />
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="hidden items-center gap-3 md:flex">
                    <div
                        className={`flex items-center overflow-hidden rounded-full border border-gray-200 bg-gray-50 transition-all duration-300 ${searchOpen
                                ? "w-48 border-[#0C6A12] bg-white"
                                : "w-10 border-transparent bg-transparent"
                            }`}
                    >
                        <button
                            onClick={() => setSearchOpen(!searchOpen)}
                            className="flex h-10 min-w-10 items-center justify-center text-gray-600 transition-colors hover:text-[#0C6A12]"
                        >
                            <Search size={19} />
                        </button>

                        <input
                            type="text"
                            placeholder="Search..."
                            className={`w-full bg-transparent pr-3 text-sm outline-none ${searchOpen ? "block" : "hidden"
                                }`}
                        />
                    </div>

                    <button
                        onClick={() => navigate("/login")}
                        className="rounded-lg border border-[#0C6A12] px-5 py-2.5 text-sm font-semibold text-[#0C6A12] transition-all duration-300 hover:bg-[#0C6A12] hover:text-white hover:shadow-md"
                    >
                        Login
                    </button>

                    <button
                        onClick={() => navigate("/signup")}
                        className="rounded-lg bg-[#0C6A12] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#09530e] hover:shadow-lg"
                    >
                        Sign Up
                    </button>
                </div>

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-gray-100 hover:text-[#0C6A12] md:hidden"
                >
                    {menuOpen ? <X size={25} /> : <Menu size={25} />}
                </button>

            </div>
            <div
                className={`overflow-hidden border-t border-gray-100 bg-white transition-all duration-300 md:hidden ${menuOpen
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
            >
                <div className="px-5 pb-6 pt-4">
                    <div className="mb-4 flex items-center rounded-lg border border-gray-200 bg-gray-50 px-3">
                        <Search size={18} className="text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-transparent px-3 py-3 text-sm outline-none"
                        />
                    </div>
                    <div className="flex flex-col">
                        {navItems.map((item, index) => (
                            <button
                                key={item.name}
                                className="group flex items-center justify-between border-b border-gray-100 py-3 text-left text-sm font-semibold text-gray-600 transition-all duration-200 hover:pl-2 hover:text-[#0C6A12]"
                                style={{
                                    transitionDelay: `${index * 30}ms`,
                                }}
                            >
                                {item.name}
                                <span className="text-gray-300 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#0C6A12]">
                                    →
                                </span>
                            </button>
                        ))}
                    </div>
                    <div className="mt-5 flex gap-3">
                        <button
                            onClick={() => handleNavigation("/login")}
                            className="flex-1 rounded-lg border border-[#0C6A12] py-3 text-sm font-semibold text-[#0C6A12] transition-all hover:bg-[#0C6A12] hover:text-white"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => handleNavigation("/signup")}
                            className="flex-1 rounded-lg bg-[#0C6A12] py-3 text-sm font-semibold text-white transition-all hover:bg-[#09530e]"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
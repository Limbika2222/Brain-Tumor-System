import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
const Sidebar = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        }
        catch (error) {
            console.error("Failed to log out:", error);
        }
    };
    return (_jsxs("aside", { className: "w-64 bg-gray-900 text-gray-100 flex flex-col justify-between p-6", children: [_jsxs("div", { children: [_jsxs("div", { className: "text-center mb-6", children: [_jsx("div", { className: "w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2", children: _jsx("i", { className: "fas fa-user text-2xl text-white" }) }), _jsx("h2", { className: "text-xl font-bold text-white", children: "Profile" }), currentUser && (_jsx("p", { className: "text-gray-400 text-xs mt-1 truncate px-2", children: currentUser.email })), _jsx("p", { className: "text-green-400 text-sm mt-1", children: "Online" })] }), _jsx("nav", { children: _jsxs("ul", { className: "space-y-2", children: [_jsx("li", { children: _jsxs(Link, { to: "/", className: "flex items-center gap-3 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-all", children: [_jsx("i", { className: "fas fa-home" }), " Home"] }) }), _jsx("li", { children: _jsxs(Link, { to: "/dashboard", className: "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 hover:text-white transition-all", children: [_jsx("i", { className: "fas fa-info-circle" }), " Dashboard"] }) }), _jsx("li", { children: _jsxs("a", { href: "#", className: "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 hover:text-white transition-all", children: [_jsx("i", { className: "fas fa-stethoscope" }), " Patient Records"] }) }), _jsx("li", { children: _jsxs("a", { href: "#", className: "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 hover:text-white transition-all", children: [_jsx("i", { className: "fas fa-user-md" }), " Doctors"] }) }), _jsx("li", { children: _jsxs("a", { href: "#", className: "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 hover:text-white transition-all", children: [_jsx("i", { className: "fas fa-envelope" }), " Emergency Contact"] }) })] }) })] }), _jsxs("div", { className: "mt-auto border-t border-gray-700 pt-4", children: [_jsxs("button", { onClick: handleLogout, className: "w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-all mb-4", children: [_jsx("i", { className: "fas fa-sign-out-alt" }), "Sign Out"] }), _jsxs("div", { className: "border-t border-gray-700 pt-4", children: [_jsx("h4", { className: "text-lg font-semibold mb-2", children: "Subscribe for updates" }), _jsxs("form", { className: "flex flex-col gap-2", children: [_jsx("input", { type: "email", placeholder: "Your email", className: "px-3 py-2 rounded bg-gray-800 border border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500", required: true }), _jsx("button", { type: "submit", className: "bg-blue-600 hover:bg-blue-700 transition text-white px-3 py-2 rounded text-sm font-semibold", children: "Subscribe" })] }), _jsx("p", { className: "text-gray-500 text-xs mt-4", children: "\u00A9 2025 Medical Assistant" })] })] })] }));
};
export default Sidebar;

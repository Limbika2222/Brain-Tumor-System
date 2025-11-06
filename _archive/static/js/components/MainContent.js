import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
const MainContent = () => {
    const navigate = useNavigate();
    const { userData, loading } = useAuth();
    // Get user's name or fallback to email or "User"
    const displayName = userData?.name || userData?.email?.split('@')[0] || 'User';
    return (_jsxs("main", { className: "flex flex-1 items-center justify-between px-12 py-10", children: [_jsxs("div", { className: "max-w-xl", children: [_jsxs("h2", { className: "text-4xl font-bold mb-4", children: [_jsx("span", { className: "text-orange-500", children: "Hello:" }), _jsxs("span", { className: "text-blue-600", children: [" ", loading ? '...' : displayName] })] }), _jsx("p", { className: "text-gray-600 mb-6", children: "Collect complete patient data and upload relevant diagnostic images (MRI/CT) for intelligent analysis." }), _jsx("button", { className: "bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow-lg", children: "Patient Diagnosis" }), _jsxs("div", { className: "mt-10 p-6 bg-gray-100 rounded-xl shadow flex items-start gap-4", children: [_jsx("div", { className: "text-blue-600 text-3xl font-bold", children: "+" }), _jsxs("div", { children: [_jsx("h4", { className: "text-lg font-semibold text-gray-800", children: "Manual Diagnosis" }), _jsx("p", { className: "text-gray-600 mb-3", children: "Upload the MRI image to perform a Manual Diagnosis." }), _jsx("button", { onClick: () => navigate("/test"), className: "bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow-lg", children: "Patient Diagnosis" })] })] })] }), _jsx("div", { children: _jsx("img", { src: "/images/doctor-illustration.png", alt: "Doctor", className: "w-96" }) })] }));
};
export default MainContent;

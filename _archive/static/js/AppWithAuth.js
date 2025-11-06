import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// Import auth components
import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgotPassword";
import ProtectedRoute from "./components/auth/ProtectedRoute";
// Import your existing components
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import TestForm from "./components/TestForm";
import UploadPage from "./components/UploadPage";
import ResultPage from "./components/Result";
import Dashboard from "./components/Dashboard";
const AppWithAuth = () => {
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/forgot-password", element: _jsx(ForgotPassword, {}) }), _jsx(Route, { path: "/", element: _jsx(ProtectedRoute, { children: _jsxs("div", { className: "flex bg-gray-100 min-h-screen text-gray-800", children: [_jsx(Sidebar, {}), _jsxs("div", { className: "flex-1 flex flex-col", children: [_jsx(Header, {}), _jsx("div", { className: "flex-1 p-6", children: _jsx(MainContent, {}) })] })] }) }) }), _jsx(Route, { path: "/test", element: _jsx(ProtectedRoute, { children: _jsxs("div", { className: "flex bg-gray-100 min-h-screen text-gray-800", children: [_jsx(Sidebar, {}), _jsxs("div", { className: "flex-1 flex flex-col", children: [_jsx(Header, {}), _jsx("div", { className: "flex-1 p-6", children: _jsx(TestForm, {}) })] })] }) }) }), _jsx(Route, { path: "/upload", element: _jsx(ProtectedRoute, { children: _jsxs("div", { className: "flex bg-gray-100 min-h-screen text-gray-800", children: [_jsx(Sidebar, {}), _jsxs("div", { className: "flex-1 flex flex-col", children: [_jsx(Header, {}), _jsx("div", { className: "flex-1 p-6", children: _jsx(UploadPage, {}) })] })] }) }) }), _jsx(Route, { path: "/result", element: _jsx(ProtectedRoute, { children: _jsxs("div", { className: "flex bg-gray-100 min-h-screen text-gray-800", children: [_jsx(Sidebar, {}), _jsxs("div", { className: "flex-1 flex flex-col", children: [_jsx(Header, {}), _jsx("div", { className: "flex-1 p-6", children: _jsx(ResultPage, {}) })] })] }) }) }), _jsx(Route, { path: "/dashboard", element: _jsx(ProtectedRoute, { children: _jsxs("div", { className: "flex bg-gray-100 min-h-screen text-gray-800", children: [_jsx(Sidebar, {}), _jsxs("div", { className: "flex-1 flex flex-col", children: [_jsx(Header, {}), _jsx("div", { className: "flex-1 p-6", children: _jsx(Dashboard, {}) })] })] }) }) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/", replace: true }) })] }) }));
};
export default AppWithAuth;

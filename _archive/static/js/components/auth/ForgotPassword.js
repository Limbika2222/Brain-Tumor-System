import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { resetPassword } = useAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            setError('Please enter your email address');
            return;
        }
        try {
            setError('');
            setMessage('');
            setLoading(true);
            await resetPassword(email);
            setMessage('Check your inbox for further instructions');
        }
        catch (err) {
            setError(err.message || 'Failed to reset password');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100", children: _jsxs("div", { className: "bg-white p-8 rounded-lg shadow-xl w-full max-w-md", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-800 mb-2", children: "\uD83D\uDD10 Reset Password" }), _jsx("p", { className: "text-gray-600", children: "Enter your email to reset your password" })] }), error && (_jsx("div", { className: "bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4", children: error })), message && (_jsx("div", { className: "bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4", children: message })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700 mb-2", children: "Email Address" }), _jsx("input", { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent", placeholder: "Enter your email", required: true })] }), _jsx("button", { type: "submit", disabled: loading, className: "w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors", children: loading ? 'Sending...' : 'Send Reset Link' })] }), _jsx("div", { className: "mt-6 text-center space-y-2", children: _jsx(Link, { to: "/login", className: "block text-sm text-blue-600 hover:text-blue-800 font-semibold", children: "\u2190 Back to Login" }) })] }) }));
};
export default ForgotPassword;

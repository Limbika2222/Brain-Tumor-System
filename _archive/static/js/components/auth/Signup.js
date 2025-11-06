import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
const Signup = () => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup, currentUser, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    // Redirect if already logged in
    useEffect(() => {
        if (!authLoading && currentUser) {
            navigate('/', { replace: true });
        }
    }, [currentUser, authLoading, navigate]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !mobile || !email || !password || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }
        // Basic mobile validation
        const mobileRegex = /^[0-9]{10,15}$/;
        if (!mobileRegex.test(mobile.replace(/\s+/g, ''))) {
            setError('Please enter a valid mobile number (10-15 digits)');
            return;
        }
        try {
            setError('');
            setLoading(true);
            console.log('Starting signup process...');
            await signup(email, password, {
                name,
                mobile: mobile.replace(/\s+/g, ''),
                email,
                createdAt: new Date().toISOString()
            });
            console.log('Signup successful, redirecting...');
            navigate('/'); // Redirect to main app after successful signup
        }
        catch (err) {
            console.error('Signup error in component:', err);
            setError(err.message || 'Failed to create account');
        }
        finally {
            setLoading(false);
        }
    };
    // Show loading while checking auth state
    if (authLoading) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-100", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4" }), _jsx("p", { className: "text-gray-600", children: "Loading..." })] }) }));
    }
    // Don't render signup form if already authenticated (will redirect)
    if (currentUser) {
        return null;
    }
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8 sm:px-6 lg:px-8", children: _jsx("div", { className: "w-full max-w-2xl", children: _jsxs("div", { className: "bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4 shadow-md", children: _jsx("i", { className: "fas fa-brain text-white text-3xl" }) }), _jsx("h1", { className: "text-3xl font-bold text-gray-800 mb-2", children: "Create Account" }), _jsx("p", { className: "text-gray-600", children: "Sign up to get started with Brain Tumor Detection System" })] }), error && (_jsxs("div", { className: "bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-6 flex items-start gap-3", children: [_jsx("i", { className: "fas fa-exclamation-circle mt-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "Error" }), _jsx("p", { className: "text-sm", children: error })] })] })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [_jsxs("div", { className: "grid md:grid-cols-2 gap-5", children: [_jsxs("div", { children: [_jsxs("label", { htmlFor: "name", className: "block text-sm font-semibold text-gray-700 mb-2", children: ["Full Name ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx("i", { className: "fas fa-user text-gray-400" }) }), _jsx("input", { id: "name", type: "text", value: name, onChange: (e) => setName(e.target.value), className: "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none", placeholder: "Enter your full name", required: true })] })] }), _jsxs("div", { children: [_jsxs("label", { htmlFor: "mobile", className: "block text-sm font-semibold text-gray-700 mb-2", children: ["Mobile Number ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx("i", { className: "fas fa-phone text-gray-400" }) }), _jsx("input", { id: "mobile", type: "tel", value: mobile, onChange: (e) => setMobile(e.target.value.replace(/\D/g, '')), className: "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none", placeholder: "Enter your mobile number", required: true })] })] })] }), _jsxs("div", { children: [_jsxs("label", { htmlFor: "email", className: "block text-sm font-semibold text-gray-700 mb-2", children: ["Email Address ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx("i", { className: "fas fa-envelope text-gray-400" }) }), _jsx("input", { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), className: "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none", placeholder: "Enter your email address", required: true })] })] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-5", children: [_jsxs("div", { children: [_jsxs("label", { htmlFor: "password", className: "block text-sm font-semibold text-gray-700 mb-2", children: ["Password ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx("i", { className: "fas fa-lock text-gray-400" }) }), _jsx("input", { id: "password", type: "password", value: password, onChange: (e) => setPassword(e.target.value), className: "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none", placeholder: "Min. 6 characters", required: true })] })] }), _jsxs("div", { children: [_jsxs("label", { htmlFor: "confirmPassword", className: "block text-sm font-semibold text-gray-700 mb-2", children: ["Confirm Password ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx("i", { className: "fas fa-lock text-gray-400" }) }), _jsx("input", { id: "confirmPassword", type: "password", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), className: "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none", placeholder: "Confirm your password", required: true })] })] })] }), _jsx("div", { className: "pt-2", children: _jsx("button", { type: "submit", disabled: loading, className: "w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2", children: loading ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "animate-spin rounded-full h-5 w-5 border-b-2 border-white" }), _jsx("span", { children: "Creating account..." })] })) : (_jsxs(_Fragment, { children: [_jsx("i", { className: "fas fa-user-plus" }), _jsx("span", { children: "Create Account" })] })) }) })] }), _jsx("div", { className: "mt-8 pt-6 border-t border-gray-200", children: _jsxs("p", { className: "text-center text-sm text-gray-600", children: ["Already have an account?", ' ', _jsx(Link, { to: "/login", className: "font-semibold text-blue-600 hover:text-blue-800 transition-colors", children: "Sign in" })] }) })] }) }) }));
};
export default Signup;

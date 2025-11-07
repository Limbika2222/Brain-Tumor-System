import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Sidebar: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <aside className="w-64 bg-gray-900 text-gray-100 flex flex-col justify-between p-6">
      <div>
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
            <i className="fas fa-user text-2xl text-white"></i>
          </div>
          <h2 className="text-xl font-bold text-white">Profile</h2>
          {currentUser && (
            <p className="text-gray-400 text-xs mt-1 truncate px-2">
              {currentUser.email}
            </p>
          )}
          <p className="text-green-400 text-sm mt-1">Online</p>
        </div>

        <nav>
          <ul className="space-y-2">
            {[ 
              { to: "/", label: "Home", icon: "fa-home" },
              { to: "/test", label: "Test Form", icon: "fa-clipboard" },
              { to: "/upload", label: "Upload", icon: "fa-cloud-upload-alt" },
              { to: "/records", label: "Patient Records", icon: "fa-folder-open" },
            ].map((item) => {
              const isActive = location.pathname === item.to;
              const baseClasses = "flex items-center gap-3 px-4 py-2 rounded-lg transition-all";
              const activeClasses = "bg-blue-600 text-white shadow";
              const inactiveClasses = "hover:bg-gray-800 hover:text-white text-gray-200";

              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
                  >
                    <i className={`fas ${item.icon}`}></i> {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="mt-auto border-t border-gray-700 pt-4">
        {/* Sign Out Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-all mb-4"
        >
          <i className="fas fa-sign-out-alt"></i>
          Sign Out
        </button>

        <div className="border-t border-gray-700 pt-4">
          <h4 className="text-lg font-semibold mb-2">Subscribe for updates</h4>
          <form className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 rounded bg-gray-800 border border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 transition text-white px-3 py-2 rounded text-sm font-semibold"
            >
              Subscribe
            </button>
          </form>
          <p className="text-gray-500 text-xs mt-4">© 2025 Medical Assistant</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

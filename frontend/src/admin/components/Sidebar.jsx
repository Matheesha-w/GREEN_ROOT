import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Home, Users, Folder, Calendar, BarChart, Settings } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <Home className="w-6 h-6" />, link: "/admin/:id/dashboard" },
    { name: "Users", icon: <Users className="w-6 h-6" />, link: "/admin/user-management" },
    { name: "Questions", icon: <Folder className="w-6 h-6" />, link: "/admin/question-dash" },
    { name: "Calendar", icon: <Calendar className="w-6 h-6" />, link: "/admin/calendar" },
    { name: "Reports", icon: <BarChart className="w-6 h-6" />, link: "/admin/report-dash" },
    { name: "Settings", icon: <Settings className="w-6 h-6" />, link: "/admin/settings" },
  ];

  return (
    <aside className={`h-screen bg-white border-r border-gray-200 fixed left-0 top-0 ${isOpen ? "w-56" : "w-20"} transition-all duration-300`}>
      {/* Toggle Button */}
      <div className="p-4 flex justify-end">
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col items-center mt-4 space-y-3">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className="flex items-center w-full p-3 hover:bg-gray-100 rounded-lg text-gray-600"
          >
            {item.icon}
            {isOpen && <span className="ml-3">{item.name}</span>}
          </Link>
        ))}
      </nav>

      {/* User Profile */}
      <div className="mt-auto p-4">
        <button className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="User"
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

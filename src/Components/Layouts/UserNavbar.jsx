import { Link } from "react-router-dom";

const UserNavbar = () => {
  return (
    <nav className="backdrop-blur-md bg-orange-50 shadow-sm shadow-yellow-400 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl text-orange-950 font-bold">
              Techz DADA
            </span>
          </Link>

          {/* Navigation Links */}
          <div className=" md:flex items-center space-x-8">
            <Link
              to="/contact"
              className="bg-gradient-to-r from-orange-400 to-yellow-300 text-white px-4 py-2 rounded-full shadow-md text-sm font-semibold transition-all duration-200 hover:from-yellow-400 hover:to-orange-400 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;

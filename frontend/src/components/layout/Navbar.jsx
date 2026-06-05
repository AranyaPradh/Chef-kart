import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white text-gray-900 px-8 py-4 flex justify-between items-center border-b border-gray-200 shadow-sm">

      {/* Logo */}
      <h1 className="text-3xl font-bold text-purple-600">
        ChefVerse
      </h1>

      {/* Nav Links */}
      <ul className="hidden md:flex gap-8 text-lg font-medium">
        <li className="hover:text-purple-600 transition duration-200 cursor-pointer">
          <Link to="/">Home</Link>
        </li>

        <li className="hover:text-purple-600 transition duration-200 cursor-pointer">
          <Link to="/chefs">Chefs</Link>
        </li>

        <li className="hover:text-purple-600 transition duration-200 cursor-pointer">
          <Link to="/about">About</Link>
        </li>

        <li className="hover:text-purple-600 transition duration-200 cursor-pointer">
          <Link to="/contact">Contact</Link>
        </li>
      </ul>

      {/* Buttons */}
      <div className="flex gap-4">
        <button  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-200 font-medium">
          Login
        </button>

        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-200 font-medium">
          Signup
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
import { Link } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (
    <nav className="bg-blue-900 p-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <Link
          to="/"
          className="text-white text-2xl font-bold"
        >
          Nova Bank
        </Link>

        <div className="flex flex-wrap gap-4 items-center">
          <Link
            to="/"
            className="text-white font-semibold hover:text-gray-300"
          >
            Home
          </Link>

          {!token ? (
            <>
              <Link
                to="/login"
                className="text-white font-semibold hover:text-gray-300"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="text-white font-semibold hover:text-gray-300"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="text-white font-semibold hover:text-gray-300"
              >
                Dashboard
              </Link>

              <Link
                to="/deposit"
                className="text-white font-semibold hover:text-gray-300"
              >
                Deposit
              </Link>

              <Link
                to="/withdraw"
                className="text-white font-semibold hover:text-gray-300"
              >
                Withdraw
              </Link>

              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
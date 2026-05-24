import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* HERO SECTION */}
      <div className="bg-blue-900 text-white py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Welcome to Nova Bank
          </h1>

          <p className="text-xl mb-8">
            Secure, Fast and Modern Banking
            Experience.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              to="/register"
              className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="max-w-6xl mx-auto py-20 px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose Nova Bank?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold mb-4">
              Secure Banking
            </h3>

            <p className="text-gray-600">
              Your transactions and data are protected
              with secure authentication systems.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold mb-4">
              Fast Transfers
            </h3>

            <p className="text-gray-600">
              Send and receive money instantly with
              smooth banking operations.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold mb-4">
              Easy Management
            </h3>

            <p className="text-gray-600">
              Manage deposits, withdrawals and
              transactions effortlessly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
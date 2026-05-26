import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* HERO */}
      <section className="bg-blue-900 text-white py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Modern Banking
              <br />
              Made Simple.
            </h1>

            <p className="text-lg text-gray-200 mb-8">
              Transfer money, manage your account,
              deposit funds and track transactions
              securely with Nova Bank.
            </p>

            <div className="flex gap-4">
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

          {/* RIGHT CARD */}
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-blue-700 to-blue-500 p-8 rounded-3xl shadow-2xl w-full max-w-md">
              <p className="text-sm mb-10">
                Nova Premium Card
              </p>

              <h2 className="text-3xl font-bold mb-10">
                **** **** **** 2048
              </h2>

              <div className="flex justify-between">
                <div>
                  <p className="text-sm">Card Holder</p>
                  <h3 className="font-semibold">
                    Nova User
                  </h3>
                </div>

                <div>
                  <p className="text-sm">Expires</p>
                  <h3 className="font-semibold">
                    12/30
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-4xl font-bold text-blue-900 mb-2">
              10K+
            </h2>
            <p className="text-gray-600">
              Active Users
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-4xl font-bold text-blue-900 mb-2">
              ₦50M+
            </h2>
            <p className="text-gray-600">
              Transactions Processed
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-4xl font-bold text-blue-900 mb-2">
              99.9%
            </h2>
            <p className="text-gray-600">
              Secure Banking
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-14">
            Why Choose Nova Bank?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
              <h3 className="text-2xl font-semibold mb-4">
                Secure Banking
              </h3>

              <p className="text-gray-600">
                Advanced authentication and secure
                APIs protect your transactions and
                account.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
              <h3 className="text-2xl font-semibold mb-4">
                Fast Transfers
              </h3>

              <p className="text-gray-600">
                Instantly send money between users
                with seamless banking operations.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
              <h3 className="text-2xl font-semibold mb-4">
                Easy Management
              </h3>

              <p className="text-gray-600">
                Deposit, withdraw and manage your
                transactions effortlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-blue-900 text-white py-8 text-center">
        <p>
          © 2026 Nova Bank. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Home;
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [formData, setFormData] = useState({
    accountNumber: "",
    amount: "",
  });

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTransactions();
    refreshUser();
  }, []);

  // REFRESH USER
  const refreshUser = () => {
    const updatedUser = JSON.parse(
      localStorage.getItem("user")
    );

    setUser(updatedUser);
  };

  // FETCH TRANSACTIONS
  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://bank-app-lf5s.onrender.com/api/transactions/history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTransactions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE TRANSFER
  const handleTransfer = async (e) => {
    e.preventDefault();

    const amountNum = Number(formData.amount);

    // VALIDATION
    if (
      !formData.accountNumber ||
      !formData.amount ||
      isNaN(amountNum) ||
      amountNum <= 0
    ) {
      return alert(
        "Enter valid account number and amount"
      );
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://bank-app-lf5s.onrender.com/api/transactions/send",
        {
          accountNumber: formData.accountNumber,
          amount: amountNum,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      // UPDATE USER BALANCE
      const updatedUser = {
        ...user,
        balance: Number(user.balance) - amountNum,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      setUser(updatedUser);

      // RESET FORM
      setFormData({
        accountNumber: "",
        amount: "",
      });

      // REFRESH TRANSACTIONS
      fetchTransactions();

    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Transfer failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-blue-900">
            User Dashboard
          </h1>

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500"
          >
            Logout
          </button>
        </div>

        {/* USER CARD */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Welcome, {user?.name}
          </h2>

          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-semibold">
                Email:
              </span>{" "}
              {user?.email}
            </p>

            <p>
              <span className="font-semibold">
                Account Number:
              </span>{" "}
              {user?.accountNumber}
            </p>

            <p>
              <span className="font-semibold">
                Balance:
              </span>{" "}
              ₦{user?.balance}
            </p>

            <p>
              <span className="font-semibold">
                Role:
              </span>{" "}
              {user?.role}
            </p>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">

          <Link
            to="/deposit"
            className="bg-green-600 text-white p-6 rounded-xl shadow-md hover:bg-green-500 text-center text-xl font-semibold"
          >
            Deposit Money
          </Link>

          <Link
            to="/withdraw"
            className="bg-red-600 text-white p-6 rounded-xl shadow-md hover:bg-red-500 text-center text-xl font-semibold"
          >
            Withdraw Money
          </Link>

        </div>

        {/* SEND MONEY */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Send Money
          </h2>

          <form
            onSubmit={handleTransfer}
            className="space-y-4"
          >

            <input
              type="text"
              name="accountNumber"
              placeholder="Receiver Account Number"
              value={formData.accountNumber}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading
                ? "Processing..."
                : "Send Money"}
            </button>

          </form>
        </div>

        {/* TRANSACTION HISTORY */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-6">
            Transaction History
          </h2>

          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction._id}
                className="border rounded-lg p-4"
              >
                <p>
                  <span className="font-semibold">
                    Type:
                  </span>{" "}
                  {transaction.type}
                </p>

                <p>
                  <span className="font-semibold">
                    Amount:
                  </span>{" "}
                  ₦{transaction.amount}
                </p>

                <p>
                  <span className="font-semibold">
                    Receiver:
                  </span>{" "}
                  {transaction.receiver?.name || "N/A"}
                </p>

                <p>
                  <span className="font-semibold">
                    Date:
                  </span>{" "}
                  {new Date(
                    transaction.createdAt
                  ).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
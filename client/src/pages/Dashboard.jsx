import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    accountNumber: "",
    amount: "",
  });

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/transactions/history",
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTransfer = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/transactions/send",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      // update balance
      const updatedUser = {
        ...user,
        balance: user.balance - Number(formData.amount),
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      // clear form
      setFormData({
        accountNumber: "",
        amount: "",
      });

      // refresh transactions
      fetchTransactions();

      // refresh page
      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.message || "Transfer failed");
    }
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
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");

              window.location.href = "/login";
            }}
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
              <span className="font-semibold">Email:</span>{" "}
              {user?.email}
            </p>

            <p>
              <span className="font-semibold">
                Account Number:
              </span>{" "}
              {user?.accountNumber}
            </p>

            <p>
              <span className="font-semibold">Balance:</span>{" "}
              ₦{user?.balance}
            </p>

            <p>
              <span className="font-semibold">Role:</span>{" "}
              {user?.role}
            </p>
          </div>
        </div>
        {/* QUICK ACTIONS */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
  <a
    href="/deposit"
    className="bg-green-600 text-white p-6 rounded-xl shadow-md hover:bg-green-500 text-center text-xl font-semibold"
  >
    Deposit Money
  </a>

  <a
    href="/withdraw"
    className="bg-red-600 text-white p-6 rounded-xl shadow-md hover:bg-red-500 text-center text-xl font-semibold"
  >
    Withdraw Money
  </a>
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
              className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Send Money
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
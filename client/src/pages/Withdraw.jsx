import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Withdraw() {
  const [amount, setAmount] = useState("");

  const handleWithdraw = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/transactions/withdraw",
        {
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      const user = JSON.parse(localStorage.getItem("user"));

      const updatedUser = {
        ...user,
        balance: response.data.balance,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      setAmount("");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Withdrawal failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <Link
            to="/dashboard"
            className="text-blue-900 font-semibold hover:underline"
          >
            ← Dashboard
          </Link>

          <Link
            to="/deposit"
            className="text-green-600 font-semibold hover:underline"
          >
            Deposit
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-red-600 mb-6 text-center">
          Withdraw Money
        </h1>

        <form
          onSubmit={handleWithdraw}
          className="space-y-4"
        >
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border p-4 rounded-lg outline-none focus:border-red-600"
          />

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-4 rounded-lg hover:bg-red-500 transition"
          >
            Withdraw Funds
          </button>
        </form>
      </div>
    </div>
  );
}

export default Withdraw;
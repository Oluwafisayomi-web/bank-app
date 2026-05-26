import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Withdraw() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async (e) => {
    e.preventDefault();

    const amountNum = Number(amount);

    // 🛑 FRONTEND VALIDATION
    if (!amount || isNaN(amountNum) || amountNum <= 0) {
      return alert("Enter a valid amount greater than 0");
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.put(
        "https://bank-app-lf5s.onrender.com/api/transactions/withdraw",
        {
          amount: amountNum,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      // update user balance
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        
        {/* TOP NAVIGATION */}
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

        <h1 className="text-3xl font-bold text-blue-900 mb-6">
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
            className="w-full border p-3 rounded-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-500 disabled:opacity-50"
          >
            {loading
              ? "Processing..."
              : "Withdraw"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Withdraw;
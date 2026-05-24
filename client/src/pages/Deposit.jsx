import { useState } from "react";
import axios from "axios";

function Deposit() {
  const [amount, setAmount] = useState("");

  const handleDeposit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/transactions/deposit",
        // "http://localhost:5000/api/account/fund",
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

      // update local user balance
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
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">
          Deposit Money
        </h1>

        <form
          onSubmit={handleDeposit}
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
            className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Deposit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Deposit;
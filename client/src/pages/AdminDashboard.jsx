import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://bank-app-lf5s.onrender.com/api/admin/users",
        // "http://localhost:5000/api/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(

        `https://bank-app-lf5s.onrender.com/api/admin/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      fetchUsers();
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-900 mb-6">
          Admin Dashboard
        </h1>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-6">
            All Users
          </h2>

          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="border p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">
                    {user.name}
                  </p>

                  <p>{user.email}</p>

                  <p>
                    Account Number:{" "}
                    {user.accountNumber}
                  </p>

                  <p>Balance: ₦{user.balance}</p>

                  <p>Role: {user.role}</p>
                </div>

                <button
                  onClick={() => deleteUser(user._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
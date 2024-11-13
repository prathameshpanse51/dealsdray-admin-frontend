import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    f_userName: "",
    f_Pwd: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((currData) => {
      return { ...currData, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const incorrectMessage = document.getElementById("incorrect");
    incorrectMessage.style.display = "none";
    incorrectMessage.innerHTML = "";

    if (!formData.f_userName || !formData.f_Pwd) {
      incorrectMessage.innerHTML = "Fill in the details!";
      incorrectMessage.style.display = "block";
      setLoading(false);
      return;
    }

    if (formData.f_Pwd.length < 6) {
      incorrectMessage.innerHTML =
        "Password must be at least 6 characters long!";
      incorrectMessage.style.display = "block";
      setLoading(false);
      return;
    }

    try {
      const url = "https://dealsdray-admin-backend.onrender.com/";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      setLoading(false);
      if (response.status === 200) {
        const result = await response.json();
        sessionStorage.setItem("admin", "success");
        sessionStorage.setItem("adminName", formData.f_userName);
        navigate("/admindashboard");
        // window.location.pathname = "/admindashboard";
      } else if (response.status === 401) {
        const errorData = await response.json();
        incorrectMessage.innerHTML =
          errorData.message || "Incorrect username or password";
        incorrectMessage.style.display = "block";
      } else {
        setLoading(false);
        throw new Error("Unexpected error occurred");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      incorrectMessage.innerHTML = "Server error. Try again later.";
      incorrectMessage.style.display = "block";
    }
  };

  return (
    <>
      <div className="flex items-center min-h-screen p-4 bg-gray-100 justify-center">
        <div className="overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-lg">
          <h1 className="text-2xl md:text-3xl font-semibold text-center mt-3">
            DEALSDRAY
          </h1>
          <div className="p-5 bg-white md:flex-1">
            <h3 className="my-4 text-xl md:text-2xl font-semibold text-gray-700">
              Admin Login
            </h3>
            <form
              action=""
              onSubmit={handleSubmit}
              className="flex flex-col space-y-5"
            >
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="f_userName"
                  className="text-sm font-semibold text-gray-500"
                >
                  Username
                </label>
                <input
                  type="f_userName"
                  id="f_userName"
                  name="f_userName"
                  value={formData.f_userName}
                  onChange={handleChange}
                  autoFocus
                  className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="f_Pwd"
                    className="text-sm font-semibold text-gray-500"
                  >
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  id="f_Pwd"
                  name="f_Pwd"
                  value={formData.f_Pwd}
                  onChange={handleChange}
                  className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
              </div>
              <p id="incorrect" className="text-[#EE4B2B] hidden"></p>
              <div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                >
                  {loading ? (
                    <svg
                      aria-hidden="true"
                      role="status"
                      class="inline w-4 h-4 me-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                  ) : (
                    <>Log in</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useState } from "react";

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    f_userName: "",
    f_Pwd: "",
  });

  const handleChange = (e) => {
    setFormData((currData) => {
      return { ...currData, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const incorrectMessage = document.getElementById("incorrect");
    incorrectMessage.style.display = "none";
    incorrectMessage.innerHTML = "";

    if (!formData.f_userName || !formData.f_Pwd) {
      incorrectMessage.innerHTML = "Fill in the details!";
      incorrectMessage.style.display = "block";
      return;
    }

    if (formData.f_Pwd.length < 6) {
      incorrectMessage.innerHTML =
        "Password must be at least 6 characters long!";
      incorrectMessage.style.display = "block";
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

      if (response.status === 200) {
        const result = await response.json();
        sessionStorage.setItem("admin", "success");
        sessionStorage.setItem("adminName", formData.f_userName);
        window.location.pathname = "/admindashboard";
      } else if (response.status === 401) {
        const errorData = await response.json();
        incorrectMessage.innerHTML =
          errorData.message || "Incorrect username or password";
        incorrectMessage.style.display = "block";
      } else {
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
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

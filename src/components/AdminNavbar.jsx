import React from "react";
import { Link } from "react-router-dom";

export default function AdminNavbar() {
  if (sessionStorage.getItem("admin") !== "success") {
    window.location.href = "/";
  }
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <Link
            to="/admindashboard"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Dealsdray{" "}
            </span>
          </Link>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <p className=" dark:text-white text-xl font-semibold">
              {sessionStorage.getItem("adminName")}
            </p>
            <button
              onClick={() => {
                sessionStorage.removeItem("admin");
                sessionStorage.removeItem("adminName");
                window.location.replace("/");
              }}
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <nav className="bg-[#011522]">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
              <li>
                <Link
                  to="/admindashboard"
                  className="text-white hover:underline"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/createemployee"
                  className="text-white hover:underline"
                >
                  Create Employee
                </Link>
              </li>
              <li>
                <Link to="/employeelist" className="text-white hover:underline">
                  Employee List
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

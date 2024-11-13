import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  if (sessionStorage.getItem("admin") !== "success") {
    window.location.href = "/";
  }

  return (
    <>
      <main>
        <h1 className="text-center text-3xl md:text-5xl font-semibold my-6">
          Welcome Admin Panel
        </h1>

        <div className="flex flex-col gap-10 md:flex-row justify-center md:mt-20 mb-10">
          <Link
            to="/createemployee"
            className="card hover:transition hover:-translate-y-4 hover:duration-500"
          >
            <div>
              <div className="tools">
                <div className="circle">
                  <span className="red box"></span>
                </div>
                <div className="circle">
                  <span className="yellow box"></span>
                </div>
                <div className="circle">
                  <span className="green box"></span>
                </div>
              </div>
              <p className="text-white text-center my-16 text-3xl font-semibold">
                Create Employee
              </p>
              <div className="card__content"></div>
            </div>
          </Link>

          <Link
            to="/employeelist"
            className="card hover:transition hover:-translate-y-4 hover:duration-500"
          >
            <div>
              <div className="tools">
                <div className="circle">
                  <span className="red box"></span>
                </div>
                <div className="circle">
                  <span className="yellow box"></span>
                </div>
                <div className="circle">
                  <span className="green box"></span>
                </div>
              </div>
              <p className="text-white text-center my-16 text-3xl font-semibold">
                Employee List
              </p>
              <div className="card__content"></div>
            </div>
          </Link>
        </div>
      </main>
    </>
  );
}

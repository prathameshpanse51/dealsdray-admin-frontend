import React, { useEffect, useState, useMemo } from "react";

import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

export default function EmployeeList() {
  if (sessionStorage.getItem("admin") !== "success") {
    window.location.href = "/";
  }
  const [employeeList, setEmployeeList] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeList = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_FIREBASE_BACKEND_URL}/employeelist`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      setEmployeeList(result);
      setIsLoading(false);
    };
    fetchEmployeeList();
  }, []);

  const data = useMemo(() => employeeList, [employeeList]);

  /** @type import('@tanstack/react-table').ColumnDef<any> **/
  const columns = [
    {
      header: "ID",
      accessorFn: (row, index) => index + 1,
      id: "index",
      size: 1,
    },
    {
      header: "Image",
      accessorKey: "f_Image",
      Cell: ({ cell }) => (
        <img
          src={cell.getValue()}
          alt="Employee"
          style={{ width: "30px", height: "30px", borderRadius: "50%" }}
        />
      ),
      size: 5,
    },
    {
      header: "Name",
      accessorKey: "f_Name",
      size: 10,
    },
    {
      header: "Email",
      accessorKey: "f_Email",
      Cell: ({ cell }) => (
        <a
          href={`mailto:${cell.getValue()}`}
          target="_blank"
          className="underline text-blue-600"
        >
          {cell.getValue()}
        </a>
      ),
      size: 5,
    },
    {
      header: "Mobile No",
      accessorKey: "f_MobileNo",
      size: 5,
    },
    {
      header: "Designation",
      accessorKey: "f_Designation",
      size: 5,
    },
    {
      header: "Gender",
      accessorKey: "f_Gender",
      size: 5,
    },
    {
      header: "Course",
      accessorKey: "f_Course",
      size: 5,
    },
    {
      header: "Create Date",
      accessorKey: "f_CreateDate",
      size: 5,
    },
    {
      header: "Actions",
      id: "actions",
      Cell: ({ row }) => (
        <div className="flex gap-2">
          <Link
            to={`/${row.original._id}/edit`}
            className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 transition-all"
          >
            Edit
          </Link>
          <button
            onClick={() => {
              (document.getElementById("delete-modal").style.display = "flex"),
                setDeleteId(row.original._id);
            }}
            className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 transition-all"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleDelete = async (employeeId) => {
    try {
      const url = `${import.meta.env.VITE_FIREBASE_BACKEND_URL}/deleteemployee`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: employeeId }),
      });
      const result = await response.json();

      if (result.success) {
        setEmployeeList((prevList) =>
          prevList.filter((employee) => employee._id !== employeeId)
        );
      }
      document.getElementById("delete-modal").style.display = "none";
      const deleteToast = document.getElementById("delete-toast");
      deleteToast.style.display = "block";

      setTimeout(() => {
        deleteToast.style.display = "none";
      }, 3000);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const table = useMaterialReactTable({
    data,
    columns,
    isLoading,
  });

  return (
    <>
      <div className="hidden" id="delete-modal">
        <div
          id="popup-modal"
          tabIndex="-1"
          className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="popup-modal"
                onClick={() => {
                  document.getElementById("delete-modal").style.display =
                    "none";
                }}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    className="text-red-600"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete the employee?
                </h3>
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                  onClick={() => handleDelete(deleteId)}
                >
                  Yes, I'm sure
                </button>
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  onClick={() => {
                    document.getElementById("delete-modal").style.display =
                      "none";
                  }}
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center md:justify-end gap-4 md:mx-10 my-5">
        <p className="md:text-lg">
          Total count :{" "}
          <span className="font-semibold">{employeeList.length}</span>
        </p>
        <a
          href="/createemployee"
          data-modal-target="popup-modal"
          data-modal-toggle="popup-modal"
          className=" px-4 py-2 md:text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
        >
          Create Employee
        </a>
      </div>
      <main className="w-full relative flex justify-center">
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "300px",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <MaterialReactTable table={table} />
        )}
        <div id="delete-toast" className="hidden">
          <div
            id="toast-bottom-right toast-danger"
            className="z-50 absolute top-[-100px] md:top-[500px] md:right-[20px] flex items-center w-full max-w-xs p-4 mb-4 text-black font-bold bg-red-300 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
            role="alert"
          >
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
              </svg>
              <span className="sr-only">Error icon</span>
            </div>
            <div className="ms-3 text-sm font-semibold">
              Employee has been deleted.
            </div>
            <button
              type="button"
              className="ms-auto -mx-1.5 -my-1.5 bg-red-300 text-black hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5  inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
              data-dismiss-target="#toast-danger"
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

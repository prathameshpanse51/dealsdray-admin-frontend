import React, { useEffect, useState } from "react";
import { storage } from "./FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function CreateEmployee() {
  if (sessionStorage.getItem("admin") !== "success") {
    window.location.href = "/adminlogin";
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    designation: "",
    gender: "Male",
    course: "MCA",
    pic: "",
    createDate: `${new Date().getDate()}-${new Date().toLocaleString(
      "default",
      { month: "short" }
    )}-${new Date().getFullYear().toString().slice(-2)}`,
  });

  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {
    const errorElement = document.getElementById("incorrect");
    errorElement.classList.add("hidden");

    setLoading(true);
    const file = e.target.files[0];

    if (file) {
      const allowedExtensions = ["png", "jpg"];
      const fileExtension = file.name.split(".").pop().toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        errorElement.classList.remove("hidden");
        errorElement.innerHTML = "Please upload a .png or .jpg file.";
        errorElement.style.color = "#EE4B2B";
        setLoading(false);
        return;
      }

      const imageRef = ref(storage, file.name);

      uploadBytes(imageRef, file, "dealsdray")
        .then(() => {
          getDownloadURL(imageRef).then((url) => {
            setFormData((currData) => {
              return { ...currData, [e.target.name]: url };
            });
            setLoading(false);
          });
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          setLoading(false);
        });
    }
  };

  const handleChange = (e) => {
    setFormData((currData) => {
      return { ...currData, [e.target.name]: e.target.value };
    });
  };

  const popUp = () => {
    document.getElementById("popup-modal").style.display = "block";
  };

  const close = () => {
    document.getElementById("popup-modal").style.display = "none";
    window.location.pathname = "/admindashboard";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorElement = document.getElementById("incorrect");
    errorElement.classList.add("hidden");

    try {
      const response = await fetch("http://localhost:3000/createemployee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (response.ok) {
        errorElement.classList.remove("hidden");
        errorElement.innerHTML = "Form submitted successfully!";
        errorElement.style.color = "green";
        popUp();
      } else {
        errorElement.classList.remove("hidden");
        errorElement.innerHTML = result.message;
        errorElement.style.color = "#EE4B2B";
      }
    } catch (error) {
      console.error("Error during submission:", error);
      errorElement.classList.remove("hidden");
      errorElement.innerHTML = "Error occurred while submitting the form";
      errorElement.style.color = "#EE4B2B";
    }
  };

  return (
    <>
      <div
        id="popup-modal"
        tabIndex="-1"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center m-auto w-[80%] md:w-full max-h-full"
        style={{
          backdropFilter: "saturate(100%) blur(0.2rem)",
          zIndex: "999",
        }}
      >
        <div className="relative m-auto h-[100vh] py-14 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              onClick={close}
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
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
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width={35}
                height={35}
                className="m-auto"
              >
                <path
                  fill="green"
                  d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
                />
              </svg>
              <h3 className="my-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Employee Added!{" "}
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center min-h-screen p-4 bg-gray-100 justify-center">
        <div className="overflow-hidden w-[100vh] bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-sm">
          <p className="text-end mt-2">
            <a
              href="/admindashboard"
              className="mr-4 text-[#EE4B2B] font-semibold text-base"
            >
              Back
            </a>
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold text-center">
            Create Employee
          </h1>
          <div className="p-5 bg-white md:flex-1">
            <form
              action=""
              onSubmit={handleSubmit}
              className="flex flex-col space-y-5"
            >
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-gray-500"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter Name"
                  value={formData.name}
                  onChange={handleChange}
                  autoFocus
                  className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-gray-500"
                  >
                    Email
                  </label>
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="mobileNo"
                    className="text-sm font-semibold text-gray-500"
                  >
                    Mobile No
                  </label>
                </div>
                <input
                  type="number"
                  id="mobileNo"
                  name="mobileNo"
                  placeholder="Enter Mobile No"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="designation"
                    className="text-sm font-semibold text-gray-500"
                  >
                    Designation
                  </label>
                </div>

                <select
                  id="designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                >
                  <option value="">Choose a Designation</option>
                  <option value="HR">HR</option>
                  <option value="Manager">Manager</option>
                  <option value="Sales">Sales</option>
                </select>
              </div>
              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="gender"
                    className="text-sm font-semibold text-gray-500"
                  >
                    Gender
                  </label>
                </div>
                <div className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200">
                  <input
                    id="bordered-radio-1"
                    type="radio"
                    name="gender"
                    value="Male" // Set specific value for Male
                    checked={formData.gender === "Male"} // Dynamically check based on formData
                    onChange={handleChange}
                    className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="bordered-radio-1"
                    className="cursor-pointer w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Male
                  </label>
                </div>

                <div className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200">
                  <input
                    id="bordered-radio-2"
                    type="radio"
                    name="gender"
                    value="Female" // Set specific value for Female
                    checked={formData.gender === "Female"} // Dynamically check based on formData
                    onChange={handleChange}
                    className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="bordered-radio-2"
                    className="cursor-pointer w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Female
                  </label>
                </div>
              </div>
              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="course"
                    className="text-sm font-semibold text-gray-500"
                  >
                    Course
                  </label>
                </div>

                <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                    <div className="flex items-center ps-3">
                      <input
                        id="vue-checkbox"
                        type="checkbox"
                        name="course"
                        value="MCA"
                        checked={formData.course.includes("MCA")}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="vue-checkbox"
                        className="cursor-pointer w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        MCA
                      </label>
                    </div>
                  </li>
                  <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                    <div className="flex items-center ps-3">
                      <input
                        id="react-checkbox"
                        type="checkbox"
                        name="course"
                        value="BCA"
                        checked={formData.course.includes("BCA")}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="react-checkbox"
                        className="cursor-pointer w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        BCA
                      </label>
                    </div>
                  </li>
                  <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                    <div className="flex items-center ps-3">
                      <input
                        id="angular-checkbox"
                        type="checkbox"
                        name="course"
                        value="BSC"
                        checked={formData.course.includes("BSC")}
                        onChange={handleChange}
                        className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="angular-checkbox"
                        className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        BSC
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="pic"
                    className="text-sm font-semibold text-gray-500"
                  >
                    Image Upload
                  </label>
                </div>

                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="pic"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    {loading ? (
                      <>
                        <button
                          disabled
                          type="button"
                          className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900  rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
                        >
                          <svg
                            aria-hidden="true"
                            role="status"
                            className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="#1C64F2"
                            />
                          </svg>
                          Uploading...
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          {formData.pic ? (
                            <a
                              className="hover:underline text-blue-600"
                              href={formData.pic}
                              target="_blank"
                            >
                              Preview Image
                            </a>
                          ) : (
                            <>
                              <svg
                                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                              </svg>
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                PNG or JPG
                              </p>
                            </>
                          )}
                        </div>
                        <input
                          id="pic"
                          type="file"
                          className="hidden"
                          name="pic"
                          // value={formData.pic}
                          onChange={handleImage}
                        />
                      </>
                    )}
                  </label>
                </div>
              </div>
              <p id="incorrect" className="text-[#EE4B2B] hidden">
                Enter all the detials
              </p>
              <div>
                <button
                  data-modal-target="popup-modal"
                  data-modal-toggle="popup-modal"
                  type="submit"
                  disabled={loading ? true : false}
                  className={
                    loading
                      ? "cursor-not-allowed w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                      : "w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                  }
                >
                  Add Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

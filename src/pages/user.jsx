
import React from "react";
import Sidebar from "../components/sidebar";
import { MdModeEditOutline } from "react-icons/md";

const User = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <div className="p-8 w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Setting</h1>
          <div className="flex items-center space-x-4">
            <img
              src="https://via.placeholder.com/40"
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
            <span className="font-semibold">Maksudur</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="font-semibold mb-2">Your Profile</h2>
            <div className="flex items-center space-x-4">
              <img
                src="https://via.placeholder.com/50"
                alt="profile"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold">Maksudur Rahman</h3>
                <p className="text-gray-500 text-sm">+880 1924699597</p>
              </div>
              <MdModeEditOutline className="text-gray-500 hover:text-indigo-600 cursor-pointer" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="font-semibold mb-2">Address</h2>
            <p className="text-gray-700 mb-1">
              <span className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full text-xs">
                Primary
              </span>{" "}
              119 North Jatrabair, Dhaka 1294, Bangladesh
            </p>
            <p className="text-gray-700">420 Fariada Palace, Pallibiddut Road, Patuakhali</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md col-span-2">
            <h2 className="font-semibold mb-2">Emails</h2>
            <p className="text-gray-700 mb-2">
              <span className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full text-xs">
                Primary
              </span>{" "}
              maksud.design7@gmail.com
            </p>
            <p className="text-gray-700">tamannamr7@gmail.com</p>
            <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              Add Email
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="font-semibold mb-2">Phone Numbers</h2>
            <p className="text-gray-700 mb-1">
              <span className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full text-xs">
                Primary
              </span>{" "}
              +880 19246 99597
            </p>
            <p className="text-gray-700">+880 17578 41420</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="font-semibold mb-2">Account Options</h2>
            <p className="text-gray-700">
              <strong>Language:</strong> Bangla
            </p>
            <p className="text-gray-700">
              <strong>Time zone:</strong> (GMT+6) Time in Bangladesh
            </p>
            <p className="text-gray-700">
              <strong>Nationality:</strong> Bangladeshi
            </p>
            <p className="text-gray-700">
              <strong>Merchant ID:</strong> XYZ20150403095
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;

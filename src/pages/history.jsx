import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import { FaSearch } from "react-icons/fa";
import AdminTable from "../components/AdminTable";

function History() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterStatus = (status) => {
    setFilterStatus(status);
  };

  return (
    <div className="dashboard flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex flex-col p-4 w-full lg:w-4/5">
        <h2 className="text-3xl font-bold text-gray-700 mb-4">History</h2>

        <div className="flex justify-start p-4">
          <div className="bg-white flex items-center w-[300px] max-w-md shadow-sm border-2 rounded-2xl shadow-sm px-4 py-1">
            <FaSearch className="text-gray-400 mr-3 text-xl" size={19} />
            <input
              type="text"
              placeholder="Search History..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 w-full border-none p-1"
            />
          </div>
        </div>

        <div className="flex items-center mb-5">
          {["All", "Approved", "Rejected"].map((status) => (
            <button
              key={status}
              type="button"
              className={`py-2 w-[110px] px-2 rounded-lg hover:cursor-pointer ${filterStatus === status ? "bg-[#dbeafe] text-[#2563eb] border border-[#2563eb]" : "bg-white text-black hover:bg-[#2563eb] hover:text-white"} mr-5`}
              onClick={() => handleFilterStatus(status)}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="flex flex-col bg-white mb-5 px-7 pb-4 rounded-lg w-[1200px] shadow-lg">
          <AdminTable limit={10} searchTerm={searchQuery} statusFilter={filterStatus} history={true} />
        </div>
      </div>
    </div>
  );
}

export default History;
